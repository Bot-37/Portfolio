
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Github, GitBranch, Star, Eye, Users, Activity, RefreshCw, Wifi, Clock } from 'lucide-react';

const GITHUB_USERNAME = 'Bot-37';
const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  topics?: string[];
  size: number;
  open_issues_count: number;
}

interface GitHubStats {
  username: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  avatarUrl: string;
}

const GitHubSection = () => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [scanningRepo, setScanningRepo] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [secondsAgo, setSecondsAgo] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [githubStats, setGithubStats] = useState<GitHubStats>({
    username: GITHUB_USERNAME,
    name: '',
    bio: '',
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    avatarUrl: '',
  });

  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all repos across pages to get accurate star/repo counts
  const fetchAllRepos = async (): Promise<Repo[]> => {
    const allRepos: Repo[] = [];
    let page = 1;
    while (true) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&page=${page}`
      );
      if (!res.ok) break;
      const data: Repo[] = await res.json();
      if (data.length === 0) break;
      allRepos.push(...data);
      if (data.length < 100) break;
      page++;
    }
    return allRepos;
  };

  const fetchGitHubData = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    setError(null);
    try {
      const [userRes, allRepos] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetchAllRepos(),
      ]);

      if (!userRes.ok) throw new Error(`API error ${userRes.status}`);
      const userData = await userRes.json();

      const totalStars = allRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      // Top 6 most recently updated
      const top6 = allRepos.slice(0, 6);

      setGithubStats({
        username: userData.login,
        name: userData.name || userData.login,
        bio: userData.bio || '',
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars,
        avatarUrl: userData.avatar_url,
      });

      setRepositories(top6);
      setLastUpdated(new Date());
      setSecondsAgo(0);
    } catch (err: unknown) {
      setError('Rate limit or network error. Showing cached data.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // initial fetch + polling
  useEffect(() => {
    fetchGitHubData();
    pollingRef.current = setInterval(() => fetchGitHubData(), POLL_INTERVAL_MS);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [fetchGitHubData]);

  // secondsAgo counter
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsAgo(prev => prev + 1);
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [lastUpdated]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 604800)}w ago`;
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
    return `${Math.floor(secondsAgo / 3600)}h ago`;
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      Python: 'bg-yellow-500',
      JavaScript: 'bg-yellow-400',
      Java: 'bg-red-500',
      Shell: 'bg-green-500',
      Assembly: 'bg-purple-500',
      TypeScript: 'bg-blue-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-400',
      'C++': 'bg-pink-500',
      C: 'bg-gray-400',
      Go: 'bg-cyan-400',
      Rust: 'bg-orange-600',
    };
    return colors[language || ''] || 'bg-gray-500';
  };

  const stats = [
    { label: 'Repositories', value: githubStats.publicRepos, icon: Github, color: 'text-green-400' },
    { label: 'Followers', value: githubStats.followers, icon: Users, color: 'text-blue-400' },
    { label: 'Following', value: githubStats.following, icon: Eye, color: 'text-purple-400' },
    { label: 'Total Stars', value: githubStats.totalStars, icon: Star, color: 'text-yellow-400' },
  ];

  return (
    <section className="min-h-screen py-16 sm:py-20 relative z-10" id="github-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <h2 className="text-2xl sm:text-4xl font-mono text-green-400 glow-text">
              ./github --scan-repository
            </h2>
            {/* LIVE badge */}
            <motion.span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/60 bg-green-500/10 text-green-400 text-xs font-mono font-bold"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              LIVE
            </motion.span>
          </div>

          <p className="text-blue-300 font-mono text-sm sm:text-base px-2">
            [NETWORK_SCAN] Analyzing commit patterns and repository status...
          </p>

          {/* Last updated + manual refresh */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {lastUpdated && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                <Clock className="w-3 h-3" />
                Updated {formatLastUpdated()}
              </span>
            )}
            {error && (
              <span className="text-xs text-yellow-500 font-mono">{error}</span>
            )}
            <motion.button
              onClick={() => fetchGitHubData(true)}
              disabled={isRefreshing}
              className="theme-outline-button flex items-center gap-1.5 rounded px-3 py-1 text-xs font-mono transition-all disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
              >
                <RefreshCw className="w-3 h-3" />
              </motion.div>
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </motion.button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="loading-spinner" />
            <p className="text-green-400 font-mono text-sm animate-pulse">
              [SCANNING] Fetching GitHub data...
            </p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="relative stat-card glass-card bg-black/40 backdrop-blur-md border border-blue-400/30 rounded-xl p-4 sm:p-6 text-center cursor-default"
                  onHoverStart={() => setHoveredStat(stat.label)}
                  onHoverEnd={() => setHoveredStat(null)}
                  whileHover={{ scale: 1.05, rotateY: 4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="flex flex-col items-center"
                    animate={{ color: hoveredStat === stat.label ? 'var(--theme-accent)' : undefined }}
                  >
                    <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 ${stat.color}`} />
                    <div className="text-xl sm:text-2xl font-mono text-green-400 mb-1 font-bold">
                      {stat.value.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm text-blue-300 font-mono">{stat.label}</div>
                  </motion.div>

                  <AnimatePresence>
                    {hoveredStat === stat.label && (
                      <motion.div
                        className="absolute inset-0 border-2 border-green-400 rounded-xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Repositories Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-mono text-blue-400">
                  [ACTIVE_REPOSITORIES]
                </h3>
                <span className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <Wifi className="w-3 h-3 text-green-400" />
                  Auto-refreshes every 5 min
                </span>
              </div>

              {repositories.length === 0 ? (
                <p className="text-center text-gray-500 font-mono py-12">
                  [ERROR] No repositories found.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {repositories.map((repo, index) => (
                    <motion.div
                      key={repo.name}
                      className="repo-card relative group cursor-pointer"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      onHoverStart={() => setScanningRepo(repo.name)}
                      onHoverEnd={() => setScanningRepo(null)}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => window.open(repo.html_url, '_blank')}
                    >
                      <div className="glass-card bg-black/40 backdrop-blur-md border border-gray-600/30 rounded-xl p-5 h-full transition-all duration-300 group-hover:border-green-400/50 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]">

                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <Github className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <h4 className="font-mono text-green-400 text-base font-bold group-hover:text-white transition-colors truncate">
                              {repo.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] text-green-400 font-mono hidden sm:inline">ACTIVE</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2 min-h-[36px]">
                          {repo.description || 'No description provided.'}
                        </p>

                        {/* Language + Stats */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                            <span className="text-xs font-mono text-blue-300">{repo.language || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GitBranch className="w-3 h-3 text-blue-400" />
                              <span>{repo.forks_count}</span>
                            </div>
                            {repo.open_issues_count > 0 && (
                              <div className="flex items-center gap-1">
                                <Activity className="w-3 h-3 text-red-400" />
                                <span>{repo.open_issues_count}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs border-t border-white/5 pt-3">
                          <span className="font-mono text-green-400 text-[10px]">[ACTIVE]</span>
                          <span className="text-gray-500 font-mono">{formatTimeAgo(repo.updated_at)}</span>
                        </div>

                        {/* Scan line on hover */}
                        {scanningRepo === repo.name && (
                          <motion.div
                            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                          />
                        )}

                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center mt-10 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-solid-button inline-flex items-center gap-3 rounded-lg px-6 py-3 font-mono text-sm transition-all duration-300 hover:scale-105 sm:text-base"
              >
                <Github className="w-5 h-5" />
                <span>VIEW ALL {githubStats.publicRepos} REPOSITORIES</span>
                <Eye className="w-4 h-4" />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default GitHubSection;
