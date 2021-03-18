import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {GoogleDrivePickerService} from '../../services/google-drive-service.service';
import {Product} from '../../shared/product';

declare var gapi: any;
declare var google: any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = {_id: '', title: '', image: '', description: '', price: '', quantity: '',short_description: '', cat_id: ''};
  //product = {title: '', image: '', description: '', price: '', quantity: '',short_description: '', cat_id: 0};
  developerKey = 'AIzaSyDVeNZcaQhGGEcq64Ig9YKs5MGyQFDKUdc';
  clientId = "898420138508-180vnahbosbt013ljeph3frrheg9h8j5.apps.googleusercontent.com";
  scope = ['https://www.googleapis.com/auth/drive.file'];//insert scope here
  
  public pickerApiLoaded = false;
  private oauthToken=null;
  public appId = 'shopdon-1614963409256';  

  constructor(public dialogRef: MatDialogRef<EditProductComponent>, 
            private googleDrivePickerService: GoogleDrivePickerService,
            @Inject(MAT_DIALOG_DATA) public data: {id_product: string}) { }


  ngOnInit() {
    this.product._id = this.data.id_product;
  }
 

  onSubmit() {
    console.log('User: ', this.product);
    this.dialogRef.close();
  }

  /*
  loadGoogleDrive() {
    gapi.load('auth', { 'callback': this.onAuthApiLoad.bind(this) });
    gapi.load('picker', { 'callback': this.onPickerApiLoad.bind(this) });
  }

  onAuthApiLoad() {
    gapi.auth.authorize(
      {
        'client_id': this.clientId,
        'scope': this.scope,
        'immediate': false
      },
      this.handleAuthResult);
  }

  onPickerApiLoad() {
    this.pickerApiLoaded = true;
  }
  

  handleAuthResult(authResult) {
    let src;
    if (authResult && !authResult.error) {
      if (authResult.access_token) {
        let view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("image/png,image/jpeg,image/jpg,video/mp4");
        let pickerBuilder = new google.picker.PickerBuilder();
        let picker = pickerBuilder.
          enableFeature(google.picker.Feature.NAV_HIDDEN).
          setOAuthToken(authResult.access_token).
          addView(view).
          addView(new google.picker.DocsUploadView()).
          setCallback(function (e) {
            if (e[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
              let doc = e[google.picker.Response.DOCUMENTS][0];
              src = doc[google.picker.Document.URL];
              console.log("Document selected is", doc,"and URL is ",src);
            }
          }).
          build();
        picker.setVisible(true);        
      }
    }
  }

  */

 loadGoogleDrive(): void {
    this.googleDrivePickerService.open((data) => {
      if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        let doc = data[google.picker.Response.DOCUMENTS][0];
        this.product.image = doc[google.picker.Document.URL];
      }
    });
  }
 
}
  
