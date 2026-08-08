import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Smartphone,
  Gamepad2,
  ShieldCheck,
  Cpu,
  Palette,
  Megaphone,
  CloudCog,
  Bot,
  Blocks,
  PanelsTopLeft,
  ShoppingCart,
  BarChart3,
  Headphones,
  Box,
} from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  accent: "cyan" | "purple" | "red" | "green" | "blue";
}

export const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Modern, scalable and high-performance websites and web applications built around your business goals.",
    icon: Code2,
    tags: ["React", "Next.js", "Node.js"],
    accent: "cyan",
  },

  {
    id: 2,
    title: "Mobile App Development",
    description:
      "User-focused Android and iOS applications designed for smooth performance and scalable growth.",
    icon: Smartphone,
    tags: ["Android", "iOS", "Cross-platform"],
    accent: "purple",
  },

  {
    id: 3,
    title: "Game Development",
    description:
      "Immersive 2D and 3D games with engaging gameplay, optimized graphics and interactive experiences.",
    icon: Gamepad2,
    tags: ["2D / 3D", "Unity", "Interactive"],
    accent: "red",
  },

  {
    id: 4,
    title: "Cyber Security",
    description:
      "Protect your digital infrastructure with security testing, vulnerability assessment and security best practices.",
    icon: ShieldCheck,
    tags: ["Security Testing", "Pentesting", "Auditing"],
    accent: "green",
  },

  {
    id: 5,
    title: "IoT & Robotics",
    description:
      "Connected devices and intelligent robotic solutions that bridge physical systems with modern software.",
    icon: Cpu,
    tags: ["IoT", "Robotics", "Automation"],
    accent: "blue",
  },

  {
    id: 6,
    title: "Graphic Design",
    description:
      "Creative visual identities, marketing materials and digital graphics designed to make your brand memorable.",
    icon: Palette,
    tags: ["Branding", "Social Media", "Visual Design"],
    accent: "purple",
  },

  {
    id: 7,
    title: "Digital Marketing",
    description:
      "Data-driven digital marketing strategies that help businesses reach the right audience and grow online.",
    icon: Megaphone,
    tags: ["SEO", "Social Media", "Campaigns"],
    accent: "red",
  },

  {
    id: 8,
    title: "Cloud & DevOps",
    description:
      "Cloud infrastructure, deployment and DevOps automation across AWS, Azure and Google Cloud.",
    icon: CloudCog,
    tags: ["AWS", "Azure", "CI/CD"],
    accent: "cyan",
  },

  {
    id: 9,
    title: "AI/ML & Chatbots",
    description:
      "Intelligent AI solutions, machine learning models and conversational chatbots built for real-world use cases.",
    icon: Bot,
    tags: ["AI/ML", "Chatbots", "Automation"],
    accent: "green",
  },

  {
    id: 10,
    title: "Blockchain & Web3",
    description:
      "Decentralized applications and blockchain-powered solutions designed for the next generation of the web.",
    icon: Blocks,
    tags: ["Web3", "Smart Contracts", "dApps"],
    accent: "blue",
  },

  {
    id: 11,
    title: "UI/UX Design",
    description:
      "Research-driven interfaces, wireframes and prototypes that turn complex ideas into simple user experiences.",
    icon: PanelsTopLeft,
    tags: ["Wireframing", "Prototyping", "Figma"],
    accent: "purple",
  },

  {
    id: 12,
    title: "E-commerce Development",
    description:
      "Conversion-focused online stores using Shopify, WooCommerce or custom e-commerce solutions.",
    icon: ShoppingCart,
    tags: ["Shopify", "WooCommerce", "Custom"],
    accent: "red",
  },

  {
    id: 13,
    title: "Data Analytics & BI",
    description:
      "Interactive dashboards and business intelligence solutions that turn data into actionable insights.",
    icon: BarChart3,
    tags: ["Analytics", "Dashboards", "BI"],
    accent: "cyan",
  },

  {
    id: 14,
    title: "Maintenance & AMC",
    description:
      "Reliable ongoing support, maintenance and annual contracts to keep your digital products running smoothly.",
    icon: Headphones,
    tags: ["Maintenance", "Support", "AMC"],
    accent: "green",
  },

  {
    id: 15,
    title: "AR/VR & 3D",
    description:
      "Immersive augmented reality, virtual reality and 3D experiences for modern digital products.",
    icon: Box,
    tags: ["AR", "VR", "3D"],
    accent: "blue",
  },
];