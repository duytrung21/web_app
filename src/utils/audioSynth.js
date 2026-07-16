// Procedural audio synthesizer for generating high-quality background music tracks dynamically in the browser

export const PRESET_TRACKS = [
  { id: 'synthwave', name: 'Giấc Mơ Neon', description: 'Giai điệu điện tử Cyberpunk thập niên 80' },
  { id: 'ambient', name: 'Thiền Yên Bình', description: 'Hợp âm piano bay bổng thư giãn' },
  { id: 'pulse', name: 'Nhịp Điệu Số', description: 'Giai điệu glitch kỹ thuật số sôi nổi' }
];

export function startSynthTrack(ctx, trackId, destNode) {
  let activeSources = [];
  let schedulerTimer = null;
  let currentBeat = 0;
  
  // Look-ahead scheduling parameters
  const lookAheadTime = 0.15; // How far ahead to schedule audio (sec)
  const scheduleInterval = 40; // How frequently to call scheduler (ms)
  let nextNoteTime = ctx.currentTime;
  
  // Set up master output gain to avoid clipping
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.35, ctx.currentTime);
  masterGain.connect(destNode);

  // Synthwave track chords & pattern (120 BPM, 0.25s per beat/step)
  const synthwaveBass = [55.00, 55.00, 55.00, 55.00, 65.41, 65.41, 73.42, 73.42]; // A1, A1, A1, A1, C2, C2, D2, D2
  const synthwaveMelody = [
    220.00, 261.63, 293.66, 329.63, 0, 392.00, 329.63, 0,
    220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 0
  ];
  
  // Ambient Zen chords (80 BPM, 0.75s per step)
  const ambientChords = [
    [110.0, 220.0, 261.6, 329.6], // Am
    [130.8, 261.6, 329.6, 392.0], // C
    [146.8, 293.7, 349.2, 440.0], // Dm
    [98.0,  196.0, 246.9, 293.7]  // G
  ];

  // Digital pulse notes (140 BPM, 0.15s per step)
  const pulseMelody = [
    261.63, 329.63, 392.00, 523.25, 587.33, 523.25, 392.00, 329.63,
    293.66, 349.23, 440.00, 587.33, 659.25, 587.33, 440.00, 349.23
  ];

  const playSynthwaveStep = (time, step) => {
    // 1. Play Bass Note (Sawtooth + Low Pass Filter for fat retro bass)
    const bassFreq = synthwaveBass[step % synthwaveBass.length];
    
    const bassOsc = ctx.createOscillator();
    const bassFilter = ctx.createBiquadFilter();
    const bassGain = ctx.createGain();
    
    bassOsc.type = 'sawtooth';
    bassOsc.frequency.setValueAtTime(bassFreq, time);
    
    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(180, time);
    bassFilter.frequency.exponentialRampToValueAtTime(100, time + 0.2);
    
    bassGain.gain.setValueAtTime(0.7, time);
    bassGain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
    
    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(masterGain);
    
    bassOsc.start(time);
    bassOsc.stop(time + 0.25);
    activeSources.push(bassOsc);

    // 2. Play Melody Note (Triangle wave with delay/echo simulation)
    const melodyFreq = synthwaveMelody[step % synthwaveMelody.length];
    if (melodyFreq > 0) {
      const leadOsc = ctx.createOscillator();
      const leadGain = ctx.createGain();
      
      leadOsc.type = 'triangle';
      leadOsc.frequency.setValueAtTime(melodyFreq, time);
      
      leadGain.gain.setValueAtTime(0.2, time);
      leadGain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
      
      leadOsc.connect(leadGain);
      leadGain.connect(masterGain);
      
      leadOsc.start(time);
      leadOsc.stop(time + 0.45);
      activeSources.push(leadOsc);
    }
    
    // 3. Play Drum Hi-hat (simulated using white noise or short high-pass square wave)
    if (step % 2 === 0) {
      const hatOsc = ctx.createOscillator();
      const hatGain = ctx.createGain();
      
      hatOsc.type = 'square';
      hatOsc.frequency.setValueAtTime(10000, time);
      
      hatGain.gain.setValueAtTime(0.03, time);
      hatGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
      
      hatOsc.connect(hatGain);
      hatGain.connect(masterGain);
      
      hatOsc.start(time);
      hatOsc.stop(time + 0.06);
      activeSources.push(hatOsc);
    }
  };

  const playAmbientStep = (time, step) => {
    // Slow pads: one chord every 3 seconds
    if (step % 4 !== 0) return;
    
    const chordIdx = Math.floor(step / 4) % ambientChords.length;
    const chord = ambientChords[chordIdx];
    
    chord.forEach((freq, i) => {
      const padOsc = ctx.createOscillator();
      const padGain = ctx.createGain();
      
      padOsc.type = 'sine';
      padOsc.frequency.setValueAtTime(freq, time);
      
      // Gentle fade-in and slow release for atmospheric sound
      padGain.gain.setValueAtTime(0, time);
      padGain.gain.linearRampToValueAtTime(0.12, time + 0.8);
      padGain.gain.setValueAtTime(0.12, time + 2.0);
      padGain.gain.exponentialRampToValueAtTime(0.001, time + 3.0);
      
      padOsc.connect(padGain);
      padGain.connect(masterGain);
      
      padOsc.start(time);
      padOsc.stop(time + 3.0);
      activeSources.push(padOsc);
    });
  };

  const playPulseStep = (time, step) => {
    // 1. Play quick blippy arpeggio
    const freq = pulseMelody[step % pulseMelody.length];
    
    const pulseOsc = ctx.createOscillator();
    const pulseGain = ctx.createGain();
    
    pulseOsc.type = 'sine';
    // Modulate pitch slightly for a chiptune feel
    pulseOsc.frequency.setValueAtTime(freq, time);
    if (step % 4 === 0) {
      pulseOsc.frequency.setValueAtTime(freq * 1.5, time + 0.05);
    }
    
    pulseGain.gain.setValueAtTime(0.25, time);
    pulseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
    
    pulseOsc.connect(pulseGain);
    pulseGain.connect(masterGain);
    
    pulseOsc.start(time);
    pulseOsc.stop(time + 0.15);
    activeSources.push(pulseOsc);

    // 2. Add sub-bass beat on 0 and 8
    if (step % 8 === 0) {
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(120, time);
      kickOsc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
      
      kickGain.gain.setValueAtTime(0.6, time);
      kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
      
      kickOsc.connect(kickGain);
      kickGain.connect(masterGain);
      
      kickOsc.start(time);
      kickOsc.stop(time + 0.15);
      activeSources.push(kickOsc);
    }
  };

  const scheduler = () => {
    while (nextNoteTime < ctx.currentTime + lookAheadTime) {
      // Determine time step size depending on track BPM
      let stepDuration = 0.25; // default 120 BPM eighth notes (0.25s)
      
      if (trackId === 'ambient') {
        stepDuration = 0.75; // 80 BPM quarter notes (0.75s)
        playAmbientStep(nextNoteTime, currentBeat);
      } else if (trackId === 'pulse') {
        stepDuration = 0.15; // 100 BPM 16th notes (0.15s)
        playPulseStep(nextNoteTime, currentBeat);
      } else {
        // default synthwave
        stepDuration = 0.22; // 136 BPM eighth notes
        playSynthwaveStep(nextNoteTime, currentBeat);
      }
      
      nextNoteTime += stepDuration;
      currentBeat++;
    }
    
    // Clean up expired sources from array
    activeSources = activeSources.filter(src => {
      try {
        // If currentTime exceeds scheduled end time (roughly), keep it out of active list
        return src.playbackState !== 'finished'; 
      } catch (e) {
        return true;
      }
    });

    schedulerTimer = setTimeout(scheduler, scheduleInterval);
  };

  // Start scheduling
  scheduler();

  // Return helper to stop all playing notes and timers
  return {
    stop: () => {
      if (schedulerTimer) {
        clearTimeout(schedulerTimer);
        schedulerTimer = null;
      }
      activeSources.forEach(src => {
        try {
          src.stop();
        } catch (e) {}
      });
      activeSources = [];
    }
  };
}
