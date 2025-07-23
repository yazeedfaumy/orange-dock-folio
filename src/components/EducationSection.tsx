import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function EducationSection() {
  const [education, setEducation] = useState<any[]>([]);

  useEffect(() => {
    const fetchEducation = async () => {
      const { data } = await supabase
        .from('education')
        .select('*')
        .order('display_order');
      
      if (data) setEducation(data);
    };

    fetchEducation();
  }, []);

  if (education.length === 0) return null;

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-primary">Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Academic foundation and continuous learning journey in network engineering and technology.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline line */}
              {index < education.length - 1 && (
                <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-primary to-primary/20" />
              )}
              
              <Card className="mb-8 p-8 bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                      <GraduationCap className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                        <h3 className="text-2xl font-bold text-foreground">
                          {edu.degree}
                        </h3>
                        {edu.is_current && (
                          <Badge 
                            variant="secondary" 
                            className="w-fit bg-primary/10 text-primary border-primary/20"
                          >
                            Current
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span className="font-semibold text-foreground">
                            {edu.institution_name}
                          </span>
                        </div>
                        {edu.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{edu.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(edu.start_date).getFullYear()} - {edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Field of Study */}
                    {edu.field_of_study && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Field of Study</h4>
                        <p className="text-muted-foreground">{edu.field_of_study}</p>
                      </div>
                    )}

                    {/* Grade */}
                    {edu.grade && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Grade</h4>
                        <p className="text-muted-foreground">{edu.grade}</p>
                      </div>
                    )}

                    {/* Description */}
                    {edu.description && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Description</h4>
                        <p className="text-muted-foreground">{edu.description}</p>
                      </div>
                    )}

                    {/* Achievements */}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          Achievements
                        </h4>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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