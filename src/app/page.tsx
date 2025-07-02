"use client";
import React, { useState, useEffect } from "react";
import {
  Upload,
  FolderPlus,
  Star,
  Trash2,
  Shield,
  Zap,
  Users,
  Cloud,
  Menu,
  X,
  Check,
  ArrowRight,
  FileText,
  Image,
  Video,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";

const DropBuddyLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  const features = [
    {
      icon: Upload,
      title: "Easy File Upload",
      description:
        "Drag and drop files effortlessly. Support for all file types with lightning-fast upload speeds.",
    },
    {
      icon: FolderPlus,
      title: "Smart Organization",
      description:
        "Create folders and organize your files with our intuitive folder management system.",
    },
    {
      icon: Star,
      title: "Favorite & Star",
      description:
        "Mark important files with stars for quick access. Never lose track of your essential documents.",
    },
    {
      icon: Trash2,
      title: "Safe Deletion",
      description:
        "Move files to trash with confidence. Easily restore or permanently delete when needed.",
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description:
        "Enterprise-grade security with end-to-end encryption to keep your files safe and private.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized performance ensures quick file operations and seamless user experience.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      content:
        "DropBuddy has revolutionized how our team manages creative assets. The organization features are incredible!",
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      role: "Software Engineer",
      content:
        "As a developer, I appreciate the clean interface and robust file management. It's become essential to my workflow.",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Project Manager",
      content:
        "The ability to star important files and organize everything in folders has made project management so much easier.",
      avatar: "ER",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "5GB Storage",
        "Basic File Management",
        "Mobile Access",
        "Email Support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$9",
      period: "month",
      features: [
        "100GB Storage",
        "Advanced Organization",
        "Priority Support",
        "Team Collaboration",
        "File Versioning",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "month",
      features: [
        "Unlimited Storage",
        "Advanced Security",
        "24/7 Support",
        "Custom Integrations",
        "Admin Dashboard",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">📁</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DropBuddy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Pricing
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-2 space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="block text-gray-700 hover:text-blue-600 py-2 w-full text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block text-gray-700 hover:text-blue-600 py-2 w-full text-left"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block text-gray-700 hover:text-blue-600 py-2 w-full text-left"
              >
                Pricing
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Ultimate
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                File Management
              </span>
              Solution
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload, organize, star, and manage your files with ease. DropBuddy
              provides a seamless experience for all your file management needs
              with powerful features and intuitive design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                Start Managing Files
                <ArrowRight size={20} />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg flex items-center gap-3">
                  <FileText className="text-blue-600" size={24} />
                  <div>
                    <div className="font-semibold text-sm">Documents</div>
                    <div className="text-xs text-gray-600">45 files</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-lg flex items-center gap-3">
                  <Image className="text-purple-600" size={24} />
                  <div>
                    <div className="font-semibold text-sm">Images</div>
                    <div className="text-xs text-gray-600">128 files</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg flex items-center gap-3">
                  <Video className="text-green-600" size={24} />
                  <div>
                    <div className="font-semibold text-sm">Videos</div>
                    <div className="text-xs text-gray-600">23 files</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for
              <span className="text-blue-600"> Modern File Management</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to organize, manage, and access your files
              efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by <span className="text-purple-600">Thousands</span> of
              Users
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about DropBuddy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative"
      >
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎉 Use DropBuddy Free Forever
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, <span className="text-purple-600">Transparent</span>{" "}
              Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your file management needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl blur-xs shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative ${
                  plan.popular ? "ring-2 ring-blue-600" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="text-green-500 mr-3" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105"
                      : "border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600"
                  }`}
                >
                  {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📁</span>
                </div>
                <span className="text-xl font-bold">DropBuddy</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The ultimate file management solution for individuals and teams.
                Organize, manage, and access your files with ease.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group"
                >
                  <Linkedin
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors group"
                >
                  <Github
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group"
                >
                  <Instagram
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 DropBuddy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DropBuddyLanding;
