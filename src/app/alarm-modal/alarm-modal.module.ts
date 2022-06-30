import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmModalPageRoutingModule } from './alarm-modal-routing.module';

import { AlarmModalPage } from './alarm-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmModalPageRoutingModule
  ],
  declarations: [AlarmModalPage]
})
export class AlarmModalPageModule {}
