import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { HeroState } from '../heroes/store/hero.state';
import { AuthState } from '../authentication/auth.state';


@NgModule({
  imports: [
   NgxsModule.forRoot([
          HeroState,
          AuthState
        ],
          { developmentMode: !environment.production }
        ),
        NgxsStoragePluginModule.forRoot({
          key: 'auth.token'
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),

  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AppStoreModule { }
