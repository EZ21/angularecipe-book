import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../models/app-state.model';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'recipe-proj';

  constructor(
    private store: Store<fromAppState.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) { };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    };
  };
};