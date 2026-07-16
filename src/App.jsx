import React, { useState, useEffect, useRef } from 'react';
import { Video, HelpCircle } from 'lucide-react';
import VideoCanvas from './components/VideoCanvas';
import Controls from './components/Controls';
import ExportModal from './components/ExportModal';
import { startSynthTrack } from './utils/audioSynth';

// 4 slides of 7.5 seconds each = exactly 30.0 seconds
const DEFAULT_SLIDES = [
  {
    id: 1,
    duration: 7.5,
    bgType: 'gradient',
    bgGradient: { from: '#3b0764', to: '#1d4ed8', angle: 135 },
    titleText: 'TỰ ĐỘNG TẠO VIDEO',
    titleColor: '#06b6d4',
    titleSize: 58,
    subtitleText: 'Chạy trực tiếp trên trình duyệt bằng React và HTML5 Canvas',
    subtitleColor: '#e9d5ff',
    subtitleSize: 26,
    textAnimation: 'slide-up',
    transition: 'crossfade'
  },
  {
    id: 2,
    duration: 7.5,
    bgType: 'gradient',
    bgGradient: { from: '#1e3a8a', to: '#111827', angle: 135 },
    titleText: 'HIỆU ỨNG CHUYÊN NGHIỆP',
    titleColor: '#a855f7',
    titleSize: 54,
    subtitleText: 'Hiệu ứng thu phóng hình, hạt bay nghệ thuật và chữ động cuốn hút',
    subtitleColor: '#cbd5e1',
    subtitleSize: 24,
    textAnimation: 'zoom',
    transition: 'slide'
  },
  {
    id: 3,
    duration: 7.5,
    bgType: 'gradient',
    bgGradient: { from: '#4c0519', to: '#581c87', angle: 135 },
    titleText: 'XUẤT VIDEO TRONG NHÁY MẮT',
    titleColor: '#ec4899',
    titleSize: 56,
    subtitleText: 'Bộ ghi MediaRecorder xuất video 30 FPS chất lượng cao cực nhanh',
    subtitleColor: '#fbcfe8',
    subtitleSize: 24,
    textAnimation: 'fade',
    transition: 'zoom'
  },
  {
    id: 4,
    duration: 7.5,
    bgType: 'gradient',
    bgGradient: { from: '#022c22', to: '#064e3b', angle: 135 },
    titleText: 'BẮT ĐẦU TẢI XUỐNG',
    titleColor: '#10b981',
    titleSize: 56,
    subtitleText: 'Nhấn nút xuất video để tải tệp WebM về thiết bị của bạn',
    subtitleColor: '#a7f3d0',
    subtitleSize: 24,
    textAnimation: 'slide-up',
    transition: 'crossfade'
  }
];

