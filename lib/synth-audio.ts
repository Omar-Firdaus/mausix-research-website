type AudioNodes = {
  context: AudioContext;
  master: GainNode;
};

type ScheduledCleanup = {
  nodes: AudioNode[];
  intervals: number[];
};

function createCleanup(): ScheduledCleanup {
  return { nodes: [], intervals: [] };
}

function track(cleanup: ScheduledCleanup, ...items: AudioNode[]): void {
  cleanup.nodes.push(...items);
}

export function createAudioEngine(): AudioNodes | null {
  if (typeof window === 'undefined') return null;

  const AudioCtx =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioCtx) return null;

  const context = new AudioCtx();
  const master = context.createGain();
  master.gain.value = 0;
  master.connect(context.destination);

  return { context, master };
}

export async function resumeAudio(context: AudioContext): Promise<void> {
  if (context.state === 'suspended') {
    await context.resume();
  }
}

function rampGain(
  param: AudioParam,
  context: AudioContext,
  from: number,
  to: number,
  duration: number,
  when = context.currentTime,
): void {
  param.cancelScheduledValues(when);
  param.setValueAtTime(from, when);
  param.linearRampToValueAtTime(to, when + duration);
}

function playDeepKick(
  context: AudioContext,
  destination: AudioNode,
  when: number,
  cleanup: ScheduledCleanup,
  intensity = 1,
): void {
  const osc = context.createOscillator();
  const sub = context.createOscillator();
  const gain = context.createGain();
  osc.type = 'sine';
  sub.type = 'sine';
  osc.frequency.setValueAtTime(95, when);
  osc.frequency.exponentialRampToValueAtTime(38, when + 0.18);
  sub.frequency.setValueAtTime(48, when);
  sub.frequency.exponentialRampToValueAtTime(32, when + 0.22);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.28 * intensity, when + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.28);
  osc.connect(gain);
  sub.connect(gain);
  gain.connect(destination);
  osc.start(when);
  sub.start(when);
  osc.stop(when + 0.3);
  sub.stop(when + 0.3);
  track(cleanup, osc, sub, gain);
}

