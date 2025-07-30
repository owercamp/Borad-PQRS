import React, { useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useDashboard } from '../../context/DashboardContext';
import ChartWidget from './widgets/ChartWidget';
import { KPIWidgetConfig, WidgetConfig } from '../../types/dashboardTypes';
import KPIWidget from './widgets/KPIWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardGrid: React.FC = () => {
  const { state, dispatch } = useDashboard();

  const handleLayoutChange = useCallback((newLayout: any) => {
    const updatedWidgets = state.widgets.map(widget => {
      const newPos = newLayout.find((l: any) => l.i === widget.id);
      return newPos ? { ...widget, position: newPos } : widget;
    });
    dispatch({ type: 'UPDATE_LAYOUT', payload: updatedWidgets });
  }, [dispatch, state.widgets]);

  const renderWidget = (widget: WidgetConfig) => {
    switch (widget.subtitle) {
      case 'fechaRadicacion':
        switch (widget.type) {
          case 'chart':
            return <ChartWidget config={widget} />;
          case 'kpi':
            return <KPIWidget config={widget as KPIWidgetConfig} />;
          default:
            return null;
        }
        break;
    }
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{
        lg: state.widgets.map(widget => ({
          ...widget.position,
          i: widget.id
        }))
      }}
      breakpoints={{ lg: 1200, md: 996, sm: 768 }}
      cols={{ lg: 12, md: 10, sm: 6 }}
      rowHeight={100}
      onLayoutChange={handleLayoutChange}
      draggableHandle=".drag-handle"
      isResizable
    >
      {state.widgets.map(widget => (
        <div
          key={widget.id}
          className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">{widget.title}</h3>
            <button className="drag-handle cursor-move">≡</button>
          </div>
          {renderWidget(widget)}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default DashboardGrid;