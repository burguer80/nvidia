import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private router: Router) {
    }

    navigateToAccount() {
        this.router.navigate(['account']);
    }

    navigateToDashboard() {
        this.router.navigate(['dashboard']);
    }

    navigateToLogin() {
        this.router.navigate(['login']);
    }
}
