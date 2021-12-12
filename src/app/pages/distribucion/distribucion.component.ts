import { Component, OnInit } from '@angular/core';
//Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Distribucion } from 'src/app/models/distribucion';
import { DistribucionService } from 'src/app/services/distribucion.service'; 
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-distribucion',
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css']
})
export class DistribucionComponent implements OnInit {
  form!: FormGroup;
  listOfHardware: Distribucion[] = [];
  visible = false;
  accion:boolean=true;
  idModificar:string='';
  constructor(private distribucionService: DistribucionService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder) { this.buildForm();}

    private buildForm() {
      this.form = this.formBuilder.group({
        lugar: [''],
        producto: [''],
        personaCargo: [''],
        correo: [null],
        tienda: ['']
      });
    }
  
    ngOnInit(): void {
      this.distribucionService.getAllDistribucion().toPromise().then(
        (data: Distribucion[]) => this.listOfHardware = data
      )
    }
  
    delete(id: string) {
      this.distribucionService.deleteDistribucion(id).toPromise().then(() => {
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
        this.distribucionService.postDistribucion(this.form.value).toPromise().then((data: any) => {
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
        this.distribucionService.putDistribucion(this.idModificar,this.form.value).toPromise().then(()=>{
          for(let elemento of this.listOfHardware.filter(x=>x.id===this.idModificar)){
            elemento.lugar=this.form.value.lugar;
            elemento.producto= this.form.value.producto;
            elemento.personaCargo= this.form.value.personaCargo;
            elemento.correo= this.form.value.correo;
            elemento.tienda=this.form.value.tienda;
          }
          this.visible = false;
          this.nzMessageService.success('El registro fue actualizado con exito!');
        }, (error) => {
          this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
          console.error(error);
        })
      }
    }
  
    modificar(item:Distribucion):void{
      this.accion=false;
      this.idModificar=item.id;
      this.visible = true;
      this.form=this.formBuilder.group({
        lugar: [item.lugar],
        producto: [item.producto],
        personaCargo: [item.personaCargo],
        correo: [item.correo],
        tienda: [item.tienda]
      })
    }
  
    submitForm(): void {
      for (const i in this.form?.controls) {
        this.form?.controls[i].markAsDirty();
        this.form?.controls[i].updateValueAndValidity();
      }
    }
  }
  
