import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryPage } from './history.page';
import {HttpClientModule   } from '@angular/common/http';
import {ApiService} from '../services/api.service';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: HistoryPage }])
  ],
  providers: [ApiService],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
