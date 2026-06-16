import { motion } from 'framer-motion';

const screens = [
  {
    label: 'Vault',
    bg: 'linear-gradient(160deg, #0f1d1f 0%, #0a1214 100%)',
    accent: '#3aa6ae',
    items: ['Documents', 'Photos', 'Videos', 'Keys'],
  },
  {
    label: 'Calculator',
    bg: 'linear-gradient(160deg, #111 0%, #0a0a0a 100%)',
    accent: '#9C27B0',
    items: ['7', '8', '9', '÷'],
    isCalculator: true,
  },
  {
    label: 'File Manager',
    bg: 'linear-gradient(160deg, #141820 0%, #0e1218 100%)',
    accent: '#67c0b6',
    items: ['report.pdf', 'wallet.dat', 'keys.kdbx', 'notes.txt'],
  },
  {
    label: 'Unlock',
    bg: 'linear-gradient(160deg, #0a0a12 0%, #080810 100%)',
    accent: '#9C27B0',
    isUnlock: true,
    items: [],
  },
  {
    label: 'Algorithms',
    bg: 'linear-gradient(160deg, #101418 0%, #0a0e12 100%)',
    accent: '#3aa6ae',
    items: ['AES-256', 'Serpent', 'Twofish', 'Kuznyechik'],
  },
];

function PhoneScreen({ screen, index }: { screen: typeof screens[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      className="flex-none flex flex-col items-center"
    >
      {/* Phone shell */}
      <div
        className="w-44 h-[22rem] rounded-[2.4rem] border-2 border-white/[0.08] relative overflow-hidden shadow-2xl"
        style={{ background: '#111' }}
      >
        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

        {/* Screen */}
        <div className="absolute inset-0 pt-12 pb-6 flex flex-col" style={{ background: screen.bg }}>
          {screen.isCalculator ? (
            <div className="flex-1 flex flex-col px-3 gap-2 pt-2">
              {/* Display */}
              <div className="text-right text-2xl font-light text-white px-2 py-2 mb-1">3.14159</div>
              {/* Buttons grid */}
              <div className="grid grid-cols-4 gap-1.5 flex-1">
                {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '', '.', '='].map((k, i) => (
                  <div
                    key={i}
                    className={`rounded-full flex items-center justify-center text-xs font-medium ${
                      i < 4
                        ? 'bg-white/10 text-gray-300'
                        : [3, 7, 11, 15, 19].includes(i)
                        ? 'text-black text-sm font-bold'
                        : 'bg-white/5 text-white'
                    } ${i === 18 ? 'col-span-2' : ''}`}
                    style={
                      [3, 7, 11, 15, 19].includes(i)
                        ? { background: screen.accent }
                        : {}
                    }
                  >
                    {k}
                  </div>
                ))}
              </div>
            </div>
          ) : screen.isUnlock ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2"
                style={{ background: `${screen.accent}22` }}
              >
                <svg className="w-7 h-7" style={{ color: screen.accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                </svg>
              </div>
              <p className="text-white text-xs font-medium">Touch to unlock</p>
              <div className="w-24 h-px bg-white/10" />
              <p className="text-gray-600 text-xs">or enter passphrase</p>
              <div className="w-full h-8 rounded-xl bg-white/5 border border-white/10 mt-2" />
            </div>
          ) : (
            <div className="flex-1 flex flex-col px-3 gap-1.5 pt-1">
              {/* Section header */}
              <p className="text-xs font-semibold px-1 mb-1" style={{ color: screen.accent }}>
                {screen.label}
              </p>
              {screen.items.map((item, j) => (
                <div
                  key={j}
                  className="w-full h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center px-3 gap-2"
                >
                  <div className="w-5 h-5 rounded-md flex-none" style={{ background: `${screen.accent}28` }}>
                    <div className="w-full h-full rounded-md" style={{ background: `${screen.accent}60` }} />
                  </div>
                  <span className="text-xs text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Home bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/20" />
      </div>

      <p className="text-gray-600 text-xs mt-3 font-medium">{screen.label}</p>
    </motion.div>
  );
}

export default function ScreenshotGallery() {
  return (
    <div className="flex gap-5 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide justify-start sm:justify-center">
      {screens.map((screen, i) => (
        <div key={screen.label} className="snap-center">
          <PhoneScreen screen={screen} index={i} />
        </div>
      ))}
    </div>
  );
}
