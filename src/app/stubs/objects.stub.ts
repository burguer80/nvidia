import {MockConfirmationResult} from "./classes.stub";
import {of} from "rxjs";
import {User} from "../modules/core/models/user.model";

export const MockAuthState: User = {
    displayName: null,
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
};

export const MockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
        'RecaptchaVerifier': Promise.resolve(null),
        'signInAnonymously': Promise.resolve(MockAuthState),
        'signOut': Promise.resolve(null),
        'signInWithPhoneNumber': Promise.resolve(MockConfirmationResult),
    }),
    authState: of(MockAuthState),
    setAuthState: (authState: User): void => {
        MockAngularFireAuth.authState = of(authState);
    }
};
