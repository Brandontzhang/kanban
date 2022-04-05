import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Section } from 'src/app/interface/section';
import { SectionsService } from 'src/app/service/sections.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input()
  section!: Section;

  @Output()
  createNewCard : EventEmitter<any> = new EventEmitter();

  @ViewChild('sectionTitle')
  sectionTitle!: ElementRef;
  
  constructor(public sectionService : SectionsService) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.section.isNew === true){
      this.sectionTitle.nativeElement.focus()
    }
  }

  createCard() {
    this.sectionService.createCard(this.section.id).subscribe(card => {this.createNewCard.emit({'sectionId' : this.section.id, 'cardId' : card.id})})
  }

  setTitle(event : any) {
    this.section.title = event.target.value
  }

  onTitleEntry(event : any) {
    this.section.title = event.target.value;
    this.section.isNew = false;
    this.sectionService.updateSection(this.section).subscribe();
    this.sectionTitle.nativeElement.blur();
  }

}
