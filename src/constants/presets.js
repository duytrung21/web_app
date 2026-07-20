// Preset styles and configs for the AuraGen Studio AI Image Generator

export const STYLE_PRESETS = [
  {
    id: 'none',
    name: 'Mặc định',
    promptAdd: '',
    gradient: 'from-slate-700 to-slate-900',
    description: 'Giữ nguyên prompt gốc của bạn'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    promptAdd: ', cyberpunk style, neon glows, futuristic street environment, high contrast, wet asphalt with glowing reflections, detailed mechanical elements, volumetric fog, octane render',
    gradient: 'from-pink-500 via-purple-600 to-indigo-700',
    description: 'Thế giới tương lai ngập tràn ánh đèn neon rực rỡ'
  },
  {
    id: 'anime',
    name: 'Anime & Manga',
    promptAdd: ', anime style illustration, vibrant color palette, clean vector outlines, dynamic lighting, beautiful eyes, aesthetic studio ghibli or makoto shinkai style key visual, detailed background, 8k resolution',
    gradient: 'from-cyan-400 via-sky-500 to-blue-600',
    description: 'Phong cách hoạt hình Nhật Bản sắc nét và đầy màu sắc'
  },
  {
    id: 'cinematic',
    name: 'Cinematic Photo',
    promptAdd: ', realistic cinematic photo, shot on 35mm lens, f/1.8 aperture, natural moody lighting, depth of field, subtle film grain, photorealistic, hyper-detailed, award-winning composition',
    gradient: 'from-amber-600 via-orange-700 to-red-800',
    description: 'Thước phim điện ảnh chân thực với chiều sâu sắc nét'
  },
  {
    id: 'pixar',
    name: '3D Pixar/Disney',
    promptAdd: ', 3d stylized render, cute character design, soft glossy texture, warm cinematic studio lighting, vibrant colors, raytracing, octane render, unreal engine 5, detailed clay model style',
    gradient: 'from-teal-400 via-emerald-500 to-indigo-500',
    description: 'Tạo hình nhân vật hoạt hình 3D dễ thương, bóng bẩy'
  },
  {
    id: 'watercolor',
    name: 'Tranh Thủy Mặc/Màu Nước',
    promptAdd: ', beautiful watercolor painting, splatters of paint, soft color blending, artistic splash, ink run, canvas paper texture, dreamy atmosphere, elegant strokes',
    gradient: 'from-rose-400 via-pink-400 to-amber-300',
    description: 'Nghệ thuật màu nước loang mềm mại đầy chất thơ'
  },
  {
    id: 'pixel',
    name: 'Pixel Art Retro',
    promptAdd: ', retro 16-bit pixel art style, detailed sprite, nostalgic arcade aesthetic, restricted color palette, pixel perfect',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    description: 'Phong cách đồ họa 16-bit cổ điển hoài niệm'
  },
  {
    id: 'oil-painting',
    name: 'Tranh Sơn Dầu',
    promptAdd: ', classical oil painting, thick visible textured brush strokes, impasto technique, warm lighting, fine art canvas, rich pigment colors, museum masterpiece style',
    gradient: 'from-yellow-600 via-amber-700 to-stone-800',
    description: 'Tác phẩm sơn dầu cổ điển với những nét cọ dày dặn'
  },
  {
    id: 'dark-fantasy',
    name: 'Dark Fantasy',
    promptAdd: ', gothic dark fantasy style, mysterious moody atmosphere, intricate armor and details, glowing embers, smoke and shadow play, dramatic chiaroscuro lighting, dark epic concept art',
    gradient: 'from-gray-800 via-slate-900 to-black',
    description: 'Thế giới huyền ảo tăm tối, ma mị và đầy bí ẩn'
  }
];

