import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {

  constructor (public emplService: EmployeeService, public toast: ToastrService) {}

  @ViewChild('checkbox1') checkBox: ElementRef;  //viewchild accesses dom of html template in backend & hides/shows checkbox dynamically
  isSlide: string = 'off';

  ngOnInit() {
    this.emplService.getDesignation().subscribe(data => {
      this.emplService.listDesignation = data;
    });
  }

  submit(form: NgForm) {
    this.emplService.employeeData.isMarried = form.value.isMarried == true ? 1 : 0;
    this.emplService.employeeData.isActive = form.value.isActive == true ? 1 : 0;

    if (this.emplService.employeeData.id == 0) {
      this.insertEmployee(form);
    } else {
      this.modifyEmployee(form);
    }

      console.log('Form Submitted!');
  }

  insertEmployee(myform: NgForm) {
    this.emplService.saveEmployee().subscribe(data => {
      this.resetForm(myform);
      this.refreshData();
      this.toast.success('Success', 'Record Saved!');
    })
  }

  modifyEmployee(myform: NgForm) {
    this.emplService.updateEmployee().subscribe(data => {
      this.resetForm(myform);
      this.refreshData();
      this.toast.warning('Success', 'Record Updated!');
    })
  }

  //reset data from backend as well
  resetForm(myform: NgForm) {
    myform.form.reset(myform.value);
    this.emplService.employeeData = new Employee();
    this.hideShowSlide();
  }

  refreshData() {
    this.emplService.getEmployee().subscribe(response => {
      this.emplService.listEmployee = response;
    })
  }

  hideShowSlide() {
    if (this.checkBox.nativeElement.checked) {
      this.checkBox.nativeElement.checked = false;
      this.isSlide = 'off';
    } else {
      this.checkBox.nativeElement.checked = true;
      this.isSlide = 'on';
    }
  }
}
