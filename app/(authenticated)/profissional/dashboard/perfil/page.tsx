"use client"
import { Breadcrumb, Button, Modal, Table } from 'flowbite-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './service/firebase';
import { putApi } from './service/fetchApi';
import { Tabs } from 'flowbite-react';
import { Label, TextInput, Select, Textarea } from 'flowbite-react';
import InputMask from 'react-input-mask';
import { SHA256 } from 'crypto-js';
import axios from 'axios';
import { Estado } from '@/app/(sign)/cadastro/estadosEnum';
import { postAddress } from './service/postAddress';


interface User {
  statusClient: string;
  name: string;
  cpf: string;
  biography: string;
  photoProfile: string;
  email: string;
  gender: string;
  phone: {
    ddd: string;
    number_phone: string;
  }[];
  assessement: any[];
  endereco: [IEndereco]
}

interface IUpdateAddres {
  cep: string;
  state?: string | number;
  city: string;
  typeHouse: number;
  publicPlace: string;
  complement: string;
  district: string;
  houseNumber: string;
}

interface IEndereco {
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


interface AddressViaCep {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento?: string | null;
  numero?: string | null;
}


interface UserUpdateData {
  biography?: string;
  idGender?: number;
  name?: string;
  password?: string;
  phones?: [{
    ddd?: string;
    phone?: string;
    newDDD?: string;
    newPhone?: string;
  }];
  photoUser?: string;
}



const app = initializeApp(firebaseConfig);

export default function HomeDash() {

  const [data, setData] = useState<User | null>(null);
  const [addressState, setaddressStateData] = useState<AddressViaCep | null>(null);

  let [state, setState] = useState<AddressViaCep>({
    cep: addressState?.cep ? addressState?.cep : '',
    logradouro: addressState?.logradouro ? addressState?.logradouro : '',
    bairro: addressState?.bairro ? addressState.bairro : '',
    localidade: addressState?.localidade ? addressState.localidade : '',
    uf: addressState?.uf ? addressState.uf : '',
    complemento: addressState?.complemento ? addressState.complemento : null,
    numero: addressState?.numero ? addressState.numero : null
  });

  const [cepState, setCep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [nome, setNome] = useState(data?.name);
  const [idGender, setidGender] = useState("");
  const [selectTypeHouse, setselectTypeHouse] = useState(1);
  const [inputNumberHouse, setinputNumberHouse] = useState("");
  const [inputComplement, setinputComplement] = useState("");
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  const [telefone, setTelefone] = useState("");
  const [biografiaState, setbiografiaState] = useState("");



  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const [openModal2, setOpenModal2] = useState<string | undefined>();
  const props2 = { openModal2, setOpenModal2 };



  let token: string | null = null;

  // useEffect(() => {
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }
  // }, [])




  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verifique o formato do arquivo antes de prosseguir
      if (!isFormatValid(file)) {
        toast.error("Formato de arquivo inválido. Por favor, escolha um formato válido.");
        return; // Saia da função se o formato for inválido
      }

      toast.loading("Carregando imagem");

      try {
        const storage = getStorage(app);
        const timestamp = new Date();
        const fileName = `${timestamp.getFullYear()}_${(timestamp.getMonth() + 1)}_${timestamp.getDate()}_${timestamp.getHours()}_${timestamp.getMinutes()}_${timestamp.getSeconds()}_${file.name}`;

        const storageRef = ref(storage, `imagens/${fileName}`);
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        updateUser({ photoUser: downloadURL })
        await fetchData()
        setImageUrl(downloadURL);
        toast.dismiss();
        toast.success("Upload realizado com sucesso");

      } catch (error) {
        console.error('Erro no upload:', error);
        toast.error("Erro ao realizar upload, tente novamente");
      }
    }
  }




  function isFormatValid(file: File) {
    const formatosValidos = [".jpg", ".jpeg", ".png", ".gif"];
    const extensao = file?.name?.split(".")?.pop()?.toLowerCase();
    return formatosValidos.includes(`.${extensao}`);
  }


  const fetchData = useCallback(() => {
    const apiUrl = `http://${process.env.HOST}:8080/v1/limpean/diarist`;
    const headers = {
      'x-api-key': token!!,
    };

    fetch(apiUrl, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        return response.json();
      })
      .then((result) => {
        setData(result.data);
        setbiografiaState(result.data.biography)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
        setIsLoading(false);
      });
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleSubmit = (event: any) => {
    event.preventDefault();
    const nome: string = event.target.nome.value;
    const genero: number = Number(event.target.genero.value) ? Number(event.target.genero.value) : 1;
    const senha1: string = event.target.senha1.value;
    const senha2: string = event.target.senha2.value;

    if (senha1 !== senha2) {
      toast.error("As senhas não coincidem")
      event.target.reset();
      return;
    }
    updateUser({ name: nome, idGender: genero, password: senha1 })

    event.target.reset();
  };

  const handleBiographySubmit = (event: any) => {
    event.preventDefault();
    const biografia: string = event.target.biografia.value;

    updateUser({ biography: biografia })

    event.target.reset();
  };

  const handlePhoneSubmit = (event: any) => {

    event.preventDefault();


    const phone: string = event.target.telefone.value;

    if (!phone) {
      toast.error("Telefone inválido")
      event.target.reset();
      return;
    }


    const telefoneLimpo = phone.replace(/\D/g, '');
    if (telefoneLimpo.length < 11) {
      toast.error("Quantidade de dígitos insuficientes")
      event.target.reset();
      return;
    }
    const ddd = telefoneLimpo.slice(0, 2);
    const restante = telefoneLimpo.slice(2);

    const telefonesJson = {
      ddd: data?.phone[0].ddd,
      phone: data?.phone[0].number_phone,
      newDDD: ddd,
      newPhone: restante
    }

    updateUser({ phones: [telefonesJson] })

    event.target.reset();
  };


  const updateUser = async ({
    biography,
    idGender,
    name,
    password,
    photoUser,
    phones
  }: UserUpdateData = {}) => {

    const jsonUsuario = {
      "name": name ? name : null,
      "biography": biography ? biography : null,
      "idGender": idGender ? idGender : null,
      "password": password ? SHA256(password).toString() : null,
      "photoUser": photoUser ? photoUser : null,
      "averagePrice": null,
      "phones": [
        {
          "ddd": phones?.length == null ? null : phones[0].ddd,
          "phone": phones?.length == null ? null : phones[0].phone,
          "newDDD": phones?.length == null ? null : phones[0].newDDD,
          "newPhone": phones?.length == null ? null : phones[0].newPhone
        }
      ],
      "address": {
        "state": null,
        "city": null,
        "cep": null,
        "publicPlace": null,
        "complement": null,
        "district": null,
        "houseNumber": null
    }
    }

    try {
      const response = await putApi(jsonUsuario, `http://${process.env.HOST}:8080/v1/limpean/diarist`, token!!);
      if (response.status = 201) {
        toast.success("Usuário atualizado com sucesso!")
        fetchData()
      } else {
        toast.error("Dados não atualizados, verifique as informações" + response)
      }
    } catch (error) {
      toast.error("Servidor indisponível para esse processo")
    }
  }

  async function fetchAddressData(cep: string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData: AddressViaCep = response.data;
      setaddressStateData(addressData)

      if (response.data.erro == true) {
        return false
      }

      return true

      // You can add more fields as needed
    } catch (error) {
      return false

    }
  }


  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {


    const cepSemEspaco = event.target.value.trim();
    const cep = cepSemEspaco.replace(/\D/g, ''); // Remove todos os não dígitos

    if (cep.length === 8) {
      // Call the function to fetch address data when CEP has 8 characters
      const loadingToast = toast.loading("Verificando o CEP")
      const cepVerificado = await fetchAddressData(cep)
      if (cepVerificado) {
        toast.dismiss(loadingToast);
        toast.success("CEP encontrado com sucesso.")
      } else {
        toast.dismiss(loadingToast);
        toast.error("CEP não encontrado.")
      }

    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState((prevState: AddressViaCep | null) => {
      if (prevState) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return {
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        complemento: null,
        numero: null,
      };
    });
  };


  return (
    <div className='flex flex-col h-full overflow-auto'>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="#"
        >
          <p>
            Home
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Projects
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Flowbite React
        </Breadcrumb.Item>
      </Breadcrumb>
      <Tabs.Group
        aria-label="Default tabs"
        style="underline"

      >
        <Tabs.Item
          className='text-inherit'
          active
          title="Pessoal"
          color='color-red'
        >
          <span className='text-2xl'>Informações Pessoais</span>
          <div className='flex flex-col gap-4 h-fit '>
            <div className='flex flex-col lg:flex-row gap-4 pb-4 w-full mt-4 overflow-y-auto'>
              <div className="flex flex-col 2xl:flex-row px-4  py-8 gap-4 items-center lg:w-3/5 text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 ">
                <Image className='w-32 h-32 object-cover rounded-md' src={data?.photoProfile ? data?.photoProfile : "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e&_gl=1*1u1domm*_ga*MTAyMTA0OTYwOS4xNjk0NTU2NDQx*_ga_CW55HF8NVT*MTY5NjExNzIyOC4zLjEuMTY5NjExNzI4Ny4xLjAuMA.."} alt={"foto de perfil de " + data?.name} width={300} height={300} />
                <div className='flex flex-col justify-between h-32 w-full items-center'>
                  <span className='font-bold capitalize text-lg'>{data?.name}</span>
                  <span className='capitalize text-gray-400'>{data?.gender}</span>
                  <div className='flex flex-col w-full'>
                    <label htmlFor="fileInput" className="h-12 bg-blue-700 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg">Troque a foto</label>
                    <input id='fileInput' className='flex-col hidden' type='file' onChange={handleUpload} accept=".png, .jpg, .jpeg, .avif, .gif"
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 2xl:flex-row w-full'>
                <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-4 items-start w-full text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700'>
                  <div className='flex w-full gap-4'>
                    <TextInput
                      type="text"
                      className='w-full'
                      id="nome"
                      name="nome"
                      placeholder={data?.name}
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <Select
                      className='w-full'
                      id="genero"
                      name="genero"
                      onChange={(e) => setidGender(e.target.value)}
                    >
                      <option value="1" selected>Masculino</option>
                      <option value="2" >Feminino</option>
                      <option value="3">Outros</option>
                    </Select>
                  </div>
                  <div className='flex w-full gap-4'>
                    <TextInput
                      type='password'
                      className='w-full'
                      id="senha1"
                      name="senha1"
                      placeholder="*********"
                      onChange={(e) => setpassword1(e.target.value)}
                    />
                    <TextInput
                      type='password'
                      className='w-full'
                      id="senha2"
                      name="senha2"
                      placeholder="*********"
                      onChange={(e) => setpassword2(e.target.value)}
                    />
                  </div>
                  <div className='flex w-full gap-4'>
                    <button
                      type='submit'
                      className='h-12 w-full bg-blue-700 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
                    >
                      Enviar
                    </button>
                  </div>
                </form>

                <form onSubmit={handlePhoneSubmit} className='h-full flex flex-col justify-center lg:flex-row px-4 py-8 gap-4 items-center w-full text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700'>
                  <div className='flex flex-col w-full'>
                    <label htmlFor="numeroAntigo" title='Numero antigo'>Numero antigo</label>
                    <TextInput id='numeroAntigo' type="text" className='w-full' placeholder={
                      (data?.phone[0].ddd ? data?.phone[0].ddd : "11") +
                      (data?.phone[0].number_phone ? data?.phone[0].number_phone : "99999999")
                    } disabled />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor="numeroNovo" title='Numero antigo'>Numero novo</label>
                    <InputMask
                      mask="(99) 99999-9999"
                      maskPlaceholder={null}
                      type="text"
                      placeholder='Digite seu telefone aqui...'
                      id="telefone"
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </div>
                  <div className='flex items-end justify-end h-full w-full lg:w-48'>
                    <button
                      type='submit'
                      className='h-12 w-full bg-blue-700 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <form onSubmit={handleBiographySubmit} className='h-full flex flex-col justify-center px-4 py-8 gap-4 w-full text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700'>
              <Label
                htmlFor="biografia"
                value="Biografia"
              />
              <Textarea
                id="biografia"
                placeholder="Leave a comment..."
                value={biografiaState}
                rows={4}
                onChange={(e) => setbiografiaState(e.target.value)}
              />
              <button
                type='submit'
                className='h-12 w-full bg-blue-700 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
              >
                Enviar
              </button>
            </form>
            <div className='w-full flex justify-end'>
              <button
                type='submit'
                className='h-12 w-full lg:w-1/4 bg-red-500 text-white flex text-center justify-center items-center custom-file-label font-medium rounded-lg'
                onClick={() => {
                  toast.error("Não quero excluir")
                }}
              >
                Excluir conta
              </button>
            </div>

          </div>
        </Tabs.Item>
        <Tabs.Item
          active
          title="Endereço"
        >
    
          
          <button className='w-full h-full' onClick={() => {
            props2.setOpenModal2('default')
          }}>
            <div className='flex flex-col p-4 gap-4 items-center w-full text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-4 lg:h-96'>
              <Image className='h-full lg:h-72 w-fit' alt="cadastro da casa" src="/assets/cadastro-casa.svg" width={500} height={500} />
              <div className='lg:w-1/2'>
                <span className='text-gray-500'>Para cadastrar uma nova residência basta </span>
                <span className='text-blue-700'>clicar aqui </span>
                <span className='text-gray-500'>e preencher o formulário</span>
              </div>
            </div>
          </button>
        </Tabs.Item>
      </Tabs.Group>
    </div >
  )
}