export const ASPECT_RATIOS = [
  {
    id: '1:1',
    name: '1:1 Vuông',
    width: 1024,
    height: 1024,
    desc: 'Bài viết Social, Avatar',
    iconWidth: 16,
    iconHeight: 16
  },
  {
    id: '16:9',
    name: '16:9 Ngang',
    width: 1024,
    height: 576,
    desc: 'Hình nền, YouTube, Slide',
    iconWidth: 24,
    iconHeight: 14
  },
  {
    id: '9:16',
    name: '9:16 Dọc',
    width: 576,
    height: 1024,
    desc: 'TikTok, Reels, Story',
    iconWidth: 14,
    iconHeight: 24
  },
  {
    id: '4:3',
    name: '4:3 Standard',
    width: 1024,
    height: 768,
    desc: 'Ảnh chụp máy cơ truyền thống',
    iconWidth: 20,
    iconHeight: 16
  },
  {
    id: '21:9',
    name: '21:9 Siêu Rộng',
    width: 1024,
    height: 440,
    desc: 'Cinematic Ultra-wide',
    iconWidth: 28,
    iconHeight: 12
  }
];

export const AI_MODELS = [
  {
    id: 'flux',
    name: 'Flux (Mặc định)',
    description: 'Chất lượng ảnh cực cao, hiểu câu lệnh xuất sắc, vẽ chữ tốt.'
  },
  {
    id: 'flux-realism',
    name: 'Flux Realism',
    description: 'Tối ưu hóa đặc biệt cho ảnh chụp thực tế, chân dung con người.'
  },
  {
    id: 'flux-anime',
    name: 'Flux Anime',
    description: 'Chuyên biệt cho phong cách hoạt hình anime, manga và minh họa.'
  },
  {
    id: 'flux-3d',
    name: 'Flux 3D',
    description: 'Tạo hình ảnh kết xuất 3D giống như đồ chơi, mô hình đất sét hoặc CGI.'
  },
  {
    id: 'turbo',
    name: 'Turbo Speed',
    description: 'Tốc độ tạo ảnh nhanh nhất, phù hợp cho các thử nghiệm nhanh.'
  },
  {
    id: 'sana',
    name: 'Sana (Siêu tốc)',
    description: 'Model tốc độ cao thế hệ mới, giữ độ phân giải và chi tiết tốt.'
  }
];

export const PROMPT_IDEAS = [
  {
    category: 'Khoa Học Viễn Tưởng',
    items: [
      {
        title: 'Thành phố mây hoàng hôn',
        text: 'A futuristic city built on top of clouds, flying neon-lit vehicles commuting between massive crystal towers at sunset, cyberpunk theme'
      },
      {
        title: 'Trạm nghiên cứu vũ trụ',
        text: 'An astronaut working inside a high-tech biolab on Mars, glowing green alien plants in glass tubes, giant window looking out to the red planet horizon'
      },
      {
        title: 'Người máy sinh học cổ đại',
        text: 'An ancient robotic golem covered in moss and flowers, standing in the middle of a dense primeval forest, eyes glowing with gentle blue light'
      }
    ]
  },
  {
    category: 'Huyền Ảo / Fantasy',
    items: [
      {
        title: 'Cổng ma thuật trong rừng',
        text: 'A glowing magical stone portal in an ancient forest, emitting sparkling stardust, mystical blue deer walking through, ethereal fantasy atmosphere'
      },
      {
        title: 'Lâu đài trên vách đá',
        text: 'A majestic gothic castle perched on a floating steep cliff, waterfalls cascading down into empty space, dragons soaring around the towers'
      },
      {
        title: 'Nhà tiên tri trong đền cổ',
        text: 'An elven seer with long glowing white hair reciting a spell over a levitating crystal sphere in a ruined marble temple, particles of light floating'
      }
    ]
  },
  {
    category: 'Động Vật & Đời Thường',
    items: [
      {
        title: 'Mèo phi hành gia',
        text: 'A cute orange tabby cat wearing a detailed space suit, floating inside a spaceship cabin, staring curiously out at a distant galaxy, 3d render'
      },
      {
        title: 'Phòng trà của cáo thần',
        text: 'A cozy traditional Japanese tea room run by a friendly red fox wearing a tiny kimono, brewing hot green tea, steam rising, warm ambient glow'
      },
      {
        title: 'Cửa hàng sách cũ ấm áp',
        text: 'A cozy bookstore in winter, fireplace crackling, bookshelves filled with leather-bound books, a comfortable armchair with a steaming mug on the side table'
      }
    ]
  }
];
