import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {AngularFireAuth} from "@angular/fire/auth";
import {MockAngularFireAuth} from "./stubs/objects.stub";

describe('AppComponent', () => {

    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy});

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: AngularFireAuth, useValue: MockAngularFireAuth},
                {provide: StatusBar, useValue: statusBarSpy},
                {provide: SplashScreen, useValue: splashScreenSpy},
                {provide: Platform, useValue: platformSpy},
            ],
            imports: [RouterTestingModule.withRoutes([])],
        }).compileComponents();
    }));

    it('should create the app', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
