import { Time } from "@angular/common";
import { Airport } from "./airport";
import { Town } from "./town";

export class Search {
    from: Airport;
    to: Town;
    searchedDate: Date;
    searchedTime: String;
    adult:number;
    children:number;
    infant:number;
    dateQuery: Date;
    clientUsername: string;

}