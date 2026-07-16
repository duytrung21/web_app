import React, { useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Music, 
  Layers, 
  Trash2, 
  Plus, 
  Upload, 
  Type, 
  Paintbrush,
  Sparkles,
  PlayCircle
} from 'lucide-react';
import { PRESET_TRACKS } from '../utils/audioSynth';

export default function Controls({
  slides,
  setSlides,
  activeSlideIdx,
  setActiveSlideIdx,
  selectedTrackId,
  setSelectedTrackId,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  onApplyPreset,
  onCustomAudioUpload,
  customAudioName
}) {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Total duration of all slides combined
  const totalDuration = slides.reduce((acc, s) => acc + (s.duration || 7.5), 0);

  // Handle slide input changes
  const updateSlide = (index, fields) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], ...fields };
    setSlides(updated);
  };

  const activeSlide = slides[activeSlideIdx] || slides[0];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateSlide(activeSlideIdx, { bgImage: url });
    }
  };

  const handleAddSlide = () => {
    if (slides.length >= 6) return; // Cap at 6 slides
    // Equalize slide durations to fit exactly 30s
    const newCount = slides.length + 1;
    const newDuration = 30 / newCount;
    
    const newSlide = {
      id: Date.now(),
      duration: newDuration,
      bgType: 'gradient',
      bgGradient: { from: '#312e81', to: '#4f46e5', angle: 135 },
      titleText: `Slide ${newCount} Title`,
      titleColor: '#ffffff',
      titleSize: 50,
      subtitleText: 'Click here to edit slide subtitle',
      subtitleColor: '#a5b4fc',
      subtitleSize: 24,
      textAnimation: 'slide-up',
      transition: 'crossfade'
    };

    const newSlides = [...slides, newSlide].map(s => ({
      ...s,
      duration: 30 / newCount
    }));

    setSlides(newSlides);
    setActiveSlideIdx(newSlides.length - 1);
  };

  const handleRemoveSlide = (idx) => {
    if (slides.length <= 2) return; // Keep at least 2 slides for transition
    const filtered = slides.filter((_, i) => i !== idx);
    const newCount = filtered.length;
    const equalized = filtered.map(s => ({
      ...s,
      duration: 30 / newCount
    }));
    setSlides(equalized);
    setActiveSlideIdx(Math.max(0, idx - 1));
  };

  const handleDurationChange = (val) => {
    const newDuration = parseFloat(val);
    const diff = newDuration - activeSlide.duration;
    
    // Distribute difference proportionally to other slides to maintain exactly 30s total
    const otherSlidesCount = slides.length - 1;
    const deduction = diff / otherSlidesCount;
    
    const updated = slides.map((s, i) => {
      if (i === activeSlideIdx) {
        return { ...s, duration: newDuration };
      } else {
        // clamp duration to at least 2s
        const updatedDur = Math.max(2, s.duration - deduction);
        return { ...s, duration: updatedDur };
      }
    });

    // Final scaling pass to lock EXACTLY at 30.0s due to floating point offsets
    const finalSum = updated.reduce((a, s) => a + s.duration, 0);
    const scaleFactor = 30 / finalSum;
    const finalSlides = updated.map(s => ({
      ...s,
      duration: s.duration * scaleFactor
    }));
    
    setSlides(finalSlides);
  };

  return (
    <div className="flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
      {/* 1. Presets Selection */}
      <div className="glass-panel p-5">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple" /> Mẫu Thiết Kế Nhanh
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => onApplyPreset('tech')}
            className="btn-secondary text-xs py-2 px-1 flex flex-col items-center gap-1 font-semibold text-center hover:text-purple"
          >
            <span>💻 Quảng Cáo Tech</span>
          </button>
          <button 
            onClick={() => onApplyPreset('travel')}
            className="btn-secondary text-xs py-2 px-1 flex flex-col items-center gap-1 font-semibold text-center hover:text-cyan"
          >
            <span>🌅 Du Lịch Mùa Hè</span>
          </button>
          <button 
            onClick={() => onApplyPreset('quote')}
            className="btn-secondary text-xs py-2 px-1 flex flex-col items-center gap-1 font-semibold text-center hover:text-pink"
          >
            <span>✍️ Câu Nói Ý Nghĩa</span>
          </button>
        </div>
      </div>

      {/* 2. Playback / Scrubber controls */}
      <div className="glass-panel p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn-primary p-2 rounded-full"
              style={{ width: '40px', height: '40px', justifyContent: 'center' }}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            </button>
            <button 
              onClick={() => {
                setIsPlaying(false);
                setCurrentTime(0);
              }}
              className="btn-secondary p-2 rounded-full"
              style={{ width: '40px', height: '40px', justifyContent: 'center' }}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
          <span className="font-mono text-sm font-semibold tracking-wider text-secondary">
            {currentTime.toFixed(1)}s / {totalDuration.toFixed(1)}s
          </span>
        </div>

        <input 
          type="range"
          min={0}
          max={totalDuration}
          step={0.1}
          value={currentTime}
          onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
          className="custom-range"
        />
      </div>

      {/* 3. Audio Tracks selection */}
      <div className="glass-panel p-5">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Music className="w-5 h-5 text-cyan" /> Nhạc Nền Video
        </h3>
        <div className="flex flex-col gap-2 mb-3">
          {PRESET_TRACKS.map(t => (
            <label 
              key={t.id} 
              className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                selectedTrackId === t.id && !customAudioName
                  ? 'bg-purple/10 border-purple text-purple' 
                  : 'bg-input border-border text-text-secondary hover:border-white/20'
              }`}
            >
              <input 
                type="radio" 
                name="track" 
                checked={selectedTrackId === t.id && !customAudioName}
                onChange={() => setSelectedTrackId(t.id)}
                className="accent-purple"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold">{t.name}</span>
                <span className="text-[10px] text-text-secondary">{t.description}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="border-t border-border pt-3 mt-3">
          <button 
            onClick={() => fileInputRef.current.click()}
            className={`btn-secondary w-full text-xs py-2 justify-center border-dashed border-2 ${
              customAudioName ? 'border-cyan text-cyan bg-cyan/5' : ''
            }`}
          >
            <Upload className="w-4 h-4" /> {customAudioName ? `Đã tải nhạc: ${customAudioName.slice(0, 18)}...` : 'Tải lên tệp nhạc MP3'}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="audio/*" 
            className="hidden" 
            onChange={onCustomAudioUpload}
          />
        </div>
      </div>

      {/* 4. Slides Timeline */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo" /> Phân Cảnh Slide ({slides.length})
          </h3>
          <button 
            onClick={handleAddSlide}
            disabled={slides.length >= 6}
            className="btn-secondary p-1 rounded-md text-xs gap-1"
          >
            <Plus className="w-4 h-4" /> Thêm Slide
          </button>
        </div>
        
        {/* Slides Tab list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {slides.map((s, idx) => (
            <div key={s.id} className="relative group">
              <button 
                onClick={() => setActiveSlideIdx(idx)}
                className={`py-2 px-3.5 text-xs font-semibold rounded-lg transition-all ${
                  activeSlideIdx === idx 
                    ? 'bg-indigo text-white shadow-md' 
                    : 'bg-input border border-border text-secondary hover:border-white/20'
                }`}
              >
                Slide {idx + 1} ({s.duration.toFixed(1)}s)
              </button>
              {slides.length > 2 && (
                <button 
                  onClick={() => handleRemoveSlide(idx)}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Selected slide attributes */}
        {activeSlide && (
          <div className="flex flex-col gap-4 border-t border-border pt-4">
            {/* Slide Duration */}
            <div>
              <label className="form-label flex justify-between">
                <span>Thời lượng Slide</span>
                <span>{activeSlide.duration.toFixed(1)}s</span>
              </label>
              <input 
                type="range"
                min={2.0}
                max={15.0}
                step={0.1}
                value={activeSlide.duration}
                onChange={(e) => handleDurationChange(e.target.value)}
                className="custom-range"
              />
              <span className="text-[10px] text-text-muted mt-1 block">Tự động cân bằng các phân cảnh khác để tổng thời gian luôn là 30s.</span>
            </div>

            {/* Background Customization */}
            <div>
              <span className="form-label flex items-center gap-1.5"><Paintbrush className="w-4 h-4 text-purple" /> Kiểu Nền</span>
              <div className="flex gap-2 mb-2">
                {[
                  { type: 'color', label: 'Màu Đơn' },
                  { type: 'gradient', label: 'Dải Màu' },
                  { type: 'image', label: 'Hình Ảnh' }
                ].map(item => (
                  <button 
                    key={item.type}
                    onClick={() => updateSlide(activeSlideIdx, { bgType: item.type })}
                    className={`btn-secondary text-[11px] flex-1 py-1.5 capitalize ${
                      activeSlide.bgType === item.type ? 'border-purple text-purple bg-purple/5' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Color settings */}
              {activeSlide.bgType === 'color' && (
                <div className="flex gap-2 items-center">
                  <input 
                    type="color" 
                    value={activeSlide.bgColor || '#1e293b'}
                    onChange={(e) => updateSlide(activeSlideIdx, { bgColor: e.target.value })}
                    className="w-10 h-8 rounded border border-border cursor-pointer bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={activeSlide.bgColor || '#1e293b'}
                    onChange={(e) => updateSlide(activeSlideIdx, { bgColor: e.target.value })}
                    className="form-input text-xs"
                    placeholder="Mã màu HEX"
                  />
                </div>
              )}

              {/* Gradient settings */}
              {activeSlide.bgType === 'gradient' && (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <input 
                      type="color" 
                      value={activeSlide.bgGradient?.from || '#1e1b4b'}
                      onChange={(e) => updateSlide(activeSlideIdx, { 
                        bgGradient: { ...activeSlide.bgGradient, from: e.target.value } 
                      })}
                      className="w-10 h-8 rounded border border-border cursor-pointer bg-transparent"
                    />
                    <input 
                      type="color" 
                      value={activeSlide.bgGradient?.to || '#4c1d95'}
                      onChange={(e) => updateSlide(activeSlideIdx, { 
                        bgGradient: { ...activeSlide.bgGradient, to: e.target.value } 
                      })}
                      className="w-10 h-8 rounded border border-border cursor-pointer bg-transparent"
                    />
                    <div className="flex-1 flex items-center gap-1.5">
                      <input 
                        type="number" 
                        min={0}
                        max={360}
                        value={activeSlide.bgGradient?.angle || 135}
                        onChange={(e) => updateSlide(activeSlideIdx, { 
                          bgGradient: { ...activeSlide.bgGradient, angle: parseInt(e.target.value) || 0 } 
                        })}
                        className="form-input text-xs"
                        placeholder="Góc xoay"
                      />
                      <span className="text-[10px] text-text-secondary">Độ</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Image upload settings */}
              {activeSlide.bgType === 'image' && (
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => imageInputRef.current.click()}
                    className="btn-secondary text-xs py-2 w-full justify-center border-dashed border-2"
                  >
                    <Upload className="w-4 h-4" /> {activeSlide.bgImage ? 'Đổi hình ảnh nền' : 'Chọn ảnh nền từ máy'}
                  </button>
                  <input 
                    type="file" 
                    ref={imageInputRef} 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                  {activeSlide.bgImage && (
                    <div className="relative aspect-video w-full rounded border border-border overflow-hidden bg-black/40">
                      <img src={activeSlide.bgImage} className="w-full h-full object-cover" alt="Background preview" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Typography and Captions */}
            <div>
              <span className="form-label flex items-center gap-1.5"><Type className="w-4 h-4 text-cyan" /> Nội Dung Phụ Đề</span>
              
              {/* Title inputs */}
              <div className="flex flex-col gap-2.5 mt-2 bg-black/20 p-3 rounded-lg border border-border/50">
                <div>
                  <label className="form-label text-[10px]">Tiêu đề chính</label>
                  <input 
                    type="text"
                    value={activeSlide.titleText}
                    onChange={(e) => updateSlide(activeSlideIdx, { titleText: e.target.value })}
                    className="form-input text-xs"
                    placeholder="Nhập tiêu đề phân cảnh"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="form-label text-[10px]">Cỡ chữ</label>
                    <input 
                      type="number"
                      value={activeSlide.titleSize}
                      onChange={(e) => updateSlide(activeSlideIdx, { titleSize: parseInt(e.target.value) || 30 })}
                      className="form-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="form-label text-[10px]">Màu chữ</label>
                    <input 
                      type="color"
                      value={activeSlide.titleColor}
                      onChange={(e) => updateSlide(activeSlideIdx, { titleColor: e.target.value })}
                      className="w-10 h-9 rounded border border-border cursor-pointer bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Subtitle inputs */}
              <div className="flex flex-col gap-2.5 mt-2 bg-black/20 p-3 rounded-lg border border-border/50">
                <div>
                  <label className="form-label text-[10px]">Tiêu đề phụ</label>
                  <input 
                    type="text"
                    value={activeSlide.subtitleText || ''}
                    onChange={(e) => updateSlide(activeSlideIdx, { subtitleText: e.target.value })}
                    className="form-input text-xs"
                    placeholder="Nhập phụ đề hoặc nội dung mô tả"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="form-label text-[10px]">Cỡ chữ</label>
                    <input 
                      type="number"
                      value={activeSlide.subtitleSize}
                      onChange={(e) => updateSlide(activeSlideIdx, { subtitleSize: parseInt(e.target.value) || 20 })}
                      className="form-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="form-label text-[10px]">Màu chữ</label>
                    <input 
                      type="color"
                      value={activeSlide.subtitleColor}
                      onChange={(e) => updateSlide(activeSlideIdx, { subtitleColor: e.target.value })}
                      className="w-10 h-9 rounded border border-border cursor-pointer bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Animations configs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label text-[10px]">Xuất hiện chữ</label>
                <select 
                  value={activeSlide.textAnimation}
                  onChange={(e) => updateSlide(activeSlideIdx, { textAnimation: e.target.value })}
                  className="form-input text-xs"
                >
                  <option value="slide-up">Trượt lên</option>
                  <option value="fade">Mờ hiện</option>
                  <option value="zoom">Phóng to</option>
                </select>
              </div>
              <div>
                <label className="form-label text-[10px]">Chuyển phân cảnh</label>
                <select 
                  value={activeSlide.transition}
                  onChange={(e) => updateSlide(activeSlideIdx, { transition: e.target.value })}
                  className="form-input text-xs"
                >
                  <option value="crossfade">Hòa trộn mờ (Fade)</option>
                  <option value="slide">Trượt trái (Slide)</option>
                  <option value="zoom">Thu phóng (Zoom)</option>
                  <option value="none">Không hiệu ứng</option>
                </select>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
