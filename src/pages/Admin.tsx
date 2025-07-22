import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Code2, 
  Award, 
  Briefcase, 
  GraduationCap, 
  FolderOpen, 
  Mail, 
  Phone,
  Plus,
  Edit,
  Trash,
  Save
} from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // State for different content types
  const [aboutContent, setAboutContent] = useState({ title: '', content: '', image_url: '' });
  const [skillCategories, setSkillCategories] = useState([]);
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [toolsTech, setToolsTech] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    github_url: '',
    twitter_url: ''
  });
  const [smtpConfig, setSmtpConfig] = useState({
    smtp_host: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    from_email: '',
    to_email: ''
  });

  // Check admin access
  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      loadAllData();
    };

    checkAdminAccess();
  }, [user, navigate, toast]);

  const loadAllData = async () => {
    try {
      // Load about content
      const { data: about } = await supabase.from('about_content').select('*').single();
      if (about) setAboutContent(about);

      // Load skill categories
      const { data: categories } = await supabase.from('skill_categories').select('*').order('display_order');
      if (categories) setSkillCategories(categories);

      // Load technical skills
      const { data: skills } = await supabase.from('technical_skills').select('*, skill_categories(name)').order('display_order');
      if (skills) setTechnicalSkills(skills);

      // Load certifications
      const { data: certs } = await supabase.from('certifications').select('*').order('display_order');
      if (certs) setCertifications(certs);

      // Load tools & technologies
      const { data: tools } = await supabase.from('tools_technologies').select('*').order('display_order');
      if (tools) setToolsTech(tools);

      // Load experience
      const { data: exp } = await supabase.from('professional_experience').select('*').order('display_order');
      if (exp) setExperience(exp);

      // Load education
      const { data: edu } = await supabase.from('education').select('*').order('display_order');
      if (edu) setEducation(edu);

      // Load projects
      const { data: proj } = await supabase.from('featured_projects').select('*').order('display_order');
      if (proj) setProjects(proj);

      // Load contact info
      const { data: contact } = await supabase.from('contact_info').select('*').single();
      if (contact) setContactInfo(contact);

      // Load SMTP config
      const { data: smtp } = await supabase.from('smtp_config').select('*').single();
      if (smtp) setSmtpConfig(smtp);

    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data.",
        variant: "destructive",
      });
    }
  };

  const saveAboutContent = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('about_content')
        .upsert(aboutContent);

      if (error) throw error;

      toast({
        title: "Success",
        description: "About content updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about content.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const saveContactInfo = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('contact_info')
        .upsert(contactInfo);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact information updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact information.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const saveSmtpConfig = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('smtp_config')
        .upsert(smtpConfig);

      if (error) throw error;

      toast({
        title: "Success",
        description: "SMTP configuration updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update SMTP configuration.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Checking Access...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Portfolio Admin Panel
          </h1>
          <p className="text-muted-foreground">Manage your portfolio content and settings</p>
        </div>

        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:grid-cols-8">
            <TabsTrigger value="about" className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-1">
              <Code2 className="w-4 h-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Certs</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1">
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* About Content Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Me Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-title">Title</Label>
                  <Input
                    id="about-title"
                    value={aboutContent.title}
                    onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                    placeholder="About Me"
                  />
                </div>
                <div>
                  <Label htmlFor="about-content">Content</Label>
                  <Textarea
                    id="about-content"
                    value={aboutContent.content}
                    onChange={(e) => setAboutContent({ ...aboutContent, content: e.target.value })}
                    placeholder="Tell your story..."
                    rows={8}
                  />
                </div>
                <div>
                  <Label htmlFor="about-image">Image URL</Label>
                  <Input
                    id="about-image"
                    value={aboutContent.image_url || ''}
                    onChange={(e) => setAboutContent({ ...aboutContent, image_url: e.target.value })}
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
                <Button onClick={saveAboutContent} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save About Content
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactInfo.email || ''}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      value={contactInfo.phone || ''}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-location">Location</Label>
                    <Input
                      id="contact-location"
                      value={contactInfo.location || ''}
                      onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-linkedin">LinkedIn URL</Label>
                    <Input
                      id="contact-linkedin"
                      value={contactInfo.linkedin_url || ''}
                      onChange={(e) => setContactInfo({ ...contactInfo, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-github">GitHub URL</Label>
                    <Input
                      id="contact-github"
                      value={contactInfo.github_url || ''}
                      onChange={(e) => setContactInfo({ ...contactInfo, github_url: e.target.value })}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-twitter">Twitter URL</Label>
                    <Input
                      id="contact-twitter"
                      value={contactInfo.twitter_url || ''}
                      onChange={(e) => setContactInfo({ ...contactInfo, twitter_url: e.target.value })}
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>
                </div>
                <Button onClick={saveContactInfo} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Contact Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SMTP Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>SMTP Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input
                      id="smtp-host"
                      value={smtpConfig.smtp_host || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_host: e.target.value })}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      value={smtpConfig.smtp_port || 587}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_port: parseInt(e.target.value) })}
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input
                      id="smtp-username"
                      value={smtpConfig.smtp_username || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_username: e.target.value })}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      value={smtpConfig.smtp_password || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_password: e.target.value })}
                      placeholder="your-app-password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      value={smtpConfig.from_email || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, from_email: e.target.value })}
                      placeholder="noreply@yourdomain.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="to-email">Receive Emails At</Label>
                    <Input
                      id="to-email"
                      type="email"
                      value={smtpConfig.to_email || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, to_email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <Button onClick={saveSmtpConfig} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save SMTP Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder tabs for other sections */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Skills management interface will be implemented next...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications">
            <Card>
              <CardHeader>
                <CardTitle>Certifications Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Certifications management interface will be implemented next...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Professional Experience Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Experience management interface will be implemented next...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Education management interface will be implemented next...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Featured Projects Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Projects management interface will be implemented next...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Admin;