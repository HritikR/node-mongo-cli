import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { spawn } from 'child_process';

const access = promisify(fs.access);
const copy = promisify(ncp);

let createGitIgnoreFile = async (options) => {
  const content = '# See http://help.github.com/ignore-files/ for more about ignoring files.\n\n#.env file\n.env\n\n# dependencies\n/node_modules';
  fs.writeFileSync(path.join(options.targetDirectory, '.gitignore'), content);
  return;
}

let createEnvFiles = async (options) => {
  const content = 'MONGODB_URI=\nMONGODB_ATLAS_URI=';
  fs.writeFileSync(path.join(options.targetDirectory, '.env'), content);
  fs.writeFileSync(path.join(options.targetDirectory, '.env.example'), content);
  return;
}

let copyTemplateFolderContent = async (options) => {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  });
}

let gitInit = async (options) => {
  if (options.git) { //git init only if git returns true
    const result = await execa('git', ['init'], {
      cwd: options.targetDirectory
    });

    if (result.failed) {
      return Promise.reject(new Error('Failed to initialize git'));
    }
  }

  return;
}

let npmInstall = async (options) => {
  if (options.runInstall) { //install only if runInstall returns true
    if (process.platform === 'win32') spawn('npm.cmd', ['install'], { cwd: options.targetDirectory, stdio: 'inherit' });
      else spawn('npm', ['install'], {cwd: options.targetDirectory, stdio: 'inherit'});
  }

  return;
}

export let downloadTemplateKit = async (options) => {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd() //root/parent folder at this point
  };

  //create folder with user input here...
  fs.mkdirSync(`./${options.folderName}`, { recursive: true });

  //change directory from root/parent folder into user's own folder (so that it becomes cwd)
  process.chdir(`./${options.folderName}`);
  options.targetDirectory = process.cwd();

  const currentFileUrl = import.meta.url;

  let newUrl;
  if (process.platform === 'darwin') newUrl = new URL(currentFileUrl).pathname;
   else newUrl = new URL(currentFileUrl).pathname.substring(new URL(currentFileUrl).pathname.indexOf('/') + 1);

  const templateDir = path.resolve(newUrl, '../../templates', options.template.toLowerCase());
  
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK).then(_ => {
      /* rename name option in package.json same as project/folder name */
      execa('npx', ['npe','name',options.folderName], {
        cwd: options.targetDirectory
      }).stdout.pipe(process.stdout);
    })
    
  }catch (err) {
    console.error(`\n%s Template name or directory path is (probably) incorrect`, chalk.red.bold('ERROR'));
    process.exit(1);
  }

  await createGitIgnoreFile(options);

  await createEnvFiles(options);

  const listrTasks = new Listr([
    {
      title: `${chalk.green(`${options.template} template`)} copied into the generated folder ${chalk.green(`=> ${options.folderName}`)}`,
      task: () => copyTemplateFolderContent(options)
    },
    {
      title: 'git init',
      task: () => gitInit(options),
      skip: () => !options.git ? 'Skipped because you specified either --skip-git or --yes flags' : undefined
    },
    {
      title: 'npm install',
      task: () => npmInstall(options),
      skip: () => !options.runInstall ? 'Skipped because you specified either --skip-install or --yes flags' : undefined
    }
  ]);

  await listrTasks.run();

  //await npmInstall(options);

  return true;
}
