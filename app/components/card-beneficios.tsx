import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  whiteTheme: boolean,
  title: string,
  button: boolean,
  textButton?: string
  children?: ReactNode;
}

export function CardBeneficios({ whiteTheme, children, title, button, textButton }: Props) {

  let background = "bg-blue-600"
  let fontTitleColor = "text-white"
  let fontColor = "text-white"
  let imageTheme = "/assets/beneficios-card-white.svg"
  let buttonConfig = {
    background: "bg-white",
    textColor: "text-blue-600"
  }

  if (whiteTheme === true) {

    background = "bg-white"
    fontTitleColor = "text-blue-600"
    fontColor = "text-slate-700"
    imageTheme = "/assets/beneficios-card-blue.svg"
    buttonConfig = {
      background: "bg-blue-600",
      textColor: "text-white"
    }

  }
  return (

    <div className={`${background}  flex flex-col rounded-lg p-8 gap-8 h-fit`}>
      <Image className="" src={imageTheme} alt="Logo" width={75} height={75} />
      <span className={`${fontTitleColor} font-medium text-lg`}>{title}</span>

      <span className={fontColor}>
        {children}
      </span>

      {button ? <Link href="#" className={`${buttonConfig.background} ${buttonConfig.textColor} py-4 grid place-items-center rounded-lg `}>{textButton ? textButton : "Botão sem nome"}</Link> : null}

    </div>

  );
}
