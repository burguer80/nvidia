import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavigationService} from "./navigation.service";
import {
    MockApplicationVerifier,
    MockConfirmationResult, MockNavigationService
} from "../../../stubs/classes.stub";
import {MockAngularFireAuth, MockAuthState} from "../../../stubs/objects.stub";

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: AngularFireAuth, useValue: MockAngularFireAuth},
                {provide: NavigationService, useValue: MockNavigationService}]
        });
        TestBed.compileComponents();
        service = TestBed.inject(AuthService);
        service.firebaseConfirmationResult = new MockConfirmationResult();
        MockAngularFireAuth.setAuthState(null);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('firebaseConfirmationResult', () => {
        it('should be created', () => {
            expect(service.firebaseConfirmationResult).toBeTruthy();
        });
    });

    describe('isLoggedIn', () => {
        it('should be created', () => {
            expect(service.isLoggedIn).toBeTruthy();
        });

        it('should return false if there is no authState', (done: DoneFn) => {
            service.isLoggedIn.subscribe((isLoggedIn) => {
                expect(isLoggedIn).toBeFalsy();
                done();
            });
        });

        it('should return false if there is authState', (done: DoneFn) => {
            MockAngularFireAuth.setAuthState(MockAuthState);

            service.isLoggedIn.subscribe((isLoggedIn) => {
                expect(isLoggedIn).toBeTruthy();
                done();
            });
        });
    });

    describe('logOut', () => {
        it('should be created', () => {
            expect(service.logOut).toBeTruthy();
        });

        it('should invoke navigationService.navigateToLogin on service.logOut', () => {
            service.logOut();
            setTimeout(() => {
                expect(service['navigationService'].navigateToLogin).toHaveBeenCalled();
            })
        });

    });

    describe('recaptchaVerifier', () => {
        it('should be created', () => {
            expect(service.recaptchaVerifier).toBeTruthy();
        });
    });

    describe('sendOTP', () => {
        it('should be created', () => {
            expect(service.sendOTP).toBeTruthy();
        });

        it('should invoke signInWithPhoneNumber with phoneNumber and confirmationResult', () => {
            const phoneNumber: string = '555-555-5555';
            let MockConfirmationResult = new MockApplicationVerifier();
            MockAngularFireAuth.auth.signInWithPhoneNumber.and.callThrough();

            service.sendOTP(phoneNumber, MockConfirmationResult);
            expect(MockAngularFireAuth.auth.signInWithPhoneNumber).toHaveBeenCalledWith(phoneNumber, MockConfirmationResult);
        });
    });

    describe('verifyOTP', () => {
        it('should be created', () => {
            expect(service.verifyOTP).toBeTruthy();
        });

        it('should invoke CconfirmationResult.confirm with otp', () => {
            const otp: string = 'one time password';
            const MockConfirmationResult = service.firebaseConfirmationResult;
            spyOn(MockConfirmationResult, 'confirm' as any);
            service.verifyOTP(otp, MockConfirmationResult);
            expect(MockConfirmationResult.confirm).toHaveBeenCalledWith(otp);
        });
    });
});
