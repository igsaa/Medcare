import { Component, OnInit } from '@angular/core';
import { ReserveModalPage } from '../reserve-modal/reserve-modal.page';
import { ModalController } from '@ionic/angular';
import { format, isThisMinute, parseISO  } from 'date-fns';
import { es } from 'date-fns/locale';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.page.html',
  styleUrls: ['./reserve.page.scss'],
})
export class ReservePage{

  storage = Storage;
  array_horas_medicas: any = [];
  fecha = '';
  index: any;
  horaMedica = '';
  minDate: string = new Date().toISOString();
  selectedDate: string = new Date().toISOString();

  constructor(private modalCtrl: ModalController) { 
    this.asignarHorasMedicas()
   }

  //Método que abre el modal "reserve-modal"
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ReserveModalPage,
      cssClass: 'popup-modal'
    });

    await modal.present();
  }

  //Método que desactica el día 0 (Domingo) del calendario
  notSunday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0;
  }

  //Método que retorna el índex del array de horas_medicas
  setIndex(index){
    this.index = index;
  }

  //Método para eliminar el index encontrado de la hora médica
  async eliminarHoraMedica(index){
    this.setIndex(index)
    this.array_horas_medicas.splice(index, 1)
    await this.storage.remove({key: 'horaMedica_array'})
    await this.storage.set({key: 'horaMedica_array', value: JSON.stringify(this.array_horas_medicas)}).then(()=>{
      alert("Hora médica borrada con éxito")
    })
  }

  //Método que asigna las horas médicas tomadas en la array para mostrarlas
  async asignarHorasMedicas(){
    await this.storage.get({key: 'horaMedica_array'}).then((array) => {this.array_horas_medicas = JSON.parse(array.value)})
  }

  //Método que guarda en una variable el mes, día y año seleccionado en el calendario
  //Luego abre reserve-page para seleccionar la hora
  async dateSelected(value) {
    this.fecha = format(parseISO(value), 'dd MMM, yyyy', {locale: es});
    await this.storage.set({key: 'fechaTemporal', value: this.fecha})
    this.openModal();
  }

}
