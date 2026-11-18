// Web Audio API playful sound effects & nostalgic GBA chiptune music for "Vila do Saber"

let audioCtx: AudioContext | null = null;
let bgmGainNode: GainNode | null = null;
let bgmIntervalId: NodeJS.Timeout | null = null;
let isBgmPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export type SfxType = "pop" | "star" | "success" | "click" | "open" | "fanfare" | "step";

export function playSound(type: SfxType) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === "step") {
      // Soft muffled footstep on grass / floor
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, now);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.04);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } else if (type === "click" || type === "pop") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(type === "pop" ? 420 : 320, now);
      osc.frequency.exponentialRampToValueAtTime(type === "pop" ? 780 : 480, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === "star") {
      // High chime
      [587.33, 880, 1174.66].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.1, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } else if (type === "open") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === "success" || type === "fanfare") {
      // Victory melodic chord C E G C
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    }
  } catch {
    // Ignore audio errors if blocked by browser policy
  }
}

// ========================================================
// RETRO 8-BIT GBA CHIPTUNE BGM GENERATOR (Warm & Nostalgic)
// ========================================================

// Nostalgic Pallet Town-style soothing chord progression
// Frequencies in Hz: C4=261.6, D4=293.6, E4=329.6, F4=349.2, G4=392, A4=440, B4=493.8, C5=523.2
const BGM_MELODY: Array<{ note: number; duration: number }> = [
  // Measure 1 (C Major gentle arpeggio)
  { note: 261.63, duration: 0.3 },
  { note: 329.63, duration: 0.3 },
  { note: 392.0, duration: 0.3 },
  { note: 523.25, duration: 0.5 },
  // Measure 2 (A Minor gentle steps)
  { note: 440.0, duration: 0.3 },
  { note: 392.0, duration: 0.3 },
  { note: 349.23, duration: 0.3 },
  { note: 329.63, duration: 0.5 },
  // Measure 3 (F Major cozy)
  { note: 349.23, duration: 0.3 },
  { note: 440.0, duration: 0.3 },
  { note: 523.25, duration: 0.3 },
  { note: 493.88, duration: 0.5 },
  // Measure 4 (G7 resolve to home)
  { note: 392.0, duration: 0.3 },
  { note: 440.0, duration: 0.3 },
  { note: 493.88, duration: 0.3 },
  { note: 523.25, duration: 0.6 },
];

const BGM_BASS: Array<{ note: number; duration: number }> = [
  { note: 130.81, duration: 1.4 }, // C3
  { note: 110.0, duration: 1.4 }, // A2
  { note: 87.31, duration: 1.4 }, // F2
  { note: 98.0, duration: 1.5 }, // G2
];

export function startBgm() {
  if (isBgmPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isBgmPlaying = true;

  if (!bgmGainNode) {
    bgmGainNode = ctx.createGain();
    bgmGainNode.gain.setValueAtTime(0.04, ctx.currentTime);
    bgmGainNode.connect(ctx.destination);
  }

  const loopDuration = 6000; // 6 seconds per cycle

  const scheduleBar = () => {
    if (!isBgmPlaying || !bgmGainNode || !audioCtx) return;
    const now = audioCtx.currentTime;

    // Filter to give authentic 16-bit warmth and cut high harshness
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1250, now);
    filter.connect(bgmGainNode);

    // Schedule Melody
    let melodyTime = now;
    BGM_MELODY.forEach(({ note, duration }) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(note, melodyTime);

      gain.gain.setValueAtTime(0.035, melodyTime);
      gain.gain.exponentialRampToValueAtTime(0.001, melodyTime + duration * 0.9);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(melodyTime);
      osc.stop(melodyTime + duration * 0.9);

      melodyTime += duration * 0.95;
    });

    // Schedule Soft Triangle Bass
    let bassTime = now;
    BGM_BASS.forEach(({ note, duration }) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(note, bassTime);

      gain.gain.setValueAtTime(0.045, bassTime);
      gain.gain.exponentialRampToValueAtTime(0.001, bassTime + duration * 0.92);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(bassTime);
      osc.stop(bassTime + duration * 0.92);

      bassTime += duration;
    });
  };

  // Schedule first bar immediately, then loop
  scheduleBar();
  bgmIntervalId = setInterval(scheduleBar, loopDuration);
}

export function stopBgm() {
  isBgmPlaying = false;
  if (bgmIntervalId) {
    clearInterval(bgmIntervalId);
    bgmIntervalId = null;
  }
}

export function toggleBgm(): boolean {
  if (isBgmPlaying) {
    stopBgm();
    return false;
  } else {
    startBgm();
    return true;
  }
}

export function getIsBgmPlaying(): boolean {
  return isBgmPlaying;
}
