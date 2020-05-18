import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DialogService {

  constructor(
    // private dialog: MatDialog,

    ) {

  }

  // This function is the only way this service is directly called in the modal.
  // The modal passes to it the received `data` object and then this function\
  // calls the appropriate function based on the name of the modal. Then, that\
  // function receives whatever values it needs that were included in `data`
  modalAction(modalData: any) {
    // console.log('modalAction', modalData);

  }

  //Open dialog
  // openConfirmDialog(msg) {
  //   console.log('openConfirmDialog', msg);

  //   const dialogConfig = new MatDialogConfig();
  //   // The user can't close the dialog by clicking outside its body
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = "modal-component";
  //   dialogConfig.panelClass = 'confirm-dialog-container';
  //   dialogConfig.height = "350px";
  //   dialogConfig.width = "600px";
  //   dialogConfig.data = { message: msg };

  //   // https://material.angular.io/components/dialog/overview
  //   // const modalDialog = this.dialog.open(ModalComponent, dialogConfig);

  //   // return this.dialog.open(MatConfirmDialogComponent, {
  //   //   width: '400px',
  //   //   panelClass: 'confirm-dialog-container',
  //   //   disableClose: true,
  //   //   // position: { top: "10px" },
  //   //   data: {
  //   //     message: msg
  //   //   }
  //   // });

  // }

}