export default function App() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [selectedTrackId, setSelectedTrackId] = useState('synthwave');
  
  // Custom audio uploads
  const [customAudioBuffer, setCustomAudioBuffer] = useState(null);
  const [customAudioName, setCustomAudioName] = useState('');
  
  // Playback & Timing
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Audio playback references
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const activeSourceRef = useRef(null);
  const playbackTimerRef = useRef(null);
  const canvasRef = useRef(null);

  // Stop active music playbacks
  const stopAudio = () => {
    if (activeSourceRef.current) {
      activeSourceRef.current.stop();
      activeSourceRef.current = null;
    }
  };

  // Sync music and playback loop
  useEffect(() => {
    // If export modal is open, we let the modal take control of audio context
    if (showExportModal) {
      stopAudio();
      return;
    }

    if (isPlaying) {
      // 1. Initialize Web Audio Context and Analyser
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioContext();
      audioCtxRef.current = ctx;

      // Resume context if suspended (browser security autoplays)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const analyser = analyserRef.current || ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      analyser.connect(ctx.destination);

      // 2. Play Audio Source
      stopAudio();

      if (customAudioBuffer) {
        // Play custom MP3 buffer starting at currentTime offset
        const source = ctx.createBufferSource();
        source.buffer = customAudioBuffer;
        source.connect(analyser);
        
        try {
          source.start(0, currentTime);
          activeSourceRef.current = source;
        } catch (e) {
          console.error('Failed to start audio source at current offset:', e);
        }
      } else if (selectedTrackId) {
        // Start procedural synth play
        const synth = startSynthTrack(ctx, selectedTrackId, analyser);
        activeSourceRef.current = synth;
      }

      // 3. Drive Canvas Animation Loop using High-Precision performance.now()
      const startTime = performance.now();
      const initialOffset = currentTime;

      const tick = () => {
        const elapsed = (performance.now() - startTime) / 1000;
        const nextTime = initialOffset + elapsed;

        if (nextTime >= 30.0) {
          // Loop playback
          setCurrentTime(0);
          setIsPlaying(false);
          stopAudio();
        } else {
          setCurrentTime(nextTime);
          playbackTimerRef.current = requestAnimationFrame(tick);
        }
      };

      playbackTimerRef.current = requestAnimationFrame(tick);
    } else {
      // Clean up when paused
      stopAudio();
      if (playbackTimerRef.current) {
        cancelAnimationFrame(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    }

    return () => {
      stopAudio();
      if (playbackTimerRef.current) {
        cancelAnimationFrame(playbackTimerRef.current);
      }
    };
  }, [isPlaying, selectedTrackId, customAudioBuffer, showExportModal]);

  // Handle custom audio uploads
  const handleCustomAudioUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCustomAudioName(file.name);
    setIsPlaying(false);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const arrayBuffer = evt.target.result;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const tempCtx = new AudioContext();
        
        // Decode MP3 audio into buffer
        const decodedBuffer = await tempCtx.decodeAudioData(arrayBuffer);
        setCustomAudioBuffer(decodedBuffer);
        setSelectedTrackId(null); // turn off synths
        tempCtx.close();
      } catch (err) {
        alert('Could not decode audio. Make sure it is a valid audio file (MP3/WAV).');
        console.error(err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Preset Template Loader
  const handleApplyPreset = (presetType) => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCustomAudioBuffer(null);
    setCustomAudioName('');

    if (presetType === 'tech') {
      setSlides([
        {
          id: 1, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#020617', to: '#1e1b4b', angle: 135 },
          titleText: 'CÔNG NGHỆ MỚI', titleColor: '#06b6d4', titleSize: 58,
          subtitleText: 'Nền tảng xuất video tự động trên trình duyệt', subtitleColor: '#93c5fd', subtitleSize: 24,
          textAnimation: 'slide-up', transition: 'crossfade'
        },
        {
          id: 2, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#1e1b4b', to: '#581c87', angle: 135 },
          titleText: 'KHÔNG CẦN SERVER', titleColor: '#a855f7', titleSize: 54,
          subtitleText: 'Xử lý và stream khung hình 30 FPS cực nhanh', subtitleColor: '#e9d5ff', subtitleSize: 24,
          textAnimation: 'zoom', transition: 'slide'
        },
        {
          id: 3, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#581c87', to: '#0f172a', angle: 135 },
          titleText: 'HỆ THỐNG ÂM THANH', titleColor: '#ec4899', titleSize: 56,
          subtitleText: 'Phân tích sóng nhạc nền sống động theo thời gian thực', subtitleColor: '#fbcfe8', subtitleSize: 24,
          textAnimation: 'fade', transition: 'zoom'
        },
        {
          id: 4, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#0f172a', to: '#020617', angle: 135 },
          titleText: 'TẢI XUỐNG DỄ DÀNG', titleColor: '#10b981', titleSize: 56,
          subtitleText: 'Xuất video trực tiếp lưu về thiết bị máy tính', subtitleColor: '#a7f3d0', subtitleSize: 24,
          textAnimation: 'slide-up', transition: 'crossfade'
        }
      ]);
      setSelectedTrackId('synthwave');
    } else if (presetType === 'travel') {
      setSlides([
        {
          id: 1, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#7c2d12', to: '#ea580c', angle: 135 },
          titleText: 'HÀNH TRÌNH MÙA HÈ', titleColor: '#fef08a', titleSize: 58,
          subtitleText: 'Đi tìm những ánh hoàng hôn rực rỡ nơi hoang dã', subtitleColor: '#ffedd5', subtitleSize: 24,
          textAnimation: 'fade', transition: 'crossfade'
        },
        {
          id: 2, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#ea580c', to: '#f97316', angle: 135 },
          titleText: 'BÌNH YÊN TUYỆT ĐỐI', titleColor: '#ffffff', titleSize: 54,
          subtitleText: 'Đắm mình giữa rừng cây và hít thở bầu không khí trong lành', subtitleColor: '#ffedd5', subtitleSize: 24,
          textAnimation: 'slide-up', transition: 'slide'
        },
        {
          id: 3, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#f97316', to: '#c2410c', angle: 135 },
          titleText: 'KHOẢNH KHẮC VÀNG', titleColor: '#fef08a', titleSize: 56,
          subtitleText: 'Ngắm nhìn đỉnh núi rực cháy trong nắng hoàng hôn', subtitleColor: '#ffedd5', subtitleSize: 24,
          textAnimation: 'zoom', transition: 'zoom'
        },
        {
          id: 4, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#c2410c', to: '#7c2d12', angle: 135 },
          titleText: 'LÊN KẾ HOẠCH NGAY', titleColor: '#ffffff', titleSize: 56,
          subtitleText: 'Bắt đầu cuộc phiêu lưu thiên nhiên của bạn hôm nay', subtitleColor: '#ffedd5', subtitleSize: 24,
          textAnimation: 'slide-up', transition: 'crossfade'
        }
      ]);
      setSelectedTrackId('ambient');
    } else if (presetType === 'quote') {
      setSlides([
        {
          id: 1, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#18181b', to: '#09090b', angle: 135 },
          titleText: 'MƠ LỚN LAO.', titleColor: '#ffffff', titleSize: 58,
          subtitleText: 'Giới hạn duy nhất là những gì tâm trí bạn đặt ra.', subtitleColor: '#a1a1aa', subtitleSize: 22,
          textAnimation: 'zoom', transition: 'crossfade'
        },
        {
          id: 2, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#09090b', to: '#27272a', angle: 135 },
          titleText: 'LUÔN KIÊN TRÌ.', titleColor: '#f43f5e', titleSize: 54,
          subtitleText: 'Sự kỷ luật và nhất quán sẽ đánh bại tài năng thiên bẩm.', subtitleColor: '#e2e8f0', subtitleSize: 22,
          textAnimation: 'fade', transition: 'slide'
        },
        {
          id: 3, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#27272a', to: '#09090b', angle: 135 },
          titleText: 'BỎ QUA XAO NHÃNG.', titleColor: '#6366f1', titleSize: 56,
          subtitleText: 'Hãy chỉ tập trung vào từng bước đi nhỏ phía trước.', subtitleColor: '#cbd5e1', subtitleSize: 22,
          textAnimation: 'slide-up', transition: 'zoom'
        },
        {
          id: 4, duration: 7.5, bgType: 'gradient',
          bgGradient: { from: '#09090b', to: '#18181b', angle: 135 },
          titleText: 'TẠO LỊCH SỬ.', titleColor: '#10b981', titleSize: 56,
          subtitleText: 'Hành động của ngày hôm nay sẽ kiến tạo nên tương lai.', subtitleColor: '#a1a1aa', subtitleSize: 22,
          textAnimation: 'zoom', transition: 'crossfade'
        }
      ]);
      setSelectedTrackId('pulse');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Navbar header */}
      <header className="glass-panel mx-6 mt-6 px-6 py-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple to-cyan p-2.5 rounded-xl shadow-md">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-purple bg-clip-text text-transparent" style={{ margin: 0 }}>
              BeeVideo Studio
            </h1>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">Trình Tạo Video 30s Tự Động</p>
          </div>
        </div>

        <button 
          onClick={() => setShowExportModal(true)}
          className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold glow-effect"
        >
          Xuất Video
        </button>
      </header>

      {/* Workspace Grid Layout */}
      <main className="app-layout">
        {/* Left Side: Video Preview Canvas & instructions */}
        <div className="flex flex-col gap-6">
          <VideoCanvas 
            slides={slides}
            currentTime={currentTime}
            analyser={analyserRef.current}
            isPlaying={isPlaying}
            canvasRef={canvasRef}
          />

          {/* Quick tips panel */}
          <div className="glass-panel p-5 bg-card/40 border-dashed border-border/80 flex items-start gap-4">
            <div className="p-2 bg-indigo/10 rounded-lg text-indigo">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Cách thức hoạt động</h4>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Thêm slide phân cảnh, soạn thảo tiêu đề phụ đề, tải hình ảnh lên hoặc tự thiết kế dải màu nền.
                Chọn một bài nhạc điện tử có sẵn hoặc tải tệp MP3 của riêng bạn. Khi sẵn sàng, nhấn <strong>Xuất Video</strong>.
                Trình duyệt sẽ ghi lại các hoạt ảnh và giai điệu ở thời gian thực để tạo ra thước phim WebM 30 giây HD chất lượng cao tải trực tiếp về máy.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Control Settings Panel */}
        <div className="w-full">
          <Controls 
            slides={slides}
            setSlides={setSlides}
            activeSlideIdx={activeSlideIdx}
            setActiveSlideIdx={setActiveSlideIdx}
            selectedTrackId={selectedTrackId}
            setSelectedTrackId={setSelectedTrackId}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onApplyPreset={handleApplyPreset}
            onCustomAudioUpload={handleCustomAudioUpload}
            customAudioName={customAudioName}
          />
        </div>
      </main>

      {/* Dynamic Export Modal overlay */}
      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        slides={slides}
        canvasRef={canvasRef}
        selectedTrackId={selectedTrackId}
        customAudioBuffer={customAudioBuffer}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentTime={setCurrentTime}
      />
    </div>
  );
}
