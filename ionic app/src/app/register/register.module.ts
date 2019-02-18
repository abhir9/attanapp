import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { RegisterPage } from './register.page';
import {HttpClientModule   } from '@angular/common/http';
import {ApiService} from '../services/api.service';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: RegisterPage }])
  ],
  providers: [ApiService],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
