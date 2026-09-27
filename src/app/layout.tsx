import type { Metadata } from 'next';
import './globals.css';
import { CineProvider } from '@/context/CineContext';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'CineProd Studio | Titan #36 Film Production OS',
  description: 'High-contrast Magazine Editorial OS for Feature Film Production, Call Sheets, Scene Breakdown & Dailies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-[#fafafa] min-h-screen antialiased flex flex-col selection:bg-amber-500 selection:text-black">
        <CineProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <footer className="border-t border-zinc-900 bg-[#0c0c0e] py-6 px-4 text-xs font-mono text-zinc-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-zinc-300 font-bold">CINEPROD STUDIO</span> — TITAN #36 ARCHITECTURAL FLEET
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span>STYLE #31: MAGAZINE / EDITORIAL NOIR</span>
                <span>•</span>
                <span>ENTERPRISE CLIENT-SIDE LOCAL-FIRST</span>
                <span>•</span>
                <span className="text-amber-400">OLYXMINTABANSOS-BYTE</span>
              </div>
            </div>
          </footer>
        </CineProvider>
      </body>
    </html>
  );
}
