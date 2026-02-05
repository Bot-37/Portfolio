import { motion } from 'framer-motion';
import { useState } from 'react';
import EliasAvatar from './EliasAvatar';
import TypingEffect from './TypingEffect';
import ParallaxBackground from './ParallaxBackground';
import ProfileSection from './ProfileSection';
import ProjectsSection from './ProjectsSection';
import TechArsenal from './TechArsenal';
import GitHubSection from './GitHubSection';
import ContactSection from './ContactSection';
import HackerTerminal from './HackerTerminal';

interface LandingPageProps {
    callSign: string;
}

const LandingPage = ({ callSign }: LandingPageProps) => {
    const [systemInitialized, setSystemInitialized] = useState(false);
    const [portfolioAccessed, setPortfolioAccessed] = useState(false);

    const handleInitializeSystem = () => {
        setSystemInitialized(true);
        const profileSection = document.getElementById('profile-section');
        if (profileSection) {
            profileSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAccessPortfolio = () => {
        setPortfolioAccessed(true);
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
        {/* Left Side - Elias Avatar */}
        <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex items-center justify-center order-2 xl:order-1"
        >
        <div className="w-full max-w-sm lg:max-w-md">
        <EliasAvatar />
        </div>
        </motion.div>

        {/* Right Side - Introduction */}
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="flex flex-col justify-center space-y-6 lg:space-y-8 order-1 xl:order-2"
        >
        <div className="terminal-window">
        <div className="terminal-header">
        <div className="terminal-buttons">
        <div className="terminal-button terminal-red"></div>
        <div className="terminal-button terminal-yellow"></div>
        <div className="terminal-button terminal-green"></div>
        </div>
        <span className="text-green-400 text-sm ml-4">NEURAL_INTERFACE</span>
        </div>

        <div className="terminal-content">
        <div className="text-blue-400 text-sm">fahad@codex:~$</div>
        <TypingEffect
        text={`Welcome back, ${callSign.toUpperCase()}.`}
        className="text-xl sm:text-2xl text-green-400 font-bold mb-2"
        delay={1000}
        />
        <TypingEffect
        text="I'm Fahad - Engineer. Hacker. Storyteller. AI Architect."
        className="text-lg sm:text-xl text-blue-300 mb-4"
        delay={2200}
        />
        <TypingEffect
        text="> Neural pathways synchronized. Systems online._"
        className="text-green-400 text-sm"
        delay={3800}
        />
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
        className="quantum-button"
        disabled={systemInitialized}
        >
        {systemInitialized ? '◉ SYSTEMS ONLINE' : '◎ Initialize Systems'}
        </button>

        <button
        onClick={handleAccessPortfolio}
        className="quantum-button"
        disabled={portfolioAccessed}
        >
        {portfolioAccessed ? '◉ PORTFOLIO LIVE' : '◎ Access Portfolio'}
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

        {/* Hacker Terminal Section */}
        <div id="hacker-terminal-section">
        <HackerTerminal />
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
