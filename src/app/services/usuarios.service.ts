import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // atributos
 // private url:string = 'http://localhost:8080/usuarios/';
    private url:string = 'https://66f7af4bb5d85f31a3434c3e.mockapi.io/usuarios/usuarios/';


  // constructor
  constructor(
    private httpClient: HttpClient,
  ) { }

  //methods 

  obtener(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.url);
  }
  modificar(user: Usuario): Observable<Usuario>{
    return this.httpClient.put<Usuario>(this.url+user.id, user);
  }
  eliminar(id: number): Observable<Usuario>{
      return this.httpClient.delete<Usuario>(this.url + id);
  }
  crear(user: Usuario): Observable<Usuario>{
      return this.httpClient.post<Usuario>(this.url, user);
  }
}
