export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      name: string;
      url: string;
    }[];
  }
  
  export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
      back_default: string;
      back_female: string;
      back_shiny: string;
      back_shiny_female: string;
    };
    types: [{
        slot:number, 
        type:{
            name:string, 
            url:string}}];
    weight:string;
    height:string;
    abilities:[{
      ability:{
        name:string;
      }
      
    }]
  }
  