import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ModalController } from '@ionic/angular';
import { AlarmModalPage } from '../alarm-modal/alarm-modal.page'; 
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage{
  hora: any;
  minuto:any;
  horaSeleccionada: any;
  storage = Storage;
  array_alarmas: any = [];  
  array_estados: any = [];
  index: any;

  constructor(private modalCtrl: ModalController, private alert: AlertController) { this.llenarAlarma() }

  //Método que abre el modal "reserve-modal", le envia la fecha seleccionada y al volver del dismiss asigna la hora médica tomada en la array
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: AlarmModalPage,
      cssClass: 'popup-modal'
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.horaSeleccionada = data['data']
        this.guardarAlarma()
      }
    });
    await modal.present();
  } 

  //Método que asigna las alarmas guardadas en la array para mostrarlas
  async llenarAlarma(){
    await this.storage.get({key: 'alarma_array'}).then((array) => { this.array_alarmas = JSON.parse(array.value) })
    await this.storage.get({key: 'estado_array'}).then((array) => { this.array_estados = JSON.parse(array.value) })
    await LocalNotifications.checkPermissions()
  }

  //Método que guarda la array de alarmas y estados en el Storage para su uso futuro
  async guardarAlarma(){
    await this.storage.get({key: 'alarma_array'}).then((array) => {
      if(array.value != null){
        this.array_alarmas = JSON.parse(array.value)
      }else{
        this.array_alarmas = []
      }
    })
    this.array_alarmas.push(this.horaSeleccionada)
    await this.storage.remove({key: 'alarma_array'})
    await this.storage.set({key: 'alarma_array', value: JSON.stringify(this.array_alarmas)})
    await this.storage.get({key: 'estado_array'}).then((array) => {
      if(array.value != null){
        this.array_estados = JSON.parse(array.value)
      }else{
        this.array_estados = []
      }
    })
    this.array_estados.push(false)
    await this.storage.remove({key: 'estado_array'})
    await this.storage.set({key: 'estado_array', value: JSON.stringify(this.array_estados)})
  }

  //Método para eliminar el index encontrado de la alarma y su estado
  async eliminarAlarma(index){
    this.index = index;
    this.array_alarmas.splice(index,1)
    await this.storage.remove({key: 'alarma_array'})
    await this.storage.set({key: 'alarma_array', value: JSON.stringify(this.array_alarmas)}).then(()=>{
      alert("Alarma borrada con éxito")
    })
    this.array_estados.splice(index,1)
    await this.storage.remove({key: 'estado_array'})
    await this.storage.set({key: 'estado_array', value: JSON.stringify(this.array_estados)})
  }  

  //Método que envía la notificación al telefono si es que la hora de la alarma es igual a la del telefono
  //y si es que su estado es "true"
  async notificationModel(index){
    this.hora = this.array_alarmas[index].split(':')[0];
    this.minuto = this.array_alarmas[index].split(':')[1];
    await this.storage.remove({key: 'estado_array'})
    await this.storage.set({key: 'estado_array', value: JSON.stringify(this.array_estados)})
    if (this.array_estados[index]==true){
      await LocalNotifications.schedule({
        notifications:[{
          id: index,
          title: 'Recordatorio',
          body: 'Hora de tus medicamentos',
          sound: 'alarma_molesta.wav',
          schedule: {on:{hour: this.hora, minute: this.minuto, second:0}}
        }]
      });
    }
    else{
      LocalNotifications.cancel({
        notifications: [{
          id: index
        }]
      })
    }
  }
}