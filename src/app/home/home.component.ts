import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger(
      'slideView',
      [
        state('true', style({ transform: 'translateY(100%)', opacity: 0 })),
        state('false', style({ transform: 'translateY(0)', opacity: 1 })),
        transition('0 => 1', animate('500ms', style({ transform: 'translateY(0)', 'opacity': 1 }))),
        transition('1 => 1', animate('500ms', style({ transform: 'translateY(100%)', 'opacity': 0 }))),
      ]),

    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('600ms ease-in', style({ transform: 'translateY(0%)', 'opacity': 1 }))
      ]),
      
      transition(':leave', [
        style({ transform: 'translateY(0%)', opacity: 1 }),
        animate('0ms ease-in', style({ transform: 'translateY(100%)', 'opacity': 0 }))
      ])
    ])
  ]
})
export class HomeComponent{

  constructor(private router: Router) { }

  show: boolean = false;

  //Animation trigger
  toggle(evt:any): void {
    this.show = !this.show;
  }

  //Routing
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
    }

}
