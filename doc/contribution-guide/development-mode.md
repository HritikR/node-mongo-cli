# Development mode

Love the project and wish to contribute? See the [git workflow](https://code-collabo.gitbook.io/doc/collabo-guidelines/contributing#git-workflow) section of the contribution guidelines page for how to set up project locally, and branching and other instructions. You can also reach out to [@Ifycode](https://github.com/Ifycode) in case you need any assistance. The sections below show how to run the node-mongo projects in development.

## node-mongo CLI

The commands to run when developing the [node-mongo-cli](https://github.com/code-collabo/node-mongo-cli) are the same as what is on the [node-mongo CLI page](https://code-collabo.gitbook.io/node-mongo/) for users. The installation however is different.

Install dependencies:

```text
npm install
```

Link:

```text
npm link
```

Run eslint:

```text
npm start
```

Run jasmine test:

```text
npm test
```

Unlink \(when you are done developing\):

```text
npm unlink
```

{% hint style="success" %}
You can decide to open separate terminals for eslint and jasmine to keep running while you work on the CLI in another terminal.
{% endhint %}

## Boilerplate templates and demo app

Run the boilerplate templates and demo app exactly as described on the [boilerplate templates](https://code-collabo.gitbook.io/node-mongo/boilerplate-templates) and the [demo CRUD app](https://code-collabo.gitbook.io/node-mongo/demo-crud-app) pages respectively.

## Project resources

Consult these resources by [@dkundel](https://github.com/dkundel), [@academind](https://github.com/academind) and [@CodAffection](https://github.com/CodAffection) to get a background of the CLI, boilerplate templates and the demo-app:

* [How to build a CLI with node.js](https://youtu.be/s2h28p4s-Xs) - _youTube video_.
* [How to build a CLI with node.js](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js) - _the article_.
* [Building a restful API with node.js](https://academind.com/tutorials/building-a-restful-api-with-nodejs/).
* [MEAN stack CRUD operations](https://youtu.be/UYh6EvpQquw) - _1st 33 minutes_.

