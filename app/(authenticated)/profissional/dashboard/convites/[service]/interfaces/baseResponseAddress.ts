interface Location {
  lat: number;
  lng: number;
}

interface Northeast {
  lat: number;
  lng: number;
}

interface Southwest {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

interface Geometry {
  location: Location;
  location_type: string;
  viewport: Viewport;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface Result {
  address_components: any[]; // Você pode adicionar o tipo adequado se souber a estrutura dos componentes de endereço
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code: PlusCode;
  types: string[];
}

export interface DataApiAddress {
  results: Result[];
  status: string;
}
