# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Mobile Build
We have created different ways to build the application. The folder `sprintdemomobile` is an cordova application. 
Please make sure you go inside the sprintdemomobile application and run `npm i` so that all the required files will be added in that. 
### Normal Mobile Build
For normal installation on the mobile please run the command `npm run [android/ios]` at the root level of the application. There is a post install command which will add the `cordova.js` script in the index.html. 
This command will create a build of the angular app in the `sprintdemomobile/www` folder. This same folder will be then used by cordova scripts to your desired platform. You might get an error of main.js not found in ./src folder, its ignorable for now.

### Livereload built
For live reload we have used the package [cordova-plugin-webpack](https://www.npmjs.com/package/cordova-plugin-webpack).
Please follow the commands in sequence
`npm run buildAppLive`
`npm run addMeta`
`npm run [android/ios]Live`

The `npm run buildAppLive` will create a watcher on the build files which are dumped in `sprintdemomobile/src`. Any changes to the angular files will result in code compile and update of files in `sprintdemomobile/src` folder.

The `npm run addMeta` will inject the index.html file in `sprintdemomobile/src` with "Security meta", add the cordova.js file and rename the main.js file to be main.bundle.js (This is required by the livereload webpack).

The `npm run [android/ios]Live` command will prepare and run the application in desired platforms. The application which will be run on the devices will be listening to your machine for any changes happening to the build folder which will then be pushed to our mobile via the webpack package.

Make sure the devices are connected to your system via usb, or simulated and emulated.


