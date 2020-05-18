import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './mat-confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {

  constructor(
    private dialog: MatDialog,

    ) {

  }

  //Open dialog
  openConfirmDialog(msg) {

    // const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   width: '250px',
    //   data: {name: this.name, animal: this.animal}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });

    return this.dialog.open(MatConfirmDialogComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      // disableClose: true,
      // position: { top: "10px" },
      data: {
        message: msg
      }
    });

  }

}
