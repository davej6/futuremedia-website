'use client'
import { useState, useEffect, useRef } from 'react'

// ─── BRAND TOKENS ───────────────────────────────────────────────
const B  = '#3b82f6'   // electric blue
const P  = '#7c3aed'   // purple
const BG = '#0a0a0f'   // deep space
const C  = '#13131e'   // card bg
const E  = 'rgba(59,130,246,0.2)'    // border
const M  = '#a0a0b0'   // muted

// ─── DATA ───────────────────────────────────────────────────────
const TESTIMONIALS = [
  { init: 'M', name: 'Mike T.',  biz: 'Detroit Plumbing Pro',     city: 'Detroit',         text: 'Sam built us a site in one week. First month we got 12 new calls from Google alone. Paid for itself 10x over.' },
  { init: 'R', name: 'Rick S.',  biz: 'S&S Electric',             city: 'Sterling Heights', text: 'I was skeptical at first. Our phone hasn\'t stopped ringing since we launched. Best investment I made all year.' },
  { init: 'J', name: 'Josh M.',  biz: 'Metro HVAC',               city: 'Warren',           text: 'The free mockup sold me. No pushy sales pitch, just results. We rank #2 on Google for HVAC Warren now.' },
  { init: 'D', name: 'Dave K.',  biz: 'K&K Roofing',              city: 'Livonia',          text: 'Competitors had websites for years on us. We launched 3 months ago and are already outranking them locally.' },
  { init: 'T', name: 'Tony B.',  biz: 'B&B Auto Repair',          city: 'Pontiac',          text: 'Google calls are up 40% since we launched. Customers can actually find us now. Future Media delivered big.' },
  { init: 'C', name: 'Chris R.', biz: 'Royal Oak Landscaping',    city: 'Royal Oak',        text: 'Answered every question, delivered exactly what they promised. Zero BS. Real professionals.' },
]

const SERVICES = [
  { icon: '🌐', title: 'Custom Website Design', sub: 'From $499', desc: 'Mobile-first, lightning-fast websites built to rank on Google and turn visitors into customers. Every site is built from scratch for your specific business.' },
  { icon: '📈', title: 'Local SEO & Google Rankings', sub: 'Included Free', desc: 'We optimize your site so you show up when people search "plumber near me" or "electrician in [your city]". Own your local market.' },
  { icon: '⭐', title: 'Google Reviews Growth', sub: 'Included Free', desc: 'We set up systems that automatically collect more 5-star reviews — making your business the obvious choice over competitors.' },
  { icon: '🔧', title: 'Hosting & Maintenance', sub: '1 Year Free', desc: 'First year of hosting included free with every package. Fast, secure, and fully managed so you never have to think about it.' },
]

const STEPS = [
  { n: '01', title: 'Get a Free Mockup',   desc: 'We design a real visual mockup of your website for free. No commitment, no credit card, no risk.' },
  { n: '02', title: 'We Build It Fast',    desc: 'Once you approve, our team builds your site in 3-5 days. Professional, fast, and done right the first time.' },
  { n: '03', title: 'Your Phone Rings',    desc: 'Your site goes live, ranks on Google, and customers start calling. That\'s the whole point.' },
]

const PRICING = [
  {
    name: 'Starter', price: '$499', sub: 'one-time payment',
    features: ['Custom 5-page website', 'Mobile responsive design', 'Google Maps integration', 'Contact form + click-to-call', 'Basic on-page SEO', '1 revision round', '3-5 day delivery'],
    cta: 'Get Started', hot: false,
  },
  {
    name: 'Pro', price: '$999', sub: 'one-time payment', badge: 'Most Popular',
    features: ['Custom 8-page website', 'Full local SEO setup', 'Google Business optimization', 'Review collection system', 'Speed optimization', '3 revision rounds', '5-7 day delivery', '30-day post-launch support'],
    cta: 'Get Free Mockup', hot: true,
  },
  {
    name: 'Elite', price: '$1,999', sub: 'one-time payment',
    features: ['Custom 15+ page website', 'Advanced SEO + blog setup', 'Regular content updates included', 'Google Ads campaign setup', 'Analytics dashboard', 'Unlimited revisions', '90-day priority support'],
    cta: "Let's Talk", hot: false,
  },
]

