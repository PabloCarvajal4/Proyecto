import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distribucion, DistribucionWithoutID } from '../models/distribucion';
import { environment } from 'src/environments/environment';


const ENDPOINT = 'distribucions';
@Injectable({
  providedIn: 'root'
})
export class DistribucionService {

  constructor(private http: HttpClient) { }

//GET
getAllDistribucion(){
  return this.http.get<Distribucion[]>(`https://produccionhn.herokuapp.com/${ENDPOINT}`)
}

//POST
postDistribucion(distribucion:DistribucionWithoutID){
  return this.http.post(`https://produccionhn.herokuapp.com/${ENDPOINT}`,distribucion);
}

//PUT
putDistribucion(id:string,distribucion:DistribucionWithoutID){
  return this.http.put(`https://produccionhn.herokuapp.com/${ENDPOINT}/${id}`,distribucion)
}

//PATCH
patchDistribucion(id:string,distribucion:DistribucionWithoutID){
  return this.http.patch(`https://produccionhn.herokuapp.com/${ENDPOINT}/${id}`,distribucion)
}

//DELETE
deleteDistribucion(id:string){
  return this.http.delete(`https://produccionhn.herokuapp.com/${ENDPOINT}/${id}`)
}
}

