"use client";

import { useCallback, useRef, useState } from "react";

/* ─── Note Frequencies (C3 → B5, equal temperament A4=440) ──────────── */
const F: Record<string, number> = {
  C3:130.81,Db3:138.59,D3:146.83,Eb3:155.56,E3:164.81,F3:174.61,Gb3:185.00,G3:196.00,Ab3:207.65,A3:220.00,Bb3:233.08,B3:246.94,
  C4:261.63,Db4:277.18,D4:293.66,Eb4:311.13,E4:329.63,F4:349.23,Gb4:369.99,G4:392.00,Ab4:415.30,A4:440.00,Bb4:466.16,B4:493.88,
  C5:523.25,Db5:554.37,D5:587.33,Eb5:622.25,E5:659.25,F5:698.46,Gb5:739.99,G5:783.99,Ab5:830.61,A5:880.00,Bb5:932.33,B5:987.77,
};
export const NOTE_FREQ = F;

/* ─── Melody data ──────────────────────────────────────────────────── */
export interface NoteEvent { note: string; dur: number }

export const MELODIES = {
  furElise: [
    {note:"E5",dur:0.22},{note:"Eb5",dur:0.22},{note:"E5",dur:0.22},{note:"Eb5",dur:0.22},
    {note:"E5",dur:0.22},{note:"B4",dur:0.22},{note:"D5",dur:0.22},{note:"C5",dur:0.22},
    {note:"A4",dur:0.44},
    {note:"C4",dur:0.22},{note:"E4",dur:0.22},{note:"A4",dur:0.22},
    {note:"B4",dur:0.44},
    {note:"E4",dur:0.22},{note:"Ab4",dur:0.22},{note:"B4",dur:0.22},
    {note:"C5",dur:0.44},
    {note:"E4",dur:0.22},{note:"E5",dur:0.22},{note:"Eb5",dur:0.22},
    {note:"E5",dur:0.22},{note:"Eb5",dur:0.22},{note:"E5",dur:0.22},
    {note:"B4",dur:0.22},{note:"D5",dur:0.22},{note:"C5",dur:0.22},
    {note:"A4",dur:0.44},
    {note:"C4",dur:0.22},{note:"E4",dur:0.22},{note:"A4",dur:0.22},
    {note:"B4",dur:0.44},
    {note:"E4",dur:0.22},{note:"C5",dur:0.22},{note:"B4",dur:0.22},
    {note:"A4",dur:0.66},
  ] as NoteEvent[],

  odeToJoy: [
    {note:"E4",dur:0.4},{note:"E4",dur:0.4},{note:"F4",dur:0.4},{note:"G4",dur:0.4},
    {note:"G4",dur:0.4},{note:"F4",dur:0.4},{note:"E4",dur:0.4},{note:"D4",dur:0.4},
    {note:"C4",dur:0.4},{note:"C4",dur:0.4},{note:"D4",dur:0.4},{note:"E4",dur:0.4},
    {note:"E4",dur:0.6},{note:"D4",dur:0.2},{note:"D4",dur:0.8},
    {note:"E4",dur:0.4},{note:"E4",dur:0.4},{note:"F4",dur:0.4},{note:"G4",dur:0.4},
    {note:"G4",dur:0.4},{note:"F4",dur:0.4},{note:"E4",dur:0.4},{note:"D4",dur:0.4},
    {note:"C4",dur:0.4},{note:"C4",dur:0.4},{note:"D4",dur:0.4},{note:"E4",dur:0.4},
    {note:"D4",dur:0.6},{note:"C4",dur:0.2},{note:"C4",dur:0.8},
  ] as NoteEvent[],

  musicBox: [
    {note:"C5",dur:0.18},{note:"E5",dur:0.18},{note:"G5",dur:0.18},{note:"E5",dur:0.18},
    {note:"C5",dur:0.18},{note:"G4",dur:0.18},{note:"C5",dur:0.36},
    {note:"D5",dur:0.18},{note:"F5",dur:0.18},{note:"A5",dur:0.18},{note:"F5",dur:0.18},
    {note:"D5",dur:0.18},{note:"A4",dur:0.18},{note:"D5",dur:0.36},
    {note:"E5",dur:0.18},{note:"G5",dur:0.18},{note:"B5",dur:0.18},{note:"G5",dur:0.18},
    {note:"E5",dur:0.18},{note:"B4",dur:0.18},{note:"E5",dur:0.36},
    {note:"C5",dur:0.18},{note:"E5",dur:0.18},{note:"G5",dur:0.36},
    {note:"A5",dur:0.18},{note:"G5",dur:0.18},{note:"E5",dur:0.18},{note:"C5",dur:0.36},
  ] as NoteEvent[],

  eineKleine: [
    {note:"G4",dur:0.15},{note:"D4",dur:0.15},{note:"G4",dur:0.3},
    {note:"G4",dur:0.15},{note:"D4",dur:0.15},{note:"G4",dur:0.3},
    {note:"G4",dur:0.15},{note:"B4",dur:0.15},{note:"D5",dur:0.3},
    {note:"D5",dur:0.6},
    {note:"A4",dur:0.15},{note:"Gb4",dur:0.15},{note:"A4",dur:0.3},
    {note:"A4",dur:0.15},{note:"Gb4",dur:0.15},{note:"A4",dur:0.3},
    {note:"A4",dur:0.15},{note:"D5",dur:0.15},{note:"Gb5",dur:0.3},
    {note:"Gb5",dur:0.6},
  ] as NoteEvent[],
};

