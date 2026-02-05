
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Satellite } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionComplete, setTransmissionComplete] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);

    // Simulate transmission delay
    setTimeout(() => {
      setIsTransmitting(false);
      setTransmissionComplete(true);

      // Reset after showing success
      setTimeout(() => {
        setTransmissionComplete(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }, 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="min-h-screen py-20 relative z-10 flex items-center">
    <div className="max-w-7xl mx-auto px-6 w-full">
    <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    >
    <h2 className="text-4xl font-mono text-green-400 glow-text mb-4">
    ./contact --establish-link
    </h2>
    <p className="text-blue-300 font-mono">
    [DEEP_SPACE_COMM] Initiating quantum entanglement protocol...
    </p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Holographic Globe */}
    <motion.div
    className="relative flex justify-center items-center"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    >
    <div className="relative w-96 h-96">
    {/* Globe Base */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-green-400/20 backdrop-blur-lg border-2 border-green-400/50 globe-animation">
    {/* Grid Lines */}
    <div className="absolute inset-4 rounded-full border-2 border-green-400/30 grid-lines-vertical"></div>
    <div className="absolute inset-8 rounded-full border border-green-400/20"></div>
    <div className="absolute inset-12 rounded-full border border-blue-400/20"></div>

    {/* Floating Data Points */}
    {[...Array(12)].map((_, i) => (
      <motion.div
      key={i}
      className="absolute w-2 h-2 bg-green-400 rounded-full"
      style={{
        left: `${20 + (i % 4) * 20}%`,
                                   top: `${20 + Math.floor(i / 4) * 20}%`,
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: i * 0.2,
      }}
      />
    ))}
    </div>

    {/* Orbital Rings */}
    <motion.div
    className="absolute inset-[-20px] border border-blue-400/30 rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
    className="absolute inset-[-40px] border border-green-400/20 rounded-full"
    animate={{ rotate: -360 }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />

    {/* Signal Waves */}
    {isTransmitting && (
      <div className="absolute inset-0">
      {[...Array(5)].map((_, i) => (
        <motion.div
        key={i}
        className="absolute inset-0 border-2 border-green-400 rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeOut"
        }}
        />
      ))}
      </div>
    )}
    </div>
    </motion.div>

    {/* Contact Form */}
    <motion.div
    className="space-y-6"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.5 }}
    >
    <div className="glass-card bg-black/60 backdrop-blur-md border border-green-400/30 rounded-lg p-8">
    <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-4">
    <motion.div
    className="relative"
    onHoverStart={() => setHoveredField('name')}
    onHoverEnd={() => setHoveredField(null)}
    >
    <label className="block text-green-400 font-mono text-sm mb-2">
    [IDENTITY_VECTOR]
    </label>
    <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleInputChange}
    className="w-full bg-black/40 border border-blue-400/30 rounded-lg px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-all duration-300"
    placeholder="Enter designation..."
    required
    />
    {hoveredField === 'name' && (
      <motion.div
      className="absolute inset-0 border border-green-400/50 rounded-lg pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      />
    )}
    </motion.div>

    <motion.div
    className="relative"
    onHoverStart={() => setHoveredField('email')}
    onHoverEnd={() => setHoveredField(null)}
    >
    <label className="block text-green-400 font-mono text-sm mb-2">
    [COMM_FREQUENCY]
    </label>
    <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    className="w-full bg-black/40 border border-blue-400/30 rounded-lg px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-all duration-300"
    placeholder="quantum.entanglement@galaxy.net"
    required
    />
    {hoveredField === 'email' && (
      <motion.div
      className="absolute inset-0 border border-green-400/50 rounded-lg pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      />
    )}
    </motion.div>

    <motion.div
    className="relative"
    onHoverStart={() => setHoveredField('message')}
    onHoverEnd={() => setHoveredField(null)}
    >
    <label className="block text-green-400 font-mono text-sm mb-2">
    [MESSAGE_PAYLOAD]
    </label>
    <textarea
    name="message"
    value={formData.message}
    onChange={handleInputChange}
    rows={6}
    className="w-full bg-black/40 border border-blue-400/30 rounded-lg px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-all duration-300 resize-none"
    placeholder="Transmitting across the digital void..."
    required
    />
    {hoveredField === 'message' && (
      <motion.div
      className="absolute inset-0 border border-green-400/50 rounded-lg pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      />
    )}
    </motion.div>
    </div>

    <motion.button
    type="submit"
    disabled={isTransmitting || transmissionComplete}
    className="w-full relative overflow-hidden bg-gradient-to-r from-green-400/20 to-blue-400/20 border border-green-400/50 rounded-lg px-6 py-4 font-mono text-green-400 hover:text-white transition-all duration-300 group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    >
    <div className="flex items-center justify-center gap-2">
    <AnimatePresence mode="wait">
    {isTransmitting ? (
      <motion.div
      key="transmitting"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2"
      >
      <Satellite className="w-5 h-5 animate-pulse" />
      <span>TRANSMITTING TO DEEP SPACE...</span>
      </motion.div>
    ) : transmissionComplete ? (
      <motion.div
      key="complete"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-green-400"
      >
      ✓ TRANSMISSION SUCCESSFUL
      </motion.div>
    ) : (
      <motion.div
      key="send"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2"
      >
      <Send className="w-5 h-5" />
      <span>INITIATE TRANSMISSION</span>
      </motion.div>
    )}
    </AnimatePresence>
    </div>

    {/* Button effects */}
    <motion.div
    className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    style={{ mixBlendMode: 'overlay' }}
    />
    </motion.button>
    </form>

    {/* Quick Contact Info */}
    <div className="mt-8 pt-6 border-t border-green-400/20">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
    <div className="flex items-center gap-2 text-blue-400">
    <Mail className="w-4 h-4" />
    <div>
    <div className="font-mono text-xs text-gray-400">DIRECT_LINK</div>
    <div className="font-mono">fahadfaz0708@gmail.com</div>
    </div>
    </div>
    <div className="flex items-center gap-2 text-green-400">
    <Phone className="w-4 h-4" />
    <div>
    <div className="font-mono text-xs text-gray-400">VOICE_COMM</div>
    <div className="font-mono">+91 8489941091</div>
    </div>
    </div>
    <div className="flex items-center gap-2 text-blue-300">
    <MapPin className="w-4 h-4" />
    <div>
    <div className="font-mono text-xs text-gray-400">COORDINATES</div>
    <div className="font-mono">10.9974° N, 76.9589° E</div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </motion.div>
    </div>
    </div>
    </section>
  );
};

export default ContactSection;
