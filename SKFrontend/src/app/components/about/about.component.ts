import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  adminList = [
    {
      name: 'Schafer Walter',
      email: 'schafer@walter.longus',
      info: 'Zuständig für Region A123'
    },
    {
      name: 'Kapo Gunther',
      email: 'Kapo@Gunther.longus',
      info: '-'
    }];

  ngOnInit(): void {
  }

}
