import React from 'react';
import { useDashboard } from '../../../context/DashboardContext';

const FilterPanel: React.FC = () => {
  const { dispatch } = useDashboard();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { [e.target.name]: e.target.value }
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <select
          name="category"
          onChange={handleFilterChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option>Todas</option>
          <option>Electrónicos</option>
          <option>Ropa</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Región</label>
        <select
          name="region"
          onChange={handleFilterChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option>Global</option>
          <option>América</option>
          <option>Europa</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Búsqueda</label>
        <input
          type="text"
          name="search"
          onChange={(e: any) => handleFilterChange(e)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Filtrar datos..."
        />
      </div>
    </div>
  );
};

export default FilterPanel;