"use client";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const { push } = useRouter();
  const { toast } = useToast();
  const refOpenTransaction = useRef();
  const refInput = useRef();
  const [form, setForm] = useState({
    user: "",
    password: "",
  });
  const [formTransaction, setFormTransaction] = useState({
    user: "",
    url: "",
    phone: "",
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    toast({
      title: "Aguarde por favor, imagen subiendose",
    });
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwvuskmlb/image/upload",
        formData
      );
      const data = response.data;

      if (data.secure_url) {
        setFormTransaction((prevFormTransaction) => ({
          ...prevFormTransaction,
          url: data.secure_url,
        }));
        toast({
          title: "Comprobante cargado con éxito",
          description: "¡Estás muy cerca de jugar!",
        });
      }
    } catch (er) {
      console.log(er);
    }
  };
  const handleTransactionChange = (e) => {
    setFormTransaction({
      ...formTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const res = await axios.post("/api/user", form);
      if (res.status === 201) {
        setForm({
          user: "",
          password: "",
          phone: "",
        }); // Reset the
        console.log(res);
        toast({
          title: "Usuario creado",
          description: "¡Ahora es momento de cargar!",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendTransaction = async () => {
    const { user, url, phone } = formTransaction;
    if (!user || !url || !phone) {
      toast({
        title: "Error, complete los campos por favor.",
        variant: "destructive",
      });
      return;
    }
    // console.log(formTransaction);
    const data = await axios.post("/api/transaction", formTransaction);
    if (data) {
      toast({
        title: "Muchas gracias por confiar en Casino Zeta",
        description: "En pocos minutos estarás jugando",
      });
      setFormTransaction({
        user: "",
        url: "",
        phone: "",
      });
      console.log(data);
    }
  };

  const messages = [
    "¡Carga tus fichas y sigue ganando!",
    "¡Cada ficha cuenta, no te detengas!",
    "¡Tus fichas te acercan al éxito!",
    "¡Llena tu cuenta de fichas y alcanza tus metas!",
    "¡Más fichas, más oportunidades!",
    "¡Carga fichas y domina el juego!",
    "¡Cada ficha es un paso hacia la victoria!",
    "¡No te quedes sin fichas, sigue adelante!",
    "¡Tus fichas son la clave del éxito!",
    "¡Carga fichas y demuestra tu habilidad!",
  ];

  useEffect(() => {
    const showToast = () => {
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      toast({
        title: randomMessage,
      });
    };

    const timeout = setTimeout(() => {
      showToast(); // Show initial toast after 5 seconds
      const interval = setInterval(showToast, 15000); // 15000 ms = 15 segundos

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, 5000); // 5000 ms = 5 segundos

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmitInput = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      toast({
        title: "Por favor complete el reCAPTCHA",
        // description: "¡Ahora es momento de cargar!",
        variant: "destructive",
      });

      return;
    }
    try {
      const res = await axios.post("/api/chat", {
        userInput: input,
        captchaToken,
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main>
      <div className="fixed flex left-5 bottom-5">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          ref={refInput}
        />

        <div onClick={() => push("https://walink.co/b8029b")}>
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
              <span
                className="text-yellow-400"
                style={{ textShadow: "1px 1px 1px 1px black" }}
              >
                {" "}
                Casino Zeta
              </span>
            </p>
            <p className='text-white tracking-tighter my-2 '>Usuarios nuevos 30% de bonificacion</p>
            {/*     
            <div className="mt-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="font-bold"
                    ref={refOpenTransaction}
                    // onClick={() => push("https://walink.co/aaa75b")}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000"
                      className="mr-2"
                      width={25}
                      version="1.1"
                      viewBox="0 0 477.778 477.778"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path d="M461.4 152.432c-9.782-25.141-23.593-48.221-40.81-68.392-35.632-41.776-85.384-70.96-141.886-80.455C265.732 1.4 252.482 0 238.889 0c-13.594 0-26.845 1.4-39.815 3.585-56.503 9.495-106.24 38.671-141.887 80.439-17.202 20.18-31.013 43.252-40.794 68.392C5.94 179.261 0 208.351 0 238.889c0 28.065 5.085 54.878 13.981 79.894 9.051 25.445 22.131 48.945 38.726 69.592 35.881 44.636 87.452 75.919 146.367 85.818 12.97 2.185 26.221 3.585 39.815 3.585 13.593 0 26.843-1.4 39.815-3.585 58.913-9.9 110.486-41.183 146.366-85.812 16.595-20.645 29.675-44.145 38.725-69.59 8.896-25.016 13.983-51.837 13.983-79.902 0-30.53-5.942-59.62-16.378-86.457zM433.375 168.6L391.6 192.713c-7.915-26.128-22.365-49.41-41.447-68.012l42.162-24.34c17.808 19.706 31.837 42.794 41.06 68.239zm-66.752 70.289c0 70.431-57.297 127.734-127.734 127.734-70.439 0-127.735-57.303-127.735-127.734 0-70.429 57.297-127.734 127.735-127.734 70.437 0 127.734 57.305 127.734 127.734zM238.889 31.852c13.623 0 26.921 1.408 39.815 3.927v48.757c-12.754-3.297-26.052-5.233-39.815-5.233-13.765 0-27.063 1.937-39.815 5.233V35.779c12.892-2.519 26.19-3.927 39.815-3.927zM85.476 100.354l42.164 24.347c-19.082 18.594-33.546 41.876-41.463 68.004l-41.775-24.113c9.238-25.445 23.267-48.533 41.074-68.238zM41.992 302.609l42.396-24.472c6.75 26.556 20.11 50.438 38.321 69.824l-41.992 24.238c-17.091-20.257-30.358-43.811-38.725-69.59zm196.897 143.317c-13.625 0-26.923-1.408-39.815-3.927v-48.757c12.752 3.298 26.05 5.233 39.815 5.233 13.763 0 27.061-1.935 39.815-5.233v48.757c-12.894 2.519-26.192 3.927-39.815 3.927zm158.154-73.727l-41.976-24.238c18.211-19.379 31.572-43.268 38.321-69.824l42.396 24.48c-8.367 25.771-21.633 49.325-38.741 69.582z"></path>
                        <path d="M252.388 221.533c-20.312-7.644-28.664-12.66-28.664-20.546 0-6.687 5.009-13.374 20.545-13.374 8.958 0 16.238 1.486 22.024 3.289a12.588 12.588 0 009.86-1.042 12.53 12.53 0 006.034-7.847l.218-.823c1.943-7.613-2.629-15.375-10.25-17.342-5.848-1.516-12.8-2.62-21.197-2.994v-8.969c0-6.096-4.518-11.429-10.587-11.997-6.96-.651-12.821 4.817-12.821 11.651v10.987c-25.567 5.015-40.374 21.501-40.374 42.52 0 23.174 17.434 35.118 43.003 43.718 17.669 5.972 25.319 11.704 25.319 20.778 0 9.557-9.315 14.815-22.94 14.815-9.751 0-18.944-1.983-26.921-4.813a12.588 12.588 0 00-10.142.761 12.551 12.551 0 00-6.283 7.995l-.108.405c-2.084 8.141 2.612 16.469 10.653 18.896 7.885 2.371 17.156 4.043 26.595 4.464v10.669c0 6.464 5.24 11.704 11.704 11.704s11.704-5.24 11.704-11.704v-12.341c27.466-4.775 42.521-22.933 42.521-44.193 0-21.493-11.462-34.635-39.893-44.667z"></path>
                      </g>
                    </svg>
                    Cargar fichas
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <div className="flex justify-center">
                    <ScrollArea className="h-[70vh] w-12/12  ">
                      <DialogHeader className={"text-center"}>
                        <DialogTitle className="tracking-tighter font-geist text-2xl">
                          ¿Dónde cargar?
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center mt-5 ">
                        <div className="border-[2px] w-fit p-5 border-green-700 border-dashed rounded-xl">
                          <p className=" text-center font-geist tracking-tighter ">
                            Alias <br />
                            <span className="font-bold uppercase opacity-[.8]">
                              {" "}
                              cra.carnes
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="m-5">
                        <span className="flex mt-3 items-center font-geist tracking-tighter font-bold bg-violet-200 w-fit p-2 rounded-xl">
                          Si es tu primera carga obtenés un 50% por única vez
                        </span>
                        <span className="flex mt-3 items-center font-geist tracking-tighter font-bold bg-green-200 w-fit p-2 rounded-xl">
                          Recibiras una bonificacion dependiendo el monto de la
                          carga.{" "}
                        </span>
                        <span className="flex mt-3 items-start font-geist tracking-tighter font-bold bg-gray-200 w-fit p-2 rounded-xl">
                          Puede existir una demora de 10 minutos
                        </span>
                        <div className="mb-5 mt-5">
                          <Input
                            className="border-2 border-black my-3 w-9/12 "
                            placeholder="Usuario"
                            name="user"
                            onChange={handleTransactionChange}
                            value={formTransaction.user}
                          />
                          <p className="text-xs font-semibold font-mono opacity-[.7] mt-1 mb-5">
                            Asegurate de escribirlo correctamente
                          </p>
                          <Input
                            className="border-2 border-black mt-3 w-9/12 "
                            placeholder="Celular"
                            name="phone"
                            onChange={handleTransactionChange}
                            value={formTransaction.phone}
                          />
                          <p className="text-xs font-semibold font-mono opacity-[.7] mt-1 mb-5">
                            Donde te avisaremos cuando la carga se realice con
                            éxito.
                          </p>

                          <Button
                            onClick={() => refInput.current.click()}
                            variant="outline"
                            className={`border border-black ${
                              formTransaction.url && "opacity-[80%]"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              width={20}
                              className="mr-2"
                            >
                              <g
                                stroke="#000"
                                strokeLinecap="round"
                                strokeWidth="1.5"
                              >
                                <path d="M17 9.002c2.175.012 3.353.109 4.121.877C22 10.758 22 12.172 22 15v1c0 2.829 0 4.243-.879 5.122C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.878C2 20.242 2 18.829 2 16v-1c0-2.828 0-4.242.879-5.121.768-.768 1.946-.865 4.121-.877"></path>
                                <path
                                  strokeLinejoin="round"
                                  d="M12 15V2m0 0l3 3.5M12 2L9 5.5"
                                ></path>
                              </g>
                            </svg>
                            {formTransaction.url
                              ? "Subir otro comprobante"
                              : " Sube tu comprobante aquí"}
                          </Button>
                        </div>
                        <div className="flex justify-start">
                          <Button
                            disabled={
                              !formTransaction.user ||
                              !formTransaction.url ||
                              !formTransaction.phone
                            }
                            onClick={handleSendTransaction}
                            className="tracking-tighter font-geist"
                          >
                            {" "}
                            <svg
                              width={25}
                              className="mr-1"
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
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </DialogContent>
              </Dialog>
            </div> */}
            <div className="mt-5">
              <Button
                variant="outline"
                className="border border-black"
                onClick={() => push("https://walink.co/b8029b")}
              >
                ¡Jugar ahora!
              </Button>
            </div>
          </div>
          {/* <div>
            <img src="/thumb.png" className="mt-10" />
          </div> */}
        </section>
        {/* <section className="pb-28">
          <form onSubmit={handleSubmitInput}>
  
            <div className="flex items-center rounded-xl p-4  bg-white">
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g>
                  <path
                    fill="#1C274C"
                    d="M13.087 21.388l.645.382-.645-.382zm.542-.916l-.646-.382.646.382zm-3.258 0l-.645.382.645-.382zm.542.916l.646-.382-.646.382zM1.25 10.5a.75.75 0 001.5 0h-1.5zm1.824 5.126a.75.75 0 00-1.386.574l1.386-.574zm4.716 3.365l-.013.75.013-.75zm-2.703-.372l-.287.693.287-.693zm16.532-2.706l.693.287-.693-.287zm-5.409 3.078l-.012-.75.012.75zm2.703-.372l.287.693-.287-.693zm.7-15.882l-.392.64.392-.64zm1.65 1.65l.64-.391-.64.392zM4.388 2.738l-.392-.64.392.64zm-1.651 1.65l-.64-.391.64.392zM9.403 19.21l.377-.649-.377.649zm4.33 2.56l.541-.916-1.29-.764-.543.916 1.291.764zm-4.007-.916l.542.916 1.29-.764-.541-.916-1.291.764zm2.715.152a.52.52 0 01-.882 0l-1.291.764c.773 1.307 2.69 1.307 3.464 0l-1.29-.764zM10.5 2.75h3v-1.5h-3v1.5zm10.75 7.75v1h1.5v-1h-1.5zM7.803 18.242c-1.256-.022-1.914-.102-2.43-.316L4.8 19.313c.805.334 1.721.408 2.977.43l.026-1.5zM1.688 16.2A5.75 5.75 0 004.8 19.312l.574-1.386a4.25 4.25 0 01-2.3-2.3l-1.386.574zm19.562-4.7c0 1.175 0 2.019-.046 2.685-.045.659-.131 1.089-.277 1.441l1.385.574c.235-.566.338-1.178.389-1.913.05-.729.049-1.632.049-2.787h-1.5zm-5.027 8.241c1.256-.021 2.172-.095 2.977-.429l-.574-1.386c-.515.214-1.173.294-2.428.316l.025 1.5zm4.704-4.115a4.25 4.25 0 01-2.3 2.3l.573 1.386a5.75 5.75 0 003.112-3.112l-1.386-.574zM13.5 2.75c1.651 0 2.837 0 3.762.089.914.087 1.495.253 1.959.537l.783-1.279c-.739-.452-1.577-.654-2.6-.752-1.012-.096-2.282-.095-3.904-.095v1.5zm9.25 7.75c0-1.622 0-2.891-.096-3.904-.097-1.023-.299-1.862-.751-2.6l-1.28.783c.285.464.451 1.045.538 1.96.088.924.089 2.11.089 3.761h1.5zm-3.53-7.124a4.25 4.25 0 011.404 1.403l1.279-.783a5.75 5.75 0 00-1.899-1.899l-.783 1.28zM10.5 1.25c-1.622 0-2.891 0-3.904.095-1.023.098-1.862.3-2.6.752l.783 1.28c.464-.285 1.045-.451 1.96-.538.924-.088 2.11-.089 3.761-.089v-1.5zM2.75 10.5c0-1.651 0-2.837.089-3.762.087-.914.253-1.495.537-1.959l-1.279-.783c-.452.738-.654 1.577-.752 2.6C1.25 7.61 1.25 8.878 1.25 10.5h1.5zm1.246-8.403a5.75 5.75 0 00-1.899 1.899l1.28.783a4.25 4.25 0 011.402-1.403l-.783-1.279zm7.02 17.993c-.202-.343-.38-.646-.554-.884a2.229 2.229 0 00-.682-.645l-.754 1.297c.047.028.112.078.224.232.121.166.258.396.476.764l1.29-.764zm-3.24-.349c.44.008.718.014.93.037.198.022.275.054.32.08l.754-1.297c-.293-.17-.598-.24-.909-.274-.298-.033-.657-.038-1.069-.045l-.025 1.5zm6.498 1.113c.218-.367.355-.598.476-.764.112-.154.177-.204.224-.232l-.754-1.297c-.29.17-.5.395-.682.645-.173.238-.352.54-.555.884l1.291.764zm1.924-2.612c-.412.007-.771.012-1.069.045-.311.035-.616.104-.909.274l.754 1.297c.045-.026.122-.058.32-.08.212-.023.49-.03.93-.037l-.026-1.5z"
                  ></path>
                  <path
                    stroke="#1C274C"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 11h.009m3.982 0H12m3.991 0H16"
                  ></path>
                </g>
              </svg>
              <Input
                value={input}
                placeholder="¿Dudas? Chateanos"
                className="h-[2cap] w-[50vw] border-none"
                onChange={(e) => setInput(e.target.value)}
              />
     
              <Button size="icon">
                {" "}
                <svg
                  width={20}
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
              </Button>
            </div>
          </form>
          {response && (
        <div>
          <h2>Respuesta del Asistente:</h2>
          <p>{response}</p>
        </div>
      )}
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 w-10/12 ">
          <div className="flex justify-center items-start">
            <video
              src="https://res.cloudinary.com/digfhdzck/video/upload/v1716764348/8c4bd364-832a-497a-8d67-db13ecdd3622_zs27wr.mov"
              className="rounded-xl h-[65vh] shadowVideo"
              autoPlay
              muted
              playsInline
              loop
            />
          </div>
          <div className="flex justify-center flex-col my-10 md:mt-0 items-center ">
            <Card className="shadowVideo">
              <CardContent>
                <p className="text-black font-bold text-3xl tracking-tighter font-geist  pt-10 text-center ">
                  Registrate y comenzá a jugar
                </p>
                <form className="" onSubmit={handleUserSubmit}>
                  <Input
                    className="my-2"
                    name="user"
                    id="user"
                    placeholder="Nombre de usuario"
                    value={form.user}
                    onChange={handleUserChange}
                  />
                  <Input
                    className="my-2"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleUserChange}
                  />
                  <Input
                    className="my-2"
                    name="phone"
                    placeholder="Celular"
                    value={form.celular}
                    onChange={handleUserChange}
                  />
                  <p className="font-bold tracking-tighter text-xs opacity-50">
                    Aquí te avisaremos cuando tu usuario este listo para jugar
                  </p>
                  <Button
                    className="mt-2"
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
                <div className=" h-[.1vh] bg-black w-full  mt-5 rounded-full" />
                <p className="text-md tracking-tighter py-5">
                  ¿Dónde jugar?
                  <br />{" "}
                  <span className="font-bold">
                    {" "}
                    <a href="https://casinozeus.io/">Casino Zeus</a>
                  </span>
                </p>

                <span className=" mb-5 tracking-tighter font-geist">
                  {" "}
                  Si ya tenés usuario puedes cargar tus fichas{" "}
                  <a
                    className=" font-bold"
                    onClick={() => refOpenTransaction.current.click()}
                  >
                    aquí
                  </a>
                </span>
              </CardContent>
            </Card>
          </div>
        </section> */}
      </div>
      {/* <section
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
                  <CardTitle className="text-center">Registrarse</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-center mx-2">
                  <Button onClick={() => push("https://walink.co/aaa75b")}>
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
                  <CardTitle className="text-center">Recargar</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-center mx-2">
                  <Button onClick={() => push("https://walink.co/aaa75b")}>
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
                  <CardTitle className="text-center">Ganá</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-center mx-2">
                  <Button onClick={() => push("https://walink.co/aaa75b")}>
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
      </section> */}
    </main>
  );
}
