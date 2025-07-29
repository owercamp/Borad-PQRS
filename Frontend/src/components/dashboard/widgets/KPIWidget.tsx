import React from 'react';
import { WidgetConfig } from '../../../types/dashboardTypes';
import useFetchDataKpi from '../../../hooks/useFetchDataKpi';

// Tipos específicos para KPI
interface KPIWidgetConfig extends WidgetConfig {
  format?: 'number' | 'currency' | 'percent';
  currency?: string;
  targetValue?: number;
  showTrend?: boolean;
  showTarget?: boolean;
  icon?: string;
  subtitle?: string;
  title: string;
  id: string | undefined | any;
}

interface KPIWidgetProps {
  config: KPIWidgetConfig;
}

const KPIWidget: React.FC<KPIWidgetProps> = ({ config }) => {
  let { data, loading } = useFetchDataKpi(config.id);

  // Obtener valor actual y anterior para calcular tendencia
  const currentValue = data?.currentValue || 0;
  const previousValue = data?.previousValue || 0;

  // Calcular variación porcentual
  const variation = previousValue !== 0
    ? ((currentValue - previousValue) / Math.abs(previousValue)) * 100
    : 0;

  // Formatear valores según configuración
  const formatValue = (value: number) => {
    switch (config.format) {
      case 'percent':
        const percentValue = ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
        return `${percentValue.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('es-ES').format(value);
    }
  };

  // Determinar color según tendencia
  const getTrendColor = () => {
    if (variation > 0) return 'text-green-600 bg-green-100';
    if (variation < 0) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  // Calcular progreso hacia objetivo
  const calculateProgress = () => {
    if (!config.targetValue || config.targetValue === 0) return 0;
    return Math.min(100, Math.max(0, (currentValue / config.targetValue) * 100));
  };

  return (
    <div className="flex flex-col h-full p-4">

      {/* Valor principal */}
      <div className="flex-grow flex items-center justify-center">
        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {formatValue(currentValue)}
            </div>

            {config.showTrend && previousValue !== 0 && (
              <div className={`flex items-center justify-center text-xs font-medium py-1 px-2 rounded-full ${getTrendColor()}`}>
                <span>
                  {variation > 0 ? '↑' : '↓'} {Math.abs(variation).toFixed(1)}%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progreso hacia objetivo */}
      {config.showTarget && config.targetValue !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Objetivo: {config.targetValue}</span>
            <span className="font-medium">{calculateProgress().toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${calculateProgress() >= 100
                ? 'bg-green-500'
                : calculateProgress() > 75
                  ? 'bg-blue-500'
                  : 'bg-yellow-500'
                }`}
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Pie de página */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center -mt-7">
          Última actualización: {new Intl.DateTimeFormat('es-ES', { month: "2-digit", day: "2-digit", year: "numeric" }).format(new Date()) || 'Hoy'}
        </p>
      </div>
    </div>
  );
};

export default KPIWidget;