
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, GitBranch, Star, Eye, Users, Activity } from 'lucide-react';

const GitHubSection = () => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [scanningRepo, setScanningRepo] = useState<string | null>(null);

  // Mock GitHub data - in real app, you'd fetch from GitHub API
  const githubStats = {
    username: "Bot-37",
    totalRepos: 24,
    publicRepos: 18,
    followers: 156,
    following: 89,
    totalStars: 342,
    totalCommits: 1247,
    currentStreak: 23,
    contributions: 847
  };

  const repositories = [
    {
      name: "credit-card-fraud-detection",
      description: "AI-powered fraud detection system",
      language: "Python",
      stars: 89,
      forks: 23,
      status: "active",
      lastUpdate: "2 hours ago"
    },
    {
      name: "elias-human-bot",
      description: "Advanced conversational AI assistant",
      language: "JavaScript",
      stars: 145,
      forks: 34,
      status: "active",
      lastUpdate: "1 day ago"
    },
    {
      name: "telegram-downloader",
      description: "High-speed media extraction tool",
      language: "Python",
      stars: 67,
      forks: 18,
      status: "stable",
      lastUpdate: "3 days ago"
    },
    {
      name: "javafx-face-recognition",
      description: "Real-time facial recognition system",
      language: "Java",
      stars: 23,
      forks: 8,
      status: "complete",
      lastUpdate: "1 week ago"
    },
    {
      name: "hexphyr-os-setup",
      description: "Custom Linux distribution config",
      language: "Shell",
      stars: 12,
      forks: 5,
      status: "ongoing",
      lastUpdate: "2 days ago"
    },
    {
      name: "hackintosh-efi",
      description: "macOS compatibility layer",
      language: "Assembly",
      stars: 34,
      forks: 12,
      status: "stable",
      lastUpdate: "5 days ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'stable': return 'text-blue-400';
      case 'complete': return 'text-yellow-400';
      case 'ongoing': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'Python': return 'bg-yellow-500';
      case 'JavaScript': return 'bg-yellow-400';
      case 'Java': return 'bg-red-500';
      case 'Shell': return 'bg-green-500';
      case 'Assembly': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
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
            ./github --scan-repository
          </h2>
          <p className="text-blue-300 font-mono">
            [NETWORK_SCAN] Analyzing commit patterns and repository status...
          </p>
        </motion.div>

        {/* GitHub Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Repositories", value: githubStats.totalRepos, icon: Github },
            { label: "Followers", value: githubStats.followers, icon: Users },
            { label: "Total Stars", value: githubStats.totalStars, icon: Star },
            { label: "Commits", value: githubStats.totalCommits, icon: Activity }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card glass-card bg-black/40 backdrop-blur-md border border-blue-400/30 rounded-lg p-6 text-center"
              onHoverStart={() => setHoveredStat(stat.label)}
              onHoverEnd={() => setHoveredStat(null)}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="flex flex-col items-center"
                animate={{
                  color: hoveredStat === stat.label ? '#00ff00' : '#60a5fa'
                }}
              >
                <stat.icon className="w-8 h-8 mb-3" />
                <div className="text-2xl font-mono text-green-400 mb-1">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-blue-300 font-mono">{stat.label}</div>
              </motion.div>

              {hoveredStat === stat.label && (
                <motion.div
                  className="absolute inset-0 border-2 border-green-400 rounded-lg pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Repository Grid */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-mono text-blue-400 text-center mb-8">
            [ACTIVE_REPOSITORIES] Scanning codebase...
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo, index) => (
              <motion.div
                key={repo.name}
                className="repo-card relative group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setScanningRepo(repo.name)}
                onHoverEnd={() => setScanningRepo(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="glass-card bg-black/40 backdrop-blur-md border border-gray-600/30 rounded-lg p-6 h-full transition-all duration-300 group-hover:border-green-400/50">
                  {/* Repository Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-blue-400" />
                      <h4 className="font-mono text-green-400 text-lg group-hover:text-white transition-colors">
                        {repo.name}
                      </h4>
                    </div>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusColor(repo.status).replace('text-', 'bg-')}`} />
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {repo.description}
                  </p>

                  {/* Language and Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                      <span className="text-sm font-mono text-blue-300">{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status and Last Update */}
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-mono ${getStatusColor(repo.status)}`}>
                      [{repo.status.toUpperCase()}]
                    </span>
                    <span className="text-gray-500">{repo.lastUpdate}</span>
                  </div>

                  {/* Scanning Effect */}
                  {scanningRepo === repo.name && (
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="https://github.com/Bot-37"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-black/60 to-black/40 border border-green-400/50 rounded-lg text-green-400 hover:text-white font-mono transition-all duration-300 hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>VIEW FULL REPOSITORY</span>
            <Eye className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
