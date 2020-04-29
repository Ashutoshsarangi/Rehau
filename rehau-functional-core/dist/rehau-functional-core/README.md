# RehauFunctionalCore

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Code scaffolding

Run `ng generate component component-name --project rehau-functional-core` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project rehau-functional-core`.
> Note: Don't forget to add `--project rehau-functional-core` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build rehau-functional-core` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build rehau-functional-core`, go to the dist folder `cd dist/rehau-functional-core` and run `npm publish`.

## How to use 
   
   - Open your angular project and install 'rehau-functional-core' using npm command `npm i rehau-functional-core`
  - If the angular library(rehau-funational-core) is not published then we can install it from github using command 
    `npm i git+https://gitlab-ext.rehau.org/ddb/digit/appbaseline/rehau-functional-core.git#<branchName>`
  - Add `(window as any).global = window;`  in project `polyfills.ts` file
  - After installation import the required services in the module.ts file of your angular project.
  eg. `import { <ServiceName/moduleName> } from 'rehau-functional-core';`
  
  > #### Note: if you are importing the package using gitlab link then you will find rehau-functional  
  > core package under dist folder. you need to import any service as 
  > `import { <ServiceName/moduleName> } from 'rehau-functional-core/dist/rehau-functional-core';`

  - Add the services in the providers array inside the @NgModule decorator.`
  - Now you can access the services from rehau-functional-core in any where in the project by importing the require service

  - To access AuthGurad :
    - imoort `AuthGuard` from `rehau-functional-core` as 
    `import { AuthGuard } from 'rehau-functional-core'`
    - Add the `AuthGuard` in the providers array inside the @NgModule decorator.`
    - Also import `AuthGuard` in the routing files of the application
    - Now you use AuthGuard service as `canActivate: [AuthGuard]`

  - To access `route-animation` service :
    - First need to import `BrowserAnimationsModule` from `@angular/platform-browser/animations` and add it in imports of @NgModule decorator.
    - Replace <router-outlet></router-outlet> tag with following:
        ```    
        <div [@routeAnimations]="o && o.activatedRouteData 
            && o.activatedRouteData['animation']">
            <router-outlet #o="outlet"></router-outlet>
        </div>  

        ```
    - Import `slideInAnimation` from `rehau-functional-core` in the ts file where you have added <router-outlet> tag
    - Now you can use animation property in the routing file as
        { path: 'login', component: LoginComponent,
         `data: { animation: 'left-right-ease-out' }` },
    - Following are the different transations available:
      ```
        - right-left-ease-out
        - left-right-ease-out
      ```     

  - To access the Translation service from rehau functional core :
    - imoort `TranslationService` from `rehau-functional-core` as 
    `import { TranslationService } from 'rehau-functional-core'`
    - Add the `TranslationService` in the providers array inside the @NgModule decorator.`
    - You can use translation using `Angular Pipe` in as `<h2>{{<AnyValue> | translate}}</h2>`
    - You can pass the language in the `globalCongig` object `currentLanguage` key.
  - To access the NGRX store we need to follow following steps :
    - import `StoreModule` from `@ngrx/store` as `import { StoreModule } from '@ngrx/store'` in app.module.ts 
    - import `reducers` from rehau-functional-core as 
    `import {LogService,reducers,RehauFunctionalCoreModule} from 'rehau-functional-core'`
    and add `StoreModule.forRoot(reducers)` inside the imports of @NgModule decorator 
 
    > #### Note: `rehau-functional-core` package required two objects which need to pass from the `app.module.ts` inside the imports of @NgModule decorator. 
    eg,
    RehauFunctionalCoreModule.forRoot({
      cidaasConfig,
      globalConfig
    }),
    
    Refer following sample object
    ```
    cidaasConfig: {
        cidaasClientId: '**********', 
        cidaasBaseURL: 'https://accounts.rehau.com',
        ciddasTokenEndpoint:  'https://accounts.rehau.com/token-srv/token',
        cidaasRevokeUrl: 'https://accounts.rehau.com/authz-srv/revoke',
        cidaasRegisterProvider: {
        appScope: ['email', 'roles', 'profile', 'offline_access'],
        responseType: 'code',
        redirectUri: 'http://localhost:8000/register',
        code_challenge: '9235487394587-xcode',
        code_challenge_method: 'S256',
        nonce: '1234543267890',
        viewType: 'register'
        },
        cidaasLoginProvider: {
            appScope: ['email', 'roles', 'profile', 'offline_access'],
            responseType: 'code',
            redirectUri: 'http://localhost:8000/callback',
            code_challenge: '9235487394587-xcode',
            code_challenge_method: 'S256',
            nonce: '12345678909876'
        },
        cidaasLoginDesign: {
            closebuttoncolor: '#dd0060',
            hardwareback: 'no',
            hidenavigationbuttons: 'no',
            hideurlbar: 'yes',
            navigationbuttoncolor: '#dd0060',
            toolbarcolor: '#f7f7f7'
        },
        cidaasRegisterDesign: {
            closebuttoncolor: '#dd0060',
            hardwareback: 'no',
            hidenavigationbuttons: 'no',
            hideurlbar: 'yes',
            navigationbuttoncolor: '#dd0060',
            toolbarcolor: '#f7f7f7'
        }
    },

    globalConfig: {
        SECRET_KEY: '**************',
        BASE_URL: '', 
        backendBasePath: 'https://test.com'
    }
    ```
    Out of these two objects keys `cidaasLoginDesign` & `cidaasRegisterDesign` of cidaasConfig object are optional. Rest all the keys are required. If any of the object or object key is missing or missmatch (with respect to key datatype/ key case format) you will get an error while using the package or while build command.

    > ##### Note: Make sure you will run your application on port 8000 only.
    
## Running unit tests

Run `ng test rehau-functional-core` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
