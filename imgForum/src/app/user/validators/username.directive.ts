import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms'
import { UsernameValidator} from '../shared/username.validator'


@Directive({
  selector: '[username][ngModel]',
  providers: [ {
    provide: NG_VALIDATORS, 
    useExisting: UsernameDirective,
    multi: true
  }]
})
export class UsernameDirective {
  private validator = UsernameValidator() 

  validate(control: AbstractControl): { [key: string] : any} {
    return this.validator(control)
  } 
}
