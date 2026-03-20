"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function BackgroundScene() {
  const threeMountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountNode = threeMountRef.current;
    if (!mountNode) return;

    // --- Basic Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true // Enable transparency
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Set background to transparent
    
    // Style and mount the canvas
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1'; // Place it behind all content
    renderer.domElement.style.pointerEvents = 'none'; // Allow clicking through the canvas
    mountNode.appendChild(renderer.domElement);

    // --- Theme-Aware Grid ---
    const getThemeColor = () => {
      const root = document.documentElement;
      const isDark = root.getAttribute('data-theme') === 'dark';
      return isDark ? '#ffffff' : '#000000';
    };
    
    const gridHelper = new THREE.GridHelper(30, 30, getThemeColor(), getThemeColor());
    gridHelper.position.y = -2;
    gridHelper.material.opacity = 0.1;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Update grid color automatically on theme change.
    const themeObserver = new MutationObserver(() => {
      const color = getThemeColor();
      gridHelper.material.color.set(color);
      (particlesMaterial as any).color.set(color);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    // --- Floating Particles ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: getThemeColor(),
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // --- Mouse Interaction ---
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = mouse.y * 0.1;
      particlesMesh.rotation.y += mouse.x * 0.1;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    // Start animation loop
    let animationFrameId: number;
    const startAnimation = () => {
      animate();
      animationFrameId = requestAnimationFrame(startAnimation);
    };
    startAnimation();

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup Logic ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      themeObserver.disconnect();
      mountNode.removeChild(renderer.domElement);
      
      // Dispose of Three.js objects to prevent memory leaks
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      gridHelper.geometry.dispose();
      gridHelper.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={threeMountRef} aria-hidden="true" />;
}
