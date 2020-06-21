import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './modules/core/services/auth.service';
import {distinctUntilChanged} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    public appPages = [
        {
            title: 'dashboard',
            url: '/dashboard',
            icon: 'home'
        },
        {
            title: 'account',
            url: '/account',
            icon: 'person'
        }
    ];
    sideNavDisabled = of(true);

    constructor(
        public authService: AuthService,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
        this.authService.isLoggedIn.pipe(distinctUntilChanged()).subscribe((isLoggedIn) => {
            this.sideNavDisabled = of(!isLoggedIn);
        });
    }
}
