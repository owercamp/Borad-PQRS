import DashboardGrid from './components/dashboard/DashboardGrid';
import { DashboardProvider } from './context/DashboardContext';
import Header from './components/layout/Header';
import FilterPanel from './components/dashboard/controls/FilterPanel';

function App() {
  return (
    <DashboardProvider>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto p-6">
            <FilterPanel />
            <DashboardGrid />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;