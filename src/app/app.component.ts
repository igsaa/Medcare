import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  storage = Storage;

  constructor(private router: Router) {}
  
  async cerrarSesion(){
    let array = [];
    await this.storage.remove({key:'usuario'})
    await this.storage.remove({key:'doctor'})
    await this.storage.remove({key:'horaMedica_array'})
    await this.storage.set({key: 'horaMedica_array', value: JSON.stringify(array)}) //Crea un storage de array de horas médicas para el evitar errores
    await this.storage.remove({key:'alarma_array'})
    await this.storage.set({key: 'alarma_array', value: JSON.stringify(array)}) //Crea un storage de array de alarmas para el evitar errores
    .then(() => {
      console.log("\nDatos borrados con éxito")
      this.router.navigateByUrl('/login', { replaceUrl: true })
    })
  }

  toHome(){
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  toProfile(){
    this.router.navigate(['/profile'], { replaceUrl: true });
  }

  toUserData(){
    this.router.navigate(['/user-data'], { replaceUrl: true });
  }

}
