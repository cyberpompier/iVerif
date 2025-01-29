import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

interface Material {
  id: number;
  nom: string;
  type: string;
  quantite: number;
  affectation: string;
  emplacement: string;
  photo: string;
  lien?: string;
}

const MaterialCard: React.FC<{ material: Material; onEdit: (material: Material) => void }> = ({ material, onEdit }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="border p-2 rounded shadow-sm flex items-center space-x-4 bg-gray-100">
      <img src={material.photo} alt={material.nom} className="w-16 h-16 object-cover rounded cursor-pointer" onClick={toggleZoom} />
      <div>
        <h2 className="text-lg font-semibold flex items-center">
          {material.nom}
          <FaEdit onClick={() => onEdit(material)} className="ml-2 text-blue-500 cursor-pointer" />
        </h2>
        <p className="text-sm text-gray-600">Affectation: {material.affectation}</p>
        <p className="text-sm text-gray-600">Emplacement: {material.emplacement}</p>
        {material.lien && (
          <p className="text-sm text-gray-600">
            Lien: <a href={material.lien} target="_blank" rel="noopener noreferrer" className="text-blue-500">Voir document</a>
          </p>
        )}
      </div>
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={toggleZoom}>
          <img src={material.photo} alt={material.nom} className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
};

const Materiels: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState<Material>({ id: 0, nom: '', type: '', quantite: 0, affectation: '', emplacement: '', photo: '' });

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };

  const addOrUpdateMaterial = () => {
    if (newMaterial.nom && newMaterial.type && newMaterial.quantite > 0 && newMaterial.affectation && newMaterial.emplacement && newMaterial.photo) {
      if (newMaterial.id) {
        setMaterials(materials.map(m => (m.id === newMaterial.id ? newMaterial : m)));
      } else {
        setMaterials([...materials, { ...newMaterial, id: materials.length + 1 }]);
      }
      setNewMaterial({ id: 0, nom: '', type: '', quantite: 0, affectation: '', emplacement: '', photo: '' });
      setIsFormOpen(false);
    }
  };

  const editMaterial = (material: Material) => {
    setNewMaterial(material);
    setIsFormOpen(true);
  };

  const cancelForm = () => {
    setNewMaterial({ id: 0, nom: '', type: '', quantite: 0, affectation: '', emplacement: '', photo: '' });
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
              placeholder="Nom du matériel"
              value={newMaterial.nom}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={newMaterial.type}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="number"
              name="quantite"
              placeholder="Quantité"
              value={newMaterial.quantite}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="affectation"
              placeholder="Affectation"
              value={newMaterial.affectation}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="emplacement"
              placeholder="Emplacement"
              value={newMaterial.emplacement}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="photo"
              placeholder="URL de la photo"
              value={newMaterial.photo}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              name="lien"
              placeholder="Lien (document ou media)"
              value={newMaterial.lien || ''}
              onChange={handleInputChange}
              className="border p-2 flex-grow"
            />
          </div>
          <div className="mt-2">
            <button onClick={addOrUpdateMaterial} className="bg-green-500 text-white p-2 rounded mr-2">
              {newMaterial.id ? 'Mettre à jour' : 'Ajouter'}
            </button>
            <button onClick={cancelForm} className="bg-red-500 text-white p-2 rounded">
              Annuler
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map(material => (
          <MaterialCard key={material.id} material={material} onEdit={editMaterial} />
        ))}
      </div>
    </div>
  );
};

export default Materiels;
