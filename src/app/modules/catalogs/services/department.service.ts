import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';


@Injectable()
export class DepartmentService {

  constructor(private _http: HttpClient) { }

  getDepartaments(): Observable<any> {
    return this._http.get<any>(environment.URL_API + '/departamentos');
  }

  postDepartments(frmDepartment: FormGroup): Observable<any> {
    return this._http.post<any>(environment.URL_API + '/departamentos', JSON.stringify(frmDepartment.value));
  }

  getMunicipalities(idDepartament:number): Observable<any> {
    return this._http.get<any>(environment.URL_API + '/departamentos/' + idDepartament + '/municipios');
  }  
}
