import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../interface/card';
import { Section } from '../interface/section';
import { Task } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  sections : Section[] = [];

  constructor(private http:HttpClient) { 
  }

  addSection(sectionName : string) : Observable<any> {
    return this.http.post<any>('/api/section', sectionName)
  }

  // returns observable
  getSections() : Observable<Section[]> {
    return this.http.get<Section[]>('/api/section');
  }

  updateSection(section : Section) {
    return this.http.put<Section>('api/section/' + section.id , section);
  }

  createCard(sectionId : number) {
    return this.http.post<Card>(`api/section/${sectionId}/card`, {});
  }

  updateCard(sectionId : number, card : Card) {
    return this.http.put<Card>(`/api/section/${sectionId}/card/` + card.id, card);
  }

  addSubTask(sectionId : number, cardId : number, subTask : string) {
    return this.http.post<Task>(`/api/section/${sectionId}/card/${cardId}/task`, subTask)
  }

  updateSubTask(sectionId : number, cardId : number, task : Task) {
    return this.http.put<Task>(`/api/section/${sectionId}/card/${cardId}/task/${task.id}`, task);
  }
  
}
