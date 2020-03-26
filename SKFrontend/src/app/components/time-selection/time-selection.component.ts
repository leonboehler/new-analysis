import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {range} from 'rxjs';

@Component({
  selector: 'app-time-selection',
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.css']
})
export class TimeSelectionComponent implements OnInit {

  times = new Array<string>()
  selectedTime = '00:00';
  @Input() selectedTimes: Array<string>
  @Output() valueChanged = new EventEmitter();

  constructor() {
    range(0, 24 ).subscribe(hour => {

      let label: string;
      if (hour >= 10) {
        label = '' + hour;
      } else {
        label = '0' + hour;
      }
      this.times.push(`${ label }:00`);
    });
  }

  ngOnInit(): void {
    console.log(this.selectedTimes)
    if (this.selectedTimes == null) {
      this.selectedTimes = new Array<string>()
    }
  }

  timeToLabel(time: number) {

  }

  onAddButtonClick() {
    if (this.selectedTimes.indexOf(this.selectedTime) === -1) {
      this.selectedTimes.push(this.selectedTime);
      this.valueChanged.emit(this.selectedTimes);
    }
  }

  onDeleteButtonClick(index) {
    this.selectedTimes.splice(index, 1);
  }

}
