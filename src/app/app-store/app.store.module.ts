import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { HeroState } from '../heroes/store/hero.state';
import { AuthState } from '../authentication/store/auth.state';
import { AuthService } from '../authentication/auth.service';
import { HeroService } from '../heroes/hero.service';


@NgModule({
  imports: [
    NgxsModule.forRoot([ // should it be forFeature?
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
  providers: [AuthService,HeroService], //These services are used by their respective state i.e HeroState so they should be provided here or app.module.ts
})
export class AppStoreModule { }
