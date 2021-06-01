import {Injectable} from '@angular/core';

declare const gapi: any;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDrivePickerService {

  private clientId = "898420138508-180vnahbosbt013ljeph3frrheg9h8j5.apps.googleusercontent.com";
  private apiKey = 'AIzaSyDVeNZcaQhGGEcq64Ig9YKs5MGyQFDKUdc';
  private appId = 'shopdon-1614963409256';  
  private scope= ['https://www.googleapis.com/auth/drive.file'];//insert scope here

  private oauthAccessToken = null;
  private pickerApiLoaded = false;
  private pickerCallback = null;

  public open(callback): void {
    this.pickerCallback = callback;
    this.oauthAccessToken = null;
    gapi.load('auth', {'callback': this.onAuthApiLoad.bind(this)});
    gapi.load('picker', {'callback': this.onPickerApiLoad.bind(this)});
  }

  private onAuthApiLoad(): void {
    gapi.auth.authorize({
      'client_id': this.clientId,
      'scope': this.scope,
      'immediate': false,
    }, this.handleAuthResult.bind(this));
  }

  private onPickerApiLoad(): void {
    this.pickerApiLoaded = true;
    this.createPicker();
  }

  private handleAuthResult(authResult): void {
    console.log(authResult);
    if (authResult && !authResult.error) {
      this.oauthAccessToken = authResult.access_token;
      console.log("chega");
      this.createPicker();
    }
  }

  private createPicker(): void {
    if (this.pickerApiLoaded && this.oauthAccessToken) {
      console.log("chega1");
      let view = new google.picker.View(google.picker.ViewId.DOCS);
      view.setMimeTypes("image/png,image/jpeg,image/jpg");
      let picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(this.appId)
        .setOAuthToken(this.oauthAccessToken)
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setDeveloperKey(this.apiKey)
        .setCallback(this.pickerCallback)
        .build();
      picker.setVisible(true);
    }
  }
}