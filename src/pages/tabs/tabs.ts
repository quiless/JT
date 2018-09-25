import { Component  } from '@angular/core';
import { Events } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ContactsPage } from '../contacts/contacts'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  tab4Root = ContactsPage;
  constructor(private  events : Events) {

  }

}
