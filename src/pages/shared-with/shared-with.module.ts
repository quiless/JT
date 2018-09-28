import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedWithPage } from './shared-with';

@NgModule({
  declarations: [
    SharedWithPage,
  ],
  imports: [
    IonicPageModule.forChild(SharedWithPage),
  ],
})
export class SharedWithPageModule {}
