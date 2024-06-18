// components/Login.js
import { useState } from "react";

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
      <input
        type="password"
        placeholder="Ingrese la contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border-2"
      />
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white">
        Iniciar sesión
      </button>
    </div>
  );
};

export default Login;
