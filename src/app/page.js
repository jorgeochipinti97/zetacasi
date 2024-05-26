"use client";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Home() {
  const { push } = useRouter();
  const { toast } = useToast()

  const [form, setForm] = useState({
    nombre: "",
    celular: "",
    email: "",
    pais: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/people", form);
      if (res.status === 201) {
        setForm({ nombre: '', celular: '', email: '', pais: '' }); // Reset the form
        toast({
          title: "Información enviada",
          description: "Gracias por confiar en Casino Zeta",
          action: <ToastAction onClick={()=>push('')}>Empezar ahora</ToastAction>,

        })
      }
      console.log(form);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main>
      <div className="fixed flex left-5 bottom-5">
        <div                 onClick={() => push("https://walink.co/d0f296")}
>
          <svg
            width={50}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 32 32"
            className="cursor-pointer"
          >
            <g>
              <path
                fill="#BFC8D0"
                fillRule="evenodd"
                d="M16 31c7.732 0 14-6.268 14-14S23.732 3 16 3 2 9.268 2 17c0 2.51.661 4.867 1.818 6.905L2 31l7.315-1.696A13.938 13.938 0 0016 31zm0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 5.154 4.154 10.458 4.154 17c0 2.526.79 4.867 2.138 6.79L5.23 27.77l4.049-1.013a11.791 11.791 0 006.72 2.09z"
                clipRule="evenodd"
              ></path>
              <path
                fill="url(#paint0_linear_87_7264)"
                d="M28 16c0 6.627-5.373 12-12 12-2.528 0-4.873-.782-6.807-2.116L5.09 26.909l1.075-4.03A11.945 11.945 0 014 16C4 9.373 9.373 4 16 4s12 5.373 12 12z"
              ></path>
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M16 30c7.732 0 14-6.268 14-14S23.732 2 16 2 2 8.268 2 16c0 2.51.661 4.867 1.818 6.905L2 30l7.315-1.696A13.938 13.938 0 0016 30zm0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 4.154 4.154 9.458 4.154 16c0 2.526.79 4.867 2.138 6.79L5.23 26.77l4.049-1.013a11.791 11.791 0 006.72 2.09z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#fff"
                d="M12.5 9.5c-.333-.669-.844-.61-1.36-.61-.921 0-2.359 1.105-2.359 3.16 0 1.684.742 3.528 3.243 6.286 2.414 2.662 5.585 4.039 8.218 3.992 2.633-.047 3.175-2.313 3.175-3.078 0-.339-.21-.508-.356-.554-.897-.43-2.552-1.233-2.928-1.384-.377-.15-.573.054-.695.165-.342.325-1.019 1.284-1.25 1.5-.232.215-.578.106-.721.024-.53-.212-1.964-.85-3.107-1.958-1.415-1.371-1.498-1.843-1.764-2.263-.213-.336-.057-.542.021-.632.305-.351.726-.894.914-1.164.189-.27.04-.679-.05-.934-.387-1.097-.715-2.015-.981-2.55z"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_87_7264"
                  x1="26.5"
                  x2="4"
                  y1="7"
                  y2="28"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#5BD066"></stop>
                  <stop offset="1" stopColor="#27B43E"></stop>
                </linearGradient>
              </defs>
            </g>
          </svg>
        </div>
        <div
          onClick={() =>
            push(
              "https://www.instagram.com/zeta.casinook?igsh=MW01ODZnZm8wenB0bw=="
            )
          }
        >
          <svg
            width={50}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="mx-2 cursor-pointer"
            viewBox="0 0 32 32"
          >
            <g>
              <rect
                width="28"
                height="28"
                x="2"
                y="2"
                fill="url(#paint0_radial_87_7153)"
                rx="6"
              ></rect>
              <rect
                width="28"
                height="28"
                x="2"
                y="2"
                fill="url(#paint1_radial_87_7153)"
                rx="6"
              ></rect>
              <rect
                width="28"
                height="28"
                x="2"
                y="2"
                fill="url(#paint2_radial_87_7153)"
                rx="6"
              ></rect>
              <path
                fill="#fff"
                d="M23 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              ></path>
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M16 21a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M6 15.6c0-3.36 0-5.04.654-6.324a6 6 0 012.622-2.622C10.56 6 12.24 6 15.6 6h.8c3.36 0 5.04 0 6.324.654a6 6 0 012.622 2.622C26 10.56 26 12.24 26 15.6v.8c0 3.36 0 5.04-.654 6.324a6 6 0 01-2.622 2.622C21.44 26 19.76 26 16.4 26h-.8c-3.36 0-5.04 0-6.324-.654a6 6 0 01-2.622-2.622C6 21.44 6 19.76 6 16.4v-.8zM15.6 8h.8c1.713 0 2.878.002 3.778.075.877.072 1.325.202 1.638.361a4 4 0 011.748 1.748c.16.313.29.761.36 1.638.074.9.076 2.065.076 3.778v.8c0 1.713-.002 2.878-.075 3.778-.072.877-.202 1.325-.361 1.638a4 4 0 01-1.748 1.748c-.313.16-.761.29-1.638.36-.9.074-2.065.076-3.778.076h-.8c-1.713 0-2.878-.002-3.778-.075-.877-.072-1.325-.202-1.638-.361a4 4 0 01-1.748-1.748c-.16-.313-.29-.761-.36-1.638C8.001 19.278 8 18.113 8 16.4v-.8c0-1.713.002-2.878.075-3.778.072-.877.202-1.325.361-1.638a4 4 0 011.748-1.748c.313-.16.761-.29 1.638-.36.9-.074 2.065-.076 3.778-.076z"
                clipRule="evenodd"
              ></path>
              <defs>
                <radialGradient
                  id="paint0_radial_87_7153"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(-55.376 27.916 .066) scale(25.5196)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#B13589"></stop>
                  <stop offset="0.793" stopColor="#C62F94"></stop>
                  <stop offset="1" stopColor="#8A3AC8"></stop>
                </radialGradient>
                <radialGradient
                  id="paint1_radial_87_7153"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="rotate(-65.136 29.766 6.89) scale(22.5942)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E0E8B7"></stop>
                  <stop offset="0.445" stopColor="#FB8A2E"></stop>
                  <stop offset="0.715" stopColor="#E2425C"></stop>
                  <stop offset="1" stopColor="#E2425C" stopOpacity="0"></stop>
                </radialGradient>
                <radialGradient
                  id="paint2_radial_87_7153"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="matrix(38.50003 -5.5 1.1764 8.23476 .5 3)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.157" stopColor="#406ADC"></stop>
                  <stop offset="0.468" stopColor="#6A45BE"></stop>
                  <stop offset="1" stopColor="#6A45BE" stopOpacity="0"></stop>
                </radialGradient>
              </defs>
            </g>
          </svg>
        </div>
      </div>
      <div
        className=" min-h-screen py-10 w-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, .7), rgba(0, 0, 0, .2)),url(./bg.png)",
        }}
      >
        <section className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="flex items-center flex-col justify-center">
            <p className="text-4xl md:text-7xl font-bold text-white text-start tracking-tighter">
              Juega{" "}
              <span
                className="text-yellow-400"
                style={{ textShadow: "1px 1px 1px 1px black" }}
              >
                {" "}
                Casino Zeta
              </span>
            </p>
            <p className="text-2xl md:text-5xl font-bold text-white">
              Y gana ilimitadamente
            </p>
            <div className="mt-5">
              <Button
                size="lg"
                className="font-bold"
                onClick={() => push("https://walink.co/d0f296")}
              >
                {" "}
                <svg
                  className="mr-2"
                  width={32}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  version="1.1"
                  viewBox="0 0 32 32"
                >
                  <g>
                    <g
                      fill="#000"
                      fillRule="evenodd"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="4.1"
                      color="#000"
                      transform="translate(-204 -292)"
                    >
                      <path
                        d="M232.42 306.895c-.642 0-1.284.24-1.768.724l-2.933 2.936a2.485 2.485 0 00-1.455-1.08l-6.924-1.856a4.1 4.1 0 00-1.676-.092 4.096 4.096 0 00-1.572.584l-4.322 2.727-.35-.608a1.621 1.621 0 00-2.19-.585l-3.287 1.896a1.621 1.621 0 00-.586 2.19l4.899 8.482a1.62 1.62 0 002.187.588l3.287-1.899a1.622 1.622 0 00.588-2.19l-.064-.112 1.873-1.266 6.89 1.355c.945.186 1.789-.077 2.461-.765a531.235 531.235 0 016.706-6.764 1 1 0 00.006-.004 2.519 2.519 0 000-3.537 2.496 2.496 0 00-1.77-.725zm0 1.982a.5.5 0 01.353.156.48.48 0 010 .71 533.533 533.533 0 00-6.724 6.784c-.041.042-.588.21-.645.2l-7.299-1.434a1 1 0 00-.753.152l-2.1 1.42-2.48-4.295 4.386-2.765a2.1 2.1 0 011.664-.254l6.924 1.855a.48.48 0 01.354.614.48.48 0 01-.614.353l-4.345-1.164a1 1 0 00-1.225.707 1 1 0 00.707 1.225l4.346 1.164a2.52 2.52 0 002.592-.852 1 1 0 00.263-.176l4.242-4.244a.5.5 0 01.354-.156zm-22.533 2.697l.484.84a1 1 0 00.139.4 1 1 0 00.238.252l3.639 6.303-2.598 1.5-4.5-7.795z"
                        style={{ InkscapeStroke: "none" }}
                      ></path>
                      <path
                        d="M224 301.014a1 1 0 00-1 1 1 1 0 001 1h2a1 1 0 001-1 1 1 0 00-1-1z"
                        style={{ InkscapeStroke: "none" }}
                      ></path>
                      <path
                        d="M224 297.014a1 1 0 00-1 1 1 1 0 001 1h2a1 1 0 001-1 1 1 0 00-1-1z"
                        style={{ InkscapeStroke: "none" }}
                      ></path>
                      <path
                        d="M225 293.014c-3.854 0-7 3.146-7 7s3.146 7 7 7 7-3.146 7-7-3.146-7-7-7zm0 2c2.773 0 5 2.226 5 5 0 2.773-2.227 5-5 5s-5-2.227-5-5c0-2.774 2.227-5 5-5z"
                        style={{ InkscapeStroke: "none" }}
                      ></path>
                    </g>
                  </g>
                </svg>
                Jugar ahora
              </Button>
            </div>
          </div>
          <div>
            <img src="/thumb.png" className="mt-10" />
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 w-10/12 ">
          <div className="flex justify-center items-start">
            <video
              src="/video.mp4"
              className="rounded-xl h-[65vh] shadowVideo"
              autoPlay
              muted
              playsInline
              loop
            />
          </div>
          <div className="flex justify-center flex-col mt-10 md:mt-0 items-center ">
            <Card className="shadowVideo">
              <CardContent>
                <p className="text-black font-bold text-3xl  p-10 text-center ">
                  Mantengamos contacto
                </p>
                <form className="" onSubmit={handleSubmit}>
                  <Input
                    className="my-2"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                  />
                  <Input
                    className="my-2"
                    name="celular"
                    placeholder="Celular"
                    value={form.celular}
                    onChange={handleChange}
                  />
                  <Input
                    className="my-2"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <Input
                    className="my-2"
                    name="pais"
                    placeholder="País"
                    value={form.pais}
                    onChange={handleChange}
                  />
                  <Button
                    className="mt-5"
                    // onClick={() => push("https://walink.co/d0f296")}
                  >
                    <svg
                      width={20}
                      className="mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.5 12H5.42m-.173.797L4.242 15.8c-.55 1.643-.826 2.465-.628 2.971.171.44.54.773.994.9.523.146 1.314-.21 2.894-.92l10.135-4.561c1.543-.695 2.314-1.042 2.553-1.524a1.5 1.5 0 000-1.33c-.239-.482-1.01-.83-2.553-1.524L7.485 5.243c-1.576-.71-2.364-1.064-2.887-.918a1.5 1.5 0 00-.994.897c-.198.505.074 1.325.618 2.966l1.026 3.091c.094.282.14.423.159.567a1.5 1.5 0 010 .385c-.02.144-.066.285-.16.566z"
                      ></path>
                    </svg>
                    Enviar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <section
        className="bg-black py-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, .4), rgba(0, 0, 0, .6)),url(./bg2.jpg)",
        }}
      >
        <div className="w-screen flex justify-center">
          <p className="text-center text-5xl text-yellow-200 md:text-7xl font-bold tracking-tighter mb-10 ">
            ¿Cómo jugar?
          </p>
        </div>
        <div className="w-screen flex justify-center">
          <div className=" grid grid-cols-1 md:grid-cols-5 w-10/12">
            <div className="flex justify-center">
              <Card className="w-10/12 mt-10">
                <CardHeader>
                  <CardTitle className='text-center'>Registrarse</CardTitle>
                  
                </CardHeader>
                <CardFooter className="flex justify-center mx-2">
                  <Button onClick={() => push("https://walink.co/d0f296")}>
                    <svg
                      className="  w-[30px] mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 17c0 .351 0 .527.016.68a3 3 0 002.286 2.611c.15.036.324.059.672.105l6.592.88c1.876.25 2.814.375 3.542.085a3 3 0 001.509-1.32c.383-.684.383-1.63.383-3.524V7.482c0-1.893 0-2.84-.383-3.523a3 3 0 00-1.509-1.32c-.728-.29-1.666-.165-3.542.085l-6.592.88c-.349.046-.523.069-.672.105A3 3 0 006.016 6.32C6 6.473 6 6.65 6 7m6 1l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                    Registrarme ahora
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className=" items-center w-full hidden md:flex">
              <div className="h-[.5px] flex-1 bg-white"></div>
            </div>
            <div className="flex justify-center">
              <Card className="w-10/12 mt-10">
                <CardHeader>
                  <CardTitle className='text-center'>Recargar</CardTitle>
                  
                </CardHeader>
                <CardFooter className="flex justify-center mx-2">
                  <Button onClick={() => push("https://walink.co/d0f296")}>
                    <svg
                      className="  w-[30px] mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M2 8a4 4 0 014-4h12a4 4 0 014 4v.5a.5.5 0 01-.5.5h-19a.5.5 0 01-.5-.5V8zm.5 3a.5.5 0 00-.5.5V16a4 4 0 004 4h12a4 4 0 004-4v-4.5a.5.5 0 00-.5-.5h-19zM13 15a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Recargar ahora
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className=" items-center w-full hidden md:flex">
              <div className="h-[.5px] flex-1 bg-white"></div>
            </div>
            <div className="flex justify-center">
              <Card className="w-10/12 mt-10">
                <CardHeader>
                  <CardTitle className='text-center'>Ganá</CardTitle>
                  
                </CardHeader>
                <CardFooter className="flex justify-center mx-2">
                  <Button onClick={() => push("https://walink.co/d0f296")}>
                    <svg
                      width={25}
                      className="mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000"
                      version="1.1"
                      viewBox="0 0 962.5 962.5"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path d="M333.25 603.5c-4.101 0-8.301.101-12.5.101-87.2 0-169.5-10.2-231.8-28.7-32.1-9.5-57.8-20.9-76.4-34-2.7-1.9-5.2-3.8-7.6-5.7v144.4c0 51.699 141.4 93.6 315.8 93.6 8.899 0 17.699-.1 26.399-.3-12.7-35.4-19.1-72.601-19.1-110.7.001-19.901 1.701-39.501 5.201-58.701z"></path>
                        <path d="M424.45 429.4c12.9-12.9 26.7-24.601 41.301-35-44.601 6.6-94 10.1-145 10.1-87.2 0-169.5-10.2-231.8-28.7-32.1-9.5-57.8-20.9-76.4-34-2.7-1.9-5.2-3.8-7.6-5.7v143.8c0 4.2 1 8.3 2.8 12.399 20.5 45.9 152.8 81.2 313 81.2 6.5 0 13-.1 19.399-.2 3.7-13.3 8.3-26.5 13.8-39.3a314.585 314.585 0 0121.301-41.7C388.85 469.601 405.35 448.5 424.45 429.4z"></path>
                        <path d="M320.75 217.2c-87.2 0-169.5-10.2-231.8-28.7-32.1-9.5-57.8-20.9-76.4-34-2.7-1.9-5.2-3.8-7.6-5.7v132.1c0 4 .9 8 2.5 11.8 19.6 46.1 152.4 81.8 313.3 81.8 160.899 0 293.7-35.7 313.299-81.8 1.6-3.9 2.5-7.8 2.5-11.8V148.8c-2.4 2-4.9 3.9-7.6 5.7-18.6 13-44.301 24.4-76.4 34-62.298 18.5-144.599 28.7-231.799 28.7z"></path>
                        <path d="M636.55 93.6c0-5.1-1.4-10.1-4.1-15-2.801-5.2-7-10.2-12.5-15C577.751 26.6 459.75 0 320.75 0S63.649 26.6 21.55 63.6c-5.5 4.8-9.7 9.8-12.5 15-2.7 4.9-4.1 9.9-4.1 15 0 51.7 141.4 93.6 315.8 93.6 174.399 0 315.8-41.9 315.8-93.6zM666.55 361.9c-3.1-.1-6.199-.2-9.4-.2-1.898 0-3.799 0-5.6.1-5 .1-10 .3-15 .6-94.299 6.4-176.7 56.3-227.2 129.899-16.7 24.301-30 51.301-39 80.101-1.6 5-3 10.1-4.3 15.2-1.3 5-2.4 10.1-3.4 15.1-3.899 19.2-5.899 39.1-5.899 59.4 0 38.699 7.3 75.6 20.6 109.5C421.15 883.3 529.95 962.5 657.149 962.5c165.9 0 300.4-134.5 300.4-300.399.1-162.701-129.4-295.201-290.999-300.201zm78.599 444.9c-15.1 15.9-35.699 26.4-59.299 30.601v12c0 11-8.9 19.899-19.9 19.899h-10.801c-11 0-19.898-8.899-19.898-19.899v-12.5c-13-2.5-25.5-6.7-36.701-12.4-13.199-6.8-24.699-17.899-34.299-32.899-6.4-10-11-21.601-13.801-34.601-1.1-4.899-.199-9.8 2.1-13.8 2.801-5 7.801-8.7 13.9-9.8l10.699-1.9c2.201-.399 4.4-.399 6.4 0 7.701 1.2 14.201 6.8 16.201 14.7 3 11.9 7.1 21.1 12.199 27.6 11.4 14.601 30.199 23.301 50.301 23.301 3.398 0 6.799-.301 10.199-.801 14.4-2.199 27.301-9 36.199-19.199 9.5-10.801 14.301-24.4 14.301-40.4 0-13.5-3.301-24.5-9.9-32.6-12.1-14.801-32.799-21.2-51.5-25.4-8.699-2-17-3.9-25.199-6.2-13.6-3.9-26.701-8.7-39.801-16-13.5-7.5-24-18.1-31.299-31.4-7.201-13.199-10.9-28.399-10.9-45.199 0-2 .1-3.9.1-5.801.301-5.699 1-11.1 2-16.3 1.301-6.2 3.1-12.1 5.5-17.7 5.301-12.399 13.4-23.399 24.1-32.8 7-6.1 15.4-11.2 24.9-15.1 7.4-3.101 15.5-5.4 24-7V469c0-2.4.5-4.8 1.301-6.9 2.398-6.5 8.1-11.3 15-12.6 1.199-.2 2.398-.3 3.6-.3h11.401c10.699.3 19.299 9.1 19.299 19.8v16.5c17.9 3.5 33.801 10.5 45.801 20.4 12.699 10.5 21.9 23.8 27.6 39.8 4.199 11.7-3.5 24.399-15.801 26.2l-10.5 1.6c-9.5 1.4-18.699-4.2-21.699-13.2-2.5-7.399-5.9-13.5-10.1-18.2-9.5-10.6-24.4-16.699-40.9-16.699-5 0-9.9.6-14.6 1.6-3.1.7-6.1 1.6-9 2.7-8.201 3.2-15.4 7.899-20.9 14a50.531 50.531 0 00-6.5 9.1c-4 7.2-6 15.2-6 24.1 0 12.601 3.5 23.301 10.5 31.801 6.199 7.399 14 12.6 22.799 16.399 12 5.2 25.602 8 39 10.7 13.5 2.7 27.5 5.5 39.701 10.9 12.9 5.7 23.699 12.8 31.9 21 8.299 8.3 14.699 18.2 19.199 29.6 4.4 11.3 6.701 23.7 6.701 36.8.099 28.899-9.202 53.299-27.603 72.699z"></path>
                      </g>
                    </svg>
                    Ir a ganar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
