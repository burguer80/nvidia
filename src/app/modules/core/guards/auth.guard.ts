import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, tap} from 'rxjs/operators';
import {NavigationService} from '../services/navigation.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private af: AngularFireAuth,
                private navigationService: NavigationService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.af.authState.pipe(
            map((user: any) => {
                return !!user;
            }),
            tap(loggedIn => {
                if (loggedIn) {
                    return true;
                } else {
                    this.navigationService.navigateToLogin();
                }
            }));
    }
}
