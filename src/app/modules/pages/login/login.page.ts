import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import * as localizedStrings from '../../core/consts/localized-strings.const';
import {AuthService} from '../../core/services/auth.service';
import {NavigationService} from '../../core/services/navigation.service';
import {PhoneNumber} from "../../../shared/models/phone-number.model";
import {RegEx} from "../../core/consts/regex.const";
import {IonInput} from "@ionic/angular";
import {CountdownComponent} from "ngx-countdown";
import {ErrorService} from "../../core/services/error.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit, OnInit {
    @ViewChild("phoneLineInput", {static: false}) phoneLineInputField: IonInput;
    @ViewChild("confirmationCodeInput", {static: false}) confirmationCodeInputField: IonInput;
    @ViewChild('cd', {static: false}) private countdown: CountdownComponent;
    confirmationResult = this.authService.firebaseConfirmationResult;
    countdownSeconds = 300;
    hideConfirmationSection = true;
    hidePhoneNumberSection = true;
    localizedStrings = localizedStrings;
    phoneNumber = new PhoneNumber();
    recaptchaVerifier;
    selectedCountryCode;
    showProgressBar = false;
    stepOne: FormGroup;
    stepTwo: FormGroup;

    constructor(public authService: AuthService,
                private errorService: ErrorService,
                private formBuilder: FormBuilder,
                private navigationService: NavigationService) {
        this.stepOne = this.formBuilder.group({
            phoneLine: new FormControl("", Validators.compose([
                Validators.required,
                Validators.minLength(16),
            ]))
        })

        this.stepTwo = this.formBuilder.group({
            confirmationCode: new FormControl("", Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(RegEx.NUMERIC)
            ]))
        })
    }

    async ngAfterViewInit() {
        document.getElementById('recaptcha-container').style.display = 'block';
        this.recaptchaVerifier = this.authService.recaptchaVerifier(this.localizedStrings.RecaptchaContainer);
        this.countdown.pause();
        await this.phoneLineInputField.setFocus();
    }

    ngOnInit() {
        this.navigateToDashboardIfLoggedIn();
        this.showFirstStep();
    }

    async finishCountDown(e) {
        if (e.action === 'done') {
            await this.authService.logOut();
            this.showFirstStep()
        }
    }

    navigateToDashboardIfLoggedIn() {
        if (this.authService.isLoggedIn) {
            this.navigationService.navigateToDashboard();
        }
    }

    sendOTP() {
        if (this.stepOne.valid) {
            this.showProgressBar = true;
            this.phoneNumber.line = this.stepOne.get('phoneLine').value;
            this.phoneNumber.country = this.selectedCountryCode;
            this.authService.sendOTP(this.phoneNumber.e164, this.recaptchaVerifier).then((result) => {
                this.showSecondStep();
                this.confirmationResult = result;
            }).catch(error => {
                this.showFirstStep();
                this.handleError(error);
            });
        }
    }

    showFirstStep() {
        this.hideConfirmationSection = true;
        this.hidePhoneNumberSection = false;
        this.showProgressBar = false;
        setTimeout(async () => {
            this.countdown.pause();
            await this.phoneLineInputField.setFocus();
        }, 400);
    }

    showPhoneInput() {
        return !this.hidePhoneNumberSection;
    }

    showSecondStep() {
        this.hideConfirmationSection = false;
        this.hidePhoneNumberSection = true;
        this.showProgressBar = false;
        setTimeout(async () => {
            this.countdown.restart();
            await this.confirmationCodeInputField.setFocus();
        }, 400);
    }

    updateSelectedCountryCode(code) {
        this.selectedCountryCode = code;
    }

    verifyOTP() {
        if (this.stepTwo.valid) {
            this.showProgressBar = true;
            this.authService.verifyOTP(this.stepTwo.get('confirmationCode').value, this.confirmationResult).then(() => {
                this.navigationService.navigateToDashboard();
                this.showFirstStep()
            }).catch((error) => {
                debugger;
                this.handleError(error);
                this.showProgressBar = false;
            });
        }
    }

    handleError(error) {
        this.errorService.handleError(error);
    }
}
