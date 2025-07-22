-- Create content tables for the portfolio admin system

-- About section
CREATE TABLE public.about_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'About Me',
  content TEXT NOT NULL DEFAULT 'Welcome to my portfolio...',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Skill categories
CREATE TABLE public.skill_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Technical skills
CREATE TABLE public.technical_skills (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id uuid REFERENCES public.skill_categories(id) ON DELETE CASCADE,
  proficiency_level INTEGER DEFAULT 3 CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Certifications
CREATE TABLE public.certifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tools and technologies
CREATE TABLE public.tools_technologies (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  proficiency_level INTEGER DEFAULT 3 CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  icon TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Professional experience
CREATE TABLE public.professional_experience (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  achievements TEXT[],
  technologies_used TEXT[],
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Educational history
CREATE TABLE public.education (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_name TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  grade TEXT,
  description TEXT,
  achievements TEXT[],
  location TEXT,
  institution_logo TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Featured projects
CREATE TABLE public.featured_projects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'Completed' CHECK (status IN ('In Progress', 'Completed', 'Archived')),
  start_date DATE,
  end_date DATE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact information
CREATE TABLE public.contact_info (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- SMTP configuration
CREATE TABLE public.smtp_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  smtp_host TEXT NOT NULL,
  smtp_port INTEGER NOT NULL DEFAULT 587,
  smtp_username TEXT NOT NULL,
  smtp_password TEXT NOT NULL,
  from_email TEXT NOT NULL,
  from_name TEXT NOT NULL DEFAULT 'Portfolio Contact',
  to_email TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technical_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smtp_config ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for the portfolio display)
CREATE POLICY "Public read access for about_content" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Public read access for skill_categories" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for technical_skills" ON public.technical_skills FOR SELECT USING (true);
CREATE POLICY "Public read access for certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Public read access for tools_technologies" ON public.tools_technologies FOR SELECT USING (true);
CREATE POLICY "Public read access for professional_experience" ON public.professional_experience FOR SELECT USING (true);
CREATE POLICY "Public read access for education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public read access for featured_projects" ON public.featured_projects FOR SELECT USING (true);
CREATE POLICY "Public read access for contact_info" ON public.contact_info FOR SELECT USING (true);

-- Admin-only policies for authenticated users with admin role
CREATE POLICY "Admin full access for about_content" ON public.about_content FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access for skill_categories" ON public.skill_categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access for technical_skills" ON public.technical_skills FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access for certifications" ON public.certifications FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access for tools_technologies" ON public.tools_technologies FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access for professional_experience" ON public.professional_experience FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access for education" ON public.education FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access for featured_projects" ON public.featured_projects FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access for contact_info" ON public.contact_info FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access for smtp_config" ON public.smtp_config FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Add updated_at triggers for all tables
CREATE TRIGGER update_about_content_updated_at
  BEFORE UPDATE ON public.about_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skill_categories_updated_at
  BEFORE UPDATE ON public.skill_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_technical_skills_updated_at
  BEFORE UPDATE ON public.technical_skills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON public.certifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tools_technologies_updated_at
  BEFORE UPDATE ON public.tools_technologies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_professional_experience_updated_at
  BEFORE UPDATE ON public.professional_experience
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_education_updated_at
  BEFORE UPDATE ON public.education
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_featured_projects_updated_at
  BEFORE UPDATE ON public.featured_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_smtp_config_updated_at
  BEFORE UPDATE ON public.smtp_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.about_content (title, content) VALUES (
  'About Me',
  'I am a passionate cybersecurity professional with expertise in network security, ethical hacking, and digital forensics. With years of experience in protecting digital assets and infrastructure, I specialize in identifying vulnerabilities and implementing robust security solutions.'
);

-- Insert default skill categories
INSERT INTO public.skill_categories (name, description, icon, display_order) VALUES
  ('Networking Protocols', 'Core networking protocols and standards', 'Network', 1),
  ('Networking Security', 'Security protocols and defensive technologies', 'Shield', 2),
  ('Security Tools', 'Penetration testing and security assessment tools', 'Lock', 3),
  ('Programming', 'Programming languages and development skills', 'Code2', 4);

-- Insert default contact info
INSERT INTO public.contact_info (email, phone, location, linkedin_url, github_url) VALUES (
  'sinaan.jr@email.com',
  '+1 (555) 123-4567',
  'San Francisco, CA',
  'https://linkedin.com/in/sinaan-jr',
  'https://github.com/sinaan-jr'
);