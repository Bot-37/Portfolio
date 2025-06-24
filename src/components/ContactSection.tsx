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
    <>
    {/* Transmission Overlay */}
    <AnimatePresence>
    {isTransmitting && (
      <motion.div
      className="sending-overlay active"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
      <div className="transmission-animation">
      <div className="transmission-text">
      TRANSMITTING TO DEEP SPACE...
      </div>
      <div className="signal-waves">
      <div className="signal-wave"></div>
      <div className="signal-wave"></div>
      <div className="signal-wave"></div>
      <div className="signal-wave"></div>
      </div>
      </div>
      </motion.div>
    )}
    </AnimatePresence>

    {/* Success Overlay */}
    <AnimatePresence>
    {transmissionComplete && (
      <motion.div
      className="sending-overlay active"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
      <div className="transmission-animation">
      <div className="success-checkmark"></div>
      <div className="transmission-text">
      TRANSMISSION SUCCESSFUL
      </div>
      </div>
      </motion.div>
    )}
    </AnimatePresence>

    {/* Floating Space Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
      key={i}
      className="space-particle"
      style={{
        left: `${Math.random() * 100}%`,
                                   animationDelay: `${Math.random() * 10}s`,
      }}
      />
    ))}
    </div>

    {/* Data Streams */}
    <div className="absolute inset-0 pointer-events-none">
    <div className="data-stream data-stream-1"></div>
    <div className="data-stream data-stream-2"></div>
    <div className="data-stream data-stream-3"></div>
    <div className="data-stream data-stream-4"></div>
    </div>

    <section className="contact-section">
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
    {/* Digital Globe using CSS classes */}
    <motion.div
    className="relative flex justify-center items-center"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    >
    <div className="digital-globe">
    <div className="globe-core"></div>
    <div className="globe-grid"></div>
    <div className="globe-ring globe-ring-1"></div>
    <div className="globe-ring globe-ring-2"></div>
    <div className="globe-ring globe-ring-3"></div>

    {/* Floating Data Points */}
    {[...Array(12)].map((_, i) => (
      <motion.div
      key={i}
      className="absolute w-2 h-2 bg-green-400 rounded-full"
      style={{
        left: `${20 + (i % 4) * 20}%`,
                                   top: `${20 + Math.floor(i / 4) * 20}%`,
                                   boxShadow: '0 0 6px rgba(34, 197, 94, 1)'
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
    </motion.div>

    {/* Message Terminal using CSS classes */}
    <motion.div
    className="space-y-6"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.5 }}
    >
    <div className="message-terminal">
    {/* Terminal Header */}
    <div className="terminal-header">
    <div className="terminal-dots">
    <div className="terminal-dot"></div>
    <div className="terminal-dot"></div>
    <div className="terminal-dot"></div>
    </div>
    <div className="terminal-title">
    DEEP_SPACE_COMMUNICATION_PROTOCOL
    </div>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-4">
    {/* Name Field */}
    <div className="form-group">
    <label className="form-label">
    [IDENTITY_VECTOR]
    </label>
    <motion.input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleInputChange}
    className="form-input"
    placeholder="Tactical callsign..."
    required
    onHoverStart={() => setHoveredField('name')}
    onHoverEnd={() => setHoveredField(null)}
    />
    {hoveredField === 'name' && (
      <motion.div
      className="absolute inset-0 border border-green-400/50 rounded-lg pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      />
    )}
    </div>

    {/* Email Field */}
    <div className="form-group">
    <label className="form-label">
    [COMM_FREQUENCY]
    </label>
    <motion.input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    className="form-input"
    placeholder="quantum.entanglement@galaxy.net"
    required
    onHoverStart={() => setHoveredField('email')}
    onHoverEnd={() => setHoveredField(null)}
    />
    {hoveredField === 'email' && (
      <motion.div
      className="absolute inset-0 border border-green-400/50 rounded-lg pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      />
    )}
    </div>

    {/* Message Field */}
    <div className="form-group">
    <label className="form-label">
    [MESSAGE_PAYLOAD]
    </label>
    <motion.textarea
    name="message"
    value={formData.message}
    onChange={handleInputChange}
    rows={6}
    className="form-textarea"
    placeholder="Transmitting across the digital void..."
    required
    onHoverStart={() => setHoveredField('message')}
    onHoverEnd={() => setHoveredField(null)}
    />
    {hoveredField === 'message' && (
      <motion.div
      className="absolute inset-0 border border-green-400/50 rounded-lg pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      />
    )}
    </div>
    </div>

    {/* Transmission Button */}
    <motion.button
    type="submit"
    disabled={isTransmitting || transmissionComplete}
    className="transmission-button"
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
    </motion.button>
    </form>

    {/* Quick Contact Info */}
    <div className="mt-8 pt-6 border-t border-green-400/20">
    <div className="space-y-3">
    <div className="flex items-center gap-3 text-blue-400 hover:bg-blue-400/5 p-2 rounded transition-all">
    <Mail className="w-4 h-4" />
    <div className="font-mono">
    <span className="text-xs opacity-70">DIRECT_LINK:</span>
    <span className="ml-2">fahadfaz0708@gmail.com</span>
    </div>
    </div>
    <div className="flex items-center gap-3 text-green-400 hover:bg-green-400/5 p-2 rounded transition-all">
    <Phone className="w-4 h-4" />
    <div className="font-mono">
    <span className="text-xs opacity-70">VOICE_COMM:</span>
    <span className="ml-2">+91 8489941091</span>
    </div>
    </div>
    <div className="flex items-center gap-3 text-blue-300 hover:bg-blue-300/5 p-2 rounded transition-all">
    <MapPin className="w-4 h-4" />
    <div className="font-mono">
    <span className="text-xs opacity-70">COORDINATES:</span>
    <span className="ml-2">10.9974° N, 76.9589° E</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    </motion.div>
    </div>
    </div>
    </section>
    </>
  );
};

export default ContactSection;
