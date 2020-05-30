import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group( {
      $key: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(4)] ),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ),
      subject: new FormControl('', [Validators.required, Validators.minLength(4)] ),
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
            subject: this.form.get('subject').value,
            body: this.form.get('body').value,
            date: new Date()
          };

          console.log('email', email);

        } else {
          // Update

        }

      }

    }


}
