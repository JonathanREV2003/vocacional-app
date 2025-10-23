import DefaultFont from '../components/defaultFont';
import Headers from '../components/Headers';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Main() {
  return (
    <div className="relative">
      <DefaultFont />
      <Headers />
      <Hero />
      <Footer />
    </div>
  );
}