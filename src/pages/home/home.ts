import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isCamOn: boolean = false;
  picture: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private cameraPreview: CameraPreview, private platform: Platform) {
  }

  openCam() {

    this.platform.ready().then(() => {
      let options = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: this.cameraPreview.CAMERA_DIRECTION.FRONT,
        toBack: true,
        tapPhoto: false,
        previewDrag: false
      };
      this.isCamOn = true;
      this.cameraPreview.startCamera(options).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });
    })
    /*let cameraPreviewOpts: CameraPreviewOptions = {
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

    this.cameraPreview.startCamera(cameraPreviewOpts);*/

  }
}