import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage {
  historydata: any = {} ;
  constructor( private apiService: ApiService,public storage: Storage){

    this.apiService.post('http://localhost:3000/history', {'organisationId': 'logindb111', 'profile': {}, 'device': {'id':'asdfasd'}}).then((data:any)=>{this.historydata=data.history; console.log(this.historydata);});
  }
}
