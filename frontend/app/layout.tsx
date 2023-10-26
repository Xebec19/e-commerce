import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "../store/query.provider";
import { Toaster } from "@/components/ui/toaster";
import { environment } from "@/lib";
import { ReduxProvider } from "@/store/redux.provider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store/redux.store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: environment.SITE_NAME,
  description: `${environment.SITE_NAME} website build by Rohan`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <PersistGate loading={null} persistor={persistor}>
              <QueryProvider>
                <>
                  <Navbar />
                  <Toaster />
                  <main className="px-4 container min-h-[60vh] my-4">
                    {children}
                  </main>
                  <Footer />
                </>
              </QueryProvider>
            </PersistGate>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
