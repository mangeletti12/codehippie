import { Injectable } from '@angular/core';
//import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './mat-confirm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';



@Injectable({ providedIn: 'root' })
export class DialogService {
  private handleError: HandleError;
    userList: any;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    httpErrorHandler: HttpErrorHandler
    ) {

    this.handleError = httpErrorHandler.createHandleError('DialogService');
  }

  //Open dialog
  openConfirmDialog(msg) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data: {
        message: msg
      }
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



}
