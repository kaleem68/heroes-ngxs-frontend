import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HeroState } from '../heroes/store/hero.state';
import { AuthState } from '../shared/ngxs-store/authentication/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../environments/environment';


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
