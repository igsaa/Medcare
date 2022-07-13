import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveModalPage } from './reserve-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ReserveModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReserveModalPageRoutingModule {}
