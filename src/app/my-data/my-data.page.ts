import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { DbService } from '../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.page.html',
  styleUrls: ['./my-data.page.scss'],
})

export class MyDataPage{
  storage = Storage;
  array_usuarios: any = [];
  rut: any;
  telefono: any;
  email: any;
  direccion: any;

  constructor(private dbservice: DbService, public toastController: ToastController, private router: Router) {
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

  guardarDatos(){
    if(this.telefono.length == 9){
      if(this.email.length > 4){
        if(this.direccion.length > 0){
          this.dbservice.updateDatos(this.rut, this.telefono ,this.email, this.direccion)
          .then(async () => {
            await this.storage.remove({key:'usuario'})
            await this.storage.remove({key:'doctor'})
            await this.dbservice.guardarDatos(this.rut)
          })
          .then(() => {
            this.datosGuardadosConExito();
          })        
        }else{
          alert('debes ingresar una dirección')
        }
      }else{
        alert('debes ingresar un email válido')
      }   
    }else{
      alert('debes ingresar un número de teléfono válido (Ej. 123456789)')
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
    this.router.navigateByUrl('/my-data', { replaceUrl: true });
  }

}
