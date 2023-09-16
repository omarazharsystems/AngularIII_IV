import { Component, OnInit, ViewChildren, ElementRef, QueryList, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/components/sign-in/services/auth.service';
import { userData } from 'src/app/components/sign-in/userData';
import { CartService } from 'src/app/components/user/services/cart/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {

  lang!: string;
  arabicButton: boolean = false;
  englishButton: boolean = true;
  column: string = 'lastSeen';

  public columnsList: any;
  public usersData!: userData[];
  public actionButtonData: any = [];
  public tmPageButtonData: any = [];
  subscription!: Subscription;
  constructor(private cartService:CartService,private translate: TranslateService, private apiService: AuthService, private dataService: DataService) {
    translate.setDefaultLang('en');

  }
userCount;
orderCount;
 temp = new Date(new Date().getDate()-1);
// usersCount=this.usersData.length;
  ngOnInit(): void {

    this.subscription = this.dataService.getMessage().subscribe(message => {
      this.lang = message
      console.log(this.lang);
      this.translate.use(this.lang);
      if (this.lang === 'ar') {

        this.arabicButton = true;
        this.englishButton = false;
      } else {

        this.arabicButton = false;
        this.englishButton = true;
      }
    });

    this.columnsList = [
      { headerName: 'Name', field: 'userName', filter: true, sortable: false, width: 250 },
      { headerName: 'Email id', field: 'email', filter: false, sortable: false, width: 250 },
      { headerName: 'Last Seen', field: 'lastSeen', filter: true, sortable: true, width: 250 },
    ];
    this.getAllData();
    // this.filterData('online')
    // this.sort(this.column);
  }
  totalRevenue;
  getAllData() {
    this.apiService.getAll().subscribe((data: userData[]) => {
      console.log(data);
      this.userCount=data.length;
      this.usersData = data;
      this.usersData=this.usersData.filter((p)=>p.status==='online')
    })
    this.cartService.getAllOrder().subscribe((data:any) => {
      this.orderCount=data.length;
    
      // console.log(this.orderData.length)
     this.totalRevenue=data.map((a)=>(a.totalvalue)).reduce((a, b) => a + b, 0)
    console.log(this.totalRevenue)
    })
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
comparedDate= new Date( new Date().getDate()-1);

  chartOptions = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
    backgroundColor: '#6a82fb',
    title: {
      text: `Revenue`,
      fontColor: 'white'
    },
    axisY: {
      labelFormatter: (e: any) => {
        var suffixes = ["", "K", "M", "B", "T"];

        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
          order = suffixes.length - 1;

        var suffix = suffixes[order];
        return "$" + (e.value / Math.pow(1000, order)) + suffix;
      },
      titleFontColor: "white",
      lineColor: "white",
      gridColor: 'white',
      gridDashType: "dot",
      lineDashType: "dot",
      tickColor: "white",
      labelFontColor: "white",
    },
    axisX: {
      titleFontColor: "white",
      lineColor: "white",
      gridColor: 'white',
      gridDashType: "dot",
      lineDashType: "dot",
      tickColor: "white",
      labelFontColor: "white",
    },
    data: [{
      type: "line",
      xValueFormatString: "YYYY",
      yValueFormatString: "$#,###.##",
      markerColor: "white",
      lineColor: 'white',
      dataPoints: [
        { x: new Date(2022, 0, 1), y: 100 },
        { x: new Date(2022, 1, 1), y: 150 },
        { x: new Date(2022, 2, 1), y: 210 },
        { x: new Date(2022, 3, 1), y: 190 },
        { x: new Date(2022, 4, 1), y: 240 },
        { x: new Date(2022, 5, 1), y: 230 }
      ]
    }]
  }
  userChart = {
    animationEnabled: true,
    backgroundColor: '#6a82fb',
    title: {
      text: "Users Growth",
      fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      fontWeight: "bold",
      fontColor: 'white'
    },
    axisY: {
      title: "Monthly Users Growth (in %)",
      valueFormatString: "#,###.##'%'",
      titleFontColor: "white",
      lineColor: "white",
      gridColor: 'white',
      gridDashType: "dot",
      lineDashType: "dot",
      tickColor: "white",
      labelFontColor: "white",
    },
    axisX: {
      lineColor: "white",
      lineDashType: "dot",
      tickColor: "white",
      labelFontColor: "white",

    },
    data: [{
      markerColor: "white",
      lineColor: 'white',
      type: "spline",
      lineThickness: 4,
      xValueFormatString: "YYYY",
      yValueFormatString: "#,###.##'%'",
      indexLabelFontColor: 'white',
      dataPoints: [
        { x: new Date(2022, 0, 1), y: 1.30 },
        { x: new Date(2022, 1, 1), y: 1.72 },
        { x: new Date(2022, 2, 1), y: 2.08 },
        { x: new Date(2022, 3, 1), y: 2.05 },
        { x: new Date(2022, 4, 1), y: 2.05 },
        { x: new Date(2022, 5, 1), y: 2.10 },
        { x: new Date(2022, 6, 1), y: 2.04 },
        { x: new Date(2022, 7, 1), y: 2.05 },
        { x: new Date(2022, 8, 1), y: 2.08 },
        { x: new Date(2022, 9, 1), y: 2.09 },
        { x: new Date(2022, 10, 1), y: 2.1 },
        { x: new Date(2022, 11, 1), y: 2.0 },
        { x: new Date(2022, 12, 1), y: 1.98 },


      ]
    }]
  }
  filteruser:userData[];
  
  filterData(data){
    this.filteruser=this.usersData.filter((p)=>p.status===data || data==='')
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
  isDesc: boolean = true;
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? -1 : 1;

    this.usersData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };
};

