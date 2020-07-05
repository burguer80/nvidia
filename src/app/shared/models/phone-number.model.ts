export class PhoneNumber {
    country: string;
    line: string;

    // format phone numbers as E.164
    get e164() {
       return `${this.country} ${this.line}`;
    }
}
