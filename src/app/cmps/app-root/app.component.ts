import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../models/app-state.model';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularecipe-book';

  constructor(private store: Store<fromAppState.AppState>) { };

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
  };
};
