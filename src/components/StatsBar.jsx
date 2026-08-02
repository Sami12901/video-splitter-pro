import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, Clock } from 'lucide-react';

const stats = [
  {
    icon: Monitor,
    value: '100%',
    label: 'Client-Side',
    description: 'Browser-based',
  },
  {
    icon: Cpu,
    value: '0',
    label: 'Servers Used',
    description: 'Zero uploads',
  },
  {
    icon: Clock,
    value: '10s',
    label: 'Per Segment',
    description: 'Precise cuts',
  },
];

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto mt-16 px-4"
    >
      <div className="glass-panel rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x divide-white/10">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-center gap-4 px-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-extrabold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
