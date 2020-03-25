import { Component, OnInit } from '@angular/core';
import {OrchestratorService} from '../../services/orchestrator.service';
import {CommunicationService} from '../../services/communication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isAdmin = false
  constructor(private orchestratorService: OrchestratorService, private communicationService: CommunicationService, private router: Router) { }

  ngOnInit(): void {
    if (this.orchestratorService.getCurrentUser().role === 'admin'){
      this.isAdmin = true;
    }
  }
  onLogout() {
    this.communicationService.logout().subscribe(result => {
      if (result) {
        this.router.navigate(['/login'])
      }
    });
  }
}
