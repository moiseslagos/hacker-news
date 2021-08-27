import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() story_id:number;
  @Input() time:number;
  @Input() title:string;
  @Input() favorite:boolean;
  @Input() author:string;
  @Input() story_url:string;

  @Output() save_favorite: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  faves(id:number){
    this.save_favorite.emit(id);
  }
}
