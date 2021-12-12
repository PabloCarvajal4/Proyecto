import { Component, OnInit } from '@angular/core';
//Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Empleados } from 'src/app/models/empleados';
import { EmpleadosService } from 'src/app/services/empleados.service'; 
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  form!: FormGroup;
  listOfHardware: Empleados[] = [];
  visible = false;
  accion:boolean=true;
  idModificar:string='';

  constructor( private empleadosService: EmpleadosService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder) {
      this.buildForm();
    }
  
    private buildForm() {
      this.form = this.formBuilder.group({
        dni: [''],
        nombre: [''],
        apellido: [''],
        edad: [null],
        cargo: ['']
      });
    }
  
    ngOnInit(): void {
      this.empleadosService.getAllEmpleados().toPromise().then(
        (data: Empleados[]) => this.listOfHardware = data
      )
    }
  
    delete(id: string) {
      this.empleadosService.deleteEmpleados(id).toPromise().then(() => {
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
        this.empleadosService.postEmpleados(this.form.value).toPromise().then((data: any) => {
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
        this.empleadosService.putEmpleados(this.idModificar,this.form.value).toPromise().then(()=>{
          for(let elemento of this.listOfHardware.filter(x=>x.id===this.idModificar)){
            elemento.dni=this.form.value.dni;
            elemento.nombre= this.form.value.nombre;
            elemento.apellido= this.form.value.apellido;
            elemento.edad= this.form.value.edad;
            elemento.cargo=this.form.value.cargo;
          }
          this.visible = false;
          this.nzMessageService.success('El registro fue actualizado con exito!');
        }, (error) => {
          this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
          console.error(error);
        })
      }
    }
  
    modificar(item:Empleados):void{
      this.accion=false;
      this.idModificar=item.id;
      this.visible = true;
      this.form=this.formBuilder.group({
        dni: [item.dni],
        nombre: [item.nombre],
        apellido: [item.apellido],
        edad: [item.edad],
        cargo: [item.cargo]
      })
    }
  
    submitForm(): void {
      for (const i in this.form?.controls) {
        this.form?.controls[i].markAsDirty();
        this.form?.controls[i].updateValueAndValidity();
      }
    }
  }
  