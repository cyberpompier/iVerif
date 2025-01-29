import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

interface Vehicle {
  id: number;
  nom: string;
  immatriculation: string;
  type: string;
  caserne: string;
  photo: string;
  lien?: string;
}

const VehicleCard: React.FC<{ vehicle: Vehicle; onEdit: (vehicle: Vehicle) => void }> = ({ vehicle, onEdit }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="border p-2 rounded shadow-sm flex items-center space-x-4 bg-white">
      <img src={vehicle.photo} alt={vehicle.nom} className="w-16 h-16 object-cover rounded cursor-pointer" onClick={toggleZoom} />
      <div>
        <h2 className="text-lg font-semibold flex items-center">
          {vehicle.nom}
          <FaEdit onClick={() => onEdit(vehicle)} className="ml-2 text-blue-500 cursor-pointer" />
        </h2>
        {vehicle.lien && (
          <p className="text-sm text-gray-600">
            Lien: <a href={vehicle.lien} target="_blank" rel="noopener noreferrer" className="text-blue-500">Voir document</a>
          </p>
        )}
      </div>
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={toggleZoom}>
          <img src={vehicle.photo} alt={vehicle.nom} className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
};

const Vehicules: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Vehicle>({ id: 0, nom: '', immatriculation: '', type: '', caserne: '', photo: '' });

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const addOrUpdateVehicle = () => {
    if (newVehicle.nom && newVehicle.immatriculation && newVehicle.type && newVehicle.caserne && newVehicle.photo) {
      if (newVehicle.id) {
        setVehicles(vehicles.map(v => (v.id === newVehicle.id ? newVehicle : v)));
      } else {
        setVehicles([...vehicles, { ...newVehicle, id: vehicles.length + 1 }]);
      }
      setNewVehicle({ id: 0, nom: '', immatriculation: '', type: '', caserne: '', photo: '' });
      setIsFormOpen(false);
    }
  };

  const editVehicle = (vehicle: Vehicle) => {
    setNewVehicle(vehicle);
    setIsFormOpen(true);
  };

  const cancelForm = () => {
    setNewVehicle({ id: 0, nom: '', immatriculation: '', type: '', caserne: '', photo: '' });
    setIsFormOpen(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <button onClick={toggleForm} className="bg-blue-500 text-white p-2 rounded mb-4">
        +
      </button>
      {isFormOpen && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              name="nom"
              placeholder="Nom du véhicule"
              value={newVehicle.nom}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="immatriculation"
              placeholder="Immatriculation"
              value={newVehicle.immatriculation}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={newVehicle.type}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="caserne"
              placeholder="Caserne"
              value={newVehicle.caserne}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="photo"
              placeholder="URL de la photo"
              value={newVehicle.photo}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="lien"
              placeholder="Lien (document ou media)"
              value={newVehicle.lien || ''}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
          </div>
          <div className="mt-2">
            <button onClick={addOrUpdateVehicle} className="bg-green-500 text-white p-2 rounded mr-2">
              {newVehicle.id ? 'Mettre à jour' : 'Ajouter'}
            </button>
            <button onClick={cancelForm} className="bg-red-500 text-white p-2 rounded">
              Annuler
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} onEdit={editVehicle} />
        ))}
      </div>
    </div>
  );
};

export default Vehicules;
