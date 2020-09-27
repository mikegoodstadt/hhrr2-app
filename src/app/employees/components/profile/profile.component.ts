import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '@app/employees/employee.service';
import { Employee } from '@app/employees/employee.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '@app/shared/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public originalOrder = Utils.originalOrder;
  public employee: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    public emplService: EmployeeService,
  ) {
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  private getEmployee() {
    const paramId: number = parseInt(this.route.snapshot.paramMap.get("id"));
    this.employee = this.emplService.records.pipe(
      map( arr => arr.find(rec => rec.id === paramId ) )
    )
  }

}
