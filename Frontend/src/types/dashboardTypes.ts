export type WidgetType = 'chart' | 'table' | 'kpi';

export interface BaseWidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  dataKey: string;
  position: { x: number; y: number; w: number; h: number };
}

export interface DashboardState {
  widgets: WidgetConfig[];
  dateRange: [];
  filters: Record<string, string>;
}

export interface KPIWidgetConfig extends BaseWidgetConfig {
  format?: 'number' | 'currency' | 'percent';
  currency?: string;
  targetValue?: number;
  showTrend?: boolean;
  showTarget?: boolean;
  icon?: string;
  subtitle?: string;
}

export type WidgetConfig = KPIWidgetConfig;