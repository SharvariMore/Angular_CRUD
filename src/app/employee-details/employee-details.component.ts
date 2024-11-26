import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit{

  constructor(public emplService: EmployeeService, public datepipe: DatePipe, public toast: ToastrService) {}

  @ViewChild(EmployeeFormComponent) emp: EmployeeFormComponent;

  //always add subscribe method to observable
  ngOnInit() {
    this.emplService.getEmployee().subscribe(data => {
      this.emplService.listEmployee = data;
    })
  }

  editEmployee(selectEmployee: Employee) {
    console.log(selectEmployee, ": Selected Employee");
    let datetransform = this.datepipe.transform(selectEmployee.doj, 'yyyy-MM-dd');
    selectEmployee.doj = datetransform;
    this.emplService.employeeData = selectEmployee;
    if (this.emp.isSlide === 'off') {
      this.emp.hideShowSlide();
    }
  }

  deleteEmployee(id: number) {
    if(confirm("Do you want reaaly delete this record?")) {
      this.emplService.deleteEmployee(id).subscribe(data => {
        this.emplService.getEmployee().subscribe(data => {
          this.emplService.listEmployee = data;
          this.toast.error('Success', 'Record Deleted!');

        })
      },
    error => {
      console.log("Record Not Deleted!");

    })
    }
  }
}
