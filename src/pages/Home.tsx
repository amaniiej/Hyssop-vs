import { useEffect } from "react";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Quote from "../components/Quote";
import Products from "../components/Products";
import Story from "../components/Story";
import Reviews from "../components/Reviews";
import Process from "../components/Process";
import Services from "../components/Services";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {

useEffect(() => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // stop watching once visible, saves memory
      }
    });
  }, { threshold: 0.1 }); // only trigger when 10% of section is visible

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect(); //cleanup
}, []);

  return (
    <div className="bg-[#f5f0eb] text-[#0b1f1a]">
      <SEO
        title="Hyssop Herbs & Wellness | Organic Ethiopian Herbal Remedies"
        description="Shop 100% organic Ethiopian herbal remedies for liver health, blood sugar, hormonal balance, fertility, gut health, and more. Trusted by the Ethiopian diaspora in the USA and Canada."
        url="https://hyssopherb.com"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Hyssop Herbs & Wellness",
          "description": "Organic Ethiopian herbal remedies for liver health, blood sugar, hormonal balance, fertility support, gut health, and holistic wellness. Serving the Ethiopian diaspora in the USA and Canada.",
          "url": "https://hyssopherb.com",
          "logo": "https://hyssopherb.com/logo.png",
          "image": "https://hyssopherb.com/images/hero-img.jpeg",
          "priceRange": "$",
          "telephone": "+251952161260",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bole, Kekere building 1st floor room 1-012/5",
            "addressLocality": "Addis Ababa",
            "addressCountry": "ET"
          },
          "sameAs": [
            "https://www.instagram.com/hyssop_herbs_and_wellness",
            "https://www.tiktok.com/@hyssopherbswellness"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Herbal Wellness Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Liver Health Herbs" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blood Sugar Support" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hormonal Balance Herbs" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fertility Support" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gut Health Remedies" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Expert Herbal Consultation", "price": "25", "priceCurrency": "USD" } }
            ]
          }
        }}
      />
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      
      <div id="quote" className="fade-in"><Quote /></div>
      <div id="Services" className="fade-in"><Services /></div>
      <div id="process" className="fade-in"><Process /></div>
      <div id="products" className="fade-in"><Products /></div>
      <div id="story" className="fade-in"><Story /></div>
      <div id="reviews" className="fade-in"><Reviews /></div>
      <div id="FAQ" className="fade-in"><FAQ /></div>
      <div id="CTA" className="fade-in"><CTA /></div>
      <div id="contact" className="fade-in"><Contact /></div>

      <Footer />
    </div>
  );
}