/* Synthwave arpeggio pattern */
export const SYNTH_ARP_NOTES = ["C4","E4","G4","B4","C5","B4","G4","E4"];
export const SYNTH_BASS = ["C3","C3","G3","G3","A3","A3","F3","F3"];

/* Piano key layout */
export const PIANO_KEYS = [
  {note:"C4",black:false},{note:"Db4",black:true},{note:"D4",black:false},{note:"Eb4",black:true},
  {note:"E4",black:false},{note:"F4",black:false},{note:"Gb4",black:true},{note:"G4",black:false},
  {note:"Ab4",black:true},{note:"A4",black:false},{note:"Bb4",black:true},{note:"B4",black:false},
  {note:"C5",black:false},{note:"Db5",black:true},{note:"D5",black:false},{note:"Eb5",black:true},
  {note:"E5",black:false},{note:"F5",black:false},{note:"Gb5",black:true},{note:"G5",black:false},
  {note:"Ab5",black:true},{note:"A5",black:false},{note:"Bb5",black:true},{note:"B5",black:false},
];

/* Sequencer note rows */
export const SEQ_NOTES = ["E5","C5","A4","E4"];

/* ─── Instrument Envelopes ─────────────────────────────────────────── */
type Instrument = "piano" | "synth" | "bell" | "pad" | "musicbox" | "click";

interface Envelope {
  type: OscillatorType;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  harmonics?: number[];
  filterFreq?: number;
  detune?: number;
}

const INSTRUMENTS: Record<Instrument, Envelope> = {
  piano:    { type: "triangle", attack: 0.005, decay: 0.2,  sustain: 0.3, release: 0.4, filterFreq: 4000 },
  synth:    { type: "sawtooth", attack: 0.01,  decay: 0.1,  sustain: 0.6, release: 0.3, filterFreq: 2000, detune: 5 },
  bell:     { type: "sine",     attack: 0.001, decay: 0.4,  sustain: 0.0, release: 0.8, harmonics: [1, 2.4, 5.2] },
  pad:      { type: "sine",     attack: 0.5,   decay: 0.3,  sustain: 0.8, release: 1.0, detune: 8 },
  musicbox: { type: "sine",     attack: 0.001, decay: 0.15, sustain: 0.0, release: 0.5, harmonics: [1, 3, 5] },
  click:    { type: "square",   attack: 0.001, decay: 0.02, sustain: 0.0, release: 0.01 },
};

