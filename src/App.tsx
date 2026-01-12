import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { SOPList } from './pages/SOPList';
import { StrategyGenerator } from './pages/StrategyGenerator';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { SOPWizard } from './pages/SOPWizard';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" />;
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>}>
        {/* Note: This nested structure is a bit odd with the above. 
              Let's use a wrapper for authenticated routes. 
          */}
      </Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/sops"
        element={
          <PrivateRoute>
            <Layout>
              <SOPList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/strategy"
        element={
          <PrivateRoute>
            <Layout>
              <StrategyGenerator />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/sop-wizard"
        element={
          <PrivateRoute>
            <Layout>
              <SOPWizard />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
