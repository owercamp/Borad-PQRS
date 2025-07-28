import { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { googleServices } from '../services/GoogleServices';

const useFetchData = (widgetId: string) => {
  const { state } = useDashboard();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        let info = googleServices();
        info.then((response: any) => {
          setData(response);
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

export default useFetchData;