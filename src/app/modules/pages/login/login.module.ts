import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {PhoneWithCountryCodeComponent} from '../../../shared/components/phone-with-country-code/phone-with-country-code.component';
import {PhoneNumberDirective} from "../../../shared/directives/phone-directive.directive";
import {CountdownModule} from "ngx-countdown";

@NgModule({
    imports: [
        CountdownModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule
    ],
    declarations: [LoginPage, PhoneNumberDirective, PhoneWithCountryCodeComponent]
})
export class LoginPageModule {
}
