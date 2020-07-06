import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../app/material/material.module';

import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './store/entity-metadata';

import { AppStoreModule } from './store/app-store.module';
import { FormsModule } from '@angular/forms';
import { DisplayComponent } from './display/display.component';
import { HeroesComponent } from './heroes/heroes/heroes.component';




@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppStoreModule,
    FormsModule,
    EntityDataModule.forRoot(entityConfig)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
