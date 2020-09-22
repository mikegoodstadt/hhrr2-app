import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Department } from '@app/models/department.model';
import { Employee } from '@app/models/employee.model';

const fakeDept = [
  {
    "id": '1',
    "name": "HHRR"
  },
  {
    "id": '2',
    "name": "IT"
  },
  {
    "id": '3',
    "name": "Sales"
  }
];

const fakeEmpl = [
  {
    id: '9009000000000001',
    name: "Joan",
    lastname: "Miro",
    age: 48,
    startDate: "2020-09-01",
    department: "IT"
  },
  {
    id: '9009000000000002',
    name: "Pablo",
    lastname: "Picasso",
    age: 65,
    startDate: "1999-01-31",
    department: "Sales"
  },
  {
    id: '9009000000000003',
    name: "Salvador",
    lastname: "Dali",
    age: 21,
    startDate: "2020-09-08",
    department: "IT"
  }
];


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private collection: string;

  constructor(
    // private httpClient: HttpClient,
  ) { }

  public getData(name: string): any {
    // console.log('Data:', name);
    if (name === 'Department') {
      let departments: Department[] = fakeDept.map(dept => {
        let department: Department = new Department;
        department.id = BigInt(dept.id);
        department.name = dept.name;
        return department;
      });
      return departments;
    };
    if (name === 'Employee') {
      let employees: Employee[] = fakeEmpl.map(empl => {
        let employee: Employee = new Employee;
        // console.log(empl.id);
        employee.id = BigInt(empl.id);
        employee.name = empl.name;
        employee.lastname = empl.lastname;
        employee.age = empl.age;
        employee.startDate = new Date(empl.startDate);
        employee.department = empl.department;
        return employee;
      });
      return employees; 
    };
  }



}
