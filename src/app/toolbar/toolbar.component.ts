import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState, Logout } from '../authentication/auth.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  labTitle = 'ngrx-data-lab';
  labState = 'traditional angular app';

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(private store: Store){}
  logout(){
        this.store.dispatch(new Logout())
  }
}
