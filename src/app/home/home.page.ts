import { Component } from '@angular/core';
import { ReserveModalPage } from '../reserve-modal/reserve-modal.page';
import { ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{
  storage = Storage;
  array_usuario: any = [];
  nombre: any;
  remedio: any;
  dosis: any;
  date: Date = new Date();
  today_nombre: any;
  today_numero: any;

  constructor(private modalCtrl: ModalController, private router: Router) {
    try{
      this.llenarDatos()
      this.llenarDia(this.date)
    }
    catch(e){
        console.log("TRY CATCH DEL START PAGE: " + e)
    }
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ReserveModalPage,
      cssClass: 'popup-modal'
    });
    await modal.present();
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
      await this.storage.get({key: 'usuario'}).then((array) => {this.array_usuario = JSON.parse(array.value)})
      .then(() => {
        this.nombre = this.array_usuario.map(usuario => usuario.nombre)
        this.remedio = this.array_usuario.map(usuario => usuario.remedio)
        this.dosis = this.array_usuario.map(usuario => usuario.dosis)
      })
  }

  toReserve(){
    this.router.navigate(['/reserve'], { replaceUrl: true });
  }

  toAlarm(){
    this.router.navigate(['/alarm'], { replaceUrl: true });
  }

}
