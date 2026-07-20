import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Heart, 
  Share2, 
  RotateCcw, 
  ZoomIn, 
  Image as ImageIcon,
  Loader2,
  Check,
  X,
  FileText
} from 'lucide-react';

const PROGRESS_PHASES = [
  "Đang khởi tạo cấu hình sinh ảnh...",
  "Đang gửi dữ liệu đến cụm GPU hiệu năng cao...",
  "Đang phân tích cú pháp prompt và tối ưu từ khóa...",
  "Đang khuếch tán nhiễu và định hình khung cảnh...",
  "Đang kết xuất pixel và tô điểm màu sắc...",
  "Đang khử nhiễu và hoàn thiện các chi tiết tinh xảo...",
  "Đang lưu hình ảnh và đồng bộ hóa thư viện..."
];

export default function PreviewPanel({
  activeImage,
  isGenerating,
  onFavoriteToggle,
  onReuseSettings
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [progressText, setProgressText] = useState(PROGRESS_PHASES[0]);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Cycle through generation logs to make it feel responsive and realistic
  useEffect(() => {
    if (!isGenerating) {
      setImageLoaded(false);
      return;
    }
    
    let phaseIdx = 0;
    setProgressText(PROGRESS_PHASES[0]);

    const interval = setInterval(() => {
      if (phaseIdx < PROGRESS_PHASES.length - 1) {
        phaseIdx++;
        setProgressText(PROGRESS_PHASES[phaseIdx]);
      }
    }, 2200);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleCopyLink = () => {
    if (!activeImage) return;
    navigator.clipboard.writeText(activeImage.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPrompt = () => {
    if (!activeImage) return;
    navigator.clipboard.writeText(activeImage.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleDownload = async () => {
    if (!activeImage) return;
    try {
      setIsDownloading(true);
      const response = await fetch(activeImage.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      
      // Clean prompt for filename
      const cleanPrompt = activeImage.prompt
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, '_')
        .substring(0, 30);
      
      link.download = `auragen_${cleanPrompt || 'image'}_${activeImage.seed}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("CORS direct download failed, opening in new tab:", err);
      window.open(activeImage.url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  // Determine container aspect ratio based on active image or current selection
  const getAspectRatioStyle = () => {
    if (activeImage) {
      const parts = activeImage.aspectRatio.split(':');
      if (parts.length === 2) {
        return { aspectRatio: `${parts[0]} / ${parts[1]}` };
      }
    }
    return { aspectRatio: '1 / 1' };
  };

  return (
    <div className="flex flex-col gap-5">
      
      {/* Viewport Screen */}
      <div 
        className="preview-container relative w-full border border-white/10"
        style={getAspectRatioStyle()}
      >
        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-6 text-center">
            {/* Animated Laser Scanner */}
            <div className="scanner-line"></div>
            <Loader2 className="w-10 h-10 text-cyan animate-spin mb-4" />
            <h3 className="text-base font-bold text-white mb-2">Đang sáng tạo bức tranh nghệ thuật</h3>
            <p className="text-xs text-text-secondary max-w-[280px] animate-pulse leading-relaxed">
              {progressText}
            </p>
          </div>
        )}

        {!activeImage && !isGenerating && (
          <div className="flex flex-col items-center justify-center p-8 text-center text-text-muted h-full max-w-[340px]">
            <div className="p-4 bg-white/5 rounded-full mb-4 border border-white/5">
              <ImageIcon className="w-8 h-8 text-text-secondary" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Sẵn Sàng Sáng Tạo</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Nhập mô tả ý tưởng của bạn ở khung bên trái, chọn phong cách yêu thích và bấm nút <strong>Tạo Ảnh</strong> để trải nghiệm sức mạnh của trí tuệ nhân tạo.
            </p>
          </div>
        )}

        {activeImage && !isGenerating && (
          <>
            <div className={`relative w-full h-full flex items-center justify-center group overflow-hidden`}>
              <img
                src={activeImage.url}
                alt={activeImage.prompt}
                className={`w-full h-full object-contain transition-all duration-500 cursor-pointer ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onLoad={() => setImageLoaded(true)}
                onClick={() => setLightboxOpen(true)}
              />
              
              {/* Zoom overlay hint on hover */}
              <div 
                onClick={() => setLightboxOpen(true)}
                className="absolute top-3 right-3 bg-black/60 p-2 rounded-lg text-white opacity-0 group-hover:opacity-100 transition cursor-pointer hover:bg-black/80"
              >
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Control Actions & Technical Specs */}
      {activeImage && !isGenerating && (
        <div className="glass-panel p-5 bg-card/40 flex flex-col gap-4">
          
          {/* Main action buttons */}
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="btn-primary flex-1 py-2.5 rounded-xl text-sm font-bold justify-center"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang tải về...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Tải Xuống PNG
                </>
              )}
            </button>

            <button
              onClick={() => onFavoriteToggle(activeImage.id)}
              className="btn-secondary py-2.5 px-4 rounded-xl text-sm justify-center border border-white/10 text-white"
              title={activeImage.favorite ? "Bỏ yêu thích" : "Yêu thích"}
            >
              <Heart 
                className={`w-4 h-4 ${
                  activeImage.favorite ? 'text-pink fill-pink' : 'text-text-secondary'
                }`} 
              />
            </button>

            <button
              onClick={onReuseSettings}
              className="btn-secondary py-2.5 px-4 rounded-xl text-sm justify-center border border-white/10 text-white flex items-center gap-1.5"
              title="Sử dụng cấu hình này làm thông số hiện tại"
            >
              <RotateCcw className="w-4 h-4 text-cyan" />
              <span className="hidden sm:inline">Dùng lại thông số</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
            <button
              onClick={handleCopyLink}
              className="text-xs text-text-secondary bg-white/5 hover:bg-white/10 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition text-center"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald" />
                  Đã chép liên kết
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-indigo" />
                  Sao chép liên kết ảnh
                </>
              )}
            </button>

            <button
              onClick={handleCopyPrompt}
              className="text-xs text-text-secondary bg-white/5 hover:bg-white/10 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition text-center"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald" />
                  Đã chép prompt
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-indigo" />
                  Sao chép câu lệnh (Prompt)
                </>
              )}
            </button>
          </div>

          {/* Details list */}
          <div className="bg-black/35 rounded-xl p-4 border border-white/5 text-[11px] flex flex-col gap-2.5 text-text-secondary">
            <div className="flex justify-between items-start gap-3">
              <span className="font-semibold text-white shrink-0">Câu lệnh:</span>
              <span className="text-right text-white break-words line-clamp-2" title={activeImage.prompt}>
                {activeImage.prompt}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Mô hình AI:</span>
              <span className="text-cyan font-mono uppercase">{activeImage.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Hạt giống (Seed):</span>
              <span className="text-purple font-mono">{activeImage.seed}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Kích thước:</span>
              <span>{activeImage.aspectRatio} ({activeImage.width}x{activeImage.height}px)</span>
            </div>
          </div>

        </div>
      )}

      {/* Lightbox Backdrop overlay */}
      {lightboxOpen && activeImage && (
        <div 
          className="lightbox-backdrop" 
          onClick={() => setLightboxOpen(false)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-[-40px] right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition border border-white/10"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={activeImage.url} 
              alt={activeImage.prompt} 
              className="lightbox-img" 
            />
            <div className="text-center text-white bg-black/60 py-2 px-6 rounded-full max-w-[80vw] text-xs line-clamp-2">
              {activeImage.prompt}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
