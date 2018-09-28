import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { UserService } from '../services/userService'
import { AboutPage } from '../pages/about/about';
import { MyProfilesPage } from '../pages/my-profiles/my-profiles';
import { HomePage } from '../pages/home/home';
import { HTTP } from '@ionic-native/http';
import { StatusBar } from '@ionic-native/status-bar';
import { LinkedIn } from '@ionic-native/linkedin';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { TwitterService } from 'ng2-twitter';
import { LongPressModule } from 'ionic-long-press';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { PresentationPage } from '../pages/presentation/presentation';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { ContactsPage } from '../pages/contacts/contacts'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ShareModalComponent } from '../modals/share-modal/share-modal'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { VerifyNumberPage } from '../pages/verify-number/verify-number';
import { SmsVerificationProvider } from '../providers/sms-verification/sms-verification';
import { HttpModule } from '@angular/http';
import { UserProvider } from '../providers/user/user';
import { SplashPage } from '../pages/splash/splash';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ProfileSharingConfirmationPage } from '../pages/profile-sharing-confirmation/profile-sharing-confirmation';
import { MainProfilePage } from '../pages/main-profile/main-profile';

import { QRScanner } from '@ionic-native/qr-scanner';
import { SharedWithPage } from '../pages/shared-with/shared-with';
import { PendingApprovalsPage } from '../pages/pending-approvals/pending-approvals';
import { SimulatorPage } from '../pages/simulator/simulator';
import { UtilsService } from '../services/utilsService';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { OneSignal } from '@ionic-native/onesignal';
import { ReadQrCodePage } from '../pages/read-qr-code/read-qr-code';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Keyboard } from '@ionic-native/keyboard';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    MyProfilesPage,
    HomePage,
    PresentationPage,
    ShareModalComponent,
    SignInPage,
    SignUpPage,
    VerifyNumberPage,
    SplashPage,
    ProfileSharingConfirmationPage,
    MainProfilePage,
    ContactsPage,
    SharedWithPage,
    PendingApprovalsPage,
    SimulatorPage,
    ProfileViewPage,
    ReadQrCodePage
  ],
  imports: [
    BrowserModule,
    LongPressModule,
    NgxQRCodeModule,
    BrMaskerModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.apiKeys.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp, { tabsLayout: 'icon-start', tabsPlacement: 'top'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    MyProfilesPage,
    HomePage,
    ShareModalComponent,
    PresentationPage,
    SignInPage,
    SignUpPage,
    VerifyNumberPage,
    SplashPage,
    ProfileSharingConfirmationPage,
    MainProfilePage,
    ContactsPage,
    SharedWithPage,
    PendingApprovalsPage,
    SimulatorPage,
    ProfileViewPage,
    ReadQrCodePage
  ],
  providers: [
    StatusBar,
    HTTP,
    UserService,
    LinkedIn,
    TwitterConnect,
    TwitterService,
    UtilsService,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    SmsVerificationProvider,
    UserProvider,
    ScreenOrientation,
    QRScanner,
    Keyboard,
    OneSignal
  ]
})
export class AppModule {}
