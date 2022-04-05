import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/interface/card';
import { Task } from 'src/app/interface/task';
import { SectionsService } from 'src/app/service/sections.service';

@Component({
  selector: 'Card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  sectionId! : number;
  @Input()
  card! : Card;
  newSubTaskName : any = "";
  
  @ViewChild('subTaskInput')
  subTaskInput!: ElementRef;

  constructor(public sectionService : SectionsService) {
  }

  ngOnInit(): void {
    this.card.tasks.sort((a, b) => a.id - b.id);
  }

  addSubTask() {
    this.sectionService.addSubTask(this.sectionId, this.card.id, this.newSubTaskName).subscribe(
      newSubTask => {
        this.subTaskInput.nativeElement.blur();
        this.card.tasks.push(newSubTask)
        this.newSubTaskName = "";
      }
    )
  }

  completeSubTask(task : Task) {
    task.completed = !task.completed;
    this.sectionService.updateSubTask(this.sectionId, this.card.id, task).subscribe();
  }

  updateCard(newTitle : any, newDesc : any) {
    this.card.title = newTitle ? <string>newTitle.value : this.card.title;
    this.card.description = newDesc ? <string>newDesc.value : this.card.description;
    this.sectionService.updateCard(this.sectionId, this.card).subscribe(resp => console.log('hi'), err => console.log(err))
  }
}
