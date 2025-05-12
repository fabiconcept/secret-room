import { Montserrat } from "next/font/google";
import "./styles/globals.css";
import { SocketProvider } from "@/app/components/contexts/SocketContext";
import HomeBackground from "./components/HomeBackground";
import UiSettings from "./components/UiSettings";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
});

const montserratMono = Montserrat({
  variable: "--font-montserrat-mono",
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${montserratMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
          }}

        />
        <div className="bg absolute h-screen w-screen top-0 left-0"></div>
        <HomeBackground />
        <UiSettings />
        <SocketProvider>
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
