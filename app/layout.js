import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata = {
  title: "UAGRM - Sistema Académico",
  description: "Sistema de Gestión Académica - Universidad Autónoma Gabriel René Moreno",
  generator: "v0.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Estilos de fuentes */}
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon-16x16.png" />
        <link rel="mask-icon" href="/logo/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="manifest" href="/logo/favicon-32x32.png"  />
      </head>
      <body>{children}</body>
    </html>
  );
}
