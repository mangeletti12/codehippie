import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public dialogRef: MatDialogRef<ModalComponent >,
    private modalService: DialogService,
  ) {
    // console.log(modalData);
  }

  ngOnInit() {

  }

  // When the user clicks the action button, the modal calls the service\
  // responsible for executing the action for this modal (depending on\
  // the name passed to `modalData`). After that, it closes the modal
  actionFunction(msg) {
    // console.log('actionFunction', this.modalData);
    this.modalService.modalAction(this.modalData);
    this.closeModal(msg);
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal(msg) {
    // console.log('closeModal', this.modalData);
    this.dialogRef.close(msg);
  }


}
