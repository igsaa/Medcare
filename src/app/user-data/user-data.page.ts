import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { DbService } from '../services/db.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})

export class UserDataPage{
  storage = Storage;
  emailReg =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  adressReg = /^([A-Za-zÀ-ÿ0-9_\-\.\,\'\`\"\u00f1\u00d1]{4,30})+\ ([0-9]{1,6})$/;
  phoneReg = /^[0-9]*$/;
  array_usuarios: any = [];
  rut: string = "";
  telefono: string = "";
  email: string = "";
  direccion: string = "";
  validacion: boolean;

  constructor(private dbservice: DbService, public toastController: ToastController) {
    try{
      this.llenarDatos()
    }
    catch(e){
        console.log("TRY CATCH DE MY-DATA PAGE: " + e)
    }
  }

  async llenarDatos(){
    this.array_usuarios = [];
    await this.storage.get({key: 'usuario'}).then((array) => {this.array_usuarios = JSON.parse(array.value)})
    .then(() => {
      this.rut= this.array_usuarios.map(usuario => usuario.rut)
      this.telefono = this.array_usuarios.map(usuario => usuario.telefono)
      this.email = this.array_usuarios.map(usuario => usuario.email)
      this.direccion = this.array_usuarios.map(usuario => usuario.direccion)
    })
  }

  async guardarDatos(){
    let datos_faltantes = "";
    this.validacion = true;
      if(!this.phoneReg.test(this.telefono.toString()) || this.telefono.toString().length != 9){
        this.validacion = false;
        datos_faltantes = "Telefono debe tener 9 dígitos (Ej: 123456789)<br/>"
        this.datosFaltantes(datos_faltantes)
      }
      if(!this.emailReg.test(this.email.toString())){
        this.validacion = false;
        datos_faltantes += "Email inválido<br/>"        
        this.datosFaltantes(datos_faltantes)
      }
      if(!this.adressReg.test(this.direccion.toString())){
        this.validacion = false;
        datos_faltantes += "Ingrese una dirección válida (Ej: calle 123)"
        this.datosFaltantes(datos_faltantes)
      }
    if(this.validacion){
      await this.dbservice.updateDatos(this.rut, this.telefono ,this.email, this.direccion)
      .then(async () => {
        await this.storage.remove({key:'usuario'})
        await this.storage.remove({key:'doctor'})
        await this.dbservice.guardarDatos(this.rut)
      })
      .then(() => {
        this.datosGuardadosConExito();
      })
    }
  }  

  async datosGuardadosConExito() {
    const toast = await this.toastController.create({
      message: 'Datos Guardados con éxito',
      duration: 2000,
      color: 'success',
      position: 'top',
      cssClass: 'toast-crear',
      icon: 'checkmark-circle-outline'
    });
    toast.present();
  }

  async datosFaltantes(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4500,
      color: 'danger',
      position: 'top',
      cssClass: 'toast-crear',
      icon: 'alert-circle-outline'
    });
    toast.present();
  }

}
