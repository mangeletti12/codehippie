import * as moment from 'moment';

// https://date-fns.org/docs/Getting-Started
import { FormControl, ValidationErrors } from '@angular/forms';

export class DateValidator {


  static usDate(fc: FormControl): ValidationErrors {
    console.log(fc.value);
    let validationError = {
      'dateVaidator': false
    };

    if (fc && fc.value && moment(fc.value, 'MM/DD/YYYY', true).isValid()) {
      validationError.dateVaidator = true;
    }

    // console.log('validationError', validationError);
    return null;

  }

}
