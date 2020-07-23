import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {RegEx} from "../../modules/core/consts/regex.const";

@Directive({
    selector: '[appPhoneNumber]'
})
export class PhoneNumberDirective implements OnInit {

    constructor(
        private elementRef: ElementRef
    ) {
    }

    ngOnInit() {
        this.formatNumber();
    }

    @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
        this.formatNumber(event.code);
    }

    private formatNumber(keyCode?: string): void {
        const phone: string = this.elementRef.nativeElement.value.replace(RegEx.NON_DIGIT, '').substr(0, 10);
        let formattedPhone = `(${phone}`;
        if (phone.length > 6 || phone.length === 6 && !(keyCode === 'Backspace' || keyCode === 'Delete')) {
            formattedPhone = `(${phone.substr(0, 3)}) ${phone.substr(3, 3)} - ${phone.substr(6, 4)}`;
        } else if (phone.length === 6 && (keyCode === 'Backspace' || keyCode === 'Delete')) {
            formattedPhone = `(${phone.substr(0, 3)}) ${phone.substr(3, 3)}`;
        } else if (phone.length > 3 || phone.length === 3 && !(keyCode === 'Backspace' || keyCode === 'Delete')) {
            formattedPhone = `(${phone.substr(0, 3)}) ${phone.substr(3, 3)}`;
        } else if (phone.length === 3 && (keyCode === 'Backspace' || keyCode === 'Delete')) {
            formattedPhone = `(${phone.substr(0, 3)}`;
        }
        this.elementRef.nativeElement.value = formattedPhone;
    }
}
