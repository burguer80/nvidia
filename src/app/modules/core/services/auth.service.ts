import {Injectable} from '@angular/core';

import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import ConfirmationResult = firebase.auth.ConfirmationResult;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    firebaseConfirmationResult: firebase.auth.ConfirmationResult;

    constructor(public af: AngularFireAuth) {
    }

    get confirmationResult(): ConfirmationResult {
        return this.firebaseConfirmationResult;
    }

    recaptchaVerifier(recaptchaContainerId: string) {
        return new firebase.auth.RecaptchaVerifier(recaptchaContainerId, {size: 'invisible'});
    }

    sendOTP(phoneNumber, recaptchaVerifier): Promise<firebase.auth.ConfirmationResult> {
        return this.af.auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
    }

    verifyOTP(otp: string, confirmationResult: ConfirmationResult) {
        return confirmationResult.confirm(otp);
    }
}
