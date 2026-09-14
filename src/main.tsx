import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MarketingPage from './MarketingPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { StatusPage } from './pages/StatusPage';
import { ForWorkPage } from './pages/ForWorkPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/status" element={<StatusPage />} />
        {/* Professional uses of the same personal record. A page, deliberately
            not a subdomain: business.loggielabs.com would be a second surface
            for claims to drift on, split the domain, and promise a buyer
            something the product cannot serve yet (no team accounts, no seats,
            desktop + MetaMask only). Revisit when a professional can do
            something useful without a wallet, or when real inbound justifies it. */}
        <Route path="/for-work" element={<ForWorkPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        {/*
          /docs used to serve a gate saying documentation was available only to
          organisations in the pilot programme. There is no public documentation
          site to replace it with, so it points at the status ledger — which is
          the most documentation-shaped honest thing this site has.
        */}
        <Route path="/docs" element={<Navigate to="/status" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
