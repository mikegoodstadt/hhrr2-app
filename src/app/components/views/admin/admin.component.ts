import { Component, Inject, OnInit } from '@angular/core';
import { DEPARTMENTS, DepartmentService } from '@app/services/department.service';
import { EMPLOYEES, EmployeeService } from '@app/services/employee.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    @Inject(DEPARTMENTS) public deptService: DepartmentService,
    @Inject(EMPLOYEES) public emplService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.deptService.init()
    .then((val) => this.emplService.init())
    .then((val) => this.init())
    .catch((err) => console.log(err));    this.init();
  }

  private init() {
  }

}
