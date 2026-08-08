import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Cpu,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Terminal,
  Twitter,
  Zap,
} from 'lucide-react';
import { Navbar } from '../Navbar';
import { DarkGradientBg } from '../ui/elegant-dark-pattern';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import BlurText from '../ui/BlurText';
import { cn } from '../../lib/utils';

const CHANNELS = [
  {
    id: 'email',
    icon: Mail,
    label: 'EMAIL',
    title: 'Direct Line',
    value: 'hello@architect.exe',
    href: 'mailto:hello@architect.exe',
    note: 'We reply within 24 hours',
  },
  {
    id: 'twitter',
    icon: Twitter,
    label: 'X / TWITTER',
    title: 'Social',
    value: '@architect.exe',
    href: 'https://twitter.com',
    note: 'Best for quick questions',
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LINKEDIN',
    title: 'Company Page',
    value: '/architect-exe',
    href: 'https://linkedin.com',
    note: 'News, case studies & updates',
  },
  {
    id: 'github',
    icon: Github,
    label: 'GITHUB',
    title: 'Open Source',
    value: '/architect-exe',
    href: 'https://github.com',
    note: 'Our public experiments & tooling',
  },
];

const PACKAGES = [
  {
    id: 'full_build',
    title: 'Full Website Build',
    description: 'End-to-end design and development of a custom website — strategy, UI/UX, CMS, SEO and animations.',
    eta: '2-4 WKS',
  },
  {
    id: 'redesign',
    title: 'Website Redesign',
    description: 'A modern redesign and rebuild of your existing site with improved conversion, SEO and performance.',
    eta: '2-3 WKS',
  },
  {
    id: 'custom_dev',
    title: 'Custom Development',
    description: 'Bespoke features, WebGL / Three.js experiences, integrations and ongoing technical partnership.',
    eta: 'CUSTOM',
  },
];

const BUDGETS = [
  { value: '5k', label: '$5K – $10K' },
  { value: '10k', label: '$10K – $25K' },
  { value: '25k', label: '$25K – $50K' },
  { value: '50k', label: '$50K – $100K' },
  { value: '100k', label: '$100K+' },
];

