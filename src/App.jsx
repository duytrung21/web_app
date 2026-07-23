import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import Header from './components/Header';
import SidebarControls from './components/SidebarControls';
import PreviewPanel from './components/PreviewPanel';
import HistoryGallery from './components/HistoryGallery';
import AnimeStoryboard from './components/AnimeStoryboard';
import { STYLE_PRESETS, ASPECT_RATIOS, PROMPT_IDEAS } from './constants/presets';

export default function App() {
  const [currentMode, setCurrentMode] = useState('single'); // 'single' | 'storyboard'
  // Main state variables
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('none');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [selectedModel, setSelectedModel] = useState('flux');
  const [seed, setSeed] = useState(123456);
  const [isRandomSeed, setIsRandomSeed] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  // History state synced with localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('auragen_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Lỗi khi tải lịch sử từ localStorage:", e);
      return [];
    }
  });

  // Sync history to localStorage
  useEffect(() => {
    localStorage.setItem('auragen_history', JSON.stringify(history));
  }, [history]);

  // Set first history image as active on load if none selected
  useEffect(() => {
    if (history.length > 0 && !activeImage) {
      setActiveImage(history[0]);
    }
  }, [history, activeImage]);

  // Surprise me randomizer
  const handleRandomizePrompt = () => {
    // Pick a random category
    const catIdx = Math.floor(Math.random() * PROMPT_IDEAS.length);
    const category = PROMPT_IDEAS[catIdx];

    // Pick a random item
    const itemIdx = Math.floor(Math.random() * category.items.length);
    const item = category.items[itemIdx];

    setPrompt(item.text);

    // Randomize style to keep it interesting (except none sometimes)
    const styleIdx = Math.floor(Math.random() * STYLE_PRESETS.length);
    setSelectedStyle(STYLE_PRESETS[styleIdx].id);
  };

  // Main generation handler
  const handleGenerateImage = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // 1. Calculate seed
    const finalSeed = isRandomSeed
      ? Math.floor(Math.random() * 999999999) + 1
      : seed;

    if (isRandomSeed) {
      setSeed(finalSeed);
    }

    // 2. Calculate dimensions
    const ratioObj = ASPECT_RATIOS.find(r => r.id === aspectRatio) || ASPECT_RATIOS[0];
    const width = ratioObj.width;
    const height = ratioObj.height;

    // 3. Assemble prompt with style suffixes
    const styleObj = STYLE_PRESETS.find(s => s.id === selectedStyle) || STYLE_PRESETS[0];
    const finalPrompt = `${prompt}${styleObj.promptAdd}`;

    // 4. Construct URL
    // Pollinations format: https://image.pollinations.ai/prompt/{prompt}?width={width}&height={height}&model={model}&seed={seed}&nologo=true
    let imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=${width}&height=${height}&model=${selectedModel}&seed=${finalSeed}&nologo=true`;

    if (negativePrompt.trim()) {
      imageUrl += `&negative=${encodeURIComponent(negativePrompt)}`;
    }

    // 5. Preload image in background to ensure zero flash/blanks on complete
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const newImageItem = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        fullPrompt: finalPrompt,
        negativePrompt: negativePrompt.trim(),
        aspectRatio,
        width,
        height,
        model: selectedModel,
        seed: finalSeed,
        url: imageUrl,
        favorite: false,
        createdAt: new Date().toISOString()
      };

      setHistory(prev => [newImageItem, ...prev]);
      setActiveImage(newImageItem);
      setIsGenerating(false);
    };

    img.onerror = (err) => {
      console.error("Lỗi tải hình ảnh từ AI:", err);
      alert("Không thể kết nối đến máy chủ vẽ tranh AI. Vui lòng kiểm tra kết nối mạng và thử lại.");
      setIsGenerating(false);
    };
  };

  // Toggle favorite flag
  const handleFavoriteToggle = (id) => {
    setHistory(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, favorite: !item.favorite };
        if (activeImage && activeImage.id === id) {
          setActiveImage(updated);
        }
        return updated;
      }
      return item;
    }));
  };

  // Delete item from history
  const handleDeleteItem = (id) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.id !== id);

      // If deleted active image, set active to the next available one
      if (activeImage && activeImage.id === id) {
        setActiveImage(filtered.length > 0 ? filtered[0] : null);
      }

      return filtered;
    });
  };

  // Clear all history logs
  const handleClearAllHistory = () => {
    setHistory([]);
    setActiveImage(null);
  };

  // Load old image configuration into active control form inputs
  const handleReuseSettings = () => {
    if (!activeImage) return;
    setPrompt(activeImage.prompt);
    setNegativePrompt(activeImage.negativePrompt || '');
    setAspectRatio(activeImage.aspectRatio);
    setSelectedModel(activeImage.model);
    setSeed(activeImage.seed);
    setIsRandomSeed(false);

    // Attempt to match selected style preset if it was appended
    const matchedStyle = STYLE_PRESETS.find(s => s.promptAdd && activeImage.fullPrompt.endsWith(s.promptAdd));
    setSelectedStyle(matchedStyle ? matchedStyle.id : 'none');
  };

  // Calculate favorites for header counter
  const favoritesCount = history.filter(item => item.favorite).length;

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Dynamic Header */}
      <Header
        historyCount={history.length}
        favoritesCount={favoritesCount}
      />

      {/* Mode Switcher Tabs */}
      <div className="flex gap-4 mx-6 mt-4 border-b border-white/5 pb-2">
        <button
          onClick={() => setCurrentMode('single')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all relative ${
            currentMode === 'single'
              ? 'text-purple'
              : 'text-text-muted hover:text-white'
          }`}
        >
          Tạo Ảnh Đơn Lẻ
          {currentMode === 'single' && (
            <div className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-purple" style={{ zIndex: 10 }} />
          )}
        </button>
        <button
          onClick={() => setCurrentMode('storyboard')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all relative flex items-center gap-1.5 ${
            currentMode === 'storyboard'
              ? 'text-purple'
              : 'text-text-muted hover:text-white'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          Live-Action Storyboard
          {currentMode === 'storyboard' && (
            <div className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-purple" style={{ zIndex: 10 }} />
          )}
        </button>
      </div>

      {currentMode === 'single' ? (
        /* Main Workspace Layout */
        <main className="app-layout">
          {/* Left Side: Parameters and style presets settings */}
          <div className="w-full">
            <SidebarControls
              prompt={prompt}
              setPrompt={setPrompt}
              negativePrompt={negativePrompt}
              setNegativePrompt={setNegativePrompt}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              seed={seed}
              setSeed={setSeed}
              isRandomSeed={isRandomSeed}
              setIsRandomSeed={setIsRandomSeed}
              isGenerating={isGenerating}
              onGenerate={handleGenerateImage}
              onRandomizePrompt={handleRandomizePrompt}
            />
          </div>

          {/* Right Side: Active Image viewer & Creation History */}
          <div className="flex flex-col gap-6">
            <PreviewPanel
              activeImage={activeImage}
              isGenerating={isGenerating}
              onFavoriteToggle={handleFavoriteToggle}
              onReuseSettings={handleReuseSettings}
            />

            <HistoryGallery
              history={history}
              activeId={activeImage ? activeImage.id : null}
              onSelect={(item) => !isGenerating && setActiveImage(item)}
              onFavoriteToggle={handleFavoriteToggle}
              onDelete={handleDeleteItem}
              onClearAll={handleClearAllHistory}
            />
          </div>
        </main>
      ) : (
        <AnimeStoryboard />
      )}
    </div>
  );
}
