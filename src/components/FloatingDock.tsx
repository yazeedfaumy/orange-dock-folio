import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, Briefcase, Code2, Mail, FileText } from "lucide-react";

interface DockItem {
  title: string;
  icon: React.ElementType;
  href: string;
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

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-4 rounded-2xl bg-gradient-card border border-border/50 px-4 pb-3 backdrop-blur-lg shadow-glow"
    >
      {items.map((item) => (
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
}: {
  mouseX: any;
  title: string;
  icon: React.ElementType;
  href: string;
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
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <Icon className="w-6 h-6 text-primary-foreground" />
    </motion.div>
  );
}