"use client";

import { Heart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50"
    >
      <div className="px-4 py-6 lg:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Powered by</span>
            <a 
              href="https://qualiasolutions.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
            >
              Qualia Solutions
              <ExternalLink className="h-3 w-3" />
            </a>
            <span>for</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Khirfan & Partners Advocates
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-red-500" />
            <span>in Cyprus for Jordan</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}