
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const HackerTerminal = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '> Initializing neural link...',
    '> Establishing secure connection to FAHAD_37...',
    '> Access granted. Welcome to the mainframe.',
    '> Type "help" for available commands.',
    ''
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const commands = {
    help: [
      'Available commands:',
      '  whoami     - Display user information',
      '  skills     - List technical capabilities',
      '  projects   - Show recent deployments',
      '  status     - System status check',
      '  contact    - Contact information',
      '  clear      - Clear terminal',
      '  matrix     - Enter the matrix...',
      ''
    ],
    whoami: [
      'USER: FAHAD_37',
      'DESIGNATION: Neural Network Architect',
      'CLEARANCE: MAXIMUM',
      'STATUS: ONLINE',
      'LOCATION: Coimbatore, Tamil Nadu, INDIA',
      ''
    ],
    skills: [
      'TECHNICAL_ARSENAL:',
      '  [████████████████████] Python        95%',
      '  [██████████████████  ] React         92%',
      '  [█████████████████   ] Java          90%',
      '  [████████████████    ] Linux         95%',
      '  [███████████████     ] JavaScript    87%',
      '  [██████████████      ] C++           88%',
      '  [█████████████       ] Docker        85%',
      '  [██████████████      ] AWS           86%',
      ''
    ],
    projects: [
      'RECENT_DEPLOYMENTS:',
      '  [ACTIVE] Credit Card Fraud Detection AI',
      '  [ACTIVE] Elias Human-like Bot',
      '  [COMPLETE] Telegram Downloader',
      '  [COMPLETE] JavaFX Face Recognition',
      '  [ONGOING] Hexphyr OS Setup',
      '  [STABLE] Hackintosh EFI Build',
      ''
    ],
    status: [
      'SYSTEM_STATUS:',
      '  CPU: OPTIMIZED',
      '  MEMORY: 97.3% EFFICIENT',
      '  NEURAL_PATHWAYS: SYNCHRONIZED',
      '  CREATIVITY_ENGINE: MAXIMUM',
      '  PROBLEM_SOLVING: ACTIVE',
      '  COFFEE_LEVELS: OPTIMAL',
      '  STATUS: READY_FOR_DEPLOYMENT',
      ''
    ],
    contact: [
      'CONTACT_MATRIX:',
      '  EMAIL: fahadfaz0708@gmail.com',
      '  PHONE: +91 8489941091',
      '  LINKEDIN: https://www.linkedin.com/in/bot37/',
      '  GITHUB: https://github.com/Bot-37',
      '  LOCATION: 10.9974° N, 76.9589° E',
      ''
    ],
    matrix: [
      'Wake up, Neo...',
      'The Matrix has you...',
      'Follow the white rabbit.',
      'Knock, knock, Neo.',
      '',
      '01001000 01100101 01101100 01101100 01101111',
      '01010111 01101111 01110010 01101100 01100100',
      ''
    ],
    clear: []
  };

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    setIsTyping(true);

    setTimeout(() => {
      if (cmd === 'clear') {
        setTerminalOutput(['> Terminal cleared.', '']);
      } else if (commands[cmd as keyof typeof commands]) {
        setTerminalOutput(prev => [...prev, `> ${command}`, ...commands[cmd as keyof typeof commands]]);
      } else if (cmd === '') {
        setTerminalOutput(prev => [...prev, '']);
      } else {
        setTerminalOutput(prev => [...prev, `> ${command}`, `Command not found: ${command}`, 'Type "help" for available commands.', '']);
      }
      setIsTyping(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  return (
    <section className="relative z-10 flex items-center py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-mono text-green-400 glow-text mb-4">
            ./hacker-access --neural-link
          </h2>
          <p className="text-blue-300 font-mono">
            [SECURE_TERMINAL] Direct access to neural network mainframe
          </p>
        </motion.div>

        <motion.div
          className="terminal-window max-w-4xl mx-auto h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="terminal-header">
            <div className="terminal-buttons">
              <div className="terminal-button terminal-red"></div>
              <div className="terminal-button terminal-yellow"></div>
              <div className="terminal-button terminal-green"></div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">NEURAL_MAINFRAME_ACCESS</span>
            </div>
          </div>

          <div className="terminal-content h-80 overflow-y-auto custom-scrollbar">
            <div className="space-y-1">
              {terminalOutput.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`font-mono text-sm ${
                    line.startsWith('>') ? 'text-blue-400' : 'text-green-400'
                  }`}
                >
                  {line}
                </motion.div>
              ))}

              {!isTyping && (
                <div className="flex items-center">
                  <span className="text-green-400 font-mono">fahad@neural-net:~$ </span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-transparent border-none outline-none text-white font-mono flex-1 ml-2"
                    placeholder="Enter command..."
                    autoFocus
                  />
                  <span className="text-green-400 animate-pulse">|</span>
                </div>
              )}

              {isTyping && (
                <div className="flex items-center">
                  <span className="text-green-400 font-mono">fahad@neural-net:~$ </span>
                  <span className="text-green-400 ml-2">Processing...</span>
                  <span className="text-green-400 animate-pulse ml-2">|</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Command Hints */}
        <motion.div
          className="mt-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(commands).map((cmd, index) => (
              <motion.button
                key={cmd}
                onClick={() => {
                  setCurrentCommand(cmd);
                  handleCommand(cmd);
                }}
                className="quantum-button text-sm p-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {cmd}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HackerTerminal;
