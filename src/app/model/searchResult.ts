import { Search } from "./search";
import { VehicleCategorie } from "./vehicleCategorie";

export class SearchResult{
    searchq: Search;
    categorie: VehicleCategorie;
    prix: number;
    passengers: number;
    luggage: number;
}