import { Card } from "./card";

export interface Section {
  id : number, 
  title : string,
  cards : Card[],
  isNew : boolean,
}
