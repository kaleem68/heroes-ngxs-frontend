import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../shared/ngxs-store/authentication/auth.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  labTitle = 'ngrx-data-lab';
  labState = 'traditional angular app';

  constructor(private store: Store){}

  logout(){
        this.store.dispatch(new Logout())
  }
}
