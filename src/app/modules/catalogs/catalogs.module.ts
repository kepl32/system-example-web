import { NgModule } from '@angular/core';
import { DepartmentComponent } from './department/department.component';
import { CatalogsRoutingModule } from './catalogs-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/shared/shared.module';
import { ModalDepartmentComponent } from './department/modals/modal-department/modal-department.component';
import { MenuComponent } from './menu/menu.component';
import { DepartmentService } from './services/department.service';



@NgModule({
  declarations: [
    DepartmentComponent,
    ModalDepartmentComponent,
    MenuComponent    
  ],
  imports: [
    NgbModule,
    SharedModule,
    CatalogsRoutingModule    
  ],
  providers: [
    DepartmentService
  ]
})
export class CatalogsModule { }
