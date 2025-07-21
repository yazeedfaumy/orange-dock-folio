import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      title: "Junior Network Engineer",
      company: "TechFlow Solutions",
      location: "San Francisco, CA",
      period: "Jan 2024 - Present",
      type: "Full-time",
      description: [
        "Configured and maintained enterprise network infrastructure for 200+ endpoints",
        "Implemented VLAN segmentation reducing network congestion by 30%",
        "Assisted in deploying wireless network covering 50,000 sq ft office space",
        "Troubleshot network connectivity issues with 95% first-call resolution rate",
        "Documented network topologies and created maintenance procedures"
      ],
      technologies: ["Cisco IOS", "VLANs", "Wireless Networks", "Network Monitoring", "Troubleshooting"]
    },
    {
      title: "Network Support Intern",
      company: "DataBridge Corp",
      location: "San Francisco, CA",
      period: "Jun 2023 - Dec 2023",
      type: "Internship",
      description: [
        "Supported network operations team in daily monitoring and maintenance tasks",
        "Learned hands-on configuration of Cisco routers and switches",
        "Assisted in cable management and hardware installation projects",
        "Gained experience with network monitoring tools and alert systems",
        "Participated in after-hours maintenance windows and updates"
      ],
      technologies: ["Cisco Equipment", "Cable Management", "SolarWinds", "Basic Routing", "Switch Configuration"]
    },
    {
      title: "IT Support Technician",
      company: "University IT Department",
      location: "Berkeley, CA",
      period: "Sep 2022 - May 2023",
      type: "Part-time",
      description: [
        "Provided technical support to students and faculty (500+ users)",
        "Troubleshot network connectivity issues in dormitories and labs",
        "Installed and configured network equipment in computer labs",
        "Maintained campus WiFi infrastructure and access points",
        "Created user guides and training materials for common network issues"
      ],
      technologies: ["Help Desk", "WiFi Management", "User Training", "Access Points", "Network Troubleshooting"]
    }
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building expertise through hands-on experience in network design, 
            implementation, and maintenance across diverse environments.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-primary to-primary/20" />
              )}
              
              <Card className="mb-8 p-8 bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                      <Building className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                        <h3 className="text-2xl font-bold text-foreground">
                          {experience.title}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className="w-fit bg-primary/10 text-primary border-primary/20"
                        >
                          {experience.type}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span className="font-semibold text-foreground">
                            {experience.company}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{experience.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      <ul className="space-y-2">
                        {experience.description.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, idx) => (
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
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}