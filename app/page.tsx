'use client'
/* ════════════════════════════════════════════════════════════════════════
   FUTURE MEDIA — REBUILT WITH CLAUDE × FRAMER DESIGN LANGUAGE
   ────────────────────────────────────────────────────────────────────────
   Visual: Anthropic's warm editorial palette (cream bg, rust-orange
           accent, dark charcoal ink, serif display, sans body).
   Motion: Lenis smooth scroll + Framer Motion (Letter reveal, scroll-
           linked parallax, magnetic CTAs, bento grids, staggered
           entrances). All transforms are GPU-accelerated. Restraint
           is the discipline — most elements stay still.
   ════════════════════════════════════════════════════════════════════════ */
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeUp, StaggerGroup, StaggerItem, SplitWords, Magnetic } from './_components/Reveal'

// ─── DATA ──────────────────────────────────────────────────────────────
const STARTER_LINK = 'https://buy.stripe.com/cNi00i8Yi1Oc6X65qG8g002'
const PRO_LINK     = 'https://buy.stripe.com/aFaeVccau50oa9i6uK8g003'
const ELITE_LINK   = 'https://buy.stripe.com/7sYeVc0rM3Wka9i4mC8g004'

const TESTIMONIALS = [
  { name: 'Mike T.',  biz: 'Detroit Plumbing Pro',   city: 'Detroit',          result: '12 new calls / month',  text: 'Sam built us a site in one week. First month we got 12 new calls from Google alone. Paid for itself ten times over.' },
  { name: 'Rick S.',  biz: 'S&S Electric',           city: 'Sterling Heights', result: '40% more leads',         text: "I was skeptical. Now our phone hasn't stopped ringing since launch. Best investment I made all year. Eighteen years in business." },
  { name: 'Josh M.',  biz: 'Metro HVAC',             city: 'Warren',           result: '#2 on Google',           text: 'The free mockup sold me. No pushy sales pitch, just results. We rank second on Google for "HVAC Warren" now.' },
  { name: 'Dave K.',  biz: 'K&K Roofing',            city: 'Livonia',          result: 'Outranking 5-yr sites',  text: 'Competitors had websites for years on us. We launched three months ago and are already outranking them locally.' },
  { name: 'Tony B.',  biz: 'B&B Auto Repair',        city: 'Pontiac',          result: '+40% Google calls',      text: 'Google calls up 40% since launch. Customers can actually find us now. The site made my old ads irrelevant.' },
  { name: 'Chris R.', biz: 'Royal Oak Landscaping',  city: 'Royal Oak',        result: '15 new clients / mo',    text: 'Answered every question fast, delivered exactly what they promised. Zero BS. The site looks ten times better than I expected.' },
]

const SERVICES = [
  { tag: 'From $499',    title: 'Custom Website Design',       desc: 'Mobile-first, fast, hand-built. No templates. Every site composed from scratch around the trade and the town.' },
  { tag: 'Included',     title: 'Local SEO & Google Rankings', desc: 'Optimized so the right searches surface your shop first — "plumber near me," "electrician [your city]," and the long-tail phrases people actually type.' },
  { tag: 'Included',     title: 'Reviews That Compound',       desc: 'A simple system that quietly multiplies your five-star reviews until you become the obvious choice in your market.' },
  { tag: 'First year on us', title: 'Hosting & Maintenance',   desc: 'Fast, secure, fully managed. The first year is free with every package. You handle the trade. We handle the web.' },
]

const STEPS = [
  { n: '01', title: 'Free Mockup',         desc: 'Before you spend a dollar, we design a real visual of your future website. No commitment, no card. You see it first.' },
  { n: '02', title: 'We Build It Fast',    desc: 'On approval, we build in three to five days. Hand-crafted, properly fast, ranked from launch — no cutting corners.' },
  { n: '03', title: 'Your Phone Rings',    desc: 'Site goes live. You climb Google. Customers start calling. That is the entire point and that is what we deliver.' },
]

const PRICING = [
  {
    name: 'Starter',
    price: '$499',
    sub: 'one-time',
    link: STARTER_LINK,
    highlight: false,
    features: ['Custom 5-page site', 'Mobile responsive', 'Google Maps + click-to-call', 'On-page SEO', '1 revision round', '1 year free hosting', '3–5 day delivery'],
  },
  {
    name: 'Pro',
    price: '$999',
    sub: 'one-time',
    badge: 'Most chosen',
    link: PRO_LINK,
    highlight: true,
    features: ['Custom 8-page site', 'Full local SEO', 'Google Business optimization', 'Review collection system', 'Speed optimization', '3 revision rounds', '1 year free hosting', '5–7 day delivery', '30-day post-launch support'],
  },
  {
    name: 'Elite',
    price: '$1,999',
    sub: 'one-time',
    link: ELITE_LINK,
    highlight: false,
    features: ['Custom 15+ page site', 'Advanced SEO + blog', 'Google Ads campaign setup', 'Analytics dashboard', 'Unlimited revisions', '1 year free hosting', '90-day priority support'],
  },
]

