import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { HotelInfo } from '../HotelClass';

@Component({
  selector: 'dialog-data',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogDataDialog {

  hotelInput : HotelInfo = new HotelInfo();

  constructor(
    public dialogRef: MatDialogRef<DialogDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  onYesClick(): void {
    this.dialogRef.close(this.hotelInput);
  }

  onNoClick(): void {
    this.dialogRef.close('Cancel');
  }

}



