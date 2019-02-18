import { Component } from '@angular/core';
import { Device} from '@ionic-native/device/ngx';
import { ApiService } from '../services/api.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ScanService } from '../services/scanner.service';
interface deviceInterface {
  id?: string;
  model?: string;
  cordova?: string;
  platform?: string;
  version?: string;
  manufacturer?: string;
  serial?: string;
  isVirtual?: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  loginData: {};
  historylog: any = [] ;
  public deviceInfo: deviceInterface = {};
  constructor(private device: Device, private apiService: ApiService, private scanner: ScanService,  public actionSheetController: ActionSheetController, private router: Router, private storage: Storage) {
    this.deviceInfo.id = this.device.uuid;
    this.deviceInfo.model = this.device.model;
    this.deviceInfo.cordova = this.device.cordova;
    this.deviceInfo.platform = this.device.platform;
    this.deviceInfo.version = this.device.version;
    this.deviceInfo.manufacturer = this.device.manufacturer;
    this.deviceInfo.serial = this.device.serial;
    this.deviceInfo.isVirtual = this.device.isVirtual;
     this.loginData = {avatar: 'assets/img/profile.png', success: false, name: 'Please login to ', designation: 'see you details', time: ''};
    this.storage.set('device', this.deviceInfo);
  }
  replaceInfo(loginData) {
    for (const key in loginData) {
      if (key === 'isNew') {
        return this.apiService.showToast('Registration Required !!', 'danger', 'middle');
      }

      this.loginData[key] = loginData[key];
    }

    this.apiService.showToast((Object.keys(loginData).length > 2 ? 'Done' : 'Please Scan correct Code'), 'success', 'bottom');
    return this.loginData;
  }

  scan() {
    this.scanner.scan().then(scanArray => {
      return this.apiService.post(scanArray[1], {'organisationId': scanArray[0], 'device': this.deviceInfo});
    }).then((loginData: any)  => {
      if (loginData.time) {
      this.historylog.push({'time': loginData.time, 'type': loginData.type});
      }
      if (this.historylog.length > 5) {
        this.historylog.shift();
      }
      return this.replaceInfo(loginData); } , (err) => {

  //  for browser
      return this.apiService.post('http://172.20.10.2:3000/check/', {'organisationId': 'logindb111', 'profile': {}, 'device': {'id':'asdfasd'}});
    }).then((loginData: any)  => {

      if(loginData.time)
        this.historylog.push({'time': loginData.time, 'type': loginData.type});

      if (this.historylog.length > 5) {
        this.historylog.shift();
      }
      return this.replaceInfo(loginData);
//    for browser
    });
  }



  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'First Time User',
      buttons: [{
        text: 'Register',
        icon: 'person-add',
        handler: () => {
          this.router.navigateByUrl('/tabs/register');
        }
      }]
    });
    await actionSheet.present();
  }
}
