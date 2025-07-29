import { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { googleServices } from '../services/GoogleServices';

const useFetchDataKpi = (widgetId: string) => {
  const { state } = useDashboard();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        let info = googleServices();
        info.then((response: any) => {
          const current_month = new Date().getMonth();
          const current_year = new Date().getFullYear();
          const data_for_graphKPI = {
            currentValue: response[current_month][current_year],
            previousValue: response[current_month - 1][current_year]
          }
          setData(data_for_graphKPI);
        })
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => { };
  }, [widgetId, state.filters, state.dateRange]);

  return { data, loading };
};

export default useFetchDataKpi;