function playSubRumble(
  context: AudioContext,
  destination: AudioNode,
  when: number,
  duration: number,
  cleanup: ScheduledCleanup,
  gainPeak = 0.12,
): void {
  const bufferSize = Math.floor(context.sampleRate * duration);
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const source = context.createBufferSource();
  source.buffer = buffer;
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(120, when);
  filter.frequency.exponentialRampToValueAtTime(420, when + duration * 0.7);
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(gainPeak, when + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(when);
  source.stop(when + duration);
  track(cleanup, source, filter, gain);
}

export function playBootSequence(
  engine: AudioNodes,
  onComplete?: () => void,
): () => void {
  const { context, master } = engine;
  const now = context.currentTime;
  const cleanup = createCleanup();

  rampGain(master.gain, context, 0, 0.92, 0.08, now);

  const subDrone = context.createOscillator();
  const subDroneGain = context.createGain();
  subDrone.type = 'sine';
  subDrone.frequency.setValueAtTime(36, now);
  subDroneGain.gain.setValueAtTime(0.0001, now);
  subDroneGain.gain.exponentialRampToValueAtTime(0.2, now + 0.5);
  subDroneGain.gain.setValueAtTime(0.2, now + 1.5);
  subDrone.connect(subDroneGain);
  subDroneGain.connect(master);
  subDrone.start(now);
  track(cleanup, subDrone, subDroneGain);

  playDeepKick(context, master, now, cleanup, 1.15);
  playSubRumble(context, master, now + 0.02, 0.35, cleanup, 0.14);

  const relay = context.createOscillator();
  const relayGain = context.createGain();
  const relayFilter = context.createBiquadFilter();
  relay.type = 'square';
  relay.frequency.setValueAtTime(72, now);
  relay.frequency.exponentialRampToValueAtTime(38, now + 0.08);
  relayFilter.type = 'lowpass';
  relayFilter.frequency.value = 180;
  relayGain.gain.setValueAtTime(0.0001, now);
  relayGain.gain.exponentialRampToValueAtTime(0.1, now + 0.01);
  relayGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
  relay.connect(relayFilter);
  relayFilter.connect(relayGain);
  relayGain.connect(master);
  relay.start(now);
  relay.stop(now + 0.12);
  track(cleanup, relay, relayGain, relayFilter);

  const sweepA = context.createOscillator();
  const sweepB = context.createOscillator();
  const sweepFilter = context.createBiquadFilter();
  const sweepGain = context.createGain();
  sweepA.type = 'sawtooth';
  sweepB.type = 'sawtooth';
  sweepA.frequency.setValueAtTime(42, now + 0.06);
  sweepA.frequency.exponentialRampToValueAtTime(185, now + 1.25);
  sweepB.frequency.setValueAtTime(43.5, now + 0.06);
  sweepB.frequency.exponentialRampToValueAtTime(190, now + 1.25);
  sweepB.detune.value = -7;
  sweepFilter.type = 'lowpass';
  sweepFilter.frequency.setValueAtTime(90, now + 0.06);
  sweepFilter.frequency.exponentialRampToValueAtTime(520, now + 1.1);
  sweepFilter.Q.value = 6;
  sweepGain.gain.setValueAtTime(0.0001, now + 0.06);
  sweepGain.gain.exponentialRampToValueAtTime(0.13, now + 0.22);
  sweepGain.gain.setValueAtTime(0.1, now + 0.95);
  sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
  sweepA.connect(sweepFilter);
  sweepB.connect(sweepFilter);
  sweepFilter.connect(sweepGain);
  sweepGain.connect(master);
  sweepA.start(now + 0.06);
  sweepB.start(now + 0.06);
  sweepA.stop(now + 1.45);
  sweepB.stop(now + 1.45);
  track(cleanup, sweepA, sweepB, sweepFilter, sweepGain);

  playSubRumble(context, master, now + 0.3, 1.1, cleanup, 0.08);

  const bassHits = [55, 65.41, 73.42, 82.41];
  bassHits.forEach((freq, index) => {
    const start = now + 0.5 + index * 0.16;
    const hit = context.createOscillator();
    const hitFilter = context.createBiquadFilter();
    const hitGain = context.createGain();
    hit.type = 'triangle';
    hit.frequency.setValueAtTime(freq, start);
    hitFilter.type = 'lowpass';
    hitFilter.frequency.value = 280;
    hitGain.gain.setValueAtTime(0.0001, start);
    hitGain.gain.exponentialRampToValueAtTime(0.08, start + 0.02);
    hitGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
    hit.connect(hitFilter);
    hitFilter.connect(hitGain);
    hitGain.connect(master);
    hit.start(start);
    hit.stop(start + 0.22);
    track(cleanup, hit, hitFilter, hitGain);
  });

  playDeepKick(context, master, now + 1.1, cleanup, 1);
  playSubRumble(context, master, now + 1.1, 0.2, cleanup, 0.11);

  const lockA = context.createOscillator();
  const lockB = context.createOscillator();
  const lockGain = context.createGain();
  const lockFilter = context.createBiquadFilter();
  lockA.type = 'sine';
  lockB.type = 'sine';
  lockA.frequency.setValueAtTime(55, now + 1.3);
  lockB.frequency.setValueAtTime(82.5, now + 1.3);
  lockFilter.type = 'lowpass';
  lockFilter.frequency.value = 240;
  lockGain.gain.setValueAtTime(0.0001, now + 1.3);
  lockGain.gain.exponentialRampToValueAtTime(0.16, now + 1.38);
  lockGain.gain.setValueAtTime(0.16, now + 1.75);
  lockA.connect(lockFilter);
  lockB.connect(lockFilter);
  lockFilter.connect(lockGain);
  lockGain.connect(master);
  lockA.start(now + 1.3);
  lockB.start(now + 1.3);
  track(cleanup, lockA, lockB, lockGain, lockFilter);

  const end = now + 2;
  const timeoutId = window.setTimeout(() => {
    onComplete?.();
  }, (end - now) * 1000);
  cleanup.intervals.push(timeoutId);

  return () => {
    cleanup.intervals.forEach((id) => window.clearTimeout(id));
    cleanup.nodes.forEach((node) => {
      try {
        if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
          node.stop();
        }
        node.disconnect();
      } catch {
        // already stopped
      }
    });
  };
}

