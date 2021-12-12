import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleados, EmpleadosWithoutID } from '../models/empleados';
import { environment } from 'src/environments/environment';


const ENDPOINT = 'empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(
    private http: HttpClient
  ) { }
 //GET
  getAllEmpleados(){
    return this.http.get<Empleados[]>(`https://produccionhn.herokuapp.com/${ENDPOINT}`)
  }

  //POST
  postEmpleados(empleados:EmpleadosWithoutID){
    return this.http.post(`https://produccionhn.herokuapp.com/${ENDPOINT}`,empleados);
  }

  //PUT
  putEmpleados(id:string,empleados:EmpleadosWithoutID){
    return this.http.put(`https://produccionhn.herokuapp.com/${ENDPOINT}/${id}`,empleados)
  }

  //PATCH
  patchEmpleados(id:string,empleados:EmpleadosWithoutID){
    return this.http.patch(`https://produccionhn.herokuapp.com/${ENDPOINT}/${id}`,empleados)
  }

  //DELETE
deleteEmpleados(id:string){
    return this.http.delete(`https://produccionhn.herokuapp.com/${ENDPOINT}/${id}`)
  }
}
