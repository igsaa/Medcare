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
  rut: string = '';
  pass: string = '';
  usuario: any;
  listData = [];

  constructor(public toastController: ToastController, private router: Router,
    public menuCtrl: MenuController, private dbservice: DbService) {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  validarLogin() {
    if(this.rut==null || this.pass==null){
      this.failToast();
    }
    else{
      if(this.listData[0].toString()!==this.rut.toString() || this.listData[1]!==this.pass.toString()){
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

  createTables(){
    this.dbservice.createTables(this.dbservice.database);
  }

  insertIntos(){
    this.dbservice.insertIntos(this.dbservice.database);
  }

  logear(){
    this.dbservice.consultarDatos(this.rut, this.pass, this.dbservice.database)
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
