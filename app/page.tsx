'use client'
import { useState, useEffect, useRef } from 'react'

// ─── BRAND TOKENS ─────────────────────────────────────────────────────
const BG      = '#060810'
const BG2     = '#070914'
const BG3     = '#0b0d1c'
const BLUE    = '#0050FF'
const BLUE2   = '#003DCC'
const WHITE   = '#EEF0FF'
const WHITE2  = '#d0d3ea'
const MUTED   = '#6b6e8a'
const BORDER  = 'rgba(0,80,255,0.14)'
const BORDER2 = 'rgba(255,255,255,0.07)'
const GREEN   = '#22c55e'
const RED     = '#ef4444'
const DF      = "'Barlow Condensed', sans-serif"
const BF      = "'Outfit', sans-serif"

// ─── DATA ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { init: 'M', name: 'Mike T.',  biz: 'Detroit Plumbing Pro',    city: 'Detroit',         result: '12 new calls/month', text: 'Sam built us a site in one week. First month we got 12 new calls from Google alone. Paid for itself 10x over. Wish I did this years ago.' },
  { init: 'R', name: 'Rick S.',  biz: 'S&S Electric',            city: 'Sterling Heights', result: '40% more leads',     text: "I was skeptical. Now our phone hasn't stopped ringing since launch. Best investment I made all year. I've been in business 18 years." },
  { init: 'J', name: 'Josh M.',  biz: 'Metro HVAC',              city: 'Warren',           result: '#2 Google ranking',  text: 'The free mockup sold me. No pushy sales pitch, just results. We rank #2 on Google for "HVAC Warren" now. Competitors with older sites are below us.' },
  { init: 'D', name: 'Dave K.',  biz: 'K&K Roofing',             city: 'Livonia',          result: 'Outranking 5 yr sites', text: 'Competitors had websites for years on us. We launched 3 months ago and are already outranking them locally. Sam delivered exactly what he promised.' },
  { init: 'T', name: 'Tony B.',  biz: 'B&B Auto Repair',         city: 'Pontiac',          result: '+40% Google calls',  text: 'Google calls up 40% since launch. Customers can actually find us now. I was paying for ads that weren\'t working. This site made them irrelevant.' },
  { init: 'C', name: 'Chris R.', biz: 'Royal Oak Landscaping',   city: 'Royal Oak',        result: '15 new clients/mo',  text: 'Answered every question fast, delivered exactly what they promised. Zero BS. Real professionals. The site looks 10x better than I expected.' },
]

const SERVICES = [
  { tag: 'From $799 One-Time', title: 'Custom Website Design',         desc: 'Mobile first, lightning fast sites built to rank on Google and turn visitors into calls. No templates, no cookie cutter garbage. Every site built from scratch.' },
  { tag: 'Included Free',       title: 'Local SEO & Google Rankings',   desc: 'We optimize your site so you show up when people search "plumber near me" or "electrician in [your city]". Dominate your local market from day one.' },
  { tag: 'Included Free',       title: 'Google Reviews Growth',         desc: 'Automated systems that collect more 5 star reviews, making you the obvious choice over every competitor in your market. Reviews equal trust equals customers.' },
  { tag: '1st Year Free',       title: 'Hosting & Maintenance',         desc: 'First year of hosting included free with every package. Fast, secure, fully managed. You focus on your trade, we handle your web presence.' },
]

const STEPS = [
  { n: '01', title: 'Get a Free Mockup',  desc: 'We design a real visual of your new website for free. No commitment, no credit card, no risk. You see it before paying a dollar.' },
  { n: '02', title: 'We Build It Fast',   desc: 'Once you approve, our team builds your site in 3 to 5 days. Professional, fast, and done right the first time with no cutting corners.' },
  { n: '03', title: 'Your Phone Rings',   desc: 'Your site goes live, ranks on Google, and customers start calling. That\'s the whole point, and that\'s what we deliver every time.' },
]

const PRICING = [
  {
    name: 'Starter', price: '$799', sub: 'one-time',
    stripe: 'https://buy.stripe.com/cNi00i8Yi1Oc6X65qG8g002',
    features: ['Custom 5 page website', 'Mobile responsive design', 'Google Maps integration', 'Contact form + click to call', 'Basic on page SEO', '3 revision rounds', '1 year free hosting', '3 to 5 day delivery'],
    hot: false,
  },
  {
    name: 'Pro', price: '$1,499', sub: 'one-time', badge: 'Most Popular',
    stripe: 'https://buy.stripe.com/aFaeVccau50oa9i6uK8g003',
    features: ['Custom 8 page website', 'Full local SEO setup', 'Google Business optimization', 'Review collection system', 'Speed optimization', '5 revision rounds', '1 year free hosting', '5 to 7 day delivery', '30 day post launch support'],
    hot: true,
  },
  {
    name: 'Elite', price: '$2,999', sub: 'one-time',
    stripe: 'https://buy.stripe.com/7sYeVc0rM3Wka9i4mC8g004',
    features: ['Custom 15+ page website', 'Advanced SEO + blog setup', 'Google Ads campaign setup', 'Analytics dashboard', '10 revision rounds', '1 year free hosting', '90 day priority support'],
    hot: false,
  },
  {
    name: 'Website Care Plan', price: '$49', sub: 'per month · optional add-on',
    stripe: 'https://buy.stripe.com/REPLACE_WITH_RECURRING_49_MO',
    features: ['Hosting + SSL + domain renewals', '1 content update per month', '1 Google Business post per month', 'Uptime monitoring + weekly backups', 'Priority support response', 'First 30 days free with any package'],
    hot: false,
  },
]

