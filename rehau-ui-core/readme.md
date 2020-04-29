


# Empty Skeleton for Rehau UI Core
This is the reference template for the development of the Rehau UI Core. It is based on the Stencil Library. Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.
Stencil components are just Web Components, so they work in any major framework or with no framework at all.
The main objectives of this project are:
* speed-up the local Front-End app development, providing common project structure and basic configuration (e.g. build and dependencies management)
* Make components available across future projects of Rehau, so that same code language and design language can be maintained across. 


## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [UI Components Category](#ui-components-category)

## Prerequisites
Download the most recent version of [Node.js](https://nodejs.org/en/)

## Getting Started With Angular
- Download and install all required dependecies through the following command:
 `npm install git+https://gitlab-ext.rehau.org/ddb/digit/appbaseline/rehau-ui-core.git`
You need to have access to this repository to download it via git. Or download it and install it as local package

- Add `schemas: [CUSTOM_ELEMENTS_SCHEMA],`  in @NgModule Decorator of `app.module.ts`, we can get `CUSTOM_ELEMENTS_SCHEMA` from 
`import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';`

- Add `defineCustomElements(window)` After your 
`bootstrapModule(AppModule).catch(err => console.error(err))` in `main.ts` file. You can get `defineCustomElements` from `rehau-ui-core/loader`.

- Add 
`@import  '../node_modules/rehau-ui-core/dist/rehau-ui-core/rehau-ui-core.css'` in your `styles.scss` file.

## Usage
For the styles of the components you have to import this in your global css file:
(Need to complete)

## UI Components Category
Below are all the category of the UI components included in the rehau-ui-core package:
- [Breadcrumbs](/src/components/molecules/breadcrumbs/readme.md)
  - [rh-breadcrumbs](/src/components/molecules/breadcrumbs/rh-breadcrumbs.molecule/readme.md)
- [Buttons](src/components/molecules/buttons/readme.md)
  - [rh-primary-button](src/components/molecules/buttons/rh-primary-button.molecule/readme.md)
- [Dividers](src/components/molecules/dividers/readme.md)
  - [rh-divider](src/components/molecules/dividers/rh-divider.molecule/readme.md)
- [Inputs](src/components/molecules/inputs/readme.md)
  - [rh-input-field-dropdown](src/components/molecules/inputs/rh-input-field-dropdown.molecule/readme.md)
- [List Items](src/components/molecules/list-items/readme.md)
  - [rh-list-item-primary](src/components/molecules/list-items/rh-list-item-primary.molecule/readme.md)
- [rh-accordian](src/components/molecules/accordian/readme.md)