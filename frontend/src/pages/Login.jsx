import DefaultFont from '../components/defaultFont';
import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      console.log('Registrando:', username, password, confirmPassword);
      // lógica de registro
    } else {
      console.log('Login:', username, password);
      // lógica de login
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Fondo */}
      <DefaultFont />

      {/* Contenedor transparente */}
      <div className="z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[320px] transition-all duration-500">
        <h2 className="text-3xl text-white font-bold text-center mb-6">
          {isRegister ? 'Registro' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuario */}
          <div className="relative">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 p-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
              required
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
              required
            />
            <FaLock className="absolute left-3 top-2.5 text-white/70" />
          </div>

          {/* Confirmar contraseña solo si es registro */}
          {isRegister && (
            <div className="relative">
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 p-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
              <FaLock className="absolute left-3 top-2.5 text-white/70" />
            </div>
          )}

          {/* Opciones solo en login */}
          {!isRegister && (
            <div className="flex justify-between text-sm text-white/80">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-white" /> Recuérdame.
              </label>

              <a href="#" className="hover:underline">
                 ¿Olvidaste tu contraseña?
              </a>
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#a7a7a7] hover:bg-[#e99b63] text-black hover:text-white font-medium py-2 px-8 rounded-full border-none transition-all duration-500"
          >
            {isRegister ? 'Registrarse' : 'Login'}
          </button>
        </form>

        {/* Texto para cambiar de formulario */}
        <p className="text-center text-white/80 text-sm mt-4">
          {isRegister ? (
            <>
              ¿Ya tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="font-semibold text-white hover:underline"
              >
                Inicia sesión
              </button>
            </>
          ) : (
            <>
              ¿No tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="font-semibold text-white hover:underline"
              >
                Regístrate
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}