import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() title: string = 'Default Title';
  @Input() message: any = null;
  @Input() cancelLabel: string = 'Cancel';
  @Input() confirmLabel: string = 'Confirm';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.cancelLabel = data.cancelLabel || this.cancelLabel;
      this.confirmLabel = data.confirmLabel || this.confirmLabel;
    }
  }

  ngOnInit(): void {
  }

}