const FAQS = [
  { q: 'How long does it take?',              a: 'Most websites are live in 3 to 5 days. We work fast because we know your time is money. Larger Elite projects run 7 to 10 days.' },
  { q: 'What is this "free mockup" thing?',   a: 'Before you pay a single dollar, we build you a real visual mockup of your website. You approve it, then we build it. Zero risk. If you don\'t love it, you walk away and owe us nothing.' },
  { q: 'Do I own my website?',                a: '100% yes. You own the domain, the content, and all the code. We build it for you and hand over the keys. It\'s yours forever.' },
  { q: 'Will I rank on Google?',              a: 'That\'s the whole point. Every site we build includes local SEO so you rank when people in your city search for your service. Most clients see rankings within 30 to 60 days.' },
  { q: 'What if I\'m not tech savvy?',        a: 'Completely fine. You don\'t touch a thing. We handle all updates, hosting, and maintenance. Just reach out when you need a change.' },
  { q: 'Are there any monthly fees?',         a: 'No monthly fees ever. All packages are one time payments. You own your site outright. Hosting after year one is the only optional cost. You handle it or we manage it for a small flat fee.' },
]

const TRADES = ['Plumbers','Electricians','HVAC Contractors','Roofers','Auto Repair Shops','Landscapers','General Contractors','Welding Shops','Painters','Cleaning Services','Pest Control','Moving Companies','Handymen','Flooring Companies']

// ─── HELPERS ──────────────────────────────────────────────────────────
function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return <span style={{ color: '#fbbf24', fontSize: size, letterSpacing: 1 }}>{'★'.repeat(n)}</span>
}

function Tag({ children, color = BLUE }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      fontFamily: BF, fontSize: 10, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: 2.5,
      color, border: `1px solid ${color}30`,
      background: `${color}0e`, padding: '4px 12px', borderRadius: 100,
      display: 'inline-block',
    }}>{children}</span>
  )
}

function SectionLabel({ children, align = 'center' }: { children: React.ReactNode; align?: 'left' | 'center' }) {
  return (
    <div style={{ textAlign: align, marginBottom: 10 }}>
      <Tag>{children}</Tag>
    </div>
  )
}

