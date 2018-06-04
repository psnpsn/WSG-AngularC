import { Injectable } from "@angular/core";

@Injectable()
export class AppConfig {

    public msclientUrl: string = "http://localhost:8090/";
    public mssearchUrl: string = "http://localhost:8091/";


    constructor(){
    }
}