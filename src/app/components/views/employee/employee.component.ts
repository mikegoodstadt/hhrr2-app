import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPLOYEES, EmployeeService } from '@app/services/employee.service';
import { Employee } from '@app/models/employee.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '@app/common/utils';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public originalOrder = Utils.originalOrder;
  public employee: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    @Inject(EMPLOYEES) public emplService: EmployeeService,
  ) {
  }

  ngOnInit(): void {
    this.emplService.init()
    .then((val) => this.init())
    .catch((err) => console.log(err));
  }
  
  private init() {
    this.getEmployee();
  }

  private getEmployee() {
    const paramId = this.route.snapshot.paramMap.get("id");
    const bigId: bigint = BigInt(paramId);
    this.employee = this.emplService.records.pipe(
      map( arr => arr.find(rec => BigInt(rec.id) === bigId ) )
    )
  }

}
