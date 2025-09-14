import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PlaceholderPage from "./components/common/PlaceholderPage";
import MenuPage from "./pages/Menu";
import ServiceClientPage from "./pages/ServiceClient";
import AccountLogin from "./pages/AccountLogin";
import AccountCreate from "./pages/AccountCreate";

const queryClient = new QueryClient();

import { I18nProvider } from "./contexts/i18n";
import { CartProvider } from "./contexts/cart";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <I18nProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route
                    path="/nos-cafes"
                    element={<PlaceholderPage title="Nos cafés" />}
                  />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route
                    path="/rewards"
                    element={<PlaceholderPage title="Rewards" />}
                  />
                  <Route
                    path="/delivers"
                    element={<PlaceholderPage title="Delivers" />}
                  />
                  <Route
                    path="/service-client"
                    element={<ServiceClientPage />}
                  />
                  <Route
                    path="/carriere"
                    element={<PlaceholderPage title="Carrière" />}
                  />
                  <Route
                    path="/trouver-un-salon"
                    element={<PlaceholderPage title="Trouver un salon" />}
                  />
                  <Route path="/account/login" element={<AccountLogin />} />
                  <Route path="/account/create" element={<AccountCreate />} />
                  <Route path="/connexion" element={<AccountLogin />} />
                  <Route
                    path="/apropos"
                    element={<PlaceholderPage title="À propos" />}
                  />
                  <Route
                    path="/accessibilite"
                    element={<PlaceholderPage title="Accessibilité" />}
                  />
                  <Route
                    path="/responsabilite"
                    element={<PlaceholderPage title="Responsabilité" />}
                  />
                  <Route
                    path="/starbucks-cartes-cadeaux"
                    element={<PlaceholderPage title="Cartes Cadeaux" />}
                  />
                  <Route
                    path="/rewards/ts-and-cs"
                    element={<PlaceholderPage title="Conditions Rewards" />}
                  />
                  <Route
                    path="/confidentialite"
                    element={<PlaceholderPage title="Confidentialité" />}
                  />
                  <Route
                    path="/cookies"
                    element={<PlaceholderPage title="Cookies" />}
                  />
                  <Route
                    path="/conditions"
                    element={
                      <PlaceholderPage title="Conditions d'utilisation" />
                    }
                  />
                  <Route
                    path="/cart"
                    element={<PlaceholderPage title="Panier" />}
                  />
                  <Route
                    path="/article/*"
                    element={<PlaceholderPage title="Article" />}
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </I18nProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
