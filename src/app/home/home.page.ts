import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: string;
  pass: string;
  listData = [];

  constructor(private dataService: DataService, public toastController: ToastController, private router: Router,
    public menuCtrl: MenuController, private dbservice: DbService) {
    this.loadData();
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  async loadData() {
    this.listData = await this.dataService.getData();
  }

  async addData() {
    await this.dataService.addData(this.user);
    await this.dataService.addData(this.pass);
    await this.dataService.addData('Alan Moscoso');
    await this.dataService.addData('ASMA');
    await this.dataService.addData('Budesonida');
    this.loadData();
  }

  async removeItem(index) {
    this.dataService.removeItem(index);
    this.listData.splice(index, 1);
  }

  validarLogin() {
    if(this.user==null || this.pass==null){
      this.failToast();
    }
    else{
      if(this.listData[0].toString()!==this.user.toString() || this.listData[1]!==this.pass.toString()){
        this.failAuth();
      }
      else {
        this.successToast();
      }
    }
  }

  async failToast() {
    const toast = await this.toastController.create({
      message: 'Datos faltantes o erroneos',
      duration: 2000,
      color: 'danger',
      position: 'top',
      cssClass: 'toast-crear',
      icon: 'alert-circle-outline'
    });
    toast.present();
  }

  async failAuth() {
    const toast = await this.toastController.create({
      message: 'Usuario y/o Contraseña Incorrectos',
      duration: 2000,
      color: 'danger',
      position: 'top',
      cssClass: 'toast-crear',
      icon: 'alert-circle-outline'
    });
    toast.present();
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Sesion iniciada',
      duration: 2000,
      color: 'success',
      position: 'top',
      cssClass: 'toast-crear',
      icon: 'checkmark-circle-outline'
    });
    toast.present();
    this.router.navigate(['start']);
  }
}
