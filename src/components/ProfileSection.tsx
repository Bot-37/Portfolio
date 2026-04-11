
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Calendar, ExternalLink, Download, CheckCircle, Linkedin, Github } from 'lucide-react';

const ProfileSection = () => {
    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'fahadfaz0708@gmail.com', href: 'mailto:fahadfaz0708@gmail.com' },
        { icon: Phone, label: 'Phone', value: '+91 848-994-1091', href: 'tel:+918489941091' },
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

    return (
        <section className="min-h-screen py-16 sm:py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Hero Bar — Quick Access for Recruiters ── */}
                <motion.div
                    className="mb-10 sm:mb-14"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="glass-card bg-black/60 border border-green-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-green-400 glow-border overflow-hidden">
                                <img
                                    src="/profile.png"
                                    alt="Fahad's Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Available badge */}
                            <span className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-black border border-green-400 text-green-400 text-[10px] font-mono px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                <CheckCircle className="w-2.5 h-2.5" />
                                Open
                            </span>
                        </div>

                        {/* Bio */}
                        <div className="text-center sm:text-left flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl font-mono text-green-400 glow-text font-bold">
                                FAHAD A
                            </h1>
                            <p className="text-blue-300 text-sm mt-0.5">Neural Network Architect · Code Warrior</p>
                            <p className="text-gray-400 text-xs font-mono mt-1 flex items-center gap-1 justify-center sm:justify-start">
                                <MapPin className="w-3 h-3" /> Coimbatore, Tamil Nadu, INDIA
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end flex-shrink-0">
                            <a
                                href="mailto:fahadfaz0708@gmail.com"
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-400/50 rounded-lg text-blue-300 hover:bg-blue-400/10 transition-all text-xs font-mono"
                            >
                                <Mail className="w-3 h-3" /> Email
                            </a>
                            <a
                                href="https://www.linkedin.com/in/bot37/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-600/50 rounded-lg text-blue-400 hover:bg-blue-600/10 transition-all text-xs font-mono"
                            >
                                <Linkedin className="w-3 h-3" /> LinkedIn
                            </a>
                            <a
                                href="https://github.com/Bot-37"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-600/10 transition-all text-xs font-mono"
                            >
                                <Github className="w-3 h-3" /> GitHub
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/15 border border-green-400/60 rounded-lg text-green-400 hover:bg-green-400/25 transition-all text-xs font-mono font-bold"
                            >
                                <Download className="w-3 h-3" /> Resume
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* ── Section Title ── */}
                <motion.div
                    className="text-center mb-10 sm:mb-14"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl sm:text-4xl font-mono text-green-400 glow-text mb-3">
                        ./profile --neural-scan
                    </h2>
                    <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded" />
                </motion.div>

                {/* ── Two-column layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">

                    {/* Left: Profile Card + Contact */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 sm:space-y-8"
                    >
                        {/* Profile display */}
                        <div className="holographic-display">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-4 border-green-400 glow-border overflow-hidden group">
                                    <img
                                        src="/profile.png"
                                        alt="Fahad's Profile"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl sm:text-2xl font-mono text-green-400 glow-text mb-1">FAHAD A</h3>
                                    <p className="text-blue-300 text-sm">Neural Network Architect | Code Warrior</p>
                                    {/* Available badge */}
                                    <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full border border-green-500/50 bg-green-500/10">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-green-400 text-xs font-mono">Available for opportunities</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Matrix */}
                        <div className="war-table">
                            <div className="war-table-content">
                                <h4 className="text-base sm:text-lg font-mono text-blue-400 mb-4 glow-text">Contact Matrix</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {contactInfo.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.08 }}
                                            className="hologram p-3 rounded-lg flex items-center gap-3 group"
                                        >
                                            <item.icon className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-gray-400 font-mono">{item.label}</div>
                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        className="text-green-400 hover:text-blue-400 transition-colors text-sm break-all group-hover:underline"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <div className="text-white text-sm">{item.value}</div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="holographic-display">
                            <h4 className="text-base sm:text-lg font-mono text-blue-400 mb-4 glow-text">Network Links</h4>
                            <div className="flex flex-wrap gap-3">
                                <motion.a
                                    href="https://www.linkedin.com/in/bot37/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="quantum-button flex items-center gap-2 text-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn
                                    <ExternalLink className="w-3 h-3" />
                                </motion.a>
                                <motion.a
                                    href="https://github.com/Bot-37"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="quantum-button flex items-center gap-2 text-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Github className="w-4 h-4" />
                                    GitHub
                                    <ExternalLink className="w-3 h-3" />
                                </motion.a>
                                <motion.a
                                    href="/resume.pdf"
                                    download
                                    className="quantum-button flex items-center gap-2 text-sm border-green-400/70 bg-green-400/5"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Education Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="holographic-display">
                            <h4 className="text-base sm:text-lg font-mono text-blue-400 mb-6 glow-text">Neural Development Log</h4>
                            <div className="space-y-5">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }}
                                        className="relative"
                                    >
                                        <div className="war-table">
                                            <div className="war-table-content">
                                                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                                    <h5 className="text-green-400 font-mono text-xs sm:text-sm font-bold leading-snug flex-1">
                                                        {edu.institution}
                                                    </h5>
                                                    <span className="text-blue-400 text-xs font-mono px-2 py-0.5 bg-blue-400/10 rounded border border-blue-400/30 flex-shrink-0 whitespace-nowrap">
                                                        {edu.period}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                                                    {edu.description}
                                                </p>
                                            </div>
                                        </div>

                                        {index < education.length - 1 && (
                                            <div className="absolute left-1/2 -bottom-3 w-px h-5 bg-gradient-to-b from-green-400 to-blue-400 -translate-x-1/2" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── Terminal Output ── */}
                <motion.div
                    className="mt-12 sm:mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="terminal-window max-w-2xl mx-auto">
                        <div className="terminal-header">
                            <div className="terminal-buttons">
                                <div className="terminal-button terminal-red" />
                                <div className="terminal-button terminal-yellow" />
                                <div className="terminal-button terminal-green" />
                            </div>
                            <span className="text-green-400 text-xs sm:text-sm ml-4 font-mono">PROFILE_SCANNER</span>
                        </div>
                        <div className="terminal-content text-xs sm:text-sm">
                            <div className="text-blue-400">fahad@codex:~$ cat profile_summary.txt</div>
                            <div className="text-green-400 mt-2 space-y-1">
                                <div>Neural pathways: OPTIMIZED</div>
                                <div>Skill matrix: EXPANDING</div>
                                <div>Code efficiency: 97.3%</div>
                                <div>Innovation index: MAXIMUM</div>
                                <div>Status: <span className="text-white font-bold">READY FOR DEPLOYMENT</span></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProfileSection;
