import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.interface';
import { Observable, Subscription } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit, OnDestroy {
  //@Input() usuario: Usuario[] = [];
  // atributos
  usuarios: Usuario[] = []; // el array final de usuarios que puedo recorrer en el html
  subscripcion: Subscription = new Subscription();
  usuarios$ : Observable<Usuario[]> = new Observable<Usuario[]>(); // esta es la promesa del observable
  idUsuario: number = 0;
  
  //constructor
  constructor(private usuariosService:UsuariosService) {
  }

  ngOnInit(){
    this.obtenerUsuarios();
  }

  ngOnDestroy(){
      this.subscripcion.unsubscribe();
  }

  //methods

  obtenerUsuarios(){
    this.usuarios$ = this.usuariosService.obtener();
    // el method obtener del service de usuarios devuelve un observable del tipo usuarios 
    // los observables los podemos acumular en el objeto subscripcion de rxjs 
    this.subscripcion = this.usuariosService.obtener().subscribe(users =>{
      // este users es el array de objetos de tipo usuario que devuelve el servidor, es decir que tiene adentro el observable
      if(users){
        // lo guardo en mi array 
        this.usuarios = users;
        this.idUsuario = users.length;
      }
    });

  }
  modificarUsuario( user: Usuario){
    // esto hay que cambiarlo por el formulario que vimos
    user.nombre = user.nombre + " modificado";
    user.programa = !user.programa;
    this.subscripcion = this.usuariosService.modificar(user).subscribe(() => {
    this.obtenerUsuarios();
    });
}

eliminarUsuario(id: number){
    this.subscripcion = this.usuariosService.eliminar(id).subscribe(() => {
    this.obtenerUsuarios();
    });
}

crearUsuario(){
    // esto hay que cambiarlo por el formulario que vimos reactivo
    const user = {
    id: this.idUsuario + 1,
    nombre: "User",
    apellido: "Nuevo",
    dni: "35698788",
    imagen: "https://cdn4.iconfinder.com/data/icons/creative-business-concept-illustrations/255/Business_concepts-03-14-512.png",
    programa: false
    }
    this.subscripcion = this.usuariosService.crear(user).subscribe(() => {
       this.obtenerUsuarios();
    });
}

}
