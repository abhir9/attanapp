import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient ,public toastController: ToastController) { }
    async showToast(msg,color,position){
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: color?color:'primary',
            position: position?position:'bottom'
        });
        toast.present();
            }

  get(url,id) {
      return this.http.get(url+id)
          .toPromise().then(res=>res)
          .catch(error=>error);
    }
    post(url,body) {
        return this.http.post(url,body,{})
            .toPromise().then(res=>res)
            .catch((error)=>{
                this.showToast(error.message,'success', 'bottom');
            });
    }
  }
