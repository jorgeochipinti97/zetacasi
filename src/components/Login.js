// components/Login.js
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "zetacasinoadmin123") {
      localStorage.setItem("auth", "true");
      onLogin();
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Input
        type="password"
        placeholder="Ingrese la contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border-2 w-6/12"
      />
      <Button onClick={handleLogin} className='bg-black text-white'>
        Iniciar sesión
      </Button>
    </div>
  );
};

export default Login;
