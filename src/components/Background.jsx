import { motion } from 'framer-motion'

const suits = ['♥', '♠', '♦', '♣', '♥', '♦']
export default function Background() {
  return <div className="background" aria-hidden="true">
    <div className="aurora a1"/><div className="aurora a2"/>
    {[...Array(26)].map((_, i) => <i key={i} className="particle" style={{ '--x': `${(i * 37) % 100}%`, '--y': `${(i * 61) % 100}%`, '--d': `${3 + (i % 5)}s`, '--delay': `${-(i % 7)}s` }} />)}
    {suits.map((s, i) => <motion.div key={i} className={`float-card c${i}`} animate={{ y: [0, -24, 0], rotate: [i * 4 - 10, i * 4, i * 4 - 10] }} transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}><b>{s}</b><span>{i % 2 ? 'J' : 'A'}</span></motion.div>)}
    <div className="noise"/>
  </div>
}
