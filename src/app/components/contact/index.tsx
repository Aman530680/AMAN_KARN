"use client";
import Link from "next/link";
import { BiLogoLinkedin } from "react-icons/bi";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { TbMailForward } from "react-icons/tb";
import { personalData } from "@/../utils/Data/PersonalData";
import SectionReveal from "../SectionReveal";
import { MapPin, Send, MessageSquare, User, Mail } from "lucide-react";
import React, { useState } from "react";

interface ContactLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

const ContactInfoCard = ({ href, icon: Icon, label, value, color }: ContactLinkProps) => (
  <Link
    href={href}
    target="_blank"
    className="group relative flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 shadow-xl"
  >
    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300" style={{ backgroundColor: `${color}15` }}>
      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color: color }} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{label}</span>
      <span className="text-sm md:text-base text-slate-200 font-medium group-hover:text-white transition-colors">{value}</span>
    </div>
    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none blur-xl" style={{ backgroundColor: color }} />
  </Link>
);

const ContactForm = () => {
  const [input, setInput] = useState({ name: "", email: "", message: "" });
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("");
    const formData = new FormData(e.currentTarget);
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "d64ab352-b569-45f6-b097-2c96a1a8cfee";
    formData.append("access_key", key);
    const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
    const data = await response.json();
    setIsLoading(false);
    if (data.success) {
      setIsSuccess(true);
      setResult("Message sent successfully!");
      setInput({ name: "", email: "", message: "" });
      setTimeout(() => { setResult(""); setIsSuccess(false); }, 5000);
    } else {
      setIsSuccess(false);
      setResult("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative group p-8 lg:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">Send a Message</h3>
          <p className="text-slate-400 text-sm">I'll get back to you within 24 hours.</p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 group/input">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-red-500 transition-colors">
              <User className="w-4 h-4" /> Your Name
            </label>
            <input
              className="bg-white/5 w-full border border-white/10 rounded-2xl focus:border-red-500/50 focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600"
              type="text" name="name" placeholder="John Doe" maxLength={100} required
              value={input.name} onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 group/input">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-red-500 transition-colors">
              <Mail className="w-4 h-4" /> Your Email
            </label>
            <input
              className="bg-white/5 w-full border border-white/10 rounded-2xl focus:border-red-500/50 focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600"
              type="email" name="email" placeholder="john@example.com" maxLength={100} required
              value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 group/input">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-red-500 transition-colors">
              <MessageSquare className="w-4 h-4" /> Your Message
            </label>
            <textarea
              className="bg-white/5 w-full border border-white/10 rounded-2xl focus:border-red-500/50 focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600 resize-none"
              placeholder="Tell me about your project..." name="message" maxLength={500} required rows={4}
              value={input.message} onChange={(e) => setInput({ ...input, message: e.target.value })}
            />
          </div>
          {result && (
            <p className={`text-sm text-center font-medium ${isSuccess ? "text-green-400" : "text-red-500"}`}>{result}</p>
          )}
          <button type="submit" disabled={isLoading}
            className="relative group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-900 p-[1px] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
            <div className="relative flex items-center justify-center gap-2 bg-[#050505] group-hover/btn:bg-transparent transition-all rounded-[15px] px-8 py-4 text-white font-bold uppercase tracking-widest text-sm">
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>Send Message <TbMailForward className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></>
              )}
            </div>
          </button>
        </form>
      </div>
      <div className="absolute w-1 h-20 bg-gradient-to-b from-red-600 to-transparent left-0 top-20 rounded-full" />
    </div>
  );
};

function ContactSection() {
  return (
    <div id="contact" className="relative z-50 py-24 lg:py-48 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8">
        <SectionReveal direction="up">
          <div className="flex flex-col items-center gap-6 mb-20">
            <div className="flex items-center gap-3 text-red-500">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.3em]">Communication</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight text-center">
              Let's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Connect</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl text-center">
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <SectionReveal direction="right">
              <ContactForm />
            </SectionReveal>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-12">
            <SectionReveal direction="left">
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Send className="w-5 h-5 text-red-600" /> Direct Contact
                </h3>
                <div className="flex flex-col gap-4">
                  <ContactInfoCard href={`mailto:${personalData.email}`} icon={MdAlternateEmail} label="Email" value={personalData.email} color="#ef4444" />
                  <ContactInfoCard href={`tel:${personalData.phone}`} icon={IoMdCall} label="Phone" value={personalData.phone} color="#dc2626" />
                  <ContactInfoCard href="#" icon={MapPin} label="Location" value={personalData.address} color="#991b1b" />
                </div>
              </div>
            </SectionReveal>
            <SectionReveal direction="left" delay={0.2}>
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-white">Social Presence</h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { href: personalData.github, icon: IoLogoGithub, color: "#ffffff" },
                    { href: personalData.linkedIn, icon: BiLogoLinkedin, color: "#0077b5" },
                  ].map((social, idx) => (
                    <Link key={idx} href={social.href} target="_blank"
                      className="w-14 h-14 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center hover:bg-white/[0.05] hover:border-white/20 hover:scale-110 transition-all duration-300">
                      <social.icon className="w-6 h-6" style={{ color: social.color }} />
                    </Link>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
