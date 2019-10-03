import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms'
import { EmailValidator } from '../shared/email.validator'

 
@Directive({
  selector: '[email][ngModel]',
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: EmailDirective,
    multi: true
  }]
})
export class EmailDirective {
  private validator = EmailValidator() 

  validate( control: AbstractControl ): { [key:string] : any } {
    return this.validator(control)
  }
}
