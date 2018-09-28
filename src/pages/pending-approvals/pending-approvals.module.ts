import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingApprovalsPage } from './pending-approvals';

@NgModule({
  declarations: [
    PendingApprovalsPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingApprovalsPage),
  ],
})
export class PendingApprovalsPageModule {}
