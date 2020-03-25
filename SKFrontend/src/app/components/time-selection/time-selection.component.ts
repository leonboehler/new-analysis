import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {range} from 'rxjs';

@Component({
  selector: 'app-time-selection',
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.css']
})
export class TimeSelectionComponent implements OnInit {

  times = new Array<{label: string; value: number}>()
  selectedTime = {label: '00:00', value: 0};
  selectedTimes = new Array<{label: string; value: number}>()
  selectedTimesList = new Array<number>()
  @Output() selectedTimesValues = new EventEmitter();

  constructor() {
    range(0, 24 ).subscribe(hour => {

      let label: string;
      if (hour >= 10) {
        label = '' + hour;
      } else {
        label = '0' + hour;
      }
      let value = hour * 10;
      this.times.push({label: `${ label }:00`,value: value});

      value = hour * 10 + 30;
      this.times.push({label: `${ label }:30`,value: value});
    });
  }

  ngOnInit(): void {
  }

  onAddButtonClick() {
    if (this.selectedTimes.indexOf(this.selectedTime) === -1) {
      this.selectedTimes.push(this.selectedTime);
      this.selectedTimesList.push(this.selectedTime.value)
      this.selectedTimesValues.emit(this.selectedTimesList)
    }
  }

  onDeleteButtonClick(index) {
    this.selectedTimes.splice(index, 1);
  }

}
