/**
 * Simple Web Audio API Synthesizer for brutalist UI sound feedback.
 */
let audioCtx: AudioContext | null = null;

export function playBeep(frequency = 600, duration = 0.05, soundEnabled = false) {
  // Sound is disabled across the entire website
  return;
}

export const noopBeep = () => {};

