import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    //form: FormGroup;


    departments = [
        { id: 1, value: 'Dep 1' },
        { id: 2, value: 'Dep 2' },
        { id: 3, value: 'Dep 3' },
    ];


  constructor(
    public usersService: UsersService,
    public dialogRef: MatDialogRef<UserComponent>
    ) { }



  ngOnInit() {
    //Get Users @page 1
    //this.getUsers(1);
  }

    //Get Users
    getUsers(pageNumber) {

        this.usersService.getUsers(pageNumber).subscribe(
            data => {
            //console.log(data.body);
            if (pageNumber === 1) {
                var users = data.body.results;
                console.log(users);
            }


            },
            error => {

            }

        );

    }

  onClear() {

    this.usersService.form.reset();
    this.usersService.initializeFormGroup();

    //this.notificationService.success(':: Submitted successfully');
  }

  //Form User
  onSubmit() {

    console.log(this.usersService.form);

    //
    if (this.usersService.form.valid) {
        var userId = this.usersService.form.get('$key').value;
        console.log(userId);
      //Insert
      if (!userId) {
        this.usersService.insertEmployee(this.usersService.form.value);
      } else {
        //this.usersService.updateEmployee(this.usersService.form.value);
      }

      //this.usersService.form.reset();
      //this.usersService.initializeFormGroup();

      //this.notificationService.success(':: Submitted successfully');
      //this.onClose();
    }

  }

  // Close dialog
  onClose() {
    this.usersService.form.reset();
    this.usersService.initializeFormGroup();
    this.dialogRef.close();
  }

}
