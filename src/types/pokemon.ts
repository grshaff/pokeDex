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
  