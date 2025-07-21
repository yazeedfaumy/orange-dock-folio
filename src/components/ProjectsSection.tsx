import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github, Calendar } from "lucide-react";

export function ProjectsSection() {
  const projects = [
    {
      title: "Enterprise Network Redesign",
      description: "Complete network infrastructure overhaul for a 300-person company, implementing modern switching and routing protocols to improve performance and security.",
      longDescription: "Led the redesign of legacy network infrastructure, migrating from flat network topology to hierarchical design with proper VLAN segmentation. Implemented redundant links and optimized routing protocols resulting in 40% improvement in network performance.",
      technologies: ["Cisco Catalyst", "OSPF", "VLANs", "STP", "Network Design"],
      category: "Infrastructure",
      date: "Dec 2023",
      achievements: [
        "Reduced network downtime by 60%",
        "Improved security with VLAN segmentation",
        "Enhanced network monitoring capabilities",
        "Documented complete network topology"
      ]
    },
    {
      title: "Campus WiFi Deployment",
      description: "Designed and deployed enterprise-grade wireless network covering 50,000 sq ft across multiple buildings with seamless roaming capabilities.",
      longDescription: "Comprehensive wireless site survey and deployment project involving heat mapping, access point placement optimization, and controller configuration. Implemented enterprise security with 802.1X authentication.",
      technologies: ["Cisco WLC", "Access Points", "802.11ac", "Site Survey", "Heat Mapping"],
      category: "Wireless",
      date: "Oct 2023",
      achievements: [
        "99.5% wireless coverage achieved",
        "Seamless roaming between buildings",
        "Secure enterprise authentication",
        "Support for 500+ concurrent users"
      ]
    },
    {
      title: "Network Monitoring Implementation",
      description: "Deployed comprehensive network monitoring solution using SNMP and custom scripts to provide real-time visibility into network performance and health.",
      longDescription: "Implemented SolarWinds NPM with custom monitoring scripts and alert configurations. Created executive dashboards and automated reporting systems for proactive network management.",
      technologies: ["SolarWinds", "SNMP", "Python", "Grafana", "Network Analysis"],
      category: "Monitoring",
      date: "Aug 2023",
      achievements: [
        "24/7 network monitoring coverage",
        "Automated alert system",
        "Executive reporting dashboards",
        "Reduced MTTR by 50%"
      ]
    },
    {
      title: "Security Policy Implementation",
      description: "Developed and implemented comprehensive network security policies including firewall rules, access controls, and security monitoring procedures.",
      longDescription: "Created security framework incorporating firewall policies, intrusion detection, and access control measures. Conducted security audit and remediation of existing vulnerabilities.",
      technologies: ["pfSense", "ACLs", "VPN", "Security Audit", "Policy Development"],
      category: "Security",
      date: "Jun 2023",
      achievements: [
        "Zero security incidents post-implementation",
        "Compliance with industry standards",
        "Reduced attack surface by 70%",
        "Staff security training program"
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Infrastructure": "bg-blue-500/10 text-blue-400 border-blue-500/20",
      "Wireless": "bg-green-500/10 text-green-400 border-green-500/20",
      "Monitoring": "bg-purple-500/10 text-purple-400 border-purple-500/20",
      "Security": "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return colors[category] || "bg-primary/10 text-primary border-primary/20";
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world networking projects showcasing practical experience 
            in design, implementation, and optimization of network infrastructure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <Badge className={getCategoryColor(project.category)}>
                      {project.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{project.date}</span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-foreground">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="border-primary/30 text-primary bg-primary/5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-3 mb-6 flex-1">
                  <h4 className="font-semibold text-foreground">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-primary/30 hover:bg-primary/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-primary/30 hover:bg-primary/10"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}