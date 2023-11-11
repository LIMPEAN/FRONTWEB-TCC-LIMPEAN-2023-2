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
  photoUser: string;
  email: string;
  gender: string;
  phone: {
    ddd: string;
    numero: string;
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

  const handleUpdateClick = async (json: IUpdateAddres, id: number) => {

    try {
      const response = await putApi(json, `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client/update/register/address?id=${id}`, token!!);
      if (response.status == undefined) {
        toast.error("Dados não atualizados, verifique as informações")
        toast.error("Informação do servidor: " + response)
      }
      else if (response.status = 201) {
        toast.success("Usuário atualizado com sucesso!")
        fetchData()
        props.setOpenModal(undefined)
      } else {
        toast.error("Dados não atualizados, verifique as informações" + response)
      }
    } catch (error) {
      toast.error("Servidor indisponível para esse processo")
    }

  }

  const handleCreateAddressClick = async (json: any, token: string) => {

    try {
      const response = await postAddress(json, `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client/new/register/address`, token!!);
      if (response.status == undefined) {
        toast.error("Dados não atualizados, verifique as informações")
        toast.error("Informação do servidor: " + response)
      }
      else if (response.status = 201) {
        toast.success("Usuário atualizado com sucesso!")
        fetchData()
        props2.setOpenModal2(undefined)
      } else {
        toast.error("Dados não atualizados, verifique as informações" + response)
      }
    } catch (error) {
      toast.error("Servidor indisponível para esse processo")
    }

  }

  function isFormatValid(file: File) {
    const formatosValidos = [".jpg", ".jpeg", ".png", ".gif"];
    const extensao = file?.name?.split(".")?.pop()?.toLowerCase();
    return formatosValidos.includes(`.${extensao}`);
  }

  const fetchData = useCallback(() => {
    const apiUrl = `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client`;
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
      phone: data?.phone[0].numero,
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
      "phones": [
        {
          "ddd": phones?.length == null ? null : phones[0].ddd,
          "phone": phones?.length == null ? null : phones[0].phone,
          "newDDD": phones?.length == null ? null : phones[0].newDDD,
          "newPhone": phones?.length == null ? null : phones[0].newPhone
        }
      ]
    }

    try {
      const response = await putApi(jsonUsuario, `https://backend-tcc-limpean-crud.azurewebsites.net/v1/limpean/client/`, token!!);
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
                <Image className='w-32 h-32 object-cover rounded-md' src={data?.photoUser ? data?.photoUser : "https://firebasestorage.googleapis.com/v0/b/tcc-limpean.appspot.com/o/imagens%2Fprofile-default.webp?alt=media&token=8a68000c-eb45-4948-9fae-f01a00a10d1e&_gl=1*1u1domm*_ga*MTAyMTA0OTYwOS4xNjk0NTU2NDQx*_ga_CW55HF8NVT*MTY5NjExNzIyOC4zLjEuMTY5NjExNzI4Ny4xLjAuMA.."} alt={"foto de perfil de " + data?.name} width={300} height={300} />
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
                      (data?.phone[0].numero ? data?.phone[0].numero : "99999999")
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
          <span className='text-2xl'>Endereço</span>
          {data?.endereco.map((adress: IEndereco) => {
            return (
              <form key={data?.name} onSubmit={handleSubmit} className='flex flex-col p-4 gap-4 items-start w-full text-gray-800  rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-4 relative'>
                <div className='w-full flex bg-inherit text-inherit text-start uppercase '>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 w-full'>
                    <div className='w-full'>
                      <label htmlFor="cep">CEP</label>
                      <TextInput
                        id="cep"
                        className='w-full'
                        onBlur={handleCepBlur}
                        value={adress.cep}
                        disabled
                      />
                    </div>
                    <div className='w-full'>
                      <label htmlFor="estado">Estado</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="estado"
                        name="estado"
                        placeholder={adress.state}
                        value={adress.state}
                        disabled
                      />
                    </div>

                    <div className='w-full'>
                      <label htmlFor="cidade">Cidade</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="cidade"
                        name="cidade"
                        value={adress.city}
                        disabled
                      />
                    </div>
                    <div className='w-full'>
                      <label htmlFor="logradouro">Logradouro</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="logradouro"
                        name="logradouro"
                        placeholder={adress.publicPlace}
                        value={adress.publicPlace}
                        disabled
                      />
                    </div>
                    <div className='w-full '>
                      <label htmlFor="bairro">Bairro</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="bairro"
                        name="bairro"
                        value={adress.district}
                        disabled
                      />
                    </div>
                    <div className='w-full '>
                      <label htmlFor="complemento">Complemento</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="complemento"
                        name="complemento"
                        value={adress.complement}
                        disabled
                      />
                    </div>
                    <div className='w-full'>
                      <label htmlFor="tipo__casa">Tipo de residência</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="tipo__casa"
                        name="tipo__casa"
                        value={adress.typeHouse}
                        disabled
                      />
                    </div>
                    <div className='w-full'>
                      <label htmlFor="numero">Número</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="numero"
                        name="numero"
                        value={adress.houseNumber}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <button className='absolute bottom-0 right-0 mb-4 mr-4' onClick={() => {
                  setCep(adress.id_address)
                  props.setOpenModal('default')
                }}>
                  <svg
                    className="fill-gray-500 hover:fill-gray-400 w-6 h-fit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7.00001 7V2.13C6.51204 2.26498 6.06686 2.52286 5.70701 2.879L2.87901 5.707C2.52287 6.06685 2.26498 6.51204 2.13001 7H7.00001Z" fill="" />
                    <path d="M8.73701 13.061C8.85136 12.4871 9.13322 11.9599 9.54701 11.546L15.664 5.43C16.3065 4.78992 17.1159 4.34327 18 4.141V4C18.0083 3.47862 17.8094 2.97524 17.4471 2.6003C17.0847 2.22536 16.5884 2.00947 16.067 2H9.00001V7C9.00001 7.53043 8.78929 8.03914 8.41422 8.41421C8.03915 8.78929 7.53044 9 7.00001 9H2.00001V20C1.99171 20.5214 2.19057 21.0248 2.55295 21.3997C2.91533 21.7746 3.41165 21.9905 3.93301 22H16.067C16.5884 21.9905 17.0847 21.7746 17.4471 21.3997C17.8094 21.0248 18.0083 20.5214 18 20V16.907L16.454 18.453C16.0408 18.8665 15.5143 19.1484 14.941 19.263L11.541 19.942C11.3484 19.9808 11.1525 20.0002 10.956 20C10.5181 19.9997 10.0858 19.9022 9.69011 19.7146C9.29445 19.527 8.94534 19.254 8.66794 18.9152C8.39055 18.5764 8.19178 18.1802 8.08596 17.7553C7.98014 17.3304 7.96991 16.8873 8.05601 16.458L8.73701 13.061Z" fill="" />
                    <path d="M10.961 18C11.0245 18.0001 11.0878 17.9938 11.15 17.981L14.55 17.302C14.7357 17.2645 14.9062 17.173 15.04 17.039L21.158 10.922C21.6928 10.3798 21.9915 9.64818 21.9888 8.88666C21.9862 8.12513 21.6824 7.39556 21.1439 6.85714C20.6053 6.31873 19.8757 6.01517 19.1141 6.01271C18.3526 6.01024 17.621 6.30908 17.079 6.844L10.962 12.961C10.8277 13.0951 10.7362 13.2659 10.699 13.452L10.02 16.852C9.99239 16.9912 9.99595 17.1348 10.0304 17.2725C10.0649 17.4101 10.1294 17.5385 10.2194 17.6482C10.3094 17.758 10.4225 17.8464 10.5508 17.9073C10.679 17.9681 10.8191 17.9998 10.961 18ZM18.438 8.2C18.5272 8.11066 18.6333 8.03984 18.75 7.99161C18.8667 7.94339 18.9917 7.91871 19.118 7.919C19.309 7.91781 19.496 7.97356 19.6552 8.07914C19.8144 8.18472 19.9384 8.33533 20.0116 8.51175C20.0848 8.68817 20.1038 8.88239 20.0661 9.06964C20.0284 9.25688 19.9358 9.42864 19.8 9.563L19.485 9.878L18.125 8.518L18.438 8.2ZM12.527 14.111L16.763 9.875L18.122 11.234L13.886 15.471L12.186 15.81L12.527 14.111Z" fill="" />
                  </svg>
                </button>
                <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                  <Modal.Header>Atualizar o endereço</Modal.Header>
                  <Modal.Body>
                    <form key={data?.name} onSubmit={handleSubmit} className='flex flex-col p-4 gap-4 items-start w-full'>
                      <div className='w-full flex bg-inherit text-inherit text-start uppercase '>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 w-full dark:text-white font-medium'>
                          <div className='w-full'>
                            <label htmlFor="cep">CEP</label>
                            <TextInput
                              id="cep"
                              className='w-full'
                              onBlur={handleCepBlur}
                              maxLength={8}
                              minLength={8}
                              placeholder={adress.cep}

                            />
                          </div>
                          <div className='w-full'>
                            <label htmlFor="estado">Estado</label>
                            <TextInput
                              type="text"
                              className='w-full'
                              id="estado"
                              name="estado"
                              placeholder={adress.state}
                              value={addressState?.uf}
                              disabled
                            />
                          </div>

                          <div className='w-full'>
                            <label htmlFor="cidade">Cidade</label>
                            <TextInput
                              type="text"
                              className='w-full'
                              id="cidade"
                              name="cidade"
                              placeholder={adress.city}
                              value={addressState?.localidade}
                              disabled
                            />
                          </div>
                          <div className='w-full'>
                            <label htmlFor="logradouro">Logradouro</label>
                            <TextInput
                              type="text"
                              className='w-full'
                              id="logradouro"
                              name="logradouro"
                              placeholder={adress.publicPlace}
                              value={addressState?.logradouro}
                              disabled
                            />
                          </div>
                          <div className='w-full '>
                            <label htmlFor="bairro">Bairro</label>
                            <TextInput
                              type="text"
                              className='w-full'
                              id="bairro"
                              name="bairro"
                              placeholder={adress.district}
                              value={addressState?.bairro}
                              disabled
                            />
                          </div>
                          <div className='w-full '>
                            <label htmlFor="complemento">Complemento</label>
                            <TextInput
                              type="text"
                              className='w-full'
                              id="complemento"
                              name="complemento"
                              // value={state.complemento ? state.complemento : ''}
                              value={state.complemento ? state.complemento : adress?.complement || ''}
                              onChange={handleInput}
                            />
                          </div>
                          <div className='w-full'>
                            <label htmlFor="tipo__casa">Tipo de residência</label>
                            <TextInput
                              type="text"
                              className='w-full'
                              id="tipo__casa"
                              name="tipo__casa"
                              value={adress.typeHouse}
                              disabled
                            />
                          </div>
                          <div className='w-full'>
                            <label htmlFor="numero">Número</label>
                            <TextInput
                              type="text"
                              className='w-full'
                              id="numero"
                              name="numero"
                              placeholder={adress.houseNumber}
                              value={state.numero ? state.numero : adress?.houseNumber || ''}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button color="gray" onClick={() => props.setOpenModal(undefined)}>Desfazer</Button>
                    <Button className='bg-blue-700' onClick={() => {
                      function getStateIdBySigla(sigla: string): number | undefined {
                        const upperCaseSigla = sigla.toUpperCase();
                        for (const estado in Estado) {
                          if (estado === upperCaseSigla) {
                            return Number(Estado[estado]);
                          }
                        }
                        return undefined;
                      }
                      const stateId = getStateIdBySigla(addressState?.localidade!!);
                      const json: IUpdateAddres = {
                        // typeHouse: adress.typeHouse,
                        typeHouse: 1,
                        state: stateId ,
                        city: addressState?.localidade ? addressState.localidade : adress.city,
                        cep: addressState?.cep ? addressState.cep : adress.cep,
                        publicPlace: addressState?.logradouro ? addressState.logradouro : adress.publicPlace,
                        complement: state?.complemento ? state?.complemento : adress.complement,
                        district: addressState?.bairro ? addressState.bairro : adress.district,
                        houseNumber: state.numero ? state.numero : adress.houseNumber,
                      }

                      handleUpdateClick(json, cepState!!)

                    }}>Atualizar</Button>
                  </Modal.Footer>
                </Modal>

              </form>
            )
          })}
          <Modal show={props2.openModal2 === 'default'} onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header>Atualizar o endereço</Modal.Header>
            <Modal.Body>
              <form key={data?.name} onSubmit={handleSubmit} className='flex flex-col p-4 gap-4 items-start w-full'>
                <div className='w-full flex bg-inherit text-inherit text-start uppercase '>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 w-full dark:text-white font-medium'>
                    <div className='w-full'>
                      <label htmlFor="cep">CEP</label>
                      <TextInput
                        id="cep"
                        className='w-full'
                        onBlur={handleCepBlur}
                        maxLength={8}
                        minLength={8}
                      />
                    </div>
                    <div className='w-full'>
                      <label htmlFor="estado">Estado</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="estado"
                        name="estado"
                        value={addressState?.uf}
                        disabled
                      />
                    </div>

                    <div className='w-full'>
                      <label htmlFor="cidade">Cidade</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="cidade"
                        name="cidade"
                        value={addressState?.localidade}
                        disabled
                      />
                    </div>
                    <div className='w-full'>
                      <label htmlFor="logradouro">Logradouro</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="logradouro"
                        name="logradouro"
                        value={addressState?.logradouro}
                        disabled
                      />
                    </div>
                    <div className='w-full '>
                      <label htmlFor="bairro">Bairro</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="bairro"
                        name="bairro"
                        value={addressState?.bairro}
                        disabled
                      />
                    </div>
                    <div className='w-full '>
                      <label htmlFor="complemento">Complemento</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="complemento"
                        name="complemento"
                        onChange={(e) => setinputComplement(e.target.value)}
                        value={inputComplement}
                      />
                    </div>
                    <div className='w-full'>
                      <label htmlFor="tipo__casa">Tipo de residência</label>
                      <Select
                        className='w-full'
                        id="tipo__casa"
                        name="tipo__casa"
                        onChange={(e) => setselectTypeHouse(Number(e.target.value))}
                      >
                        <option selected value="1" defaultChecked>Casa</option>
                        <option value="2">Apartamento</option>
                        <option value="3">Sobrado</option>2
                        <option value="4">Condomínio</option>
                        <option value="5">Chacara</option>
                        <option value="6">Kitnet</option>
                      </Select>
                      {selectTypeHouse}
                    </div>
                    <div className='w-full'>
                      <label htmlFor="numero">Número</label>
                      <TextInput
                        type="text"
                        className='w-full'
                        id="numero"
                        name="numero"
                        value={inputNumberHouse}
                        onChange={(e) => setinputNumberHouse(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button color="gray" onClick={() => props2.setOpenModal2(undefined)}>Cancelar</Button>
              <Button className='bg-blue-700' onClick={() => {
                function getStateIdBySigla(sigla: string): number | undefined {
                  const upperCaseSigla = sigla.toUpperCase();
                  for (const estado in Estado) {
                    if (estado === upperCaseSigla) {
                      return Number(Estado[estado]);
                    }
                  }
                  return undefined;
                }
                const stateId = getStateIdBySigla(addressState?.uf!!);

                const json = {
                  address: {
                    typeHouse: selectTypeHouse,
                    state: stateId,
                    city: addressState?.localidade,
                    cep: addressState?.cep,
                    publicPlace: addressState?.logradouro,
                    complement: inputComplement,
                    district: addressState?.bairro,
                    houseNumber: inputNumberHouse
                  }

                }

                handleCreateAddressClick(json, token!!)

              }}>Criar</Button>
            </Modal.Footer>
          </Modal>
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


