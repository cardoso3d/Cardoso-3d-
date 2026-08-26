import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  key?: string | number;
  id?: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  fallbackImage?: string;
  link: string;
  accent: string;
  delay: number;
  initials: string;
}

export default function ProductCard({ id, title, description, features, image, fallbackImage, link, accent, delay, initials }: ProductCardProps) {
  const [imgSrc, setImgSrc] = React.useState(image);
  const isAmber = accent.includes('amber') || accent.includes('accent');
  const glowClass = isAmber ? 'card-glow-orange' : 'card-glow-blue';
  const textAccentClass = isAmber ? 'text-cardoso-amber' : 'text-cardoso-sky';
  const bgAccentClass = isAmber ? 'bg-cardoso-amber' : 'bg-cardoso-sky';

  React.useEffect(() => {
    setImgSrc(image);
  }, [image]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={`group relative flex-1 glass rounded-3xl overflow-hidden ${glowClass} transition-all flex flex-col justify-end p-8 min-h-[500px]`}
      id={id}
    >
      {/* Background decoration removed */}

      {/* Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imgSrc} 
          alt={title} 
          referrerPolicy="no-referrer"
          onError={() => {
            if (fallbackImage && imgSrc !== fallbackImage) {
              setImgSrc(fallbackImage);
            }
          }}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cardoso-black/90 via-cardoso-black/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className={`h-[1px] w-8 ${bgAccentClass}`}></span>
          <span className={`${textAccentClass} text-[10px] font-bold uppercase tracking-[0.3em]`}>
            {isAmber ? 'Escultura Digital' : 'Anatomia & Dinâmica'}
          </span>
        </div>

        <h2 className="text-4xl font-bold mb-4 tracking-tighter uppercase">{title}</h2>
        
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-xs">
          {description}
        </p>

        <ul className="space-y-2 mb-8 block transition-all duration-500">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
              <CheckCircle2 className={`w-3 h-3 ${textAccentClass} flex-shrink-0`} />
              {feature}
            </li>
          ))}
        </ul>

        {link.startsWith('/') ? (
          <Link 
            to={link} 
            id={`${id}-cta`}
            className={`inline-flex items-center justify-center h-12 px-8 ${bgAccentClass} text-black font-bold text-xs uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all`}
          >
            Explorar Treinamento
          </Link>
        ) : (
          <a 
            href={link} 
            id={`${id}-cta`}
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center h-12 px-8 ${bgAccentClass} text-black font-bold text-xs uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all`}
          >
            Explorar Treinamento <ExternalLink className="ml-2 w-3 h-3" />
          </a>
        )}
      </div>

      {/* Bottom marker */}
      <div className="absolute bottom-0 right-0 p-6 flex items-baseline gap-1 opacity-20 transition-opacity group-hover:opacity-40">
        <span className="text-[10px] font-bold">{initials === 'ZB' ? '01' : '02'}</span>
        <div className="h-8 w-[1px] bg-white"></div>
      </div>
    </motion.div>
  );
}

