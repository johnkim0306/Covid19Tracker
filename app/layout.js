
import "styles/globals.css";
import { Header } from "../components";
import { Footer } from "../components";

export const metadata = {
  title: "Covid-19 Tracker",
  description: "Track & Diagnose Covid-19",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          <Header />
          {children}
          <Footer />
        </main>
    </body>
  </html>
);

export default RootLayout;