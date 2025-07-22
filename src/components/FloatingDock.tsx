import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, Briefcase, Code2, Mail, FileText, LogIn, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface DockItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  action?: () => void;
}

const items: DockItem[] = [
  { title: "Home", icon: Home, href: "#home" },
  { title: "About", icon: User, href: "#about" },
  { title: "Experience", icon: Briefcase, href: "#experience" },
  { title: "Skills", icon: Code2, href: "#skills" },
  { title: "Projects", icon: FileText, href: "#projects" },
  { title: "Contact", icon: Mail, href: "#contact" },
];

export function FloatingDock() {
  const mouseX = useMotionValue(Infinity);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navigationItems: DockItem[] = [
    { title: "Home", icon: Home, href: "#home" },
    { title: "About", icon: User, href: "#about" },
    { title: "Experience", icon: Briefcase, href: "#experience" },
    { title: "Skills", icon: Code2, href: "#skills" },
    { title: "Projects", icon: FileText, href: "#projects" },
    { title: "Contact", icon: Mail, href: "#contact" },
  ];

  const authItems: DockItem[] = user 
    ? [
        { title: "Admin", icon: Settings, action: () => console.log("Admin panel") },
        { title: "Sign Out", icon: LogOut, action: signOut },
      ]
    : [
        { title: "Sign In", icon: LogIn, action: () => navigate("/auth") },
      ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-4 rounded-2xl bg-gradient-card border border-border/50 px-4 pb-3 backdrop-blur-lg shadow-glow"
    >
      {navigationItems.map((item) => (
        <DockIcon mouseX={mouseX} key={item.title} {...item} />
      ))}
      
      {/* Separator */}
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-primary/30 to-transparent mx-2" />
      
      {authItems.map((item) => (
        <DockIcon mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
}

function DockIcon({
  mouseX,
  title,
  icon: Icon,
  href,
  action,
}: {
  mouseX: any;
  title: string;
  icon: React.ElementType;
  href?: string;
  action?: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-full bg-gradient-primary flex items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (action) {
          action();
        } else if (href) {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <Icon className="w-6 h-6 text-primary-foreground" />
    </motion.div>
  );
}