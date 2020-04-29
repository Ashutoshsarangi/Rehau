import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';


@NgModule({
  declarations: [ LandingComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
})
export class LandingModule { }
