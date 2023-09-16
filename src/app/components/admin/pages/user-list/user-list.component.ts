import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/sign-in/services/auth.service';
import { userData } from 'src/app/components/sign-in/userData';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public columnsList: any;
  public usersData!: userData[];
  public actionButtonData: any = [];
  public tmPageButtonData: any = [];
  constructor(private apiService: AuthService) { }

  ngOnInit(): void {
    this.columnsList = [
      { headerName: 'S.No', field: 'id', filter: false, sortable: true, width: 250 },
      { headerName: 'Name', field: 'userName', filter: true, sortable: false, width: 250 },
      { headerName: 'Email id', field: 'email', filter: false, sortable: true, width: 350 },
      { headerName: 'Contact no', field: 'phoneNumber', filter: false, sortable: false, width: 350 },
    ];
    this.getAllData();
  }
  // Get sorting params
  public gridSorting(params: any): void {
    console.log(params);
  }

  // Get search params
  public gridSearch(params: any): void {
    console.log(params)
  }

  // Get pagination params
  public changePagination(params: any): void {
    console.log(params)
  }

  // Get action column data
  public getEditedColumnData(params: any): void {
    console.log(params);
  }

  // Get action button data
  public getActionData(params: any): void {
    console.log(params);


  }

  // Get page buton data
  public getPageBtnEvent(params: any): void {
    console.log(params);
  }

  getAllData() {
    this.apiService.getAll().subscribe((data: userData[]) => {
      console.log(data);
      this.usersData = data;
    })
  }
}
