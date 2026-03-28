'use client'
import { useState, useEffect, useRef } from 'react'

// ─── BRAND TOKENS ────────────────────────────────────────────────
const B   = '#3b82f6'    // electric blue
const P   = '#7c3aed'    // purple
const BG  = '#06070f'    // ultra dark navy (matches logo background)
const BG2 = '#0a0b15'    // section alt
const BG3 = '#0d0e1a'    // card bg
const E   = 'rgba(59,130,246,0.18)'   // border
const E2  = 'rgba(255,255,255,0.07)'  // subtle border
const M   = '#94a3b8'    // muted text

// ─── DATA ────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { init: 'M', name: 'Mike T.',  biz: 'Detroit Plumbing Pro',     city: 'Detroit',          result: '12 new calls/month', text: 'Sam built us a site in one week. First month we got 12 new calls from Google alone. Paid for itself 10x over. Wish I did this years ago.' },
  { init: 'R', name: 'Rick S.',  biz: 'S&S Electric',             city: 'Sterling Heights',  result: '40% more leads',     text: 'I was skeptical. Now our phone hasn\'t stopped ringing since launch. Best investment I made all year. I\'ve been in business 18 years.' },
  { init: 'J', name: 'Josh M.',  biz: 'Metro HVAC',               city: 'Warren',            result: '#2 Google ranking', text: 'The free mockup sold me. No pushy sales pitch, just results. We rank #2 on Google for "HVAC Warren" now. Competitors with older sites are below us.' },
  { init: 'D', name: 'Dave K.',  biz: 'K&K Roofing',              city: 'Livonia',           result: 'Outranking 5 yr olds', text: 'Competitors had websites for years on us. We launched 3 months ago and are already outranking them locally. Sam delivered exactly what he promised.' },
  { init: 'T', name: 'Tony B.',  biz: 'B&B Auto Repair',          city: 'Pontiac',           result: '+40% Google calls',  text: 'Google calls up 40% since launch. Customers can actually find us now. I was paying for ads that weren\'t working. This site made them irrelevant.' },
  { init: 'C', name: 'Chris R.', biz: 'Royal Oak Landscaping',    city: 'Royal Oak',         result: '15 new clients/mo', text: 'Answered every question fast, delivered exactly what they promised. Zero BS. Real professionals. The site looks 10x better than I expected.' },
]

const SERVICES = [
  { icon: '⚡', title: 'Custom Website Design', sub: 'From $499 One-Time', desc: 'Mobile-first, lightning-fast sites built to rank on Google and turn visitors into calls. Every site built from scratch. No templates, no cookie-cutter garbage.' },
  { icon: '📍', title: 'Local SEO & Google Rankings', sub: 'Included Free', desc: 'We optimize your site so you show up when people search "plumber near me" or "electrician in [your city]". Dominate your local market.' },
  { icon: '⭐', title: 'Google Reviews Growth', sub: 'Included Free', desc: 'Automated systems that collect more 5-star reviews, making you the obvious choice over every competitor in your market.' },
  { icon: '🔒', title: 'Hosting & Maintenance', sub: '1 Year Free', desc: 'First year of hosting included free with every package. Fast, secure, fully managed. You focus on your trade and we handle your web presence.' },
]

const STEPS = [
  { n: '01', title: 'Get a Free Mockup',  desc: 'We design a real visual of your new website for free. No commitment, no credit card, no risk. You see it before paying a dollar.' },
  { n: '02', title: 'We Build It Fast',   desc: 'Once you approve, our team builds your site in 3-5 days. Professional, fast, and done right the first time with no cutting corners.' },
  { n: '03', title: 'Your Phone Rings',   desc: 'Your site goes live, ranks on Google, and customers start calling. That\'s the whole point and that\'s what we deliver.' },
]

