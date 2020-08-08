import * as firebase from "firebase";

export class MockConfirmationResult implements firebase.auth.ConfirmationResult {
    verificationId: string;

    confirm(verificationCode: string): Promise<firebase.auth.UserCredential> {
        return Promise.resolve(undefined);
    }
};

export class MockApplicationVerifier implements firebase.auth.ApplicationVerifier {
    type: string;

    verify(): Promise<string> {
        return Promise.resolve(undefined);
    }
};

export class MockNavigationService {
    static navigateToDashboard(): Promise<string> {
        return Promise.resolve(null);
    }
    static navigateToLogin(): Promise<string> {
        return Promise.resolve(null);
    }
};
