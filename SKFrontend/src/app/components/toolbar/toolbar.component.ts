import { Component, OnInit } from '@angular/core';
import {OrchestratorService} from '../../services/orchestrator.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isAdmin = false
  constructor(private orchestratorService: OrchestratorService) { }

  ngOnInit(): void {
    if (this.orchestratorService.getCurrentUser().role === 'admin'){
      this.isAdmin = true;
    }

  }

}
