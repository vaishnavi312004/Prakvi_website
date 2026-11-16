import { generatedImages } from '../assets/images';

export interface OfficeLocation {
  id: string;
  name: string;
  category: 'Headquarters' | 'Regional Hub';
  address: string[];
  city: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
  isPrimary?: boolean;
}

export const companyData = {
  name: 'Prakvi Techno Solutions Private Limited',
  shortName: 'Prakvi',
  tagline: 'Leading provider of innovative IT solutions for modern businesses.',

  contact: {
    primaryEmail: 'info@prakvi.com',
    careerEmail: 'info@prakvi.com',
    businessEmail: 'info@prakvi.com',
    phone: '+91-11-24626660',
    workingHours: 'Monday – Friday: 9:30 AM – 6:30 PM IST',
  },

  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/prakvi-techno-solutions',
    twitter: 'https://twitter.com/prakvitechno',
    facebook: 'https://facebook.com/prakvitechno',
    instagram: 'https://instagram.com/prakvitechno',
  },

  offices: [
    {
      id: 'delhi-office',
      name: 'Delhi Office',
      category: 'Headquarters',
      address: ['B-50, South Extn Part – 1', 'New Delhi, Delhi 110049'],
      city: 'Delhi',
      country: 'India',
      phone: '+91-11-24626660',
      email: 'info@prakvi.com',
      hours: 'Mon – Fri, 9:30 AM – 6:30 PM IST',
      isPrimary: true,
    },
    {
      id: 'nashik-office',
      name: 'Nashik Office',
      category: 'Regional Hub',
      address: [
        '142/2/B Veerbaba chouk, Gaulane road,',
        'Gaulane, Pathardi Shivar, Nashik 422010',
      ],
      city: 'Nashik',
      country: 'India',
      phone: '+91-11-24626660',
      email: 'info@prakvi.com',
      hours: 'Mon – Fri, 9:30 AM – 6:30 PM IST',
    },
  ] as OfficeLocation[],

  about: {
    hero: {
      kicker: 'About Prakvi',
      title: 'Driving Digital Transformation with Innovative Enterprise Solutions',
      description:
        'At Prakvi, we believe technology should simplify, connect, and empower businesses. Since our inception, we have been delivering cutting-edge enterprise software solutions that help organizations of all sizes streamline operations, make data-driven decisions, and achieve sustainable growth.',
      image: generatedImages.aboutInnovationStudio,
    },
    story: {
      title: 'Our Story is Your Success',
      paragraphs: [
        'Born from a passion for innovation and a relentless pursuit of perfection, Prakvi Techno Solutions emerged as a beacon of excellence in the digital landscape. We believe that every line of code tells a story, every design speaks a language, and every project builds a bridge to the future.',
        'What started as a vision to democratize cutting-edge technology has evolved into a mission-driven company that empowers businesses to thrive in the digital age. We don’t just build websites and applications, we craft digital experiences that resonate, engage, and convert.',
        'Our journey is defined not by the technologies we master, but by the problems we solve, the barriers we break, and the dreams we help realize. Every client partnership is a new chapter in our story of innovation and excellence.',
      ],
      highlights: [
        {
          title: 'Innovation First',
          description: 'Pushing boundaries with cutting-edge solutions',
          icon: 'Lightbulb',
        },
        {
          title: 'Client-Centric',
          description: 'Your success is our primary focus',
          icon: 'Target',
        },
        {
          title: 'Quality Driven',
          description: 'Excellence in every detail we deliver',
          icon: 'ShieldCheck',
        },
      ],
    },
    mission: {
      title: 'Our Mission',
      description:
        'To empower businesses worldwide by creating innovative, scalable, and user-centric digital solutions that drive growth, enhance user experiences, and transform the way people interact with technology. We’re committed to being the catalyst that turns your digital vision into reality.',
    },
    vision: {
      title: 'Our Vision',
      description:
        'To be the global leader in digital innovation, recognized for our ability to anticipate future trends, solve complex challenges, and create solutions that not only meet today’s needs but shape tomorrow’s possibilities. We envision a world where technology seamlessly enhances human potential.',
    },
    valuesIntro: {
      title: 'Our Core Values',
      description:
        'The principles that guide every decision, every project, and every relationship we build',
    },
    cultureIntro: {
      title: 'Our Culture',
      description:
        'The environment where creativity flourishes, innovation thrives, and extraordinary results are born',
    },
    recognitionIntro: {
      title: 'Recognition & Achievements',
      description:
        'Celebrating milestones that reflect our commitment to excellence and innovation',
    },
    cta: {
      title: 'Ready to Start Your Journey With Us?',
      description:
        'Let’s transform your vision into reality. Join hundreds of satisfied clients who have chosen excellence, innovation, and results.',
      buttonText: 'Start Your Project Today',
    },
  },

  values: [
    {
      id: 'innovation',
      title: 'Innovation',
      short:
        'We embrace emerging technologies and creative solutions to stay ahead of the curve. Innovation isn’t just what we do, it’s who we are. We constantly explore new possibilities to deliver exceptional results.',
      icon: 'Lightbulb',
    },
    {
      id: 'integrity',
      title: 'Integrity',
      short:
        'Transparency, honesty, and ethical practices form the foundation of every client relationship. We believe in building trust through consistent actions and delivering on our promises, every single time.',
      icon: 'ShieldCheck',
    },
    {
      id: 'excellence',
      title: 'Excellence',
      short:
        'We set the highest standards for ourselves and never settle for mediocrity. Every project is an opportunity to exceed expectations and deliver solutions that truly make a difference.',
      icon: 'Award',
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      short:
        'Great things happen when brilliant minds work together. We foster a collaborative environment where ideas flourish, creativity thrives, and collective success becomes inevitable.',
      icon: 'Users',
    },
    {
      id: 'passion',
      title: 'Passion',
      short:
        'We’re genuinely passionate about what we do. This enthusiasm drives us to go the extra mile, explore new horizons, and create solutions that not only work but inspire and delight.',
      icon: 'Heart',
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      short:
        'We’re committed to building a better future through responsible development practices, efficient solutions, and contributing positively to the communities we serve.',
      icon: 'Leaf',
    },
  ],

  culturePillars: [
    {
      id: 'growth-mindset',
      title: 'Growth Mindset',
      desc: 'We believe in continuous learning, embracing challenges, and turning obstacles into opportunities for growth and innovation.',
      icon: 'Rocket',
    },
    {
      id: 'results-driven',
      title: 'Results-Driven',
      desc: 'Every action we take is purposeful and measurable. We focus on delivering tangible results that create real value for our clients.',
      icon: 'Target',
    },
    {
      id: 'collaborative-spirit',
      title: 'Collaborative Spirit',
      desc: 'We thrive on teamwork, open communication, and the collective wisdom that emerges when diverse minds work together.',
      icon: 'Handshake',
    },
    {
      id: 'agile-approach',
      title: 'Agile Approach',
      desc: 'We adapt quickly to change, iterate rapidly, and maintain the flexibility needed to deliver exceptional results in dynamic environments.',
      icon: 'Zap',
    },
    {
      id: 'creative-excellence',
      title: 'Creative Excellence',
      desc: 'We celebrate creativity, encourage bold ideas, and believe that the best solutions often come from thinking outside the box.',
      icon: 'Palette',
    },
    {
      id: 'client-obsession',
      title: 'Client Obsession',
      desc: 'Our clients’ success is our success. We go above and beyond to understand their needs and exceed their expectations.',
      icon: 'Star',
    },
  ],

  achievements: [
    {
      id: 'industry-leader-award',
      title: 'Industry Leader Award',
      description:
        'Recognized as the leading web development company for innovative solutions and exceptional client service in the digital transformation space.',
      icon: 'Trophy',
    },
    {
      id: 'five-star-client-rating',
      title: '5-Star Client Rating',
      description:
        'Consistently maintaining the highest client satisfaction ratings across all major review platforms and industry surveys.',
      icon: 'Star',
    },
    {
      id: 'iso-certified',
      title: 'ISO Certified',
      description:
        'Certified for quality management systems, ensuring the highest standards in project delivery, security, and client service.',
      icon: 'BadgeCheck',
    },
    {
      id: 'global-reach',
      title: 'Global Reach',
      description:
        'Successfully delivered projects across 50+ countries, establishing ourselves as a trusted global partner for digital solutions.',
      icon: 'Globe2',
    },
    {
      id: 'innovation-award',
      title: 'Innovation Award',
      description:
        'Honored for breakthrough innovations in web technology and pioneering solutions that set new industry standards.',
      icon: 'Sparkles',
    },
    {
      id: 'trusted-partner',
      title: 'Trusted Partner',
      description:
        'Official technology partner with leading platforms and frameworks, ensuring access to cutting-edge tools and resources.',
      icon: 'ShieldCheck',
    },
  ],
};