const RECENT_WORK = [
  { kind: 'plumber',     city: 'Royal Oak',  span: 'col-span-2 row-span-2', accent: '#C15F3C' },
  { kind: 'roofer',      city: 'Troy',       span: 'col-span-1 row-span-1', accent: '#A14A2F' },
  { kind: 'HVAC',        city: 'Birmingham', span: 'col-span-1 row-span-1', accent: '#6a8e5a' },
  { kind: 'electrician', city: 'Ann Arbor',  span: 'col-span-1 row-span-1', accent: '#2c2c2c' },
  { kind: 'landscaper',  city: 'Rochester Hills', span: 'col-span-2 row-span-1', accent: '#C15F3C' },
  { kind: 'auto repair', city: 'Wyandotte',  span: 'col-span-1 row-span-1', accent: '#6b6963' },
]


// ═══════════════════════════════════════════════════════════════════════
//                                NAV
// ═══════════════════════════════════════════════════════════════════════
function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        background: 'rgba(250, 249, 245, 0.7)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="#" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, letterSpacing: '-0.02em' }}>
          Future Media
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hide-mobile-nav">
          <a href="#work"     style={navLinkStyle}>Work</a>
          <a href="#process"  style={navLinkStyle}>Process</a>
          <a href="#pricing"  style={navLinkStyle}>Pricing</a>
        </div>
        <a href="#mockup" className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.875rem' }}>
          Free mockup <span aria-hidden>→</span>
        </a>
      </div>
    </motion.nav>
  )
}
const navLinkStyle: React.CSSProperties = {
  fontSize: '0.9375rem',
  color: 'var(--color-ink-muted)',
  transition: 'color 0.15s ease',
}


// ═══════════════════════════════════════════════════════════════════════
//                                HERO
// ═══════════════════════════════════════════════════════════════════════
function Hero() {
  // Subtle scroll-linked parallax on the trust strip
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const trustY  = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroY   = useTransform(scrollYProgress, [0, 1], [0, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} style={{ paddingTop: 200, paddingBottom: 140, position: 'relative' }}>
      <motion.div className="container" style={{ y: heroY, opacity }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
          style={{ marginBottom: 32 }}
        >
          A web design studio · Michigan · Est. 2024
        </motion.div>

        {/* Display headline — split into words, staggered reveal */}
        <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', maxWidth: '14ch', marginBottom: 32 }}>
          <SplitWords
            text="Websites that make trade businesses look like they hired a Manhattan agency."
            italicWords={[7, 8, 9]}
          />
        </h1>

        {/* Subhead */}
        <FadeUp delay={0.6} y={16}>
          <p className="body-lg" style={{ maxWidth: '52ch', marginBottom: 48 }}>
            We build hand-crafted websites for plumbers, electricians, roofers and contractors across Michigan. One-time pricing from $499. The mockup is free.
          </p>
        </FadeUp>

        {/* CTAs — primary is magnetic */}
        <FadeUp delay={0.8} y={12}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Magnetic strength={0.25}>
              <a href="#mockup" className="btn-primary" style={{ padding: '16px 26px', fontSize: '1rem' }}>
                Get a free mockup <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <a href="#work" className="btn-secondary" style={{ padding: '16px 26px', fontSize: '1rem' }}>
              See recent work
            </a>
          </div>
        </FadeUp>
      </motion.div>

      {/* Trust strip — parallax-shifted as you scroll */}
      <motion.div
        style={{ y: trustY, marginTop: 120, opacity }}
        className="container"
      >
        <FadeUp delay={1.0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', borderTop: '1px solid var(--color-border)', paddingTop: 28 }}>
            <div className="eyebrow" style={{ color: 'var(--color-ink-faint)' }}>Trusted across Michigan</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'baseline' }}>
              <Stat n="40+"  label="Sites shipped" />
              <Stat n="3–5"  label="Day delivery" />
              <Stat n="$0"   label="Up-front to start" />
              <Stat n="100%" label="Hand-crafted" />
            </div>
          </div>
        </FadeUp>
      </motion.div>
    </section>
  )
}

