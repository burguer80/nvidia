import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import * as localizedStrings from '../../core/consts/localized-strings.const';
import {NavigationService} from '../../core/services/navigation.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    confirmationResult = this.authService.confirmationResult;
    recaptchaVerifier;
    recaptchaContainer = localizedStrings.RecaptchaContainer;
    phoneNumber;
    otp;

    constructor(public authService: AuthService, private navigationService: NavigationService) {
    }

    ngOnInit() {
        document.getElementById('recaptcha-container').style.display = 'block';
        this.recaptchaVerifier = this.authService.recaptchaVerifier(this.recaptchaContainer);
    }

    sendOTP() {
        this.authService.sendOTP(this.phoneNumber, this.recaptchaVerifier).then((result) => {
            this.confirmationResult = result;
            // alert('optSent');
        }).catch(console.error);
    }

    verifyOTP() {
        this.authService.verifyOTP(this.otp, this.confirmationResult).then(() => {
            // alert('OTP verified');
            this.navigationService.navigateToDashboard();
        }).catch(err => {
            console.error(err);
            this.authService.logOut();
        });
    }
}
