import { Component, OnInit } from '@angular/core';
//Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Produccion } from 'src/app/models/produccion';
import { ProduccionService } from 'src/app/services/produccion.service'; 
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {
  form!: FormGroup;
  listOfHardware: Produccion[] = [];
  visible = false;
  accion:boolean=true;
  idModificar:string='';
  constructor(private empleadosService: ProduccionService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder) {this.buildForm(); }

 
    private buildForm() {
      this.form = this.formBuilder.group({
        producto: [''],
        cantidad: [''],
        destino: ['']
      });
    }
  
    ngOnInit(): void {
      this.empleadosService.getAllProduccion().toPromise().then(
        (data: Produccion[]) => this.listOfHardware = data
      )
    }
  
    delete(id: string) {
      this.empleadosService.deleteProduccions(id).toPromise().then(() => {
        this.nzMessageService.warning('El registro fue eliminado con exito!');
        this.listOfHardware = this.listOfHardware.filter(x => x.id !== id);
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser eliminado, por favor intente de nuevo');
        console.error(error);
      })
    }
  
    cancel(): void {
      this.nzMessageService.info('Su registro sigue activo! =D')
    }
  
    open(): void {
      this.visible = true;
      this.accion=true;
    }
  
    close(): void {
      this.visible = false;
      this.buildForm();
    }
  
    guardar(): void {
      if (this.accion) {
        this.empleadosService.postProduccion(this.form.value).toPromise().then((data: any) => {
          //this.listOfHardware.push(data);
          this.nzMessageService.success('El registro fue ingresado con exito!');
          this.listOfHardware = [...this.listOfHardware, data]
          //Limpia el formulario y lo cierra
          this.buildForm();
          this.visible = false;
        }, (error) => {
          this.nzMessageService.error('El registro no pudo ser ingresado, por favor intente de nuevo');
          console.error(error);
        })
      }else{
        this.empleadosService.putProduccion(this.idModificar,this.form.value).toPromise().then(()=>{
          for(let elemento of this.listOfHardware.filter(x=>x.id===this.idModificar)){
            elemento.producto=this.form.value.producto;
            elemento.cantidad= this.form.value.cantidad;
            elemento.destino= this.form.value.destino;

          }
          this.visible = false;
          this.nzMessageService.success('El registro fue actualizado con exito!');
        }, (error) => {
          this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
          console.error(error);
        })
      }
    }
  
    modificar(item:Produccion):void{
      this.accion=false;
      this.idModificar=item.id;
      this.visible = true;
      this.form=this.formBuilder.group({
        producto: [item.producto],
        cantidad: [item.cantidad],
        destino: [item.destino],
       
      })
    }
  
    submitForm(): void {
      for (const i in this.form?.controls) {
        this.form?.controls[i].markAsDirty();
        this.form?.controls[i].updateValueAndValidity();
      }
    }
  }
  