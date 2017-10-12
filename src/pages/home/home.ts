import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isCamOn: boolean = false;
  picture: any;

  constructor(public navCtrl: NavController, private diagnostic: Diagnostic, public toastCtrl: ToastController, private platform: Platform, private cameraPreview: CameraPreview) {
    this.check();
  }

  public check() {
    this.diagnostic.isCameraAuthorized().then((authorized) => {
      if (authorized)
        console.log('Permission granted')
      else {
        this.diagnostic.requestCameraAuthorization().then((status) => {
          if (status == this.diagnostic.permissionStatus.GRANTED)
            console.log('Permission granted')
          else {
            // Permissions not granted
            // Therefore, create and present toast
            this.toastCtrl.create(
              {
                message: "Cannot access camera",
                position: "bottom",
                duration: 5000
              }
            ).present();
          }
        });
      }
    });

  }

  openCam() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: this.cameraPreview.CAMERA_DIRECTION.FRONT,
      tapPhoto: false,
      previewDrag: false,
      toBack: true,
      alpha: 1
    };
    this.isCamOn = true;
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });

  }

  openCamBack() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: this.cameraPreview.CAMERA_DIRECTION.BACK,
      tapPhoto: false,
      previewDrag: false,
      toBack: true,
      alpha: 1
    };
    this.isCamOn = true;
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });

  }

  showCamera() {
    this.cameraPreview.show();
  }

  stopCamera() {
    this.cameraPreview.stopCamera();
  }

  takePicture() {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }

    this.cameraPreview.takePicture(pictureOpts).then(function (imgData) {
      console.log('Picture taken');
      (<HTMLInputElement>document.getElementById('previewPicture')).src = 'data:image/jpeg;base64,' + imgData;
    }, (err) => {
      console.log(err);
    });
  }

}