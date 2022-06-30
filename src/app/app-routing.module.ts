import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DbService } from './services/db.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'reserve',
    loadChildren: () => import('./reserve/reserve.module').then( m => m.ReservePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'my-data',
    loadChildren: () => import('./my-data/my-data.module').then( m => m.MyDataPageModule)
  },
  {
    path: 'alarm',
    loadChildren: () => import('./alarm/alarm.module').then( m => m.AlarmPageModule)
  },
  {
    path: 'alarm/:hora',
    loadChildren: () => import('./alarm/alarm.module').then( m => m.AlarmPageModule)
  },
  {
    path: 'alarm-modal',
    loadChildren: () => import('./alarm-modal/alarm-modal.module').then( m => m.AlarmModalPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
