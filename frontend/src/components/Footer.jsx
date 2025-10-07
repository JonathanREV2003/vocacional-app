import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";

export default function Footer() {
  return (
    <footer id="contactos" className="bg-black text-gray-300 py-6 mt-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Nombre del proyecto */}
        <div className="text-lg font-semibold text-white">
          Vocacional App
        </div>

        {/* Información de contacto */}
        <div className="mt-4 md:mt-0 text-sm text-gray-400">
          <p>
            <MdOutlineMarkEmailUnread className="inline-block mr-1" />
            contacto@vocacionalapp.com
          </p>
          <p>
            <TfiHeadphoneAlt className="inline-block mr-1" />
            +502 1234 5678
          </p>
        </div>

        {/* Derechos reservados */}
        <div className="mt-4 md:mt-0 text-sm text-gray-500">
          © {new Date().getFullYear()} Vocacional App. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
