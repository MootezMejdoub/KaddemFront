import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-stats',
  templateUrl: './option-stats.component.html',
  styleUrls: ['./option-stats.component.scss']
})
export class OptionStatsComponent implements OnInit {
  @Input() nbgamix:number=0;
  @Input() nbsim:number=0;
  @Input() nbse:number=0;
  @Input() nbnids:number=0;
  @Input() nbtotal:number=0;
  constructor() { }

  ngOnInit(): void {
    console.log( this.nbgamix )
  }

}
