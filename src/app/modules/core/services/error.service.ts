import {Injectable} from '@angular/core';

import * as localizedStrings from '../../core/consts/localized-strings.const';
import {ErrorMessages} from "../../../shared/consts/error-messages";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private errorMessages = ErrorMessages;

    constructor() {
    }

    public handleError(error): void {
        const errorMessage: string = this.errorMessage(error);
        alert(errorMessage);
    }

    private errorMessage(code: string) {
        let message;
        if (!!this.errorMessages[code]) {
            message = this.errorMessages[code];
        } else {
            message = localizedStrings.ErrorDefault;
        }
        return message;
    }
}







