export class RegEx {
    public static PHONE: RegExp = /^\(?[\d]{3}\)? ?-? ?[\d]{3} ?-? ?[\d]{4}$/;
    public static NON_DIGIT: RegExp = /\D/g;
    public static NUMERIC: RegExp = /^[0-9]*$/;
}
