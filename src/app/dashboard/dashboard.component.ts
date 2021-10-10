import { Component, OnInit,ViewChild, ElementRef, ChangeDetectionStrategy, Input } from '@angular/core';
import{DashboardService} from './dashbaord.service'
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }
  public users:any = []
  public commnets:any = []
  public posts:any = []

  //Graph data
  @ViewChild('myCanvas')
  public canvas!: ElementRef;
  public context!: CanvasRenderingContext2D;
  public chartType: any = 'line';
  public chartData!: any[];
  public chartLabels!: any[];
  public chartColors!: any[];
  public chartOptions!: any;
  

  ngOnInit() {
    //graph setup
    this.chartData = [{
      data: [25, 55, 25, 68, 35, 73, 55, 72],
      label: "Net worth",
      borderColor: "rgb( 17, 162, 250 )",
      backgroundColor: "rgb( 155, 214, 250 ,0.3)",
    },
    {
      data: [30, 50, 30, 61, 38, 64, 50, 62.5],
      label: "Expenses",
      borderColor: " rgb(250, 183, 183 )",
      backgroundColor: "rgb( 255, 217, 217 , 0.4 )",

    }  
  ];
    this.chartLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"];
    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 25
          }
        }]
      },
      
    }
    //Get Users
      this.dashboardService.getAllUser().subscribe((data) =>{
        this.users = data
        console.log(this.users,"lll"),
        catchError(error => {
          console.log(error);
          alert("Server unavailable")
          return error
        })
      })
      
      //Get Comments
      this.dashboardService.getAllComments().subscribe((data) =>{
        this.commnets = data.map((commnet:any) => {
          let commnetTime:string
          //Date Calculation
          let date:number = new Date().valueOf() - new Date(commnet.dateTime).valueOf()
          let days:any = date / (1000 * 60 * 60 * 24)
          let hours:any = date / (1000 * 60 * 60)
  
          if(days > 1){
            commnetTime = `${days.toFixed(0)} Days Ago`
          }else if(hours > 1) {
            commnetTime = `${hours.toFixed(0)} hours Ago`  
          }else{
            let mins = date / (1000 * 60)
            commnetTime = `${mins.toFixed(0)} Minites Ago`
  
          }
          return {
            ...commnet,
            time: commnetTime
          }
        }),
        catchError(error => {
          console.log(error);
          alert("Server unavailable")
          return error
        })
      })
  
      //Get All Posts
      this.dashboardService.getAllPost().subscribe((data) =>{
        this.posts = data,
        catchError(error => {
          console.log(error);
          alert("Server unavailable")
          return error
        })
      })
  

  };

  //Doughnet Retierment
  retiremnetChartLabels: Label[] = ['On Track'];
  retiremnetChartData: MultiDataSet = [
    [234, 126,]
  ];

  //Doughnet Vacation Home
  vacationChartLabels: Label[] = ['On Track'];
  vacationChartData: MultiDataSet = [
    [280.8, 79.2,]
  ];

  //Doughnet Travel
  travelChartLabels: Label[] = ['On Track'];
  travelChartData: MultiDataSet = [
    [165.6, 65.6,]
  ];
  ChartType: ChartType = 'doughnut';

  //Doughnet Graph Color
  public donutColors=[
    {
      backgroundColor: [
        'rgba(107, 250, 189, 1)',
        'rgba(118, 183, 172, 1)',
    ]
    }
  ];

  //Nav Bar Select
  public selected:string = 'Dashboard'

  select(select:string){
      this.selected = select
  }

  // Graph select
  public selectedGraph:string = 'Weekly'

  selectGraph(select:string){
    
  }

  //Pagiation
  p: number = 1;
    collection: any[] = [];
}
