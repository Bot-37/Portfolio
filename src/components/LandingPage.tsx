import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Menu, X, User, Code2, FolderGit2, Github, Mail } from 'lucide-react';
import ParallaxBackground from './ParallaxBackground';
import ProfileSection from './ProfileSection';
import ProjectsSection from './ProjectsSection';
import TechArsenal from './TechArsenal';
import GitHubSection from './GitHubSection';
import ContactSection from './ContactSection';
import TerminalModal from './TerminalModal';
import ThemeToggle from './ThemeToggle';

interface LandingPageProps {
    callSign: string;
}

const NAV_LINKS = [
    { id: 'profile-section', label: 'Profile', icon: User },
    { id: 'tech-arsenal-section', label: 'Skills', icon: Code2 },
    { id: 'projects-section', label: 'Projects', icon: FolderGit2 },
    { id: 'github-section', label: 'GitHub', icon: Github },
    { id: 'contact-section', label: 'Contact', icon: Mail },
];

const LandingPage = ({ callSign }: LandingPageProps) => {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('profile-section');
    const [scrolled, setScrolled] = useState(false);

    const handleOpenTerminal = () => {
        setIsTerminalOpen(true);
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setMenuOpen(false);
    };

    // Track active section via IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        NAV_LINKS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Navbar shadow on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="relative min-h-screen app-shell overflow-x-hidden">
            <ParallaxBackground />

            {/* ── Sticky Navbar ── */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'theme-nav-shell'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Brand */}
                        <button
                            onClick={() => scrollToSection('profile-section')}
                            className="font-mono text-green-400 text-sm sm:text-base hover:text-white transition-colors font-bold tracking-wider"
                        >
                            &gt; FAHAD_A<span className="typing-cursor text-green-400">_</span>
                        </button>

                        {/* Desktop Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs transition-all duration-200 ${activeSection === id
                                            ? 'text-green-400 bg-green-400/10 border border-green-400/30'
                                            : 'text-gray-400 hover:text-green-300 hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {label}
                                </button>
                            ))}
                        </nav>

                        {/* Terminal + Hamburger */}
                        <div className="flex items-center gap-2">
                            <ThemeToggle compact className="hidden sm:flex" />
                            <button
                                onClick={handleOpenTerminal}
                                className="theme-toolbar-button hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs transition-all"
                            >
                                <Terminal className="w-3.5 h-3.5" />
                                Terminal
                            </button>
                            <button
                                onClick={() => setMenuOpen((v) => !v)}
                                className="theme-menu-button md:hidden rounded p-2 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="theme-mobile-menu md:hidden overflow-hidden"
                        >
                            <nav className="px-4 py-3 space-y-1">
                                <div className="pb-3">
                                    <ThemeToggle className="w-full justify-center" />
                                </div>
                                {NAV_LINKS.map(({ id, label, icon: Icon }) => (
                                    <button
                                        key={id}
                                        onClick={() => scrollToSection(id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded font-mono text-sm transition-all ${activeSection === id
                                                ? 'text-green-400 bg-green-400/10 border border-green-400/20'
                                                : 'text-gray-400 hover:text-green-300 hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </button>
                                ))}
                                <button
                                    onClick={() => { handleOpenTerminal(); setMenuOpen(false); }}
                                    className="theme-toolbar-button w-full flex items-center gap-3 rounded px-3 py-2.5 font-mono text-sm transition-all"
                                >
                                    <Terminal className="w-4 h-4" />
                                    Open Terminal
                                </button>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Main Content — offset by navbar height */}
            <main className="relative z-10 pt-14 sm:pt-16">
                <div id="profile-section">
                    <ProfileSection />
                </div>
                <div id="tech-arsenal-section">
                    <TechArsenal />
                </div>
                <div id="projects-section">
                    <ProjectsSection />
                </div>
                <div id="github-section">
                    <GitHubSection />
                </div>
                <div id="contact-section">
                    <ContactSection />
                </div>
            </main>

            {/* Floating Terminal Button (mobile only when menu closed) */}
            <motion.button
                className="theme-fab fixed bottom-6 right-6 z-50 p-3.5 sm:p-4 rounded-full transition-all group"
                onClick={handleOpenTerminal}
                whileHover={{ rotate: 15 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                title="Open Terminal"
            >
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="theme-tooltip absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    ACCESS_TERMINAL
                </span>
            </motion.button>

            {/* Terminal Modal */}
            <TerminalModal
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
            />
        </div>
    );
};

export default LandingPage;