const FAQS = [
  { q: 'How long does it take?',             a: 'Most websites are live in 3-5 days. We work fast because we know your time is money.' },
  { q: 'What\'s this "free mockup" thing?',  a: 'Before you pay a single dollar, we build you a real visual mockup of your website. You approve it, then we build it. Zero risk.' },
  { q: 'Do I own my website?',               a: '100% yes. You own the domain, the content, and all the code. We build it for you and hand over the keys.' },
  { q: 'Will I rank on Google?',             a: 'That\'s the whole point. Every site we build includes local SEO so you rank when people in your city search for your service.' },
  { q: 'Is that ok if I\'m not tech-savvy?', a: 'Completely fine. You don\'t touch a thing. We handle all updates, hosting, and maintenance. Just reach out when you need a change.' },
  { q: 'Are there any monthly fees?',        a: 'No monthly fees ever. All packages are one-time payments. You own your site outright. The only optional recurring cost is hosting after year one, which you can handle yourself or we can manage for a small flat fee.' },
]

const PROBLEMS = [
  { bad: true,  text: 'Invisible to people Googling your trade in your city' },
  { bad: true,  text: 'No way to show off your Google Reviews online' },
  { bad: true,  text: 'Customers can\'t find your phone number after hours' },
  { bad: true,  text: 'Competitors with basic sites are outranking and outearning you' },
  { bad: false, text: 'Future Media fixes ALL of this, guaranteed' },
]

