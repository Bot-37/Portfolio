
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import HackerTerminal from './HackerTerminal';

interface TerminalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TerminalModal = ({ isOpen, onClose }: TerminalModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="theme-backdrop absolute inset-0 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="theme-panel-strong relative w-full max-w-5xl overflow-hidden rounded-lg"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-[color:var(--theme-border)] px-4 py-2 bg-[color:var(--theme-surface-soft)]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-2 text-green-500 font-mono text-xs">ROOT_ACCESS_GRANTED</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-green-500 transition-colors hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Terminal Content */}
                        <div className="max-h-[80vh] overflow-y-auto">
                            {/* We render HackerTerminal but need to ensure it fits well. 
                               The HackerTerminal has its own padding/min-h-screen which we might need to override 
                               or we just let it be and it scrolls within the modal. 
                               Ideally we'd modify HackerTerminal to NOT conform to screen height if embedded. 
                               For now, let's wrap it in a div that might constrain it. */}
                            <div className="p-4">
                                <HackerTerminal />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TerminalModal;
