import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconConstants } from '../../common/icon-constants';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent {
  icon = IconConstants;
  modalTitle: string;
  modalContent: string;
  focusCancel: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modalContent = data.content;
    this.focusCancel = data.focusButton === 'cancel';
  }
}
