import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { initTrackingSystem, restoreParamsToAddressBar, propagateTrackingParamsToLinks, propagateTrackingParamsToForms } from './utils/tracking';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { motion } from 'motion/react';
import { Instagram, Youtube, Twitch, Linkedin } from 'lucide-react';
import ThreeDNaPose from './pages/ThreeDNaPose';
import ZbrushDoZero from './pages/ZbrushDoZero';
import capaZbrushImg from './assets/images/capa-zbrush-do-zero.webp';
import { capaZbrushBase64 } from './assets/images/capaZbrushBase64';

const products = [
  {
    title: "ZBrush do Zero",
    description: "Aprenda ZBrush do Zero e crie seu primeiro modelo pronto para impressão 3D, mesmo que nunca tenha aberto o programa.",
    features: [
      "Acesso vitalício e imediato",
      "Foco em Impressão 3D",
      "Personagem completo do zero",
      "Método simples em etapas",
      "Garantia de 7 dias"
    ],
    image: capaZbrushBase64,
    fallbackImage: capaZbrushImg,
    link: "/zbrushdozero",
    accent: "cardoso-amber",
    delay: 0.1
  },
  {
    title: "3D na Pose",
    description: "Pare de perder horas refazendo suas esculturas. Aprenda a modelar direto na pose e criar peças com impacto profissional.",
    features: [
      "Anatomia aplicada na pose",
      "Composição e narrativa",
      "Fim do retrabalho desnecessário",
      "Histórias reais de sucesso",
      "Nível Profissional"
    ],
    image: "https://3dnapose.com/wp-content/uploads/2025/05/06-1024x819.png",
    link: "/3dnapose",
    accent: "cardoso-sky",
    delay: 0.2
  }
];

function Home() {
  return (
    <div className="immersive-bg min-h-screen flex flex-col p-6 md:p-12 relative" id="home-page">
      <Header />
      
      <main className="flex-1 flex flex-col md:flex-row gap-8 z-10 items-stretch min-h-[600px] max-w-7xl mx-auto w-full" id="main-content">
        {products.map((product, index) => (
          <ProductCard 
            key={index} 
            id={`product-card-${index}`}
            title={product.title}
            description={product.description}
            features={product.features}
            image={product.image}
            fallbackImage={product.fallbackImage}
            link={product.link}
            accent={product.accent}
            delay={product.delay}
            initials={product.title === 'ZBrush do Zero' ? 'ZB' : '3P'}
          />
        ))}
      </main>

      <footer className="mt-24 flex flex-col items-center gap-10 text-[10px] text-zinc-600 uppercase tracking-widest font-bold pb-8" id="main-footer">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-black tracking-tighter uppercase leading-none text-zinc-300">
            Cardoso<span className="text-zinc-600">3D</span>
          </h2>
          <p className="text-zinc-500 tracking-[0.2em] text-[9px]">Escultura Digital & Impressão 3D</p>
        </div>

        <div className="flex gap-6 items-center">
            <a href="https://www.instagram.com/cardoso.3d/" target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] rounded-full flex items-center justify-center border border-white/10 bg-white/[0.02] hover:text-white hover:bg-white/5 hover:border-white/20 transition-all" id="footer-social-instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@Cardoso.3d" target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] rounded-full flex items-center justify-center border border-white/10 bg-white/[0.02] hover:text-white hover:bg-white/5 hover:border-white/20 transition-all" id="footer-social-youtube">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://www.twitch.tv/cardoso_3d" target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] rounded-full flex items-center justify-center border border-white/10 bg-white/[0.02] hover:text-white hover:bg-white/5 hover:border-white/20 transition-all" id="footer-social-twitch">
              <Twitch className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/vinicius-cardoso-3370631b7/" target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] rounded-full flex items-center justify-center border border-white/10 bg-white/[0.02] hover:text-white hover:bg-white/5 hover:border-white/20 transition-all" id="footer-social-linkedin">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.artstation.com/viniciusnunes" target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] rounded-full flex items-center justify-center border border-white/10 bg-white/[0.02] hover:text-white hover:bg-white/5 hover:border-white/20 transition-all" id="footer-social-artstation">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="13.5" cy="13.5" r="8.5"/><path d="M7 10L5 6L2 11"/><path d="M8 21L10 17"/><path d="M19 10L21 6L23 11"/></svg>
            </a>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-white/5 w-full max-w-sm pt-8">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors" id="footer-link-terms">Termos</a>
              <a href="#" className="hover:text-white transition-colors" id="footer-link-privacy">Privacidade</a>
            </div>
            <span className="opacity-50 mt-2">&copy; {new Date().getFullYear()} Cardoso3D Studio</span>
        </div>
      </footer>

      {/* Background decoration from theme */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 vertical-text text-[15vw] font-black text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter">
        ACADEMY
      </div>
    </div>
  );
}

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    restoreParamsToAddressBar();
    propagateTrackingParamsToLinks();
    propagateTrackingParamsToForms();
  }, [location]);

  return null;
}

export default function App() {
  useEffect(() => {
    const cleanup = initTrackingSystem();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <Router>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zbrushdozero" element={<ZbrushDoZero />} />
        <Route path="/3dnapose" element={<ThreeDNaPose />} />
      </Routes>
    </Router>
  );
}