const PRICING = [
  {
    name: 'Starter', price: '$499', sub: 'one-time payment',
    features: ['Custom 5-page website', 'Mobile responsive design', 'Google Maps integration', 'Contact form + click-to-call', 'Basic on-page SEO', '1 revision round', '1 year free hosting', '3-5 day delivery'],
    cta: 'Get Started', hot: false,
  },
  {
    name: 'Pro', price: '$999', sub: 'one-time payment', badge: 'Most Popular',
    features: ['Custom 8-page website', 'Full local SEO setup', 'Google Business optimization', 'Review collection system', 'Speed optimization', '3 revision rounds', '1 year free hosting', '5-7 day delivery', '30-day post-launch support'],
    cta: 'Get Free Mockup', hot: true,
  },
  {
    name: 'Elite', price: '$1,999', sub: 'one-time payment',
    features: ['Custom 15+ page website', 'Advanced SEO + blog setup', 'Regular content updates included', 'Google Ads campaign setup', 'Analytics dashboard', 'Unlimited revisions', '1 year free hosting', '90-day priority support'],
    cta: "Let's Talk", hot: false,
  },
]

const FAQS = [
  { q: 'How long does it take?',               a: 'Most websites are live in 3-5 days. We work fast because we know your time is money. Larger Elite projects run 7-10 days.' },
  { q: 'What\'s this "free mockup" thing?',    a: 'Before you pay a single dollar, we build you a real visual mockup of your website. You approve it, then we build it. Zero risk. If you don\'t love it, you walk away and owe us nothing.' },
  { q: 'Do I own my website?',                 a: '100% yes. You own the domain, the content, and all the code. We build it for you and hand over the keys. It\'s yours forever.' },
  { q: 'Will I rank on Google?',               a: 'That\'s the whole point. Every site we build includes local SEO so you rank when people in your city search for your service. Most clients see rankings within 30-60 days.' },
  { q: 'Is that ok if I\'m not tech-savvy?',   a: 'Completely fine. You don\'t touch a thing. We handle all updates, hosting, and maintenance. Just reach out when you need a change.' },
  { q: 'Are there any monthly fees?',          a: 'No monthly fees ever. All packages are one-time payments. You own your site outright. The only optional recurring cost is hosting after year one, which you can handle yourself or we can manage for a small flat fee.' },
]

const PROBLEMS = [
  { bad: true,  text: 'Invisible to people Googling your trade in your city' },
  { bad: true,  text: 'No way to showcase your Google reviews and reputation' },
  { bad: true,  text: 'Customers can\'t find your phone number after hours' },
  { bad: true,  text: 'Competitors with basic sites are outranking and outearning you' },
  { bad: false, text: 'Future Media fixes ALL of this, guaranteed' },
]


// ─── HELPERS ─────────────────────────────────────────────────────
function Stars({ size = 14 }: { size?: number }) {
  return <span style={{ color: '#fbbf24', fontSize: size, letterSpacing: 1 }}>★★★★★</span>
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: `linear-gradient(135deg, ${B} 0%, ${P} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {children}
    </span>
  )
}

function Label({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      color: color || B, fontSize: 11, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: 3,
      marginBottom: 16, padding: '5px 14px',
      border: `1px solid ${color ? color + '40' : E}`,
      borderRadius: 100, background: color ? color + '10' : 'rgba(59,130,246,0.07)',
    }}>
      {children}
    </div>
  )
}

function GlassCard({ children, hot, style }: { children: React.ReactNode; hot?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: hot
        ? `linear-gradient(160deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.08) 100%)`
        : 'rgba(255,255,255,0.03)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: `1px solid ${hot ? B + '50' : E2}`,
      borderRadius: 20,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: hot ? `0 0 60px ${B}15, 0 20px 60px rgba(0,0,0,0.4)` : '0 4px 30px rgba(0,0,0,0.2)',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      ...style,
    }}>
      {hot && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${B}, ${P}, ${B})`, backgroundSize: '200%', animation: 'border-spin 3s linear infinite' }} />
      )}
      {children}
    </div>
  )
}

