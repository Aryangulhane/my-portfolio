"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import Link from 'next/link';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import ParticleBackground from '@/components/ParticleBackground';
import TechStack from '@/components/TechStack';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Optimize scroll animations with better spring configuration
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });
  
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Add smooth scroll behavior
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollBehavior = '';
    };
  }, []);

  // Update background color based on theme
  useEffect(() => {
    const updateBackgroundColor = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      const backgroundColor = rootStyle.getPropertyValue('--background').trim();
      document.body.style.backgroundColor = backgroundColor;
    };

    // Update background color on theme change
    const observer = new MutationObserver(updateBackgroundColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Initial background color setup
    updateBackgroundColor();

    return () => {
      observer.disconnect();
    };
  }, []);

  // 3D Background Setup
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Make scene background transparent
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent
    containerRef.current.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.opacity = '0.3'; // Make the entire scene more transparent

    // Camera position
    camera.position.z = 5;

    // Add grid with enhanced visibility
    const gridSize = 30;
    const gridDivisions = 30;
    
    // Get theme color from CSS variables
    const getThemeColor = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue('--accent').trim() || '#6366f1';
    };

    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, getThemeColor(), getThemeColor());
    gridHelper.position.y = -2;
    gridHelper.material.opacity = 0.1; // Reduced opacity
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Update grid color on theme change
    const observer = new MutationObserver(() => {
      const newColor = getThemeColor();
      gridHelper.material.color.set(newColor);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = .05;
    controls.enableZoom = false;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000; // Reduced particle count
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01, // Smaller particles
      color: getThemeColor(),
      transparent: true,
      opacity: 0.3, // Reduced opacity
      blending: THREE.AdditiveBlending,
    });

    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse movement effect
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let mouseX = 0;
    let mouseY = 0;

    // Create shadow plane
    const shadowPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2);
    const shadowGeometry = new THREE.CircleGeometry(0.5, 32);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      color: getThemeColor(),
      transparent: true,
      opacity: 0.1, // Reduced opacity
      side: THREE.DoubleSide
    });
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.visible = false;
    scene.add(shadow);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      mouseX = mouse.x;
      mouseY = mouse.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update raycaster
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.ray.intersectPlane(shadowPlane, new THREE.Vector3());
      
      if (intersects) {
        shadow.position.copy(intersects);
        shadow.visible = true;
      } else {
        shadow.visible = false;
      }

      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;

      // Mouse interaction
      particlesMesh.rotation.x += mouseY * 0.0005;
      particlesMesh.rotation.y += mouseX * 0.0005;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      containerRef.current?.removeChild(renderer.domElement);
      scene.remove(particlesMesh);
      scene.remove(gridHelper);
      scene.remove(shadow);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      shadowGeometry.dispose();
      shadowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Optimize floating planets animation
  const floatingPlanetVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.5, 1]
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Theme Background - Base layer */}
      <div className="fixed inset-0 bg-background" style={{ zIndex: -3 }} />

      {/* Enhanced Particle Background with reduced particles */}
      <ParticleBackground />

      {/* Space Background Elements */}
      <div className="fixed inset-0" style={{ zIndex: -2 }}>
        {/* Stars Background - Optimized gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/30 via-background/20 to-background/10" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 50% 50%, var(--accent) 50%, transparent 100%)`,
            backgroundSize: '200px 200px',
            willChange: 'transform'
          }} 
        />
        
        {/* Floating Planets - Optimized animations */}
        <motion.div
          variants={floatingPlanetVariants}
          animate="animate"
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-xl"
          style={{ willChange: 'transform' }}
        />
        <motion.div
          variants={floatingPlanetVariants}
          animate="animate"
          className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-xl"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Main Content with optimized parallax */}
      <motion.div 
        style={{ y, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {/* Hero Section with Optimized Layout */}
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="text-left z-10 flex-1">
              {/* Optimized Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 relative"
              >
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text cyber-text relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span
                    className="absolute -inset-1 bg-accent/20 rounded-lg blur-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                  />
                  Welcome to My Portfolio
                </motion.h1>

                {/* Optimized Name Introduction */}
                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl font-mono text-accent relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span 
                      className="text-primary"
                      animate={{
                        opacity: [1, 0.5, 1],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.5, 1]
                      }}
                    >
                      $
                    </motion.span>
                    <TypeAnimation
                      sequence={[
                        '> Hi, I\'m Aryan',
                        1000,
                        '> Aryan.exe',
                        1000,
                        '> Aryan.v1.0',
                        1000,
                        '> Aryan.sys',
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                      className="ml-2"
                    />
                  </motion.div>
                </motion.div>

                {/* Optimized CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-4 mt-8"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-lg bg-accent hover:bg-accent/80 transition-all duration-300 font-mono border border-accent/50 relative overflow-hidden group"
                    onClick={() => scrollToSection('projects')}
                  >
                    <span className="relative z-10">$ View Projects</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-lg border border-accent hover:bg-accent/10 transition-all duration-300 font-mono relative overflow-hidden group"
                    onClick={() => scrollToSection('contact')}
                  >
                    <span className="relative z-10">$ Contact Me</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Optimized Profile Picture */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex-1 flex justify-center items-center"
            >
              {/* Profile Picture Container */}
              <motion.div 
                className="relative w-72 h-72 md:w-96 md:h-96 mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Optimized Orbital Paths */}
                <div className="absolute inset-0 rounded-full border border-accent/10" style={{ transform: 'scale(1.5)' }} />
                <div className="absolute inset-0 rounded-full border border-accent/10" style={{ transform: 'scale(2)' }} />
                <div className="absolute inset-0 rounded-full border border-accent/10" style={{ transform: 'scale(2.5)' }} />
                <div className="absolute inset-0 rounded-full border border-accent/10" style={{ transform: 'scale(3)' }} />

                {/* Optimized Profile Picture */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-accent/50 group">
                  <Image
                    src="/profile.jpg"
                    alt="Profile Picture"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Optimized Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 gradient-text cyber-text"
          >
            Technical Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Frontend Development', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
              { title: 'UI/UX Design', skills: ['Figma', 'Adobe XD', 'Responsive Design', 'Animation'] },
              { title: 'Backend Integration', skills: ['Node.js', 'REST APIs', 'GraphQL', 'Firebase'] }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 rounded-lg backdrop-blur-lg border border-accent/20"
              >
                <h3 className="text-2xl font-semibold mb-4 text-accent font-mono">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm font-mono border border-accent/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Optimized Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 gradient-text cyber-text"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((project) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-lg overflow-hidden backdrop-blur-lg group border border-accent/20"
              >
                <div className="aspect-video bg-accent/20 relative overflow-hidden" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors font-mono">
                    Project Title
                  </h3>
                  <p className="text-text/80 mb-4 font-mono">
                    A brief description of the project and its key features.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm font-mono border border-accent/20">
                      React
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm font-mono border border-accent/20">
                      Next.js
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}