function Reveal({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const offsets: Record<string, string> = {
    up: 'translateY(40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
  }

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0)' : offsets[direction],
      transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      height: 66,
      background: scrolled ? 'rgba(6,8,16,0.97)' : 'rgba(6,8,16,0.2)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: `1px solid ${scrolled ? BORDER2 : 'transparent'}`,
      transition: 'all 0.3s ease',
      padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="#" style={{ textDecoration: 'none', lineHeight: 0 }}>
        <span style={{ fontFamily: DF, fontWeight: 900, fontSize: 26, letterSpacing: '-0.5px', color: WHITE, lineHeight: 1 }}>
          FUTURE <span style={{ color: BLUE }}>MEDIA</span>
        </span>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {[['#services','Services'],['#how','Process'],['#reviews','Results'],['#pricing','Pricing']].map(([href, label]) => (
          <a key={href} href={href} className="hide-mobile"
            style={{ color: WHITE2, fontFamily: BF, fontSize: 14, fontWeight: 500, textDecoration: 'none', padding: '8px 14px', borderRadius: 8, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
            onMouseLeave={e => (e.currentTarget.style.color = WHITE2)}>
            {label}
          </a>
        ))}
        <a href="#contact" style={{
          marginLeft: 12, fontFamily: BF, fontWeight: 700,
          background: BLUE, color: '#fff', fontSize: 14,
          padding: '10px 22px', borderRadius: 8,
          textDecoration: 'none', whiteSpace: 'nowrap',
          transition: 'background 0.2s, transform 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = BLUE2; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = 'translateY(0)' }}>
          Free Mockup
        </a>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '120px 32px 80px' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: BORDER2 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
        {/* Left: Text */}
        <div>
          <div className="fade-up" style={{ marginBottom: 24 }}>
            <span style={{
              fontFamily: BF, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: 3,
              color: BLUE, border: `1px solid ${BORDER}`,
              background: `${BLUE}0d`, padding: '6px 16px', borderRadius: 100,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'inline-block', boxShadow: `0 0 8px ${GREEN}`, animation: 'live-blink 1.5s ease-in-out infinite' }} />
              Michigan&apos;s #1 Web Studio for Local Trades
            </span>
          </div>

          <h1 className="fade-up" style={{ fontFamily: DF, fontWeight: 900, fontSize: 'clamp(54px,7.5vw,108px)', lineHeight: 0.92, letterSpacing: '-1px', color: WHITE, margin: '0 0 6px', animationDelay: '0.1s' }}>
            YOUR COMPETITORS
          </h1>
          <h1 className="fade-up" style={{ fontFamily: DF, fontWeight: 900, fontSize: 'clamp(54px,7.5vw,108px)', lineHeight: 0.92, letterSpacing: '-1px', color: WHITE, margin: '0 0 6px', animationDelay: '0.15s' }}>
            ARE STEALING
          </h1>
          <h1 className="fade-up" style={{ fontFamily: DF, fontWeight: 900, fontSize: 'clamp(54px,7.5vw,108px)', lineHeight: 0.92, letterSpacing: '-1px', color: BLUE, margin: '0 0 32px', animationDelay: '0.2s' }}>
            YOUR CUSTOMERS.
          </h1>

          <p className="fade-up" style={{ fontFamily: BF, fontSize: 'clamp(15px,1.6vw,18px)', color: WHITE2, maxWidth: 560, lineHeight: 1.8, margin: '0 0 40px', animationDelay: '0.3s' }}>
            You&apos;ve built a great local business through hard work. But without a website, Google sends every customer straight to your competition.{' '}
            <strong style={{ color: WHITE, fontWeight: 600 }}>We fix that. You see the design before paying a dollar.</strong>
          </p>

          <div className="fade-up" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 52, animationDelay: '0.4s' }}>
            <a href="#contact" style={{
              fontFamily: BF, fontWeight: 700, fontSize: 16,
              background: BLUE, color: '#fff',
              padding: '18px 36px', borderRadius: 10,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: `0 8px 32px ${BLUE}40`,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = BLUE2; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = 'translateY(0)' }}>
              Get My FREE Mockup
            </a>
            <a href="#pricing" className="btn-glow" style={{
              fontFamily: BF, fontWeight: 700, fontSize: 15,
              background: `${BLUE}18`, color: WHITE,
              padding: '18px 30px', borderRadius: 10,
              textDecoration: 'none', border: `1px solid ${BLUE}50`,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = `${BLUE}18`; e.currentTarget.style.borderColor = `${BLUE}50`; e.currentTarget.style.transform = 'translateY(0)' }}>
              View Packages
            </a>
          </div>

          {/* Trust strip */}
          <div className="fade-up" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', animationDelay: '0.5s' }}>
            {[['50+','Michigan Businesses'],['4.9 ★','Avg Rating'],['Under 5 Days','Avg Launch'],['$0','To See Your Mockup']].map(([n, l]) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ fontFamily: DF, fontSize: 26, fontWeight: 800, color: WHITE, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: BF, fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: 1.5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Stat block (desktop only) */}
        <div className="hide-tablet" style={{
          background: BG3,
          border: `1px solid ${BORDER}`,
          borderRadius: 16,
          padding: '32px 28px',
          display: 'flex', flexDirection: 'column', gap: 24,
          minWidth: 240,
          boxShadow: `0 0 60px ${BLUE}18`,
        }}>
          {[
            { value: '50+', label: 'Sites Launched' },
            { value: '40%',  label: 'Avg Lead Increase' },
            { value: '5 Days', label: 'Avg Delivery' },
            { value: '4.9',  label: 'Client Rating' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 20, borderBottom: `1px solid ${BORDER2}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${BLUE}12`, border: `1px solid ${BLUE}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: BLUE, boxShadow: `0 0 10px ${BLUE}80` }} />
              </div>
              <div>
                <div style={{ fontFamily: DF, fontSize: 32, fontWeight: 900, color: WHITE, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: BF, fontSize: 12, color: WHITE2, marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
          <a href="#contact" style={{
            fontFamily: BF, fontWeight: 700, fontSize: 14,
            background: BLUE, color: '#fff',
            padding: '14px', borderRadius: 8,
            textDecoration: 'none', textAlign: 'center',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = BLUE2)}
            onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
            Start Free
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── TRUST STRIP ──────────────────────────────────────────────────────
function TrustStrip() {
  const doubled = [...TRADES, ...TRADES]
  return (
    <div style={{ background: BG2, borderTop: `1px solid ${BORDER2}`, borderBottom: `1px solid ${BORDER2}`, padding: '14px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: `linear-gradient(90deg, ${BG2}, transparent)`, zIndex: 2 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: `linear-gradient(-90deg, ${BG2}, transparent)`, zIndex: 2 }} />
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i} style={{ fontFamily: BF, color: MUTED, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: BLUE, display: 'inline-block', flexShrink: 0 }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── PROBLEM SECTION ──────────────────────────────────────────────────
function Problem() {
  const items = [
    { bad: true,  text: 'Invisible to people Googling your trade in your city' },
    { bad: true,  text: 'No way to showcase your Google reviews and reputation' },
    { bad: true,  text: 'Customers can\'t find your phone number after hours' },
    { bad: true,  text: 'Competitors with basic sites are outranking and outearning you' },
    { bad: false, text: 'Future Media fixes ALL of this, guaranteed' },
  ]
  return (
    <section style={{ padding: '120px 32px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 64, alignItems: 'center' }}>
        <Reveal direction="left">
          <div>
            <SectionLabel align="left">The Problem</SectionLabel>
            <h2 style={{ fontFamily: DF, fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.5px', color: WHITE, margin: '14px 0 24px' }}>
              RIGHT NOW, SOMEONE IS GOOGLING{' '}
              <span style={{ color: BLUE }}>&ldquo;PLUMBER NEAR ME&rdquo;</span>{' '}
              AND CALLING YOUR COMPETITOR.
            </h2>
            <p style={{ fontFamily: BF, color: WHITE2, lineHeight: 1.85, fontSize: 16, margin: '0 0 16px' }}>
              You&apos;ve earned your reputation through years of hard work. But reputation doesn&apos;t show up on Google. Websites do. Every day without one is customers, jobs, and money walking straight to whoever has a better looking site.
            </p>
            <p style={{ fontFamily: BF, color: WHITE2, lineHeight: 1.85, fontSize: 16 }}>
              Most of your competitors have terrible websites or none at all. We build sites that dominate local search and make you the obvious, trusted choice.
            </p>
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map(({ bad, text }) => (
              <div key={text} style={{
                background: bad ? 'rgba(239,68,68,0.04)' : `${BLUE}08`,
                border: `1px solid ${bad ? 'rgba(239,68,68,0.2)' : `${BLUE}30`}`,
                borderRadius: 10, padding: '16px 20px',
                display: 'flex', alignItems: 'flex-start', gap: 14,
                transition: 'border-color 0.2s',
              }}>
                <span style={{ fontSize: 16, flexShrink: 0, color: bad ? RED : BLUE, fontWeight: 900, marginTop: 1 }}>{bad ? '✗' : '✓'}</span>
                <span style={{ fontFamily: BF, color: bad ? '#fca5a5' : WHITE, fontSize: 15, lineHeight: 1.55, fontWeight: bad ? 400 : 700 }}>{text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ padding: '80px 32px', background: BG2, borderTop: `1px solid ${BORDER2}`, borderBottom: `1px solid ${BORDER2}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: 52 }}>
            <SectionLabel>What We Do</SectionLabel>
            <h2 style={{ fontFamily: DF, fontSize: 'clamp(38px,5vw,66px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.5px', color: WHITE, margin: '14px 0 12px', textAlign: 'center' }}>
              EVERYTHING YOU NEED TO WIN ONLINE
            </h2>
            <p style={{ fontFamily: BF, color: WHITE2, fontSize: 16, maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
              One studio, everything handled. No freelancers to manage, no tech headaches.
            </p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <ServiceCard s={s} idx={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ s, idx }: { s: typeof SERVICES[0]; idx: number }) {
  const [hov, setHov] = useState(false)
  const isFree = s.tag.toLowerCase().includes('free')
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: BG3, borderRadius: 14, padding: '32px 28px',
        border: `1px solid ${hov ? `${BLUE}50` : BORDER2}`,
        boxShadow: hov ? `0 0 40px ${BLUE}15` : 'none',
        transition: 'all 0.25s ease',
        transform: hov ? 'translateY(-3px)' : 'none',
        height: '100%',
      }}>
      <div style={{ fontFamily: DF, fontSize: 52, fontWeight: 900, color: `${BLUE}15`, lineHeight: 1, marginBottom: 14 }}>
        {String(idx + 1).padStart(2, '0')}
      </div>
      <div style={{ marginBottom: 12 }}>
        <span style={{
          fontFamily: BF, fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: 2,
          color: isFree ? GREEN : BLUE,
          border: `1px solid ${isFree ? GREEN + '40' : BORDER}`,
          background: isFree ? `${GREEN}10` : `${BLUE}0d`,
          padding: '3px 10px', borderRadius: 100, display: 'inline-block',
        }}>
          {s.tag}
        </span>
      </div>
      <h3 style={{ fontFamily: DF, fontSize: 26, fontWeight: 800, color: WHITE, margin: '0 0 10px', letterSpacing: '-0.3px' }}>{s.title}</h3>
      <p style={{ fontFamily: BF, color: WHITE2, fontSize: 14, lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
    </div>
  )
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how" style={{ padding: '110px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <SectionLabel>The Process</SectionLabel>
            <h2 style={{ fontFamily: DF, fontSize: 'clamp(38px,5vw,66px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.5px', color: WHITE, margin: '14px 0 12px' }}>
              FROM ZERO TO GOOGLE IN 3 STEPS
            </h2>
            <p style={{ fontFamily: BF, color: WHITE2, fontSize: 16 }}>We&apos;ve made it completely risk free to get started.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 2 }}>
          {STEPS.map(({ n, title, desc }, i) => (
            <Reveal key={n} delay={i * 0.12}>
              <div style={{
                padding: '40px 36px',
                background: BG3, border: `1px solid ${BORDER2}`,
                borderRadius: i === 0 ? '14px 2px 2px 14px' : i === 2 ? '2px 14px 14px 2px' : 2,
                position: 'relative', height: '100%',
              }}>
                {i < 2 && (
                  <div className="hide-mobile" style={{
                    position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
                    width: 24, height: 24, background: BLUE, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: '#fff', zIndex: 2,
                  }}>→</div>
                )}
                <div style={{ fontFamily: DF, fontSize: 72, fontWeight: 900, color: `${BLUE}20`, lineHeight: 1, marginBottom: 16 }}>{n}</div>
                <h3 style={{ fontFamily: DF, fontSize: 28, fontWeight: 800, color: WHITE, margin: '0 0 12px', letterSpacing: '-0.3px' }}>{title}</h3>
                <p style={{ fontFamily: BF, color: WHITE2, fontSize: 15, lineHeight: 1.8, margin: 0 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <a href="#contact" style={{
              fontFamily: BF, fontWeight: 700, fontSize: 16,
              background: BLUE, color: '#fff',
              padding: '18px 40px', borderRadius: 10,
              textDecoration: 'none', display: 'inline-block',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = BLUE2; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = 'translateY(0)' }}>
              Start With a Free Mockup
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────
function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [val, setVal] = useState(0)
    useEffect(() => {
      if (!triggered) return
      const start = Date.now(), dur = 1800
      const tick = () => {
        const p = Math.min((Date.now() - start) / dur, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(ease * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, [triggered, target])
    return <>{val.toLocaleString()}{suffix}</>
  }

  const items = [
    { n: 50, s: '+',        label: 'Michigan Businesses', sub: 'Sites Launched' },
    { n: 4,  s: '.9 ★',    label: 'Average Rating',       sub: 'From Real Clients' },
    { n: 5,  s: ' Days',   label: 'Average Launch',       sub: 'Faster Than Anyone' },
    { n: 100,s: '%',        label: 'Satisfaction Rate',    sub: 'Or We Fix It Free' },
  ]

  return (
    <section ref={ref} style={{ background: BG2, borderTop: `1px solid ${BORDER2}`, borderBottom: `1px solid ${BORDER2}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))' }}>
        {items.map(({ n, s, label, sub }, i) => (
          <div key={label} style={{
            padding: '64px 24px', textAlign: 'center',
            borderRight: i < 3 ? `1px solid ${BORDER2}` : 'none',
          }}>
            <div style={{ fontFamily: DF, fontSize: 'clamp(40px,5vw,64px)', fontWeight: 900, color: WHITE, lineHeight: 1, marginBottom: 8 }}>
              <Counter target={n} suffix={s} />
            </div>
            <div style={{ fontFamily: BF, fontSize: 14, color: WHITE, fontWeight: 600, marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: BF, fontSize: 12, color: MUTED }}>{sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="reviews" style={{ padding: '110px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionLabel>Real Results</SectionLabel>
            <h2 style={{ fontFamily: DF, fontSize: 'clamp(38px,5vw,66px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.5px', color: WHITE, margin: '14px 0 16px' }}>
              MICHIGAN BUSINESS OWNERS LOVE US
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <Stars size={18} />
              <span style={{ fontFamily: BF, color: WHITE2, fontSize: 15 }}>4.9 average from 50+ clients served across Michigan</span>
            </div>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: BG3, borderRadius: 14, padding: '28px',
        border: `1px solid ${hov ? `${BLUE}40` : BORDER2}`,
        transition: 'all 0.25s',
        transform: hov ? 'translateY(-2px)' : 'none',
        height: '100%',
      }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${GREEN}12`, border: `1px solid ${GREEN}30`, borderRadius: 8, padding: '4px 12px', fontSize: 11, fontFamily: BF, color: '#86efac', fontWeight: 700, marginBottom: 14 }}>
        {t.result}
      </div>
      <Stars />
      <p style={{ fontFamily: BF, color: WHITE2, fontSize: 14, lineHeight: 1.85, margin: '14px 0 22px', fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: `1px solid ${BORDER2}` }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 15, fontFamily: DF, color: '#fff', flexShrink: 0, letterSpacing: 0,
        }}>{t.init}</div>
        <div>
          <div style={{ fontFamily: BF, fontWeight: 700, color: WHITE, fontSize: 14 }}>{t.name}</div>
          <div style={{ fontFamily: BF, color: MUTED, fontSize: 12 }}>{t.biz}, {t.city} MI</div>
        </div>
        <div style={{ marginLeft: 'auto', background: `${BLUE}10`, border: `1px solid ${BORDER}`, borderRadius: 6, padding: '3px 8px', fontSize: 10, fontFamily: BF, color: BLUE, fontWeight: 700, whiteSpace: 'nowrap' }}>Verified</div>
      </div>
    </div>
  )
}

// ─── PRICING ──────────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" style={{ padding: '110px 32px', background: BG2, borderTop: `1px solid ${BORDER2}`, borderBottom: `1px solid ${BORDER2}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <SectionLabel>Pricing</SectionLabel>
            <h2 style={{ fontFamily: DF, fontSize: 'clamp(38px,5vw,66px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.5px', color: WHITE, margin: '14px 0 12px' }}>
              TRANSPARENT PRICING. NO SURPRISES.
            </h2>
            <p style={{ fontFamily: BF, color: WHITE2, fontSize: 16 }}>Every package starts with a free mockup. You don&apos;t pay until you love the design.</p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16, alignItems: 'start' }}>
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <PricingCard p={p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a href="#contact" style={{
              fontFamily: BF, fontWeight: 700, fontSize: 16,
              background: `${BLUE}15`, color: WHITE,
              padding: '18px 40px', borderRadius: 10,
              textDecoration: 'none', display: 'inline-block',
              border: `1px solid ${BLUE}40`,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = `${BLUE}15`; e.currentTarget.style.borderColor = `${BLUE}40`; e.currentTarget.style.transform = 'translateY(0)' }}>
              Not Sure? Get a Free Mockup First
            </a>
          </div>
          <p style={{ fontFamily: BF, textAlign: 'center', color: MUTED, fontSize: 14, marginTop: 20 }}>
            Not sure which package? Start with a free mockup and we&apos;ll recommend the right fit.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function PricingCard({ p }: { p: typeof PRICING[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: p.hot ? `${BLUE}08` : BG3,
        borderRadius: 16, padding: '36px',
        paddingTop: p.badge ? 48 : 36,
        border: `${p.hot ? 2 : 1}px solid ${hov || p.hot ? BLUE : BORDER2}`,
        boxShadow: p.hot ? `0 0 60px ${BLUE}20` : hov ? `0 0 30px ${BLUE}10` : 'none',
        transition: 'all 0.25s',
        position: 'relative',
        transform: hov ? 'translateY(-3px)' : 'none',
      }}>
      {p.badge && (
        <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: BLUE, color: '#fff', fontFamily: BF, fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap', letterSpacing: 0.5 }}>
          {p.badge}
        </div>
      )}
      <div style={{ fontFamily: BF, fontSize: 11, fontWeight: 700, color: MUTED, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1.5 }}>{p.name}</div>
      <div style={{ fontFamily: DF, fontSize: 64, fontWeight: 900, color: WHITE, lineHeight: 1, marginBottom: 4 }}>{p.price}</div>
      <div style={{ fontFamily: BF, color: BLUE, fontSize: 11, fontWeight: 700, marginBottom: 28, textTransform: 'uppercase', letterSpacing: 2 }}>{p.sub}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
        {p.features.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, fontFamily: BF, fontSize: 14, color: WHITE2 }}>
            <span style={{ color: GREEN, fontWeight: 900, flexShrink: 0, marginTop: 1, fontSize: 12 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <a href={p.stripe} target="_blank" rel="noopener noreferrer" style={{
        display: 'block', textAlign: 'center', padding: '15px',
        borderRadius: 10, fontFamily: BF, fontWeight: 700, fontSize: 15, textDecoration: 'none',
        background: p.hot ? BLUE : `${BLUE}15`,
        color: '#fff',
        border: p.hot ? 'none' : `1px solid ${BLUE}40`,
        transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = p.hot ? BLUE2 : BLUE; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = p.hot ? BLUE : `${BLUE}15`; e.currentTarget.style.transform = 'translateY(0)' }}>
        Buy Now
      </a>
    </div>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section style={{ padding: '100px 32px', maxWidth: 780, margin: '0 auto' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <SectionLabel>FAQ</SectionLabel>
          <h2 style={{ fontFamily: DF, fontSize: 'clamp(38px,5vw,60px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.5px', color: WHITE, margin: '14px 0 0' }}>
            COMMON QUESTIONS
          </h2>
        </div>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FAQS.map((f, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div style={{
              background: BG3, border: `1px solid ${open === i ? `${BLUE}50` : BORDER2}`,
              borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s',
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', padding: '20px 24px',
                background: 'none', border: 'none', color: WHITE,
                fontFamily: BF, fontSize: 15, fontWeight: 600, textAlign: 'left',
                cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
              }}>
                {f.q}
                <span style={{ color: BLUE, fontSize: 22, lineHeight: 1, flexShrink: 0, display: 'inline-block', transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s ease' }}>+</span>
              </button>
              <div style={{
                maxHeight: open === i ? 300 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s ease, padding 0.35s ease',
                padding: open === i ? '0 24px 20px' : '0 24px 0',
              }}>
                <div style={{ fontFamily: BF, color: WHITE2, fontSize: 15, lineHeight: 1.85 }}>{f.a}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────
function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [btnHov, setBtnHov] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('submitted=true')) {
      setSubmitted(true)
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const inp: React.CSSProperties = {
    width: '100%', background: BG3,
    border: `1px solid ${BORDER2}`,
    borderRadius: 10, padding: '14px 16px',
    fontFamily: BF, color: WHITE, fontSize: 15,
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: '110px 32px', background: BG2, borderTop: `1px solid ${BORDER2}` }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Tag color={GREEN}>Free Mockup. Zero Risk.</Tag>
            <h2 style={{ fontFamily: DF, fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.5px', color: WHITE, margin: '18px 0 16px' }}>
              READY TO START GETTING MORE CUSTOMERS?
            </h2>
            <p style={{ fontFamily: BF, color: WHITE2, fontSize: 16, lineHeight: 1.8 }}>
              Drop your info below. We&apos;ll build a real mockup of your new website completely free and reach out within 24 hours. No payment, no pressure.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {submitted ? (
            <div style={{ background: BG3, border: `1px solid ${GREEN}40`, borderRadius: 16, padding: '56px 36px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${GREEN}15`, border: `2px solid ${GREEN}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <span style={{ color: GREEN, fontSize: 28, fontWeight: 900 }}>✓</span>
              </div>
              <div style={{ fontFamily: DF, fontSize: 32, fontWeight: 900, color: WHITE, marginBottom: 14 }}>GOT IT!</div>
              <div style={{ fontFamily: BF, color: WHITE2, fontSize: 16, lineHeight: 1.85, maxWidth: 400, margin: '0 auto 28px' }}>
                We&apos;ll have your free mockup ready within 24 hours. Check your phone, Sam will be in touch.
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: `${GREEN}10`, border: `1px solid ${GREEN}30`, borderRadius: 12, padding: '14px 24px', fontFamily: BF, fontSize: 14, color: '#86efac', fontWeight: 700 }}>
                <span style={{ fontSize: 18 }}>✓</span> Request received, we&apos;ll be in touch soon
              </div>
            </div>
          ) : (
            <div style={{ background: BG3, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 40 }}>
              <form action="https://formspree.io/f/xgopolbd" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input type="hidden" name="_subject" value="New Free Mockup Request — Future Media" />
                <input type="hidden" name="_next" value="https://futuremediawebdesign.com/?submitted=true" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
                  <div>
                    <label style={{ fontFamily: BF, fontSize: 11, color: WHITE2, fontWeight: 700, display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: 1 }}>Your Name *</label>
                    <input required name="name" placeholder="John Smith" style={inp} />
                  </div>
                  <div>
                    <label style={{ fontFamily: BF, fontSize: 11, color: WHITE2, fontWeight: 700, display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: 1 }}>Phone Number *</label>
                    <input required name="phone" placeholder="(313) 555-0100" type="tel" style={inp} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: BF, fontSize: 11, color: WHITE2, fontWeight: 700, display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: 1 }}>Email Address *</label>
                  <input required name="email" placeholder="john@smithplumbing.com" type="email" style={inp} />
                </div>
                <div>
                  <label style={{ fontFamily: BF, fontSize: 11, color: WHITE2, fontWeight: 700, display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: 1 }}>Business Name *</label>
                  <input required name="business_name" placeholder="Smith Plumbing LLC" style={inp} />
                </div>
                <div>
                  <label style={{ fontFamily: BF, fontSize: 11, color: WHITE2, fontWeight: 700, display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: 1 }}>Type of Business *</label>
                  <input required name="business_type" placeholder="e.g. Plumber, Electrician, HVAC, Roofer..." style={inp} />
                </div>
                <button
                  type="submit"
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                  style={{
                    marginTop: 8,
                    background: btnHov ? BLUE2 : BLUE,
                    border: 'none', borderRadius: 12,
                    color: '#fff', fontFamily: DF, fontSize: 22, fontWeight: 900,
                    letterSpacing: 0.5, padding: '20px', cursor: 'pointer',
                    boxShadow: btnHov ? `0 0 60px ${BLUE}50` : `0 0 40px ${BLUE}30`,
                    transform: btnHov ? 'translateY(-2px)' : 'none',
                    transition: 'all 0.2s ease',
                  }}>
                  SEND ME MY FREE MOCKUP
                </button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 4, flexWrap: 'wrap' }}>
                  {['No payment required', 'No spam, ever', '24 hour response'].map(t => (
                    <span key={t} style={{ fontFamily: BF, fontSize: 12, color: MUTED, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ color: GREEN, fontSize: 11, fontWeight: 800 }}>✓</span> {t}
                    </span>
                  ))}
                </div>
              </form>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────
function Footer() {
  const [toast, setToast] = useState(false)

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('futuremediasam313@gmail.com').then(() => {
      setToast(true)
      setTimeout(() => setToast(false), 2500)
    })
  }

  return (
    <footer style={{ borderTop: `1px solid ${BORDER2}`, padding: '56px 32px 32px', background: '#030408', position: 'relative' }}>
      {/* Toast notification */}
      <div style={{
        position: 'fixed',
        bottom: toast ? 32 : -80,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#1a1d35',
        border: `1px solid ${BLUE}40`,
        color: WHITE,
        fontFamily: BF,
        fontSize: 14,
        fontWeight: 600,
        padding: '14px 28px',
        borderRadius: 12,
        zIndex: 9999,
        transition: 'bottom 0.35s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${BLUE}20`,
        whiteSpace: 'nowrap',
      }}>
        Email copied to clipboard
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 48, marginBottom: 48 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ fontFamily: DF, fontWeight: 900, fontSize: 28, letterSpacing: '-0.5px', color: WHITE, lineHeight: 1, marginBottom: 16 }}>
              FUTURE <span style={{ color: BLUE }}>MEDIA</span>
            </div>
            <p style={{ fontFamily: BF, color: WHITE2, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              Michigan&apos;s web design studio for local tradespeople and small businesses. We build sites that rank and convert, fast.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={copyEmail} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${BLUE}10`, border: `1px solid ${BORDER}`, color: BLUE, fontFamily: BF, fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${BLUE}20`; e.currentTarget.style.borderColor = `${BLUE}40` }}
                onMouseLeave={e => { e.currentTarget.style.background = `${BLUE}10`; e.currentTarget.style.borderColor = BORDER }}>
                Email Us
              </button>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: BLUE, color: '#fff', fontFamily: BF, fontSize: 12, fontWeight: 700, padding: '8px 14px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = BLUE2)}
                onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
                Free Mockup
              </a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: BF, color: WHITE, fontWeight: 700, fontSize: 11, marginBottom: 18, letterSpacing: 2, textTransform: 'uppercase' }}>Pages</div>
            {[['#services','Services'],['#how','How It Works'],['#reviews','Results'],['#pricing','Pricing'],['#contact','Get Free Mockup']].map(([href, label]) => (
              <div key={href} style={{ marginBottom: 12 }}>
                <a href={href} style={{ fontFamily: BF, color: MUTED, fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                  onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>{label}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: BF, color: WHITE, fontWeight: 700, fontSize: 11, marginBottom: 18, letterSpacing: 2, textTransform: 'uppercase' }}>Contact</div>
            <div style={{ fontFamily: BF, fontSize: 14, marginBottom: 12 }}>
              <button onClick={copyEmail} style={{ background: 'none', border: 'none', padding: 0, fontFamily: BF, color: MUTED, fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                futuremediasam313@gmail.com
              </button>
            </div>
            <div style={{ fontFamily: BF, color: MUTED, fontSize: 14, marginBottom: 12 }}>Michigan, United States</div>
            <div style={{ fontFamily: BF, color: MUTED, fontSize: 14, marginBottom: 20 }}>3 to 5 Day Launch Guarantee</div>
            <div style={{ background: `${GREEN}08`, border: `1px solid ${GREEN}20`, borderRadius: 10, padding: '12px 16px' }}>
              <div style={{ fontFamily: BF, fontSize: 11, color: '#86efac', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>No Monthly Fees</div>
              <div style={{ fontFamily: BF, fontSize: 12, color: MUTED }}>All packages are one time payments. You own your site.</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${BORDER2}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: BF, color: MUTED, fontSize: 13, margin: 0 }}>2026 Future Media Web Design Studio. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Stars size={12} />
            <span style={{ fontFamily: BF, color: MUTED, fontSize: 12 }}>4.9/5 from 50+ Michigan businesses</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── FLOATING CTA ─────────────────────────────────────────────────────
function PulseCTA() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  if (!show) return null
  return (
    <a href="#contact" style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 500,
      background: BLUE, color: '#fff',
      fontFamily: BF, fontWeight: 700, fontSize: 13,
      padding: '14px 22px', borderRadius: 50,
      textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
      boxShadow: `0 8px 32px ${BLUE}50`,
      transition: 'transform 0.2s, background 0.2s',
      animation: 'fade-in 0.3s ease forwards',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = BLUE2 }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = BLUE }}
      title="Get Free Mockup">
      Free Mockup
    </a>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div style={{ background: BG, color: WHITE, fontFamily: BF, overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <Problem />
      <Services />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <PulseCTA />
    </div>
  )
}
