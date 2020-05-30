import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

// https://docs.google.com/spreadsheets/d/1LyqAplh068LL2fwdE_9HwtbWjxxK6-1-EkPkY3AfV2c/copy
//

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group( {
      $key: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(4)] ),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ),
      // subject: new FormControl('', [Validators.required, Validators.minLength(4)] ),
      body: new FormControl('', [Validators.required, Validators.minLength(4)] ),
      // modified: new FormControl('', Validators.required),
    } );

  }

  // Submit form
  onSubmit() {
    // console.log(this.form.controls);

    //
    if (this.form.valid) {
        var id = this.form.get('$key').value;

      // Insert
      if (!id) {
        const email = {
          name: this.form.get('name').value,
          email: this.form.get('email').value,
          subject: 'CODE HIPPIE CONTACT', //this.form.get('subject').value,
          body: this.form.get('body').value,
          timestamp: new Date()
        };

        const formData = {
          formDataNameOrder: JSON.stringify(email),
          formGoogleSheetName: 'codehippie-contact' || "responses", // default sheet name
          formGoogleSendEmail: 'mark.angeletti@gmail.com' || "", // no email by default
        }
        // console.log('formData', formData);
        //
        this.contactService.sendGMail(formData).subscribe(
          data => {
            console.log('gmail', data);
          }
        );



      } else {
        // Update

      }

    }

  }


}
