import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private handleError: HandleError;
    userList: any;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    httpErrorHandler: HttpErrorHandler
    ) {
    this.handleError = httpErrorHandler.createHandleError('UsersService');
  }

  //TODO: move out of service into comp

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  //Reset
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }

  //Get List
  getUsers(pageNumber) {

    let url = "https://swapi.dev/api/people/";
    let page = "?page=" + pageNumber;

    return this.http.get<any>(url+page, httpOptions)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );

  }

  timeout() {
    setTimeout(function () {
        console.log('timeout');

    }, 7000);
  }

  //Insert
  insertEmployee(employee) {

    console.log(employee);

    // this.userList.push({
    //     fullName: employee.fullName,
    //     email: employee.email,
    //     mobile: employee.mobile,
    //     city: employee.city,
    //     gender: employee.gender,
    //     department: employee.department,
    //     hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    //     isPermanent: employee.isPermanent
    // });

  }

  populateForm(user) {
    //this.form.setValue(_.omit(employee,'departmentName'));
    //
    //this.form.setValue(user);
  }

}
