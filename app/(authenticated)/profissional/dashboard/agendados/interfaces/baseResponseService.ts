export interface StatusService {
  status: string;
  data_hora: string;
}

export interface Question {
  asks: string;
  answer: boolean;
}

export interface Room {
  name: string;
  quantity: number;
}

export interface Address {
  cep: string;
  id_address: number;
  state: string;
  city: string;
  typeHouse: string;
  publicPlace: string;
  complement: string;
  district: string;
  houseNumber: string;
}

export interface Service {
  serviceId: number;
  status_service: StatusService[];
  name: string;
  photo: string;
  biography: string | null;
  type_clean: string;
  date_hour: string;
  obeservation: string;
  tasks: string;
  value: string;
  question: Question[];
  room: Array<Room>
  address: Address;
}

export interface IData {
  service: Service;
}

export interface MyData {
  data: IData[];
}