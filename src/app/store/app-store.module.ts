import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { DefaultDataServiceConfig } from '@ngrx/data';


const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:8080/api',
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
 providers: [{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }],

})
export class AppStoreModule { }

