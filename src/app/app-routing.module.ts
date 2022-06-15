import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Redirect empty path to '/example'
  { path: '', pathMatch : 'full', redirectTo: 'catalogs/department'},
  {
    path: 'catalogs',
    loadChildren: () =>
      import('app/modules/catalogs/catalogs.module').then((m) => m.CatalogsModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
