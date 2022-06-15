import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { Operation } from 'app/modules/catalogs/utils/operation';
import { DepartmentService } from 'app/modules/catalogs/services/department.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-modal-department',
  templateUrl: './modal-department.component.html',
  styles: ['']
})
export class ModalDepartmentComponent implements OnInit, OnDestroy {

  //Referencia del modal iniciada en la vista padre
  @Input() modal!: NgbModalRef;

  //Formulario 
  frmDepartment: FormGroup;

  //Datos del departamento
  department:any;

  //Operacion que realizara el modal
  operation: Operation = Operation.NONE;

  //Titulo de la ventana modal
  titleModal: String;

  //Suscripciones
  _suscriptions: Subscription[] = [];

  constructor(private _departmentSrv:DepartmentService
             ) 
  { 

      this.frmDepartment = new FormGroup({
        idDepartment: new FormControl(),
        code:  new FormControl(),
        name:  new FormControl()
      });
      
      this.titleModal = '';
  }

  ngOnInit(): void {
    
    //Titulo del modal
    switch (this.operation) {
      case Operation.CREATE:
        this.titleModal = 'Crear Departamento';
        break;
      case Operation.EDIT:        
        this.titleModal = 'Editar Departamento';
        break;
      case Operation.DELETE:
        this.titleModal = 'Eliminar Departamento';
        break;
    }

    if(this.operation === Operation.EDIT || this.operation === Operation.DELETE ) {
      //Inicializando fromulario con la informacion de la vista padre
      this.frmDepartment.setValue({
        idDepartment: this.department.idDepartment,
        code: this.department.code,
        name: this.department.name
      });
    }
  }

  ngOnDestroy() {
    this._suscriptions.forEach((suscription) => suscription.unsubscribe());
  }


  saveDepartment(){
    let suscription = this._departmentSrv.postDepartments(this.frmDepartment)
                                         .subscribe((data: any[]) => { this.closeModal(data); });
    this._suscriptions.push(suscription);   
  }

  /**
   * @description 
   * Variable tipo funcion que cierra el modal.
   * Envia al componente padre el objeto department
  */
  closeModal = (department?: any):void => {
    this.modal.close(department);
    this.frmDepartment.reset();
  }  

}
