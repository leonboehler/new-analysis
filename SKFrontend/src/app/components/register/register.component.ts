import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { CommunicationService } from '../../services/communication.service';
import { OrchestratorService } from '../../services/orchestrator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router) { }
  onClickRegister(){

    this.router.navigate(['/map'])
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  ngOnInit(): void {
  }

}
