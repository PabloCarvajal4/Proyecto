import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produccion, ProduccionWithoutID } from '../models/produccion';
import { environment } from 'src/environments/environment';


const ENDPOINT = 'produccions';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  constructor( private http: HttpClient) { }
  //GET
  getAllProduccion(){
    return this.http.get<Produccion[]>(`https://produccionhn.herokuapp.com/${ENDPOINT}`)
  }

  //POST
  postProduccion(produccion:ProduccionWithoutID){
    return this.http.post(`https://produccionhn.herokuapp.com/${ENDPOINT}`,produccion);
  }

  //PUT
  putProduccion(id:string,produccion:ProduccionWithoutID){
    return this.http.put(`https://produccionhn.herokuapp.com/${ENDPOINT}/${id}`,produccion)
  }

  //PATCH
  patchProduccion(id:string,produccion:ProduccionWithoutID){
    return this.http.patch(`https://produccionhn.herokuapp.com/${ENDPOINT}/${id}`,produccion)
  }

  //DELETE
deleteProduccions(id:string){
    return this.http.delete(`https://produccionhn.herokuapp.com/${ENDPOINT}/${id}`)
  }
}

