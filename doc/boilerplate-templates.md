# API boilerplate templates
There are three (3) API boilerplate templates for nodejs and/or mongoDB development. The sections below contain detailed information on the download options available, the API design, and how to use the API boilerplate templates.

## Template features
- Development environment already set up with @babel (for esm template only) and eslint.
- [Two mongoDB connection options](https://code-collabo.gitbook.io/node-mongo/boilerplate-templates#mongodb-connection-options) to pick from in the templates: your installed mongoDB and mongoDBatlas.
- [Demo CRUD app](https://github.com/code-collabo/node-mongo-demo-app) you can go and download to test that your connection is setup and show example usage of the templates.

## Installation
Download the template\(s\) locally unto your computer through the CLI. The CLI is built to provide better experience, but you can also clone or download the template from Github and/or install packages manually in case you're having issues with CLI. Report CLI or template issues in [the issues tab of the node-mongo-cli repo](https://github.com/code-collabo/node-mongo-cli/issues).

Change directory \(cd\) into the root of the downloaded template. Create a .env file in the root of the downloaded template, this will be useful later on. If you downloaded the template through the CLI and you have or will be initializing git in your template, rename the .npmignore file in the template to .gitignore and save the file. The .env file's name, for example, has been added to the list in there so that you don't push your secrets to github. If you will not be initializing git, you can just delete the .npmignore file. This issue will be fixed in subsequent releases - [read about the issue here](https://github.com/code-collabo/node-mongo-cli/issues/119).

{% hint style="success" %}
Create a .env file in the root of the downloaded template. If you downloaded the template through the CLI, rename the .npmignore file to .gitignore and make sure to save the file if you have or will be initializing git in your template. The .env file's name has been added to the list in there so that you don't push your secrets to github.
{% endhint %}

Install dependencies \(skip this install step if CLI installed your dependencies for you\):

```text
npm install
```

Start server and mongoDB connection:

```text
npm start
```

**Note:** Incase you see an error message in the terminal, the next sections will guide you on how to set up your mongoDB connection successfully.

## MongoDB connection options

There are two monogoDB connection options already setup for you to choose from:

* Connection to MongoDB installed on your computer. 
* Connection to MongoDB atlas

In the case where the error message "Error in DB connection" is displayed in the terminal when you start the server, you need to either install and get mongoDB running for use locally on your computer or setup mongoDB atlas. Once you have done any of these, the message "Installed MongoDB connection successful!!!" or "MongoDB ATLAS connection successful!!!" should now show up in the terminal. More notes in the sections that explain the mongoDB connection options individually. [Visit mongoDB documentation to install mongoDB](https://docs.mongodb.com/guides/server/install/) on your computer and get mongoDB running if you haven't. [Or choose to use mongoDB atlas](https://docs.atlas.mongodb.com/getting-started/) and connect to your cluster.

### Installed mongoDB option

After installing mongoDB, keep mongoDB running in the terminal\(s\) as shown in the mongoDB documentation. Create a database and give it any name of your choice. Go to src/db.js file, you will see that there is a DBNAME environment variable i.e. **process.env.DBNAME** in the mongoDB connection string. You want to store the database name that you created in this variable. Store your database name in the variable inside the .env file you created earlier like so:

```text
DBNAME=insert-your-own-dbname-here
```

You can add other environment variables if you like, but this tutorial is going to stick to this simple setup. Also create a collection. You can use the collection name "demo" from the src/api/models/demo.js file while you follow this tutorial. You can always use a different name later on once you get used to how the template is setup. You will find these imports in the code block below inside the src/app.js file. 

If you are using the esm template:
````
//===== Installed mongoDB's db =======
import mongooseModuleExport from './db'; //eslint-disable-line no-unused-vars
````

If you are using the cjs template:

````
//===== Installed mongoDB's db =======
const mongooseModuleExport = require('./db'); //eslint-disable-line no-unused-vars
````

The other import named "mongooseModuleExportAtlas" is not needed for the installed mongoDB option, that is why it is commented out. Open up [http://localhost:3000](http://localhost:3000) in the browser to see the message "App works" displayed on the screen. Also see [http://localhost:3000/demo](http://localhost:3000/demo) for items in your demo collection. Count should be zero and items should be an empty array since you have not added anything in the database.

### MongoDB atlas option

Create a database \(and collection\) and connect to your cluster following the mongoDB atlas documentation. Go to src/atlas/db.js file, you will see that there are environment variables i.e. **process.env.USERNAME**, **process.env.PASSWORD**, **process.env.CLUSTERNAME**, **process.env.DBNAME** in the mongoDB connection string. You want to store your username, password, cluster name and database name that you created with atlas inside these variables. Store them in the variables inside the .env file you created earlier like so:

```text
DBNAME=insert-your-own-dbname-here
USERNAME=insert-your-own-username-here
PASSWORD=insert-your-own-password-here
CLUSTERNAME=insert-your-own-clustername-here
```

{% hint style="success" %}
Use your user password and not your mongoDB atlas account password. Also you need to attach an extension to the cluster name because of how the connection string in the boilerplate template is written - See [comment on issue #129](https://github.com/code-collabo/node-mongo-cli/issues/129#issuecomment-933110182) for clarity.
{% endhint %}

Use the collection name "demo" from the src/api/models/demo.js file while you follow this tutorial. You can always use a different name later on once you get used to how the template is setup. You will find these imports in the code block below inside the src/app.js file.

If you are using the esm template:
````
//===== MongoDB ATLAS db =======
//import mongooseModuleExportAtlas from './atlas/db'; //eslint-disable-line no-unused-vars
````

If you are using the cjs template:
````
//===== MongoDB ATLAS db =======
//const mongooseModuleExportAtlas = require('./atlas/db'); //eslint-disable-line no-unused-vars
````
By default, the installed mongoDB option's db is what is used. Since you are using atlas, comment out "mongooseModuleExport" and remove comment from "mongooseModuleExportAtlas" so that you can access the db connection set up for atlas instead. Open up [http://localhost:3000](http://localhost:3000) in the browser to see the message "App works" displayed on the screen. Also see [http://localhost:3000/demo](http://localhost:3000/demo) for items in your demo collection. Count should be zero and items should be an empty array since you have not added anything in the database. Again, see [helpful comment in issue #129](https://github.com/code-collabo/node-mongo-cli/issues/129#issuecomment-933110182) if you still have not been able to connect successfully without errors. 

## Customising dev environment

Replace "insert-your-project-name" with your own project name in the src/startMessage.js file. Modify boilerplate template as you like it.

