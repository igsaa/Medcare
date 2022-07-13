import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReserveModalPageRoutingModule } from './reserve-modal-routing.module';

import { ReserveModalPage } from './reserve-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReserveModalPageRoutingModule
  ],
  declarations: [ReserveModalPage]
})
export class ReserveModalPageModule {}
