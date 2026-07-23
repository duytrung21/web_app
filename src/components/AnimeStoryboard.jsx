import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Loader2, Play, RotateCcw, X } from 'lucide-react';
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

      {/* Fullscreen Lightbox Modal */}
      {lightboxUrl && (
        <div 
          className="lightbox-backdrop" 
          onClick={() => setLightboxUrl(null)}
          style={{ zIndex: 999 }}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-[-40px] right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition border border-white/10"
              onClick={() => setLightboxUrl(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={lightboxUrl} 
              alt={lightboxTitle} 
              className="lightbox-img" 
              style={{ maxHeight: '80vh', maxWidth: '85vw' }}
            />
            <div className="text-center text-white bg-black/75 py-2.5 px-6 rounded-full max-w-[80vw] text-xs font-bold border border-white/10">
              {lightboxTitle}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
