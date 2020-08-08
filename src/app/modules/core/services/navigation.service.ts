import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private router: Router) {
    }

    async navigateToAccount(): Promise<void> {
        await this.router.navigate(['account']);
    }

    async navigateToDashboard(): Promise<void> {
        await this.router.navigate(['dashboard']);
    }

    async navigateToLogin(): Promise<void> {
        await this.router.navigate(['login']);
    }
}
