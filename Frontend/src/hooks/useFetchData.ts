import { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { TypeOfConsultServices } from '../services/TypeOfConsultServices';
import { googleCustomerServices, googleDateSettlementServices } from '../services/GoogleServices';

const useFetchData = (widgetId: string) => {
  const { state } = useDashboard();
  const [dateSettlement, setDateSettlement] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        const search: string = TypeOfConsultServices(state.widgets, widgetId);

        switch (search) {
          case 'fechaRadicacion':
            let dateSettlement = googleDateSettlementServices();
            dateSettlement.then((response: any) => {
              setDateSettlement(response);
            });
            break;
          case 'clientes':
            let Customers = googleCustomerServices();
            Customers.then((response: any) => {
              console.warn(response);
            })
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

export default useFetchData;