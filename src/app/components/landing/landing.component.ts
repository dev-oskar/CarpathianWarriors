import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  listofItems: any = [
    {
      name: 'Czym jest Carpathian Warriors?'
    },
    {
      name: 'Poprzednie gale'
    },
    {
      name: 'Czym jest Carpathian Warriors?'
    },
  ];

  constructor() { 
  }

  ngOnInit() {
  };

  title = 'Carpathian Warriors';

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
