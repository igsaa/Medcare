import { Component } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public rut: string = '';
  public pass: string = '';
  listData = [];

  constructor(public toastController: ToastController, private router: Router, private dbservice: DbService, private menuCtrl: MenuController) {}

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
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

  async emptyToast() {
    const toast = await this.toastController.create({
      message: 'Datos Faltantes',
      duration: 2000,
      color: 'danger',
      position: 'top',
      cssClass: 'toast-crear',
      icon: 'alert-circle-outline'
    });
    toast.present();
  }
  
  async successToast(rut) {
    const toast = await this.toastController.create({
      message: 'Sesion iniciada',
      duration: 2000,
      color: 'success',
      position: 'top',
      cssClass: 'toast-crear',
      icon: 'checkmark-circle-outline'
    });
    toast.present();
    this.router.navigate(['start', rut]);
  }

  logear(){
    if (this.rut === '' || this.pass === ''){
      this.emptyToast();
    }
    else{
      this.dbservice.consultarDatosLogin(this.rut, this.pass, this.dbservice.database)
    .then((data) => {
      if(data){
        this.successToast(this.rut);
      }
      else{
        this.failAuth();
      }
    })
    } 
  }
}
