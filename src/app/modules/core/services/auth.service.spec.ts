import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from "firebase";
import {NavigationService} from "./navigation.service";
import {of} from "rxjs";

class confirmationResult implements firebase.auth.ConfirmationResult {
    verificationId: string;

    confirm(verificationCode: string): Promise<firebase.auth.UserCredential> {
        return Promise.resolve(undefined);
    }
}

interface MockUser {
    displayName: string,
    isAnonymous: boolean,
    uid: string
}

describe('AuthService', () => {
    let service: AuthService;
    const authState: MockUser = {
        displayName: null,
        isAnonymous: true,
        uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
    };
    const mockAngularFireAuth: any = {
        auth: jasmine.createSpyObj('auth', {
            'signInAnonymously': Promise.resolve(authState),
            'signOut': Promise.resolve(null),
        }),
        authState: of(authState),
        setAuthState: (authState: MockUser): void => {
            mockAngularFireAuth.authState = of(authState);
        }
    };
    const mockNavigationService = jasmine.createSpyObj('navigationService', ['navigateToLogin']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: AngularFireAuth, useValue: mockAngularFireAuth},
                {provide: NavigationService, useValue: mockNavigationService}]
        });
        TestBed.compileComponents();
        service = TestBed.inject(AuthService);
        service.firebaseConfirmationResult = new confirmationResult();
        mockAngularFireAuth.setAuthState(null);
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
            mockAngularFireAuth.setAuthState(authState);

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

        it('should be created', () => {

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
    });

    describe('verifyOTP', () => {
        it('should be created', () => {
            expect(service.verifyOTP).toBeTruthy();
        });
    });
});
