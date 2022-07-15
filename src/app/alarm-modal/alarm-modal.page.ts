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

  //Método para retornar a la página anterior (/alarm)
  async dismiss(){
    await this.modalCtrl.dismiss();
  }

  //Método que guarda la array de alarmas en el Storage para su uso futuro
  async guardarAlarma(){
    await this.storage.get({key: 'alarma_array'}).then((array) => {this.array_alarmas = JSON.parse(array.value)})
    await this.storage.remove({key: 'alarma_array'})
    this.array_alarmas.push(this.horaSeleccionada)
    await this.storage.set({key: 'alarma_array', value: JSON.stringify(this.array_alarmas)})
    await this.storage.get({key: 'estado'}).then((data) => {
      if(data.value!=null){
        this.estado = JSON.parse(data.value)
      }
    })
    await this.storage.remove({key: 'estado'})
    this.estado.push(false)
    await this.storage.set({key: 'estado', value: JSON.stringify(this.estado)})
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
    await this.guardarAlarma();
    this.dismiss();
    }
  }
}