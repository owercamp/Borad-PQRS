import { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const useFetchData = (widgetId: string) => {
  const { state } = useDashboard();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await google.script.run.withSuccessHandler((response: any) => {
          let info = JSON.parse(response);

          info.map((element: any) => {

            try {
              let my_date: any = String(element[1]).split("T")[0].split("-");
              my_date = new Date(my_date[0], my_date[1], my_date[2]);
              if (String(element[1]).trim() && parseInt(String(element[1]).trim()) !== Infinity) {
                let registers_date = new Intl.DateTimeFormat('es-CO', {
                  month: 'short'
                }).format(my_date);
                console.log(registers_date);
              }
            } catch (error) {
            }
          })


          // data = [
          //   { name: 'Ene', '2024': 4000, '2025': 4500 },
          //   { name: 'Feb', '2024': 3000, '2025': 4500 },
          //   { name: 'Mar', '2024': 2000, '2025': 4500 },
          //   { name: 'Abr', '2024': 2780, '2025': 4500 },
          //   { name: 'May', '2024': 1890, '2025': 4500 },
          // ];
        }).getSheetData();






        // Simulación de API call con filtros
        // const response = await mockApiCall({
        //   widgetId,
        //   filters: state.filters,
        //   dateRange: state.dateRange
        // });

        setData("");
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Limpieza si el componente se desmonta
    return () => {
      // Cancelar petición si es necesario
    };
  }, [widgetId, state.filters, state.dateRange]);

  return { data, loading };
};

// Función de simulación
// const mockApiCall = async () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({ /* Datos estructurados según widget */ });
//     }, 500);
//   });
// };

export default useFetchData;