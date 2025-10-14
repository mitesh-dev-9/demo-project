import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";
import InvoicesDashboard from "./components/InvoicesDashboard";
import AccountPage from "./components/AccountPage";
import SettingsPage from "./components/SettingsPage";
import { mockInvoices, mockUser, mockWalletConfig } from "./data/mockData";
import { Invoice, User, WalletConfig } from "./types";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("invoices");
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [user, setUser] = useState<User>(mockUser);
  const [config, setConfig] = useState<WalletConfig>(mockWalletConfig);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("invoices");
  };

  const handlePayInvoice = (invoiceId: string) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: "paid" as const } : inv
      )
    );
  };

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      <div className="flex-1 overflow-x-hidden">
        {currentPage === "invoices" && (
          <InvoicesDashboard
            invoices={invoices}
            onPayInvoice={handlePayInvoice}
            walletConfig={config}
          />
        )}
        {currentPage === "account" && (
          <AccountPage user={user} onUpdateUser={setUser} />
        )}
        {currentPage === "settings" && (
          <SettingsPage config={config} onUpdateConfig={setConfig} />
        )}
      </div>
    </div>
  );
}

export default App;
