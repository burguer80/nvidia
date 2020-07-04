import {Injectable} from '@angular/core';

import * as localizedStrings from '../../core/consts/localized-strings.const';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor() {
    }

    handleError(error) {
        console.error(error.code)
        alert(this.errorMessage(error.code));
    }

    errorMessage(code: string) {
        let message;
        switch (code) {
            case 'auth/invalid-verification-code': {
                message = localizedStrings.ErrorInvalidVerificationCode;
                break;
            }
            case 'auth/email-already-exists': {
                message = localizedStrings.ErrorEmailAlreadyExists;
                break
            }
            case 'auth/insufficient-permission': {
                message = localizedStrings.ErrorInsufficientPermission;
                break
            }
            case 'auth/internal-error': {
                message = localizedStrings.ErrorInternalError;
                break
            }
            case 'auth/invalid-credential': {
                message = localizedStrings.ErrorInvalidCredential;
                break
            }
            case 'auth/invalid-display-name': {
                message = localizedStrings.ErrorInvalidDisplayName;
                break
            }
            case 'auth/invalid-email': {
                message = localizedStrings.ErrorInvalidEmail;
                break
            }
            case 'auth/invalid-email-verified': {
                message = localizedStrings.ErrorInvalidEmailVerified;
                break
            }
            case 'auth/invalid-password': {
                message = localizedStrings.ErrorInvalidPassword;
                break
            }
            case 'auth/invalid-phone-number': {
                message = localizedStrings.ErrorInvalidPhoneNumber;
                break
            }
            case 'auth/invalid-photo-url': {
                message = localizedStrings.ErrorInvalidPhotoUrl;
                break
            }
            case 'auth/invalid-user-import': {
                message = localizedStrings.ErrorInvalidUserImport;
                break
            }
            case 'auth/maximum-user-count-exceeded': {
                message = localizedStrings.ErrorMaximumUserCountExceeded;
                break
            }
            case 'auth/operation-not-allowed': {
                message = localizedStrings.ErrorOperationNotAllowed;
                break
            }
            case 'auth/phone-number-already-exists': {
                message = localizedStrings.ErrorPhoneNumberAlreadyExists;
                break
            }
            case 'auth/unauthorized-continue-uri': {
                message = localizedStrings.ErrorUnauthorizedContinueUri;
                break
            }
            case 'auth/user-not-found': {
                message = localizedStrings.ErrorUserNotFound;
                break
            }
            default: {
                message = localizedStrings.ErrorDefault;
                break;
            }
        }
        return message;
    }
}