function playSocialPluck(
  context: AudioContext,
  destination: AudioNode,
  when: number,
  frequency: number,
  volume = 0.044,
): void {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(frequency * 1.012, when);
  osc.frequency.exponentialRampToValueAtTime(frequency, when + 0.04);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(volume, when + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.18);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(when);
  osc.stop(when + 0.2);
}

function playNotifyPing(context: AudioContext, destination: AudioNode, when: number): void {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(740, when);
  osc.frequency.exponentialRampToValueAtTime(988, when + 0.05);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.038, when + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.16);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(when);
  osc.stop(when + 0.18);
}

function playDataTick(context: AudioContext, destination: AudioNode, when: number): void {
  const length = Math.floor(context.sampleRate * 0.01);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }

  const source = context.createBufferSource();
  source.buffer = buffer;
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  filter.type = 'bandpass';
  filter.frequency.value = 2800;
  gain.gain.setValueAtTime(0.014, when);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.008);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(when);
  source.stop(when + 0.012);
}

function playOrbitPulse(context: AudioContext, destination: AudioNode, when: number): void {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(78, when);
  osc.frequency.exponentialRampToValueAtTime(52, when + 0.1);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.07, when + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.16);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(when);
  osc.stop(when + 0.18);
}

function createSpaceDelay(
  context: AudioContext,
  destination: AudioNode,
  cleanup: ScheduledCleanup,
): GainNode {
  const send = context.createGain();
  const delay = context.createDelay(3);
  const feedback = context.createGain();
  const filter = context.createBiquadFilter();
  const wet = context.createGain();

  delay.delayTime.value = 0.38;
  feedback.gain.value = 0.34;
  filter.type = 'lowpass';
  filter.frequency.value = 1800;
  wet.gain.value = 0.45;

  send.connect(delay);
  delay.connect(filter);
  filter.connect(feedback);
  feedback.connect(delay);
  filter.connect(wet);
  wet.connect(destination);

  track(cleanup, send, delay, feedback, filter, wet);
  return send;
}

