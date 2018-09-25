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

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    MyProfilesPage,
    HomePage,
    PresentationPage,
    SignInPage,
    SignUpPage,
    VerifyNumberPage,
    SplashPage,
    ProfileSharingConfirmationPage,
    MainProfilePage
  ],
  imports: [
    BrowserModule,
    LongPressModule,
    NgxQRCodeModule,
    BrMaskerModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCPkujlY1dTQjZGukzXjzqPNK5CY33PF4k",
      authDomain: "justtap-8e195.firebaseapp.com",
      databaseURL: "https://justtap-8e195.firebaseio.com",
      projectId: "justtap-8e195",
      storageBucket: "justtap-8e195.appspot.com",
      messagingSenderId: "723897753446"
    }),
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
    PresentationPage,
    SignInPage,
    SignUpPage,
    VerifyNumberPage,
    SplashPage,
    ProfileSharingConfirmationPage,
    MainProfilePage
  ],
  providers: [
    StatusBar,
    HTTP,
    UserService,
    LinkedIn,
    TwitterConnect,
    TwitterService,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    SmsVerificationProvider,
    UserProvider
  ]
})
export class AppModule {}
