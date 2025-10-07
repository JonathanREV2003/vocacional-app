import DefaultFont from '../components/defaultFont';
import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username, 'Contraseña:', password);
    // Aquí puedes manejar el login
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Fondo */}
      <DefaultFont />

      {/* Contenedor transparente */}
      <div className="z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[320px]">
        <h2 className="text-3xl text-white font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuario */}
          <div className="relative">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 p-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <FaUser className="absolute left-3 top-2.5 text-white/70" />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <FaLock className="absolute left-3 top-2.5 text-white/70" />
          </div>

          {/* Recordar y olvidé contraseña */}
          <div className="flex justify-between text-sm text-white/80">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-white" /> Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#a7a7a7] hover:bg-[#e99b63] text-black
             hover:text-white font-medium py-2 px-8 rounded-full border-none transition-all duration-500"
          >
            Login
          </button>
        </form>

        {/* Registro */}
        <p className="text-center text-white/80 text-sm mt-4">
          ¿No tienes una cuenta? {' '}
          <a href="#" className="font-semibold text-white hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}