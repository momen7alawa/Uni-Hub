import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Main-Page-Components/About.css";
import AddTool from "./AddTool";
import Notifications from "./Notifications";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

import "./Main-Page-Components/product.css";

import { AuthProvider, useAuth } from "./AuthContext";

import Header from "./Header";
import Footer from "./Registeration-Components/Footer";
import Home from "./Main-Page-Components/Home";
import About from "./Main-Page-Components/About";
import Contact from "./Main-Page-Components/Contact";
import product from "./Main-Page-Components/product";
import Login from "./Registeration-Components/Login";
import Register from "./Registeration-Components/Register";
import ExchangePage from "./ExchangePage";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/home" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/contact" Component={Contact} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/product" Component={product} />

          <Route path="/addtool" Component={AddTool} />

          <Route
            path="/exchange/:itemId"
            element={
              <ProtectedRoute>
                <ExchangePage />
              </ProtectedRoute>
            }
          />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
