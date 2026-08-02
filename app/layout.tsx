import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Edu Coding - Aprenda IA escrevendo código",
  description:
    "Lições interativas com editor e sandbox embutidos. IA para devs, no seu ritmo, com certificado por fase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Aplica o tema ANTES da hidratação (evita flash claro/escuro).
            Lê o localStorage ou segue o sistema. O ThemeProvider assume daqui. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('edu-theme');var d=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
