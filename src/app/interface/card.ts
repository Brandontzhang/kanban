import { Section } from "./section";
import { Task } from "./task";

export interface Card {
  id : number, 
  section : number,
  title : string;
  description : string;
  tasks : Task[]
}
