import {TestBed} from '@angular/core/testing';

import {ErrorService} from './error.service';
import * as localizedStrings from "../consts/localized-strings.const";

describe('ErrorService', () => {
    let service: ErrorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ErrorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('handleError', () => {
        it('should be created', () => {
            expect(service.handleError).toBeTruthy();
        });
        it('should open alert window with proper message', () => {
            spyOn(window, 'alert');
            const errorMessages = service['errorMessages'];

            Object.keys(errorMessages).map(function (errorCode) {
                const expectedMessage: string = errorMessages[errorCode];

                service.handleError(errorCode);
                console.log(`${errorCode} returns proper message : ${(!!expectedMessage)}`);
                expect(window.alert).toHaveBeenCalledWith(expectedMessage);
            });
        });

        it('should open alert window with default error message when the errorCode does not exist', () => {
            const expectedMessage: string = localizedStrings.ErrorDefault;
            const unknownErrorCode: string = 'unknown error code'
            spyOn(window, 'alert');

            service.handleError(unknownErrorCode);
            expect(window.alert).toHaveBeenCalledWith(expectedMessage);
        });
    });

    describe('errorMessage', () => {
        it('should be created', () => {
            expect(service['errorMessage']).toBeTruthy();
        });
    });
});
