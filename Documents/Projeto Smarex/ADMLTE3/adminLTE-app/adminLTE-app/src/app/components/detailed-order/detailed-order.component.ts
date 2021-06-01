import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {GoogleDrivePickerService} from '../../services/google_drive/google-drive-service.service';
import {Product} from '../../shared/product';
import {Order} from '../../shared/order';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-detailed-order',
  templateUrl: './detailed-order.component.html',
  styleUrls: ['./detailed-order.component.scss']
})
export class DetailedOrderComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailedOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any[]) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