// ─── NAVBAR ──────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      height: 68,
      background: scrolled ? 'rgba(6,7,15,0.95)' : 'rgba(6,7,15,0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${scrolled ? E2 : 'transparent'}`,
      transition: 'all 0.35s ease',
      padding: '0 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="#" style={{ textDecoration: 'none' }}>
        <img src="/logo.jpg" alt="Future Media" style={{ height: 44, width: 'auto', display: 'block' }} />
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[['#services','Services'],['#how','Process'],['#reviews','Results'],['#pricing','Pricing']].map(([href, label]) => (
          <a key={href} href={href} className="hide-mobile" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none', padding: '8px 14px', borderRadius: 8, fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
            {label}
          </a>
        ))}
        <a href="#contact" style={{
          marginLeft: 8,
          background: `linear-gradient(135deg, ${B}, ${P})`,
          color: '#fff', fontSize: 14, fontWeight: 700,
          padding: '11px 24px', borderRadius: 10,
          textDecoration: 'none',
          boxShadow: `0 0 28px ${B}35`,
          whiteSpace: 'nowrap',
          transition: 'box-shadow 0.2s, transform 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 50px ${B}60`; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 28px ${B}35`; e.currentTarget.style.transform = 'translateY(0)' }}>
          Free Mockup →
        </a>
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="grid-bg" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '110px 24px 80px' }}>
      {/* Aurora glows */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 1000, height: 700, background: `radial-gradient(ellipse at center, ${B}1a 0%, ${P}0d 40%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none', animation: 'aurora 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '5%', right: '0%', width: 600, height: 500, background: `radial-gradient(ellipse, ${P}12 0%, transparent 65%)`, filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '0%', width: 400, height: 400, background: `radial-gradient(ellipse, ${B}0d 0%, transparent 65%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 900, margin: '0 auto', zIndex: 2 }}>

        {/* Live badge */}
        <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(59,130,246,0.08)', border: `1px solid ${B}30`, borderRadius: 100, padding: '8px 20px', fontSize: 13, color: B, marginBottom: 32, fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 10px #22c55e', animation: 'live-blink 1.5s ease-in-out infinite' }} />
          Michigan's #1 Web Studio for Local Businesses
        </div>

        {/* Headlines */}
        <h1 className="fade-up" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(40px,6.5vw,80px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 10px', letterSpacing: -2, color: '#fff', animationDelay: '0.1s' }}>
          Your Competitors Are
        </h1>
        <h1 className="fade-up" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(40px,6.5vw,80px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 36px', letterSpacing: -2, animationDelay: '0.2s' }}>
          <GradientText>Stealing Your Customers.</GradientText>
        </h1>

        <p className="fade-up" style={{ fontSize: 'clamp(16px,2vw,20px)', color: '#94a3b8', maxWidth: 680, margin: '0 auto 48px', lineHeight: 1.8, animationDelay: '0.3s' }}>
          You've built a great local business through hard work and reputation. But without a website, Google sends every customer straight to your competition.{' '}
          <strong style={{ color: '#e2e8f0' }}>We fix that with a free mockup first.</strong>
        </p>

        {/* CTAs */}
        <div className="fade-up" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64, animationDelay: '0.4s' }}>
          <a href="#contact" className="pulse-btn" style={{
            background: `linear-gradient(135deg, ${B}, ${P})`,
            color: '#fff', fontSize: 17, fontWeight: 700,
            padding: '20px 40px', borderRadius: 14,
            textDecoration: 'none',
            boxShadow: `0 0 60px ${B}40`,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span>⚡</span> Get My FREE Mockup
          </a>
        </div>

        {/* Stats */}
        <div className="fade-up" style={{ display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap', borderTop: `1px solid ${E2}`, paddingTop: 40, animationDelay: '0.5s' }}>
          {[['50+','Michigan Businesses'],['4.9 ★','Avg Client Rating'],['3-5 Days','Avg Launch Time'],['$0','To See Your Mockup']].map(([n, l], i) => (
            <div key={l} style={{ padding: '0 32px', borderRight: i < 3 ? `1px solid ${E2}` : 'none', textAlign: 'center' }} className="hide-mobile">
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 11, color: M, marginTop: 6, letterSpacing: 0.5, textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
          {/* Mobile stats */}
          <div style={{ display: 'none' }} className="stack-mobile">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 28, fontWeight: 900, color: '#fff' }}>50+ Clients · 4.9 ★ · 3-5 Day Launch · Free Mockup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── MARQUEE TRUST STRIP ─────────────────────────────────────────
function TrustStrip() {
  const trades = ['Plumbers','Electricians','HVAC Contractors','Roofers','Auto Repair Shops','Landscapers','General Contractors','Towing Companies','Welding Shops','Painters','Cleaning Services','Pest Control','Moving Companies','Handymen','Flooring Companies']
  const double = [...trades, ...trades]
  return (
    <div style={{ background: BG2, borderTop: `1px solid ${E2}`, borderBottom: `1px solid ${E2}`, padding: '16px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(90deg, ${BG2}, transparent)`, zIndex: 2 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(-90deg, ${BG2}, transparent)`, zIndex: 2 }} />
      <div className="marquee-track">
        {double.map((t, i) => (
          <span key={i} style={{ color: '#334155', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: B, fontSize: 10 }}>●</span> {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── PROBLEM ─────────────────────────────────────────────────────
function Problem() {
  return (
    <section style={{ padding: '120px 24px', maxWidth: 1160, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 60, alignItems: 'center' }}>
        <div>
          <Label>The Problem</Label>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px,4vw,50px)', fontWeight: 900, lineHeight: 1.14, margin: '0 0 24px', color: '#fff' }}>
            Right now, someone is Googling<br />
            <GradientText>"plumber near me"</GradientText><br />
            and calling your competitor.
          </h2>
          <p style={{ color: '#64748b', lineHeight: 1.9, fontSize: 16, margin: '0 0 20px' }}>
            You've earned your reputation through years of hard work. But reputation doesn't show up on Google. Websites do. Every day without one is customers, jobs, and money walking straight to whoever has a better-looking site.
          </p>
          <p style={{ color: '#64748b', lineHeight: 1.9, fontSize: 16 }}>
            Here's the good news: most of your competitors have terrible websites or none at all. We build sites that dominate local search and make you the obvious, trusted choice.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROBLEMS.map(({ bad, text }) => (
            <GlassCard key={text} style={{
              padding: '18px 22px',
              background: bad ? 'rgba(239,68,68,0.04)' : 'rgba(34,197,94,0.05)',
              border: `1px solid ${bad ? 'rgba(239,68,68,0.18)' : 'rgba(34,197,94,0.25)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{bad ? '✗' : '✓'}</span>
                <span style={{ color: bad ? '#fca5a5' : '#86efac', fontSize: 15, lineHeight: 1.55, fontWeight: bad ? 400 : 700 }}>{text}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ padding: '80px 24px', background: BG2 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Label>What We Do</Label>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>
            Everything You Need to Win Online
          </h2>
          <p style={{ color: '#64748b', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
            One studio, everything handled. No freelancers to manage, no tech headaches.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
          {SERVICES.map((s, i) => (
            <GlassCard key={s.title} style={{ padding: 32 }}
            >
              <div style={{ fontSize: 40, marginBottom: 20 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: i === 2 ? '#22c55e' : B, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                {i === 2 && <span style={{ background: '#22c55e', color: '#000', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4 }}>FREE</span>}
                {i === 3 && <span style={{ background: B, color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4 }}>FREE 1ST YEAR</span>}
                {s.sub}
              </div>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>{s.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}


// ─── HOW IT WORKS ────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how" style={{ padding: '100px 24px', background: BG2 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Label>The Process</Label>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>
            From Zero to Google in 3 Steps
          </h2>
          <p style={{ color: '#64748b', fontSize: 16 }}>We've made it completely risk-free to get started.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {STEPS.map(({ n, title, desc }) => (
            <GlassCard key={n} style={{ padding: 40, textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: `linear-gradient(135deg, ${B}20, ${P}20)`,
                border: `2px solid ${B}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontSize: 22, fontWeight: 900, color: B,
                fontFamily: "'Montserrat', sans-serif",
              }}>{n}</div>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 14px' }}>{title}</h3>
              <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.8, margin: 0 }}>{desc}</p>
            </GlassCard>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="#contact" style={{
            background: `linear-gradient(135deg, ${B}, ${P})`,
            color: '#fff', fontSize: 16, fontWeight: 700,
            padding: '18px 40px', borderRadius: 12,
            textDecoration: 'none', display: 'inline-block',
            boxShadow: `0 0 50px ${B}35`,
          }}>
            Start With a Free Mockup →
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── STATS ───────────────────────────────────────────────────────
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
      const start = Date.now()
      const dur = 2000
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
    { n: 50, suffix: '+', label: 'Michigan Businesses', sub: 'Sites Launched' },
    { n: 4, suffix: '.9 ★', label: 'Average Rating', sub: 'From Real Clients' },
    { n: 3, suffix: '-5 Days', label: 'Average Launch', sub: 'Faster Than Anyone' },
    { n: 100, suffix: '%', label: 'Satisfaction Rate', sub: 'Or We Fix It Free' },
  ]

  return (
    <section ref={ref} style={{ padding: '0', background: BG, borderTop: `1px solid ${E2}`, borderBottom: `1px solid ${E2}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${B}0a 0%, transparent 60%)`, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {items.map(({ n, suffix, label, sub }, i) => (
          <div key={label} style={{ padding: '60px 20px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${E2}` : 'none' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 8 }}>
              <Counter target={n} suffix={suffix} />
            </div>
            <div style={{ fontSize: 14, color: '#fff', fontWeight: 700, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 12, color: M }}>{sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="reviews" style={{ padding: '100px 24px', background: BG3 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Label>Real Results</Label>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', margin: '0 0 16px' }}>
            Michigan Business Owners Love Us
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <Stars size={18} />
            <span style={{ color: '#94a3b8', fontSize: 15 }}>4.9 average · 50+ clients served across Michigan</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20 }}>
          {TESTIMONIALS.map(t => (
            <GlassCard key={t.name} style={{ padding: 28 }}>
              {/* Result badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 8, padding: '4px 12px', fontSize: 11, color: '#86efac', fontWeight: 700, marginBottom: 16 }}>
                📈 {t.result}
              </div>
              <Stars />
              <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.85, margin: '14px 0 24px', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${B}, ${P})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff', flexShrink: 0 }}>{t.init}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: M, fontSize: 12 }}>{t.biz} · {t.city}, MI</div>
                </div>
                <div style={{ marginLeft: 'auto', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 6, padding: '3px 8px', fontSize: 10, color: B, fontWeight: 700 }}>Google Verified</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PRICING ─────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <Label>Pricing</Label>
        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>
          Transparent Pricing. No Surprises.
        </h2>
        <p style={{ color: '#64748b', fontSize: 16 }}>Every package starts with a free mockup. You don't pay until you love the design.</p>
      </div>

      {/* Urgency banner */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 100, padding: '8px 22px', fontSize: 13, color: '#fca5a5', fontWeight: 600 }}>
          <span style={{ animation: 'live-blink 1s infinite', display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#ef4444' }} />
          Only accepting 3 new clients this month. Spots fill fast.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
        {PRICING.map(p => (
          <GlassCard key={p.name} hot={p.hot} style={{ padding: 36 }}>
            {p.badge && (
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${B}, ${P})`, color: '#fff', fontSize: 11, fontWeight: 800, padding: '5px 20px', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: 0.5 }}>{p.badge}</div>
            )}
            <div style={{ fontSize: 12, fontWeight: 700, color: M, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 52, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{p.price}</span>
            </div>
            <div style={{ color: B, fontSize: 12, fontWeight: 700, marginBottom: 28, textTransform: 'uppercase', letterSpacing: 1 }}>{p.sub}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
              {p.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, fontSize: 14, color: '#cbd5e1' }}>
                  <span style={{ color: '#22c55e', fontWeight: 900, flexShrink: 0, marginTop: 1, fontSize: 13 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" style={{
              display: 'block', textAlign: 'center', padding: '15px',
              borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none',
              background: p.hot ? `linear-gradient(135deg, ${B}, ${P})` : 'rgba(255,255,255,0.05)',
              color: '#fff',
              border: p.hot ? 'none' : `1px solid ${E2}`,
              boxShadow: p.hot ? `0 0 40px ${B}30` : 'none',
            }}>
              {p.cta}
            </a>
          </GlassCard>
        ))}
      </div>
      <p style={{ textAlign: 'center', color: M, fontSize: 14, marginTop: 28 }}>
        Not sure which package? Start with a free mockup and we'll recommend the right fit.
      </p>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section style={{ padding: '80px 24px', maxWidth: 780, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <Label>FAQ</Label>
        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, color: '#fff', margin: 0 }}>
          Common Questions
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${open === i ? B + '50' : E2}`,
            borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s',
          }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width: '100%', padding: '20px 24px',
              background: 'none', border: 'none', color: '#fff',
              fontSize: 15, fontWeight: 700, textAlign: 'left',
              cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
            }}>
              {f.q}
              <span style={{ color: B, fontSize: 24, lineHeight: 1, flexShrink: 0, display: 'inline-block', transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s ease' }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 24px 20px', color: '#94a3b8', fontSize: 15, lineHeight: 1.85 }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────
function Contact() {
  const [name, setName]   = useState('')
  const [phone, setPhone] = useState('')
  const [biz, setBiz]     = useState('')
  const [type, setType]   = useState('')
  const [done, setDone]   = useState(false)

  const inp: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(8px)',
    border: `1px solid ${E2}`,
    borderRadius: 12,
    padding: '15px 18px',
    color: '#fff',
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden', background: BG2 }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 600, background: `radial-gradient(ellipse, ${B}12 0%, ${P}08 40%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 660, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Label color="#22c55e">Free Mockup. Zero Risk.</Label>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px,4vw,56px)', fontWeight: 900, color: '#fff', margin: '0 0 18px', lineHeight: 1.14 }}>
            Ready to Start Getting<br /><GradientText>More Customers?</GradientText>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.8 }}>
            Drop your info below. We'll build a real mockup of your new website completely free and reach out within 24 hours. No payment, no pressure.
          </p>
        </div>

        {done ? (
          <GlassCard style={{ padding: '56px 36px', textAlign: 'center' }}>
            <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 12 }}>You're in!</div>
            <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.75 }}>
              We'll reach out within 24 hours to start your free mockup. Keep an eye on your phone. We usually call same day.
            </div>
          </GlassCard>
        ) : (
          <GlassCard style={{ padding: 40 }}>
            <form onSubmit={e => { e.preventDefault(); setDone(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Your Name *</label>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" style={inp} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Phone Number *</label>
                  <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="(313) 555-0100" style={inp} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Business Name *</label>
                <input required value={biz} onChange={e => setBiz(e.target.value)} placeholder="Smith Plumbing LLC" style={inp} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>What type of business? *</label>
                <input required value={type} onChange={e => setType(e.target.value)} placeholder="e.g. Plumber, Electrician, HVAC, Roofer..." style={inp} />
              </div>
              <button type="submit" style={{
                marginTop: 8,
                background: `linear-gradient(135deg, ${B}, ${P})`,
                border: 'none', borderRadius: 14,
                color: '#fff', fontSize: 17, fontWeight: 800,
                padding: '20px', cursor: 'pointer',
                boxShadow: `0 0 60px ${B}40`,
                letterSpacing: 0.3,
                fontFamily: "'Montserrat', sans-serif",
              }}>
                Send Me My Free Mockup →
              </button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 4, flexWrap: 'wrap' }}>
                {['No payment required','No spam, ever','24-hour response'].map(t => (
                  <span key={t} style={{ fontSize: 12, color: M, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ color: '#22c55e', fontSize: 11, fontWeight: 800 }}>✓</span> {t}
                  </span>
                ))}
              </div>
            </form>
          </GlassCard>
        )}
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${E2}`, padding: '56px 24px 32px', background: '#030408' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ marginBottom: 18 }}>
              <img src="/logo.jpg" alt="Future Media" style={{ height: 48, width: 'auto' }} />
            </div>
            <p style={{ color: '#334155', fontSize: 14, lineHeight: 1.8 }}>
              Michigan's web design studio for local tradespeople and small businesses. We build sites that rank and convert fast.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a href="mailto:futuremediasam313@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59,130,246,0.1)', border: `1px solid ${E}`, color: B, fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 8, textDecoration: 'none' }}>
                📧 Email Us
              </a>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `linear-gradient(135deg,${B},${P})`, color: '#fff', fontSize: 12, fontWeight: 700, padding: '8px 14px', borderRadius: 8, textDecoration: 'none' }}>
                Free Mockup →
              </a>
            </div>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 12, marginBottom: 18, letterSpacing: 1.5, textTransform: 'uppercase' }}>Pages</div>
            {[['#services','Services'],['#how','How It Works'],['#portfolio','Our Work'],['#reviews','Reviews'],['#pricing','Pricing'],['#contact','Get Free Mockup']].map(([href, label]) => (
              <div key={href} style={{ marginBottom: 12 }}>
                <a href={href} style={{ color: '#334155', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#334155')}>{label}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 12, marginBottom: 18, letterSpacing: 1.5, textTransform: 'uppercase' }}>Contact</div>
            <div style={{ color: '#334155', fontSize: 14, marginBottom: 12 }}>
              <a href="mailto:futuremediasam313@gmail.com" style={{ color: '#334155', textDecoration: 'none' }}>📧 futuremediasam313@gmail.com</a>
            </div>
            <div style={{ color: '#334155', fontSize: 14, marginBottom: 12 }}>📍 Michigan, United States</div>
            <div style={{ color: '#334155', fontSize: 14, marginBottom: 20 }}>⚡ 3-5 Day Launch Guarantee</div>
            <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10, padding: '12px 16px' }}>
              <div style={{ fontSize: 11, color: '#86efac', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>No Monthly Fees</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>All packages are one-time payments. You own your site.</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${E2}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#1e293b', fontSize: 13, margin: 0 }}>© 2025 Future Media Web Design Studio. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Stars size={12} />
            <span style={{ color: '#334155', fontSize: 12 }}>4.9/5 from 50+ Michigan businesses</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── FIXED PULSE CTA ─────────────────────────────────────────────
function PulseCTA() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  if (!show) return null
  return (
    <a href="#contact" className="pulse-btn" style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 500,
      width: 64, height: 64,
      background: `linear-gradient(135deg, ${B}, ${P})`,
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textDecoration: 'none',
      boxShadow: `0 0 40px ${B}50`,
      fontSize: 26,
      animation: 'pulse-ring 2.5s infinite',
    }} title="Get Free Mockup">
      ⚡
    </a>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div style={{ background: BG, color: '#e2e8f0', fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", overflowX: 'hidden' }}>
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
