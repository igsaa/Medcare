import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmModalPage } from './alarm-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmModalPageRoutingModule {}