const STATUS_POINTS = [
  'Every inquiry is reviewed by a senior team member within 24 hours',
  'A free scoping and feasibility consultation is included before any quote',
  'Clear budgets, timelines and ownership agreed before we begin',
];

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[0].id);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border border-[#C6FF00]/40 bg-[#12130F] overflow-hidden">
        <CardContent className="p-8 sm:p-10">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-[#C6FF00] text-black flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <Badge variant="secondary" className="font-mono-code text-[10px] text-[#C6FF00] border-[#C6FF00]/30 bg-black/40">
              // STATUS: MESSAGE_RECEIVED
            </Badge>
            <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
              Message Received<span className="text-[#C6FF00]">.</span>
            </h3>
            <p className="text-sm text-zinc-400 max-w-md font-mono-code leading-relaxed">
              Thank you — your brief is in. A senior member of our team will reply to{' '}
              <span className="text-[#C6FF00]">{email || 'your inbox'}</span> within 24 hours to
              schedule a discovery call and scope your project.
            </p>
            <Separator className="my-2 bg-white/10" />
            <button
              onClick={() => {
                setSubmitted(false);
                setFirstName('');
                setLastName('');
                setEmail('');
                setCompany('');
                setBudget('');
                setMessage('');
                setSelectedPackage(PACKAGES[0].id);
              }}
              className="inline-flex items-center gap-2 text-[#C6FF00] text-xs font-mono-code uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              Send another message
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-white/10 bg-[#12130F] shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/50">
        <div className="flex items-center gap-2 font-mono-code text-[11px] text-zinc-400">
          <Terminal className="w-3.5 h-3.5 text-[#C6FF00]" />
          <span className="uppercase tracking-widest">project_inquiry.form</span>
          <span className="text-zinc-600 hidden sm:inline">— new_brief</span>
        </div>
      </div>

      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Identity */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 font-mono-code text-[10px] text-[#C6FF00] uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5" />
              <span>01 / Your Details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name" className="font-mono-code text-[11px] text-zinc-300 uppercase tracking-widest">
                  First name<span className="text-[#C6FF00]">*</span>
                </Label>
                <Input
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  className="mt-2 bg-black/60 border-white/15 text-white placeholder:text-zinc-600 focus-visible:ring-[#C6FF00]/40 focus-visible:border-[#C6FF00]/50"
                />
              </div>
              <div>
                <Label htmlFor="last-name" className="font-mono-code text-[11px] text-zinc-300 uppercase tracking-widest">
                  Last name
                </Label>
                <Input
                  id="last-name"
                  name="last-name"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="mt-2 bg-black/60 border-white/15 text-white placeholder:text-zinc-600 focus-visible:ring-[#C6FF00]/40 focus-visible:border-[#C6FF00]/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="font-mono-code text-[11px] text-zinc-300 uppercase tracking-widest">
                  Work email<span className="text-[#C6FF00]">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="mt-2 bg-black/60 border-white/15 text-white placeholder:text-zinc-600 focus-visible:ring-[#C6FF00]/40 focus-visible:border-[#C6FF00]/50"
                />
              </div>
              <div>
                <Label htmlFor="company" className="font-mono-code text-[11px] text-zinc-300 uppercase tracking-widest">
                  Company
                </Label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company, Inc."
                  className="mt-2 bg-black/60 border-white/15 text-white placeholder:text-zinc-600 focus-visible:ring-[#C6FF00]/40 focus-visible:border-[#C6FF00]/50"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="budget" className="font-mono-code text-[11px] text-zinc-300 uppercase tracking-widest">
                Budget range
              </Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger
                  id="budget"
                  name="budget"
                  className="mt-2 w-full bg-black/60 border-white/15 text-white placeholder:text-zinc-600 focus-visible:ring-[#C6FF00]/40 focus-visible:border-[#C6FF00]/50"
                >
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent className="bg-[#12130F] border-white/15 text-white">
                  {BUDGETS.map((b) => (
                    <SelectItem
                      key={b.value}
                      value={b.value}
                      className="focus:bg-[#C6FF00] focus:text-black font-mono-code text-sm"
                    >
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Package */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 font-mono-code text-[10px] text-[#C6FF00] uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" />
              <span>02 / Project Type</span>
            </div>
            <RadioGroup
              value={selectedPackage}
              onValueChange={setSelectedPackage}
              className="grid grid-cols-1 gap-4"
            >
              {PACKAGES.map((pkg) => {
                const active = selectedPackage === pkg.id;
                return (
                  <label
                    key={pkg.id}
                    htmlFor={pkg.id}
                    className={cn(
                      'relative flex items-start gap-4 rounded-lg border bg-black/40 px-5 py-4 cursor-pointer transition-all duration-300',
                      active
                        ? 'border-[#C6FF00]/60 shadow-[0_0_20px_rgba(198,255,0,0.12)]'
                        : 'border-white/10 hover:border-white/25'
                    )}
                  >
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                      <RadioGroupItem value={pkg.id} id={pkg.id} />
                    </div>
                    <div className="w-full">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-syne font-bold text-sm text-white uppercase tracking-wider">
                          {pkg.title}
                        </p>
                        <span
                          className={cn(
                            'font-mono-code text-[10px] tracking-widest px-2 py-0.5 rounded border',
                            active
                              ? 'text-[#C6FF00] border-[#C6FF00]/40 bg-[#C6FF00]/5'
                              : 'text-zinc-500 border-white/10'
                          )}
                        >
                          {pkg.eta}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-zinc-400 font-mono-code leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </RadioGroup>
          </div>

          <Separator className="bg-white/10" />

          {/* Message */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 font-mono-code text-[10px] text-[#C6FF00] uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              <span>03 / Project Brief</span>
            </div>
            <div>
              <Label htmlFor="message" className="font-mono-code text-[11px] text-zinc-300 uppercase tracking-widest">
                Project details
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your project — goals, timeline, references, and what success looks like for you."
                className="mt-2 bg-black/60 border-white/15 text-white placeholder:text-zinc-600 focus-visible:ring-[#C6FF00]/40 focus-visible:border-[#C6FF00]/50 resize-none min-h-[120px]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
            <p className="font-mono-code text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse" />
              No pressure, no spam — just a direct line to our team.
            </p>
            <Button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C6FF00] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer min-h-[48px] rounded-none"
            >
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Send Message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const ChannelCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  title: string;
  value: string;
  href: string;
  note: string;
}> = ({ icon, label, title, value, href, note }) => {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-lg border border-white/10 bg-[#12130F] p-5 transition-all duration-300 hover:border-[#C6FF00]/50 hover:shadow-[0_0_20px_rgba(198,255,0,0.08)] no-underline"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black text-[#C6FF00] transition-colors duration-300 group-hover:bg-[#C6FF00] group-hover:text-black">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 font-mono-code text-[10px] text-zinc-500 uppercase tracking-widest">
          {label}
          <ExternalLink className="w-3 h-3 opacity-50" />
        </div>
        <p className="mt-1 font-mono-code text-xs font-semibold text-white uppercase tracking-wider truncate">
          {title} — <span className="text-[#C6FF00]">{value}</span>
        </p>
        <p className="mt-1 text-xs text-zinc-500 font-mono-code">{note}</p>
      </div>
    </a>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <DarkGradientBg className="min-h-screen bg-black text-white select-none">
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <Navbar pathname="/contact" />
        </div>

        <main className="flex-1">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12130F] border border-white/10 rounded-full font-mono-code text-[11px] text-[#C6FF00] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-ping" />
                <span className="uppercase tracking-widest font-bold">// ACCEPTING NEW PROJECTS</span>
              </div>

              <BlurText
                as="h1"
                text="Let's Build Your Website"
                highlight={['Your Website']}
                animateBy="words"
                direction="top"
                delay={110}
                stepDuration={0.4}
                className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-[0.95] justify-center"
              />

              <p className="mt-6 max-w-2xl font-mono-code text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Tell us about your project. We're a full-service web design and development agency
                building high-performance Webflow and React websites — every inquiry gets a personal
                reply from a senior team member within 24 hours.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:hello@architect.exe"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C6FF00] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  hello@architect.exe
                </a>
                <a
                  href="/#section-process"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:border-[#C6FF00]/60 hover:text-[#C6FF00] transition-colors cursor-pointer"
                >
                  Review the process
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Contact channels */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="flex items-center gap-2 font-mono-code text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
                  CONTACT CHANNELS
                </div>

                {CHANNELS.map((channel) => (
                  <ChannelCard key={channel.id} {...channel} icon={<channel.icon className="w-5 h-5" />} />
                ))}

                <Card className="border border-white/10 bg-[#12130F] mt-2 overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 font-mono-code text-[10px] text-zinc-500 uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5 text-[#C6FF00]" />
                      WHAT TO EXPECT
                    </div>
                    <ul className="mt-4 space-y-3">
                      {STATUS_POINTS.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 font-mono-code text-xs text-zinc-300 leading-relaxed">
                          <Check className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Separator className="my-4 bg-white/10" />
                    <div className="flex items-center gap-2 font-mono-code text-[10px] text-zinc-500 uppercase tracking-widest">
                      <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" />
                      <span>HQ: REMOTE-FIRST // GLOBAL</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </main>

        {/* Bottom strip */}
        <div className="border-t border-white/10 bg-black/40">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-code text-[10px] text-zinc-500 uppercase tracking-widest">
            <span>// ARCHITECT.EXE — AVAILABLE FOR NEW PROJECTS</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse" />
              AVG_RESPONSE &lt; 24H
            </span>
          </div>
        </div>
      </div>
    </DarkGradientBg>
  );
};

export default ContactPage;
