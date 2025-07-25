import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  Network, 
  Shield, 
  Cloud, 
  Settings, 
  Monitor, 
  Code,
  Server,
  Wifi,
  Lock,
  Database,
  GraduationCap
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function SkillsSection() {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [technicalSkills, setTechnicalSkills] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [toolsTech, setToolsTech] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch skill categories
      const { data: categories } = await supabase
        .from('skill_categories')
        .select('*')
        .order('display_order');

      // Fetch technical skills
      const { data: skills } = await supabase
        .from('technical_skills')
        .select('*, skill_categories(name)')
        .order('display_order');

      // Fetch certifications
      const { data: certs } = await supabase
        .from('certifications')
        .select('*')
        .order('display_order');

      // Fetch tools & technologies
      const { data: tools } = await supabase
        .from('tools_technologies')
        .select('*')
        .order('display_order');

      if (categories) {
        // Group skills by category
        const groupedSkills = categories.map(category => ({
          ...category,
          skills: skills?.filter(skill => skill.category_id === category.id) || []
        }));
        setSkillCategories(groupedSkills);
      }
      
      if (skills) setTechnicalSkills(skills);
      if (certs) setCertifications(certs);
      if (tools) setToolsTech(tools);
    };

    fetchData();
  }, []);

  // Fallback data
  const fallbackSkillCategories = [
    {
      title: "Networking Protocols",
      icon: Network,
      skills: [
        { name: "TCP/IP", level: 90 },
        { name: "BGP", level: 75 },
        { name: "OSPF", level: 85 },
        { name: "EIGRP", level: 80 },
        { name: "VLAN/VTP", level: 90 },
        { name: "STP", level: 85 },
      ]
    },
    {
      title: "Network Security",
      icon: Shield,
      skills: [
        { name: "Firewall Configuration", level: 85 },
        { name: "VPN (IPSec/SSL)", level: 80 },
        { name: "Access Control Lists", level: 90 },
        { name: "Network Segmentation", level: 75 },
        { name: "IDS/IPS", level: 70 },
        { name: "Security Policies", level: 85 },
      ]
    },
    {
      title: "Hardware & Infrastructure",
      icon: Server,
      skills: [
        { name: "Cisco Routers", level: 85 },
        { name: "Cisco Switches", level: 90 },
        { name: "Juniper Equipment", level: 70 },
        { name: "Wireless Controllers", level: 75 },
        { name: "Network Monitoring", level: 80 },
        { name: "Cable Management", level: 95 },
      ]
    },
    {
      title: "Cloud & Automation",
      icon: Cloud,
      skills: [
        { name: "AWS Networking", level: 75 },
        { name: "Azure Virtual Networks", level: 70 },
        { name: "Network Automation", level: 65 },
        { name: "Python Scripting", level: 70 },
        { name: "Ansible", level: 60 },
        { name: "Terraform", level: 55 },
      ]
    }
  ];

  const displaySkillCategories = skillCategories.length > 0 ? skillCategories : fallbackSkillCategories;
  const displayCertifications = certifications.length > 0 ? certifications : [
    "CCNA (Cisco Certified Network Associate)",
    "CompTIA Network+", 
    "AWS Cloud Practitioner"
  ];
  const displayTools = toolsTech.length > 0 ? toolsTech : [
    "Wireshark", "SolarWinds", "PRTG", "Nagios", 
    "GNS3", "Packet Tracer", "Putty", "SecureCRT",
    "Visio", "Lucidchart", "Excel", "PowerShell"
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive skill set covering modern networking technologies, 
            security protocols, and emerging cloud solutions.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {displaySkillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill: any, skillIndex: number) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-primary font-semibold">{skill.proficiency_level || skill.level}%</span>
                      </div>
                      <Progress value={skill.proficiency_level || skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-card border-border/50 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {displayCertifications.map((cert: any, index: number) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center"
                >
                  <p className="font-semibold text-primary">{typeof cert === 'string' ? cert : cert.name}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-gradient-card border-border/50 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Tools & Technologies</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {displayTools.map((tool: any, index: number) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Badge 
                    variant="secondary" 
                    className="px-4 py-2 bg-secondary/50 hover:bg-primary/10 transition-colors cursor-default"
                  >
                    {typeof tool === 'string' ? tool : tool.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}