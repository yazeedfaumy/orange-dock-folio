import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function AboutSection() {
  const [aboutContent, setAboutContent] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);

  const stats = [
    { label: "Years Experience", value: "1+" },
    { label: "Projects Completed", value: "15+" },
    { label: "Networks Deployed", value: "8+" },
    { label: "Certifications", value: "3" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data: about } = await supabase
        .from('about_content')
        .select('*')
        .single();
      
      const { data: contact } = await supabase
        .from('contact_info')
        .select('*')
        .single();
      
      if (about) setAboutContent(about);
      if (contact) setContactInfo(contact);
    };

    fetchData();
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {aboutContent?.content || "Dedicated network engineer with a passion for building reliable, scalable network infrastructures that enable business growth and innovation."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-8 bg-gradient-card border-border/50 shadow-card">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{contactInfo?.location || "San Francisco, CA"}</span>
                </div>
                
                <p className="text-lg leading-relaxed">
                  As a recent graduate with a strong foundation in network engineering, 
                  I bring fresh perspectives and cutting-edge knowledge to every project. 
                  My experience spans from configuring enterprise routers and switches to 
                  implementing security protocols and optimizing network performance.
                </p>

                <p className="text-lg leading-relaxed">
                  I'm passionate about staying current with emerging technologies like 
                  SD-WAN, cloud networking, and network automation. My goal is to design 
                  networks that not only meet current needs but are scalable for future growth.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Bachelor's in Network Engineering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Available for full-time opportunities</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Team Player
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Problem Solver
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Fast Learner
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Detail Oriented
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-3xl lg:text-4xl font-bold text-primary mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}