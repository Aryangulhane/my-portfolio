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

    // --- Theme-Aware Colors ---
    const getThemeColors = () => {
      const root = document.documentElement;
      const isDark = root.getAttribute('data-theme') !== 'light';
      return {
        particle: isDark ? '#f97316' : '#ea580c',
        grid: isDark ? '#ffffff' : '#000000',
      };
    };
    
    const colors = getThemeColors();

    const gridHelper = new THREE.GridHelper(30, 30, colors.grid, colors.grid);
    gridHelper.position.y = -2;
    gridHelper.material.opacity = 0.07;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Update colors automatically on theme change.
    const themeObserver = new MutationObserver(() => {
      const c = getThemeColors();
      gridHelper.material.color.set(c.grid);
      (particlesMaterial as any).color.set(c.particle);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    // --- Floating Particles ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1200;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.012,
      color: colors.particle,
      transparent: true,
      opacity: 0.4,
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

    // --- Single Animation Loop (fixed: no more double RAF) ---
    const clock = new THREE.Clock();
    let animationFrameId: number;
    const loop = () => {
      animationFrameId = requestAnimationFrame(loop);
      const elapsedTime = clock.getElapsedTime();
      
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = mouse.y * 0.1;
      particlesMesh.rotation.y += mouse.x * 0.1;

      renderer.render(scene, camera);
    };
    loop();

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
