import { motion } from 'framer-motion';

const screens = [
  { label: 'Vault',        src: '/screenshots/vault.webp' },
  { label: 'Calculator',   src: '/screenshots/calculator.webp' },
  { label: 'File Manager', src: '/screenshots/file-manager.webp' },
  { label: 'Gallery',      src: '/screenshots/gallery.webp' },
  { label: 'Algorithms',   src: '/screenshots/algorithms.webp' },
];

function PhoneFrame({ screen, index }: { screen: typeof screens[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -36 : 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      className="flex-none flex flex-col items-center"
    >
      {/* Samsung Galaxy shell */}
      <div
        className="relative"
        style={{ width: 176, height: 391 }}
      >
        {/* Side buttons — volume (left) */}
        <div className="absolute -left-[3px] top-20 w-[3px] h-7 rounded-l bg-white/10" />
        <div className="absolute -left-[3px] top-32 w-[3px] h-7 rounded-l bg-white/10" />
        {/* Side button — power (right) */}
        <div className="absolute -right-[3px] top-24 w-[3px] h-9 rounded-r bg-white/10" />

        {/* Phone body */}
        <div
          className="absolute inset-0 rounded-[28px] border border-white/[0.12] shadow-2xl"
          style={{ background: '#0e0e0e' }}
        >
          {/* Screen area — transform:translateZ(0) forces compositing layer so overflow:hidden clips correctly */}
          <div
            className="absolute bg-black"
            style={{
              inset: 7,
              borderRadius: 21,
              overflow: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            {/* Punch-hole camera */}
            <div
              className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black"
              style={{ width: 11, height: 11, boxShadow: 'inset 0 0 0 2px #222' }}
            />

            {/* Screenshot */}
            <img
              src={screen.src}
              alt={screen.label}
              className="absolute inset-0 w-full h-full object-cover object-top"
              draggable={false}
            />
          </div>

          {/* Subtle glare overlay */}
          <div
            className="absolute inset-0 rounded-[28px] pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
            }}
          />
        </div>
      </div>

      <p className="text-gray-600 text-xs mt-3 font-medium">{screen.label}</p>
    </motion.div>
  );
}

export default function ScreenshotGallery() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide justify-start sm:justify-center">
      {screens.map((screen, i) => (
        <div key={screen.label} className="snap-center">
          <PhoneFrame screen={screen} index={i} />
        </div>
      ))}
    </div>
  );
}
