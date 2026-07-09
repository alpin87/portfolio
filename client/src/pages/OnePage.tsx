import { useEffect } from "react";
import TopNav from "@/components/TopNav";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import OpenSource from "@/sections/OpenSource";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Footer from "@/sections/Footer";

export default function OnePage() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) document.getElementById(hash)?.scrollIntoView();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <main className="max-w-5xl mx-auto px-6">
        <section id="hero" className="py-24"><Hero /></section>
        <section id="projects" className="py-24 scroll-mt-16"><Projects /></section>
        <section id="opensource" className="py-24 scroll-mt-16"><OpenSource /></section>
        <section id="experience" className="py-24 scroll-mt-16"><Experience /></section>
        <section id="skills" className="py-24 scroll-mt-16"><Skills /></section>
      </main>
      <Footer />
    </div>
  );
}
