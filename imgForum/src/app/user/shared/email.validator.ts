import { AbstractControl, ValidatorFn } from '@angular/forms'

const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export function EmailValidator(): ValidatorFn {
    return ( control: AbstractControl ) :{ [key:string] : Boolean } => {
        const valid = expression.test(control.value) 
        return valid ? null : {email: true}
    }
} 