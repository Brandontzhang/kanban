import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interface/card';
import { Section } from 'src/app/interface/section';
import { SectionsService } from 'src/app/service/sections.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  columns : number = 0;
  sections : Section[];

  constructor(private sectionService : SectionsService) {
    this.sections = []
  }

  async ngOnInit() {
    this.sectionService.getSections().subscribe(sections => {
      this.sections = sections;
      this.sections.forEach(section => {
        section.cards.sort((a, b) => a.id - b.id)
      })
      this.columns = this.sections.length;
    });
  }

  removeColumn() {
    this.columns -= 1
  }

  addSection() {
    // focus on the new section created header, and when enter, send the new section name to addSection
    this.sectionService.addSection("Section 3").subscribe(
      resp => {
        this.sections.push(resp);
        this.columns += 1;
      },
      err => console.log(err)
      )
  }

  addCard(event : any) {
    this.sections.forEach(section => {
      if (section.id == event.sectionId) {
        section.cards.push({
          id : event.cardId,
          section : section.id,
          title : "New Card",
          description: "New Description",
          tasks: []
        })
      }
    })
  }

  drop(event : CdkDragDrop<Card[]>, sectionId : number) {
    let c = <Card>event.previousContainer.data.find((card, index) => index == event.previousIndex);
    c.section = sectionId;
    this.sectionService.updateCard(sectionId, c).subscribe();


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }

}
