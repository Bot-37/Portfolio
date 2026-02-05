
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TechArsenal = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const techStack = [
    {
      name: "Python",
      icon: "🐍",
      category: "Primary Weapon",
      power: 95,
      ammo: "∞",
      rarity: "Legendary",
      projects: ["Credit Card Fraud Detection AI", "Telegram Downloader", "Hexphyr OS Setup"],
      description: "High-damage AI/ML weapon system with unlimited versatility",
      stats: {
        accuracy: 98,
        damage: 95,
        range: 92,
        fireRate: 88,
        mobility: 85,
        control: 90
      },
      attachments: {
        muzzle: "TensorFlow Suppressor",
        barrel: "Scikit-learn Extended",
        optic: "Pandas Scope 3-6x",
        stock: "NumPy Tactical",
        underbarrel: "Django Foregrip",
        magazine: "Flask Extended Mag",
        ammunition: "FastAPI Rounds",
        rearGrip: "SQLAlchemy Grip",
        perk: "Machine Learning",
        perk2: "Deep Learning"
      }
    },
    {
      name: "Java",
      icon: "☕",
      category: "Heavy Assault",
      power: 90,
      ammo: "∞",
      rarity: "Epic",
      projects: ["JavaFX Face Recognition"],
      description: "Enterprise-grade heavy weapon for sustained combat",
      stats: {
        accuracy: 92,
        damage: 90,
        range: 88,
        fireRate: 75,
        mobility: 70,
        control: 85
      },
      attachments: {
        muzzle: "Spring Boot Suppressor",
        barrel: "Maven Extended",
        optic: "Hibernate Scope",
        stock: "JPA Tactical",
        underbarrel: "Spring Security",
        magazine: "Gradle Extended",
        ammunition: "Microservices",
        rearGrip: "Enterprise Grip",
        perk: "Object Oriented",
        perk2: "Multithreading"
      }
    },
    {
      name: "React",
      icon: "⚛️",
      category: "Tactical Interface",
      power: 92,
      ammo: "∞",
      rarity: "Legendary",
      projects: ["Portfolio Website", "Neural Interface Systems"],
      description: "Advanced UI warfare system with component modularity",
      stats: {
        accuracy: 94,
        damage: 88,
        range: 95,
        fireRate: 92,
        mobility: 90,
        control: 87
      },
      attachments: {
        muzzle: "TypeScript Suppressor",
        barrel: "Next.js Extended",
        optic: "Redux Scope",
        stock: "Hooks Tactical",
        underbarrel: "Context API",
        magazine: "Component Library",
        ammunition: "JSX Rounds",
        rearGrip: "State Management",
        perk: "Virtual DOM",
        perk2: "Component Reusability"
      }
    },
    {
      name: "C++",
      icon: "🔧",
      category: "Precision Rifle",
      power: 88,
      ammo: "∞",
      rarity: "Epic",
      projects: ["Performance Critical Systems"],
      description: "High-precision weapon for critical system operations",
      stats: {
        accuracy: 96,
        damage: 92,
        range: 85,
        fireRate: 70,
        mobility: 75,
        control: 88
      },
      attachments: {
        muzzle: "STL Suppressor",
        barrel: "Boost Extended",
        optic: "Template Scope",
        stock: "RAII Tactical",
        underbarrel: "Smart Pointer",
        magazine: "Vector Container",
        ammunition: "Optimized Code",
        rearGrip: "Memory Management",
        perk: "Low Level Control",
        perk2: "High Performance"
      }
    },
    {
      name: "Linux",
      icon: "🐧",
      category: "Command Center",
      power: 95,
      ammo: "∞",
      rarity: "Legendary",
      projects: ["Hexphyr OS", "System Administration"],
      description: "Complete battlefield control and system domination",
      stats: {
        accuracy: 97,
        damage: 95,
        range: 100,
        fireRate: 85,
        mobility: 92,
        control: 98
      },
      attachments: {
        muzzle: "Bash Suppressor",
        barrel: "Shell Script Extended",
        optic: "Terminal Scope",
        stock: "Kernel Tactical",
        underbarrel: "SystemD Foregrip",
        magazine: "Package Manager",
        ammunition: "Command Line",
        rearGrip: "Root Access",
        perk: "System Control",
        perk2: "Open Source"
      }
    },
    {
      name: "Docker",
      icon: "🐳",
      category: "Deployment Pod",
      power: 85,
      ammo: "∞",
      rarity: "Rare",
      projects: ["Container Warfare", "Deployment Systems"],
      description: "Rapid deployment system for scalable operations",
      stats: {
        accuracy: 90,
        damage: 82,
        range: 88,
        fireRate: 95,
        mobility: 98,
        control: 85
      },
      attachments: {
        muzzle: "Compose Suppressor",
        barrel: "Registry Extended",
        optic: "Kubernetes Scope",
        stock: "Swarm Tactical",
        underbarrel: "Volume Mount",
        magazine: "Image Layer",
        ammunition: "Containerized Apps",
        rearGrip: "Orchestration",
        perk: "Portability",
        perk2: "Scalability"
      }
    },
    {
      name: "JavaScript",
      icon: "🟨",
      category: "Versatile SMG",
      power: 87,
      ammo: "∞",
      rarity: "Epic",
      projects: ["Frontend Interfaces", "Node.js Backend"],
      description: "High-mobility weapon for rapid development",
      stats: {
        accuracy: 85,
        damage: 80,
        range: 90,
        fireRate: 95,
        mobility: 95,
        control: 82
      },
      attachments: {
        muzzle: "ES6+ Suppressor",
        barrel: "Node.js Extended",
        optic: "Async/Await Scope",
        stock: "Framework Tactical",
        underbarrel: "Promise Foregrip",
        magazine: "NPM Registry",
        ammunition: "Event-Driven",
        rearGrip: "Callback Handler",
        perk: "Dynamic Typing",
        perk2: "Event Loop"
      }
    },
    {
      name: "MySQL",
      icon: "🗄️",
      category: "Data Arsenal",
      power: 83,
      ammo: "∞",
      rarity: "Rare",
      projects: ["Database Systems", "Data Analytics"],
      description: "Reliable data storage and retrieval weapon",
      stats: {
        accuracy: 88,
        damage: 85,
        range: 80,
        fireRate: 78,
        mobility: 70,
        control: 90
      },
      attachments: {
        muzzle: "Query Optimizer",
        barrel: "Index Extended",
        optic: "Relational Scope",
        stock: "ACID Tactical",
        underbarrel: "Join Foregrip",
        magazine: "Transaction Log",
        ammunition: "SQL Queries",
        rearGrip: "Data Integrity",
        perk: "ACID Compliance",
        perk2: "Relational Model"
      }
    },
    {
      name: "Git",
      icon: "🌿",
      category: "Version Control",
      power: 90,
      ammo: "∞",
      rarity: "Epic",
      projects: ["All Projects", "Code Management"],
      description: "Time manipulation weapon for code versioning",
      stats: {
        accuracy: 95,
        damage: 88,
        range: 92,
        fireRate: 85,
        mobility: 88,
        control: 95
      },
      attachments: {
        muzzle: "Branch Suppressor",
        barrel: "Merge Extended",
        optic: "Diff Scope",
        stock: "Commit Tactical",
        underbarrel: "Rebase Foregrip",
        magazine: "Repository",
        ammunition: "Code Changes",
        rearGrip: "Version History",
        perk: "Distributed VCS",
        perk2: "Branch Management"
      }
    },
    {
      name: "AWS",
      icon: "☁️",
      category: "Cloud Artillery",
      power: 86,
      ammo: "∞",
      rarity: "Epic",
      projects: ["Cloud Infrastructure", "Scalable Apps"],
      description: "Heavy artillery for cloud-based operations",
      stats: {
        accuracy: 87,
        damage: 85,
        range: 98,
        fireRate: 80,
        mobility: 85,
        control: 83
      },
      attachments: {
        muzzle: "EC2 Suppressor",
        barrel: "Lambda Extended",
        optic: "CloudWatch Scope",
        stock: "S3 Tactical",
        underbarrel: "RDS Foregrip",
        magazine: "Auto Scaling",
        ammunition: "Microservices",
        rearGrip: "Load Balancer",
        perk: "Global Scale",
        perk2: "High Availability"
      }
    },
    {
      name: "HTML",
      icon: "📄",
      category: "Foundation Framework",
      power: 80,
      ammo: "∞",
      rarity: "Common",
      projects: ["Web Foundations", "Markup Systems"],
      description: "Essential structural weapon for web warfare",
      stats: {
        accuracy: 85,
        damage: 75,
        range: 85,
        fireRate: 90,
        mobility: 88,
        control: 95
      },
      attachments: {
        muzzle: "Semantic Suppressor",
        barrel: "HTML5 Extended",
        optic: "Accessibility Scope",
        stock: "Standards Tactical",
        underbarrel: "Form Handler",
        magazine: "Element Library",
        ammunition: "Markup Tags",
        rearGrip: "DOM Structure",
        perk: "Semantic Web",
        perk2: "Cross Platform"
      }
    },
    {
      name: "CSS",
      icon: "🎨",
      category: "Style Warfare",
      power: 84,
      ammo: "∞",
      rarity: "Rare",
      projects: ["UI Styling", "Responsive Design"],
      description: "Visual enhancement weapon for aesthetic dominance",
      stats: {
        accuracy: 82,
        damage: 78,
        range: 88,
        fireRate: 92,
        mobility: 90,
        control: 85
      },
      attachments: {
        muzzle: "Flexbox Suppressor",
        barrel: "Grid Extended",
        optic: "Media Query Scope",
        stock: "Animation Tactical",
        underbarrel: "Responsive Foregrip",
        magazine: "Style Sheets",
        ammunition: "Design Rules",
        rearGrip: "Layout Control",
        perk: "Visual Design",
        perk2: "Responsive Layout"
      }
    },
    {
      name: "GitHub",
      icon: "🐙",
      category: "Collaboration Hub",
      power: 88,
      ammo: "∞",
      rarity: "Epic",
      projects: ["Open Source", "Team Projects"],
      description: "Social coding weapon for collaborative warfare",
      stats: {
        accuracy: 90,
        damage: 85,
        range: 95,
        fireRate: 88,
        mobility: 92,
        control: 90
      },
      attachments: {
        muzzle: "Pull Request Suppressor",
        barrel: "Actions Extended",
        optic: "Issue Tracker",
        stock: "Pages Tactical",
        underbarrel: "Workflow Foregrip",
        magazine: "Repository Hub",
        ammunition: "Collaborative Code",
        rearGrip: "Social Coding",
        perk: "Open Source",
        perk2: "CI/CD Pipeline"
      }
    },
    {
      name: "C",
      icon: "⚙️",
      category: "System Core",
      power: 85,
      ammo: "∞",
      rarity: "Epic",
      projects: ["System Programming", "Embedded Systems"],
      description: "Low-level system weapon for hardware interaction",
      stats: {
        accuracy: 94,
        damage: 90,
        range: 75,
        fireRate: 68,
        mobility: 72,
        control: 92
      },
      attachments: {
        muzzle: "Compiler Suppressor",
        barrel: "Standard Library",
        optic: "Memory Scope",
        stock: "Pointer Tactical",
        underbarrel: "System Call",
        magazine: "Header Files",
        ammunition: "Machine Code",
        rearGrip: "Memory Management",
        perk: "Hardware Control",
        perk2: "System Level"
      }
    }
  ];

  const selectedTech = techStack[selectedIndex];

  const nextWeapon = () => {
    setSelectedIndex((prev) => (prev + 1) % techStack.length);
  };

  const prevWeapon = () => {
    setSelectedIndex((prev) => (prev - 1 + techStack.length) % techStack.length);
  };

  const getStatColor = (value: number) => {
    if (value >= 90) return 'text-green-400';
    if (value >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

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
    WEAPON CUSTOMIZATION
    </h2>
    <div className="text-center">
    <div className="inline-block holographic-display p-4">
    <p className="text-green-400 font-mono text-sm">
    [ARMORY] Select weapon for modification. Max Level {Math.max(...techStack.map(t => t.power))}
    </p>
    </div>
    </div>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
    {/* Weapon Selection */}
    <div className="lg:col-span-1">
    <div className="war-table">
    <div className="war-table-content">
    <h3 className="text-xl font-mono text-blue-400 mb-6 glow-text">Arsenal</h3>
    <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
    {techStack.map((tech, index) => (
      <motion.div
      key={tech.name}
      className={`weapon-slot cursor-pointer p-3 rounded ${selectedIndex === index ? 'selected bg-blue-400/20' : 'bg-gray-800/50'} border border-green-400/30 hover:border-green-400`}
      onClick={() => setSelectedIndex(index)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      >
      <div className="flex items-center gap-3">
      <div className="text-2xl">{tech.icon}</div>
      <div className="flex-1">
      <div className="text-green-400 font-mono text-sm font-bold">{tech.name}</div>
      <div className="text-blue-300 text-xs">{tech.category}</div>
      </div>
      <div className="text-yellow-400 text-xs font-mono">LV.{tech.power}</div>
      </div>
      </motion.div>
    ))}
    </div>

    <div className="flex justify-between items-center mt-6">
    <button onClick={prevWeapon} className="quantum-button p-2">
    <ChevronLeft className="w-5 h-5" />
    </button>
    <span className="text-green-400 font-mono text-sm">
    {selectedIndex + 1} / {techStack.length}
    </span>
    <button onClick={nextWeapon} className="quantum-button p-2">
    <ChevronRight className="w-5 h-5" />
    </button>
    </div>
    </div>
    </div>
    </div>

    {/* Main Weapon Display */}
    <div className="lg:col-span-3">
    <AnimatePresence mode="wait">
    <motion.div
    key={selectedTech.name}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="bg-black/80 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm"
    >
    {/* Header */}
    <div className="flex justify-between items-start mb-6">
    <div className="flex items-center gap-4">
    <div className="text-6xl">{selectedTech.icon}</div>
    <div>
    <h3 className="text-3xl font-mono text-green-400 glow-text">{selectedTech.name}</h3>
    <p className="text-blue-400 text-sm font-mono">{selectedTech.category}</p>
    <div className={`inline-block px-2 py-1 rounded text-xs font-mono mt-1 ${
      selectedTech.rarity === 'Legendary' ? 'bg-yellow-400/20 text-yellow-400' :
      selectedTech.rarity === 'Epic' ? 'bg-purple-400/20 text-purple-400' :
      selectedTech.rarity === 'Rare' ? 'bg-blue-400/20 text-blue-400' : 'bg-gray-400/20 text-gray-400'
    }`}>
    {selectedTech.rarity}
    </div>
    </div>
    </div>
    <div className="text-right">
    <div className="text-yellow-400 font-mono text-sm">Weapon Max Level {selectedTech.power}</div>
    <div className="text-green-400 font-mono text-xs">Equipped 10/10</div>
    </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Attachments */}
    <div>
    <h4 className="text-lg font-mono text-blue-400 mb-4 glow-text">ATTACHMENTS</h4>
    <div className="grid grid-cols-2 gap-3">
    {Object.entries(selectedTech.attachments).map(([type, attachment], index) => (
      <motion.div
      key={type}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gray-800/50 border border-green-400/30 rounded p-2"
      >
      <div className="text-green-400 text-xs font-mono uppercase">{type}</div>
      <div className="text-white text-xs">{attachment}</div>
      <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1"></div>
      </motion.div>
    ))}
    </div>
    </div>

    {/* Stats */}
    <div>
    <h4 className="text-lg font-mono text-blue-400 mb-4 glow-text">WEAPON STATS</h4>
    <div className="space-y-3">
    {Object.entries(selectedTech.stats).map(([stat, value]) => (
      <div key={stat} className="flex items-center justify-between">
      <span className="text-gray-300 text-sm font-mono capitalize">{stat}</span>
      <div className="flex items-center gap-2 flex-1 mx-4">
      <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
      <motion.div
      className={`h-full ${value >= 90 ? 'bg-green-400' : value >= 75 ? 'bg-yellow-400' : 'bg-red-400'}`}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.8, delay: 0.2 }}
      />
      </div>
      <span className={`text-sm font-mono min-w-[3rem] ${getStatColor(value)}`}>
      {value}
      </span>
      </div>
      </div>
    ))}
    </div>

    {/* Projects */}
    <div className="mt-6">
    <h5 className="text-blue-400 font-mono text-sm mb-3">Combat Deployments</h5>
    <div className="space-y-2">
    {selectedTech.projects.map((project, idx) => (
      <div key={idx} className="flex items-center gap-2 text-xs">
      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
      <span className="text-gray-300">{project}</span>
      </div>
    ))}
    </div>
    </div>
    </div>
    </div>

    {/* Save Custom Mod */}
    <div className="mt-6 pt-4 border-t border-green-400/20">
    <div className="flex items-center justify-between">
    <div>
    <div className="text-green-400 font-mono text-sm">💾 Save a Custom Mod</div>
    <div className="text-gray-400 text-xs">Used Custom Modification Slots: 0/5</div>
    </div>
    <button className="quantum-button">
    Save Configuration
    </button>
    </div>
    </div>
    </motion.div>
    </AnimatePresence>
    </div>
    </div>
    </div>
    </section>
  );
};

export default TechArsenal;
