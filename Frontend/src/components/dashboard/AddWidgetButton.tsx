// components/dashboard/AddWidgetButton.tsx
import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { WidgetType, KPIWidgetConfig } from '../../types/dashboardTypes';
import { v4 as uuidv4 } from 'uuid';
import { NameServices } from '../../services/TypeOfConsultServices';

const AddWidgetButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWidgetType, setSelectedWidgetType] = useState<WidgetType | null>(null);
  const [kpiConfig, setKpiConfig] = useState<Partial<KPIWidgetConfig>>({
    title: 'Nuevo KPI',
    format: 'number',
    showTrend: true,
    showTarget: false,
    targetValue: 0
  });
  const [selected, setSelected] = useState<string | null>(null);

  const { dispatch } = useDashboard();

  const handleAddWidget = () => {
    if (!selectedWidgetType) return;

    const newWidget: KPIWidgetConfig = {
      id: `widget-${uuidv4()}`,
      type: 'kpi',
      dataKey: 'default', // Se puede personalizar
      position: { x: 0, y: Infinity, w: 3, h: 3 }, // Tamaño predeterminado
      ...kpiConfig,
      subtitle: selected,
    } as KPIWidgetConfig;

    dispatch({ type: 'ADD_WIDGET', payload: newWidget });
    setIsModalOpen(false);
    setSelectedWidgetType(null);
    resetForm();
  };

  const handlerCharts = () => {
    if (selected === null || selected === '') return;

    const name = NameServices(selected);

    dispatch({
      type: 'ADD_WIDGET',
      payload: {
        id: `widget-${uuidv4()}`,
        type: 'chart',
        title: name || 'Gráfico',
        dataKey: 'sales',
        position: { x: 0, y: Infinity, w: 4, h: 3 },
        subtitle: selected
      },
    });
  }

  const resetForm = () => {
    setKpiConfig({
      title: 'Nuevo KPI',
      format: 'number',
      showTrend: true,
      showTarget: true,
      targetValue: 0
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className="hidden md:flex items-center px-3 py-1.5 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-300 rounded-lg text-sm font-medium transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Nuevo Widget
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Agregar Nuevo Widget</h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Selección de tipo de widget */}
              {!selectedWidgetType ? (
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-700 mb-3">Selecciona el tipo de widget</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(['kpi', 'chart'] as WidgetType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedWidgetType(type)}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center"
                      >
                        <div className="text-2xl mb-2">
                          {type === 'kpi' && '🔢'}
                          {type === 'chart' && '📊'}
                        </div>
                        <span className="font-medium capitalize">
                          {type === 'kpi' ? 'Indicador KPI' : 'Gráfico'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setSelectedWidgetType(null)}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Volver a selección
                  </button>

                  {/* Formulario de configuración para KPI */}
                  {selectedWidgetType === 'kpi' && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-800">Configuración del KPI</h4>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título del widget</label>
                        <input
                          type="text"
                          value={kpiConfig.title || ''}
                          onChange={(e) => setKpiConfig({ ...kpiConfig, title: e.target.value })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Ej: Ventas Totales"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Formato de visualización</label>
                        <select
                          value={kpiConfig.format || 'number'}
                          onChange={(e) => setKpiConfig({
                            ...kpiConfig,
                            format: e.target.value as 'number' | 'percent'
                          })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="number">Número</option>
                          <option value="percent">Porcentaje</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="showTrend"
                          checked={kpiConfig.showTrend || false}
                          onChange={(e) => setKpiConfig({ ...kpiConfig, showTrend: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="showTrend" className="ml-2 block text-sm text-gray-700">
                          Mostrar tendencia vs período anterior
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="showTarget"
                          checked={kpiConfig.showTarget || false}
                          onChange={(e) => setKpiConfig({
                            ...kpiConfig,
                            showTarget: e.target.checked
                          })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="showTarget" className="ml-2 block text-sm text-gray-700">
                          Mostrar progreso hacia objetivo
                        </label>
                      </div>

                      {kpiConfig.showTarget && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Valor objetivo</label>
                          <input
                            type="number"
                            value={kpiConfig.targetValue || 0}
                            onChange={(e) => setKpiConfig({
                              ...kpiConfig,
                              targetValue: Number(e.target.value)
                            })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            min="0"
                          />
                        </div>
                      )}

                      <div className="pt-4">
                        <button
                          onClick={handleAddWidget}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow"
                        >
                          Agregar Widget
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedWidgetType === 'chart' && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-800">Configuración del Gráfica</h4>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de visualización</label>
                        <select
                          value={selected || ''}
                          onChange={(e) => {
                            setSelected(e.target.value);
                          }}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value=''>Seleccione ...</option>
                          <option value="fechaRadicacion">Fecha de Radicación</option>
                          <option value="clientes">Clientes</option>
                          <option value="sede">Sede</option>
                          <option value="tipoNovedad">Tipo de Novedad</option>
                          <option value="sedeResponsable">Sede Responsable</option>
                          <option value="procesoResponsable">Proceso Responsable</option>
                          <option value="tratamientoNovedad">Tratamiento de la Novedad</option>
                          <option value="tiempoRespuesta">Tiempo de Respuesta</option>
                        </select>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => {
                            handlerCharts();
                            setIsModalOpen(false);
                            setSelectedWidgetType(null);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow"
                        >
                          Agregar Widget
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Aquí puedes agregar formularios para otros tipos de widgets */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWidgetButton;