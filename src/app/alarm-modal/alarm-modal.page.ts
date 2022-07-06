import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format,parseISO } from 'date-fns';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-alarm-modal',
  templateUrl: './alarm-modal.page.html',
  styleUrls: ['./alarm-modal.page.scss'],
})
export class AlarmModalPage implements OnInit {
  timeFormattedString= 'testing';
  alarma: any = [];
  storage = Storage;
  index:any;

  constructor(private modalCtrl: ModalController, private router: Router) {
  }

  ngOnInit() {
    this.llenarAlarma();
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }


  async llenarAlarma(){
    await this.storage.get({key: 'alarma'}).then((array) => {
      if(array.value.length>0){
        this.alarma = JSON.parse(array.value)
      }
    })
    console.log('alarma: '+this.alarma);
  }

  async setAlarma(hora){
    await this.storage.set({key: 'alarma', value: JSON.stringify(hora)})
  }

  async deleteAlarm(){
    await this.storage.remove({key:'alarma'});
  }

  timeSelected(value){
    this.timeFormattedString = format(parseISO(value), 'HH:mm');
    this.alarma.push({hora: this.timeFormattedString.split(':')[0], minutos: this.timeFormattedString.split(':')[1]});
    console.log('Hora ' + this.alarma[0].hora + ':' +this.alarma[0].minutos);
    this.setAlarma(this.alarma);
  }


  clear(){
    this.storage.clear();
  }

}
