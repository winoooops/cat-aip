import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment';

@Pipe({
    name: "moment"
})

export class Moment implements PipeTransform {
    transform(value: Date): any {
        return moment(value).fromNow() 
    }
}