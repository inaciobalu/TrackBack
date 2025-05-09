import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Activity,
  BarChart2,
  Users,
  TrendingUp,
  Check,
  Star,
  Menu,
  X,
  Trophy,
  Heart,
  Clock,
  Shield,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Globe,
  Award,
  Target,
  Zap,
  Calendar,
  LineChart,
  UserCheck,
  Building,
  Laptop,
  Smartphone,
  Database,
  Lock,
  Gift,
  CreditCard,
  ChevronDown,
  Bell,
  Settings,
  User2,
  LogOut,
  Plus,
  Moon,
  Battery,
  UserPlus,
  ChevronLeft,
  FileText,
  Brain,
  MoreVertical,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import { sendContactMessage } from "../lib/email";

const features = [
  {
    title: "Real-time Monitoring",
    description:
      "Track athlete performance and wellness metrics as they happen",
    icon: Activity,
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights through comprehensive data visualization",
    icon: BarChart2,
  },
  {
    title: "Team Management",
    description: "Efficiently manage your athletes and their training programs",
    icon: Users,
  },
  {
    title: "Progress Tracking",
    description: "Monitor improvements and identify areas for development",
    icon: TrendingUp,
  },
];

const platformBenefits = [
  {
    title: "Data-Driven Decisions",
    description:
      "Make informed decisions with comprehensive analytics and real-time performance tracking.",
    icon: BarChart2,
    color: "bg-blue-500",
  },
  {
    title: "Team Collaboration",
    description:
      "Foster seamless communication between coaches, athletes, and support staff.",
    icon: Users,
    color: "bg-green-500",
  },
  {
    title: "Performance Optimization",
    description:
      "Leverage AI insights to optimize training programs and maximize results.",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    title: "Health Monitoring",
    description:
      "Track athlete wellness and prevent injuries with proactive monitoring.",
    icon: Heart,
    color: "bg-red-500",
  },
  {
    title: "Secure & Compliant",
    description:
      "Enterprise-grade security and GDPR compliance for your data protection.",
    icon: Shield,
    color: "bg-indigo-500",
  },
  {
    title: "24/7 Support",
    description:
      "Dedicated support team to help you succeed every step of the way.",
    icon: MessageSquare,
    color: "bg-teal-500",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    monthlyPrice: "19",
    yearlyPrice: "190",
    period: "month",
    features: [
      "Up to 5 athletes",
      "Basic analytics dashboard",
      "Daily check-in forms",
      "Basic feedback tools",
      "Email support",
      "Mobile app access",
    ],
    limitations: ["No AI insights", "Basic reports only"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: "39",
    yearlyPrice: "375",
    period: "month",
    features: [
      "Up to 20 athletes",
      "Full performance history",
      "Advanced analytics",
      "AI-powered insights",
      "Feedback templates",
      "Team management",
      "Priority support",
      "Custom reports",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Elite",
    monthlyPrice: "79",
    yearlyPrice: "790",
    period: "month",
    features: [
      "Unlimited athletes",
      "Premium analytics",
      "Advanced AI insights",
      "Team branding",
      "Report exports",
      "Priority 24/7 support",
      "Custom integrations",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
];

const useCases = [
  {
    title: "For Coaches",
    icon: UserCheck,
    benefits: [
      "Real-time athlete monitoring",
      "Performance analytics dashboard",
      "Training program management",
      "Injury prevention insights",
      "Team communication tools",
    ],
  },
  {
    title: "For Clubs",
    icon: Building,
    benefits: [
      "Multi-team management",
      "Resource allocation",
      "Performance tracking",
      "Talent development",
      "Club-wide analytics",
    ],
  },
  {
    title: "For Athletes",
    icon: Target,
    benefits: [
      "Personal performance tracking",
      "Training history",
      "Goal setting and monitoring",
      "Health and wellness insights",
      "Progress visualization",
    ],
  },
];

const platformFeatures = [
  {
    title: "Smart Analytics",
    description: "AI-powered insights to optimize training and performance",
    icon: Zap,
    color: "bg-purple-500",
  },
  {
    title: "Schedule Management",
    description: "Efficient training and event scheduling for teams",
    icon: Calendar,
    color: "bg-green-500",
  },
  {
    title: "Performance Metrics",
    description: "Comprehensive tracking of key performance indicators",
    icon: LineChart,
    color: "bg-blue-500",
  },
  {
    title: "Data Security",
    description: "Enterprise-grade security for sensitive athlete data",
    icon: Lock,
    color: "bg-red-500",
  },
  {
    title: "Mobile Access",
    description: "Access your data anywhere with our mobile app",
    icon: Smartphone,
    color: "bg-orange-500",
  },
  {
    title: "Cloud Storage",
    description: "Secure cloud storage for all your athletic data",
    icon: Database,
    color: "bg-teal-500",
  },
];

const dashboardFeatures = [
  {
    id: "athletes",
    title: "Athlete Management",
    description:
      "Track individual athlete performance, health metrics, and training progress in real-time.",
    icon: Users,
    color: "bg-blue-500",
    preview: "/screenshots/athletes-preview.png",
    highlights: [
      "Individual athlete profiles",
      "Performance tracking",
      "Health metrics monitoring",
      "Training history",
    ],
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description:
      "Comprehensive data visualization and AI-powered insights for better decision making.",
    icon: BarChart2,
    color: "bg-purple-500",
    preview: "/screenshots/analytics-preview.png",
    highlights: [
      "Performance trends",
      "AI-powered insights",
      "Custom reports",
      "Data visualization",
    ],
  },
  {
    id: "insights",
    title: "Smart Insights",
    description:
      "AI-powered insights and recommendations to optimize athlete performance and training strategies.",
    icon: Zap,
    color: "bg-yellow-500",
    preview: "/screenshots/insights-preview.png",
    highlights: [
      "Performance analysis",
      "Training recommendations",
      "Recovery optimization",
      "Trend detection",
    ],
  },
];

type SectionName =
  | "hero"
  | "how-it-works"
  | "features"
  | "dashboard"
  | "pricing"
  | "contact";

interface Section {
  id: SectionName;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "dashboard", label: "Dashboard" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SectionName>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(["hero"])
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });
  const [selectedFeature, setSelectedFeature] = useState(
    dashboardFeatures[0].id
  );
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [activeCard, setActiveCard] = useState(0);

  const sectionsRef = useRef<Record<SectionName, React.RefObject<HTMLElement>>>(
    {
      hero: useRef(null),
      "how-it-works": useRef(null),
      features: useRef(null),
      dashboard: useRef(null),
      pricing: useRef(null),
      contact: useRef(null),
    }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            target.classList.add("animate-in");
            if (target.id) {
              setActiveSection(target.id as SectionName);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Also observe all animatable elements
    const animatableElements = document.querySelectorAll(".animate-on-scroll");
    animatableElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (section: SectionName) => {
    setActiveSection(section);
    sectionsRef.current[section]?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Please fill in all fields",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setFormStatus({
      type: "loading",
      message: "Sending message...",
    });

    try {
      const result = await sendContactMessage(formData);

      if (!result.success) {
        throw new Error("Failed to send message");
      }

      setFormStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          type: "idle",
          message: "",
        });
      }, 5000);
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    }
  };

  // Add scroll handler for pricing cards
  const handlePricingScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85; // 85% of container width
    const newActiveCard = Math.round(scrollPosition / (cardWidth + 16)); // 16 is the gap
    setActiveCard(newActiveCard);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Only render heavy background effects on desktop for LCP optimization */}
        <div className="absolute inset-0 opacity-10 hidden sm:block">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat pattern-grid transform rotate-45"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 rounded-full filter blur-3xl animate-pulse hidden sm:block"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full filter blur-3xl animate-pulse delay-1000 hidden sm:block"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-blue-600 text-lg font-bold">T</span>
              </div>
              <span className="text-lg font-bold text-white">TrackBack</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={clsx(
                    "text-sm font-medium transition-colors hover:text-white",
                    activeSection === section.id
                      ? "text-white"
                      : "text-blue-100"
                  )}
                >
                  {section.label}
                </button>
              ))}
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
                <Link
                  to="/register"
                  className="px-5 py-2 bg-white hover:bg-blue-50 text-blue-600 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all transform hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={clsx(
            "fixed inset-x-0 top-16 md:hidden bg-gradient-to-b from-blue-600/95 to-blue-700/95 backdrop-blur-lg transition-all duration-300 ease-in-out z-50",
            isMenuOpen
              ? "h-screen opacity-100"
              : "h-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="px-4 py-6 space-y-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id);
                  setIsMenuOpen(false);
                }}
                className={clsx(
                  "block w-full text-left px-6 py-3 rounded-xl text-base font-medium transition-all duration-200",
                  activeSection === section.id
                    ? "bg-white/20 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white active:scale-95"
                )}
              >
                {section.label}
              </button>
            ))}
            <div className="pt-4 mt-4 space-y-3 border-t border-white/10">
              <Link
                to="/register"
                className="block w-full px-6 py-3.5 text-center text-blue-600 bg-white hover:bg-blue-50 rounded-xl font-medium transition-all shadow-lg transform active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block w-full px-6 py-3.5 text-center text-white bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all transform active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative pt-16">
        {/* Hero Section */}
        <section
          id="hero"
          ref={sectionsRef.current.hero}
          className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16 sm:py-0"
        >
          <div className="absolute inset-0 z-0">
            <picture>
              <source srcSet="/screenshots/hero.avif" type="image/avif" />
              <source srcSet="/screenshots/hero.webp" type="image/webp" />
              <img
                src="/screenshots/hero.png"
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover"
                width="1920"
                height="1080"
                srcSet="/screenshots/hero-800.avif 800w, /screenshots/hero-1600.avif 1600w, /screenshots/hero.avif 1920w"
                sizes="(max-width: 800px) 800px, (max-width: 1600px) 1600px, 1920px"
                loading="eager"
                fetchpriority="high"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-blue-900/95 sm:to-blue-900/30" />
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20 pattern-grid" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-20">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-center sm:text-left max-w-xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Transform <span className="inline-block">Your</span>{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400 animate-gradient">
                    Athletic Performance
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  TrackBack is your all-in-one platform for athletic performance
                  management. Join thousands of athletes tracking their
                  progress, optimizing their training, and reaching their full
                  potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto sm:max-w-none">
                  <button
                    onClick={() => navigate("/register")}
                    className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-white/20 group flex items-center justify-center"
                  >
                    Join as an Athlete
                    <ChevronRight className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all transform hover:scale-105 backdrop-blur-sm group flex items-center justify-center"
                  >
                    How It Works
                    <ChevronDown className="inline-block ml-2 transform group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div
                className={clsx(
                  "relative transform transition-all duration-1000 delay-300 hidden sm:block",
                  visibleSections.has("hero")
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                )}
              >
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <picture>
                    <source srcSet="/screenshots/1.avif" type="image/avif" />
                    <source srcSet="/screenshots/1.webp" type="image/webp" />
                    <img
                      src="/screenshots/1.png"
                      alt="TrackBack Dashboard"
                      className="w-full h-full object-cover"
                      width="1200"
                      height="675"
                      srcSet="/screenshots/1-600.avif 600w, /screenshots/1-900.avif 900w, /screenshots/1.avif 1200w"
                      sizes="(max-width: 600px) 600px, (max-width: 900px) 900px, 1200px"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 transform rotate-6">
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">
                          Performance
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          +27%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-optimized scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div
              className="animate-bounce cursor-pointer hidden sm:block"
              onClick={() => scrollToSection("hero")}
            >
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start p-1">
                <div className="w-1.5 h-3 bg-white rounded-full animate-scroll" />
              </div>
            </div>
            <div
              className="sm:hidden animate-bounce cursor-pointer bg-white/10 backdrop-blur-sm rounded-full p-3"
              onClick={() => scrollToSection("hero")}
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </section>

        {/* Add new How It Works section after hero and before features */}
        <section
          id="how-it-works"
          ref={sectionsRef.current["how-it-works"]}
          className="py-16 sm:py-24 bg-white/5 backdrop-blur-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/20 animate-gradient-x"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Simplifying Athlete-Coach Communication
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
                Track your daily wellness and training sessions in minutes,
                helping coaches make better decisions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 transform transition-all duration-500 hover:scale-105 hover:bg-white/15 animate-on-scroll">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  1. Daily Check-in
                </h3>
                <p className="text-blue-100 mb-4">
                  Take 2 minutes each day to rate your:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Sleep Quality</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Fatigue Level</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Muscle Soreness</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Overall Readiness</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 transform transition-all duration-500 hover:scale-105 hover:bg-white/15 animate-on-scroll">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  2. Log Training
                </h3>
                <p className="text-blue-100 mb-4">
                  Record your training sessions with:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-blue-400" />
                    <span>Training Type</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-blue-400" />
                    <span>Session Duration</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-blue-400" />
                    <span>Intensity Level (RPE)</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-blue-400" />
                    <span>Session Notes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 transform transition-all duration-500 hover:scale-105 hover:bg-white/15 animate-on-scroll">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  3. Smart Analysis
                </h3>
                <p className="text-blue-100 mb-4">
                  Get insights and optimize training:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-purple-400" />
                    <span>Training Load Analysis</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-purple-400" />
                    <span>Recovery Tracking</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-purple-400" />
                    <span>Performance Trends</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <Check className="w-5 h-5 text-purple-400" />
                    <span>Wellness Patterns</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto animate-on-scroll">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center sm:text-left">
                    Why It Matters
                  </h3>
                  <p className="text-blue-100 mb-6 text-center sm:text-left">
                    TrackBack bridges the communication gap between athletes and
                    coaches. By consistently tracking daily wellness and
                    training data, coaches can:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <li className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                        <span className="font-medium">Optimize Training</span>
                      </div>
                      <p className="text-sm text-blue-100">
                        Adjust training loads based on athlete readiness and
                        recovery status
                      </p>
                    </li>
                    <li className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <Shield className="w-5 h-5 text-amber-400" />
                        <span className="font-medium">Prevent Injuries</span>
                      </div>
                      <p className="text-sm text-blue-100">
                        Identify early warning signs through wellness trends
                      </p>
                    </li>
                    <li className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <Target className="w-5 h-5 text-amber-400" />
                        <span className="font-medium">Track Progress</span>
                      </div>
                      <p className="text-sm text-blue-100">
                        Monitor performance improvements and training
                        adaptations
                      </p>
                    </li>
                    <li className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <Users className="w-5 h-5 text-amber-400" />
                        <span className="font-medium">Build Trust</span>
                      </div>
                      <p className="text-sm text-blue-100">
                        Strengthen athlete-coach relationships through
                        data-driven communication
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          ref={sectionsRef.current.features}
          className="min-h-screen py-24 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-4xl font-bold text-white mb-6">
                Core Features
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Discover the powerful tools that make TrackBack unique
              </p>
            </div>

            {/* Mobile Features Grid */}
            <div className="md:hidden space-y-6">
              {platformFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 transform transition-all duration-300 active:scale-98 animate-on-scroll"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={clsx(
                        "w-14 h-14 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                        feature.color
                      )}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-blue-100 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Features Grid (unchanged) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative bg-gradient-to-br from-blue-600/10 to-blue-800/10 backdrop-blur-sm rounded-2xl p-8 hover:scale-105 transition-all duration-300 overflow-hidden border border-white/10 animate-on-scroll"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div
                      className={clsx(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300",
                        feature.color
                      )}
                    >
                      <feature.icon className="w-8 h-8 text-white transform transition-transform group-hover:scale-110" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100 group-hover:translate-x-1 transition-transform">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section
          id="dashboard"
          ref={sectionsRef.current.dashboard}
          className="py-16 px-4 bg-white/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl animate-float-delayed"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className="text-4xl font-bold text-white text-center mb-4">
                Powerful Dashboard
              </h2>
              <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
                Experience the future of athletic management
              </p>
            </div>

            {/* Mobile Version */}
            <div className="md:hidden">
              <div className="space-y-6">
                {dashboardFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 animate-on-scroll"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={clsx("p-3 rounded-xl", feature.color)}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-blue-100 mb-4">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {feature.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 rounded-lg p-3 text-sm text-blue-100 flex items-center gap-2"
                        >
                          <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Version */}
            <div className="hidden md:block">
              <div className="grid lg:grid-cols-5 gap-8 items-start">
                {/* Feature Navigation */}
                <div className="lg:col-span-2 space-y-4">
                  {dashboardFeatures.map((feature, index) => (
                    <button
                      key={feature.id}
                      onClick={() => setSelectedFeature(feature.id)}
                      className={clsx(
                        "w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:translate-x-1 group",
                        selectedFeature === feature.id
                          ? "bg-white/20 scale-105 shadow-xl"
                          : "bg-white/10 hover:bg-white/15"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={clsx(
                            "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
                            feature.color
                          )}
                        >
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1 transition-all duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-blue-100 transition-all duration-300">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Feature Preview */}
                <div className="lg:col-span-3">
                  <div className="transition-all duration-500 transform">
                    {selectedFeature === "athletes" && (
                      <div className="dashboard-preview bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl mx-auto animate-scale-in">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 flex justify-between items-center animate-gradient-x">
                          <h2 className="text-sm font-semibold text-white animate-fade-in">
                            Manager Dashboard
                          </h2>
                          <div className="flex items-center gap-2">
                            <button className="bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded text-xs flex items-center gap-1 transition-all hover:scale-105 hover:shadow-lg">
                              <BarChart2 className="w-3.5 h-3.5 transition-transform group-hover:rotate-6" />
                              Stats
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded text-xs flex items-center gap-1 transition-all hover:scale-105 hover:shadow-lg">
                              <Activity className="w-3.5 h-3.5 transition-transform group-hover:rotate-6" />
                              Metrics
                            </button>
                            <div className="flex items-center bg-white/20 rounded-full px-2 py-1 hover:bg-white/30 transition-colors">
                              <User2 className="w-3.5 h-3.5 text-white" />
                              <span className="text-white text-xs ml-1">
                                Manager
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-3 space-y-3">
                          {/* Form Status Settings */}
                          <div
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:border-blue-200 transition-all hover:shadow-md animate-slide-up"
                            style={{ animationDelay: "0.1s" }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-1.5 rounded group transition-all hover:bg-blue-200 hover:rotate-12">
                                  <Calendar className="w-4 h-4 text-blue-600 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900">
                                  Form Status
                                </h3>
                              </div>
                              <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs font-medium animate-pulse">
                                Closed
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="transform transition-all hover:scale-102">
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Open
                                </label>
                                <input
                                  type="time"
                                  defaultValue="00:00"
                                  className="w-full px-2 py-1 border rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                              </div>
                              <div className="transform transition-all hover:scale-102">
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Close
                                </label>
                                <input
                                  type="time"
                                  defaultValue="00:00"
                                  className="w-full px-2 py-1 border rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Athletes Section */}
                          <div
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:border-blue-200 transition-all hover:shadow-md animate-slide-up"
                            style={{ animationDelay: "0.2s" }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-1.5 rounded group transition-all hover:bg-blue-200 hover:rotate-12">
                                  <Users className="w-4 h-4 text-blue-600 transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900">
                                  Athletes
                                </h3>
                              </div>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1 transition-all hover:scale-105 hover:shadow-lg group">
                                <UserPlus className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
                                <span>Invite</span>
                              </button>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-gray-100">
                                    <th className="text-left py-1.5 text-xs font-medium text-gray-500">
                                      NAME
                                    </th>
                                    <th className="text-left py-1.5 text-xs font-medium text-gray-500">
                                      EMAIL
                                    </th>
                                    <th className="text-right py-1.5 text-xs font-medium text-gray-500">
                                      ACTIONS
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td
                                      className="py-2 text-gray-500 text-center text-xs animate-pulse"
                                      colSpan={3}
                                    >
                                      No athletes found
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Pending Invitations */}
                          <div
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:border-blue-200 transition-all hover:shadow-md animate-slide-up"
                            style={{ animationDelay: "0.3s" }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="bg-blue-100 p-1.5 rounded group transition-all hover:bg-blue-200 hover:rotate-12">
                                <Users className="w-4 h-4 text-blue-600 transition-transform group-hover:scale-110" />
                              </div>
                              <h3 className="text-sm font-medium text-gray-900">
                                Pending Invitations
                              </h3>
                            </div>
                            <div className="text-center text-gray-500 text-xs py-2 animate-pulse">
                              No pending invitations
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedFeature === "analytics" && (
                      <div className="dashboard-preview bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl mx-auto">
                        {/* Header with blue-purple gradient */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button className="text-white hover:text-white/80 text-xs flex items-center gap-1">
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Back to Dashboard</span>
                            </button>
                            <h2 className="text-sm font-semibold text-white">
                              Performance Statistics
                            </h2>
                          </div>
                          <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                            <User2 className="w-3.5 h-3.5 text-white mr-1" />
                            <span className="text-white text-xs">
                              Manager Name
                            </span>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-3 space-y-3">
                          {/* Week Navigation */}
                          <div className="flex justify-between items-center text-xs px-1">
                            <button className="flex items-center gap-1 text-gray-600">
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Previous Week</span>
                            </button>
                            <span className="font-medium">
                              April 14 - April 20, 2025
                            </span>
                            <button className="flex items-center gap-1 text-gray-600">
                              <span>Next Week</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* RPE Table */}
                          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-red-600 text-white text-center py-2">
                              <h3 className="text-sm font-semibold">
                                RATE OF PERCEIVED EXERTION (RPE) WEEK
                              </h3>
                            </div>
                            <div className="p-2">
                              <table className="min-w-full">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-1.5 px-2 text-[11px] font-medium text-gray-500">
                                      DAY
                                    </th>
                                    <th className="text-left py-1.5 px-2 text-[11px] font-medium text-gray-500">
                                      AM/PM
                                    </th>
                                    <th className="text-left py-1.5 px-2 text-[11px] font-medium text-gray-500">
                                      TYPE OF SESSION
                                    </th>
                                    <th className="text-left py-1.5 px-2 text-[11px] font-medium text-gray-500">
                                      RPE (1-10)
                                    </th>
                                    <th className="text-left py-1.5 px-2 text-[11px] font-medium text-gray-500">
                                      DURATION (MIN)
                                    </th>
                                    <th className="text-left py-1.5 px-2 text-[11px] font-medium text-gray-500">
                                      UNIT LOAD
                                    </th>
                                    <th className="text-right py-1.5 px-2 text-[11px] font-medium text-gray-500">
                                      DAILY LOAD
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-xs">
                                  {[
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                  ].map((day) => (
                                    <>
                                      <tr key={`${day}-AM`}>
                                        <td className="py-2 px-2 font-medium">
                                          {day}
                                        </td>
                                        <td className="py-2 px-2">AM</td>
                                        <td className="py-2 px-2"></td>
                                        <td className="py-2 px-2"></td>
                                        <td className="py-2 px-2"></td>
                                        <td className="py-2 px-2"></td>
                                        <td className="py-2 px-2 text-right">
                                          0
                                        </td>
                                      </tr>
                                      <tr key={`${day}-PM`}>
                                        <td className="py-2 px-2"></td>
                                        <td className="py-2 px-2">PM</td>
                                        <td className="py-2 px-2"></td>
                                        <td className="py-2 px-2"></td>
                                        <td className="py-2 px-2"></td>
                                        <td className="py-2 px-2"></td>
                                        <td className="py-2 px-2"></td>
                                      </tr>
                                    </>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedFeature === "insights" && (
                      <div className="dashboard-preview bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button className="text-white hover:text-white/80 text-xs flex items-center gap-1">
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Back to Dashboard</span>
                            </button>
                            <h2 className="text-sm font-semibold text-white">
                              Smart Insights
                            </h2>
                          </div>
                          <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                            <User2 className="w-3.5 h-3.5 text-white mr-1" />
                            <span className="text-white text-xs">
                              Manager Name
                            </span>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-3">
                          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 shadow-sm border border-blue-100">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Brain className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                  <h3 className="text-sm font-semibold text-gray-900">
                                    Athlete Name
                                  </h3>
                                  <span className="px-2 py-0.5 bg-blue-100 rounded-full text-xs font-medium text-blue-700">
                                    Performance
                                  </span>
                                </div>

                                <div className="space-y-3">
                                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                                    <div className="flex items-start gap-2">
                                      <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                                      <div>
                                        <p className="text-xs font-medium text-gray-900 mb-1">
                                          Performance Trend
                                        </p>
                                        <p className="text-xs text-gray-600">
                                          Mixed performance metrics with lower
                                          motivation and recovery indicators
                                          compared to baseline.
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                                    <div className="flex items-start gap-2">
                                      <Battery className="w-4 h-4 text-blue-600 mt-0.5" />
                                      <div>
                                        <p className="text-xs font-medium text-gray-900 mb-1">
                                          Recovery Status
                                        </p>
                                        <p className="text-xs text-gray-600">
                                          Elevated stress levels detected. Focus
                                          on rest and recovery recommended.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3 flex items-center justify-end gap-2">
                                  <button className="px-3 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-800">
                                    View Details
                                  </button>
                                  <button className="px-3 py-1.5 bg-blue-600 text-xs font-medium text-white rounded-lg hover:bg-blue-700">
                                    Take Action
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          ref={sectionsRef.current.pricing}
          className="py-12 sm:py-24 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-8 sm:mb-12 animate-on-scroll">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
                Choose the plan that best fits your team's needs
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center mt-6 gap-3">
                <span className="text-sm text-blue-100">Monthly</span>
                <button
                  onClick={() =>
                    setBillingPeriod((prev) =>
                      prev === "monthly" ? "yearly" : "monthly"
                    )
                  }
                  className={clsx(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    billingPeriod === "yearly" ? "bg-blue-500" : "bg-white/20"
                  )}
                >
                  <span
                    className={clsx(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      billingPeriod === "yearly"
                        ? "translate-x-6"
                        : "translate-x-1"
                    )}
                  />
                </button>
                <span className="text-sm text-blue-100">
                  Yearly <span className="text-blue-300">(Save ~20%)</span>
                </span>
              </div>
            </div>

            {/* Mobile Pricing Cards (Horizontal Scroll) */}
            <div className="md:hidden relative">
              {/* Add scroll indicator text */}
              <div className="text-center mb-4">
                <p className="text-blue-100 text-sm flex items-center justify-center gap-2">
                  <ChevronLeft className="w-4 h-4 animate-bounce-x" />
                  Scroll to see more plans
                  <ChevronRight className="w-4 h-4 animate-bounce-x" />
                </p>
              </div>

              <div
                className="overflow-x-auto hide-scrollbar snap-x snap-mandatory flex gap-4 pb-6 -mx-4 px-4"
                onScroll={handlePricingScroll}
              >
                {pricingPlans.map((plan, index) => (
                  <div
                    key={plan.name}
                    className={clsx(
                      "flex-shrink-0 w-[85%] snap-center bg-white/10 backdrop-blur-lg rounded-xl p-5 transform transition-all duration-700 relative pricing-card",
                      plan.popular && "ring-2 ring-blue-400"
                    )}
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center mb-4">
                        <span className="text-lg text-blue-200 mr-1">€</span>
                        <span className="text-3xl font-bold text-white">
                          {billingPeriod === "monthly"
                            ? plan.monthlyPrice
                            : plan.yearlyPrice}
                        </span>
                        <span className="text-blue-200 ml-2">
                          /{billingPeriod === "monthly" ? "month" : "year"}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-blue-100 text-sm"
                        >
                          <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => navigate("/register")}
                      className={clsx(
                        "w-full py-2.5 rounded-lg font-medium transition-all active:scale-95",
                        plan.popular
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-white/10 text-white hover:bg-white/20"
                      )}
                    >
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>

              {/* Scroll Indicator Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {pricingPlans.map((_, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "h-2 rounded-full transition-all duration-300",
                      activeCard === index
                        ? "w-6 bg-blue-500"
                        : "w-2 bg-white/20"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Add mobile-specific styles */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                /* Hide scrollbar but keep functionality */
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }

                /* Smooth snap scrolling */
                .snap-x {
                  scroll-snap-type: x mandatory;
                  -webkit-overflow-scrolling: touch;
                  scroll-behavior: smooth;
                }

                .snap-center {
                  scroll-snap-align: center;
                }

                /* Enhanced card animations */
                @media (max-width: 768px) {
                  .pricing-card {
                    transform: scale(0.95);
                    opacity: 0.8;
                    transition: all 0.3s ease;
                  }

                  .pricing-card.active {
                    transform: scale(1);
                    opacity: 1;
                  }

                  /* Add parallax effect */
                  .pricing-card {
                    perspective: 1000px;
                  }

                  .pricing-card:hover {
                    transform: translateZ(20px);
                  }

                  /* Smooth animations */
                  .animate-card-in {
                    animation: cardIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                  }

                  @keyframes cardIn {
                    from {
                      opacity: 0;
                      transform: translateX(50px) scale(0.9);
                    }
                    to {
                      opacity: 1;
                      transform: translateX(0) scale(1);
                    }
                  }

                  /* Add bounce animation for scroll indicators */
                  @keyframes bounceX {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(3px); }
                  }

                  .animate-bounce-x {
                    animation: bounceX 1s infinite;
                  }
                }
              `,
              }}
            />

            {/* Desktop Pricing Cards (Grid) */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 stagger-animate">
              {pricingPlans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={clsx(
                    "bg-white/10 backdrop-blur-lg rounded-xl p-5 sm:p-6 transform transition-all duration-700 hover:scale-105 relative animate-on-scroll",
                    plan.popular && "ring-2 ring-blue-400"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-lg text-blue-200 mr-1">€</span>
                      <span className="text-3xl font-bold text-white">
                        {billingPeriod === "monthly"
                          ? plan.monthlyPrice
                          : plan.yearlyPrice}
                      </span>
                      <span className="text-blue-200 ml-2">
                        /{billingPeriod === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-blue-100 text-sm"
                      >
                        <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate("/register")}
                    className={clsx(
                      "w-full py-2.5 rounded-lg font-medium transition-all active:scale-95",
                      plan.popular
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section
          id="contact"
          ref={sectionsRef.current.contact}
          className="py-24 bg-white/5 backdrop-blur-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Athletic Program?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Get in touch with us to learn how TrackBack can help you
                  achieve your athletic goals.
                </p>
                <div className="space-y-4 stagger-animate">
                  <div className="flex items-center gap-4 text-blue-100">
                    <Mail className="w-6 h-6" />
                    <span>martinsfrancisco2005@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-blue-100">
                    <Globe className="w-6 h-6" />
                    <span>www.trackback.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 animate-on-scroll">
                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-6 stagger-animate"
                >
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      defaultValue={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      defaultValue={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  {formStatus.message && (
                    <div
                      className={clsx(
                        "p-3 rounded-lg text-sm",
                        formStatus.type === "error" &&
                          "bg-red-500/20 text-red-100",
                        formStatus.type === "success" &&
                          "bg-green-500/20 text-green-100",
                        formStatus.type === "loading" &&
                          "bg-blue-500/20 text-blue-100"
                      )}
                    >
                      {formStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus.type === "loading"}
                    className={clsx(
                      "w-full py-3 bg-blue-500 text-white rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2",
                      formStatus.type === "loading"
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:bg-blue-600"
                    )}
                  >
                    {formStatus.type === "loading" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 stagger-animate">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  TrackBack
                </h3>
                <p className="text-blue-100">
                  Advanced analytics and professional training management for
                  elite teams and athletes
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Contact
                </h3>
                <p className="text-blue-100">
                  Email: martinsfrancisco2005@gmail.com
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Legal</h3>
                <div className="space-y-2">
                  <Link
                    to="/privacy-policy"
                    className="block text-blue-100 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/terms-of-service"
                    className="block text-blue-100 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center text-blue-100 border-t border-white/10 pt-8 animate-on-scroll">
              <p>
                © {new Date().getFullYear()} TrackBack. Developed by Francisco
                Martins. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Global Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 640px) {
          .bg-gradient-to-br {
            background: linear-gradient(
              to bottom right,
              rgb(37, 99, 235) 0%,
              rgb(29, 78, 216) 50%,
              rgb(30, 64, 175) 100%
            ) !important;
          }

          section {
            min-height: auto !important;
            padding: 3rem 0 !important;
          }

          .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: flex-start;
            padding-top: 5rem;
          }

          .hero-section::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(165deg, 
              rgba(37, 99, 235, 0.98) 0%,
              rgba(29, 78, 216, 0.98) 40%,
              rgba(30, 64, 175, 0.98) 100%
            );
            z-index: 1;
          }

          .hero-content {
            position: relative;
            z-index: 2;
            padding: 1.5rem;
          }

          h1 {
            font-size: 2.75rem !important;
            line-height: 1.2 !important;
            margin-bottom: 1.5rem !important;
          }

          p {
            font-size: 1.125rem !important;
            line-height: 1.6 !important;
            margin-bottom: 2rem !important;
          }

          .mobile-buttons {
            gap: 1rem;
            width: 100%;
          }

          .mobile-buttons button {
            width: 100%;
            padding: 1rem !important;
          }

          #pricing {
            padding: 3rem 1rem !important;
          }

          #pricing .grid {
            gap: 1.5rem !important;
            padding: 0 0.5rem;
          }

          #pricing .bg-white\\/10 {
            width: 100%;
            margin: 0 auto;
          }

          .section-spacing {
            margin-bottom: 2rem !important;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
          animation-delay: 3s;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .feature-preview-enter {
          opacity: 0;
          transform: translateX(20px);
        }

        .feature-preview-enter-active {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 300ms, transform 300ms;
        }

        .feature-preview-exit {
          opacity: 1;
          transform: translateX(0);
        }

        .feature-preview-exit-active {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 300ms, transform 300ms;
        }

        @media (max-width: 768px) {
          .hover-scale {
            transition: transform 0.3s ease;
          }
          .hover-scale:active {
            transform: scale(0.95);
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-slide-in {
            animation: slideIn 0.5s ease forwards;
          }
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 15s ease infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        .hover\\:rotate-12:hover {
          transform: rotate(12deg);
        }

        /* Add smooth transitions */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        /* Enhance focus states */
        .focus\\:ring-2:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }

        /* Add hover animations for buttons */
        button {
          transform-origin: center;
        }

        .group:hover .group-hover\\:rotate-12 {
          transform: rotate(12deg);
        }

        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .feature-card {
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        @keyframes height-increase {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }

        .animate-height-increase {
          animation: height-increase 3s ease-in-out infinite;
        }

        @keyframes circle-progress {
          0% { clip-path: polygon(50% 50%, 50% 0%, 50% 0%, 50% 0%); }
          25% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%); }
          50% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%); }
          75% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%); }
          100% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .group:hover .animate-pulse-slow {
          animation-duration: 1.5s;
          opacity: 0.4;
        }

        @keyframes height-chart {
          0% { height: 0; }
          100% { height: var(--target-height); }
        }

        .animate-height-chart {
          --target-height: var(--h);
          animation: height-chart 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        @keyframes circle-progress {
          from { stroke-dashoffset: 364.4; }
          to { stroke-dashoffset: 91.1; }
        }

        .animate-circle-progress {
          animation: circle-progress 2s ease-out forwards;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Add transition to all interactive elements */
        button, a {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhance hover effects */
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-5px);
        }

        /* Add smooth transitions to background effects */
        .bg-gradient-animate {
          background-size: 200% 200%;
          animation: gradientMove 15s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Add stagger effect for lists */
        .stagger-animate > * {
          opacity: 0;
          transform: translateY(10px);
          animation: staggerFade 0.5s ease forwards;
        }

        .stagger-animate > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger-animate > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger-animate > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger-animate > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger-animate > *:nth-child(5) { animation-delay: 0.5s; }

        @keyframes staggerFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Smooth transition for section changes */
        section {
          transition: opacity 0.5s ease;
        }

        /* Enhanced scroll behavior */
        .smooth-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        /* Enhanced stagger animation for benefits */
        .stagger-animate > li {
          opacity: 0;
          transform: translateX(-10px);
        }

        .animate-in .stagger-animate > li {
          animation: slideInRight 0.5s ease forwards;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Smooth gradient animation */
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientPosition 15s ease infinite;
        }

        @keyframes gradientPosition {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Enhanced hover effects */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .group:hover .group-hover\\:rotate-3 {
          transform: rotate(3deg);
        }

        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }

        /* Smooth backdrop blur transition */
        .backdrop-blur-lg {
          transition: backdrop-filter 0.3s ease;
        }

        .group:hover .backdrop-blur-lg {
          backdrop-filter: blur(20px);
        }

        /* Enhanced scale-in animation */
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Smooth feature transitions */
        .feature-transition {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced float animations */
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }

        /* Dashboard preview transitions */
        .dashboard-preview {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dashboard-preview:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Enhanced button interactions */
        button.group {
          transform-origin: center left;
          will-change: transform, background-color;
        }

        button.group:active {
          transform: scale(0.98);
        }

        .group-hover\\:scale-110 {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth preview transitions */
        .dashboard-preview {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dashboard-preview.animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Ensure content visibility */
        .opacity-100 {
          opacity: 1 !important;
        }

        .visible {
          visibility: visible !important;
        }

        /* Smooth state transitions */
        .transition-transform {
          transition-property: transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }

        .transition-opacity {
          transition-property: opacity;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }

        /* Mobile-specific animations */
        @media (max-width: 768px) {
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
          }

          .active\\:scale-98:active {
            transform: scale(0.98);
          }

          /* Enhanced card styling */
          .group {
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                       0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .group:active {
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1),
                       0 1px 2px -1px rgba(0, 0, 0, 0.06);
          }

          /* Smooth icon transitions */
          .group-hover\\:scale-110 {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .group-hover\\:rotate-3 {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Enhanced text transitions */
          .group-hover\\:translate-x-1 {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Improved backdrop blur */
          .backdrop-blur-lg {
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }
        }
      `,
        }}
      />
    </div>
  );
}
