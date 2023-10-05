import Image from "next/image";
import { Children, ReactNode } from "react";
import React, { InputHTMLAttributes } from "react";
import image from "./Profile/test.jpg";
import { MyInput } from "../../../../(public)/components/input";
import Assentment from "./Assentment";

interface ProfileProps {
  profileImage: string;
}

export default function Profile() {
  const textFieldsProps = [
    { labelName: "Idade", value: "19" },
    { labelName: "Média", value: "30.0" },
    { labelName: "Localidade", value: "Av Brasil, Cotia - SP" },
    { labelName: "Gênero", value: "Masculino" },
  ];
  const averageStars = 4.0;

  return (
    <React.Fragment>
      <div
        className="w-screen h-min bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        data-drawer-body-scrolling="true"
      >
        <div className="flex justify-end px-4 pt-4 w-min">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <FakeImage />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Nome da pessoa</h5>
          

          <StarRating rating={5} />
          {textFieldsProps.map(({ labelName, value }) => {
            return (
              <TextField labelName={labelName} key={labelName} value={value} />
            );
          })}
          <TextArea labelName="Biografia" placeHolder="teste" />
          <Buttons />
        </div>
      </div>
    </React.Fragment>
  );
}
function FakeImage() {
  return (
    <Image className="w-20 h-20 rounded-full" src={image} alt="Large avatar" />
  );
}

interface StarsProps {
  rating: number;
}
function StarRating({ rating }: StarsProps) {
  const maxRating = 5; // Assuming a maximum rating of 5 stars
  const stars = [];

  for (let i = 0; i < maxRating; i++) {
    const starClass = i < rating ? "text-yellow-300" : "text-gray-300";

    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${starClass}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    );
  }

  return <div className="flex items-center space-x-1">{stars}</div>;
}

interface TextFieldProps {
  labelName: string;
  type?: string;
  value: string;
}
function TextField({ labelName, type = "text", value }: TextFieldProps) {
  return (
    <div>
      <label
        htmlFor={labelName}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelName}
      </label>
      <input
        type="text"
        id="disabled-input"
        aria-label="disabled input"
        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        disabled
      />
    </div>
  );
}

interface TextAreaProps {
  labelName: string;
  placeHolder: string;
}
function TextArea({ labelName, placeHolder }: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelName}
      </label>
      <textarea
        id="message"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeHolder}
      ></textarea>
    </div>
  );
}

function Buttons() {
  const firstButton = "Agendar";
  const secondButton = "Cancelar";
  return (
    <div className="flex mt-4 space-x-3 md:mt-6">
      <a
        href="#"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {firstButton}
      </a>
      <a
        href="#"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
      >
        {secondButton}
      </a>
    </div>
  );
}