/* ─── useAudio Hook ────────────────────────────────────────────────── */
export function useAudio(defaultVolume = 0.35) {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const arpRef = useRef<number | null>(null);
  const padOscsRef = useRef<OscillatorNode[]>([]);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  const init = useCallback(() => {
    if (ctxRef.current) { setReady(true); return ctxRef.current; }
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = defaultVolume;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    setReady(true);
    return ctx;
  }, [defaultVolume]);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) return init();
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, [init]);

  const toggleMute = useCallback(() => {
    if (!masterRef.current) return;
    const next = !muted;
    masterRef.current.gain.value = next ? 0 : defaultVolume;
    setMuted(next);
  }, [muted, defaultVolume]);

  const setVolume = useCallback((v: number) => {
    if (masterRef.current) masterRef.current.gain.value = v;
  }, []);

  /* Core: play a single note with ADSR envelope */
  const playNote = useCallback((note: string, duration: number, instrument: Instrument = "piano", time?: number) => {
    const ctx = getCtx();
    if (!ctx || !masterRef.current) return;
    const freq = F[note];
    if (!freq) return;

    const env = INSTRUMENTS[instrument];
    const now = time ?? ctx.currentTime;
    const endTime = now + duration + env.release;

    const createVoice = (f: number, detuneCents: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = env.type;
      osc.frequency.value = f;
      osc.detune.value = detuneCents;

      // ADSR
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.4, now + env.attack);
      gain.gain.linearRampToValueAtTime(0.4 * env.sustain, now + env.attack + env.decay);
      gain.gain.setValueAtTime(0.4 * env.sustain, now + duration);
      gain.gain.linearRampToValueAtTime(0.001, endTime);

      if (env.filterFreq) {
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = env.filterFreq;
        osc.connect(filter);
        filter.connect(gain);
      } else {
        osc.connect(gain);
      }
      gain.connect(masterRef.current!);
      osc.start(now);
      osc.stop(endTime + 0.05);
    };

    if (env.harmonics) {
      env.harmonics.forEach((h, i) => createVoice(freq * h, (i - 1) * 2));
    } else {
      createVoice(freq, 0);
      if (env.detune) createVoice(freq, env.detune);
    }
  }, [getCtx]);

  /* Play a melody sequence */
  const playMelody = useCallback((
    melody: NoteEvent[],
    instrument: Instrument = "piano",
    tempo = 1,
    onNote?: (index: number) => void
  ) => {
    const ctx = getCtx();
    if (!ctx) return;
    let time = ctx.currentTime;
    melody.forEach((ev, i) => {
      const dur = ev.dur / tempo;
      playNote(ev.note, dur * 0.9, instrument, time);
      if (onNote) {
        const delay = (time - ctx.currentTime) * 1000;
        setTimeout(() => onNote(i), Math.max(0, delay));
      }
      time += dur;
    });
  }, [getCtx, playNote]);

  /* Play a chord */
  const playChord = useCallback((notes: string[], duration: number, instrument: Instrument = "piano") => {
    notes.forEach((n) => playNote(n, duration, instrument));
  }, [playNote]);

  /* Start an arpeggiator loop */
  const startArpeggio = useCallback((notes: string[], bpm = 140, instrument: Instrument = "synth") => {
    stopArpeggio();
    const ctx = getCtx();
    if (!ctx) return;
    let i = 0;
    const intervalMs = (60 / bpm) * 1000;
    const dur = intervalMs / 1000 * 0.8;
    const id = window.setInterval(() => {
      playNote(notes[i % notes.length], dur, instrument);
      i++;
    }, intervalMs);
    arpRef.current = id;
  }, [getCtx, playNote]);

  const stopArpeggio = useCallback(() => {
    if (arpRef.current !== null) {
      clearInterval(arpRef.current);
      arpRef.current = null;
    }
  }, []);

  /* Ambient pad */
  const startPad = useCallback((notes: string[]) => {
    stopPad();
    const ctx = getCtx();
    if (!ctx || !masterRef.current) return;
    const oscs: OscillatorNode[] = [];
    notes.forEach((n) => {
      const freq = F[n];
      if (!freq) return;
      [0, 3, -3].forEach((det) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.detune.value = det;
        gain.gain.value = 0.06;
        osc.connect(gain);
        gain.connect(masterRef.current!);
        osc.start();
        oscs.push(osc);
      });
    });
    padOscsRef.current = oscs;
  }, [getCtx]);

  const stopPad = useCallback(() => {
    padOscsRef.current.forEach((o) => { try { o.stop(); } catch {} });
    padOscsRef.current = [];
  }, []);

  /* Fun sounds */
  const playSuccess = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    ["C5","E5","G5","C5"].forEach((n, i) => {
      playNote(n, 0.2, "bell", t + i * 0.12);
    });
  }, [getCtx, playNote]);

  const playClick = useCallback(() => {
    playNote("C5", 0.05, "click");
  }, [playNote]);

  /* Cleanup */
  const cleanup = useCallback(() => {
    stopArpeggio();
    stopPad();
    if (ctxRef.current) ctxRef.current.close();
    ctxRef.current = null;
  }, [stopArpeggio, stopPad]);

  return {
    init, playNote, playMelody, playChord,
    startArpeggio, stopArpeggio, startPad, stopPad,
    playSuccess, playClick, cleanup,
    toggleMute, setVolume, muted, ready,
  };
}

/* ─── Audio Control Button ─────────────────────────────────────────── */
export function AudioToggle({
  muted,
  ready,
  onToggle,
  onInit,
  className = "",
  activeColor = "#D4AF37",
}: {
  muted: boolean;
  ready: boolean;
  onToggle: () => void;
  onInit: () => void;
  className?: string;
  activeColor?: string;
}) {
  return (
    <button
      onClick={() => { if (!ready) onInit(); onToggle(); }}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${className}`}
      style={{
        borderColor: `${activeColor}60`,
        backgroundColor: muted ? "rgba(0,0,0,0.6)" : `${activeColor}20`,
        color: activeColor,
      }}
      title={muted || !ready ? "Enable sound" : "Mute sound"}
    >
      {muted || !ready ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      )}
    </button>
  );
}
