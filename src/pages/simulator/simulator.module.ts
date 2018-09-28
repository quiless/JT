import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimulatorPage } from './simulator';

@NgModule({
  declarations: [
    SimulatorPage,
  ],
  imports: [
    IonicPageModule.forChild(SimulatorPage),
  ],
})
export class SimulatorPageModule {}
