import { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { googleDateSettlementServices } from '../services/GoogleServices';
import { TypeOfConsultServices } from '../services/TypeOfConsultServices';

const useFetchDataKpi = (widgetId: string) => {
  const { state } = useDashboard();
  const [dateSettlement, setDateSettlement] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        const search: string = TypeOfConsultServices(state.widgets, widgetId);
        switch (search) {
          case 'fechaRadicacion':
            let info = googleDateSettlementServices();
            info.then((response: any) => {
              const current_month = new Date().getMonth();
              const current_year = new Date().getFullYear();
              const data_for_graphKPI = {
                currentValue: response[current_month][current_year],
                previousValue: response[current_month - 1][current_year]
              }
              setDateSettlement(data_for_graphKPI);
            })
            break;
          case 'clientes':
            break;
          case 'sede':
            break;
          case 'tipoNovedad':
            break;
          case 'sedeResponsable':
            break;
          case 'procesoResponsable':
            break;
          case 'tratamientoNovedad':
            break;
          case 'tiempoRespuesta':
            break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => { };
  }, [widgetId, state.filters, state.dateRange]);

  return { dateSettlement, loading };
};

export default useFetchDataKpi;