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
import Script from "next/script";

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
          </ReduxProvider>
        </ThemeProvider>
        <Script
          id="ms_clarity"
          dangerouslySetInnerHTML={{
            __html: ` (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${environment.CLARITY_KEY}");`,
          }}
        ></Script>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </body>
    </html>
  );
}