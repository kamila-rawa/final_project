import React from "react";
import { Header } from "@/components/ui/HeaderLP1"; 
import { Hero } from "@/components/ui/HeroLP1";
import Content from "@/components/ui/Content-screenshot";
// import Feature from "../components/ui/Feature-screenshot";
import  Features from "@/components/ui/FeatureLP1";
import  CTA from "@/components/ui/CTA-screenshot";
import  Testimonial  from "@/components/ui/TestimonialLP1";
import  Pricing  from "@/components/ui/PricingLP1";
import  Testimonials  from "@/components/ui/Testimonials";
import  FAQ  from "@/components/ui/FaqLP1";
import  Footer  from "@/components/ui/FooterLP1";


// Import des icônes
import { CloudArrowUpIcon, LockClosedIcon, Cog6ToothIcon } from "@heroicons/react/20/solid";

export default function Playground() {

  return (
    <div>
      <Header />
      <Hero />
      <Content />
      <Features />
      <Testimonial />
      <Testimonials />
      <CTA />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
