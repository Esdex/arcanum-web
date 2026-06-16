import { motion } from 'framer-motion';

export default function HeroLogo() {
  return (
    <div className="relative flex items-center justify-center w-52 h-52 mx-auto">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle, rgba(58,166,174,0.45) 0%, transparent 68%)',
        }}
      />
      {/* Inner purple ring */}
      <motion.div
        className="absolute inset-8 rounded-full"
        animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{
          background: 'radial-gradient(circle, rgba(156,39,176,0.35) 0%, transparent 70%)',
        }}
      />
      {/* Floating logo */}
      <motion.img
        src="/logo.svg"
        alt="Arcanum"
        className="relative z-10 w-36 h-36 drop-shadow-2xl select-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        draggable={false}
      />
    </div>
  );
}
