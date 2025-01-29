import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaCar, FaTools, FaClipboardList, FaCog } from 'react-icons/fa';
import Vehicules from './Vehicules';
import Materiels from './Materiels';

const Accueil = () => <h1 className="text-center text-2xl mt-8">Bienvenue sur la page d'accueil</h1>;
const Inventaire = () => <h1 className="text-center text-2xl mt-8">Page de l'INVENTAIRE</h1>;
const Parametre = () => <h1 className="text-center text-2xl mt-8">Page des PARAMÈTRES</h1>;

const App: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <header className="bg-blue-500 text-white p-4">
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" onClick={closeDropdown}><FaHome className="inline mr-1" />ACCUEIL</Link></li>
              <li className="relative">
                <button onClick={toggleDropdown} className="focus:outline-none">
                  MENU
                </button>
                {isDropdownOpen && (
                  <ul className="absolute bg-white text-black mt-2 p-2 shadow-lg">
                    <li><Link to="/vehicules" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}><FaCar className="inline mr-1" />VÉHICULES</Link></li>
                    <li><Link to="/materiels" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}><FaTools className="inline mr-1" />MATERIELS</Link></li>
                    <li><Link to="/inventaire" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}><FaClipboardList className="inline mr-1" />INVENTAIRE</Link></li>
                    <li><Link to="/parametre" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}><FaCog className="inline mr-1" />PARAMÈTRES</Link></li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/vehicules" element={<Vehicules />} />
            <Route path="/materiels" element={<Materiels />} />
            <Route path="/inventaire" element={<Inventaire />} />
            <Route path="/parametre" element={<Parametre />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2023 Votre Entreprise</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
