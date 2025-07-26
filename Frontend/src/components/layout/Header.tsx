import React, { useState } from 'react';
import AddWidgetButton from '../dashboard/AddWidgetButton';


const Header: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user] = useState({
    name: 'Salud Ocupacional de los Andes',
    role: 'Administrador',
    avatar: 'https://ui-avatars.com/api/?name=Salud+Ocupacional+de+los+Andes&background=0D8ABC&color=fff'
  })

  // Toggle del menú de perfil
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  // Toggle modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo y título */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-white hidden md:block">
              Dashboard<span className="text-blue-500">Pro</span>
            </h1>
          </div>

          {/* Botón para añadir nuevo widget */}
          <AddWidgetButton />
        </div>

        {/* Controles del lado derecho */}
        <div className="flex items-center space-x-5">
          {/* Botón de modo oscuro */}
          <button
            onClick={toggleDarkMode}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-label="Alternar modo oscuro"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Perfil de usuario */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-blue-400"
              />
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
            </button>

          </div>
        </div>
      </div>

      {/* Barra de estado */}
      <div className="bg-blue-50 dark:bg-gray-900 px-6 py-2 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-gray-700 dark:text-gray-300">Estado del sistema: </span>
            <span className="font-medium ml-1 text-green-600 dark:text-green-400">Operativo</span>
          </div>
          <div className="hidden md:block">
            <span className="text-gray-700 dark:text-gray-300">Última actualización: </span>
            <span className="font-medium text-blue-600 dark:text-blue-400">{new Intl.DateTimeFormat('es-CO', {
              dateStyle: 'long',
              timeStyle: 'short',
              timeZone: 'America/Bogota'
            }).format(new Date())}</span>
          </div>
        </div>
        <div>
          <span className="text-gray-700 dark:text-gray-300">Versión: </span>
          <span className="font-medium text-blue-600 dark:text-blue-400">v3.8.2</span>
        </div>
      </div>
    </header>
  );
};

export default Header;