function Stat({ n, label }: { n: string, label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span className="display" style={{ fontSize: '1.75rem', color: 'var(--color-ink)' }}>{n}</span>
      <span className="body-sm" style={{ color: 'var(--color-ink-faint)' }}>{label}</span>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════
//                            RECENT WORK (Bento)
// ═══════════════════════════════════════════════════════════════════════
function RecentWork() {
  return (
    <section id="work" className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <FadeUp>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Recent work</div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', marginBottom: 16, maxWidth: '20ch' }}>
            <SplitWords
              text="Real Michigan shops. Real Google rankings."
              italicWords={[5]}
            />
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="body-md" style={{ maxWidth: '52ch', marginBottom: 64 }}>
            A glimpse of recent builds. Click any card to see the live site, the build process, and the metrics it produced.
          </p>
        </FadeUp>

        {/* Bento grid */}
        <StaggerGroup
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '220px',
            gap: 16,
          }}
        >
          {RECENT_WORK.map((w, i) => (
            <StaggerItem
              key={i}
              className={w.span}
              style={gridItemStyle(w.span)}
            >
              <BentoCard {...w} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

function gridItemStyle(span: string): React.CSSProperties {
  // Translate Tailwind-like class strings to inline grid spans
  const colMatch = span.match(/col-span-(\d)/)?.[1] ?? '1'
  const rowMatch = span.match(/row-span-(\d)/)?.[1] ?? '1'
  return {
    gridColumn: `span ${colMatch}`,
    gridRow: `span ${rowMatch}`,
  }
}

function BentoCard({ kind, city, accent }: { kind: string, city: string, accent: string }) {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: 24,
        background: 'var(--color-bg-2)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* Mock browser frame */}
      <div style={{ display: 'flex', gap: 4 }}>
        {[1, 2, 3].map(d => (
          <span key={d} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-border-2)' }} />
        ))}
      </div>

      {/* Color block — stand-in for actual site screenshot */}
      <div style={{ flex: 1, margin: '12px 0', background: accent, borderRadius: 'var(--r-md)', opacity: 0.85 }} />

      {/* Caption */}
      <div>
        <div className="eyebrow" style={{ color: 'var(--color-ink-faint)', marginBottom: 4 }}>{city}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--color-ink)', textTransform: 'capitalize' }}>
          {kind} site
        </div>
      </div>
    </motion.a>
  )
}


// ═══════════════════════════════════════════════════════════════════════
//                            HOW IT WORKS
// ═══════════════════════════════════════════════════════════════════════
function HowItWorks() {
  return (
    <section id="process" className="section" style={{ background: 'var(--color-bg-2)' }}>
      <div className="container">
        <FadeUp>
          <div className="eyebrow" style={{ marginBottom: 16 }}>How it works</div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', marginBottom: 80, maxWidth: '20ch' }}>
            <SplitWords text="Three steps. No surprises. No fine print." italicWords={[2]} />
          </h2>
        </FadeUp>

        <StaggerGroup
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32,
          }}
        >
          {STEPS.map((s) => (
            <StaggerItem key={s.n}>
              <div style={{ borderTop: '1px solid var(--color-ink)', paddingTop: 24 }}>
                <div className="eyebrow" style={{ color: 'var(--color-accent)', marginBottom: 16, fontSize: '0.8125rem' }}>
                  {s.n} ——
                </div>
                <h3 className="display" style={{ fontSize: '1.75rem', marginBottom: 12 }}>{s.title}</h3>
                <p className="body-md">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════
//                            SERVICES (BENTO)
// ═══════════════════════════════════════════════════════════════════════
function Services() {
  return (
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <FadeUp>
          <div className="eyebrow" style={{ marginBottom: 16 }}>What's included</div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', marginBottom: 64, maxWidth: '24ch' }}>
            <SplitWords
              text="Everything you need to dominate the local search bar."
              italicWords={[7, 8]}
            />
          </h2>
        </FadeUp>

        <StaggerGroup
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {SERVICES.map((s, i) => (
            <StaggerItem key={i}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="eyebrow" style={{ color: 'var(--color-accent)', marginBottom: 24 }}>{s.tag}</div>
                <h3 className="display" style={{ fontSize: '1.5rem', marginBottom: 12 }}>{s.title}</h3>
                <p className="body-sm">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════
//                              PRICING
// ═══════════════════════════════════════════════════════════════════════
function Pricing() {
  return (
    <section id="pricing" className="section" style={{ background: 'var(--color-bg-2)' }}>
      <div className="container">
        <FadeUp>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Pricing</div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', marginBottom: 16, maxWidth: '24ch' }}>
            <SplitWords text="One-time pricing. No monthly fees. Ever." italicWords={[2, 3]} />
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="body-md" style={{ maxWidth: '52ch', marginBottom: 64 }}>
            We charge once. You own the site. The first year of hosting is on us.
          </p>
        </FadeUp>

        <StaggerGroup
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {PRICING.map((p) => (
            <StaggerItem key={p.name}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  padding: 32,
                  borderRadius: 'var(--r-lg)',
                  background: p.highlight ? 'var(--color-ink)' : 'var(--color-bg)',
                  color:      p.highlight ? 'var(--color-bg)' : 'var(--color-ink)',
                  border: p.highlight ? 'none' : '1px solid var(--color-border)',
                  position: 'relative',
                }}
              >
                {p.badge && (
                  <div
                    style={{
                      position: 'absolute', top: -12, left: 32,
                      padding: '6px 12px',
                      background: 'var(--color-accent)',
                      color: 'white',
                      borderRadius: 999,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {p.badge}
                  </div>
                )}
                <div className="eyebrow" style={{ color: p.highlight ? 'var(--color-accent)' : 'var(--color-ink-muted)', marginBottom: 16 }}>
                  {p.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                  <span className="display" style={{ fontSize: '3rem' }}>{p.price}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', opacity: 0.6 }}>{p.sub}</span>
                </div>
                <hr className="h-rule" style={{ background: p.highlight ? 'rgba(255,255,255,0.12)' : 'var(--color-border)', margin: '24px 0' }} />
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, flex: 1 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: 12, fontSize: '0.9375rem', opacity: p.highlight ? 0.85 : 1 }}>
                      <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.2}>
                  <a
                    href={p.link}
                    className={p.highlight ? 'btn-accent' : 'btn-primary'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Choose {p.name} <span aria-hidden>→</span>
                  </a>
                </Magnetic>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════
//                          TESTIMONIALS (MARQUEE)
// ═══════════════════════════════════════════════════════════════════════
function Testimonials() {
  // Duplicate the array so the marquee loops seamlessly
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <section className="section" style={{ background: 'var(--color-bg)', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: 56 }}>
        <FadeUp>
          <div className="eyebrow" style={{ marginBottom: 16 }}>From owners we've shipped for</div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', maxWidth: '24ch' }}>
            <SplitWords text="Quiet results that compound for years." italicWords={[3]} />
          </h2>
        </FadeUp>
      </div>

      <div className="marquee-track">
        {doubled.map((t, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 380,
              padding: 32,
              margin: '0 12px',
              background: 'var(--color-bg-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--r-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--color-accent-soft)',
                  color: 'var(--color-accent)',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                }}
              >
                {t.name[0]}
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{t.name}</div>
                <div className="body-sm" style={{ fontSize: '0.8125rem' }}>{t.biz} · {t.city}</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', lineHeight: 1.45, color: 'var(--color-ink)' }}>
              "{t.text}"
            </p>
            <div className="eyebrow" style={{ color: 'var(--color-accent)' }}>{t.result}</div>
          </div>
        ))}
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════
//                              BIG CTA
// ═══════════════════════════════════════════════════════════════════════
function BigCTA() {
  return (
    <section id="mockup" className="section" style={{ background: 'var(--color-bg-2)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <FadeUp>
          <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', maxWidth: '20ch', margin: '0 auto 24px' }}>
            <SplitWords text="Want to see your shop's mockup?" italicWords={[4]} />
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="body-lg" style={{ maxWidth: '48ch', margin: '0 auto 48px' }}>
            Tell us your business and we'll design a real preview within 48 hours. Free. No credit card. No commitment.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <Magnetic strength={0.25}>
            <a href="mailto:futuremediasam313@gmail.com?subject=Free%20mockup%20request"
               className="btn-accent"
               style={{ padding: '18px 32px', fontSize: '1.0625rem' }}>
              Request the mockup <span aria-hidden>→</span>
            </a>
          </Magnetic>
        </FadeUp>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════
//                              FOOTER
// ═══════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', paddingBlock: 64 }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Future Media</div>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <a href="#work"     style={navLinkStyle}>Work</a>
            <a href="#process"  style={navLinkStyle}>Process</a>
            <a href="#pricing"  style={navLinkStyle}>Pricing</a>
            <a href="mailto:futuremediasam313@gmail.com" style={navLinkStyle}>Contact</a>
          </div>
        </div>
        <hr className="h-rule" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--color-ink-faint)' }}>
          <div>© {new Date().getFullYear()} Future Media. Built in Michigan.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="tel:+13134123694">313-412-3694</a>
            <a href="mailto:futuremediasam313@gmail.com">futuremediasam313@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


// ═══════════════════════════════════════════════════════════════════════
//                              ROOT PAGE
// ═══════════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <RecentWork />
      <HowItWorks />
      <Services />
      <Pricing />
      <Testimonials />
      <BigCTA />
      <Footer />
    </main>
  )
}
