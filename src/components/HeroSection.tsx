import { motion } from "framer-motion";
import { TypewriterEffect } from "./TypewriterEffect";
import { Button } from "./ui/button";
import { ArrowDown, Download } from "lucide-react";
import heroImage from "../assets/hero-network.jpg";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function HeroSection() {
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [aboutContent, setAboutContent] = useState<any>(null);

  const words = [
    { text: "Network" },
    { text: "Engineer" },
    { text: "&" },
    { text: "Infrastructure", className: "text-primary" },
    { text: "Specialist", className: "text-primary" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data: contact } = await supabase
        .from('contact_info')
        .select('*')
        .single();
      
      const { data: about } = await supabase
        .from('about_content')
        .select('*')
        .single();
      
      if (contact) setContactInfo(contact);
      if (about) setAboutContent(about);
    };

    fetchData();
  }, []);

  const handleDownloadCV = () => {
    if (contactInfo?.cv_url) {
      window.open(contactInfo.cv_url, '_blank');
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark">
        <div className="absolute inset-0 bg-[url('/src/assets/hero-network.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-lg text-muted-foreground">Hello, I'm</h2>
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                {aboutContent?.title || "Alex Chen"}
              </h1>
            </motion.div>

            <TypewriterEffect words={words} />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              {aboutContent?.content || "Passionate about designing, implementing, and maintaining robust network infrastructures. Bringing 1 year of hands-on experience in enterprise networking solutions."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-4 flex-wrap"
            >
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/50 hover:bg-primary/10"
                onClick={handleDownloadCV}
                disabled={!contactInfo?.cv_url}
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card border border-border/50">
              <img 
                src={heroImage} 
                alt="Network Infrastructure" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}