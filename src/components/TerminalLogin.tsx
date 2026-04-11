
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalLoginProps {
  onLogin: (callSign: string) => void;
}

const TerminalLogin = ({ onLogin }: TerminalLoginProps) => {
  const [input, setInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'CODEX NEURAL NETWORK v3.7.2',
    'Initializing secure connection...',
    'Connection established.',
    '',
    'Enter your call sign to access the system:'
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newHistory = [
        ...terminalHistory,
        `> ${input}`,
        'Authenticating...',
        `Welcome, ${input.toUpperCase()}. Access granted.`,
        'Loading neural pathways...'
      ];
      setTerminalHistory(newHistory);
      setIsTyping(true);

      setTimeout(() => {
        onLogin(input.trim());
      }, 2000);
    }
  };

  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-4">
      <div className="data-stream"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="terminal-window max-w-2xl w-full"
      >
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-button terminal-red"></div>
            <div className="terminal-button terminal-yellow"></div>
            <div className="terminal-button terminal-green"></div>
          </div>
          <span className="ml-4 text-green-400 text-sm">NEURAL_CODEX_TERMINAL</span>
        </div>

        <div className="terminal-content min-h-96">
          {terminalHistory.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={line.startsWith('>') ? 'text-blue-400' : 'text-green-400'}
            >
              {line}
            </motion.div>
          ))}

          {!isTyping && (
            <form onSubmit={handleSubmit} className="flex items-center mt-4">
              <span className="terminal-prompt">&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="terminal-input"
                placeholder="Enter call sign..."
                autoFocus
              />
              <span className="typing-cursor">|</span>
            </form>
          )}

          {isTyping && (
            <div className="flex items-center mt-4">
              <span className="terminal-prompt">&gt;</span>
              <span className="text-green-400">Accessing neural network...</span>
              <span className="typing-cursor ml-2">|</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalLogin;
