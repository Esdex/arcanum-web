import { useAnimate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const screens = [
  { label: 'Vault',         src: '/screenshots/vault.webp' },
  { label: 'Calculator',    src: '/screenshots/calculator.webp' },
  { label: 'Gallery',       src: '/screenshots/gallery.webp' },
  { label: 'File Manager',  src: '/screenshots/file-manager.webp' },
  { label: 'Audio Player',  src: '/screenshots/audio-player.webp' },
  { label: 'Hidden Volume', src: '/screenshots/hidden-volume.webp' },
  { label: 'Algorithms',    src: '/screenshots/algorithms.webp' },
  { label: 'Panic Mode',    src: '/screenshots/panic-mode.webp' },
  { label: 'AMOLED',        src: '/screenshots/amoled.webp' },
];

function PhoneFrame({ screen }: { screen: typeof screens[0] }) {
  return (
    <div className="flex-none flex flex-col items-center">
      <div className="relative" style={{ width: 176, height: 391 }}>
        {/* Volume buttons (left) */}
        <div className="absolute -left-[3px] top-20 w-[3px] h-7 rounded-l bg-white/10" />
        <div className="absolute -left-[3px] top-32 w-[3px] h-7 rounded-l bg-white/10" />
        {/* Power button (right) */}
        <div className="absolute -right-[3px] top-24 w-[3px] h-9 rounded-r bg-white/10" />

        {/* Phone body */}
        <div
          className="absolute inset-0 rounded-[28px] border border-white/[0.12] shadow-2xl"
          style={{ background: '#0e0e0e' }}
        >
          {/* Screen — transform:translateZ(0) forces compositing so overflow:hidden clips correctly */}
          <div
            className="absolute bg-black"
            style={{ inset: 3, borderRadius: 25, overflow: 'hidden', transform: 'translateZ(0)' }}
          >
            {/* Punch-hole camera */}
            <div
              className="absolute top-1 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black"
              style={{ width: 11, height: 11, boxShadow: 'inset 0 0 0 2px #222' }}
            />
            <img
              src={screen.src}
              alt={screen.label}
              className="absolute inset-0 w-full h-full object-cover object-top"
              draggable={false}
            />
          </div>

          {/* Glare */}
          <div
            className="absolute inset-0 rounded-[28px] pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)' }}
          />
        </div>
      </div>
      <p className="text-gray-600 text-xs mt-3 font-medium">{screen.label}</p>
    </div>
  );
}

export default function ScreenshotGallery() {
  const [scope, animate] = useAnimate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = animate(
      scope.current,
      { x: ['0%', '-50%'] },
      { duration: 45, ease: 'linear', repeat: Infinity }
    );

    const container = containerRef.current;
    if (!container) return;

    const pause = () => animation.pause();
    const play  = () => animation.play();

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', play);

    return () => {
      animation.stop();
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', play);
    };
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden py-2 cursor-default">
      <div ref={scope} className="flex gap-6" style={{ width: 'max-content' }}>
        {/* Duplicated for seamless infinite loop */}
        {[...screens, ...screens].map((screen, i) => (
          <PhoneFrame key={i} screen={screen} />
        ))}
      </div>
    </div>
  );
}
