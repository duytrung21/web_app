import React, { useState } from 'react';
import { 
  Heart, 
  Trash2, 
  History, 
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';

export default function HistoryGallery({
  history,
  activeId,
  onSelect,
  onFavoriteToggle,
  onDelete,
  onClearAll
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'favorites'

  const filteredHistory = history.filter(item => {
    if (activeTab === 'favorites') return item.favorite;
    return true;
  });

  const handleClearHistory = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử tạo ảnh? Các ảnh yêu thích cũng sẽ bị xóa khỏi lịch sử.")) {
      onClearAll();
    }
  };

  return (
    <div className="glass-panel p-6 bg-card/50 flex flex-col gap-5 border border-white/5">
      
      {/* Gallery Header and Tabs */}
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'all' 
                ? 'bg-purple text-white shadow-md' 
                : 'text-text-secondary hover:text-white bg-white/5'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Lịch sử tạo
          </button>
          
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'favorites' 
                ? 'bg-pink text-white shadow-md' 
                : 'text-text-secondary hover:text-white bg-white/5'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            Yêu thích ({history.filter(h => h.favorite).length})
          </button>
        </div>

        {activeTab === 'all' && history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="text-[11px] text-text-muted hover:text-red-400 hover:bg-red-400/10 px-2.5 py-1.5 rounded-lg transition border border-transparent hover:border-red-400/20"
          >
            Xóa lịch sử
          </button>
        )}
      </div>

      {/* Grid Display Area */}
      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center text-text-muted">
          <ImageIcon className="w-8 h-8 text-text-muted/60 mb-2.5" />
          <h4 className="text-xs font-bold text-white mb-1">
            {activeTab === 'favorites' ? 'Chưa Có Ảnh Yêu Thích' : 'Lịch Sử Trống'}
          </h4>
          <p className="text-[11px] text-text-secondary max-w-[220px] leading-relaxed">
            {activeTab === 'favorites' 
              ? 'Nhấp biểu tượng trái tim trên bức ảnh bạn đã tạo để đưa vào mục này.' 
              : 'Các bức ảnh bạn tạo ra sẽ tự động lưu lại ở đây để xem lại.'}
          </p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredHistory.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={`gallery-card relative ${
                  isActive ? 'border-purple shadow-[0_0_8px_rgba(168,85,247,0.4)]' : ''
                }`}
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt={item.prompt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Favorite badge inside thumbnail */}
                {item.favorite && (
                  <div className="absolute top-2 left-2 bg-pink/90 text-white rounded-full p-1 shadow-md z-10">
                    <Heart className="w-2.5 h-2.5 fill-current" />
                  </div>
                )}

                {/* Hover overlay actions */}
                <div className="gallery-card-overlay">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavoriteToggle(item.id);
                    }}
                    className={`gallery-card-btn ${item.favorite ? 'active-favorite' : ''}`}
                    title={item.favorite ? "Bỏ yêu thích" : "Yêu thích"}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Bạn muốn xóa hình ảnh này khỏi lịch sử?")) {
                        onDelete(item.id);
                      }
                    }}
                    className="gallery-card-btn hover:text-red-400"
                    title="Xóa khỏi lịch sử"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Active Indicator Border Glow */}
                {isActive && (
                  <div className="absolute inset-0 border-2 border-purple rounded-xl pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Decorative helper panel */}
      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5 text-[11px] text-text-secondary leading-relaxed">
        <ChevronRight className="w-4 h-4 text-purple shrink-0 mt-0.5" />
        <p>
          Hình ảnh sinh ra được lưu tự động trên thiết bị của bạn. 
          Các liên kết hình ảnh được cung cấp trực tiếp và tối ưu hóa bằng máy chủ AI của <strong className="text-cyan">Pollinations.ai</strong>.
        </p>
      </div>

    </div>
  );
}
