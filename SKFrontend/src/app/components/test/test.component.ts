import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ueberschrift = 'Das ist die Ueberschrift';

  exampleList = [
    {
      text: 'Erster Test',
      header: true
    },
    {
      text: 'Zweiter Test',
      header: false
    },
    {
      text: 'Dritter Test',
      header: true
    }];

  ngOnInit(): void {

  }

}
