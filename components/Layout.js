import TitleBar from "./TitleBar.js";
import Footer from "./Footer.js";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({ weight: "400", subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <>
      <div className="max-w-md md:h-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <TitleBar />
        <main className={amaranth.className} data-theme="light">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
