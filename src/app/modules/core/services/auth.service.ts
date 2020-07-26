import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import ConfirmationResult = firebase.auth.ConfirmationResult;
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NavigationService} from './navigation.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    firebaseConfirmationResult: firebase.auth.ConfirmationResult;

    constructor(public af: AngularFireAuth, private navigationService: NavigationService) {
    }

    get isLoggedIn(): Observable<boolean> {
        return this.af.authState.pipe(
            map((user: any) => {
                return !!user;
            }),
            tap(loggedIn => {
                if (loggedIn) {
                    console.log('access granted');
                    return true;
                } else {
                    console.log('access denied');
                    return false;
                }
            }));
    }

    logOut(): void {
        this.af.auth.signOut().then(async () => {
            console.log('Logged out');
            await this.navigationService.navigateToLogin();
        });
    }

    recaptchaVerifier(recaptchaContainerId: string) {
        const options = {
            size: 'invisible'
        };
        return new firebase.auth.RecaptchaVerifier(recaptchaContainerId, options);
    }

    async sendOTP(phoneNumber, recaptchaVerifier): Promise<firebase.auth.ConfirmationResult> {
        this.af.auth.languageCode = 'es';
        return await this.af.auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
    }

    verifyOTP(otp: string, confirmationResult: ConfirmationResult) {
        return confirmationResult.confirm(otp);
    }
}
