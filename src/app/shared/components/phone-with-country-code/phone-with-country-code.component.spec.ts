import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhoneWithCountryCodeComponent } from './phone-with-country-code.component';

describe('PhoneWithCountryCodeComponent', () => {
  let component: PhoneWithCountryCodeComponent;
  let fixture: ComponentFixture<PhoneWithCountryCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneWithCountryCodeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneWithCountryCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
