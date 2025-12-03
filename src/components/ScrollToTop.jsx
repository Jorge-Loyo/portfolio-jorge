// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que cambia la ruta (pathname), sube la ventana a (0,0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Este componente no dibuja nada, solo actúa
}