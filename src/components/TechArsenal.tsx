
import { motion } from 'framer-motion';
import { useState } from 'react';

const TechArsenal = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const techStack = [
    {
      name: "Python",
      icon: "🐍",
      category: "Programming",
      power: 95,
      projects: ["Credit Card Fraud Detection AI", "Telegram Downloader", "Hexphyr OS Setup"],
      description: "Primary weapon for AI/ML development and system automation",
      damage: "9500 DPS",
      accuracy: "98%"
    },
    {
      name: "Java",
      icon: "☕",
      category: "Programming",
      power: 90,
      projects: ["JavaFX Face Recognition"],
      description: "Enterprise-grade weapon for robust applications",
      damage: "8900 DPS",
      accuracy: "95%"
    },
    {
      name: "C",
      icon: "⚡",
      category: "Programming",
      power: 85,
      projects: ["System Level Programming"],
      description: "Low-level precision weapon for system programming",
      damage: "8500 DPS",
      accuracy: "92%"
    },
    {
      name: "C++",
      icon: "🔧",
      category: "Programming",
      power: 88,
      projects: ["Performance Critical Applications"],
      description: "High-performance combat weapon",
      damage: "8800 DPS",
      accuracy: "94%"
    },
    {
      name: "React",
      icon: "⚛️",
      category: "Frontend",
      power: 92,
      projects: ["Elias Human-like Bot", "Portfolio Website"],
      description: "Frontend warfare specialist",
      damage: "9200 DPS",
      accuracy: "96%"
    },
    {
      name: "JavaScript",
      icon: "🟨",
      category: "Frontend",
      power: 90,
      projects: ["Web Applications", "Bot Development"],
      description: "Versatile web combat tool",
      damage: "9000 DPS",
      accuracy: "95%"
    },
    {
      name: "HTML",
      icon: "🌐",
      category: "Frontend",
      power: 85,
      projects: ["Web Structure"],
      description: "Foundation building weapon",
      damage: "8500 DPS",
      accuracy: "100%"
    },
    {
      name: "CSS",
      icon: "🎨",
      category: "Frontend",
      power: 87,
      projects: ["UI/UX Design"],
      description: "Visual enhancement weapon",
      damage: "8700 DPS",
      accuracy: "93%"
    },
    {
      name: "MySQL",
      icon: "🗄️",
      category: "Database",
      power: 88,
      projects: ["Data Management Systems"],
      description: "Data fortress guardian",
      damage: "8800 DPS",
      accuracy: "97%"
    },
    {
      name: "Docker",
      icon: "🐳",
      category: "DevOps",
      power: 85,
      projects: ["Containerization", "Deployment"],
      description: "Deployment vessel",
      damage: "8500 DPS",
      accuracy: "94%"
    },
    {
      name: "Git",
      icon: "📦",
      category: "DevOps",
      power: 92,
      projects: ["Version Control"],
      description: "Time manipulation device",
      damage: "9200 DPS",
      accuracy: "99%"
    },
    {
      name: "GitHub",
      icon: "🐙",
      category: "DevOps",
      power: 90,
      projects: ["Code Repository"],
      description: "Code vault guardian",
      damage: "9000 DPS",
      accuracy: "98%"
    },
    {
      name: "Linux",
      icon: "🐧",
      category: "System",
      power: 95,
      projects: ["Hexphyr OS", "System Administration"],
      description: "Ultimate system control weapon",
      damage: "9500 DPS",
      accuracy: "97%"
    },
    {
      name: "AWS",
      icon: "☁️",
      category: "Cloud",
      power: 87,
      projects: ["Cloud Infrastructure"],
      description: "Cloud domination platform",
      damage: "8700 DPS",
      accuracy: "95%"
    }
  ];

  const categories = ["All", "Programming", "Frontend", "Database", "DevOps", "System", "Cloud"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTech = activeCategory === "All"
    ? techStack
    : techStack.filter(tech => tech.category === activeCategory);

  return (
    <section className="min-h-screen py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-mono text-green-400 glow-text mb-4">
            ./tech-arsenal --load-weapons
          </h2>
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-green-400/20 to-blue-400/20 backdrop-blur-md border border-green-400/30 rounded-lg p-4">
              <p className="text-green-400 font-mono text-sm">
                [SYSTEM] Weapon cache loaded. Select armament for deployment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-mono text-sm transition-all duration-300 border rounded-lg ${
                activeCategory === category
                  ? 'bg-green-400/20 border-green-400 text-green-400 shadow-lg shadow-green-400/30'
                  : 'bg-black/40 border-blue-400/30 text-blue-400 hover:border-green-400/50 hover:text-green-400'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Weapon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="weapon-slot relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTech(selectedTech === tech.name ? null : tech.name)}
              onHoverStart={() => setHoveredTech(tech.name)}
              onHoverEnd={() => setHoveredTech(null)}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              {/* Weapon Container */}
              <div className={`weapon-container relative h-32 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md border-2 rounded-lg overflow-hidden transition-all duration-500 ${
                selectedTech === tech.name
                  ? 'border-green-400 shadow-lg shadow-green-400/50'
                  : hoveredTech === tech.name
                  ? 'border-blue-400 shadow-lg shadow-blue-400/30'
                  : 'border-gray-600/30'
              }`}>

                {/* Power Level Indicator */}
                <div className="absolute top-2 right-2 text-xs font-mono text-green-400">
                  {tech.power}%
                </div>

                {/* Tech Icon/Name */}
                <div className="flex flex-col items-center justify-center h-full p-2">
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <div className="text-sm font-mono text-white text-center">{tech.name}</div>
                  <div className="text-xs text-blue-400 text-center">{tech.category}</div>
                </div>

                {/* Power Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.power}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  />
                </div>

                {/* Holographic Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: hoveredTech === tech.name
                      ? "linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))"
                      : "transparent"
                  }}
                />

                {/* Selection Indicator */}
                {selectedTech === tech.name && (
                  <motion.div
                    className="absolute inset-0 border-2 border-green-400 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weapon Stats Display */}
        {selectedTech && (
          <motion.div
            className="weapon-stats glass-card bg-black/60 backdrop-blur-md border border-green-400/30 rounded-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {(() => {
              const tech = techStack.find(t => t.name === selectedTech);
              if (!tech) return null;

              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Weapon Info */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{tech.icon}</div>
                      <div>
                        <h3 className="text-2xl font-mono text-green-400">{tech.name}</h3>
                        <p className="text-blue-400 text-sm">{tech.category} Weapon</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6">{tech.description}</p>

                    {/* Weapon Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/40 rounded-lg p-3 border border-green-400/20">
                        <div className="text-green-400 text-xs font-mono">DAMAGE</div>
                        <div className="text-white font-mono">{tech.damage}</div>
                      </div>
                      <div className="bg-black/40 rounded-lg p-3 border border-blue-400/20">
                        <div className="text-blue-400 text-xs font-mono">ACCURACY</div>
                        <div className="text-white font-mono">{tech.accuracy}</div>
                      </div>
                    </div>
                  </div>

                  {/* Deployed Projects */}
                  <div>
                    <h4 className="text-lg font-mono text-blue-400 mb-4">Deployment History</h4>
                    <div className="space-y-3">
                      {tech.projects.map((project, idx) => (
                        <motion.div
                          key={idx}
                          className="bg-black/40 border border-gray-600/30 rounded-lg p-3 hover:border-green-400/50 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-gray-300 font-mono text-sm">{project}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TechArsenal;
