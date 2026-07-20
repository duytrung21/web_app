import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  RefreshCw, 
  Maximize2, 
  Layers, 
  Sliders,
  Trash2
} from 'lucide-react';
import { STYLE_PRESETS, ASPECT_RATIOS, AI_MODELS } from '../constants/presets';

export default function SidebarControls({
  prompt,
  setPrompt,
  negativePrompt,
  setNegativePrompt,
  selectedStyle,
  setSelectedStyle,
  aspectRatio,
  setAspectRatio,
  selectedModel,
  setSelectedModel,
  seed,
  setSeed,
  isRandomSeed,
  setIsRandomSeed,
  isGenerating,
  onGenerate,
  onRandomizePrompt
}) {
  const [showTooltip, setShowTooltip] = useState(null);

  const activeStyleObj = STYLE_PRESETS.find(s => s.id === selectedStyle) || STYLE_PRESETS[0];

  return (
    <div className="glass-panel p-6 flex flex-col gap-6 h-full bg-card/60">
      
      {/* 1. Prompt Section */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="form-label font-bold text-white flex items-center gap-1.5" style={{ margin: 0 }}>
            <Sparkles className="w-4 h-4 text-purple" />
            Ý Tưởng Thiết Kế (Prompt)
          </label>
          <div className="flex gap-2">
            <button
              onClick={onRandomizePrompt}
              disabled={isGenerating}
              className="text-xs text-cyan hover:text-cyan/80 bg-cyan/10 hover:bg-cyan/20 px-2 py-1 rounded-md transition flex items-center gap-1 border border-cyan/20 disabled:opacity-40"
            >
              <RefreshCw className="w-3 h-3" />
              Ngẫu nhiên
            </button>
            {prompt && (
              <button
                onClick={() => setPrompt('')}
                disabled={isGenerating}
                className="text-xs text-text-muted hover:text-red-400 bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md transition flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Xóa
              </button>
            )}
          </div>
        </div>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            placeholder="Mô tả chi tiết bức ảnh bạn muốn tạo bằng tiếng Anh để đạt kết quả tốt nhất... (Ví dụ: A majestic elven wizard casting fire magic, highly detailed)"
            className="form-input min-h-[110px] resize-none text-sm leading-relaxed pr-8"
            maxLength={1000}
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-text-muted">
            {prompt.length}/1000
          </div>
        </div>
      </div>

      {/* 2. Preset Style Section */}
      <div className="flex flex-col gap-2">
        <label className="form-label font-bold text-white flex items-center gap-1.5" style={{ margin: 0 }}>
          <Layers className="w-4 h-4 text-purple" />
          Phong Cách Mỹ Thuật
        </label>
        <div className="style-grid max-h-[190px] overflow-y-auto pr-1">
          {STYLE_PRESETS.map((style) => (
            <div
              key={style.id}
              onClick={() => !isGenerating && setSelectedStyle(style.id)}
              className={`style-card ${style.gradient} ${selectedStyle === style.id ? 'active' : ''}`}
            >
              <span className="style-card-text">{style.name}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-text-secondary italic">
          Đang áp dụng: <strong className="text-purple">{activeStyleObj.name}</strong> - {activeStyleObj.description}
        </p>
      </div>

      {/* 3. Aspect Ratio Section */}
      <div className="flex flex-col gap-2">
        <label className="form-label font-bold text-white flex items-center gap-1.5" style={{ margin: 0 }}>
          <Maximize2 className="w-4 h-4 text-purple" />
          Tỷ Lệ Bức Ảnh
        </label>
        <div className="aspect-grid">
          {ASPECT_RATIOS.map((ratio) => {
            const isActive = aspectRatio === ratio.id;
            return (
              <div
                key={ratio.id}
                onClick={() => !isGenerating && setAspectRatio(ratio.id)}
                className={`aspect-card ${isActive ? 'active' : ''}`}
                title={ratio.desc}
              >
                <div 
                  className="aspect-box"
                  style={{
                    width: `${ratio.iconWidth}px`,
                    height: `${ratio.iconHeight}px`,
                    borderColor: isActive ? 'var(--purple)' : 'rgba(255, 255, 255, 0.4)',
                    backgroundColor: isActive ? 'rgba(168, 85, 247, 0.2)' : 'transparent'
                  }}
                />
                <span className="text-[11px] font-bold text-white leading-none">{ratio.id}</span>
                <span className="text-[9px] text-text-muted leading-none">{ratio.name.split(' ')[1] || ratio.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Model Selection */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <label className="form-label font-bold text-white" style={{ margin: 0 }}>
            Mô Hình Trí Tuệ Nhân Tạo (Model)
          </label>
          <div className="relative">
            <HelpCircle 
              className="w-3.5 h-3.5 text-text-muted cursor-pointer hover:text-cyan transition"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className="absolute left-6 bottom-0 w-64 p-3 bg-black/90 border border-white/10 text-white rounded-lg text-xs leading-normal z-50 shadow-2xl">
                Mỗi mô hình được tối ưu cho các kiểu hình ảnh khác nhau. Flux cho chữ và độ chi tiết tốt, Realism tối ưu ảnh chụp thực tế.
              </div>
            )}
          </div>
        </div>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={isGenerating}
          className="form-input text-sm cursor-pointer select-element text-white bg-input border-border"
        >
          {AI_MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        <p className="text-[11px] text-text-secondary">
          {AI_MODELS.find(m => m.id === selectedModel)?.description}
        </p>
      </div>

      {/* 5. Advanced Settings Section */}
      <details className="advanced-accordion">
        <summary className="text-white hover:text-purple transition">
          <span className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5" />
            Cấu hình nâng cao (Seed & Phủ định)
          </span>
        </summary>
        <div className="advanced-content">
          
          {/* Seed Option */}
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex justify-between items-center">
              <label className="form-label text-white text-xs" style={{ margin: 0 }}>Hạt giống sinh ảnh (Seed)</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="random-seed-chk"
                  checked={isRandomSeed}
                  onChange={(e) => setIsRandomSeed(e.target.checked)}
                  disabled={isGenerating}
                  className="cursor-pointer"
                />
                <label htmlFor="random-seed-chk" className="text-[11px] text-text-secondary cursor-pointer select-none">Ngẫu nhiên</label>
              </div>
            </div>
            {!isRandomSeed && (
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                disabled={isGenerating}
                placeholder="Nhập seed (ví dụ: 123456)"
                className="form-input text-xs"
              />
            )}
            <p className="text-[10px] text-text-muted">
              Sử dụng cùng một Seed và cùng một Prompt để tái tạo lại hình ảnh chính xác.
            </p>
          </div>

          {/* Negative prompt */}
          <div className="flex flex-col gap-1.5">
            <label className="form-label text-white text-xs" style={{ margin: 0 }}>Từ khóa loại trừ (Negative Prompt)</label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              disabled={isGenerating}
              placeholder="Ví dụ: ugly, blurry, deformed hands, extra fingers"
              className="form-input text-xs"
            />
            <p className="text-[10px] text-text-muted">
              Yêu cầu AI tránh vẽ các vật thể/chi tiết này (hoạt động tốt với một số model).
            </p>
          </div>
        </div>
      </details>

      {/* 6. Generate Action Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="btn-primary w-full py-3.5 rounded-xl text-base font-bold justify-center mt-2 glow-effect shine-effect disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            Đang phác thảo ảnh nghệ thuật...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            BẮT ĐẦU TẠO ẢNH
          </>
        )}
      </button>

    </div>
  );
}
