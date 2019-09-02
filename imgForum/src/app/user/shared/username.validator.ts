import { AbstractControl, ValidatorFn } from '@angular/forms'

// the regex below is from https://www.regextester.com/104030
// the lenth of id should be between 3 to 16 characters 
const expression = /^[a-z0-9_-]{3,16}$/

export function UsernameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const valid = expression.test(control.value)
        return valid ? null : { username: true }
    }
}