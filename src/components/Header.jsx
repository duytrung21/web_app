import React from 'react';
import { Sparkles, History, Heart } from 'lucide-react';

export default function Header({ historyCount, favoritesCount }) {
  return (
    <header className="glass-panel mx-6 mt-6 px-6 py-4 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-purple to-cyan p-2.5 rounded-xl shadow-md glow-effect">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent" style={{ margin: 0 }}>
            AuraGen Studio
          </h1>
          <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">Trình Tạo Ảnh Nghệ Thuật AI Đỉnh Cao</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium text-text-secondary bg-black/30 px-4 py-2 rounded-xl border border-white/5">
        <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
          <History className="w-3.5 h-3.5 text-purple" />
          <span>Đã tạo: <strong className="text-white font-bold">{historyCount}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-pink fill-pink/20" />
          <span>Yêu thích: <strong className="text-white font-bold">{favoritesCount}</strong></span>
        </div>
      </div>
    </header>
  );
}
