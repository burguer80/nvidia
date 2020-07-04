import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import CountryCodes from '../../data/countryCodes.json';

import * as localizedStrings from '../../../modules/core/consts/localized-strings.const';

@Component({
    selector: 'app-phone-with-country-code',
    templateUrl: './phone-with-country-code.component.html',
    styleUrls: ['./phone-with-country-code.component.scss'],
})
export class PhoneWithCountryCodeComponent implements OnInit {
    @Input() defaultCountryCode: string = '+52'; // MX as default
    @Output() selectedCode = new EventEmitter<string>();
    countries: Country[] = CountryCodes;
    localizedStrings = localizedStrings;

    constructor() {
    }

    ngOnInit() {
        this.updateSelectedCountryCode(this.defaultCountryCode);
    }

    updateSelectedCountryCode(code) {
        this.selectedCode.emit(code);
    }

}
