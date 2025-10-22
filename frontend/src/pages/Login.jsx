import DefaultFont from '../components/defaultFont';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [nombre, setNombre] = useState(''); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      // Validar contraseñas
      if (password !== confirmPassword) {
        toast.error('Las contraseñas no coinciden', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre,
            email: username,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Registro exitoso', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          console.log('Usuario registrado:', data);
          setIsRegister(false); // Cambia a login
          setNombre('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
        } else {
          toast.error(data.message || 'Error al registrar usuario', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error('Error al registrar:', error);
        toast.error('Ocurrió un error al conectarse con el servidor', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Inicio de sesión exitoso', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log('Usuario autenticado:', data);

        // Guardar token según "Recuérdame"
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }

        // Redirigir al Dashboard
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Credenciales inválidas', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error('No se pudo conectar con el servidor', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
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
          {/* Campo Nombre solo en registro */}
          {isRegister && (
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 p-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
              <FaUser className="absolute left-3 top-2.5 text-white/70" />
            </div>
          )}

          {/* Usuario / Correo */}
          <div className="relative">
            <input
              type="email"
              placeholder="Correo electrónico"
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
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 p-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            <FaLock className="absolute left-3 top-2.5 text-white/70" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-white/70 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirmar contraseña solo si es registro */}
          {isRegister && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 p-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
              <FaLock className="absolute left-3 top-2.5 text-white/70" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-white/70 hover:text-white"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}

          {/* Opciones solo en login */}
          {!isRegister && (
            <div className="flex justify-between text-sm text-white/80">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 accent-white"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                /> Recuérdame.
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