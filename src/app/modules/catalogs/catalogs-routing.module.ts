import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'department', component: DepartmentComponent },
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogsRoutingModule { }
