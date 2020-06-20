import {Injectable} from '@angular/core';

import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import ConfirmationResult = firebase.auth.ConfirmationResult;
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    firebaseConfirmationResult: firebase.auth.ConfirmationResult;

    constructor(public af: AngularFireAuth, private router: Router) {
    }

    get confirmationResult(): ConfirmationResult {
        return this.firebaseConfirmationResult;
    }

    get isLoggedIn(): Observable<boolean> {
        return this.af.authState.pipe(
            // take(1),
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

    signOut() {
        return this.af.auth.signOut().then(() => {
            console.log('Logged out');
            this.router.navigate(['login']);
        });
    }

    recaptchaVerifier(recaptchaContainerId: string) {
        const options = {
            size: 'invisible'
        };
        return new firebase.auth.RecaptchaVerifier(recaptchaContainerId, options);
    }

    sendOTP(phoneNumber, recaptchaVerifier): Promise<firebase.auth.ConfirmationResult> {
        return this.af.auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
    }

    verifyOTP(otp: string, confirmationResult: ConfirmationResult) {
        return confirmationResult.confirm(otp);
    }
}
