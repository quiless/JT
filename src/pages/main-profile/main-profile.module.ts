import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainProfilePage } from './main-profile';

@NgModule({
  declarations: [
    MainProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(MainProfilePage),
  ],
})
export class MainProfilePageModule {}
