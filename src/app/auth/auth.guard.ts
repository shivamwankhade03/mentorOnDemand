import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._authService.redirectUrl = state.url;

    console.log('URL', state.url);

    return Observable.create((observer: Observer<boolean>) => {
      if (this._authService.LoggedIn) {
        console.log('Logged in');
        observer.next(true);
      } else {
        console.log('Not Logged in');
        this.router.navigate(['login'], { queryParams: { from: state.url.substr(1) } });
      }
    });
  }

}
