import { Component  } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ScanService } from '../services/scanner.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  private register: FormGroup;
  constructor( private formBuilder: FormBuilder, private apiService: ApiService, private scanner: ScanService, private router: Router, private storage: Storage) {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required]
    });

  }
  submitForm() {
    // this.scanner.scan().then(scanArray => {
          return this.storage.get('device').then(deviceInfo => {
            this.storage.set('profileInfo', this.register.value);
            // return this.apiService.post(scanArray[1], {'organisationId': scanArray[0], 'profile': this.register.value, 'device': deviceInfo}
            return this.apiService.post('http://localhost:3000/make/', {'organisationId': 'logindb111', 'profile': {name:"demo",designation:"demo1"}, 'device': {'id':'asdfasd'}}


            );
            }).then((loginData: any) => {
            if (loginData.success) {
              this.router.navigateByUrl('/tabs/home');
            }
          this.apiService.showToast(loginData.message, (loginData.success ? 'success' : 'danger'), 'bottom');
       }, (err) => {});
  // });
}
}



