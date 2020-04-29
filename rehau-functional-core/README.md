# RehauFunctionalCore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

The project is used for the developement of functional core. This project includes two different angular projects as follows:
- rehau-functional-core
- rehau-functional-core-testing

## rehau-functional-core
This is the angular library.
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) using command `ng generate <projectName>`

- #### Code scaffolding

    - Run `ng generate component component-name --project rehau-functional-core` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project rehau-functional-core`.
    - The Service/ module which you want to export for outside world, you need to add it in `public-api.ts` of `rehau-functional core`.
    - If you install any new package you need to copy the package name and version from `root package.json` and paste it in `peerDependencies object of package.json` of 'rehau-functional-core'. 
    eg, if you install @ngrx/store then copy `"@ngrx/store": "@ngrx/store"` from root `package.json` and paste it in package.json of liabrary.
    - If in case particular package must be install in the angular application which will use the `rehau-functional-core` package add the package version in `umdModuleIds` object of `ng-package.json` file of library.
    
    > Note: Don't forget to add `--project rehau-functional-core` or else it will be added to the default project in your `angular.json` file. 


- #### Build
    Run `ng build rehau-functional-core` to build the project. The build artifacts will be stored in the `dist/` directory.
 
## rehau-functional-core-testing
This is the angular application created using `ng generate projectname` command. it is the simple application created to test the Angular library rehau-functional-core simultaneously while development.

- #### Build
    Run `ng serve rehau-functional-core-testing --port 8000` to build the project. The application must be run on port 8000.

    > Note: Don't forgot to build `rehau-functional-core` before running the testing app. Whenever you will do any changes in library you first need to build it as the dist folder should be updated which will be used by testing app. 
 
## Folder structure

- dist (build artifacts will be store in dist folder)
- node modules
- projects
    - rehau-functional-core (Angular library)
    - rehau-functional-core-testing (Angular project)

