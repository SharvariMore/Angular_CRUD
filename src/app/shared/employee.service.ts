import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Designation, Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myhttp: HttpClient) { }
  employeeUrl: string = 'https://localhost:7055/api/Employees';
  designationUrl: string = 'https://localhost:7055/api/Designations';
  listEmployee: Employee[]=[];                                       //Get data in list
  listDesignation: Designation[]=[];

  employeeData: Employee = new Employee();                           //Post data

  saveEmployee() {
    return this.myhttp.post(this.employeeUrl, this.employeeData);
  }

  updateEmployee() {
    return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}`, this.employeeData);
  }

  //Observable observes data and returns data in any data type
  getEmployee(): Observable<Employee[]> {
    return this.myhttp.get<Employee[]>(this.employeeUrl);
  }

  getDesignation(): Observable<Designation[]> {
    return this.myhttp.get<Designation[]>(this.designationUrl);
  }

  deleteEmployee(id: number) {
    return this.myhttp.delete(`${this.employeeUrl}/${id}`);
  }
}
