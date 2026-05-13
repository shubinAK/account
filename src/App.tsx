/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

// Lazy load pages
import Dashboard from './pages/Dashboard';
import Locations from './pages/Locations';
import Sports from './pages/Sports';
import Packages from './pages/Packages';
import Students from './pages/Students';
import Renewals from './pages/Renewals';
import Invoices from './pages/Invoices';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import AccountsDashboard from './pages/super-admin/AccountsDashboard';
import UserManagement from './pages/super-admin/UserManagement';
import ClubDetails from './pages/super-admin/ClubDetails';
import BranchDetails from './pages/super-admin/BranchDetails';
import CreateInvoice from './pages/CreateInvoice';
import ViewInvoice from './pages/ViewInvoice';

export default function App() {
  return (
    <TooltipProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 overflow-y-auto px-8 py-8">
              <Routes>
                {/* Branch Admin Routes */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/students" element={<Students />} />
                <Route path="/renewals" element={<Renewals />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices/create" element={<CreateInvoice />} />
                <Route path="/invoices/view/:id" element={<ViewInvoice />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />

                {/* Super Admin Routes */}
                <Route path="/super-admin" element={<AccountsDashboard />} />
                <Route path="/super-admin/users" element={<UserManagement />} />
                <Route path="/super-admin/club" element={<ClubDetails />} />
                <Route path="/super-admin/branch/:id" element={<BranchDetails />} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/super-admin" replace />} />
              </Routes>
            </main>
          </div>
          <Toaster position="top-right" closeButton richColors />
        </div>
      </Router>
    </TooltipProvider>
  );
}
