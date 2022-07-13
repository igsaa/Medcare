import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-reserve-modal',
  templateUrl: './reserve-modal.page.html',
  styleUrls: ['./reserve-modal.page.scss'],
})
export class ReserveModalPage{
  
  storage = Storage;
  horaSeleccionada = '';
  fechaSeleccionada = '';
  hourValues = ['08','09','10','11','12','13','14','15','16','17','18'];
  minutesValues = ['00','15','30','45'];
  constructor(private modalCtrl: ModalController) { this.fechaTemporal() }


  //Método para retornar a la página anterior (/reserve)
  async dismiss(){
    this.modalCtrl.dismiss();
    await this.storage.remove({key:'fechaTemporal'})
  }

  //Método que guarda la hora en formato 'HH:mm' en una variable para luego almacenarla
  timeSelected(date){
    this.horaSeleccionada = format(parseISO(date), 'HH:mm');
  }

  //Método que actualiza la hora seleccionada en tiempo real para la visualización del usuario al momento de aceptar
  actualizarHora(date){
    this.timeSelected(date);
  }

  //Método que trae la fecha seleccionada para guardarla en el storage
  async fechaTemporal(){
    await this.storage.get({key: 'fechaTemporal'})
    .then(fecha => {
      this.fechaSeleccionada = fecha.value;
    })
  } 

  //Método que trae la fecha seleccionada en la página anterior para luego almacenarla junto a la hora seleccionada
  async guardarFechaHora(){
    await this.storage.set({key: 'horaMedica', value: this.fechaSeleccionada + " - " + this.horaSeleccionada})
  }

  //Método que se ejecuta al apretar el botón aceptar
  //De no seleccionar una hora, emite una alerta para informar al usuario que debe escoger una
  async btnAceptar(value){
    if(!value){
      alert("Porfavor seleccione una hora")
    }else{
    this.timeSelected(value);
    this.guardarFechaHora();
    this.dismiss();
    }
  }
}