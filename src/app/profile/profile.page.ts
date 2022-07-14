import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage{
  storage = Storage;
  array_usuario: any = [];
  array_doctor: any = [];
  centroMed = 'Centro Médico MedCare San Joaquín';
  nombre_doctor = '';
  especialidad_doctor = '';
  peso_usuario = '';
  altura_usuario = '';
  edad_usuario = '';
  rh_usuario = '';
  enfermedad_usuario = '';
  remedio_usuario = '';
  dosis_usuario = '';

  constructor() {
    try{
      this.llenarDatos()
    }
    catch(e){
        console.log("TRY CATCH DEL START PAGE: " + e)
    }
  }

  async llenarDatos(){
    await this.storage.get({key: 'usuario'}).then((array) => {this.array_usuario = JSON.parse(array.value)})
    .then(() => {
      this.peso_usuario = this.array_usuario.map(usuario => usuario.peso)
      this.altura_usuario = this.array_usuario.map(usuario => usuario.altura)
      this.edad_usuario = this.array_usuario.map(usuario => usuario.edad)
      this.rh_usuario = this.array_usuario.map(usuario => usuario.factor_rh)
      this.enfermedad_usuario = this.array_usuario.map(usuario => usuario.enfermedad)
      this.remedio_usuario = this.array_usuario.map(usuario => usuario.remedio)
      this.dosis_usuario = this.array_usuario.map(usuario => usuario.dosis)
    })
    await this.storage.get({key: 'doctor'}).then((array) => {this.array_doctor = JSON.parse(array.value)})
    .then(() => {
      this.nombre_doctor = this.array_doctor.map(doctor => doctor.nombre)
      this.especialidad_doctor = this.array_doctor.map(doctor => doctor.especialidad)
    })
  }

}
