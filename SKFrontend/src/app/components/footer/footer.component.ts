import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  router: Router;

  footerLinkList = [
    {
      text: 'Impressum',
      link: 'about'
    },
    {
      text: 'AGB',
      link: 'agb'
    },
    {
      text: 'Datenschutzerklärung',
      link: 'privacy'
    }];

  ngOnInit(): void {
  }
}
