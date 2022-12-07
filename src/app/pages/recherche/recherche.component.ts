import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  searchString:string;

  @Output()
  search : EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  onSearch(){
    this.search.emit(this.searchString)
  }
}
