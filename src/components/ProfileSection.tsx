
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, Calendar, MapPin, ExternalLink } from 'lucide-react';

const ProfileSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    const personalInfo = {
        email: "fahadfaz0708@gmail.com",
        phone: "+91 (848) 994-1091",
        birthday: "August 07, 2005",
        location: "Coimbatore, Tamil Nadu, INDIA",
        linkedin: "https://www.linkedin.com/in/bot37/",
        github: "https://github.com/Bot-37"
    };

    const education = [
        {
            institution: "Anna University Regional Campus - Coimbatore",
            period: "2024 — 2027",
            description: "My academic journey took an unexpected turn when personal circumstances led me to transfer from my initial college. This transition proved to be a pivotal moment, opening doors to a more prestigious institution where my technical skills and professional network flourished beyond what I had imagined possible. The challenges of adapting to a new academic environment only strengthened my resilience and commitment to excellence."
        },
        {
            institution: "University College Of Engineering - Thirukkuvalai",
            period: "2023 — 2024",
            description: "Stepping into college was a journey filled with curiosity, challenges, and growth. From endless coding sessions to late-night project discussions, every moment was a step closer to shaping my future. Friendships were forged, lessons were learned, and memories were made that will last a lifetime."
        },
        {
            institution: "R.C. Fatima Matric H.R. Sec. School",
            period: "2021 — 2023",
            description: "Successfully completed high school with a focus on Computer Science, Physics, Chemistry, Math."
        }
    ];

    return (
        <section className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
        <motion.h2
        className="text-4xl font-mono text-center mb-16 text-green-400 glow-text"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        >
        ./profile --init
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 3D Hologram Profile Photo */}
        <motion.div
        className="lg:col-span-1 flex justify-center"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        >
        <div className="relative">
        {/* Hologram Base */}
        <motion.div
        className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-green-400/20 backdrop-blur-lg border-2 border-green-400/50 relative overflow-hidden"
        animate={{
            boxShadow: isHovered
            ? "0 0 80px rgba(34, 197, 94, 0.6), 0 0 120px rgba(59, 130, 246, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)"
            : "0 0 40px rgba(34, 197, 94, 0.4), 0 0 80px rgba(59, 130, 246, 0.2)"
        }}
        >
        {/* Actual Profile Image */}
        <div className="absolute inset-4 rounded-full overflow-hidden">
        <img
        src="/Images/profile.png"
        alt="Fahad Profile"
        className="w-full h-full object-cover"
        />
        </div>

        {/* Holographic Scan Lines */}
        <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Projection Effects */}
        {isHovered && (
            <>
            <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-green-400"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            />
            <motion.div
            className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            />
            </>
        )}
        </motion.div>

        {/* Floating Light Projections */}
        {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                                          top: `${Math.random() * 100}%`,
                }}
                animate={{
                    y: [-20, -40, -20],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                }}
                />
            ))}
            </div>
        )}
        </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
        className="lg:col-span-2 space-y-6"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        >
        <div className="glass-card bg-black/40 backdrop-blur-md border border-blue-400/30 rounded-lg p-8">
        <h3 className="text-2xl font-mono text-green-400 mb-4">./whoami</h3>
        <div className="space-y-4 text-gray-300">
        <p>
        Engineer with a passion for cutting-edge technology and ethical hacking.
        I specialize in AI architecture, system security, and creating innovative solutions
        that bridge the gap between human needs and machine capabilities.
        </p>
        <p>
        When I'm not coding or exploring new technologies, you'll find me optimizing
        my fitness routine or setting up the perfect development environment.
        </p>
        </div>

        {/* Contact Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-green-400">
        <Mail className="w-4 h-4" />
        <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-400 transition-colors">
        {personalInfo.email}
        </a>
        </div>
        <div className="flex items-center gap-2 text-green-400">
        <Phone className="w-4 h-4" />
        <span>{personalInfo.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-green-400">
        <Calendar className="w-4 h-4" />
        <span>{personalInfo.birthday}</span>
        </div>
        <div className="flex items-center gap-2 text-green-400">
        <MapPin className="w-4 h-4" />
        <span>{personalInfo.location}</span>
        </div>
        <div className="flex items-center gap-2 text-blue-400">
        <ExternalLink className="w-4 h-4" />
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
        LinkedIn
        </a>
        </div>
        <div className="flex items-center gap-2 text-blue-400">
        <ExternalLink className="w-4 h-4" />
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
        GitHub
        </a>
        </div>
        </div>
        </div>

        {/* Education Section */}
        <div className="glass-card bg-black/40 backdrop-blur-md border border-blue-400/30 rounded-lg p-8">
        <h3 className="text-2xl font-mono text-green-400 mb-6">./education --list</h3>
        <div className="space-y-6">
        {education.map((edu, index) => (
            <motion.div
            key={index}
            className="border-l-2 border-green-400/30 pl-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            >
            <h4 className="text-lg font-mono text-blue-400">{edu.institution}</h4>
            <p className="text-green-400 text-sm mb-2">{edu.period}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{edu.description}</p>
            </motion.div>
        ))}
        </div>
        </div>
        </motion.div>
        </div>

        {/* Terminal Section */}
        <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        >
        <div className="terminal-window bg-black/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center mb-4 gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-green-400 text-sm ml-4 font-mono">bash</span>
        </div>

        <div className="space-y-2 font-mono text-sm">
        <div className="text-blue-400">fahad@elias:~$ whoami</div>
        <div className="text-green-400 ml-4">
        fahad --role="engineer" --skills="ai,dev,hack,fitness" --status="online"
        </div>

        <div className="text-blue-400 mt-4">fahad@elias:~$ cat ~/.profile</div>
        <div className="text-green-400 ml-4 space-y-1">
        <div>export NAME="Fahad"</div>
        <div>export ROLE="Full Stack Engineer & AI Architect"</div>
        <div>export INTERESTS=("Ethical Hacking" "AI Development" "Fitness" "System Optimization")</div>
        <div>export MOTTO="Code with Purpose, Hack with Ethics, Live with Discipline"</div>
        </div>

        <div className="text-blue-400 mt-4">fahad@elias:~$ sudo systemctl status motivation</div>
        <div className="text-green-400 ml-4">
        ● motivation.service - Personal Drive Engine<br/>
        &nbsp;&nbsp;&nbsp;Loaded: loaded (/etc/systemd/system/motivation.service; enabled)<br/>
        &nbsp;&nbsp;&nbsp;Active: active (running) since birth<br/>
        &nbsp;&nbsp;&nbsp;Status: "Building the future, one commit at a time"
        </div>
        </div>
        </div>
        </motion.div>
        </div>
        </section>
    );
};

export default ProfileSection;
