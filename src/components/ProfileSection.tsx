
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Calendar, ExternalLink } from 'lucide-react';

const ProfileSection = () => {
    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'fahadfaz0708@gmail.com', href: 'mailto:fahadfaz0708@gmail.com' },
        { icon: Phone, label: 'Phone', value: '+91 (848) 994-1091', href: 'tel:+918489941091' },
        { icon: Calendar, label: 'Birthday', value: 'August 07, 2005' },
        { icon: MapPin, label: 'Location', value: 'Coimbatore, Tamil Nadu, INDIA' }
    ];

    const education = [
        {
            institution: 'Anna University Regional Campus - Coimbatore',
            period: '2024 — 2027',
            description: 'My academic journey took an unexpected turn when personal circumstances led me to transfer from my initial college. This transition proved to be a pivotal moment, opening doors to a more prestigious institution where my technical skills and professional network flourished beyond what I had imagined possible.'
        },
        {
            institution: 'University College Of Engineering - Thirukkuvalai',
            period: '2023 — 2024',
            description: 'Stepping into college was a journey filled with curiosity, challenges, and growth. From endless coding sessions to late-night project discussions, every moment was a step closer to shaping my future.'
        },
        {
            institution: 'R.C. Fatima Matric H.R. Sec. School',
            period: '2021 — 2023',
            description: 'Successfully completed high school with a focus on Computer Science, Physics, Chemistry, Math.'
        }
    ];

    const socialLinks = [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bot37/', icon: '💼' },
        { name: 'GitHub', url: 'https://github.com/Bot-37', icon: '🐙' }
    ];

    return (
        <section className="min-h-screen py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
        <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        >
        <h2 className="text-4xl font-mono text-green-400 glow-text mb-4">
        ./profile --neural-scan
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Profile Image and Basic Info */}
        <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
        >
        <div className="holographic-display">
        <div className="flex flex-col items-center">
        <div className="relative mb-6">
        <img
        src="/lovable-uploads/8c52c9f1-e774-4ca4-8394-1282bfda898a.png"
        alt="Fahad's Profile"
        className="w-48 h-48 rounded-full border-4 border-green-400 glow-border object-cover"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-green-400/20 to-transparent pointer-events-none"></div>
        </div>
        <h3 className="text-2xl font-mono text-green-400 glow-text mb-2">FAHAD_37</h3>
        <p className="text-blue-300 text-center">Neural Network Architect | Code Warrior</p>
        </div>
        </div>

        {/* Contact Information */}
        <div className="war-table">
        <div className="war-table-content">
        <h4 className="text-lg font-mono text-blue-400 mb-4 glow-text">Contact Matrix</h4>
        <div className="grid grid-cols-1 gap-4">
        {contactInfo.map((item, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="hologram p-3 rounded flex items-center gap-3"
            >
            <item.icon className="w-5 h-5 text-green-400" />
            <div className="flex-1">
            <div className="text-xs text-gray-400 font-mono">{item.label}</div>
            {item.href ? (
                <a href={item.href} className="text-green-400 hover:text-blue-400 transition-colors">
                {item.value}
                </a>
            ) : (
                <div className="text-white">{item.value}</div>
            )}
            </div>
            </motion.div>
        ))}
        </div>
        </div>
        </div>

        {/* Social Links */}
        <div className="holographic-display">
        <h4 className="text-lg font-mono text-blue-400 mb-4 glow-text">Network Links</h4>
        <div className="flex gap-4">
        {socialLinks.map((link, index) => (
            <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="quantum-button flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            >
            <span>{link.icon}</span>
            {link.name}
            <ExternalLink className="w-4 h-4" />
            </motion.a>
        ))}
        </div>
        </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
        >
        <div className="holographic-display">
        <h4 className="text-lg font-mono text-blue-400 mb-6 glow-text">Neural Development Log</h4>
        <div className="space-y-6">
        {education.map((edu, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
            >
            <div className="war-table">
            <div className="war-table-content">
            <div className="flex items-start justify-between mb-3">
            <h5 className="text-green-400 font-mono text-sm font-bold">
            {edu.institution}
            </h5>
            <span className="text-blue-400 text-xs font-mono px-2 py-1 bg-blue-400/10 rounded border border-blue-400/30">
            {edu.period}
            </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
            {edu.description}
            </p>
            </div>
            </div>

            {/* Timeline connector */}
            {index < education.length - 1 && (
                <div className="absolute left-1/2 -bottom-3 w-px h-6 bg-gradient-to-b from-green-400 to-blue-400 transform -translate-x-1/2"></div>
            )}
            </motion.div>
        ))}
        </div>
        </div>
        </motion.div>
        </div>

        {/* Terminal Output */}
        <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        >
        <div className="terminal-window max-w-4xl mx-auto">
        <div className="terminal-header">
        <div className="terminal-buttons">
        <div className="terminal-button terminal-red"></div>
        <div className="terminal-button terminal-yellow"></div>
        <div className="terminal-button terminal-green"></div>
        </div>
        <span className="text-green-400 text-sm ml-4">PROFILE_SCANNER</span>
        </div>

        <div className="terminal-content">
        <div className="text-blue-400">fahad@codex:~$ cat profile_summary.txt</div>
        <div className="text-green-400 mt-2 space-y-1">
        <div>Neural pathways: OPTIMIZED</div>
        <div>Skill matrix: EXPANDING</div>
        <div>Code efficiency: 97.3%</div>
        <div>Innovation index: MAXIMUM</div>
        <div>Status: READY FOR DEPLOYMENT</div>
        </div>
        </div>
        </div>
        </motion.div>
        </div>
        </section>
    );
};

export default ProfileSection;
