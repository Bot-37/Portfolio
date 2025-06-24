
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const projects = [
        {
            id: 1,
            title: "Credit Card Fraud Detection AI",
            description: "Machine learning system for real-time fraud detection",
            tech: ["Python", "TensorFlow", "Scikit-learn", "Docker"],
            category: "AI/ML",
            status: "Production"
        },
        {
            id: 2,
            title: "Elias Human-like Bot",
            description: "Advanced conversational AI with personality",
            tech: ["GPT-4", "Node.js", "React", "WebRTC"],
            category: "AI/Chat",
            status: "Active"
        },
        {
            id: 3,
            title: "Telegram Downloader",
            description: "High-speed media extraction tool",
            tech: ["Python", "Telegram API", "AsyncIO"],
            category: "Utility",
            status: "Complete"
        },
        {
            id: 4,
            title: "JavaFX Face Recognition",
            description: "Real-time facial recognition system",
            tech: ["Java", "JavaFX", "OpenCV", "ML"],
            category: "Computer Vision",
            status: "Complete"
        },
        {
            id: 5,
            title: "Hexphyr OS Setup",
            description: "Custom Linux distribution configuration",
            tech: ["Linux", "Bash", "Python", "Docker"],
            category: "System",
            status: "Ongoing"
        },
        {
            id: 6,
            title: "Hackintosh EFI Build",
            description: "macOS compatibility layer for PC hardware",
            tech: ["OpenCore", "Kext", "ACPI", "Assembly"],
            category: "System",
            status: "Stable"
        }
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
        ./projects --list-all
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
            <motion.div
            key={project.id}
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
            >
            <div className="hud-card glass-card bg-black/40 backdrop-blur-md border border-blue-400/30 rounded-lg p-6 h-full relative overflow-hidden">
            {/* HUD Corner Elements */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-green-400 opacity-60"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-green-400 opacity-60"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-400 opacity-60"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-400 opacity-60"></div>

            {/* Status Indicator */}
            <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-blue-400 px-2 py-1 bg-blue-400/10 rounded border border-blue-400/30">
            {project.category}
            </span>
            <motion.div
            className="flex items-center gap-2"
            animate={{
                opacity: hoveredProject === project.id ? 1 : 0.6
            }}
            >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">{project.status}</span>
            </motion.div>
            </div>

            {/* Project Title */}
            <h3 className="text-xl font-mono text-green-400 mb-3 group-hover:text-white transition-colors">
            {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
                <span
                key={techIndex}
                className="text-xs px-2 py-1 bg-green-400/10 text-green-400 rounded border border-green-400/20 font-mono"
                >
                {tech}
                </span>
            ))}
            </div>

            {/* Action Buttons - Appear on Hover */}
            <motion.div
            className="flex gap-3 mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{
                opacity: hoveredProject === project.id ? 1 : 0,
                y: hoveredProject === project.id ? 0 : 10
            }}
            transition={{ duration: 0.2 }}
            >
            <button className="flex items-center gap-2 px-3 py-2 bg-green-400/10 hover:bg-green-400/20 border border-green-400/30 rounded text-green-400 text-xs transition-all">
            <Github className="w-3 h-3" />
            Code
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/30 rounded text-blue-400 text-xs transition-all">
            <ExternalLink className="w-3 h-3" />
            Demo
            </button>
            </motion.div>

            {/* Hover Effect Overlay */}
            <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            />

            {/* Scanning Line Effect */}
            {hoveredProject === project.id && (
                <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                animate={{ y: [0, 300] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            )}
            </div>
            </motion.div>
        ))}
        </div>

        {/* Terminal Output */}
        <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        >
        <div className="terminal-window bg-black/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center mb-4 gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-green-400 text-sm ml-4 font-mono">bash</span>
        </div>

        <div className="space-y-2 font-mono text-sm">
        <div className="text-blue-400">fahad@elias:~$ ls -la ~/projects/</div>
        <div className="text-green-400 ml-4">
        total {projects.length}<br/>
        drwxr-xr-x  {projects.length} fahad users  4096 Dec 24 2024 .<br/>
        drwxr-xr-x  3 fahad users  4096 Dec 24 2024 ..<br/>
        {projects.map((project, index) => (
            <div key={index}>
            -rw-r--r--  1 fahad users  {Math.floor(Math.random() * 9000) + 1000} Dec {20 + index} 2024 {project.title.toLowerCase().replace(/\s+/g, '_')}/
            </div>
        ))}
        </div>

        <div className="text-blue-400 mt-4">fahad@elias:~$ git status</div>
        <div className="text-green-400 ml-4">
        On branch main<br/>
        Your branch is up to date with 'origin/main'.<br/>
        <span className="text-yellow-400">
        Changes not staged for commit:<br/>
        &nbsp;&nbsp;modified:   life.py (optimizing neural pathways)<br/>
        &nbsp;&nbsp;modified:   skills.json (adding new frameworks)<br/>
        </span>
        </div>
        </div>
        </div>
        </motion.div>
        </div>
        </section>
    );
};

export default ProjectsSection;
