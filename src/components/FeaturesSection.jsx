import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Download, Smartphone, Globe, HardDrive, Image } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Stream-copy technology splits videos in seconds without re-encoding. No quality loss, no waiting.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Image,
    title: 'Extract Frames',
    description: 'Pull high-quality individual image frames directly from your video files instantly.',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
  {
    icon: Shield,
    title: '100% Private',
    description: 'Your videos never leave your device. All processing happens locally in your browser using WebAssembly.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Download,
    title: 'Bulk Export',
    description: 'Download individual parts or grab everything at once as a neatly packaged ZIP archive.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Works flawlessly on desktop, tablet, and mobile. Split videos on any device, anywhere.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Globe,
    title: 'No Backend Required',
    description: 'No servers, no accounts, no API keys. Just open the page and start splitting instantly.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: HardDrive,
    title: 'Multiple Formats',
    description: 'Supports MP4, MOV, WEBM, and MKV. Works with virtually any video you throw at it.',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-24 px-4">
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-3"
        >
          Why Choose Us
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Powerful Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Everything you need to split videos quickly, privately, and professionally.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={item}
            className="glass-panel rounded-2xl p-6 group hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
