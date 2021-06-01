import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {GoogleDrivePickerService} from '../../services/google_drive/google-drive-service.service';
import {Product} from '../../shared/product';
import {ProductService} from '../../services/product/product.service';
import {UserService,ResponseModel} from '../../services/user/user.service';

declare var gapi: any;
declare var google: any;

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponent implements OnInit {

  product: Product = {_id: '', title: '', image: '', description: '', price: '', quantity: '',short_description: '', cat_id: ''};
  developerKey = 'AIzaSyDVeNZcaQhGGEcq64Ig9YKs5MGyQFDKUdc';
  clientId = "898420138508-180vnahbosbt013ljeph3frrheg9h8j5.apps.googleusercontent.com";
  scope = ['https://www.googleapis.com/auth/drive.file'];//insert scope here
  
  public pickerApiLoaded = false;
  private oauthToken=null;
  public appId = 'shopdon-1614963409256'; 
  private userId:any; 

  constructor(public dialogRef: MatDialogRef<AddComponent>, 
            private googleDrivePickerService: GoogleDrivePickerService,
            private productService: ProductService,
            private userService: UserService
            ) { }


  ngOnInit() {
    var user = this.userService.userData$.getValue();
    if(user){
      if('user' in user){this.userId = user['user']['id'];}
      else if('id' in user){this.userId = user['id'];}
    }
    
  }
 

  onSubmit() {
    console.log('User: ', this.product);
    this.dialogRef.close();
    this.productService.addProduct(this.product,this.userId).subscribe((response: { message: string }) => {
       console.log(response.message);
    });
  }


 loadGoogleDrive(): void {
    this.googleDrivePickerService.open((data) => {
      if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        let doc = data[google.picker.Response.DOCUMENTS][0];
        this.product.image = 'https://drive.google.com/thumbnail?id='+ doc[google.picker.Document.ID];
        console.log(this.product.image);
      }
    });
  }
 
}