export function startAmbientDrone(engine: AudioNodes): () => void {
  const { context, master } = engine;
  const now = context.currentTime;
  const cleanup = createCleanup();
  const BPM = 124;
  const beatMs = 60000 / BPM;
  const eighthMs = beatMs / 2;
  const sixteenthMs = beatMs / 4;

  rampGain(master.gain, context, master.gain.value, 0.44, 1.8, now);

  const signalSend = createSpaceDelay(context, master, cleanup);

  const sub = context.createOscillator();
  const subGain = context.createGain();
  sub.type = 'sine';
  sub.frequency.value = 55;
  subGain.gain.value = 0.16;
  sub.connect(subGain);
  subGain.connect(master);
  sub.start();
  track(cleanup, sub, subGain);

  const nebulaSize = context.sampleRate * 4;
  const nebulaBuffer = context.createBuffer(1, nebulaSize, context.sampleRate);
  const nebulaData = nebulaBuffer.getChannelData(0);
  for (let i = 0; i < nebulaSize; i += 1) {
    nebulaData[i] = (Math.random() * 2 - 1) * 0.35;
  }

  const nebula = context.createBufferSource();
  nebula.buffer = nebulaBuffer;
  nebula.loop = true;
  const nebulaFilter = context.createBiquadFilter();
  const nebulaGain = context.createGain();
  const nebulaLfo = context.createOscillator();
  const nebulaLfoGain = context.createGain();
  nebulaFilter.type = 'bandpass';
  nebulaFilter.frequency.value = 340;
  nebulaFilter.Q.value = 0.55;
  nebulaGain.gain.value = 0.016;
  nebulaLfo.type = 'sine';
  nebulaLfo.frequency.value = 0.06;
  nebulaLfoGain.gain.value = 220;
  nebula.connect(nebulaFilter);
  nebulaFilter.connect(nebulaGain);
  nebulaGain.connect(master);
  nebulaLfo.connect(nebulaLfoGain);
  nebulaLfoGain.connect(nebulaFilter.frequency);
  nebula.start();
  nebulaLfo.start();
  track(cleanup, nebula, nebulaFilter, nebulaGain, nebulaLfo, nebulaLfoGain);

  const spacePadA = context.createOscillator();
  const spacePadB = context.createOscillator();
  const spacePadGain = context.createGain();
  spacePadA.type = 'sine';
  spacePadB.type = 'sine';
  spacePadA.frequency.value = 220;
  spacePadB.frequency.value = 329.63;
  spacePadB.detune.value = 8;
  spacePadGain.gain.value = 0.022;
  spacePadA.connect(spacePadGain);
  spacePadB.connect(spacePadGain);
  spacePadGain.connect(master);
  spacePadA.start();
  spacePadB.start();
  track(cleanup, spacePadA, spacePadB, spacePadGain);

  const shimmerA = context.createOscillator();
  const shimmerB = context.createOscillator();
  const shimmerGain = context.createGain();
  const shimmerTremolo = context.createOscillator();
  const shimmerTremoloGain = context.createGain();
  shimmerA.type = 'triangle';
  shimmerB.type = 'triangle';
  shimmerA.frequency.value = 783.99;
  shimmerB.frequency.value = 987.77;
  shimmerGain.gain.value = 0.01;
  shimmerTremolo.type = 'sine';
  shimmerTremolo.frequency.value = 0.14;
  shimmerTremoloGain.gain.value = 0.006;
  shimmerA.connect(shimmerGain);
  shimmerB.connect(shimmerGain);
  shimmerTremolo.connect(shimmerTremoloGain);
  shimmerTremoloGain.connect(shimmerGain.gain);
  shimmerGain.connect(signalSend);
  shimmerA.start();
  shimmerB.start();
  shimmerTremolo.start();
  track(cleanup, shimmerA, shimmerB, shimmerGain, shimmerTremolo, shimmerTremoloGain);

  const streamNotes = [523.25, 587.33, 659.25, 783.99, 880, 783.99, 659.25, 587.33];
  let streamIndex = 0;

  const streamInterval = window.setInterval(() => {
    playSocialPluck(context, signalSend, context.currentTime, streamNotes[streamIndex]);
    streamIndex = (streamIndex + 1) % streamNotes.length;
  }, eighthMs);
  cleanup.intervals.push(streamInterval);

  const orbitInterval = window.setInterval(() => {
    playOrbitPulse(context, master, context.currentTime);
  }, beatMs);
  cleanup.intervals.push(orbitInterval);

  let tickStep = 0;
  const tickInterval = window.setInterval(() => {
    if (tickStep % 2 === 0) {
      playDataTick(context, signalSend, context.currentTime);
    }
    tickStep += 1;
  }, sixteenthMs);
  cleanup.intervals.push(tickInterval);

  const scheduleNextPing = () => {
    const delayMs = 1400 + Math.random() * 2200;
    const timeoutId = window.setTimeout(() => {
      playNotifyPing(context, signalSend, context.currentTime);
      scheduleNextPing();
    }, delayMs);
    cleanup.intervals.push(timeoutId);
  };
  scheduleNextPing();

  playSocialPluck(context, signalSend, now + 0.2, streamNotes[0]);

  return () => {
    cleanup.intervals.forEach((id) => {
      window.clearInterval(id);
      window.clearTimeout(id);
    });
    rampGain(master.gain, context, master.gain.value, 0, 1);
    window.setTimeout(() => {
      cleanup.nodes.forEach((node) => {
        try {
          if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
            node.stop();
          }
          node.disconnect();
        } catch {
          // already stopped
        }
      });
    }, 1100);
  };
}

export function fadeOutAmbient(engine: AudioNodes, duration = 0.8): void {
  rampGain(engine.master.gain, engine.context, engine.master.gain.value, 0, duration);
}
