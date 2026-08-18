
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/redux/setup/store";
import MainHeader from "@/components/header/MainHeader";
import { ProviderStore } from "@/redux/setup/Providerstore";
import HeaderWraper from "@/components/header/HeaderWraper";
import Footer from "@/components/footer/Footer";
export const metadata: Metadata = {
  title: "فروشگاه اینترنتی دیجی‌کالا",
  description: "فروشگاه اینترنتی با الهام از دیجی‌کالا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <ProviderStore>
       <body className="bg-gray-100 lg:bg-white h-full">
        <HeaderWraper/>


        <main>
         {children}
        </main>

        <Footer/>
        </body>
     </ProviderStore>
    </html>
  );
}
