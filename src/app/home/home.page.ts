import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
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

  constructor(public toastController: ToastController, private router: Router, private dbservice: DbService) {}

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

  logear(){
    this.dbservice.consultarDatosLogin(this.rut, this.pass, this.dbservice.database)
    .then((data) => {
      if(data){
        this.successToast();
      }
      else{
        this.failAuth();
      }
    })
  }
}
