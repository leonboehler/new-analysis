import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  footerLinkList = [
    {
      text: 'Impressum',
      link: ''
    },
    {
      text: 'AGB',
      link: ''
    },
    {
      text: 'Datenschutzerklärung',
      link: ''
    }];

  ngOnInit(): void {
  }
}
