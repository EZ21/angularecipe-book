import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppState from '../models/app-state.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAppState.AppState>) {};

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
      if(!user) {
        return next.handle(request);
      };
      const modifiedReq = request.clone({params: new HttpParams().set('auth', user.token)});
      return next.handle(modifiedReq);
    }));
  };
};