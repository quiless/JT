import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileSharingConfirmationPage } from './profile-sharing-confirmation';

@NgModule({
  declarations: [
    ProfileSharingConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileSharingConfirmationPage),
  ],
})
export class ProfileSharingConfirmationPageModule {}
