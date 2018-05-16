# Trashure

## Setup

The frontend is based on angular, so you will need to install angular first, see [this link](https://angular.io/guide/quickstart). Basically install NodeJS and npm and run:

`npm install -g @angular/cli`

Next, go to the root directory of the angular app (the trashure folder) and run:

`npm install`

This will install all the dependencies in the `package.json` file.

To open the app, run:

`ng serve --open`

This will run the dev server and open a new webpage with the Trashure hunt app. When you make changes to the code this page will automatically update. It is recommended to use an IDE like Webstorm, as it has support for Angular/Typescript.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
