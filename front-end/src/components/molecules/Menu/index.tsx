import React, { useState } from 'react';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center h-16 bg-white px-6">
      <a href="/user/home">
        <h1 className="text-xl font-bold text-gray-500">STOCKZ</h1>
      </a>
      <ul className="flex gap-10">
        <li className="relative">
          <a href="#" className="text-lg font-medium text-gray-500 hover:text-yellow-400">
            MENSAGENS
          </a>
        </li>
        <li className="relative">
          <a href="/photo/all" className="text-lg font-medium text-gray-500 hover:text-yellow-400">
            GALERIA
          </a>
        </li>
        <li className="relative">
          <a href="/album/all" className="text-lg font-medium text-gray-500 hover:text-yellow-400">
            MEUS ÁLBUNS
          </a>
        </li>
      </ul>
      <div
        className="relative"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <img src="/images/user.png" alt="login" width={50} height={60} />
        {isMenuOpen && (
          <ul className="absolute top-12 right-0 bg-gray p-6 shadow items-center justify-center">
            <li className="mb-2">
              <a href="/user/profile" className="text-gray-600 hover:text-yellow-400">
                Meu perfil
              </a>
            </li>
            <li>
              <a href="/user/logout" className="text-gray-600 hover:text-yellow-400">
                Sair
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}