import { Component } from '@angular/core';
import { MyModalPage } from '../my-modal/my-modal.page';
import { ModalController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage{
  storage = Storage;
  array_usuario: any = [];
  array_doctor: any = [];
  nombre: any;
  remedio: any;
  dosis: any;
  date: Date = new Date();
  today_nombre: any;
  today_numero: any;

  constructor(private dbservice: DbService, private modalCtrl: ModalController) {
    try{
      this.llenarDatos()
      this.llenarDia(this.date)
    }
    catch(e){
        console.log("TRY CATCH DEL START PAGE: " + e)
    }
  }
  
  llenarDia(date: Date){
    this.today_numero = date.getDate()
    if(date.getDay() == 1){
      this.today_nombre = "Lunes"
    }else if(date.getDay() == 2){
      this.today_nombre = "Martes"
    }else if(date.getDay() == 3){
      this.today_nombre = "Miercoles"
    }else if(date.getDay() == 4){
      this.today_nombre = "Jueves"
    }else if(date.getDay() == 5){
      this.today_nombre = "Viernes"
    }else if(date.getDay() == 6){
      this.today_nombre = "Sabado"
    }else{
      this.today_nombre = "Domingo"
    }
  } 

  async llenarDatos(){
      this.array_usuario = [];
      this.array_doctor = [];
      await this.storage.get({key: 'usuario'}).then((array) => {this.array_usuario = JSON.parse(array.value)})
      .then(() => {
        this.nombre = this.array_usuario.map(usuario => usuario.nombre)
        this.remedio = this.array_usuario.map(usuario => usuario.remedio)
        this.dosis = this.array_usuario.map(usuario => usuario.dosis)
      })
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: MyModalPage,
      cssClass: 'popup-modal'
    });
    await modal.present();
  }
}
