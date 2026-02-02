import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { TeamProvider } from './context/TeamContext';
import { ToastProvider } from './context/ToastContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { MarketingProvider } from './context/MarketingContext';
import { BrandingProvider } from './context/BrandingContext';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { SOPList } from './pages/SOPList';
import { StrategyGenerator } from './pages/StrategyGenerator';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { SOPWizard } from './pages/SOPWizard';
import { Analytics } from './pages/Analytics';
import { TeamMembers } from './pages/TeamMembers';
import { Settings } from './pages/Settings';
import { Templates } from './pages/Templates';
import FunnelBuilder from './pages/FunnelBuilder';
import { EmailCampaignBuilder } from './pages/EmailCampaignBuilder';
import { SocialMediaPlanner } from './pages/SocialMediaPlanner';
import { LeadMagnetGenerator } from './pages/LeadMagnetGenerator';
import { ROICalculator } from './pages/ROICalculator';
import { ABTestingDashboard } from './pages/ABTestingDashboard';
import { ContentCalendar } from './pages/ContentCalendar';
import { AdCopyGenerator } from './pages/AdCopyGenerator';
import { LandingPageBuilder } from './pages/LandingPageBuilder';
import BookDemo from './pages/BookDemo';
import AdminLeads from './pages/AdminLeads';
import TrendScanner from './pages/TrendScanner';
import ContentRepurposing from './pages/ContentRepurposing';
import AudiencePersonas from './pages/AudiencePersonas';
import SocialInbox from './pages/SocialInbox';
import OptimizationLoop from './pages/OptimizationLoop';
import Monetization from './pages/Monetization';
import AdvancedSOPGenerator from './pages/AdvancedSOPGenerator';
import CompanySettings from './pages/CompanySettings';


function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/book-demo" element={<BookDemo />} />

      {/* Protected Routes */}

      <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
      <Route path="/sops" element={<PrivateRoute><Layout><SOPList /></Layout></PrivateRoute>} />

      {/* AI Tools */}
      <Route path="/strategy" element={<PrivateRoute><Layout><StrategyGenerator /></Layout></PrivateRoute>} />
      <Route path="/sop-wizard" element={<PrivateRoute><Layout><SOPWizard /></Layout></PrivateRoute>} />
      <Route path="/advanced-sop" element={<PrivateRoute><Layout><AdvancedSOPGenerator /></Layout></PrivateRoute>} />
      <Route path="/funnel-builder" element={<PrivateRoute><Layout><FunnelBuilder /></Layout></PrivateRoute>} />
      <Route path="/email-campaigns" element={<PrivateRoute><Layout><EmailCampaignBuilder /></Layout></PrivateRoute>} />
      <Route path="/social-media-planner" element={<PrivateRoute><Layout><SocialMediaPlanner /></Layout></PrivateRoute>} />
      <Route path="/lead-magnets" element={<PrivateRoute><Layout><LeadMagnetGenerator /></Layout></PrivateRoute>} />
      <Route path="/roi-calculator" element={<PrivateRoute><Layout><ROICalculator /></Layout></PrivateRoute>} />
      <Route path="/ab-testing" element={<PrivateRoute><Layout><ABTestingDashboard /></Layout></PrivateRoute>} />
      <Route path="/content-calendar" element={<PrivateRoute><Layout><ContentCalendar /></Layout></PrivateRoute>} />
      <Route path="/ad-copy" element={<PrivateRoute><Layout><AdCopyGenerator /></Layout></PrivateRoute>} />
      <Route path="/landing-pages" element={<PrivateRoute><Layout><LandingPageBuilder /></Layout></PrivateRoute>} />

      {/* New AI Features */}
      <Route path="/trend-scanner" element={<PrivateRoute><Layout><TrendScanner /></Layout></PrivateRoute>} />
      <Route path="/content-repurposing" element={<PrivateRoute><Layout><ContentRepurposing /></Layout></PrivateRoute>} />
      <Route path="/audience-personas" element={<PrivateRoute><Layout><AudiencePersonas /></Layout></PrivateRoute>} />
      <Route path="/social-inbox" element={<PrivateRoute><Layout><SocialInbox /></Layout></PrivateRoute>} />
      <Route path="/optimization" element={<PrivateRoute><Layout><OptimizationLoop /></Layout></PrivateRoute>} />
      <Route path="/monetization" element={<PrivateRoute><Layout><Monetization /></Layout></PrivateRoute>} />

      {/* Admin */}
      <Route path="/analytics" element={<PrivateRoute><Layout><Analytics /></Layout></PrivateRoute>} />
      <Route path="/team" element={<PrivateRoute><Layout><TeamMembers /></Layout></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />
      <Route path="/company-settings" element={<PrivateRoute><Layout><CompanySettings /></Layout></PrivateRoute>} />
      <Route path="/templates" element={<PrivateRoute><Layout><Templates /></Layout></PrivateRoute>} />
      <Route path="/admin/leads" element={<PrivateRoute><Layout><AdminLeads /></Layout></PrivateRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <BrandingProvider>
          <ToastProvider>
            <AuthProvider>
              <TeamProvider>
                <AnalyticsProvider>
                  <MarketingProvider>
                    <DataProvider>
                      <AppContent />
                    </DataProvider>
                  </MarketingProvider>
                </AnalyticsProvider>
              </TeamProvider>
            </AuthProvider>
          </ToastProvider>
        </BrandingProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;





