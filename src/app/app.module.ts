import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { UserService } from '../services/userService'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
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
import { ShareModalComponent } from '../modals/share-modal/share-modal'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { VerifyNumberPage } from '../pages/verify-number/verify-number';
import { SmsVerificationProvider } from '../providers/sms-verification/sms-verification';
import { HttpModule } from '@angular/http';
import { UserProvider } from '../providers/user/user';
import { SplashPage } from '../pages/splash/splash';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PresentationPage,
    ShareModalComponent,
    SignInPage,
    SignUpPage,
    VerifyNumberPage,
    SplashPage
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
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp, { tabsLayout: 'icon-start', tabsPlacement: 'top'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ShareModalComponent,
    PresentationPage,
    SignInPage,
    SignUpPage,
    VerifyNumberPage,
    SplashPage
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
