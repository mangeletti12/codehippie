import { FormArray, FormControl, FormGroup, ValidationErrors, Validator  } from '@angular/forms';


//https://www.toptal.com/angular-js/angular-4-forms-validation
export class CustomValidators {

  //NO SPACE
  static noSpace(c: FormControl): ValidationErrors {
    console.log('noSpace ' + c.value);
    var hasSpace = false;
    if (c.value != "" && c.value != undefined) {
        hasSpace = c.value.indexOf(' ') >= 0;
    }

    const message = {
      'noSpace': {
        'message': 'Cannot contain a space'
      }
    };
    return hasSpace ? message : null;
  }

  //EMAIL
  static isValidEmail(c: FormControl): ValidationErrors {
    //const isValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c.value);
    const isValidEmail = /\S+@\S+\.\S+/.test(c.value); //simple check
    const message = {
      'isValidEmail': {
        'message': 'Not a valid email address'
      }
    };
    return isValidEmail ? null : message;
  }

  //BIRTHYEAR
  static birthYear(c: FormControl): ValidationErrors {
    console.log('birthYear ' + c.value);

    const numValue = Number(c.value);
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 85;
    const maxYear = currentYear - 18;
    const isValid = !isNaN(numValue) && numValue >= minYear && numValue <= maxYear;
    const message = {
      'years': {
        'message': 'The year must be a valid number between ' + minYear + ' and ' + maxYear
      }
    };
    return isValid ? null : message;
  }



  //
  static countryCity(form: FormGroup): ValidationErrors {
    const countryControl = form.get('location.country');
    const cityControl = form.get('location.city');

    if (countryControl != null && cityControl != null) {
      const country = countryControl.value;
      const city = cityControl.value;
      let error = null;

      if (country === 'France' && city !== 'Paris') {
        error = 'If the country is France, the city must be Paris';
      }

      const message = {
        'countryCity': {
          'message': error
        }
      };

      return error ? message : null;
    }
  }

  //
  static uniqueName(c: FormControl): Promise<ValidationErrors> {
    const message = {
      'uniqueName': {
        'message': 'The name is not unique'
      }
    };

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(c.value === 'Existing' ? message : null);
      }, 1000);
    });
  }

  //
  static telephoneNumber(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^\d{3,3}-\d{3,3}-\d{3,3}$/.test(c.value);
    const message = {
      'telephoneNumber': {
        'message': 'The phone number must be valid (XXX-XXX-XXX, where X is a digit)'
      }
    };
    return isValidPhoneNumber ? null : message;
  }

  static telephoneNumbers(form: FormGroup): ValidationErrors {

    const message = {
      'telephoneNumbers': {
        'message': 'At least one telephone number must be entered'
      }
    };

    const phoneNumbers = <FormArray>form.get('phoneNumbers');
    const hasPhoneNumbers = phoneNumbers && Object.keys(phoneNumbers.controls).length > 0;

    return hasPhoneNumbers ? null : message;
  }


}