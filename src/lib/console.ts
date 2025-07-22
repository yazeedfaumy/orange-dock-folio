// Add console command functionality
(window as any).sinaanPortfolio = {
  about: () => {
    console.log(`
%c🚀 Sinaan Jr Portfolio
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

%c👨‍💻 Built by: Sinaan Jr
%c🎨 Design: Modern Network Engineer Portfolio
%c⚡ Tech Stack: React + TypeScript + Supabase + Aceternity UI
%c🌐 Features: Dynamic Content Management, Theme Customization
%c📅 Year: 2025

%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%cTo access admin features, use the login in the floating dock!
    `, 
    'color: #FF6B35; font-size: 16px; font-weight: bold;',
    'color: #666;',
    'color: #FF6B35; font-weight: bold;',
    'color: #333;',
    'color: #333;',
    'color: #333;',
    'color: #333;',
    'color: #666;',
    'color: #FF6B35; font-weight: bold;'
    );
  },
  creator: () => {
    console.log(`
%c🎯 Portfolio Creator
%c━━━━━━━━━━━━━━━━━━

%cBuilt with ❤️ by Sinaan Jr
%cA passionate Network Engineer with 1 year of experience
%cSpecializing in modern web technologies and network infrastructure

%cContact: sinaan.jr@email.com
%cLinkedIn: /in/sinaan-jr
%cGitHub: /sinaan-jr
    `,
    'color: #FF6B35; font-size: 14px; font-weight: bold;',
    'color: #666;',
    'color: #FF6B35; font-weight: bold;',
    'color: #333;',
    'color: #333;',
    'color: #333;',
    'color: #333;',
    'color: #333;'
    );
  },
  theme: () => {
    console.log(`
%c🎨 Theme Information
%c━━━━━━━━━━━━━━━━━━━

%cPrimary Colors: Orange Gradient (#FF6B35 to #F7931E)
%cSecondary: Black/Dark themes
%cDesign System: Semantic color tokens
%cAnimations: Framer Motion powered
%cUI Components: Aceternity UI + shadcn/ui

%cTheme customization available through admin panel!
    `,
    'color: #FF6B35; font-size: 14px; font-weight: bold;',
    'color: #666;',
    'color: #333;',
    'color: #333;',
    'color: #333;',
    'color: #333;',
    'color: #333;',
    'color: #FF6B35; font-weight: bold;'
    );
  }
};

// Show welcome message
console.log(`
%c🌟 Welcome to Sinaan Jr's Portfolio!
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

%cType %csinaanPortfolio.about()%c to learn more about this portfolio
%cType %csinaanPortfolio.creator()%c to learn about the creator
%cType %csinaanPortfolio.theme()%c to learn about the design

%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`, 
'color: #FF6B35; font-size: 18px; font-weight: bold;',
'color: #666;',
'color: #333;',
'color: #FF6B35; font-weight: bold;',
'color: #333;',
'color: #333;',
'color: #FF6B35; font-weight: bold;',
'color: #333;',
'color: #333;',
'color: #FF6B35; font-weight: bold;',
'color: #333;',
'color: #666;'
);