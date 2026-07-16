import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Download, 
  Loader2, 
  Video, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { startSynthTrack } from '../utils/audioSynth';

export default function ExportModal({
  isOpen,
  onClose,
  slides,
  canvasRef,
  selectedTrackId,
  customAudioBuffer, // If user uploaded custom audio
  isPlaying,
  setIsPlaying,
  setCurrentTime
}) {
  const [exportState, setExportState] = useState('idle'); // idle, recording, finished, error
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  
  const recorderRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthRef = useRef(null);
  const customSourceRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Close helper
  const handleClose = () => {
    cleanup();
    onClose();
  };

  const cleanup = () => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      try {
        recorderRef.current.stop();
      } catch (e) {}
    }
    
    if (synthRef.current) {
      synthRef.current.stop();
      synthRef.current = null;
    }

    if (customSourceRef.current) {
      try {
        customSourceRef.current.stop();
      } catch (e) {}
      customSourceRef.current = null;
    }

    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsPlaying(false);
    setExportState('idle');
    setProgress(0);
  };

  const startExport = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setExportState('error');
      return;
    }

    setIsPlaying(false);
    setCurrentTime(0);
    setExportState('recording');
    setProgress(0);

    try {
      // 1. Initialize Web Audio API for recording mix
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      
      const audioDest = audioCtx.createMediaStreamDestination();
      
      // We route the music to both the recording destination AND the user's speakers
      const monitorGain = audioCtx.createGain();
      monitorGain.gain.setValueAtTime(0.2, audioCtx.currentTime); // lower volume during export
      monitorGain.connect(audioCtx.destination);

      // Connect source to destinations
      const routeAudioNode = (sourceNode) => {
        sourceNode.connect(audioDest);
        sourceNode.connect(monitorGain);
      };

      // Play the selected track (either custom uploaded audio or synthesized preset)
      if (customAudioBuffer) {
        // Play uploaded custom MP3 buffer
        const bufferSource = audioCtx.createBufferSource();
        bufferSource.buffer = customAudioBuffer;
        routeAudioNode(bufferSource);
        bufferSource.start(0);
        customSourceRef.current = bufferSource;
      } else {
        // Start procedural synthesizer
        const synth = startSynthTrack(audioCtx, selectedTrackId, audioDest);
        // Connect the synth master output (which we passed to audioDest) to also monitor
        // For convenience, we just start another one routing to monitor
        const monitorSynth = startSynthTrack(audioCtx, selectedTrackId, monitorGain);
        
        synthRef.current = {
          stop: () => {
            synth.stop();
            monitorSynth.stop();
          }
        };
      }

      // 2. Capture Canvas Video Stream (30 FPS)
      const canvasStream = canvas.captureStream(30);
      
      // 3. Merge Video Tracks and Audio Tracks
      const outputTracks = [
        ...canvasStream.getVideoTracks(),
        ...audioDest.stream.getAudioTracks()
      ];
      
      const combinedStream = new MediaStream(outputTracks);

      // 4. Select MIME Type
      const mimeTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
        'video/mp4',
        'video/ogg'
      ];
      
      let selectedMimeType = '';
      for (const type of mimeTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          selectedMimeType = type;
          break;
        }
      }

      if (!selectedMimeType) {
        throw new Error('No supported video recording MIME types found in this browser.');
      }

      // 5. Setup MediaRecorder
      const chunks = [];
      const recorder = new MediaRecorder(combinedStream, {
        mimeType: selectedMimeType,
        videoBitsPerSecond: 2500000 // 2.5 Mbps for crisp HD quality
      });
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        // Compile chunks into final video file
        const blob = new Blob(chunks, { type: selectedMimeType });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setFileSize(blob.size);
        setExportState('finished');
        
        // Clean up audio nodes
        if (synthRef.current) {
          synthRef.current.stop();
          synthRef.current = null;
        }
        if (customSourceRef.current) {
          try { customSourceRef.current.stop(); } catch(e){}
          customSourceRef.current = null;
        }
      };

      // 6. Start recording loop
      recorder.start();
      
      const startTime = performance.now();
      const durationLimit = 30000; // 30 seconds in milliseconds
      
      setIsPlaying(true);

      const updateRecordingFrame = () => {
        const elapsed = performance.now() - startTime;
        const progressPct = Math.min(100, (elapsed / durationLimit) * 100);
        
        setProgress(progressPct);
        setCurrentTime(Math.min(30, elapsed / 1000));

        if (elapsed >= durationLimit) {
          // Stop recording
          if (recorder.state !== 'inactive') {
            recorder.stop();
          }
          setIsPlaying(false);
          setCurrentTime(0);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        } else {
          animationFrameRef.current = requestAnimationFrame(updateRecordingFrame);
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateRecordingFrame);

    } catch (err) {
      console.error(err);
      setExportState('error');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      cleanup();
    }
    return () => cleanup();
  }, [isOpen]);

  if (!isOpen) return null;

  const formattedSize = (fileSize / (1024 * 1024)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="glass-panel w-full max-w-md p-6 relative border-purple/30 overflow-hidden">
        
        {/* Neon accent glow behind card */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            <Video className="w-5 h-5 text-purple" /> Xuất Video 30 giây
          </h3>
          <button 
            onClick={handleClose}
            className="text-text-secondary hover:text-white p-1 rounded-full hover:bg-white/5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content States */}
        <div className="flex flex-col items-center justify-center text-center py-6 min-h-[220px]">
          
          {/* IDLE state */}
          {exportState === 'idle' && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-purple/10 flex items-center justify-center border border-purple/20 mb-2">
                <Video className="w-8 h-8 text-purple glow-effect rounded-full" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Sẵn sàng xuất video</h4>
                <p className="text-sm text-text-secondary mt-1 max-w-xs">
                  Hệ thống sẽ ghi hình các hiệu ứng chuyển động và nhạc nền chất lượng cao trong đúng 30 giây.
                </p>
              </div>
              <button 
                onClick={startExport}
                className="btn-primary mt-3 px-8 py-3 rounded-xl font-bold text-sm w-full"
              >
                Bắt đầu xuất video
              </button>
            </div>
          )}

          {/* RECORDING state */}
          {exportState === 'recording' && (
            <div className="flex flex-col items-center gap-5 w-full">
              {/* Radial Glowing Progress */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle 
                    cx="56" cy="56" r="48" 
                    stroke="rgba(255,255,255,0.05)" 
                    strokeWidth="8" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="56" cy="56" r="48" 
                    stroke="url(#progressGradient)" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray={301.6} 
                    strokeDashoffset={301.6 - (301.6 * progress) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-100 ease-linear"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white font-mono">{Math.floor(progress)}%</span>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Đang Ghi</span>
                </div>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white">Đang xuất các phân cảnh video...</h4>
                <p className="text-xs text-text-secondary mt-1">
                  Vui lòng giữ tab này hoạt động. Trình duyệt đang thu lại hoạt ảnh canvas và giai điệu âm thanh.
                </p>
              </div>
              
              <button 
                onClick={cleanup}
                className="btn-secondary text-xs border-red-500/30 text-red-400 hover:bg-red-500/5 py-1.5 px-4 rounded-lg mt-2"
              >
                Hủy xuất video
              </button>
            </div>
          )}

          {/* FINISHED state */}
          {exportState === 'finished' && (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center border border-emerald/20 mb-2">
                <CheckCircle2 className="w-9 h-9 text-emerald" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Tạo Video Thành Công!</h4>
                <p className="text-xs text-text-secondary mt-1">
                  Dung lượng: <span className="font-mono text-white font-semibold">{formattedSize} MB</span> | Thời lượng: <span className="font-mono text-white font-semibold">30.0s</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full mt-3">
                <a 
                  href={downloadUrl} 
                  download="30s_autovideo_generator.webm"
                  className="btn-neon-cyan py-3 justify-center rounded-xl font-bold text-sm w-full no-underline"
                >
                  <Download className="w-5 h-5" /> Tải Video Về Máy (.webm)
                </a>
                <button 
                  onClick={startExport}
                  className="btn-secondary py-2 justify-center rounded-xl text-xs w-full"
                >
                  Xuất Lại Video Khác
                </button>
              </div>
            </div>
          )}

          {/* ERROR state */}
          {exportState === 'error' && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-2">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Xuất Video Thất Bại</h4>
                <p className="text-sm text-text-secondary mt-1 max-w-xs">
                  Đã xảy ra lỗi trong quá trình kết hợp luồng ghi. Vui lòng đảm bảo trình duyệt của bạn hỗ trợ MediaRecorder API.
                </p>
              </div>
              <button 
                onClick={startExport}
                className="btn-primary mt-3 px-8 py-3 rounded-xl font-bold text-sm w-full"
              >
                Thử lại
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
