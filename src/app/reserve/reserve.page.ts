import { Component } from '@angular/core';
import { ReserveModalPage } from '../reserve-modal/reserve-modal.page';
import { ModalController } from '@ionic/angular';
import { format, parseISO  } from 'date-fns';
import { es } from 'date-fns/locale';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.page.html',
  styleUrls: ['./reserve.page.scss'],
})
export class ReservePage{

  storage = Storage;
  array_horas_medicas = [];
  fecha = '';
  index: any;
  horaMedica = '';
  horaSeleccionada = '';
  minDate: string = new Date().toISOString();
  selectedDate: string = new Date().toISOString();

  constructor(private modalCtrl: ModalController) { this.llenarArrayHorasMedicas() }

  //Método que abre el modal "reserve-modal", le envia la fecha seleccionada y al volver del dismiss asigna la hora médica tomada en la array
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ReserveModalPage,
      cssClass: 'popup-modal',
      componentProps: {
        fechaSeleccionada: this.fecha
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.horaSeleccionada = data['data']
        this.horaMedica = this.fecha + ' - ' + this.horaSeleccionada
        this.guardarHorasMedicas()
      }
    });
    await modal.present();
  }

  //Método que desactica el día 0 (Domingo) del calendario
  notSunday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0;
  }

  //Método para eliminar el index encontrado de la hora médica
  async eliminarHoraMedica(index){
    this.index = index;
    this.array_horas_medicas.splice(index, 1)
    await this.storage.remove({key: 'horaMedica_array'})
    await this.storage.set({key: 'horaMedica_array', value: JSON.stringify(this.array_horas_medicas)})
  }

  //Método que revisa si la hora ya está tomada
  revisarHoraMedica(){
    for (let i = 0; i < this.array_horas_medicas.length; i++) {
      let hora = this.array_horas_medicas[i];
      if(hora == this.horaMedica){
        return true
      }
    }
  }

  //Método que asigna las horas médicas tomadas en la array para mostrarlas
  async guardarHorasMedicas(){
      if(this.revisarHoraMedica() != true){        
        await this.storage.get({key: 'horaMedica_array'}).then(data => {this.array_horas_medicas = JSON.parse(data.value)})
        this.array_horas_medicas.push(this.horaMedica)
        await this.storage.remove({key: 'horaMedica_array'})
        await this.storage.set({key: 'horaMedica_array', value: JSON.stringify(this.array_horas_medicas)})
      }else{
        alert(this.horaMedica + ' no se encuentra disponible')
      }
  }

  //Método que asigna las horas médicas tomadas en la array para mostrarlas
  async llenarArrayHorasMedicas(){
    await this.storage.get({key: 'horaMedica_array'}).then(data => {this.array_horas_medicas = JSON.parse(data.value)})
  }

  //Método que guarda en una variable el mes, día y año seleccionado en el calendario
  //Luego abre reserve-page para seleccionar la hora
  dateSelected(value) {
    this.fecha = format(parseISO(value), 'dd MMM, yyyy', {locale: es});
    this.openModal();
  }

}
