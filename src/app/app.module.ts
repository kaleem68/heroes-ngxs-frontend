import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStoreModule } from '../app/app-store/app.store.module';
import { MaterialModule } from '../app/material/material.module';
import { ModalComponent } from '../app/modal/modal.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    AppStoreModule,
    CoreModule,
    SharedModule

  ],
  providers: [],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

