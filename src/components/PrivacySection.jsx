import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Server, Lock, Trash2, FileCheck } from 'lucide-react';

const privacyItems = [
  {
    icon: ShieldCheck,
    title: 'Zero Data Collection',
    description: 'We do not collect, store, or transmit any of your personal data or video files. Period.',
  },
  {
    icon: Eye,
    title: 'No Tracking',
    description: 'No analytics cookies, no third-party trackers, no fingerprinting. Your browsing stays private.',
  },
  {
    icon: Server,
    title: 'No Server Uploads',
    description: 'Your video files are processed entirely within your browser. Nothing is ever sent to any server.',
  },
  {
    icon: Lock,
    title: 'Local Processing',
    description: 'FFmpeg WebAssembly runs in a sandboxed environment inside your browser with zero network access.',
  },
  {
    icon: Trash2,
    title: 'Auto Cleanup',
    description: 'All processed data is stored in temporary browser memory and is automatically cleared when you close the tab.',
  },
  {
    icon: FileCheck,
    title: 'Open Source',
    description: 'Our code is fully open source. You can audit every line to verify our privacy commitments.',
  },
];

export default function PrivacySection() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-24 px-4">
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block text-sm font-semibold tracking-widest uppercase text-emerald-400 mb-3"
        >
          Your Privacy Matters
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Built for Privacy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Your videos are your business. We designed Video Splitter Pro from the ground up so your data never leaves your device.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-panel rounded-3xl p-8 md:p-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {privacyItems.map((privItem, index) => (
            <motion.div
              key={privItem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <privItem.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{privItem.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{privItem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-5 py-2.5 rounded-full text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            Your data stays on your device — always.
          </div>
        </div>
      </motion.div>
    </section>
  );
}
