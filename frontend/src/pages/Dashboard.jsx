import { useState } from 'react';
import { FiMenu, FiX, FiSearch, FiHome, FiClipboard, FiBarChart2, FiSettings, FiLogOut, FiUser } from 'react-icons/fi';
import Spline from '@splinetool/react-spline';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  // Datos de ejemplo del usuario
  const userData = user || {
    name: 'Usuario Demo',
    email: 'usuario@ejemplo.com',
    avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=e99b63&color=fff&size=128'
  };

  // Opciones del menú lateral
  const menuItems = [
    { icon: FiHome, label: 'Inicio', path: '/' },
    { icon: FiClipboard, label: 'Hacer Test', path: '/test', highlight: true },
    { icon: FiBarChart2, label: 'Resultados', path: '/resultados' },
    { icon: FiSettings, label: 'Configuración', path: '/configuracion' },
  ];

  return (
    <div className="flex h-screen bg-black overflow-hidden grid-pattern">
      {/* Sidebar para desktop */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#0a0a0a] border-r border-gray-800 shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header del Sidebar con Robot */}
        <div className="flex items-center justify-between p-3 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            {/* Robot 3D pequeño completo con base */}
            <div className="w-32 h-32 flex-shrink-0 -ml-6 -my-5">
              <Spline
                className="w-full h-full scale-[0.35]"
                scene="https://prod.spline.design/KFfQUE95SIab8qAr/scene.splinecode"
              />
            </div>
            <h1 className="text-base font-bold bg-gradient-to-r from-[#e99b63] to-[#ff8c42] bg-clip-text text-transparent whitespace-nowrap">
              VocacionalApp
            </h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Barra de búsqueda lateral */}
        <div className="p-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#e99b63] focus:border-transparent outline-none text-white bg-black/50"
            />
          </div>
        </div>

        {/* Navegación */}
        <nav className="px-4 py-2 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                ${item.highlight 
                  ? 'bg-gradient-to-r from-[#e99b63] to-[#ff8c42] text-white hover:shadow-[0_0_15px_rgba(233,155,99,0.5)] shadow-md' 
                  : 'text-gray-300 hover:bg-gray-800/50'
                }
              `}
            >
              <item.icon size={20} className="mr-3" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button 
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
          >
            <FiLogOut size={20} className="mr-3" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Barra superior */}
        <header className="bg-[#0a0a0a] border-b border-gray-800 shadow-xl z-10">
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            {/* Botón menú móvil */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FiMenu size={24} />
            </button>

            {/* Logo móvil con Robot */}
            <div className="lg:hidden flex items-center space-x-1">
              <div className="w-10 h-10 -ml-1">
                <Spline
                  className="w-full h-full scale-150"
                  scene="https://prod.spline.design/KFfQUE95SIab8qAr/scene.splinecode"
                />
              </div>
              <h1 className="text-base font-bold bg-gradient-to-r from-[#e99b63] to-[#ff8c42] bg-clip-text text-transparent whitespace-nowrap">
                VocacionalApp
              </h1>
            </div>

            {/* Título para desktop */}
            <div className="hidden lg:block">
              <h2 className="text-2xl font-bold text-white">Dashboard</h2>
              <p className="text-sm text-gray-400">Bienvenido a tu panel de control</p>
            </div>

            {/* Perfil de usuario */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Nombre (solo desktop) */}
              <div className="hidden lg:block text-right">
                <p className="text-sm font-semibold text-white">{userData.name}</p>
                <p className="text-xs text-gray-400">{userData.email}</p>
              </div>
              
              {/* Avatar */}
              <div className="relative">
                <img 
                  src={userData.avatar} 
                  alt={userData.name}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full ring-2 ring-[#e99b63] ring-offset-2 ring-offset-black cursor-pointer hover:ring-[#ff8c42] transition-all"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Área de contenido principal */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-transparent">
          {/* Cards de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-xl p-6 hover:shadow-[0_0_15px_rgba(233,155,99,0.3)] transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Tests Completados</p>
                  <p className="text-3xl font-bold text-white mt-2">3</p>
                </div>
                <div className="bg-gradient-to-br from-[#e99b63] to-[#ff8c42] p-3 rounded-lg">
                  <FiClipboard size={24} className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-xl p-6 hover:shadow-[0_0_15px_rgba(233,155,99,0.3)] transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Áreas de Interés</p>
                  <p className="text-3xl font-bold text-white mt-2">5</p>
                </div>
                <div className="bg-gradient-to-br from-[#656565] to-[#e99b63] p-3 rounded-lg">
                  <FiBarChart2 size={24} className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-xl p-6 hover:shadow-[0_0_15px_rgba(233,155,99,0.3)] transition-all md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Compatibilidad</p>
                  <p className="text-3xl font-bold text-white mt-2">85%</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-400 p-3 rounded-lg">
                  <FiUser size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Sección principal - Hacer el test con Robot 3D */}
          <div className="bg-gradient-to-br from-[#656565] to-[#e99b63] rounded-xl shadow-[0_0_30px_rgba(233,155,99,0.3)] p-6 lg:p-8 mb-6 text-white relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="mb-4 lg:mb-0 lg:mr-8 text-center lg:text-left z-10 flex-1">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">¿Listo para descubrir tu vocación?</h3>
                <p className="text-white/90 mb-6">
                  Responde nuestro test vocacional y descubre las carreras que mejor se adaptan a ti
                </p>
                <button className="bg-white text-[#e99b63] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center">
                  <FiClipboard className="mr-2" />
                  Comenzar Test
                </button>
              </div>
              <div className="flex-shrink-0 z-10">
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                  <Spline
                    className="w-full h-full scale-110"
                    scene="https://prod.spline.design/KFfQUE95SIab8qAr/scene.splinecode"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resultados recientes */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Resultados Recientes</h3>
            <div className="space-y-4">
              {[
                { career: 'Ingeniería en Sistemas', compatibility: 92, date: '15 Oct 2025' },
                { career: 'Ciencias de la Computación', compatibility: 88, date: '12 Oct 2025' },
                { career: 'Desarrollo de Software', compatibility: 85, date: '10 Oct 2025' },
              ].map((result, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/50 border border-gray-800 rounded-lg hover:bg-gray-800/30 hover:border-[#e99b63]/30 transition-all">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-semibold text-white">{result.career}</p>
                    <p className="text-sm text-gray-400">{result.date}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full sm:w-32 bg-black rounded-full h-2 mr-3 border border-gray-700">
                      <div 
                        className="bg-gradient-to-r from-[#656565] to-[#e99b63] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.compatibility}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-[#e99b63] min-w-[3rem] text-right">
                      {result.compatibility}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 