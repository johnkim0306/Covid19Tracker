
import "styles/globals.css";
// import { Header } from '@/components'
// import { Header } from '@/components/Header/Header';
import { Header } from "../components";

export const metadata = {
  title: "Covid-19 Tracker",
  description: "Track & Diagnose Covid-19",
};

const RootLayout = ({ children }) => (
  <div className="main">
    <div className="gradient" />
    <main className="app">
      <Header />
      {children}
    </main>
  </div>
);

export default RootLayout;