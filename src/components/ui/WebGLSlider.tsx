import React, { useEffect, useRef } from 'react';
import type { Texture } from 'three';
import type {
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';
import './webgl-slider.css';

let threeModulePromise: Promise<typeof import('three')> | null = null;
const getThree = () => {
  if (!threeModulePromise) {
    threeModulePromise = import('three');
  }
  return threeModulePromise;
};

export interface WebGLSliderSlide {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  accentColor: string;
  imageUrl: string;
}

interface WebGLSliderProps {
  slides: WebGLSliderSlide[];
  onSelectProject: (id: string) => void;
  playBeep?: (freq?: number) => void;
  autoplayDelay?: number;
  transitionDuration?: number;
}

const SLIDER_CONFIG: any = {
  settings: {
    transitionDuration: 1.8,
    autoSlideSpeed: 4500,
    currentEffect: 'glass',
    currentEffectPreset: 'Default',
    globalIntensity: 1.0,
    speedMultiplier: 1.0,
    distortionStrength: 1.0,
    colorEnhancement: 1.0,
    glassRefractionStrength: 1.0,
    glassChromaticAberration: 1.0,
    glassBubbleClarity: 1.0,
    glassEdgeGlow: 1.0,
    glassLiquidFlow: 1.0,
    frostIntensity: 1.5,
    frostCrystalSize: 1.0,
    frostIceCoverage: 1.0,
    frostTemperature: 1.0,
    frostTexture: 1.0,
    rippleFrequency: 25.0,
    rippleAmplitude: 0.08,
    rippleWaveSpeed: 1.0,
    rippleRippleCount: 1.0,
    rippleDecay: 1.0,
    plasmaIntensity: 1.2,
    plasmaSpeed: 0.8,
    plasmaEnergyIntensity: 0.4,
    plasmaContrastBoost: 0.3,
    plasmaTurbulence: 1.0,
    timeshiftDistortion: 1.6,
    timeshiftBlur: 1.5,
    timeshiftFlow: 1.4,
    timeshiftChromatic: 1.5,
    timeshiftTurbulence: 1.4,
  },
};

const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

const shaderPreamble = `
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      uniform float uProgress;
      uniform vec2 uResolution;
      uniform vec2 uTexture1Size;
      uniform vec2 uTexture2Size;
      uniform int uEffectType;
      
      // Global settings uniforms
      uniform float uGlobalIntensity;
      uniform float uSpeedMultiplier;
      uniform float uDistortionStrength;
      uniform float uColorEnhancement;
      
      // Glass uniforms
      uniform float uGlassRefractionStrength;
      uniform float uGlassChromaticAberration;
      uniform float uGlassBubbleClarity;
      uniform float uGlassEdgeGlow;
      uniform float uGlassLiquidFlow;
      
      // Frost uniforms
      uniform float uFrostIntensity;
      uniform float uFrostCrystalSize;
      uniform float uFrostIceCoverage;
      uniform float uFrostTemperature;
      uniform float uFrostTexture;
      
      // Ripple uniforms
      uniform float uRippleFrequency;
      uniform float uRippleAmplitude;
      uniform float uRippleWaveSpeed;
      uniform float uRippleRippleCount;
      uniform float uRippleDecay;
      
      // Plasma uniforms
      uniform float uPlasmaIntensity;
      uniform float uPlasmaSpeed;
      uniform float uPlasmaEnergyIntensity;
      uniform float uPlasmaContrastBoost;
      uniform float uPlasmaTurbulence;
      
      // Timeshift uniforms
      uniform float uTimeshiftDistortion;
      uniform float uTimeshiftBlur;
      uniform float uTimeshiftFlow;
      uniform float uTimeshiftChromatic;
      uniform float uTimeshiftTurbulence;
      
      varying vec2 vUv;

      vec2 getCoverUV(vec2 uv, vec2 textureSize) {
        vec2 s = uResolution / textureSize;
        float scale = max(s.x, s.y);
        vec2 scaledSize = textureSize * scale;
        vec2 offset = (uResolution - scaledSize) * 0.5;
        return (uv * uResolution - offset) / scaledSize;
      }

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        return mix(
          mix(noise(i), noise(i + vec2(1.0, 0.0)), f.x),
          mix(noise(i + vec2(0.0, 1.0)), noise(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }

      float rand(vec2 uv) {
        float a = dot(uv, vec2(92., 80.));
        float b = dot(uv, vec2(41., 62.));
        float x = sin(a) + cos(b) * 51.;
        return fract(x);
      }
    `;

const effectShaderBodies: Record<string, string> = {
  glass: `
      vec4 glassEffect(vec2 uv, float progress) {
        float glassStrength = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity;
        float chromaticAberration = 0.02 * uGlassChromaticAberration * uGlobalIntensity;
        float waveDistortion = 0.025 * uDistortionStrength;
        float clearCenterSize = 0.3 * uGlassBubbleClarity;
        float surfaceRipples = 0.004 * uDistortionStrength;
        float liquidFlow = 0.015 * uGlassLiquidFlow * uSpeedMultiplier;
        float rimLightWidth = 0.05;
        float glassEdgeWidth = 0.025;
        
        float brightnessPhase = smoothstep(0.8, 1.0, progress);
        float rimLightIntensity = 0.08 * (1.0 - brightnessPhase) * uGlassEdgeGlow * uGlobalIntensity;
        float glassEdgeOpacity = 0.06 * (1.0 - brightnessPhase) * uGlassEdgeGlow;

        vec2 center = vec2(0.5, 0.5);
        vec2 p = uv * uResolution;
        
        vec2 uv1 = getCoverUV(uv, uTexture1Size);
        vec2 uv2_base = getCoverUV(uv, uTexture2Size);
        
        float maxRadius = length(uResolution) * 0.85;
        float bubbleRadius = progress * maxRadius;
        vec2 sphereCenter = center * uResolution;
        
        float dist = length(p - sphereCenter);
        float normalizedDist = dist / max(bubbleRadius, 0.001);
        vec2 direction = (dist > 0.0) ? (p - sphereCenter) / dist : vec2(0.0);
        float inside = smoothstep(bubbleRadius + 3.0, bubbleRadius - 3.0, dist);
        
        float distanceFactor = smoothstep(clearCenterSize, 1.0, normalizedDist);
        float time = progress * 5.0 * uSpeedMultiplier;
        
        vec2 liquidSurface = vec2(
          smoothNoise(uv * 100.0 + time * 0.3),
          smoothNoise(uv * 100.0 + time * 0.2 + 50.0)
        ) - 0.5;
        liquidSurface *= surfaceRipples * distanceFactor;

        vec2 distortedUV = uv2_base;
        if (inside > 0.0) {
          float refractionOffset = glassStrength * pow(distanceFactor, 1.5);
          vec2 flowDirection = normalize(direction + vec2(sin(time), cos(time * 0.7)) * 0.3);
          distortedUV -= flowDirection * refractionOffset;

          float wave1 = sin(normalizedDist * 22.0 - time * 3.5);
          float wave2 = sin(normalizedDist * 35.0 + time * 2.8) * 0.7;
          float wave3 = sin(normalizedDist * 50.0 - time * 4.2) * 0.5;
          float combinedWave = (wave1 + wave2 + wave3) / 3.0;
          
          float waveOffset = combinedWave * waveDistortion * distanceFactor;
          distortedUV -= direction * waveOffset + liquidSurface;

          vec2 flowOffset = vec2(
            sin(time + normalizedDist * 10.0),
            cos(time * 0.8 + normalizedDist * 8.0)
          ) * liquidFlow * distanceFactor * inside;
          distortedUV += flowOffset;
        }

        vec4 newImg;
        if (inside > 0.0) {
          float aberrationOffset = chromaticAberration * pow(distanceFactor, 1.2);
          
          vec2 uv_r = distortedUV + direction * aberrationOffset * 1.2;
          vec2 uv_g = distortedUV + direction * aberrationOffset * 0.2;
          vec2 uv_b = distortedUV - direction * aberrationOffset * 0.8;

          float r = texture2D(uTexture2, uv_r).r;
          float g = texture2D(uTexture2, uv_g).g;
          float b = texture2D(uTexture2, uv_b).b;
          newImg = vec4(r, g, b, 1.0);
        } else {
          newImg = texture2D(uTexture2, uv2_base);
        }

        if (inside > 0.0 && rimLightIntensity > 0.0) {
          float rim = smoothstep(1.0 - rimLightWidth, 1.0, normalizedDist) *
                      (1.0 - smoothstep(1.0, 1.01, normalizedDist));
          newImg.rgb += rim * rimLightIntensity;

          float edge = smoothstep(1.0 - glassEdgeWidth, 1.0, normalizedDist) *
                       (1.0 - smoothstep(1.0, 1.01, normalizedDist));
          newImg.rgb = mix(newImg.rgb, vec3(1.0), edge * glassEdgeOpacity);
        }
        
        newImg.rgb = mix(newImg.rgb, newImg.rgb * 1.2, (uColorEnhancement - 1.0) * 0.5);
        
        vec4 currentImg = texture2D(uTexture1, uv1);
        
        if (progress > 0.95) {
          vec4 pureNewImg = texture2D(uTexture2, uv2_base);
          float endTransition = (progress - 0.95) / 0.05;
          newImg = mix(newImg, pureNewImg, endTransition);
        }
        
        return mix(currentImg, newImg, inside);
      }
    `,
  frost: `
      vec4 frostEffect(vec2 uv, float progress) {
        vec4 currentImg = texture2D(uTexture1, getCoverUV(uv, uTexture1Size));
        vec4 newImg = texture2D(uTexture2, getCoverUV(uv, uTexture2Size));
        
        float effectiveIntensity = uFrostIntensity * uGlobalIntensity;
        float crystalScale = 80.0 / uFrostCrystalSize;
        float iceScale = 40.0 / uFrostCrystalSize;
        float temperatureEffect = uFrostTemperature;
        
        float frost1 = smoothNoise(uv * crystalScale * uFrostTexture);
        float frost2 = smoothNoise(uv * iceScale + 50.0) * 0.7;
        float frost3 = smoothNoise(uv * (crystalScale * 2.0) + 100.0) * 0.3;
        float frost = (frost1 + frost2 + frost3) / 2.0;
        
        float icespread = smoothNoise(uv * 25.0 / uFrostCrystalSize + 200.0);
        
        vec2 rnd = vec2(
          rand(uv + frost * 0.1), 
          rand(uv + frost * 0.1 + 0.5)
        );
        
        float clampedIceCoverage = clamp(uFrostIceCoverage, 0.1, 2.5);
        float size = mix(progress, sqrt(progress), 0.5) * 1.12 * clampedIceCoverage + 0.0000001;
        
        float lensY = clamp(pow(size, clamp(4.0, 1.5, 6.0)) / 2.0, size * 0.1, size * 8.0);
        vec2 lens = vec2(size, lensY);
        
        float dist = distance(uv, vec2(0.5, 0.5));
        float vignette = pow(1.0 - smoothstep(lens.x, lens.y, dist), 2.0);
        
        float frostyness = 0.8 * effectiveIntensity * uDistortionStrength;
        rnd *= frost * vignette * frostyness * (1.0 - floor(vignette));
        
        vec4 regular = newImg;
        vec4 frozen = texture2D(uTexture2, getCoverUV(uv + rnd * 0.06, uTexture2Size));
        
        float tempShift = clamp(temperatureEffect * 0.15, 0.0, 0.3);
        frozen *= vec4(
          clamp(0.85 + tempShift, 0.7, 1.2),
          clamp(0.9, 0.8, 1.0),
          clamp(1.2 - tempShift, 0.8, 1.3),
          1.0
        );
        float tempMixStrength = clamp(0.1 * temperatureEffect, 0.0, 0.25);
        frozen = mix(frozen, vec4(0.9, 0.95, 1.1, 1.0), tempMixStrength);
        
        float frostMask = smoothstep(icespread * 0.8, 1.0, pow(vignette, 1.5));
        vec4 frostResult = mix(frozen, regular, frostMask);
        
        float transitionStart = mix(0.85, 0.7, clamp(effectiveIntensity - 1.0, 0.0, 1.0));
        float colorTransition = smoothstep(transitionStart, 1.0, progress);
        vec4 finalFrost = mix(frostResult, regular, colorTransition);
        
        finalFrost.rgb = mix(finalFrost.rgb, finalFrost.rgb * 1.2, (uColorEnhancement - 1.0) * 0.5);
        
        float overallBlend = smoothstep(0.0, 1.0, progress);
        
        if (progress > 0.95) {
          float endTransition = (progress - 0.95) / 0.05;
          finalFrost = mix(finalFrost, newImg, endTransition * 0.5);
        }
        
        return mix(currentImg, finalFrost, overallBlend);
      }
    `,
  ripple: `
      vec4 rippleEffect(vec2 uv, float progress) {
        vec4 currentImg = texture2D(uTexture1, getCoverUV(uv, uTexture1Size));
        vec4 newImg = texture2D(uTexture2, getCoverUV(uv, uTexture2Size));
        
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(uv, center);
        float maxDist = 0.8;
        
        float effectiveSpeed = uRippleWaveSpeed * uSpeedMultiplier;
        float effectiveAmplitude = uRippleAmplitude * uDistortionStrength * uGlobalIntensity;
        float effectiveDecay = uRippleDecay;
        
        float waveRadius = progress * maxDist * 1.5 * effectiveSpeed;
        
        float ripple1 = sin((dist - waveRadius) * uRippleFrequency) * exp(-abs(dist - waveRadius) * 8.0 * effectiveDecay);
        float ripple2 = sin((dist - waveRadius * 0.7) * uRippleFrequency * 1.3) * 
                       exp(-abs(dist - waveRadius * 0.7) * 6.0 * effectiveDecay) * 0.6 * uRippleRippleCount;
        float ripple3 = sin((dist - waveRadius * 0.4) * uRippleFrequency * 1.8) * 
                       exp(-abs(dist - waveRadius * 0.4) * 4.0 * effectiveDecay) * 0.3 * uRippleRippleCount;
        
        float combinedRipple = (ripple1 + ripple2 + ripple3) * effectiveAmplitude;
        
        vec2 normal = normalize(uv - center);
        vec2 distortedUV = getCoverUV(uv + normal * combinedRipple, uTexture2Size);
        
        vec4 distortedImg = texture2D(uTexture2, distortedUV);
        
        float fadeEdge = smoothstep(maxDist, maxDist * 0.9, dist);
        vec4 rippleResult = mix(newImg, distortedImg, fadeEdge);
        
        float mask = smoothstep(0.0, 0.3, progress) * (1.0 - smoothstep(0.7, 1.0, progress));
        rippleResult = mix(newImg, rippleResult, mask);
        
        rippleResult.rgb = mix(rippleResult.rgb, rippleResult.rgb * 1.2, (uColorEnhancement - 1.0) * 0.5);
        
        float transition = smoothstep(0.0, 1.0, progress);
        return mix(currentImg, rippleResult, transition);
      }
    `,
  plasma: `
      vec4 plasmaEffect(vec2 uv, float progress) {
        vec4 currentImg = texture2D(uTexture1, getCoverUV(uv, uTexture1Size));
        vec4 newImg = texture2D(uTexture2, getCoverUV(uv, uTexture2Size));
        
        float effectiveSpeed = uPlasmaSpeed * uSpeedMultiplier;
        float effectiveIntensity = uPlasmaIntensity * uGlobalIntensity;
        float time = progress * 8.0 * effectiveSpeed;
        
        float plasma1 = sin(uv.x * 10.0 + time) * cos(uv.y * 8.0 + time * 0.7);
        float plasma2 = sin((uv.x + uv.y) * 12.0 + time * 1.3) * cos((uv.x - uv.y) * 15.0 + time * 0.9);
        float plasma3 = sin(length(uv - vec2(0.5)) * 20.0 + time * 1.8);
        
        float turbulence1 = smoothNoise(uv * 15.0 * uPlasmaTurbulence + vec2(time * 0.5, time * 0.3));
        float turbulence2 = smoothNoise(uv * 25.0 * uPlasmaTurbulence + vec2(time * 0.8, -time * 0.4)) * 0.7;
        float turbulence3 = smoothNoise(uv * 40.0 * uPlasmaTurbulence + vec2(-time * 0.6, time * 0.9)) * 0.4;
        
        float combinedTurbulence = (turbulence1 + turbulence2 + turbulence3) / 2.1;
        
        float plasma = (plasma1 + plasma2 + plasma3) * 0.333 + combinedTurbulence * 0.5;
        plasma = sin(plasma * 3.14159);
        
        float plasmaPhase = smoothstep(0.0, 0.3, progress) * (1.0 - smoothstep(0.7, 1.0, progress));
        
        vec2 electricField = vec2(
          sin(plasma * 6.28 + time) * 0.02,
          cos(plasma * 4.71 + time * 1.1) * 0.02
        ) * effectiveIntensity * plasmaPhase * uDistortionStrength;
        
        vec2 flowField1 = vec2(
          smoothNoise(uv * 8.0 + time * 0.4),
          smoothNoise(uv * 8.0 + time * 0.4 + 100.0)
        ) - 0.5;
        
        vec2 flowField2 = vec2(
          smoothNoise(uv * 16.0 + time * 0.6 + 200.0),
          smoothNoise(uv * 16.0 + time * 0.6 + 300.0)
        ) - 0.5;
        
        flowField1 *= 0.015 * effectiveIntensity * plasmaPhase * uDistortionStrength;
        flowField2 *= 0.008 * effectiveIntensity * plasmaPhase * uDistortionStrength;
        
        vec2 totalDistortion = electricField + flowField1 + flowField2;
        
        vec2 distortedUV1 = getCoverUV(uv + totalDistortion, uTexture1Size);
        vec2 distortedUV2 = getCoverUV(uv + totalDistortion, uTexture2Size);
        
        vec4 distortedCurrentImg = texture2D(uTexture1, distortedUV1);
        vec4 distortedNewImg = texture2D(uTexture2, distortedUV2);
        
        float energyMask = abs(plasma) * plasmaPhase * effectiveIntensity;
        
        vec4 blendedDistorted = mix(distortedCurrentImg, distortedNewImg, progress);
        
        vec3 energyColor = vec3(0.9, 0.95, 1.0);
        
        float energyPulse = sin(time * 4.0) * 0.5 + 0.5;
        float finalEnergyIntensity = energyMask * uPlasmaEnergyIntensity * (0.7 + energyPulse * 0.3);
        
        float contrast = 1.0 + energyMask * uPlasmaContrastBoost;
        vec3 contrastedColor = (blendedDistorted.rgb - 0.5) * contrast + 0.5;
        
        float saturationBoost = 1.0 + energyMask * 0.4;
        float luminance = dot(contrastedColor, vec3(0.299, 0.587, 0.114));
        vec3 saturatedColor = mix(vec3(luminance), contrastedColor, saturationBoost);
        
        vec3 glowColor = saturatedColor + energyColor * finalEnergyIntensity;
        
        float crackle = smoothNoise(uv * 50.0 + time * 2.0);
        crackle = smoothstep(0.85, 1.0, crackle) * energyMask;
        glowColor += vec3(1.0) * crackle * uPlasmaEnergyIntensity * 0.5;
        
        float brightnessPulse = sin(time * 6.0 + plasma * 10.0) * 0.5 + 0.5;
        glowColor += energyMask * brightnessPulse * uPlasmaEnergyIntensity * 0.2;
        
        glowColor = mix(glowColor, glowColor * 1.2, (uColorEnhancement - 1.0) * 0.5);
        
        vec4 plasmaResult = vec4(glowColor, 1.0);
        
        if (progress > 0.85) {
          float endFade = (progress - 0.85) / 0.15;
          plasmaResult = mix(plasmaResult, newImg, endFade);
        }
        
        float overallTransition = smoothstep(0.0, 1.0, progress);
        return mix(currentImg, plasmaResult, overallTransition);
      }
    `,
  timeshift: `
      vec4 timeshiftEffect(vec2 uv, float progress) {
        vec2 uv1 = getCoverUV(uv, uTexture1Size);
        vec2 uv2_base = getCoverUV(uv, uTexture2Size);
        vec4 currentImg = texture2D(uTexture1, uv1);
        vec4 newImg = texture2D(uTexture2, uv2_base);
        
        float effectiveDistortion = uTimeshiftDistortion * uDistortionStrength * uGlobalIntensity;
        float effectiveBlur = uTimeshiftBlur * uGlobalIntensity;
        float effectiveFlow = uTimeshiftFlow * uSpeedMultiplier;
        float effectiveChromatic = uTimeshiftChromatic * uGlobalIntensity;
        float effectiveTurbulence = uTimeshiftTurbulence;
        
        vec2 center = vec2(0.5, 0.5);
        vec2 p = uv * uResolution;
        vec2 sphereCenter = center * uResolution;
        
        float maxRadius = length(uResolution) * 0.85;
        float circleRadius = progress * maxRadius;
        
        float dist = length(p - sphereCenter);
        float normalizedDist = dist / max(circleRadius, 0.001);
        
        float boundaryWidth = 0.2 * effectiveBlur;
        float inside = smoothstep(circleRadius + circleRadius * boundaryWidth, 
                                 circleRadius - circleRadius * boundaryWidth, dist);
        
        vec4 finalColor = newImg;
        
        if (inside > 0.01 && inside < 0.99) {
          vec2 fromCenter = uv - center;
          float radius = length(fromCenter);
          vec2 direction = radius > 0.0 ? fromCenter / radius : vec2(0.0);
          
          float boundaryStrength = smoothstep(0.0, 0.3, inside) * smoothstep(1.0, 0.7, inside);
          
          float time = progress * 6.28 * effectiveFlow;
          
          float turb1 = smoothNoise(uv * 12.0 * effectiveTurbulence + time * 0.4);
          float turb2 = smoothNoise(uv * 20.0 * effectiveTurbulence - time * 0.5);
          float turb3 = smoothNoise(uv * 35.0 * effectiveTurbulence + time * 0.7);
          float turb4 = smoothNoise(uv * 55.0 * effectiveTurbulence - time * 0.4);
          
          vec2 turbulence = vec2(
            (turb1 - 0.5) * 1.2 + (turb2 - 0.5) * 0.8 + (turb3 - 0.5) * 0.4,
            (turb2 - 0.5) * 1.2 + (turb3 - 0.5) * 0.8 + (turb4 - 0.5) * 0.4
          );
          
          float displacementStrength = 0.18 * effectiveDistortion * boundaryStrength;
          vec2 displacement = turbulence * displacementStrength;
          
          float radialPull = sin(normalizedDist * 12.0 - time * 2.5) * 0.05 * effectiveDistortion;
          displacement += direction * radialPull * boundaryStrength;
          
          vec2 perpendicular = vec2(-direction.y, direction.x);
          float swirl = sin(time * 2.5 + normalizedDist * 10.0) * 0.06 * effectiveFlow;
          displacement += perpendicular * swirl * boundaryStrength;
          
          vec2 distortedUV1 = getCoverUV(uv + displacement, uTexture1Size);
          vec2 distortedUV2 = getCoverUV(uv + displacement, uTexture2Size);
          
          vec4 distortedOld = texture2D(uTexture1, distortedUV1);
          vec4 distortedNew = texture2D(uTexture2, distortedUV2);
          
          if (effectiveChromatic > 0.01) {
            float chromaticStr = boundaryStrength * 0.03 * effectiveChromatic;
            
            vec2 uv1_r = getCoverUV(uv + displacement + direction * chromaticStr * 2.0, uTexture1Size);
            vec2 uv1_b = getCoverUV(uv + displacement - direction * chromaticStr * 1.2, uTexture1Size);
            distortedOld = vec4(
              texture2D(uTexture1, uv1_r).r,
              distortedOld.g,
              texture2D(uTexture1, uv1_b).b,
              1.0
            );
            
            vec2 uv2_r = getCoverUV(uv + displacement + direction * chromaticStr * 2.0, uTexture2Size);
            vec2 uv2_b = getCoverUV(uv + displacement - direction * chromaticStr * 1.2, uTexture2Size);
            distortedNew = vec4(
              texture2D(uTexture2, uv2_r).r,
              distortedNew.g,
              texture2D(uTexture2, uv2_b).b,
              1.0
            );
          }
          
          finalColor = mix(distortedOld, distortedNew, inside);
          
          if (effectiveBlur > 0.5) {
            vec4 blurSample1 = texture2D(uTexture2, getCoverUV(uv + displacement + turbulence * 0.015, uTexture2Size));
            vec4 blurSample2 = texture2D(uTexture2, getCoverUV(uv + displacement - turbulence * 0.015, uTexture2Size));
            vec4 blurSample3 = texture2D(uTexture1, getCoverUV(uv + displacement + vec2(turbulence.y, -turbulence.x) * 0.015, uTexture1Size));
            
            float blurAmount = boundaryStrength * effectiveBlur * 0.6;
            finalColor = mix(finalColor, (finalColor + blurSample1 + blurSample2 + blurSample3) * 0.25, blurAmount);
          }
          
        } else if (inside >= 0.99) {
          finalColor = newImg;
        } else {
          finalColor = currentImg;
        }
        
        finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * 1.2, (uColorEnhancement - 1.0) * 0.5);
        
        if (progress > 0.95) {
          float endTransition = (progress - 0.95) / 0.05;
          finalColor = mix(finalColor, newImg, endTransition);
        }
        
        return mix(currentImg, finalColor, smoothstep(0.0, 1.0, progress));
      }
    `,
};

const buildFragmentShader = (effectName: string) => {
  const body = effectShaderBodies[effectName] || effectShaderBodies.glass;
  return shaderPreamble + body + `
      void main() {
        gl_FragColor = ${effectName}Effect(vUv, uProgress);
      }
    `;
};

const EFFECT_MAP: Record<string, number> = {
  glass: 0,
  frost: 1,
  ripple: 2,
  plasma: 3,
  timeshift: 4,
};

const getEffectIndex = (effectName: string): number => EFFECT_MAP[effectName] || 0;

const PROGRESS_UPDATE_INTERVAL = 50;

export const WebGLSlider: React.FC<WebGLSliderProps> = ({
  slides,
  onSelectProject,
  playBeep,
  autoplayDelay = 4500,
  transitionDuration = 1.8,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(0);
  const slidesRef = useRef(slides);

  useEffect(() => {
    slidesRef.current = slides;
  }, [slides]);

  const slidesKey = slides.map((s) => s.id).join('|');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const canvas = container.querySelector<HTMLCanvasElement>('.webgl-canvas');
    if (!canvas) return;
    const currentSlides = slidesRef.current;
    if (currentSlides.length < 2) return;

    SLIDER_CONFIG.settings.autoSlideSpeed = autoplayDelay;
    SLIDER_CONFIG.settings.transitionDuration = transitionDuration;
    SLIDER_CONFIG.settings.currentEffect = 'glass';
    SLIDER_CONFIG.settings.currentEffectPreset = 'Default';

    let renderer: WebGLRenderer;
    let scene: Scene;
    let camera: OrthographicCamera;
    let shaderMaterial: ShaderMaterial;
    let gsap: any = null;
    const slideTextures: Texture[] = [];
    let texturesLoaded = false;
    let sliderEnabled = false;
    let currentSlideIndex = 0;
    let isTransitioning = false;
    let autoSlideTimer: number | null = null;
    let progressAnimation: number | null = null;

    // On-demand rendering: only draw frames when something actually changes.
    let requestRender: (() => void) | null = null;
    let pendingRaf: number | null = null;

    const getPixelRatio = () => {
      const dpr = window.devicePixelRatio || 1;
      // Lower caps on mobile to keep GPU load light on low-end devices.
      const cap = window.innerWidth < 768 ? 1 : 1.5;
      return Math.min(dpr, cap);
    };

    const reducedMotion =
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    indexRef.current = 0;

    const el = (id: string) => container.querySelector<HTMLElement>(`#${id}`);

    // ---------- Navigation UI ----------
    const navContainer = el('slidesNav');
    const slideNumberEl = el('slideNumber');
    const slideTotalEl = el('slideTotal');
    const infoMetaEl = el('slideInfoMeta');
    const infoTitleEl = el('slideInfoTitle');
    const infoSubEl = el('slideInfoSub');

    const updateCounter = (index: number) => {
      if (slideNumberEl)
        slideNumberEl.textContent = String(index + 1).padStart(2, '0');
      if (slideTotalEl)
        slideTotalEl.textContent = String(currentSlides.length).padStart(2, '0');
      if (infoMetaEl) {
        const s = currentSlides[index];
        infoMetaEl.textContent = `RECORD_${s.number} // ${s.category} // ${s.year}`;
      }
      if (infoTitleEl) infoTitleEl.textContent = currentSlides[index].title;
      if (infoSubEl) infoSubEl.textContent = currentSlides[index].subtitle;
    };

    const createSlidesNavigation = () => {
      if (!navContainer) return;
      navContainer.innerHTML = '';
      currentSlides.forEach((slide, index) => {
        const navItem = document.createElement('div');
        navItem.className = `slide-nav-item ${index === 0 ? 'active' : ''}`;
        navItem.dataset.slideIndex = String(index);
        const fill = document.createElement('div');
        fill.className = 'slide-progress-fill';
        const line = document.createElement('div');
        line.className = 'slide-progress-line';
        line.appendChild(fill);
        const title = document.createElement('div');
        title.className = 'slide-nav-title';
        title.textContent = slide.title;
        navItem.appendChild(line);
        navItem.appendChild(title);
        navItem.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetIndex = parseInt(navItem.dataset.slideIndex || '0', 10);
          if (targetIndex !== currentSlideIndex && !isTransitioning) {
            navigateToSlide(targetIndex);
          }
        });
        navContainer.appendChild(navItem);
      });
    };

    const updateNavigationState = (activeIndex: number) => {
      container
        .querySelectorAll('.slide-nav-item')
        .forEach((item, index) => {
          item.classList.toggle('active', index === activeIndex);
        });
    };

    const updateSlideProgress = (slideIndex: number, progress: number) => {
      const items = container.querySelectorAll('.slide-nav-item');
      const fill = items[slideIndex]?.querySelector<HTMLElement>('.slide-progress-fill');
      if (fill) {
        fill.style.width = `${progress}%`;
        fill.style.opacity = '1';
      }
    };

    const fadeSlideProgress = (slideIndex: number) => {
      const items = container.querySelectorAll('.slide-nav-item');
      const fill = items[slideIndex]?.querySelector<HTMLElement>('.slide-progress-fill');
      if (fill) {
        fill.style.opacity = '0';
        setTimeout(() => {
          fill.style.width = '0%';
        }, 300);
      }
    };

    const quickResetProgress = (slideIndex: number) => {
      const items = container.querySelectorAll('.slide-nav-item');
      const fill = items[slideIndex]?.querySelector<HTMLElement>('.slide-progress-fill');
      if (fill) {
        fill.style.transition = 'width 0.2s ease-out';
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.transition = 'width 0.1s ease, opacity 0.3s ease';
        }, 200);
      }
    };

    // ---------- Timers ----------
    const stopAutoSlideTimer = () => {
      if (progressAnimation) {
        clearInterval(progressAnimation);
        progressAnimation = null;
      }
      if (autoSlideTimer) {
        clearTimeout(autoSlideTimer);
        autoSlideTimer = null;
      }
    };

    const startAutoSlideTimer = () => {
      if (!texturesLoaded || !sliderEnabled || slideTextures.length < 2) return;
      stopAutoSlideTimer();
      let progress = 0;
      const increment =
        (100 / SLIDER_CONFIG.settings.autoSlideSpeed) * PROGRESS_UPDATE_INTERVAL;
      progressAnimation = window.setInterval(() => {
        if (!sliderEnabled) {
          stopAutoSlideTimer();
          return;
        }
        progress += increment;
        updateSlideProgress(currentSlideIndex, progress);
        if (progress >= 100) {
          clearInterval(progressAnimation!);
          progressAnimation = null;
          fadeSlideProgress(currentSlideIndex);
          if (!isTransitioning) {
            handleSlideChange();
          }
        }
      }, PROGRESS_UPDATE_INTERVAL);
    };

    const safeStartTimer = (delay = 0) => {
      stopAutoSlideTimer();
      if (reducedMotion) return;
      if (sliderEnabled && texturesLoaded) {
        if (delay > 0) {
          autoSlideTimer = window.setTimeout(() => {
            if (sliderEnabled) startAutoSlideTimer();
          }, delay);
        } else {
          startAutoSlideTimer();
        }
      }
    };

    // ---------- Navigation ----------
    const navigateToSlide = (targetIndex: number) => {
      if (isTransitioning || targetIndex === currentSlideIndex) return;
      if (!gsap) return;
      stopAutoSlideTimer();
      quickResetProgress(currentSlideIndex);
      const currentTexture = slideTextures[currentSlideIndex];
      const targetTexture = slideTextures[targetIndex];
      if (!currentTexture || !targetTexture) return;
      isTransitioning = true;
      shaderMaterial.uniforms.uTexture1.value = currentTexture;
      shaderMaterial.uniforms.uTexture2.value = targetTexture;
      shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
      shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;
      currentSlideIndex = targetIndex;
      indexRef.current = targetIndex;
      updateCounter(currentSlideIndex);
      updateNavigationState(currentSlideIndex);
      gsap.fromTo(
        shaderMaterial.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: SLIDER_CONFIG.settings.transitionDuration,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (requestRender) requestRender();
          },
          onComplete: () => {
            shaderMaterial.uniforms.uProgress.value = 0;
            shaderMaterial.uniforms.uTexture1.value = targetTexture;
            shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
            isTransitioning = false;
            if (requestRender) requestRender();
            safeStartTimer(100);
          },
        }
      );
    };

    const handleSlideChange = () => {
      if (isTransitioning || !texturesLoaded || !sliderEnabled) return;
      const nextIndex = (currentSlideIndex + 1) % currentSlides.length;
      navigateToSlide(nextIndex);
    };

    // ---------- Texture loading ----------
    const loadImageTexture = async (src: string) => {
      const THREE = await getThree();
      const { TextureLoader, LinearFilter, Vector2 } = THREE;
      return new Promise<Texture>((resolve, reject) => {
        const loader = new TextureLoader();
        loader.setCrossOrigin('anonymous');
        const timeout = window.setTimeout(() => reject(new Error('Timeout')), 15000);
        loader.load(
          src,
          (texture) => {
            clearTimeout(timeout);
            texture.minFilter = LinearFilter;
            texture.magFilter = LinearFilter;
            texture.userData = {
              size: new Vector2(
                (texture.image as HTMLImageElement).width,
                (texture.image as HTMLImageElement).height
              ),
            };
            resolve(texture);
          },
          undefined,
          (error) => {
            clearTimeout(timeout);
            reject(error);
          }
        );
      });
    };

    // ---------- Renderer init ----------
    const initializeRenderer = async () => {
      const [THREE, gsapModule] = await Promise.all([getThree(), import('gsap')]);
      gsap = gsapModule.default;
      const {
        Mesh,
        OrthographicCamera,
        PlaneGeometry,
        Scene,
        ShaderMaterial,
        Vector2,
        WebGLRenderer,
      } = THREE;

      scene = new Scene();
      camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      });
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setPixelRatio(getPixelRatio());
      renderer.setSize(width, height);

      requestRender = () => {
        if (pendingRaf !== null) return;
        pendingRaf = window.requestAnimationFrame(() => {
          pendingRaf = null;
          renderer.render(scene, camera);
        });
      };

      const uniforms = {
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0.0 },
        uResolution: { value: new Vector2(width, height) },
        uTexture1Size: { value: new Vector2(1, 1) },
        uTexture2Size: { value: new Vector2(1, 1) },
        uEffectType: { value: getEffectIndex(SLIDER_CONFIG.settings.currentEffect) },
        uGlobalIntensity: { value: SLIDER_CONFIG.settings.globalIntensity },
        uSpeedMultiplier: { value: SLIDER_CONFIG.settings.speedMultiplier },
        uDistortionStrength: { value: SLIDER_CONFIG.settings.distortionStrength },
        uColorEnhancement: { value: SLIDER_CONFIG.settings.colorEnhancement },
        uGlassRefractionStrength: { value: SLIDER_CONFIG.settings.glassRefractionStrength },
        uGlassChromaticAberration: { value: SLIDER_CONFIG.settings.glassChromaticAberration },
        uGlassBubbleClarity: { value: SLIDER_CONFIG.settings.glassBubbleClarity },
        uGlassEdgeGlow: { value: SLIDER_CONFIG.settings.glassEdgeGlow },
        uGlassLiquidFlow: { value: SLIDER_CONFIG.settings.glassLiquidFlow },
        uFrostIntensity: { value: SLIDER_CONFIG.settings.frostIntensity },
        uFrostCrystalSize: { value: SLIDER_CONFIG.settings.frostCrystalSize },
        uFrostIceCoverage: { value: SLIDER_CONFIG.settings.frostIceCoverage },
        uFrostTemperature: { value: SLIDER_CONFIG.settings.frostTemperature },
        uFrostTexture: { value: SLIDER_CONFIG.settings.frostTexture },
        uRippleFrequency: { value: SLIDER_CONFIG.settings.rippleFrequency },
        uRippleAmplitude: { value: SLIDER_CONFIG.settings.rippleAmplitude },
        uRippleWaveSpeed: { value: SLIDER_CONFIG.settings.rippleWaveSpeed },
        uRippleRippleCount: { value: SLIDER_CONFIG.settings.rippleRippleCount },
        uRippleDecay: { value: SLIDER_CONFIG.settings.rippleDecay },
        uPlasmaIntensity: { value: SLIDER_CONFIG.settings.plasmaIntensity },
        uPlasmaSpeed: { value: SLIDER_CONFIG.settings.plasmaSpeed },
        uPlasmaEnergyIntensity: { value: SLIDER_CONFIG.settings.plasmaEnergyIntensity },
        uPlasmaContrastBoost: { value: SLIDER_CONFIG.settings.plasmaContrastBoost },
        uPlasmaTurbulence: { value: SLIDER_CONFIG.settings.plasmaTurbulence },
        uTimeshiftDistortion: { value: SLIDER_CONFIG.settings.timeshiftDistortion },
        uTimeshiftBlur: { value: SLIDER_CONFIG.settings.timeshiftBlur },
        uTimeshiftFlow: { value: SLIDER_CONFIG.settings.timeshiftFlow },
        uTimeshiftChromatic: { value: SLIDER_CONFIG.settings.timeshiftChromatic },
        uTimeshiftTurbulence: { value: SLIDER_CONFIG.settings.timeshiftTurbulence },
      };

      const geometry = new PlaneGeometry(2, 2);
      const makeMaterial = (effectName: string) =>
        new ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader: buildFragmentShader(effectName),
        });

      const mesh = new Mesh(geometry, makeMaterial(SLIDER_CONFIG.settings.currentEffect));
      shaderMaterial = mesh.material as ShaderMaterial;
      scene.add(mesh);

      if (requestRender) requestRender();

      // Show the first slide as soon as its texture arrives, then load the
      // remaining slides in the background so nothing blocks initial paint.
      const firstTexture = await loadImageTexture(currentSlides[0].imageUrl).catch(
        () => null
      );
      if (firstTexture) {
        slideTextures.push(firstTexture);
        shaderMaterial.uniforms.uTexture1.value = firstTexture;
        shaderMaterial.uniforms.uTexture1Size.value = firstTexture.userData.size;
        if (requestRender) requestRender();
      }

      const remainingResults = await Promise.all(
        currentSlides.slice(1).map((s) => loadImageTexture(s.imageUrl).catch(() => null))
      );
      remainingResults.forEach((texture) => {
        if (texture) slideTextures.push(texture);
      });

      if (slideTextures.length >= 2) {
        shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
        shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
        texturesLoaded = true;
        sliderEnabled = true;
        updateCounter(0);
        updateNavigationState(0);
        if (requestRender) requestRender();
        safeStartTimer(500);
      }
    };

    // ---------- Event handlers ----------
    let touchStartX = 0;
    let touchEndX = 0;

    const handleSwipe = () => {
      if (Math.abs(touchEndX - touchStartX) < 50) return;
      if (touchEndX < touchStartX && !isTransitioning && sliderEnabled) {
        stopAutoSlideTimer();
        quickResetProgress(currentSlideIndex);
        handleSlideChange();
      } else if (touchEndX > touchStartX && !isTransitioning && sliderEnabled) {
        stopAutoSlideTimer();
        quickResetProgress(currentSlideIndex);
        const prevIndex = (currentSlideIndex - 1 + currentSlides.length) % currentSlides.length;
        navigateToSlide(prevIndex);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-slider-ui]')) return;
      if (!isTransitioning && sliderEnabled) {
        stopAutoSlideTimer();
        quickResetProgress(currentSlideIndex);
        handleSlideChange();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowRight') {
        e.preventDefault();
        if (!isTransitioning && sliderEnabled) {
          stopAutoSlideTimer();
          quickResetProgress(currentSlideIndex);
          handleSlideChange();
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (!isTransitioning && sliderEnabled) {
          stopAutoSlideTimer();
          quickResetProgress(currentSlideIndex);
          const prevIndex =
            (currentSlideIndex - 1 + currentSlides.length) % currentSlides.length;
          navigateToSlide(prevIndex);
        }
      }
    };

    const handleResize = () => {
      if (renderer && shaderMaterial) {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        renderer.setPixelRatio(getPixelRatio());
        renderer.setSize(w, h);
        shaderMaterial.uniforms.uResolution.value.set(w, h);
        if (requestRender) requestRender();
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopAutoSlideTimer();
      } else if (sliderEnabled && !isTransitioning) {
        safeStartTimer();
      }
    };

    // ---------- Wire up ----------
    createSlidesNavigation();
    updateCounter(0);
    updateNavigationState(0);

    container.addEventListener('click', handleClick);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    initializeRenderer().catch(() => {});

    return () => {
      container.removeEventListener('click', handleClick);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      stopAutoSlideTimer();
      if (pendingRaf !== null) cancelAnimationFrame(pendingRaf);
      slideTextures.forEach((t) => t.dispose());
      if (renderer) {
        renderer.dispose();
      }
      if (navContainer) navContainer.innerHTML = '';
    };
  }, [slidesKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className="webgl-slider">
      <canvas className="webgl-canvas" />

      <span className="slide-number" id="slideNumber">
        01
      </span>
      <span className="slide-total" id="slideTotal">
        --
      </span>

      <div className="slide-info">
        <div className="slide-info-meta" id="slideInfoMeta">
          RECORD_01 // CATEGORY // 2024
        </div>
        <h2 className="slide-info-title" id="slideInfoTitle">
          PROJECT
        </h2>
        <p className="slide-info-sub" id="slideInfoSub">
          PROJECT SUBTITLE
        </p>
        <button
          type="button"
          className="slide-info-cta"
          data-slider-ui
          onClick={() => {
            const slide = slidesRef.current[indexRef.current];
            if (slide) {
              if (playBeep) playBeep(880);
              onSelectProject(slide.slug || slide.id);
            }
          }}
        >
          OPEN_CASE_STUDY
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <nav className="slides-navigation" id="slidesNav" />
    </div>
  );
};
