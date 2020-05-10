import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
//security
import { AppUser } from '../security/app-user';
import { AuthenticationService } from '../security/auth.service';
//
import { CustomValidators } from '../validation/custom-validation';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginSuccess = false;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    // redirect to home if already logged in
    if (this.authService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    //
    this.form = this.fb.group({
      email: ['', [Validators.required, CustomValidators.isValidEmail]], //Validators.minLength(2)
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  loginAPI() {
    this.submitted = true;

    console.log(this.user);
    console.log(this.form.controls);

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    //
    this.user.username = this.form.controls.email.value;
    this.user.password = this.form.controls.password.value;

    this.loading = true;
    //
    this.authService.login(this.user)
        .pipe(first())
        .subscribe(
            data => {
                //
                if(data.access_token != undefined && data.access_token != "") {
                  this.loginSuccess = true;
                  this.loginError = false;

                  setTimeout( ()=> {
                    this.router.navigate([this.returnUrl]); 
                  }, 2000);
                } 
                else {
                  this.loginError = true;
                  this.loginSuccess = false;
                }

            },
            error => {
                //this.alertService.error(error);
                this.loading = false;
                this.loginError = true
                this.loginSuccess = false;
            });
    
  }

  
  //Login for MOCK DATA
  login() {
    this.submitted = true;

    console.log(this.user);
    console.log(this.form.controls);

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    //
    this.user.username = this.form.controls.email.value;
    this.user.password = this.form.controls.password.value;

    this.loading = true;
    //
    this.authService.login(this.user)
        .pipe(first())
        .subscribe(
            data => {
                //
                if(data.access_token != undefined && data.access_token != "") {
                  this.loginSuccess = true;
                  this.loginError = false;

                  setTimeout( ()=> {
                    this.router.navigate([this.returnUrl]); 
                  }, 2000);
                } 
                else {
                  this.loginError = true;
                  this.loginSuccess = false;
                }

            },
            error => {
                //this.alertService.error(error);
                this.loading = false;
                this.loginError = true
                this.loginSuccess = false;
            });
    
  }
  

}