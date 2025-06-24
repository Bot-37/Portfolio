
import { motion } from 'framer-motion';
import EliasAvatar from './EliasAvatar';
import TypingEffect from './TypingEffect';
import ParallaxBackground from './ParallaxBackground';
import ProfileSection from './ProfileSection';
import ProjectsSection from './ProjectsSection';
import TechArsenal from './TechArsenal';
import GitHubSection from './GitHubSection';
import ContactSection from './ContactSection';
import { useState } from 'react';

const LandingPage = () => {
    const [systemInitialized, setSystemInitialized] = useState(false);
    const [portfolioAccessed, setPortfolioAccessed] = useState(false);

    const handleInitializeSystem = () => {
        setSystemInitialized(true);
        // Scroll to profile section
        const profileSection = document.getElementById('profile-section');
        if (profileSection) {
            profileSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAccessPortfolio = () => {
        setPortfolioAccessed(true);
        // Scroll to projects section
        const projectsSection = document.getElementById('projects-section');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        <ParallaxBackground />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto w-full items-center">
        {/* Left Side - Elias Avatar - Better positioning */}
        <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex items-center justify-center order-2 xl:order-1 xl:justify-end"
        >
        <div className="w-full max-w-md xl:max-w-lg">
        <EliasAvatar />
        </div>
        </motion.div>

        {/* Right Side - Introduction */}
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="flex flex-col justify-center space-y-6 lg:space-y-8 order-1 xl:order-2 xl:pl-8"
        >
        <div className="terminal-window bg-black/60 backdrop-blur-md border border-blue-400/30 rounded-lg p-4 sm:p-6">
        <div className="flex items-center mb-3 sm:mb-4 gap-2">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        <span className="text-green-400 text-xs sm:text-sm ml-2 sm:ml-4 font-mono">bash</span>
        </div>

        <div className="space-y-3 sm:space-y-4 font-mono">
        <div className="text-blue-400 text-sm sm:text-base">fahad@elias:~$</div>
        <TypingEffect
        text="Hi, I'm Fahad."
        className="text-xl sm:text-2xl lg:text-3xl xl:text-2xl text-green-400 font-bold"
        delay={1000}
        />
        <TypingEffect
        text="Engineer. Hacker. Storyteller. AI Architect."
        className="text-lg sm:text-xl lg:text-2xl xl:text-xl text-blue-300"
        delay={2200}
        />
        <div className="pt-2 sm:pt-4">
        <TypingEffect
        text="> Welcome to my digital realm_"
        className="text-green-400 text-sm sm:text-base lg:text-lg"
        delay={3800}
        />
        </div>
        </div>
        </div>

        {/* Action Buttons */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 4.5 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
        <button
        onClick={handleInitializeSystem}
        className="quantum-button group relative px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-mono overflow-hidden"
        disabled={systemInitialized}
        >
        <div className="quantum-core absolute inset-0 bg-gradient-to-r from-green-400/10 via-cyan-400/20 to-green-400/10"></div>
        <div className="quantum-shell absolute inset-0 border border-green-400/50 rounded-lg"></div>
        <div className="quantum-energy absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        <div className="quantum-particles absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        </div>
        <span className="relative z-10 text-green-400 group-hover:text-white transition-colors duration-300">
        {systemInitialized ? '◉ SYSTEM ONLINE' : '◎ Initialize Systems'}
        </span>
        <div className="quantum-glow absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <button
        onClick={handleAccessPortfolio}
        className="neural-button group relative px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-mono overflow-hidden"
        disabled={portfolioAccessed}
        >
        <div className="neural-core absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/20 to-blue-400/10"></div>
        <div className="neural-mesh absolute inset-0 border border-blue-400/50 rounded-lg"></div>
        <div className="neural-pulse absolute inset-0">
        <div className="pulse-ring"></div>
        <div className="pulse-ring pulse-delay-1"></div>
        <div className="pulse-ring pulse-delay-2"></div>
        </div>
        <div className="neural-synapses absolute inset-0">
        <div className="synapse synapse-1"></div>
        <div className="synapse synapse-2"></div>
        <div className="synapse synapse-3"></div>
        <div className="synapse synapse-4"></div>
        </div>
        <span className="relative z-10 text-blue-400 group-hover:text-white transition-colors duration-300">
        {portfolioAccessed ? '◉ PORTFOLIO LIVE' : '◎ Access Portfolio'}
        </span>
        <div className="neural-field absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        </motion.div>
        </motion.div>
        </div>
        </section>

        {/* Profile Section */}
        <div id="profile-section">
        <ProfileSection />
        </div>

        {/* Tech Arsenal Section */}
        <div id="tech-arsenal-section">
        <TechArsenal />
        </div>

        {/* Projects Section */}
        <div id="projects-section">
        <ProjectsSection />
        </div>

        {/* GitHub Section */}
        <div id="github-section">
        <GitHubSection />
        </div>

        {/* Contact Section */}
        <div id="contact-section">
        <ContactSection />
        </div>
        </div>
    );
};

export default LandingPage;
