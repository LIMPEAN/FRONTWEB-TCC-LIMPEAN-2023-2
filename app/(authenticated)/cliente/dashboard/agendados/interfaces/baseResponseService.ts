export interface ResponseService {
  status: number;
  data: ClientData[];
}

export interface ClientData {
  service: {
    serviceId: number;
    status_service: StatusService[];
    name: string;
    photo: string;
    biography: string;
    type_clean: string;
    date_hour: string;
    obeservation: string;
    tasks: string;
    value: number | null;
    question: Question[];
    room: Room[];
    address: IEndereco;
  };
}

export interface IEndereco {
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

interface StatusService {
  status: string;
  data_hora: string;
}

interface Question {
  asks: string;
  answer: boolean;
}

interface Room {
  name: string;
  quantity: number;
}

interface Address {
  state: string;
  city: string;
  cep: string;
}
