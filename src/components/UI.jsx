import { motion } from 'framer-motion'

export function NeonButton({ children, variant = 'pink', className = '', ...props }) {
  return <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }} className={`neon-button ${variant} ${className}`} {...props}>{children}</motion.button>
}

export function Section({ id, eyebrow, title, children, className = '' }) {
  return <motion.section id={id} className={`story-section ${className}`} initial={{ opacity: 0, y: 55 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .8 }}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    {title && <h2 className="section-title">{title}</h2>}
    {children}
  </motion.section>
}

export function GlitchTitle({ children, className = '' }) {
  return <h1 className={`glitch ${className}`} data-text={children}>{children}</h1>
}

export function TypeLine({ children, delay = 0, className = '' }) {
  return <motion.p className={className} initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ delay, duration: .7 }}>{children}</motion.p>
}
