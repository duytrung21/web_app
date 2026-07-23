import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Loader2, 
  Play, 
  RotateCcw, 
  X, 
  Film, 
  Volume2, 
  VolumeX, 
  Pause, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { POPULAR_ANIME_DB } from '../constants/animeDb';

export default function AnimeStoryboard() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedAnimeKey, setSelectedAnimeKey] = useState('naruto');
  
  // Storyboard state
  const [storyboard, setStoryboard] = useState(POPULAR_ANIME_DB.naruto);
  const [activeEpisodeIdx, setActiveEpisodeIdx] = useState(0);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  // Saved image URLs
  const [generatedImages, setGeneratedImages] = useState(() => {
    try {
      const saved = localStorage.getItem('auragen_storyboard_images');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Loading state per scene
  const [renderingScenes, setRenderingScenes] = useState({});
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);

  // Lightbox overlay state
  const [lightboxUrl, setLightboxUrl] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState('');

  // Video player states
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);

  useEffect(() => {
    localStorage.setItem('auragen_storyboard_images', JSON.stringify(generatedImages));
  }, [generatedImages]);

  // Load predefined anime
  const handleLoadPopularAnime = (key) => {
    if (isGeneratingStory || isBatchGenerating) return;
    setSelectedAnimeKey(key);
    setStoryboard(POPULAR_ANIME_DB[key]);
    setActiveEpisodeIdx(0);
    setSearchInput('');
  };

  // Generate custom storyboard
  const handleGenerateCustomStoryboard = async (e) => {
    if (e) e.preventDefault();
    if (!searchInput.trim() || isGeneratingStory || isBatchGenerating) return;

    const query = searchInput.trim();
    setIsGeneratingStory(true);
    setSelectedAnimeKey(null);

    // If matches a DB item
    const matchedKey = Object.keys(POPULAR_ANIME_DB).find(
      key => POPULAR_ANIME_DB[key].name.toLowerCase().includes(query.toLowerCase()) || 
             POPULAR_ANIME_DB[key].englishName.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedKey) {
      setStoryboard(POPULAR_ANIME_DB[matchedKey]);
      setSelectedAnimeKey(matchedKey);
      setActiveEpisodeIdx(0);
      setIsGeneratingStory(false);
      return;
    }

    try {
      const systemPrompt = `Hãy đóng vai một biên kịch chuyên nghiệp. Tạo 5 tập phim live-action phác thảo từ anime hoặc phim Nhật Bản mang tên "${query}". Định dạng kết quả trả về là một mảng JSON hợp lệ duy nhất, không có văn bản giải thích nào ngoài JSON. Mảng gồm đúng 5 phần tử đại diện cho 5 tập, mỗi tập có cấu trúc chính xác như sau:
{
  "title": "Tập X: [Tên tập phim tiếng Việt]",
  "duration": "12-15 phút",
  "scenes": [
    {
      "id": "custom_${Date.now()}_X_Y",
      "timestamp": "phút:giây (ví dụ: 03:15)",
      "title": "[Tiêu đề cảnh tiếng Việt]",
      "description": "[Mô tả chi tiết nội dung diễn ra bằng tiếng Việt]",
      "prompt": "[Câu lệnh miêu tả bối cảnh bằng tiếng Anh để vẽ ảnh AI phong cách cinematic live action thực tế, chân thực, hyper-detailed, realistic movie shot, cinematic lighting, depth of field]"
    }
  ]
}
Mỗi tập phải có đúng 5 cảnh xếp theo trình tự thời gian tăng dần từ 00:00 đến 12-15 phút.`;

      const apiUrl = `https://text.pollinations.ai/${encodeURIComponent(systemPrompt)}?private=true`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("API request failed");
      
      const text = await response.text();
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const startIndex = cleanedText.indexOf('[');
      const endIndex = cleanedText.lastIndexOf(']');
      
      if (startIndex !== -1 && endIndex !== -1) {
        const jsonStr = cleanedText.substring(startIndex, endIndex + 1);
        const parsed = JSON.parse(jsonStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStoryboard({
            name: query,
            description: `Storyboard live-action: ${query}.`,
            episodes: parsed
          });
          setActiveEpisodeIdx(0);
          setIsGeneratingStory(false);
          return;
        }
      }
      throw new Error("JSON parse error");
    } catch (err) {
      // Fallback
      setStoryboard(generateProceduralStoryboard(query));
      setActiveEpisodeIdx(0);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  // Local procedural generator
  const generateProceduralStoryboard = (name) => {
    const episodes = Array.from({ length: 5 }, (_, epIdx) => {
      const epNum = epIdx + 1;
      const titles = [
        "Khởi đầu câu chuyện",
        "Gặp gỡ những người bạn",
        "Thử thách đầu tiên",
        "Trận chiến cao trào",
        "Hành trình mới mở ra"
      ];
      
      return {
        title: `Tập ${epNum}: ${titles[epIdx]}`,
        duration: "12:00",
        scenes: Array.from({ length: 5 }, (_, scIdx) => ({
          id: `fallback_${Date.now()}_${epNum}_${scIdx}`,
          timestamp: ["00:00", "03:00", "06:00", "09:00", "12:00"][scIdx],
          title: `Phân cảnh ${scIdx + 1}`,
          description: `Mô tả phân cảnh thứ ${scIdx + 1} của phim ${name} chuyển thể sang phong cách live-action điện ảnh chân thực.`,
          prompt: `A cinematic live-action movie shot of ${name}, scene ${scIdx + 1}, highly detailed, realistic lighting, depth of field.`
        }))
      };
    });

    return {
      name,
      description: `Kịch bản phân cảnh cho: ${name}.`,
      episodes
    };
  };

  // Generate image for a scene
  const handleGenerateSceneImage = async (sceneId, scenePrompt) => {
    if (renderingScenes[sceneId]) return;
    setRenderingScenes(prev => ({ ...prev, [sceneId]: true }));

    try {
      const randomSeed = Math.floor(Math.random() * 999999999) + 1;
      const finalPrompt = `${scenePrompt}, live-action movie screenshot, realistic Japanese face, authentic Japanese features, live-action Japanese cast, realistic skin textures, cinematic lighting, 8k resolution`;
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1024&height=576&model=flux-realism&seed=${randomSeed}&nologo=true`;

      // Preload image
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = resolve;
        img.onerror = reject;
      });

      setGeneratedImages(prev => ({
        ...prev,
        [sceneId]: { url: imageUrl }
      }));
    } catch (err) {
      alert("Không thể tải ảnh. Vui lòng thử lại!");
    } finally {
      setRenderingScenes(prev => ({ ...prev, [sceneId]: false }));
    }
  };

  // Batch generate (Parallel execution)
  const handleGenerateAllEpisodeScenes = async () => {
    if (isBatchGenerating) return;
    const activeEpisode = storyboard.episodes[activeEpisodeIdx];
    if (!activeEpisode) return;

    setIsBatchGenerating(true);
    
    // Trigger all scene generations concurrently
    const promises = activeEpisode.scenes.map(async (scene) => {
      if (!generatedImages[scene.id]) {
        await handleGenerateSceneImage(scene.id, scene.prompt);
      }
    });

    await Promise.all(promises);
    setIsBatchGenerating(false);
  };

  const activeEpisode = storyboard?.episodes?.[activeEpisodeIdx];

  // Vietnamese TTS voice helper
  const speakNarration = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!isTtsEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    
    // Find Vietnamese voice in browser
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.startsWith('vi') || v.lang.startsWith('VI'));
    if (viVoice) {
      utterance.voice = viVoice;
    }
    
    utterance.rate = 0.85; // Slightly slower, cinematic speed
    window.speechSynthesis.speak(utterance);
  };

  // Video playback timing effect
  useEffect(() => {
    let timer;
    if (isVideoOpen && isVideoPlaying && activeEpisode) {
      const activeScene = activeEpisode.scenes[currentSceneIdx];
      if (activeScene) {
        speakNarration(activeScene.description);
      }

      timer = setTimeout(() => {
        if (currentSceneIdx < activeEpisode.scenes.length - 1) {
          setCurrentSceneIdx(prev => prev + 1);
        } else {
          // Pause at end of loop
          setIsVideoPlaying(false);
          window.speechSynthesis.cancel();
        }
      }, 7500); // 7.5 seconds per scene for panning & speaking
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isVideoOpen, isVideoPlaying, currentSceneIdx, isTtsEnabled, activeEpisode]);

  // Handle manual navigation in video player
  const handleSelectVideoScene = (idx) => {
    if (!activeEpisode) return;
    setCurrentSceneIdx(idx);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const activeScene = activeEpisode.scenes[idx];
    if (activeScene && isVideoPlaying) {
      // Small timeout to allow state transition
      setTimeout(() => speakNarration(activeScene.description), 50);
    }
  };

  // Open player overlay
  const handleOpenVideoPlayer = () => {
    if (!activeEpisode) return;
    setCurrentSceneIdx(0);
    setIsVideoOpen(true);
    setIsVideoPlaying(true);
  };

  // Close player overlay
  const handleCloseVideoPlayer = () => {
    setIsVideoOpen(false);
    setIsVideoPlaying(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-6xl mx-auto p-4">
      
      {/* Search & Selection Bar */}
      <div className="glass-panel p-5 bg-card/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <form onSubmit={handleGenerateCustomStoryboard} className="flex-1 flex gap-2 w-full">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={isGeneratingStory || isBatchGenerating}
            placeholder="Nhập tên Anime (ví dụ: Naruto, Totoro, Conan...)"
            className="form-input text-sm h-10 bg-input/80"
          />
          <button
            type="submit"
            disabled={isGeneratingStory || isBatchGenerating || !searchInput.trim()}
            className="btn-primary px-5 rounded-lg text-xs font-bold shrink-0 h-10"
          >
            {isGeneratingStory ? "Đang viết..." : "Tạo Kịch Bản"}
          </button>
        </form>

        {/* Quick Suggestions */}
        <div className="flex flex-wrap gap-1.5 justify-center md:justify-end">
          {Object.keys(POPULAR_ANIME_DB).slice(0, 5).map((key) => (
            <button
              key={key}
              onClick={() => handleLoadPopularAnime(key)}
              disabled={isGeneratingStory || isBatchGenerating}
              className={`px-2.5 py-1 rounded text-[11px] font-bold border transition ${
                selectedAnimeKey === key
                  ? 'bg-purple/25 text-purple border-purple'
                  : 'bg-white/5 text-text-secondary border-white/5 hover:text-white'
              }`}
            >
              {POPULAR_ANIME_DB[key].name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {isGeneratingStory && (
        <div className="glass-panel p-8 bg-black/40 flex flex-col items-center justify-center min-h-[180px] text-center gap-3">
          <Loader2 className="w-8 h-8 text-purple animate-spin" />
          <p className="text-xs text-text-secondary">Biên kịch AI đang phân tích và chuẩn bị phân cảnh...</p>
        </div>
      )}

      {/* Main Content Area */}
      {!isGeneratingStory && storyboard && (
        <div className="storyboard-layout">
          
          {/* Episode Tabs Side */}
          <div className="flex flex-col gap-2 w-full">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider pl-1">Danh sách tập</span>
            <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {storyboard.episodes.map((ep, idx) => (
                <button
                  key={idx}
                  onClick={() => !isBatchGenerating && setActiveEpisodeIdx(idx)}
                  disabled={isBatchGenerating}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    activeEpisodeIdx === idx
                      ? 'bg-purple text-white'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  Tập {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerateAllEpisodeScenes}
              disabled={isBatchGenerating || !activeEpisode}
              className="btn-neon-cyan text-[11px] font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 mt-2 w-full"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isBatchGenerating ? "Đang tạo tất cả..." : "Tạo ảnh cả tập"}
            </button>

            <button
              onClick={handleOpenVideoPlayer}
              disabled={isBatchGenerating || !activeEpisode}
              className="btn-primary text-[11px] font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 mt-1.5 w-full bg-indigo"
              style={{ background: 'linear-gradient(135deg, var(--indigo), var(--cyan))' }}
            >
              <Film className="w-3.5 h-3.5" />
              Xem Video Tập này
            </button>
          </div>

          {/* Scene Cards List */}
          <div className="flex flex-col gap-4 w-full">
            {activeEpisode && activeEpisode.scenes.map((scene, idx) => {
              const imgObj = generatedImages[scene.id];
              const isRendering = renderingScenes[scene.id];
              
              return (
                <div key={scene.id} className="glass-panel p-4 bg-card/50 flex flex-col sm:flex-row gap-4 items-center">
                  
                  {/* Left: 16:9 Image container */}
                  <div className="w-full sm:w-48 aspect-[16/9] rounded-lg overflow-hidden bg-slate-950 border border-white/5 flex items-center justify-center shrink-0 relative">
                    {isRendering && (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-1.5 z-10">
                        <Loader2 className="w-5 h-5 text-cyan animate-spin" />
                        <span className="text-[9px] text-white">Đang vẽ...</span>
                      </div>
                    )}

                    {!imgObj && !isRendering && (
                      <button
                        onClick={() => handleGenerateSceneImage(scene.id, scene.prompt)}
                        disabled={isBatchGenerating}
                        className="btn-primary text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-sm"
                      >
                        Vẽ ảnh cảnh {idx + 1}
                      </button>
                    )}

                    {imgObj && !isRendering && (
                      <div className="relative w-full h-full group">
                        <img
                          src={imgObj.url}
                          alt={scene.title}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => {
                            setLightboxUrl(imgObj.url);
                            setLightboxTitle(`Cảnh ${idx + 1}: ${scene.title}`);
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGenerateSceneImage(scene.id, scene.prompt);
                          }}
                          disabled={isBatchGenerating || isRendering}
                          className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/90 text-white text-[9px] font-bold px-2 py-1 rounded border border-white/10 flex items-center gap-1 transition shadow z-10"
                          title="Vẽ lại phân cảnh này"
                        >
                          <RotateCcw className="w-3 h-3 text-cyan" />
                          Vẽ lại
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right: Narrative Details */}
                  <div className="flex-1 flex flex-col gap-1 text-left w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-cyan/15 text-cyan font-mono px-1.5 py-0.5 rounded font-bold">
                        {scene.timestamp}
                      </span>
                      <h4 className="text-xs font-bold text-white leading-none">
                        Cảnh {idx + 1}: {scene.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
                      {scene.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Cinematic Episode Video Player Modal */}
      {isVideoOpen && activeEpisode && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: 1000 }}
        >
          {/* Main Player view */}
          <div className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl flex items-center justify-center group">
            
            {/* Slide active image rendering */}
            {(() => {
              const activeScene = activeEpisode.scenes[currentSceneIdx];
              const sceneImg = generatedImages[activeScene.id];
              
              if (sceneImg) {
                return (
                  <img
                    key={activeScene.id}
                    src={sceneImg.url}
                    alt={activeScene.title}
                    className={`w-full h-full object-cover transition-transform duration-[7500ms] ${
                      isVideoPlaying 
                        ? (currentSceneIdx % 2 === 0 ? 'animate-kenburns-in' : 'animate-kenburns-out') 
                        : 'scale-100'
                    }`}
                  />
                );
              } else {
                return (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-text-secondary h-full gap-3 bg-slate-950">
                    <Loader2 className={`w-8 h-8 text-cyan ${isVideoPlaying ? 'animate-spin' : ''}`} />
                    <h4 className="text-sm font-bold text-white">Phân cảnh này chưa được vẽ ảnh</h4>
                    <p className="text-[11px] max-w-[280px]">
                      Hãy hoàn thành vẽ tranh cho <strong>Cảnh {currentSceneIdx + 1}</strong> ở bảng phân cảnh để xem trọn vẹn thước phim điện ảnh!
                    </p>
                  </div>
                );
              }
            })()}

            {/* Subtitle Narration Overlay */}
            {activeEpisode.scenes[currentSceneIdx] && (
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md border border-white/5 px-6 py-3 rounded-xl text-center z-10 transition">
                <span className="text-[9px] text-cyan font-mono font-bold uppercase tracking-wider block mb-0.5">
                  Mốc thời gian {activeEpisode.scenes[currentSceneIdx].timestamp}
                </span>
                <p className="text-xs font-semibold text-white leading-relaxed">
                  {activeEpisode.scenes[currentSceneIdx].description}
                </p>
              </div>
            )}

            {/* Header info bar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/5 text-[10px] text-text-secondary font-bold flex items-center gap-1.5">
                <Film className="w-3 h-3 text-purple" />
                <span>{storyboard.name} - {activeEpisode.title.split(': ')[0]}</span>
              </div>
              <button 
                onClick={handleCloseVideoPlayer}
                className="bg-black/60 backdrop-blur-md text-white hover:bg-white/10 rounded-full p-2 border border-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Control Console */}
          <div className="w-full max-w-4xl flex flex-col gap-3 mt-4 bg-card/65 border border-white/5 rounded-xl p-4 backdrop-blur-md">
            
            {/* Scrubber / Progress Bar */}
            <div className="flex gap-2">
              {activeEpisode.scenes.map((s, idx) => {
                const isPastOrActive = idx <= currentSceneIdx;
                const isActive = idx === currentSceneIdx;
                const hasImg = !!generatedImages[s.id];
                
                return (
                  <div
                    key={s.id}
                    onClick={() => handleSelectVideoScene(idx)}
                    className="flex-grow flex flex-col gap-1 cursor-pointer group"
                  >
                    <div className="relative h-1 rounded-full overflow-hidden bg-white/10">
                      <div 
                        className={`absolute inset-y-0 left-0 transition-all duration-300 ${
                          isActive 
                            ? 'w-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]' 
                            : (isPastOrActive ? 'w-full bg-purple' : 'w-0')
                        }`} 
                      />
                    </div>
                    <div className="flex justify-between items-center px-0.5 mt-0.5">
                      <span className={`text-[9px] font-mono ${isActive ? 'text-cyan font-bold' : 'text-text-muted'}`}>
                        {s.timestamp}
                      </span>
                      <span className={`text-[8px] px-1 rounded ${
                        hasImg ? 'bg-emerald/20 text-emerald' : 'bg-red-500/15 text-red-400'
                      }`}>
                        {hasImg ? "Sẵn sàng" : "Trống"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Control buttons bar */}
            <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-3 mt-1">
              
              {/* Play / Pause / Reset */}
              <div className="flex items-center gap-2">
                {isVideoPlaying ? (
                  <button
                    onClick={() => {
                      setIsVideoPlaying(false);
                      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    }}
                    className="bg-purple hover:bg-purple/80 text-white rounded-lg p-2 shadow transition flex items-center justify-center"
                    title="Tạm dừng"
                  >
                    <Pause className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (currentSceneIdx === 4) {
                        setCurrentSceneIdx(0);
                      }
                      setIsVideoPlaying(true);
                    }}
                    className="bg-cyan hover:bg-cyan/80 text-white rounded-lg p-2 shadow transition flex items-center justify-center"
                    title="Phát tiếp"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}
                
                <button
                  onClick={() => handleSelectVideoScene(0)}
                  className="bg-white/5 text-text-secondary hover:text-white rounded-lg p-2 border border-white/5 transition flex items-center justify-center"
                  title="Phát lại từ đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Central Title */}
              <div className="hidden sm:flex flex-col items-center">
                <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">
                  Đang trình chiếu phân cảnh
                </span>
                <span className="text-xs font-bold text-white mt-0.5">
                  Cảnh {currentSceneIdx + 1}: {activeEpisode.scenes[currentSceneIdx]?.title}
                </span>
              </div>

              {/* Prev / Next & TTS controls */}
              <div className="flex items-center gap-3">
                
                {/* Voice Narration Sound switch */}
                <button
                  onClick={() => {
                    const newTts = !isTtsEnabled;
                    setIsTtsEnabled(newTts);
                    if (!newTts && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    } else if (newTts && isVideoPlaying) {
                      const activeScene = activeEpisode.scenes[currentSceneIdx];
                      if (activeScene) speakNarration(activeScene.description);
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition border flex items-center gap-1.5 ${
                    isTtsEnabled
                      ? 'bg-purple/20 text-purple border-purple'
                      : 'bg-white/5 text-text-muted border-white/5'
                  }`}
                  title={isTtsEnabled ? "Tắt đọc lời kể" : "Bật đọc lời kể"}
                >
                  {isTtsEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-purple" />
                      Giọng kể: Bật
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-text-muted" />
                      Giọng kể: Tắt
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSelectVideoScene(Math.max(0, currentSceneIdx - 1))}
                    disabled={currentSceneIdx === 0}
                    className="bg-white/5 text-text-secondary hover:text-white disabled:opacity-30 rounded-lg p-2 border border-white/5 transition flex items-center justify-center"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleSelectVideoScene(Math.min(4, currentSceneIdx + 1))}
                    disabled={currentSceneIdx === 4}
                    className="bg-white/5 text-text-secondary hover:text-white disabled:opacity-30 rounded-lg p-2 border border-white/5 transition flex items-center justify-center"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
