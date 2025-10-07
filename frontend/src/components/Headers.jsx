import { Link } from 'react-router-dom';
import "boxicons/css/boxicons.min.css";

const Headers = () => {
    const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById("mobileMenu");
        if (mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.remove("hidden");
        } else {
            mobileMenu.classList.add("hidden");
        }
    }
  return (
 <header className= "flex justify-between items-center py-4 px-4 lg:px-20">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-light m-0">
        Vocacional App
    </h1>

    {/* Navegación paginas */}
    <nav className="hidden md:flex items-center gap-12">
    <a href="#" className="text-base tracking-wider transition-colors
    hover:text-gray-300 z-50">
        Sobre nosotros
    </a>

    <a href="#" className="text-base tracking-wider transition-colors
    hover:text-gray-300 z-50">
        ¿Ayuda de IA?
    </a>
    <a href="#" className="text-base tracking-wider transition-colors
    hover:text-gray-300 z-50">
        Contactos
    </a>
    </nav>

      <Link
        to="/login"
        className="md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full border-none font-medium transition-all duration-500 hover:bg-[#e99b63] hover:text-white z-50"
      >
        Registrarse
      </Link>

    {/* Menu icono para dispositivos moviles */}
    <button onClick={toggleMobileMenu} className="md:hidden text-3xl p-2 z-50">
    <box-icon name='menu'></box-icon>
    </button>
    {/* Menu desplegable para dispositivos moviles */}
    <div id="mobileMenu" className="hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black
    bg-opacity-70 backdrop-blur-md">
        <nav className="flex flex-col items-center gap-6">
            <a href="#" className="text-base tracking-wider transition-colors
                hover:text-gray-300 z-50">
                Sobre nosotros
            </a>

            <a href="#" className="text-base tracking-wider transition-colors
                hover:text-gray-300 z-50">
                Documentación
            </a>
            <a href="#" className="text-base tracking-wider transition-colors
                hover:text-gray-300 z-50">
                Recursos
            </a>
        </nav>
    </div>


 </header>
  );
};

export default Headers;
