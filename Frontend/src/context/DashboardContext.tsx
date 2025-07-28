import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { DashboardState, WidgetConfig } from '../types/dashboardTypes';

type Action =
  | { type: 'ADD_WIDGET'; payload: WidgetConfig }
  | { type: 'UPDATE_LAYOUT'; payload: WidgetConfig[] }
  | { type: 'UPDATE_FILTERS'; payload: Record<string, string> };

const initialState: DashboardState = {
  widgets: [],
  dateRange: [],
  filters: {},
};

const reducer = (state: DashboardState, action: Action): DashboardState => {
  switch (action.type) {
    case 'ADD_WIDGET':
      return { ...state, widgets: [...state.widgets, action.payload] };
    case 'UPDATE_LAYOUT':
      return { ...state, widgets: action.payload };
    case 'UPDATE_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
};

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