// ─── HELPERS ────────────────────────────────────────────────────
function Stars() {
  return <span style={{ color: '#fbbf24', fontSize: 14, letterSpacing: 1 }}>★★★★★</span>
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: `linear-gradient(135deg, ${B}, ${P})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ color: B, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 14 }}>
      {children}
    </div>
  )
}

function Card({ children, hot, style }: { children: React.ReactNode; hot?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: hot ? `linear-gradient(160deg, rgba(37,99,235,0.12), rgba(124,58,237,0.06))` : C,
      border: `1px solid ${hot ? B + '60' : E}`,
      borderRadius: 16,
      position: 'relative',
      boxShadow: hot ? `0 0 50px ${B}18` : 'none',
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── NAVBAR ─────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 64,
      background: scrolled ? 'rgba(10,10,15,0.97)' : 'rgba(10,10,15,0.6)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${scrolled ? E : 'transparent'}`,
      transition: 'all 0.3s',
      padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.jpg" alt="Future Media" style={{ height: '48px', width: 'auto' }} />
      </div>
      {/* Links + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {[['#services','Services'],['#pricing','Pricing'],['#reviews','Reviews']].map(([href, label]) => (
          <a key={href} href={href} className="hide-mobile" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none', padding: '8px 14px', borderRadius: 8 }}>{label}</a>
        ))}
        <a href="#contact" style={{ background: `linear-gradient(135deg,${B},${P})`, color: '#fff', fontSize: 14, fontWeight: 700, padding: '10px 22px', borderRadius: 8, textDecoration: 'none', boxShadow: `0 0 24px ${B}40`, whiteSpace: 'nowrap' }}>Free Mockup →</a>
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '100px 24px 80px' }}>
      {/* Animated grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
      {/* Aurora glows */}
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, background: `radial-gradient(ellipse, ${B}22 0%, ${P}10 45%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} className="glow-blue" />
      <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: 500, height: 400, background: `radial-gradient(ellipse, ${P}14 0%, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '5%', width: 400, height: 300, background: `radial-gradient(ellipse, ${B}10 0%, transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `rgba(37,99,235,0.1)`, border: `1px solid ${B}35`, borderRadius: 100, padding: '7px 18px', fontSize: 13, color: B, marginBottom: 28, fontWeight: 600 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
          Michigan's #1 Web Studio for Local Businesses
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(38px,6.5vw,76px)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 8px', letterSpacing: -1.5, color: '#fff' }}>
          Your Competitors
        </h1>
        <h1 style={{ fontSize: 'clamp(38px,6.5vw,76px)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 32px', letterSpacing: -1.5 }}>
          <GradientText>Are Stealing Your Customers.</GradientText>
        </h1>

        <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: '#94a3b8', maxWidth: 660, margin: '0 auto 44px', lineHeight: 1.75 }}>
          You've built a great local business through hard work and reputation. But without a website, Google sends every customer straight to your competition. <strong style={{ color: '#cbd5e1' }}>We fix that with a free mockup first.</strong>
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <a href="#contact" style={{ background: `linear-gradient(135deg,${B},${P})`, color: '#fff', fontSize: 17, fontWeight: 700, padding: '18px 36px', borderRadius: 12, textDecoration: 'none', boxShadow: `0 0 50px ${B}45`, display: 'inline-block' }}>
            Get My FREE Mockup →
          </a>
          <a href="#how" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${E}`, color: '#fff', fontSize: 17, fontWeight: 600, padding: '18px 36px', borderRadius: 12, textDecoration: 'none', display: 'inline-block' }}>
            See How It Works
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['50+','Michigan Businesses Served'],['4.9 ★','Average Client Rating'],['3-5 Days','Average Launch Time'],['$0','Cost to See Your Mockup']].map(([n, l], i) => (
            <div key={l} style={{ padding: '0 28px', borderRight: i < 3 ? `1px solid ${E}` : 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 11, color: M, marginTop: 5, letterSpacing: 0.5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TRUST STRIP ─────────────────────────────────────────────────
function TrustStrip() {
  const trades = ['Plumbers','Electricians','HVAC Contractors','Roofers','Auto Repair','Landscapers','General Contractors','Towing Companies','Welding Shops','Painters']
  return (
    <div style={{ background: '#0d0d14', borderTop: `1px solid ${E}`, borderBottom: `1px solid ${E}`, padding: '18px 24px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
        <span style={{ color: M, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, flexShrink: 0 }}>We work with:</span>
        {trades.map(t => <span key={t} style={{ color: '#334155', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</span>)}
      </div>
    </div>
  )
}

// ─── PROBLEM SECTION ─────────────────────────────────────────────
function Problem() {
  return (
    <section style={{ padding: '110px 24px', maxWidth: 1120, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 48, alignItems: 'center' }}>
        <div>
          <SectionLabel>The Problem</SectionLabel>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, lineHeight: 1.18, margin: '0 0 24px', color: '#fff' }}>
            Right now, someone is Googling<br />
            <GradientText>"plumber near me"</GradientText><br />
            and finding your competitor.
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, fontSize: 16, margin: '0 0 20px' }}>
            You've earned your reputation through years of hard work. But reputation doesn't show up on Google — websites do. Every day without one is customers, jobs, and money walking out the door.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, fontSize: 16 }}>
            The good news? Most of your competitors have terrible websites — or none at all. We build sites that dominate local search and make you the obvious choice.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PROBLEMS.map(({ bad, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: bad ? 'rgba(239,68,68,0.04)' : 'rgba(34,197,94,0.06)', border: `1px solid ${bad ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.25)'}`, borderRadius: 12, padding: '16px 20px' }}>
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{bad ? '✗' : '✓'}</span>
              <span style={{ color: bad ? '#fca5a5' : '#86efac', fontSize: 15, lineHeight: 1.5, fontWeight: bad ? 400 : 600 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ padding: '80px 24px', background: '#0d0d14' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionLabel>What We Do</SectionLabel>
          <h2 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>Everything You Need to Win Online</h2>
          <p style={{ color: '#64748b', fontSize: 16 }}>One studio, everything handled. No freelancers to manage, no tech headaches.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20 }}>
          {SERVICES.map(s => (
            <Card key={s.title} style={{ padding: 28 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '16px 16px 0 0', background: `linear-gradient(90deg,${B},${P})` }} />
              <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: B, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>{s.sub}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how" style={{ padding: '110px 24px', maxWidth: 960, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <SectionLabel>The Process</SectionLabel>
        <h2 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>From Zero to Google in 3 Steps</h2>
        <p style={{ color: '#64748b', fontSize: 16 }}>We've made it completely risk-free to get started.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
        {STEPS.map(({ n, title, desc }) => (
          <Card key={n} style={{ padding: 36, textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg,${B}20,${P}20)`, border: `2px solid ${B}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', fontSize: 20, fontWeight: 900, color: B }}>{n}</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>{title}</h3>
            <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{desc}</p>
          </Card>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a href="#contact" style={{ background: `linear-gradient(135deg,${B},${P})`, color: '#fff', fontSize: 16, fontWeight: 700, padding: '16px 36px', borderRadius: 10, textDecoration: 'none', display: 'inline-block', boxShadow: `0 0 40px ${B}35` }}>
          Start With a Free Mockup →
        </a>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="reviews" style={{ padding: '100px 24px', background: '#111118' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionLabel>Real Results</SectionLabel>
          <h2 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>Michigan Business Owners Love Us</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Stars />
            <span style={{ color: '#94a3b8', fontSize: 15 }}>4.9 average rating · 50+ clients served</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {TESTIMONIALS.map(t => (
            <Card key={t.name} style={{ padding: 26 }}>
              <Stars />
              <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.8, margin: '14px 0 22px', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg,${B},${P})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#fff', flexShrink: 0 }}>{t.init}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: M, fontSize: 12 }}>{t.biz} · {t.city}, MI</div>
                </div>
                <div style={{ marginLeft: 'auto', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 6, padding: '3px 8px', fontSize: 11, color: '#86efac', fontWeight: 600 }}>Verified</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PRICING ─────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" style={{ padding: '100px 24px', maxWidth: 1060, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <SectionLabel>Pricing</SectionLabel>
        <h2 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>Transparent Pricing. No Surprises.</h2>
        <p style={{ color: '#64748b', fontSize: 16 }}>Every package starts with a free mockup — you don't pay until you love the design.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 20, alignItems: 'start' }}>
        {PRICING.map(p => (
          <Card key={p.name} hot={p.hot} style={{ padding: 34 }}>
            {p.badge && (
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg,${B},${P})`, color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 18px', borderRadius: 100, whiteSpace: 'nowrap' }}>{p.badge}</div>
            )}
            <div style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 46, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{p.price}</span>
            </div>
            <div style={{ color: M, fontSize: 13, marginBottom: 26 }}>{p.sub}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px' }}>
              {p.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 11, fontSize: 14, color: '#cbd5e1' }}>
                  <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0, marginTop: 1, fontSize: 12 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none', background: p.hot ? `linear-gradient(135deg,${B},${P})` : 'rgba(255,255,255,0.05)', color: '#fff', border: p.hot ? 'none' : `1px solid ${E}`, boxShadow: p.hot ? `0 0 30px ${B}30` : 'none' }}>
              {p.cta}
            </a>
          </Card>
        ))}
      </div>
      <p style={{ textAlign: 'center', color: M, fontSize: 14, marginTop: 24 }}>
        Not sure which package? Start with a free mockup and we'll recommend the best fit for your business.
      </p>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section style={{ padding: '80px 24px', maxWidth: 760, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <SectionLabel>FAQ</SectionLabel>
        <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 900, color: '#fff', margin: 0 }}>Common Questions</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ background: C, border: `1px solid ${open === i ? B + '55' : E}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '18px 22px', background: 'none', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              {f.q}
              <span style={{ color: B, fontSize: 22, lineHeight: 1, flexShrink: 0, display: 'inline-block', transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 22px 18px', color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── CONTACT / FINAL CTA ─────────────────────────────────────────
function Contact() {
  const [name, setName]   = useState('')
  const [phone, setPhone] = useState('')
  const [biz, setBiz]     = useState('')
  const [type, setType]   = useState('')
  const [done, setDone]   = useState(false)

  const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${E}`, borderRadius: 10, padding: '14px 16px', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box' }

  return (
    <section id="contact" style={{ padding: '110px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, background: `radial-gradient(ellipse, ${B}18 0%, ${P}08 40%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <SectionLabel>Free Mockup — Zero Risk</SectionLabel>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', lineHeight: 1.18 }}>
            Ready to Start Getting<br /><GradientText>More Customers?</GradientText>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.75 }}>
            Drop us your info. We'll build a real mockup of your new website — completely free — and reach out within 24 hours. No payment, no pressure.
          </p>
        </div>

        {done ? (
          <div style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 16, padding: '48px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✓</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 10 }}>You're on the list!</div>
            <div style={{ color: '#94a3b8', fontSize: 15 }}>We'll reach out within 24 hours to start your free mockup. Check your messages.</div>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setDone(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Name *</label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" style={inp} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>Phone Number *</label>
                <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="(313) 555-0100" style={inp} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>Business Name *</label>
              <input required value={biz} onChange={e => setBiz(e.target.value)} placeholder="Smith Plumbing LLC" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>What type of business? *</label>
              <input required value={type} onChange={e => setType(e.target.value)} placeholder="e.g. Plumber, Electrician, HVAC, Roofer..." style={inp} />
            </div>
            <button type="submit" style={{ marginTop: 6, background: `linear-gradient(135deg,${B},${P})`, border: 'none', borderRadius: 12, color: '#fff', fontSize: 17, fontWeight: 700, padding: '18px', cursor: 'pointer', boxShadow: `0 0 50px ${B}40`, letterSpacing: 0.3 }}>
              Send Me My Free Mockup →
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 4 }}>
              {['No payment required','No spam ever','24-hour response'].map(t => (
                <span key={t} style={{ fontSize: 12, color: M, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ color: '#22c55e', fontSize: 11 }}>✓</span> {t}
                </span>
              ))}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${E}`, padding: '48px 24px 32px', background: '#060608' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ marginBottom: 14 }}>
              <img src="/logo.jpg" alt="Future Media" style={{ height: '48px', width: 'auto' }} />
            </div>
            <p style={{ color: M, fontSize: 13, lineHeight: 1.7 }}>Michigan's web design studio for local tradespeople and small businesses. We build sites that rank and convert.</p>
          </div>
          {/* Links */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 14, letterSpacing: 0.5 }}>Navigation</div>
            {[['#services','Services'],['#how','How It Works'],['#reviews','Reviews'],['#pricing','Pricing'],['#contact','Get Free Mockup']].map(([href, label]) => (
              <div key={href} style={{ marginBottom: 10 }}>
                <a href={href} style={{ color: M, fontSize: 14, textDecoration: 'none' }}>{label}</a>
              </div>
            ))}
          </div>
          {/* Contact */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 14, letterSpacing: 0.5 }}>Contact</div>
            <div style={{ color: M, fontSize: 14, marginBottom: 8 }}>📧 <a href="mailto:futuremediasam313@gmail.com" style={{ color: M, textDecoration: 'none' }}>futuremediasam313@gmail.com</a></div>
            <div style={{ color: M, fontSize: 14, marginBottom: 8 }}>📍 Michigan, United States</div>
            <div style={{ marginTop: 16 }}>
              <a href="#contact" style={{ background: `linear-gradient(135deg,${B},${P})`, color: '#fff', fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}>Get Free Mockup →</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${E}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#a0a0b0', fontSize: 13, margin: 0 }}>© 2025 Future Media Web Design Studio. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Stars />
            <span style={{ color: M, fontSize: 12 }}>4.9/5 from 50+ Michigan businesses</span>
          </div>
        </div>
      </div>
    </footer>
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
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}
