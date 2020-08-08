// TODO: Fix this tests once the CI/CD is implemented

// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {IonicModule} from '@ionic/angular';
//
// import {LoginPage} from './login.page';
// import {AngularFireAuth} from "@angular/fire/auth";
// import {MockAngularFireAuth} from "../../../stubs/objects.stub";
// import {NavigationService} from "../../core/services/navigation.service";
// import {MockNavigationService} from "../../../stubs/classes.stub";
// import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {PhoneWithCountryCodeComponent} from "../../../shared/components/phone-with-country-code/phone-with-country-code.component";
// import {CountdownModule} from "ngx-countdown";
// import {CommonModule} from "@angular/common";
// import {LoginPageRoutingModule} from "./login-routing.module";
//
// describe('LoginPage', () => {
//     let component: LoginPage;
//     let fixture: ComponentFixture<LoginPage>;
//     const confirmationCode = '321321';
//     const phoneLine = '+111111111';
//     const formGroup = new FormBuilder().group({
//         phoneLine,
//     });
//     const formControl = new FormBuilder().group({
//         confirmationCode
//     });
//
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [LoginPage, PhoneWithCountryCodeComponent],
//             providers: [
//                 {provide: AngularFireAuth, useValue: MockAngularFireAuth},
//                 {provide: NavigationService, useValue: MockNavigationService}],
//             imports: [
//                 IonicModule.forRoot(),
//                 CommonModule,
//                 CountdownModule,
//                 FormsModule,
//                 IonicModule,
//                 LoginPageRoutingModule,
//                 ReactiveFormsModule]
//         }).compileComponents();
//
//         fixture = TestBed.createComponent(LoginPage);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     }));
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
