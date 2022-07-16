import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format,parseISO } from 'date-fns';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-alarm-modal',
  templateUrl: './alarm-modal.page.html',
  styleUrls: ['./alarm-modal.page.scss'],
})
export class AlarmModalPage{
  horaSeleccionada = '';
  array_alarmas: any = [];
  storage = Storage;
  index:any;
  estado: any = [];

  constructor(private modalCtrl: ModalController) {}

  //Método para retornar a la página anterior (/alarm) al aceptar
  async dismissAceptar(){
    await this.modalCtrl.dismiss(this.horaSeleccionada);
  }

  //Método para retornar a la página anterior (/alarm) al cancelar
  async dismissCancelar(){
    await this.modalCtrl.dismiss();
  }

  //Método que guarda la hora en formato 'HH:mm' en una variable para luego almacenarla
  timeSelected(date){
    this.horaSeleccionada = format(parseISO(date), 'HH:mm');
  }

  //Método que se ejecuta al apretar el botón aceptar
  //De no seleccionar una hora, emite una alerta para informar al usuario que debe escoger una
  async btnAceptar(value){
    if(!value){
      alert("Porfavor seleccione una hora")
    }else{
    this.timeSelected(value);
    this.dismissAceptar();
    }
  }
}