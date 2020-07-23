import {TestBed} from '@angular/core/testing';

import {NavigationService} from './navigation.service';
import {Router} from "@angular/router";

describe('NavigationService', () => {
    let service: NavigationService;
    let mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: Router, useValue: mockRouter},
            ]
        });
        service = TestBed.inject(NavigationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('navigateToAccount', () => {
        it('should be created', () => {
            expect(service.navigateToAccount).toBeTruthy();
        })

        it('should invoke navigate router method with account string value', async () => {
            const expectedAccountRoute: string[] = ['account'];
            await service.navigateToAccount();
            expect(mockRouter.navigate).toHaveBeenCalledWith(expectedAccountRoute);
        });
    });

    describe('navigateToDashboard', () => {
        it('should be created', () => {
            expect(service.navigateToDashboard).toBeTruthy();
        });

        it('should invoke navigate router method with dashboard string value', async () => {
            const expectedLoginRoute: string[] = ['dashboard'];
            await service.navigateToDashboard();
            expect(mockRouter.navigate).toHaveBeenCalledWith(expectedLoginRoute);
        })
    });

    describe('navigateToLogin', () => {
        it('should be created', () => {
            expect(service.navigateToLogin).toBeTruthy();
        });

        it('should invoke navigate router method with login string value', async () => {
            const expectedLoginRoute: string[] = ['login'];
            await service.navigateToLogin();
            expect(mockRouter.navigate).toHaveBeenCalledWith(expectedLoginRoute);
        });
    })
});
