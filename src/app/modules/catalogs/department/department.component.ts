import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../services/department.service';
import { Operation } from '../utils/operation';
import { ModalDepartmentComponent } from './modals/modal-department/modal-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styles: ['']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  listaDepartamentos: any[] = [];
  listaMuninicipios: any[] = [];

  //Variable bandera para mostrar la vista de departamento o municipios
  viewDepartment:boolean = true;

  //Datos del departamento
  department:any;

  //Suscripciones
   _suscriptions: Subscription[] = [];

  /**
   * @description Constructor inicializador de objetos
   * 
  */
  constructor(private _modalService: NgbModal,
              private _departmentSrv:DepartmentService
             ) { }

  ngOnInit(): void { 
    let suscription = this._departmentSrv.getDepartaments()
                                           .subscribe((data: any[]) => { this.listaDepartamentos = data; });
     this._suscriptions.push(suscription);     
  }

  ngOnDestroy() {
    this._suscriptions.forEach((suscription) => suscription.unsubscribe());
  }

  createDepartment() {
    this.openModal(null, ModalDepartmentComponent, Operation.CREATE).result.then((modalResponse) => {
      if (modalResponse) {
        this.listaDepartamentos.push(modalResponse);
      }
    });
  }

  editDepartment(department: any) {
    this.openModal(department, ModalDepartmentComponent, Operation.EDIT).result.then((modalResponse) => {
      if (modalResponse) {
        console.log(modalResponse);
      }
    });
  }

  deleteDepartment(department: any) {
    this.openModal(department, ModalDepartmentComponent, Operation.DELETE).result.then((modalResponse) => {
      if (modalResponse) {
        console.log(modalResponse);
      }
    });
  }

  goMunicipality(department: any) {
    
    this.viewDepartment = false;
    this.department = department;
    console.log(department);
    let suscription = this._departmentSrv.getMunicipalities(department.idDepartment)
                                         .subscribe((data: any[]) => { this.listaMuninicipios = data; });
    this._suscriptions.push(suscription); 

  }  

  backDepartment() {
    this.viewDepartment = true;
    this.department = {};
  }  
  /**
   * @description Abre el modal que recibe como parametro y envia los parametros iniciales.
   * @param department objeto que contiene la información del departamento
   */
  openModal(department: any, componenteModal: any, operation: Operation): NgbModalRef {
    let modal = this._modalService.open(componenteModal, { backdrop: "static", keyboard: false });
    modal.componentInstance.modal = modal;
    modal.componentInstance.operation = operation;

    if (department) {
      modal.componentInstance.department = department;
    }
    return modal;
  }

}
