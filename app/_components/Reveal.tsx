'use client'
/**
 * Reveal primitives — the "Framer-quality" motion vocabulary.
 *
 * Every animation here animates ONLY transform + opacity (GPU-accelerated).
 * No width/height/top/left animations — those would force layout thrash.
 *
 * The cubic-bezier(0.22, 1, 0.36, 1) "expo-out" curve is the industry-standard
 * for premium feel — slow start, fast finish, gentle arrival.
 */
import { motion, type Variants, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/* ─── FadeUp ──────────────────────────────────────────────────────────
 * Single-element reveal: fades in + slides up 24px on scroll-into-view.
 * Used for paragraphs, single headlines, buttons.
 * ──────────────────────────────────────────────────────────────────── */
type FadeUpProps = HTMLMotionProps<'div'> & {
  delay?: number
  y?: number
  children: ReactNode
}

export function FadeUp({ delay = 0, y = 24, children, ...rest }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ─── StaggerGroup ────────────────────────────────────────────────────
 * Parent that staggers its direct motion children by 0.08s.
 * Wrap any group of cards, grid items, list rows in this.
 * ──────────────────────────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

type StaggerGroupProps = HTMLMotionProps<'div'> & { children: ReactNode }

export function StaggerGroup({ children, ...rest }: StaggerGroupProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, ...rest }: StaggerGroupProps) {
  return (
    <motion.div variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  )
}

/* ─── SplitWords ──────────────────────────────────────────────────────
 * Headline reveal — splits the string into per-word motion spans, each
 * delayed in sequence. The "Framer-quality" page-load signature move.
 * Whitespace preserved with non-breaking spaces.
 * ──────────────────────────────────────────────────────────────────── */
const wordContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

type SplitWordsProps = {
  text: string
  className?: string
  italicWords?: number[]   // word indices to italicize (uses Fraunces italic)
  triggerOnce?: boolean
}

export function SplitWords({ text, className, italicWords = [], triggerOnce = true }: SplitWordsProps) {
  const words = text.split(' ')
  return (
    <motion.span
      variants={wordContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: '-80px' }}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            paddingBottom: '0.1em',
            marginBottom: '-0.1em',
          }}
        >
          <motion.span
            variants={wordVariants}
            style={{
              display: 'inline-block',
              fontStyle: italicWords.includes(i) ? 'italic' : undefined,
            }}
            className={italicWords.includes(i) ? 'display-italic' : undefined}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/* ─── Magnetic ────────────────────────────────────────────────────────
 * Wraps an element so it follows the cursor with spring damping.
 * Used on primary CTAs to telegraph high-end interactivity.
 * ──────────────────────────────────────────────────────────────────── */
import { useMotionValue, useSpring } from 'framer-motion'

type MagneticProps = {
  children: ReactNode
  strength?: number   // 0.0 - 1.0, how much the element pulls toward cursor
  className?: string
}

export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 150, damping: 15, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 150, damping: 15, mass: 0.4 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mx.set((e.clientX - cx) * strength)
    my.set((e.clientY - cy) * strength)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
