// Popular anime storyboards for live-action image generation.
// Each anime has 5 episodes, each representing a ~12-15 minute timeline with 5 specific scenes.

export const POPULAR_ANIME_DB = {
  "naruto": {
    name: "Naruto (Huyền thoại Ninja)",
    englishName: "Naruto",
    description: "Câu chuyện về cậu bé mồ côi Naruto Uzumaki vượt qua sự kỳ thị để trở thành thủ lĩnh Hokage của làng Lá.",
    episodes: [
      {
        title: "Tập 1: Huyền thoại cáo chín đuôi thức tỉnh (12 phút)",
        duration: "12:00",
        scenes: [
          {
            id: "n_e1_s1",
            timestamp: "00:00",
            title: "Cậu bé cô đơn bên xích đu",
            description: "Naruto ngồi lẻ loi trên xích đu gỗ dưới bóng cây sồi già, nhìn các bạn nhỏ được cha mẹ đón về trong hoàng hôn làng Lá.",
            prompt: "A live-action cinematic movie shot of a young boy with spiky blonde hair and whisker-like facial scars, wearing a worn orange jacket, sitting sadly on a wooden swing under a large oak tree at sunset. Konoha village houses in the background, soft warm lighting, realistic skin textures, high production value."
          },
          {
            id: "n_e1_s2",
            timestamp: "03:15",
            title: "Bảo vật băng trán hộ mệnh",
            description: "Thầy Iruka mỉm cười ấm áp, tự tay buộc chiếc băng trán kim loại có biểu tượng lá cây lên trán của Naruto.",
            prompt: "A realistic live-action close-up shot of a kind Japanese ninja teacher with a scar across his nose, tying a metallic leaf-symbol headband onto the forehead of a smiling blonde boy. Soft indoor lantern lighting, shallow depth of field, detailed textures."
          },
          {
            id: "n_e1_s3",
            timestamp: "06:30",
            title: "Cấm thuật Đa Trọng Ảnh Phân Thân",
            description: "Naruto đứng trong rừng tối, tay kết ấn đặc trưng, xung quanh phát ra những tia sét chakra xanh lam và hàng chục bản sao xuất hiện.",
            prompt: "A dramatic action movie scene of a young ninja boy making a hand sign. Glowing blue chakra sparks surround him as dozens of identical clones emerge from shadows in a misty ancient forest. Volumetric lighting, smoky atmosphere, hyper-realistic."
          },
          {
            id: "n_e1_s4",
            timestamp: "09:45",
            title: "Trận chiến bảo vệ người thầy",
            description: "Naruto lao vào chắn trước thầy Iruka, ánh mắt giận dữ quyết liệt đối đầu với phản đồ Mizuki.",
            prompt: "A tense cinematic duel in a dark forest at night. A young blonde ninja boy glowing with faint orange chakra energy stands protectively in front of his wounded teacher. Dramatic backlighting, wind blowing leaves, intense focus."
          },
          {
            id: "n_e1_s5",
            timestamp: "12:00",
            title: "Bình minh trên mái nhà làng Lá",
            description: "Naruto ngồi trên đỉnh tượng đá Hokage nhìn ngắm ngôi làng yên bình đón chào ngày mới đầy hy vọng.",
            prompt: "An epic wide cinematic shot of a blonde ninja boy sitting on top of a massive stone head carved into a mountain cliff, looking over a bustling traditional Japanese village. Sunrise sun rays, cinematic colors, panoramic view."
          }
        ]
      },
      {
        title: "Tập 2: Đội 7 thành lập & Cuộc chạm trán ác liệt (14 phút)",
        duration: "14:15",
        scenes: [
          {
            id: "n_e2_s1",
            timestamp: "00:00",
            title: "Màn giới thiệu của Đội 7 dưới mái trường",
            description: "Thầy Kakashi với mái tóc bạc dựng ngược và chiếc mặt nạ che nửa mặt nhìn ba học trò tinh nghịch Naruto, Sasuke và Sakura.",
            prompt: "A cinematic live-action shot of a mysterious silver-haired ninja teacher wearing a black mask covering half his face, looking down at three young students (a blonde boy, a dark-haired boy, and a pink-haired girl) sitting in a classroom. Soft light, realistic styling."
          },
          {
            id: "n_e2_s2",
            timestamp: "03:30",
            title: "Thử thách cướp chuông dưới rừng tre",
            description: "Sasuke ẩn nấp sau lùm cây, sử dụng nhãn thuật Sharingan đỏ rực theo dõi di chuyển siêu việt của thầy Kakashi.",
            prompt: "A realistic live-action close-up of a young dark-haired Japanese boy hiding in a bamboo forest, one of his eyes glowing bright red with three black tomoe patterns (Sharingan). Soft forest shadows, cinematic lighting, focused look."
          },
          {
            id: "n_e2_s3",
            timestamp: "07:15",
            title: "Làn sương mù quỷ dị cầu Đại Đao",
            description: "Sát thủ Zabuza mang thanh đao khổng lồ đứng hiên ngang trong sương mù dày đặc trên cây cầu đang xây dựng dở dang.",
            prompt: "A high-concept cinematic photo of a tall, muscular rogue ninja with bandages around his mouth, holding a giant executioner broadsword on his shoulder. Dense white fog, wet wooden bridge deck, dark and gritty tone."
          },
          {
            id: "n_e2_s4",
            timestamp: "10:45",
            title: "Haku và chiếc mặt nạ băng giá",
            description: "Haku bước ra từ những chiếc gương băng, cầm phi tiêu senbon sắc bén hướng về phía Sasuke đang kiệt sức.",
            prompt: "A cinematic live-action shot of an elegant Japanese teenager wearing a green kimono and a white mask with red wave patterns, standing surrounded by glowing ice mirrors reflecting light. Holding silver needles, dramatic lighting."
          },
          {
            id: "n_e2_s5",
            timestamp: "14:15",
            title: "Bộc phát phong ấn Cửu Vĩ",
            description: "Lần đầu tiên Naruto bộc phát sức mạnh hồ ly, đôi mắt hóa đỏ ngầu, móng vuốt sắc nhọn và luồng sát khí đỏ bao quanh cơ thể.",
            prompt: "A dramatic action close-up of a young boy whose eyes have turned slit-pupil red, orange glowing demonic chakra bubbling around his body like fire. Whisker facial marks deepened, realistic skin details, explosive aura, 8k resolution."
          }
        ]
      },
      {
        title: "Tập 3: Cuộc thi tuyển Ninja trung đẳng (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "n_e3_s1",
            timestamp: "00:00",
            title: "Bước vào Khu Rừng Chết Chóc",
            description: "Đội 7 đứng trước cánh cổng sắt rỉ sét dẫn vào khu rừng nguyên sinh khổng lồ đầy sương mù và nguy hiểm.",
            prompt: "A wide cinematic shot of three teenage ninjas standing in front of a giant rusty iron gate that leads into a dark, massive primeval forest with towering trees and eerie blue fog. Overcast moody sky, realistic adventure aesthetic."
          },
          {
            id: "n_e3_s2",
            timestamp: "03:45",
            title: "Gặp gỡ Orochimaru nguy hiểm",
            description: "Một kẻ lạ mặt với làn da trắng bệch, đôi mắt rắn xếch dài phóng ra những con rắn khổng lồ tấn công Sasuke.",
            prompt: "A terrifying cinematic scene of a pale, snake-like villain with long black hair, purple eye markings, standing in the branches of a giant mossy tree, summoning large snakes from the shadows. Eerie green lighting."
          },
          {
            id: "n_e3_s3",
            timestamp: "06:15",
            title: "Gaara sa mạc và chiếc bình cát",
            description: "Cậu bé Gaara với ấn ký chữ 'Yêu' màu đỏ trên trán, ánh mắt vô hồn đứng cạnh chiếc bình hồ lô khổng lồ đầy cát.",
            prompt: "A photorealistic live-action shot of a pale auburn-haired boy with dark rings around his eyes and a red tattoo on his temple. A large sand gourd strapped to his back, sand swirling around his feet, sunset desert lighting."
          },
          {
            id: "n_e3_s4",
            timestamp: "09:30",
            title: "Trận tử chiến giữa Rock Lee và Gaara",
            description: "Rock Lee tháo băng tạ chân, phóng đi với tốc độ ánh sáng tạo ra những vệt khói bụi vây quanh khiên cát phòng thủ của Gaara.",
            prompt: "An action-packed movie screenshot of a young martial artist in a green jumpsuit kicking with high speed, creating dust waves in an ancient stone arena. A shield of sand blocks the kick, sparks flying, cinematic motion blur."
          },
          {
            id: "n_e3_s5",
            timestamp: "13:00",
            title: "Tuyệt kỹ Chidori của Sasuke",
            description: "Sasuke đứng trên vách đá đấu trường, tay tụ một luồng lôi điện xanh sáng lấp lánh kêu như tiếng ngàn chim hót.",
            prompt: "A cinematic shot of a dark-haired boy standing on a stone wall, electric blue lightning crackling intensely from his right hand, illuminating his face and the surrounding stone arena. Highly detailed electric sparks, dramatic shadow play."
          }
        ]
      },
      {
        title: "Tập 4: Tình bạn rạn nứt tại Thung Lũng Tận Cùng (15 phút)",
        duration: "15:00",
        scenes: [
          {
            id: "n_e4_s1",
            timestamp: "00:00",
            title: "Sasuke bỏ đi trong đêm mưa Lá",
            description: "Sasuke mang hành lý bước đi dưới trời mưa tầm tã, quay lưng lại với Sakura đang khóc lóc cầu xin dưới ánh đèn đường hiu hắt.",
            prompt: "A cinematic live-action shot of a dark-haired teenage boy walking away in a heavy rain on a wet dark street of an Asian village. A pink-haired girl is crying on her knees under a dim street lamp, highly emotional, dramatic lighting."
          },
          {
            id: "n_e4_s2",
            timestamp: "04:20",
            title: "Thung Lũng Tận Cùng vĩ đại",
            description: "Hai bức tượng đá khổng lồ của hai vị tổ sáng lập hướng mặt vào nhau qua một thác nước cuồn cuộn chảy.",
            prompt: "An epic scenic shot of two massive stone warrior statues carved into opposing canyon cliffs, a powerful roaring waterfall cascading between them under an overcast stormy sky. Realistic scale, ancient monuments."
          },
          {
            id: "n_e4_s3",
            timestamp: "07:45",
            title: "Hình thái nguyền ấn cấp độ 2",
            description: "Sasuke biến đổi hoàn toàn, mọc ra đôi cánh tay quỷ dị sau lưng và tóc hóa xám, ánh mắt khát khao sức mạnh tăm tối.",
            prompt: "A dark fantasy live-action shot of a boy with grey hair and skin covered in black flame-like tattoos. Giant hand-shaped dark wings sprouted from his back, eyes glowing purple, standing on wet rocks, lightning storm."
          },
          {
            id: "n_e4_s4",
            timestamp: "11:30",
            title: "Trận chiến giữa Chidori và Rasengan",
            description: "Naruto với quả cầu chakra xoắn ốc màu xanh lam lao thẳng vào Sasuke đang cầm lôi điện màu đen tím tại chân thác nước.",
            prompt: "An epic battle collision of two teenagers: one with a swirling blue energy sphere (Rasengan) in his hand, the other with crackling dark purple lightning. Water splashing everywhere, dynamic camera angle, cinematic intensity."
          },
          {
            id: "n_e4_s5",
            timestamp: "15:00",
            title: "Người bạn ra đi, lời hứa ở lại",
            description: "Naruto nằm ngửa mặt bất tỉnh dưới cơn mưa tầm tã bên vách đá, chiếc băng trán bị gạch một đường nằm lại trên mặt đất bùn lầy.",
            prompt: "A sad cinematic close-up of a scratched metal ninja headband lying in the wet mud, rain drops splashing on it. An unconscious blonde boy lies blurred in the background, cool dark blue color grading, dramatic end scene."
          }
        ]
      },
      {
        title: "Tập 5: Người kế thừa ý chí của lửa (12 phút)",
        duration: "12:30",
        scenes: [
          {
            id: "n_e5_s1",
            timestamp: "00:00",
            title: "Chữa trị vết thương lòng",
            description: "Naruto nằm viện với các lớp băng quấn quanh người, nhìn qua cửa sổ đón nhận những chiếc lá mùa thu bay trong gió.",
            prompt: "A quiet cinematic scene of a young blonde boy sitting on a hospital bed near a large open window, wrapped in white bandages. Golden autumn leaves blowing in, warm sunlight illuminating the room."
          },
          {
            id: "n_e5_s2",
            timestamp: "03:15",
            title: "Huyền thoại Jiraiya xuất hiện",
            description: "Người thầy tóc trắng to lớn Jiraiya với chiếc cuộn giấy khổng lồ trên lưng mỉm cười xoa đầu Naruto.",
            prompt: "A live-action shot of a large, jovial older Japanese man with long spiky white hair and red lines under his eyes, carrying a massive scroll on his back, laughing and putting his hand on a blonde boy's head. Sunny riverbank."
          },
          {
            id: "n_e5_s3",
            timestamp: "06:45",
            title: "Lên đường tầm sư học đạo",
            description: "Naruto và Jiraiya khoác ba lô, sánh bước cùng nhau đi về phía chân trời xa xôi, vượt ra khỏi cổng làng.",
            prompt: "A wide cinematic shot of a spiky blonde boy and a white-haired master carrying backpacks, walking down a dirt road away from a majestic traditional Japanese gate. Sunrise, glowing clouds, epic journey beginning, back view."
          },
          {
            id: "n_e5_s4",
            timestamp: "09:30",
            title: "Bóng tối ẩn hiện từ Akatsuki",
            description: "Thành viên Akatsuki bí ẩn với chiếc áo choàng mây đỏ đứng trên đỉnh tháp cao ngắm nhìn cơn giông bão sắp tới.",
            prompt: "A dark moody cinematic shot of a ninja in a long black cloak with embroidered red clouds, wearing a conical straw hat with small bells. Standing on a high roof under a dark storm-cloud sky, lightning flashing."
          },
          {
            id: "n_e5_s5",
            timestamp: "12:30",
            title: "Lời thề của người anh hùng tương lai",
            description: "Naruto đứng trên đỉnh đồi cao đón gió, mắt nhìn về phía trước với sự kiên định sẽ đưa Sasuke trở về.",
            prompt: "A heroic cinematic portrait of a teenage blonde ninja looking determinedly into the horizon. Wind blowing through his hair, dynamic low angle shot, bright blue sky with fluffy white clouds, hope and destiny theme."
          }
        ]
      }
    ]
  },
  "one_piece": {
    name: "One Piece (Vua Hải Tặc)",
    englishName: "One Piece",
    description: "Hành trình ra khơi của cậu bé cao su Monkey D. Luffy cùng băng hải tặc Mũ Rơm đi tìm kho báu huyền thoại.",
    episodes: [
      {
        title: "Tập 1: Bình minh phiêu lưu và chiếc Mũ Rơm (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "op_e1_s1",
            timestamp: "00:00",
            title: "Lời hứa của Shanks Tóc Đỏ",
            description: "Shanks quỳ một chân trên bến cảng, mỉm cười đặt chiếc mũ rơm cũ lên đầu cậu bé Luffy đang khóc nức nở.",
            prompt: "A cinematic live-action shot of a red-haired pirate captain with three scars over his left eye, gently placing a straw hat on the head of a crying young boy at a wooden dock. Sunny seaside, ships in background, emotional."
          },
          {
            id: "op_e1_s2",
            timestamp: "03:20",
            title: "Gomu Gomu no Mi - Quả cao su kỳ bí",
            description: "Luffy vô tình cắn một miếng lớn từ quả ác quỷ màu tím có các đường vân xoáy kỳ dị, làm cơ thể giãn dài ra.",
            prompt: "A close-up shot of a young Japanese boy taking a bite of a strange, glowing purple spherical fruit covered in curly patterns. Magical swirl particles around, cinematic lighting, detailed texture."
          },
          {
            id: "op_e1_s3",
            timestamp: "06:45",
            title: "Ra khơi trên chiếc thuyền nhỏ",
            description: "Luffy lúc lớn đứng trên chiếc thuyền gỗ đơn sơ vẫy chào dân làng, khởi đầu chuyến phiêu lưu đại dương.",
            prompt: "A realistic wide shot of a cheerful teenage boy wearing a red vest and a straw hat, standing on a small wooden sailboat on a crystal blue sea, waving back to a small harbor village. Sunbeams, beautiful coastal scenery."
          },
          {
            id: "op_e1_s4",
            timestamp: "09:50",
            title: "Chạm trán Quái thú biển khơi",
            description: "Một con thủy quái khổng lồ trồi lên khỏi mặt nước gầm rú, Luffy vung nắm đấm kéo dài bằng sức mạnh cao su.",
            prompt: "A thrilling action scene of a teenage boy punching with an incredibly stretched elastic arm toward a terrifying giant sea serpent rising from the ocean. Splash waves, epic scale, dynamic angle."
          },
          {
            id: "op_e1_s5",
            timestamp: "13:00",
            title: "Hòn đảo của thợ săn hải tặc",
            description: "Thuyền cập bến một thị trấn ven biển nhộn nhịp, Luffy háo hức đi tìm kiếm người đồng đội đầu tiên.",
            prompt: "A cinematic view of a lively 18th-century tropical port town with wooden tavern buildings and palm trees. A young pirate wearing a straw hat walks down the stone pier, looking around in awe."
          }
        ]
      },
      {
        title: "Tập 2: Thợ săn hải tặc Roronoa Zoro (12 phút)",
        duration: "12:15",
        scenes: [
          {
            id: "op_e2_s1",
            timestamp: "00:00",
            title: "Chiến binh bị trói trên pháp trường",
            description: "Roronoa Zoro với mái tóc xanh lá cây bị trói vào cột gỗ giữa sân đầy nắng, vẻ mặt gai góc kiên cường.",
            prompt: "A grit-and-glory live-action shot of a muscular green-haired Japanese swordsman tied to a heavy wooden post in a dusty courtyard. Sun beating down, sweat on skin, intense dark eyes, realistic anime style."
          },
          {
            id: "op_e2_s2",
            timestamp: "03:10",
            title: "Luffy giải cứu ba thanh kiếm",
            description: "Luffy lẻn vào căn cứ hải quân để lấy lại ba thanh bảo kiếm quý giá trả lại cho Zoro.",
            prompt: "A cinematic shot of a stealthy boy with a straw hat carrying three traditional Japanese katanas in his arms, running through a white stone navy corridor at night. Moonlight shadows, stealth action style."
          },
          {
            id: "op_e2_s3",
            timestamp: "06:30",
            title: "Tam Kiếm Phái - Uy trấn thiên hạ",
            description: "Zoro ngậm một thanh kiếm ở miệng, hai tay cầm hai thanh kiếm, tung đòn chém cực mạnh cản phá toán lính hải quân.",
            prompt: "An epic action shot of a green-haired swordsman using three katanas (one in mouth, one in each hand) striking a defensive pose as dust and wind swirl around him. Lens flare, metallic sheen, cinematic martial arts style."
          },
          {
            id: "op_e2_s4",
            timestamp: "09:20",
            title: "Hải quân phản diện Morgan Tay Rìu",
            description: "Morgan - gã đại tá hải quân tàn ác với cánh tay phải lắp chiếc rìu sắt khổng lồ hung hãn lao tới tấn công.",
            prompt: "A cinematic shot of a huge, imposing navy officer with a metallic jaw and a giant iron axe head attached to his right arm, swinging it furiously. Debris flying, dark shadow casting over his face."
          },
          {
            id: "op_e2_s5",
            timestamp: "12:15",
            title: "Thành lập liên minh vượt biển",
            description: "Luffy và Zoro cùng ngồi trên chiếc thuyền nhỏ, cười sảng khoái hướng về phía đại dương bao la.",
            prompt: "A cinematic shot from behind of two boys—one in a straw hat and one with green hair—sitting on the deck of a sailboat, looking at a beautiful sunset over the endless sea horizon. Adventure atmosphere, warm glow."
          }
        ]
      },
      {
        title: "Tập 3: Hoa tiêu tinh quái Nami (14 phút)",
        duration: "14:00",
        scenes: [
          {
            id: "op_e3_s1",
            timestamp: "00:00",
            title: "Nami cướp bản đồ đại hải trình",
            description: "Cô gái tóc cam Nami nhảy qua các mái nhà với chiếc túi da đựng bản đồ kho báu vừa lấy trộm từ băng hề Buggy.",
            prompt: "A live-action shot of an active young orange-haired woman in a light top, leaping across rooftops of an old European-style town at dusk. Holding a leather scroll bag, light feet, starry evening sky."
          },
          {
            id: "op_e3_s2",
            timestamp: "03:40",
            title: "Chiếc lồng sắt giam giữ Luffy",
            description: "Luffy bị nhốt trong chiếc lồng sắt lớn, miệng vẫn cười toe toét trong khi Nami lo lắng đàm phán với quân địch.",
            prompt: "A medium shot of a boy in a straw hat locked inside a thick iron cage, grinning widely. Beside him, an anxious orange-haired girl is looking at a crowd of bizarre pirate goons in a colorful town square."
          },
          {
            id: "op_e3_s3",
            timestamp: "07:15",
            title: "Tên hề điên cuồng Buggy",
            description: "Buggy với chiếc mũi đỏ tròn xoe như hề xiếc, cười man rợ dùng năng lực tách rời cơ thể phóng dao bay.",
            prompt: "A cinematic shot of a terrifying pirate captain dressed as a clown with a big round red nose. His gloved hands are detached and floating in mid-air, holding sharp knives, circus tent background, sinister lighting."
          },
          {
            id: "op_e3_s4",
            timestamp: "10:30",
            title: "Cú đấm cao su phá nát rạp xiếc",
            description: "Luffy phóng cánh tay qua toàn bộ lều xiếc, hạ gục Buggy trong một vụ nổ ánh sáng đầy màu sắc.",
            prompt: "An explosive action movie frame. A boy in a straw hat delivers a powerful punch, his arm stretched extremely long, colliding with a clown villain. Colorful circus props shattering, bright dust and sparks."
          },
          {
            id: "op_e3_s5",
            timestamp: "14:00",
            title: "Hoa tiêu gia nhập băng Mũ Rơm",
            description: "Nami bước lên thuyền của Luffy, giương buồm đón gió đi tìm những đồng đội tiếp theo.",
            prompt: "A beautiful cinematic shot of a young orange-haired woman standing at the helm of a pirate ship, checking a map. Sea breeze blowing through her hair, bright blue sky, feeling of freedom."
          }
        ]
      },
      {
        title: "Tập 4: Chiến binh Usopp & Thuyền Going Merry (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "op_e4_s1",
            timestamp: "00:00",
            title: "Cậu bé mũi dài nói dối",
            description: "Usopp chạy khắp ngôi làng nhỏ ven đồi gào thét báo tin hải tặc tới để thu hút sự chú ý của mọi người.",
            prompt: "A live-action shot of a curly-haired young man with a distinct long nose, running through a peaceful European village street, shouting with hands around his mouth. Sunny morning, cute cottages."
          },
          {
            id: "op_e4_s2",
            timestamp: "03:50",
            title: "Biệt thự nguy nga của tiểu thư Kaya",
            description: "Usopp ngồi trên cành cây cao ngoài cửa sổ kể những câu chuyện viễn tưởng cho cô tiểu thư Kaya ốm yếu nghe.",
            prompt: "A warm cinematic shot of a blonde young lady in a white dress sitting at a large open window of a luxurious stone mansion, smiling at a curly-haired boy who is perched on a nearby tree branch. Romantic soft lighting."
          },
          {
            id: "op_e4_s3",
            timestamp: "07:00",
            title: "Gã quản gia nham hiểm Kuro",
            description: "Kuro đẩy kính gọng tròn bằng lòng bàn tay, để lộ bộ móng vuốt mèo gồm 10 lưỡi đao sắc lẹm dài ngoằng.",
            prompt: "A terrifying cinematic shot of a butler in a sleek black suit pushing up his glasses with the palm of his hand. His fingers are fitted with long, curved steel blades like claws. Cold dramatic lighting."
          },
          {
            id: "op_e4_s4",
            timestamp: "10:15",
            title: "Ná cao su của xạ thủ Usopp",
            description: "Usopp đứng trên vách đá ngắm bắn ná cao su chứa đạn lửa phát nổ thẳng vào kẻ địch để bảo vệ Kaya.",
            prompt: "An action shot of a curly-haired boy pulling back a large slingshot with a determined expression. The slingshot tip glows with spark fire, rocky coastal cliff background, cinematic motion blur."
          },
          {
            id: "op_e4_s5",
            timestamp: "13:00",
            title: "Huyền thoại Merry bắt đầu ra khơi",
            description: "Băng Mũ Rơm ăn mừng trên boong chiếc tàu Going Merry mới tinh với phần mũi hình đầu cừu dễ thương.",
            prompt: "A majestic wide shot of a medieval wooden caravel ship with a carved white sheep head on the bow, sailing on a glittering sea at sunrise. Four young friends stand on the deck waving, epic scale, cinematic lighting."
          }
        ]
      },
      {
        title: "Tập 5: Đầu bếp Sanji và Nhà hàng nổi Baratie (15 phút)",
        duration: "15:00",
        scenes: [
          {
            id: "op_e5_s1",
            timestamp: "00:00",
            title: "Nhà hàng trên biển khổng lồ",
            description: "Tàu Merry cập bến Baratie - một nhà hàng hình chú cá khổng lồ neo đậu giữa đại dương xanh thẳm.",
            prompt: "An impressive wide shot of a massive fish-shaped wooden floating restaurant ship anchored in the middle of a calm blue ocean under a clear sky. Tiny boats docked around it, high fantasy architecture."
          },
          {
            id: "op_e5_s2",
            timestamp: "04:10",
            title: "Đầu bếp tóc vàng hào hoa Sanji",
            description: "Sanji với bộ vest đen lịch lãm đang châm thuốc lá, ánh mắt lãng tử phục vụ món ăn cho thực khách.",
            prompt: "A photorealistic close-up of a handsome blonde cook in a black suit, lighting a cigarette with a classic lighter. One of his eyes is covered by his bangs, background kitchen of a high-end restaurant with warm lighting."
          },
          {
            id: "op_e5_s3",
            timestamp: "07:30",
            title: "Mắt Diều Hâu Mihawk xuất hiện",
            description: "Thợ săn hải tặc mạnh nhất thế giới Mihawk chẻ đôi một con thuyền lớn bằng một nhát chém từ hắc kiếm khổng lồ.",
            prompt: "An epic wide shot of a man in a black hat with a feather and a cross-guard sword, standing on a floating coffin boat. A massive wooden galleon ship behind him is sliced in half with green energy slash, huge waves."
          },
          {
            id: "op_e5_s4",
            timestamp: "11:45",
            title: "Cú đá lửa của chân đen Sanji",
            description: "Sanji bảo vệ nhà hàng bằng chuỗi cú đá xoay vòng rực lửa cực kỳ điêu luyện vào gã Don Krieg áo giáp sắt.",
            prompt: "An action shot of a blonde chef in black trousers performing a spin kick, his leg glowing with bright orange fire (Diable Jambe). Striking a heavily armored knight, sparks exploding, motion blur."
          },
          {
            id: "op_e5_s5",
            timestamp: "15:00",
            title: "Giương buồm tiến vào Đại Hải Trình",
            description: "Sanji quỳ gối tạ ơn ông chủ Zeff chân đỏ, rồi nhảy lên tàu Merry cùng Luffy tiếp tục cuộc hành trình tìm kho báu.",
            prompt: "A heart-warming cinematic shot of a blonde young man kneeling on a wooden deck in front of a chef with a peg-leg, tears in his eyes. Sunset golden hour, pirate ship ready to sail in background."
          }
        ]
      }
    ]
  },
  "your_name": {
    name: "Your Name (Tên Cậu Là Gì?)",
    englishName: "Your Name",
    description: "Sau cuộc hoán đổi kỳ diệu giữa hai con người xa lạ Mitsuha và Taki, ngôi sao chổi rơi xuống đã vĩnh viễn thay đổi số phận của họ.",
    episodes: [
      {
        title: "Tập 1: Sự hoán đổi kỳ lạ (12 phút)",
        duration: "12:00",
        scenes: [
          {
            id: "yn_e1_s1",
            timestamp: "00:00",
            title: "Mitsuha tỉnh dậy trong căn phòng lạ",
            description: "Cô gái trẻ Mitsuha ngơ ngác soi gương, ngạc nhiên khi thấy mình trong thân xác một chàng trai năng động giữa thủ đô Tokyo.",
            prompt: "A cinematic live-action shot of a teenage Japanese boy looking at himself in a mirror with a completely shocked and confused expression, hands touching his face. Sunbeam through window, messy Tokyo bedroom."
          },
          {
            id: "yn_e1_s2",
            timestamp: "03:15",
            title: "Taki bỡ ngỡ giữa thung lũng Itomori",
            description: "Taki trong thân xác Mitsuha đứng trước gương, hoang mang nhìn mái tóc thắt nơ đỏ và phong cảnh nông thôn thanh bình ngoài cửa sổ.",
            prompt: "A realistic shot of a Japanese teenage girl with a red ribbon tied in her hair, looking out a window at a breathtaking view of a mountain lake village under a blue sky. Confused expression, soft warm cinematic lighting."
          },
          {
            id: "yn_e1_s3",
            timestamp: "06:40",
            title: "Nhật ký trên điện thoại",
            description: "Hai người để lại những ghi chú giận dữ trên điện thoại để thiết lập luật lệ cho cuộc sống của đối phương.",
            prompt: "A close-up shot of hands holding a smartphone, a messaging app open with typed notes saying 'Don't spend too much money!' in Japanese. Soft bokeh background of a Tokyo train carriage."
          },
          {
            id: "yn_e1_s4",
            timestamp: "09:30",
            title: "Lễ hội đền thờ và rượu Kuchikaminosake",
            description: "Mitsuha trong trang phục múa đền Shinto truyền thống thực hiện nghi lễ cúng bái dưới ánh nến lung linh.",
            prompt: "A beautiful cinematic photo of a young Japanese girl in a traditional red and white miko priestess kimono, dancing with bells in front of a wooden shrine altar at night. Warm candle glows, sacred particles."
          },
          {
            id: "yn_e1_s5",
            timestamp: "12:00",
            title: "Bầu trời đêm sao chổi rực sáng",
            description: "Sao chổi Tiamat lấp lánh chẻ làm đôi, tỏa ra hai luồng ánh sáng xanh lam và hồng rực rỡ cắt ngang bầu trời đêm.",
            prompt: "A breathtaking wide cinematic shot of a giant comet splitting into two glowing trails of cyan and magenta light, arching across a dark starry night sky over a peaceful crater lake village. Masterpiece sky scene."
          }
        ]
      },
      {
        title: "Tập 2: Hành trình tìm kiếm vô vọng (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "yn_e2_s1",
            timestamp: "00:00",
            title: "Sự im lặng bất thường của Mitsuha",
            description: "Taki cố gắng gọi điện cho Mitsuha nhưng thuê bao không liên lạc được, linh cảm có điều gì đó tồi tệ đã xảy ra.",
            prompt: "A moody cinematic shot of a young Japanese man sitting on a Tokyo rooftop at twilight, holding a phone to his ear with a worried look. City lights twinkling in the background, cool blue hour tone."
          },
          {
            id: "yn_e2_s2",
            timestamp: "03:45",
            title: "Đi tìm Itomori qua những bức vẽ",
            description: "Taki phác thảo lại phong cảnh hồ nước và ngôi làng Itomori từ ký ức để đi hỏi đường người dân vùng núi Hida.",
            prompt: "A close-up shot of a young artist's hands drawing a detailed charcoal sketch of a crater lake village. Surrounded by reference maps on a rustic wooden table in a train station café."
          },
          {
            id: "yn_e2_s3",
            timestamp: "07:00",
            title: "Sự thật kinh hoàng tại đống đổ nát",
            description: "Taki chết lặng khi đứng trước một hố sâu khổng lồ đầy nước - vết tích còn lại của vụ va chạm sao chổi 3 năm trước.",
            prompt: "An epic wide cinematic shot from behind Taki, standing on a grassy cliff looking down at a massive circular lake crater surrounded by ruins of a destroyed town. Dark overcast sky, solemn misty atmosphere."
          },
          {
            id: "yn_e2_s4",
            timestamp: "10:15",
            title: "Uống ngụm rượu vượt thời gian",
            description: "Taki leo xuống hang đá thiêng liêng ở đỉnh núi, uống chén rượu Kuchikaminosake để kết nối lại với Mitsuha.",
            prompt: "A mystical cinematic scene inside an ancient mossy stone cave under a giant tree root. A young man drinking from a small white ceramic cup, glowing spirits of light floating around, ethereal fantasy tone."
          },
          {
            id: "yn_e2_s5",
            timestamp: "13:00",
            title: "Ký ức hoán đổi quay lại",
            description: "Taki ngã nhào và bước vào một không gian ảo ảnh đầy màu sắc tái hiện lại toàn bộ cuộc đời của Mitsuha.",
            prompt: "A surreal cinematic visual of a boy falling through a vortex of glowing red and yellow braided threads (kumihimo), reflecting childhood memories in floating bubble shards. Ethereal, dreamlike, award-winning."
          }
        ]
      },
      {
        title: "Tập 3: Cuộc gặp gỡ kỳ diệu lúc chạng vạng (14 phút)",
        duration: "14:00",
        scenes: [
          {
            id: "yn_e3_s1",
            timestamp: "00:00",
            title: "Mitsuha thức dậy trước tai họa",
            description: "Mitsuha tỉnh dậy trong thân xác của chính mình vào sáng ngày lễ hội, nhận ra đây là ngày sao chổi rơi xuống.",
            prompt: "A tense cinematic shot of a Japanese teenage girl waking up in a panic in a traditional tatami room, sunlight streaming through shoji screens. Looking at a calendar, sweat on her face."
          },
          {
            id: "yn_e3_s2",
            timestamp: "04:10",
            title: "Chạy đua ngược dòng thời gian",
            description: "Mitsuha chạy điên cuồng qua những bậc thang đồi để tìm cách sơ tán người dân khỏi vụ nổ sắp tới.",
            prompt: "A dynamic action shot of a schoolgirl running up a long stone staircase towards a shrine on a mountain, wind blowing her hair. Sun rays filtering through trees, desperate expression, motion blur."
          },
          {
            id: "yn_e3_s3",
            timestamp: "07:30",
            title: "Nghe thấy giọng nói trên đỉnh núi",
            description: "Taki và Mitsuha chạy quanh miệng núi lửa khổng lồ, họ nghe thấy tiếng của nhau nhưng không thể nhìn thấy đối phương.",
            prompt: "A wide cinematic shot of a crater rim at sunset. A boy and a girl are running in opposite directions, searching, but separated by an invisible barrier of time. Moody golden hour clouds."
          },
          {
            id: "yn_e3_s4",
            timestamp: "10:45",
            title: "Kataware-doki - Khoảnh khắc hoàng hôn",
            description: "Khi mặt trời lặn tạo ra khoảnh khắc chạng vạng kỳ diệu, hai người cuối cùng đã gặp và chạm vào nhau xuyên thời gian.",
            prompt: "A beautiful cinematic masterwork shot of a boy and a girl standing close, reaching hands out to touch each other. Surrounded by a glowing aura of golden and violet sunset light on top of a mountain cliff."
          },
          {
            id: "yn_e3_s5",
            timestamp: "14:00",
            title: "Tên cậu là gì?",
            description: "Taki định viết tên mình lên tay Mitsuha, nhưng ánh hoàng hôn chợt tắt và Mitsuha biến mất ngay trước mắt anh.",
            prompt: "A heart-wrenching cinematic shot of a young boy looking at his empty hand, a black marker pen dropping. The girl is gone, twilight fading into dark blue starry sky, emotional and quiet."
          }
        ]
      },
      {
        title: "Tập 4: Nỗ lực sơ tán cuối cùng (12 phút)",
        duration: "12:00",
        scenes: [
          {
            id: "yn_e4_s1",
            timestamp: "00:00",
            title: "Quên đi cái tên của người thương",
            description: "Mitsuha đứng giữa rừng đêm, bật khóc nức nở khi nhận ra mình hoàn toàn không thể nhớ nổi tên của Taki.",
            prompt: "A close-up shot of a crying Japanese girl looking at her palm under moonlight. Tears falling, look of intense sorrow, dark forest background, cool blue tone."
          },
          {
            id: "yn_e4_s2",
            timestamp: "03:15",
            title: "Kế hoạch phá hoại trạm phát điện",
            description: "Nhóm bạn của Mitsuha kích nổ trạm biến áp để cúp điện toàn bộ thị trấn, buộc chính quyền phải phát lệnh di tản khẩn cấp.",
            prompt: "An action movie scene of a small power station exploding in the distance, bright sparks and black smoke rising into the evening sky. Seen from a hillside road where teenagers watch in shock."
          },
          {
            id: "yn_e4_s3",
            timestamp: "06:30",
            title: "Thuyết phục người cha thị trưởng",
            description: "Mitsuha xông vào văn phòng thị trưởng đập bàn, ánh mắt cương quyết đối diện với sự hoài nghi của người cha lạnh lùng.",
            prompt: "A dramatic interior shot of a teenage girl facing a stern Japanese middle-aged politician in a formal office. She is slamming her hands on a large wooden desk, pleading with fire in her eyes."
          },
          {
            id: "yn_e4_s4",
            timestamp: "09:15",
            title: "Khoảnh khắc va chạm định mệnh",
            description: "Mảnh vỡ sao chổi rực lửa lao thẳng xuống trung tâm thị trấn Itomori, tạo ra một vụ nổ ánh sáng hoành tráng.",
            prompt: "A spectacular and terrifying wide cinematic shot of a burning pink meteor fragment crashing into a quiet town valley. Massive shockwave of dust and light, epic disaster scene."
          },
          {
            id: "yn_e4_s5",
            timestamp: "12:00",
            title: "Sự im lặng của đống tro tàn",
            description: "Khung cảnh thị trấn hoang tàn sau vụ nổ, nhưng kỳ lạ thay tất cả người dân đã được di tản an toàn.",
            prompt: "A quiet post-disaster cinematic shot of a smoking crater filled with lake water under a clear dawn sky. Sunlight starting to shine on the peaceful valley, feeling of salvation."
          }
        ]
      },
      {
        title: "Tập 5: Cuộc gặp gỡ định mệnh trên bậc thang đỏ (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "yn_e5_s1",
            timestamp: "00:00",
            title: "Nhiều năm trôi qua giữa lòng Tokyo",
            description: "Taki đã là một kỹ sư trẻ bận rộn, đi lại trên các chuyến tàu điện Tokyo nhưng luôn cảm thấy thiếu vắng điều gì.",
            prompt: "A modern realistic shot of a young Japanese salaryman in a suit, standing inside a crowded Tokyo subway train, staring out at the passing subway walls with a melancholic expression."
          },
          {
            id: "yn_e5_s2",
            timestamp: "03:20",
            title: "Hai đoàn tàu song song lướt qua",
            description: "Taki và Mitsuha nhìn thấy nhau qua cửa kính của hai đoàn tàu chạy song song, cảm xúc bùng nổ lập tức tìm kiếm nhau.",
            prompt: "A dynamic cinematic capture of two train cars passing close to each other. A boy in one train and a girl with a red hair ribbon in the other look at each other through windows, eyes wide with recognition."
          },
          {
            id: "yn_e5_s3",
            timestamp: "06:45",
            title: "Tìm kiếm điên cuồng trên phố Shinjuku",
            description: "Taki chạy dọc các ngõ ngách, các con dốc của khu Shinjuku dưới tiết trời xuân ấm áp hoa anh đào bay.",
            prompt: "A dynamic shot of a young man running through a beautiful Tokyo neighborhood with cherry blossom petals falling. Bright spring sun, traditional and modern concrete walls, search and pursuit."
          },
          {
            id: "yn_e5_s4",
            timestamp: "10:10",
            title: "Gặp gỡ trên bậc thềm dốc Suga",
            description: "Họ đi ngang qua nhau trên bậc thang đá tay vịn màu đỏ, rồi ngập ngừng quay lại nhìn nhau.",
            prompt: "A highly iconic cinematic shot of a young man and a young woman passing each other on a steep stone staircase with red handrails. Cherry blossoms blowing in the wind, bright blue sky."
          },
          {
            id: "yn_e5_s5",
            timestamp: "13:00",
            title: "Tên của bạn là...",
            description: "Taki mỉm cười hỏi: 'Kimi no namae wa?' (Tên cậu là gì?) và Mitsuha bật khóc gật đầu mỉm cười hạnh phúc.",
            prompt: "A heartwarming cinematic close-up of a young Japanese man and woman looking at each other, smiling with tears of joy in their eyes on the red staircase. Soft sun flares, perfect romantic finale."
          }
        ]
      }
    ]
  },
  "attack_on_titan": {
    name: "Attack on Titan (Đại Chiến Titan)",
    englishName: "Attack on Titan",
    description: "Cuộc chiến sinh tồn tàn khốc của loài người chống lại những gã khổng lồ ăn thịt người (Titan) sau những bức tường kiên cố.",
    episodes: [
      {
        title: "Tập 1: Ngày nhân loại bị hủy diệt (12 phút)",
        duration: "12:00",
        scenes: [
          {
            id: "aot_e1_s1",
            timestamp: "00:00",
            title: "Bức tường Maria cao ngút ngàn",
            description: "Eren, Mikasa và Armin đứng dưới chân bức tường đá khổng lồ cao 50m, ngước nhìn bầu trời xanh thẳm bị giới hạn.",
            prompt: "A wide cinematic shot of three children looking up at a colossal 50-meter-tall ancient stone wall that stretches into the sky. Overcast blue sky, medieval-style village at the base."
          },
          {
            id: "aot_e1_s2",
            timestamp: "03:15",
            title: "Sự xuất hiện của Colossal Titan",
            description: "Một bàn tay khổng lồ màu đỏ rực lửa bám vào đỉnh bức tường, để lộ khuôn mặt quỷ không da đầy khói nóng.",
            prompt: "A terrifying cinematic scene of a colossal skinless giant head peering over the top of a giant stone wall. Red flesh, steam venting intensely, massive scale, dramatic cinematic lighting."
          },
          {
            id: "aot_e1_s3",
            timestamp: "06:40",
            title: "Cánh cổng thành bị đập tan",
            description: "Titan Thiết Giáp lao thẳng đập vỡ cánh cổng thành kiên cố, gạch đá vỡ vụn văng tung tóe mở đường cho lũ Titan tràn vào.",
            prompt: "An action shot of an armored giant with gold-colored plates crashing through a massive wooden and iron city gate. Debris exploding everywhere, dust cloud, destruction."
          },
          {
            id: "aot_e1_s4",
            timestamp: "09:30",
            title: "Bi kịch của gia đình Jaeger",
            description: "Eren bất lực gào thét khi mẹ mình bị kẹt dưới đống đổ nát của ngôi nhà bị sập, một gã Titan mỉm cười quái dị tiến lại gần.",
            prompt: "A dark dramatic shot of a young boy with green eyes crying in despair as a giant hand reaches down into the ruins of a collapsed wooden house. A grinning titan face in the background shadows."
          },
          {
            id: "aot_e1_s5",
            timestamp: "12:00",
            title: "Lời thề máu trên con tàu tị nạn",
            description: "Eren đứng trên mạn thuyền tị nạn trôi đi trong dòng kênh, ánh mắt rực lửa thù hận thề sẽ tiêu diệt toàn bộ lũ Titan.",
            prompt: "A dramatic cinematic shot of a young boy standing on a crowded wooden ferry, looking back at a burning city with thick black smoke. Glowing green eyes filled with anger, dramatic sunset."
          }
        ]
      },
      {
        title: "Tập 2: Đội Trinh Sát và Bộ Cơ Động 3D (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "aot_e2_s1",
            timestamp: "00:00",
            title: "Huấn luyện tân binh khắc nghiệt",
            description: "Eren treo mình trên sợi dây cáp tập giữ thăng bằng trong cuộc huấn luyện quân đội khắc nghiệt.",
            prompt: "A realistic training camp scene. A young soldier in a brown leather harness suspended in the air between wooden posts, trying to balance. Strict officers watching in a muddy field."
          },
          {
            id: "aot_e2_s2",
            timestamp: "03:30",
            title: "Lắp đặt bộ cơ động 3D",
            description: "Cận cảnh Mikasa đeo các hộp lưỡi kiếm kim loại và bộ phản lực hơi nước cơ động 3D quanh thắt lưng.",
            prompt: "A detailed cinematic close-up of a female soldier buckling a high-tech steam-powered brass and steel harness around her waist. Dual metal blade boxes, leather straps, realistic textures."
          },
          {
            id: "aot_e2_s3",
            timestamp: "06:50",
            title: "Bay lượn giữa các mái nhà cổ",
            description: "Đội trinh sát bắn cáp neo nhảy vọt qua các mái nhà ngói đỏ của thị trấn, để lại những vệt khói trắng sương mù.",
            prompt: "An action shot of soldiers flying high above red-roofed medieval houses using cables anchored to walls. White steam trails behind them, wind blowing capes, dynamic camera angle."
          },
          {
            id: "aot_e2_s4",
            timestamp: "10:10",
            title: "Chiến binh huyền thoại Levi",
            description: "Đại úy Levi ngự trên đỉnh tháp, hai tay cầm ngược lưỡi đao sắc lẹm, ánh mắt sắc lạnh vô cảm nhìn bầy Titan.",
            prompt: "A cool cinematic shot of a dark-haired officer with an undercut hairstyle, wearing a green hooded cape with a blue-and-white wing logo on the back. Holding steel swords, dark moody atmosphere."
          },
          {
            id: "aot_e2_s5",
            timestamp: "13:00",
            title: "Tiến vào vùng lãnh thổ bên ngoài",
            description: "Binh đoàn Trinh sát cưỡi ngựa phi nhanh ra khỏi cánh cổng thành mở rộng, tiến vào vùng thảo nguyên bao la đầy hiểm nguy.",
            prompt: "An epic wide cinematic shot of a cavalry troop in green capes riding horses out of a colossal stone archway into a vast green grassland under a cloudy sky. Vibe of epic dark fantasy adventure."
          }
        ]
      },
      {
        title: "Tập 3: Trận chiến giành lại quận Trost (14 phút)",
        duration: "14:00",
        scenes: [
          {
            id: "aot_e3_s1",
            timestamp: "00:00",
            title: "Đợt tấn công thứ hai đột ngột",
            description: "Thành phố rơi vào hỗn loạn khi Colossal Titan lại xuất hiện và đá bay cánh cổng quận Trost lần nữa.",
            prompt: "A chaotic live-action scene of citizens running in panic through narrow streets as giant boulders and rubble rain down from a broken outer wall. Fire and smoke everywhere."
          },
          {
            id: "aot_e3_s2",
            timestamp: "03:45",
            title: "Eren bị Titan nuốt chửng",
            description: "Eren lao vào cứu Armin khỏi họng một gã Titan khổng lồ râu tóc bạc, bị nó cắn đứt một cánh tay và nuốt vào bụng.",
            prompt: "A dramatic dark action shot of a young soldier being grabbed by a giant grotesque bearded giant monster, throwing his friend to safety. Blood splattering, intense despair, stormy lighting."
          },
          {
            id: "aot_e3_s3",
            timestamp: "07:10",
            title: "Titan bí ẩn tấn công đồng loại",
            description: "Một gã Titan tóc đen cơ bắp cuồn cuộn gầm thét, đấm nát đầu một gã Titan khác để giải cứu Mikasa.",
            prompt: "An epic monster battle. A 15-meter tall muscular rogue giant with long black hair punches another ugly titan in the face, shattering its jaw. Ruined brick city background, massive dust clouds."
          },
          {
            id: "aot_e3_s4",
            timestamp: "10:30",
            title: "Sự thật về thân phận của Eren",
            description: "Bên trong cái xác gáy của gã Titan bí ẩn đang bốc khói nghi ngút, Eren dần lộ diện ra ngoài đầy mệt mỏi.",
            prompt: "A cinematic shot of a young boy emerging from the steaming flesh of a giant monster's neck. Glowing organic fibers connecting to his face, steam rising, dramatic reveal."
          },
          {
            id: "aot_e3_s5",
            timestamp: "14:00",
            title: "Tảng đá khổng lồ lấp miệng thành",
            description: "Eren trong dạng Titan vác tảng đá lớn bằng tòa nhà trên vai, bước đi nặng nề chặn đứng lỗ thủng bức tường.",
            prompt: "An epic cinematic shot of a giant muscular monster carrying a colossal boulder on its back, walking towards a broken stone wall. Soldiers in green capes guarding him, dust and sun rays."
          }
        ]
      },
      {
        title: "Tập 4: Nữ Titan xuất hiện (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "aot_e4_s1",
            timestamp: "00:00",
            title: "Đoàn binh mã trong rừng thông khổng lồ",
            description: "Levi dẫn đội trinh sát chạy trốn xuyên qua khu rừng có những cây thông cổ thụ cao hàng trăm mét.",
            prompt: "A wide cinematic shot of a squad riding horses through a forest of towering redwood trees that block the sunlight, creating tall beams of light and dark shadows. High suspense atmosphere."
          },
          {
            id: "aot_e4_s2",
            timestamp: "03:50",
            title: "Nữ Titan thông minh đuổi theo",
            description: "Một gã Titan nữ có cơ thể trần trụi với cơ bắp lộ rõ, chạy với tốc độ kinh hoàng đuổi sát sau lưng cả đội.",
            prompt: "A terrifying action shot of a 14-meter female titan with exposed red muscle fibers and short blonde hair, running rapidly through giant trees, reaching her hand out toward horse riders."
          },
          {
            id: "aot_e4_s3",
            timestamp: "07:15",
            title: "Bẫy lôi tiễn bắt sống kẻ địch",
            description: "Hàng trăm chiếc móc sắt gắn dây cáp được bắn ra từ các nòng súng ẩn giấu găm chặt Nữ Titan vào mặt đất.",
            prompt: "A high-tension shot of a giant female monster pinned down to the forest ground by hundreds of steel cables and metal spears shot from surrounding trees. Dust exploding, metal clanking."
          },
          {
            id: "aot_e4_s4",
            timestamp: "10:20",
            title: "Khả năng hóa cứng pha lê",
            description: "Nữ Titan bảo vệ gáy bằng cách tạo ra một lớp pha lê màu xanh lam đông cứng siêu cứng bọc quanh tay mình.",
            prompt: "A close-up shot of a giant's hand glowing with a hard, diamond-like crystal protective layer. A steel sword shatters upon striking it, blue sparks flying, detailed macro shot."
          },
          {
            id: "aot_e4_s5",
            timestamp: "13:00",
            title: "Sự hy sinh của biệt đội Levi",
            description: "Eren đau đớn biến thành Titan để huyết chiến khi chứng kiến những người đồng đội thân thiết lần lượt ngã xuống.",
            prompt: "A dramatic dark fantasy shot of a young soldier biting his own hand, blood dripping, as yellow lightning flashes from his body, initiating giant transformation. Emotional and violent."
          }
        ]
      },
      {
        title: "Tập 5: Cuộc chiến trong lòng vương quốc (15 phút)",
        duration: "15:00",
        scenes: [
          {
            id: "aot_e5_s1",
            timestamp: "00:00",
            title: "Nghi phạm Annie Leonhart",
            description: "Armin dụ Annie vào lối đi ngầm dưới lòng đất để lật tẩy thân phận thực sự của cô.",
            prompt: "A tense cinematic scene inside a stone underground stairwell. A young blonde girl stands at the entrance, refusing to enter the shadows, facing two soldiers. Dim dramatic lighting."
          },
          {
            id: "aot_e5_s2",
            timestamp: "03:45",
            title: "Annie hóa Titan phá nát thánh đường",
            description: "Annie sử dụng chiếc nhẫn đâm tay để kích hoạt biến hình, phá vỡ nhà thờ cổ kính ném văng ngói gạch đất đá.",
            prompt: "A massive explosion of gold lightning inside a gothic cathedral, stained glass windows shattering outward. A giant female figure emerging from the dust and collapsing architecture."
          },
          {
            id: "aot_e5_s3",
            timestamp: "07:20",
            title: "Đại chiến hai Titan giữa phố",
            description: "Eren Titan và Annie Titan đấm đá dữ dội phá hủy các tòa nhà gạch cổ kính của thủ đô Stohess.",
            prompt: "An epic battle between a male titan with glowing green eyes and a female titan, fighting among historic European brick buildings. Dust, debris, flames, cinematic action angle."
          },
          {
            id: "aot_e5_s4",
            timestamp: "11:30",
            title: "Trùm kín trong kén pha lê vô hạn",
            description: "Khi sắp bị bắt, Annie tự bọc mình trong một khối pha lê khổng lồ không thể phá vỡ, giữ lại mọi bí mật.",
            prompt: "A melancholy cinematic shot of a young blonde girl frozen inside a massive, semi-transparent blue crystal block. Moody lighting, cracks reflecting light, soldiers looking at it in frustration."
          },
          {
            id: "aot_e5_s5",
            timestamp: "15:00",
            title: "Bí mật đáng sợ trong lòng tường",
            description: "Một mảnh tường đá Maria bị vỡ ra để lộ khuôn mặt của một gã Titan khổng lồ ẩn giấu sâu bên trong bức tường từ ngàn năm.",
            prompt: "A chilling end shot of a broken section of a giant stone wall, revealing a massive creepy giant eye staring out from the dark hollow interior. Shadows, mystery, dramatic cliffhanger."
          }
        ]
      }
    ]
  },
  "demon_slayer": {
    name: "Demon Slayer (Thanh Gươm Diệt Quỷ)",
    englishName: "Demon Slayer",
    description: "Hành trình diệt quỷ đầy gian khổ của Kamado Tanjiro để tìm cách biến người em gái Nezuko trở lại thành người.",
    episodes: [
      {
        title: "Tập 1: Tàn sát trong tuyết trắng & Sự thức tỉnh (12 phút)",
        duration: "12:00",
        scenes: [
          {
            id: "ds_e1_s1",
            timestamp: "00:00",
            title: "Mùa đông tuyết phủ trắng xóa",
            description: "Tanjiro cõng em gái Nezuko chạy điên cuồng trên con đường núi ngập tuyết, sau khi gia đình bị quỷ sát hại dã man.",
            prompt: "A dramatic live-action shot of a young Japanese boy with a scar on his forehead, wearing a green checkered cloak, carrying a pale girl with bamboo in her mouth through a heavy snowstorm on a steep mountain path."
          },
          {
            id: "ds_e1_s2",
            timestamp: "03:15",
            title: "Giyu Tomioka - Thủy Trụ xuất hiện",
            description: "Một chiến binh diệt quỷ lạnh lùng với thanh kiếm xanh lam chỉ thẳng vào Tanjiro, yêu cầu tiêu diệt Nezuko vừa hóa quỷ.",
            prompt: "A realistic shot of a handsome Japanese swordsman in a split-pattern haori, pointing a sleek katana inscribed with Japanese characters at a boy. Heavy snow falling, dramatic shadows."
          },
          {
            id: "ds_e1_s3",
            timestamp: "06:30",
            title: "Nezuko bảo vệ anh trai",
            description: "Nezuko dù hóa quỷ gầm gừ, đôi mắt hóa hồng sắc nhọn nhưng lại dang tay che chở cho Tanjiro đang ngất đi.",
            prompt: "A powerful cinematic scene of a pale girl with glowing pink eyes and fangs, standing protectively over a young boy lying in the snow. Snarl expression, blood splatters, emotional."
          },
          {
            id: "ds_e1_s4",
            timestamp: "09:40",
            title: "Sư phụ Sakonji Urokodaki",
            description: "Ông già đeo mặt nạ Tengu đỏ rực đón nhận hai anh em vào ngôi nhà gỗ đơn sơ ở chân núi sương mù.",
            prompt: "A cinematic shot of a man wearing a red Tengu mask and a blue cloud-patterned robe, standing outside a rustic Japanese wooden hut in a foggy bamboo forest. Warm lantern light."
          },
          {
            id: "ds_e1_s5",
            timestamp: "12:00",
            title: "Chém đôi tảng đá khổng lồ",
            description: "Tanjiro tung nhát chém quyết định bằng thanh kiếm gỗ, chẻ đôi tảng đá tròn khổng lồ sau hai năm tập luyện.",
            prompt: "An epic wide shot of a young swordsman standing in front of a giant mossy round boulder that has been cleanly sliced in half. Mist rising, mountain forest sunset, mystical atmosphere."
          }
        ]
      },
      {
        title: "Tập 2: Kỳ thi chọn lựa cuối cùng trên núi Hoa Tử Đằng (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "ds_e2_s1",
            timestamp: "00:00",
            title: "Núi hoa tử đằng tím ngắt",
            description: "Tanjiro bước qua cổng đền cổ kính dẫn lên núi, nơi hàng ngàn nhành hoa tử đằng nở rộ tỏa ra ánh hào quang tím.",
            prompt: "A beautiful cinematic shot of a young man walking under a canopy of glowing purple wisteria flowers at night. Traditional Japanese wooden lanterns illuminating the path, magical violet glow."
          },
          {
            id: "ds_e2_s2",
            timestamp: "03:30",
            title: "Tay Quỷ khổng lồ gớm ghiếc",
            description: "Một sinh vật quỷ dị khổng lồ cấu thành từ hàng chục cánh tay nhung nhúc bò ra từ đầm lầy tấn công Tanjiro.",
            prompt: "A dark fantasy live-action monster shot. A huge grotesque demon made of green muscular arms and glowing yellow eyes emerging from forest shadows, sweeping ground with dust."
          },
          {
            id: "ds_e2_s3",
            timestamp: "07:00",
            title: "Hơi Thở Của Nước - Thức thứ nhất",
            description: "Tanjiro chém bay đầu Tay Quỷ bằng một luồng nước uốn lượn như rồng xanh phát ra từ lưỡi kiếm Nhật.",
            prompt: "An incredible action scene. A swordsman swings a black katana, generating a massive fluid wave of CGI water effects wrapping around the blade like a water dragon. Severing a monster neck."
          },
          {
            id: "ds_e2_s4",
            timestamp: "10:15",
            title: "Nhận thanh gươm diệt quỷ Luân Đao",
            description: "Thợ rèn Haganezuka đeo mặt nạ Hyottoko hài hước trao cho Tanjiro thanh kiếm sắt đổi màu sang đen tuyền bí ẩn.",
            prompt: "A warm interior shot of a Japanese swordsmith wearing a funny clay mask with twisted mouth, presenting a katana. The steel blade turns deep charcoal black as a boy holds it, sparks."
          },
          {
            id: "ds_e2_s5",
            timestamp: "13:00",
            title: "Chiếc hộp gỗ bảo vệ Nezuko",
            description: "Tanjiro cẩn thiện đặt chiếc hộp gỗ mun lên lưng, chuẩn bị lên đường thực hiện nhiệm vụ đầu tiên cùng em gái.",
            prompt: "A close-up of a sturdy dark wood backpack box with brass corner fittings. A young man wearing a green checkered coat straps it to his shoulders, looking determinedly forward, sunrise."
          }
        ]
      },
      {
        title: "Tập 3: Biệt đội diệt quỷ tập hợp (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "ds_e3_s1",
            timestamp: "00:00",
            title: "Gặp gỡ Zenitsu nhút nhát",
            description: "Tanjiro gặp Zenitsu - cậu bé tóc vàng mặc haori tam giác đang quỳ gối khóc lóc van xin một cô gái dọc đường.",
            prompt: "A humorous live-action shot of a blonde boy with yellow triangle patterns on his cloak, crying and clinging to a young girl on a dirt road. A boy with a wooden box on his back watching with a sweatdrop expression."
          },
          {
            id: "ds_e3_s2",
            timestamp: "03:40",
            title: "Quái nhân đầu heo Inosuke",
            description: "Một chàng trai ngực trần vạm vỡ đeo mặt nạ đầu lợn rừng, cầm đôi kiếm răng cưa lao vào chém loạn xạ.",
            prompt: "A wild action shot of a shirtless muscular young man wearing a boar head mask, holding two jagged-edged katanas. Storming out of a traditional sliding door of a paper house, wood splinters flying."
          },
          {
            id: "ds_e3_s3",
            timestamp: "06:50",
            title: "Ngôi nhà trống Tsuzumi ma quái",
            description: "Cả nhóm bước vào ngôi biệt thự cổ nơi các căn phòng tự xoay chuyển mỗi khi tiếng trống Tsuzumi vang lên.",
            prompt: "A surreal cinematic shot inside a traditional Japanese wooden house. The room is rotated sideways, wooden sliding screens floating, dark creepy green shadows, moody horror tone."
          },
          {
            id: "ds_e3_s4",
            timestamp: "10:15",
            title: "Hơi thở Sấm Sét - Nhất thức lúc ngủ",
            description: "Zenitsu nhắm mắt ngủ gật, cúi người cực thấp và rút kiếm nhanh như chớp phát ra tia chớp vàng thiêu rụi quỷ dữ.",
            prompt: "An epic speed-action screenshot. A blonde boy in a low-crouched drawing pose (Iaijutsu), crackling bright yellow lightning emitting from his sword, slicing the air in a flash, dark background."
          },
          {
            id: "ds_e3_s5",
            timestamp: "13:00",
            title: "Tình bạn thiết lập dưới bóng đêm",
            description: "Inosuke, Tanjiro và Zenitsu cùng ngồi ăn cơm nắm bên hiên nhà hoa tử đằng, mỉm cười sau trận chiến.",
            prompt: "A heartwarming cinematic shot of three young warriors (one blonde, one with scar, one shirtless with boar mask on side) sitting together on a wooden porch, eating onigiri rice balls under purple flowers."
          }
        ]
      },
      {
        title: "Tập 4: Tử chiến nhện quỷ Rui trên núi Natagumo (14 phút)",
        duration: "14:00",
        scenes: [
          {
            id: "ds_e4_s1",
            timestamp: "00:00",
            title: "Khu rừng tơ nhện ma mị",
            description: "Cả nhóm tiến vào ngọn núi Natagumo âm u, nơi những sợi tơ nhện phát sáng điều khiển các xác chết thợ săn diệt quỷ.",
            prompt: "A chilling dark fantasy shot of a pitch-black pine forest. Glowing silver spider threads hanging from branches, puppet-like soldiers moving eerily in fog, cool purple color grading."
          },
          {
            id: "ds_e4_s2",
            timestamp: "03:50",
            title: "Hạ Huyền Ngũ Rui",
            description: "Một cậu bé quỷ với mái tóc trắng như chân nhện, mặc kimono trắng đứng lơ lửng trên các sợi tơ nhện sắc bén.",
            prompt: "A sinister cinematic shot of a pale boy demon with white spider-leg patterns on his face, wearing a white kimono, floating on top of thin silver wires in a dark forest. Crimson moon."
          },
          {
            id: "ds_e4_s3",
            timestamp: "07:20",
            title: "Thần Hỏa Vũ Điệu - Điệu nhảy của cha",
            description: "Tanjiro nhớ lại điệu nhảy tế hỏa thần của cha mình, chuyển từ hơi thở nước sang hơi thở lửa bùng cháy rực rỡ.",
            prompt: "An amazing visual of a swordsman swinging a katana, generating a massive, detailed fiery ring of red and orange flames (Hinokami Kagura). Illuminating a dark forest, sparks flying, epic action."
          },
          {
            id: "ds_e4_s4",
            timestamp: "10:45",
            title: "Huyết quỷ thuật của Nezuko",
            description: "Nezuko bùng phát huyết quỷ thuật, biến tơ nhện trói buộc thành những vệt lửa hồng rực rỡ hỗ trợ anh trai.",
            prompt: "A dramatic shot of a girl with black hair and pink tips, shouting as she summons a burst of vibrant pink magical flames along silver strings. Glowing aura, epic fantasy illustration style."
          },
          {
            id: "ds_e4_s5",
            timestamp: "14:00",
            title: "Đòn chém quyết định",
            description: "Lửa đỏ của Tanjiro phối hợp cùng lửa hồng của Nezuko tạo nên nhát chém rực cháy chẻ đôi tơ nhện ác hiểm.",
            prompt: "An action movie scene of a flaming sword slicing through thick spider webs. High contrast, dynamic fire sparks, detailed debris, masterpiece cinematic composition."
          }
        ]
      },
      {
        title: "Tập 5: Hỏa Trụ Kyojuro Rengoku & Chuyến tàu Vô Hạn (15 phút)",
        duration: "15:00",
        scenes: [
          {
            id: "ds_e5_s1",
            timestamp: "00:00",
            title: "Đoàn tàu hơi nước Vô Hạn",
            description: "Đoàn tàu hơi nước cổ điển bốc khói đen cuồn cuộn đậu tại nhà ga cổ kính lúc nửa đêm.",
            prompt: "A beautiful cinematic wide shot of an old steam locomotive train at a dark station. Thick steam billowing from chimney, traditional gas lamps glowing warm yellow, night atmosphere."
          },
          {
            id: "ds_e5_s2",
            timestamp: "03:45",
            title: "Hỏa Trụ Kyojuro Rengoku",
            description: "Rengoku với mái tóc vàng đỏ như ngọn lửa đang hào hứng ăn cơm hộp bento trên toa tàu.",
            prompt: "A photorealistic shot of a charismatic warrior with long spiky yellow hair with red streaks, wearing a white flame-patterned cape, eating from a wooden bento box on a train. Big warm smile."
          },
          {
            id: "ds_e5_s3",
            timestamp: "07:30",
            title: "Cơn ác mộng từ quỷ Enmu",
            description: "Toàn bộ toa tàu biến dạng hóa thành những khối thịt quỷ nhầy nhụa bám đầy các ô cửa sổ và ghế ngồi.",
            prompt: "A dark horror cinematic scene. Inside a passenger train carriage, the metal and wooden walls are covered with disgusting organic purple flesh, eyeballs sprouting, eerie lighting."
          },
          {
            id: "ds_e5_s4",
            timestamp: "11:15",
            title: "Viêm Long Cuồng Nộ",
            description: "Rengoku vung kiếm chém ra một con rồng lửa khổng lồ thiêu rụi toàn bộ quỷ dữ trong khoang tàu.",
            prompt: "An epic shot of a swordsman in a flame-cape executing a circular slash that creates a massive dragon made of pure fire, tearing through organic flesh walls. Intense bright light."
          },
          {
            id: "ds_e5_s5",
            timestamp: "15:00",
            title: "Tinh thần bất diệt Rengoku",
            description: "Rengoku đứng hiên ngang mỉm cười dưới ánh bình minh hé rạng, truyền lại ngọn lửa ý chí cho thế hệ trẻ.",
            prompt: "A heroic and emotional portrait of a blonde warrior with a flame-patterned cloak, smiling under a beautiful sunrise. Golden light illuminating his face, misty air, peace theme."
          }
        ]
      }
    ]
  },
  "spirited_away": {
    name: "Spirited Away (Vùng Đất Linh Hồn)",
    englishName: "Spirited Away",
    description: "Cuộc phiêu lưu lạc vào thế giới thần linh kỳ bí của cô bé Chihiro để giải cứu cha mẹ bị biến thành heo.",
    episodes: [
      {
        title: "Tập 1: Lạc lối vào thế giới thần linh (12 phút)",
        duration: "12:00",
        scenes: [
          {
            id: "sa_e1_s1",
            timestamp: "00:00",
            title: "Cổng đá rêu phong ranh giới",
            description: "Gia đình Chihiro đi qua một đường hầm màu đỏ rêu phong rậm rạp dẫn vào thế giới thần thoại.",
            prompt: "A wide cinematic shot of a family walking toward a mysterious weathered red stone tunnel entrance covered in green moss and forest vines. Dappled forest sunlight, eerie atmosphere."
          },
          {
            id: "sa_e1_s2",
            timestamp: "03:15",
            title: "Quầy thức ăn vắng bóng người",
            description: "Cha mẹ Chihiro ngấu nghiến những món ăn thơm phức tại quầy hàng hoang vắng lúc hoàng hôn buông xuống.",
            prompt: "A cinematic shot of a couple greedily eating heaps of strange, delicious, glistening food at a wooden stall. Golden twilight glow, steam rising, empty mysterious market street."
          },
          {
            id: "sa_e1_s3",
            timestamp: "06:30",
            title: "Cha mẹ biến thành heo",
            description: "Chihiro hoảng sợ la hét khi phát hiện cha mẹ mình đã biến thành những chú heo khổng lồ ăn mặc quần áo con người.",
            prompt: "A dramatic scene showing a terrified young girl looking at two large pigs wearing human clothes, sitting on bar stools at a food stall. Dim lanterns, dark shadows, fantasy horror."
          },
          {
            id: "sa_e1_s4",
            timestamp: "09:10",
            title: "Bóng ma trỗi dậy bên sông",
            description: "Khi màn đêm buông xuống, những chiếc thuyền cập bến mang theo hàng ngàn linh hồn mờ ảo màu đen phát sáng.",
            prompt: "A mystical cinematic scene at a river bank. Glowing spectral ships docking, semi-transparent black spirits with white masks floating out under a starlit purple sky. Fantasy lighting."
          },
          {
            id: "sa_e1_s5",
            timestamp: "12:00",
            title: "Haku cứu giúp bên cầu đỏ",
            description: "Chàng trai Haku kéo tay Chihiro chạy trốn qua cây cầu gỗ màu đỏ rực rỡ dẫn vào nhà tắm công cộng Yubaba.",
            prompt: "A cinematic live-action shot of a young dark-haired Japanese boy holding the hand of a frightened girl, running across a high red wooden bridge. A grand ornate bathhouse glowing with thousands of lanterns in background."
          }
        ]
      },
      {
        title: "Tập 2: Phòng lò sưởi Kamaji & Ký hợp đồng lao động (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "sa_e2_s1",
            timestamp: "00:00",
            title: "Lão sáu tay Kamaji phòng lò",
            description: "Chihiro đi xuống hầm lò gặp Kamaji - ông lão có 6 cánh tay dài ngoằng đang điều khiển các lò đốt than.",
            prompt: "A cinematic shot of a cluttered boiler room. An old bald man with dark glasses and six incredibly long arms is reaching for herb drawers and shoveling coal. Warm orange fires glowing."
          },
          {
            id: "sa_e2_s2",
            timestamp: "03:30",
            title: "Lũ bồ hóng Susuwatari tinh nghịch",
            description: "Hàng trăm sinh vật bồ hóng nhỏ màu đen có mắt tròn xoe đang hì hục vác những cục than đen đi bỏ vào lò lửa.",
            prompt: "A close-up shot of small, fuzzy black soot sprites with big white eyes, carrying chunks of black coal across a stone floor. Tiny colorful star candies scattered around, cute fantasy scene."
          },
          {
            id: "sa_e2_s3",
            timestamp: "06:50",
            title: "Gặp gỡ mụ phù thủy Yubaba",
            description: "Chihiro đối diện với Yubaba - mụ phù thủy đầu to khổng lồ, đeo đầy trang sức ngọc trai sặc sỡ trong căn phòng hoàng gia.",
            prompt: "A dramatic interior shot of a giant-headed old witch with a massive bun hair, wearing blue dress and luxury rings, staring down at a young girl. Gilded baroque room decoration, rich colors."
          },
          {
            id: "sa_e2_s4",
            timestamp: "10:10",
            title: "Ký tên tước đoạt ký ức",
            description: "Yubaba dùng phép thuật thu hồi tên Chihiro, biến tên cô thành chữ Sen bay lơ lửng trên giấy da cổ kính.",
            prompt: "A magical close-up of a glowing scroll paper. Glowing Japanese kanji characters float in mid-air above a desk, a witch's long fingernail pointing at them, mystical aura."
          },
          {
            id: "sa_e2_s5",
            timestamp: "13:00",
            title: "Bắt đầu công việc tại nhà tắm Aburaya",
            description: "Chihiro trong trang phục lao động màu hồng đào, nhìn ngắm quy mô hoành tráng của nhà tắm hơi nước dành cho các vị thần.",
            prompt: "A wide cinematic shot of a young girl in pink traditional worker robes standing on a high wooden balcony overlooking a massive, steaming red bathhouse interior. Multi-tiered galleries, misty air."
          }
        ]
      },
      {
        title: "Tập 3: Vị thần ô uế và Vô Diện (14 phút)",
        duration: "14:00",
        scenes: [
          {
            id: "sa_e3_s1",
            timestamp: "00:00",
            title: "Vị khách ô uế khổng lồ",
            description: "Một sinh vật bùn lầy khổng lồ hôi hám bước vào nhà tắm, khiến tất cả nhân viên và vị thần khác kinh tởm lánh xa.",
            prompt: "A dark cinematic comedy scene of a massive, oozing sludge mud monster walking into a giant wooden bathtub, leaving trails of brown mud. Staff holding their noses, steam and bubbles."
          },
          {
            id: "sa_e3_s2",
            timestamp: "04:10",
            title: "Trút bỏ rác thải thanh lọc thần sông",
            description: "Chihiro dũng cảm rút dây xích xả nước, kéo ra hàng tấn rác thải giúp vị thần sông trở lại hình hài rồng nước trong suốt cát tường.",
            prompt: "An epic magical shot of a beautiful transparent water dragon spirit rising majestically from a giant bathtub, shedding debris and trash. Golden light, sparkling water droplets, pure joy."
          },
          {
            id: "sa_e3_s3",
            timestamp: "07:30",
            title: "Vô Diện lặng lẽ bên hành lang",
            description: "Sinh vật Vô Diện mờ ảo đen đứng yên lặng bên ngoài ban công dưới trời mưa, nhìn Chihiro với chiếc mặt nạ trắng.",
            prompt: "A melancholy cinematic shot of a tall, semi-transparent black ghost figure with a white expressionless mask, standing in the rain on a balcony at night. Warm lights of a window reflecting on wet wood."
          },
          {
            id: "sa_e3_s4",
            timestamp: "10:45",
            title: "Vô Diện hóa khổng lồ cuồng nộ",
            description: "Vô Diện nuốt chửng ếch xanh, hóa thành quái vật khổng lồ ném vàng giả và tàn phá phòng tiệc ăn uống vô độ.",
            prompt: "A chaotic monster scene. A giant bloated black shadow monster with a small white mask laughing maniacally, surrounded by luxury dishes and flying gold coins. Terrified frog workers running."
          },
          {
            id: "sa_e3_s5",
            timestamp: "14:00",
            title: "Liều thuốc đắng giải độc cứu nguy",
            description: "Chihiro đút viên thuốc của thần sông cho Vô Diện ăn, giúp nó nôn ra những thứ ô uế và trở lại hiền lành.",
            prompt: "A tense cinematic close-up of a brave young girl holding a green herbal pill out toward a giant shadow monster face. The shadow is shrinking, dark mist swirling around, emotional."
          }
        ]
      },
      {
        title: "Tập 4: Chuyến tàu trên mặt nước & Rồng trắng Haku (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "sa_e4_s1",
            timestamp: "00:00",
            title: "Rồng trắng Haku bị chim giấy tấn công",
            description: "Một con rồng trắng tuyệt đẹp vảy xanh rực rỡ bị hàng ngàn con hạc giấy ma thuật truy đuổi trên bầu trời đêm.",
            prompt: "A fantasy action shot of a long white eastern dragon with a green mane flying through a dark sky, chased by swarms of glowing white paper origami birds. Moonlit background, sparkling dust."
          },
          {
            id: "sa_e4_s2",
            timestamp: "03:45",
            title: "Chuyến tàu hỏa trên biển vô tận",
            description: "Chihiro, Vô Diện và các bạn đồng hành ngồi lặng lẽ trên chuyến tàu hỏa chạy trên đường ray chìm dưới mặt nước biển trong xanh.",
            prompt: "A beautiful cinematic shot inside a vintage train carriage. A young girl and a quiet black shadow figure sit side by side, looking out the window at a vast ocean horizon. Water covering the tracks, sunset."
          },
          {
            id: "sa_e4_s3",
            timestamp: "07:00",
            title: "Nhà tranh của bà lão tốt bụng Zeniba",
            description: "Cả nhóm đến ngôi nhà tranh ấm áp của Zeniba giữa khu rừng, được bà tiếp đãi trà nước ngọt ngào.",
            prompt: "A cozy interior shot of a rustic forest cottage. A kind-looking old lady pouring tea for a young girl and a black spirit sitting at a wooden table. Warm candlelight, knitted textures, peaceful."
          },
          {
            id: "sa_e4_s4",
            timestamp: "10:15",
            title: "Rồng Haku đón Sen trở về",
            description: "Haku trong hình dạng rồng trắng bay đến đồi cỏ nhà Zeniba để đón Chihiro quay lại nhà tắm Aburaya.",
            prompt: "An epic cinematic shot of a young girl hugging the neck of a huge white dragon with emerald-green eyes on a grassy hill under a starry sky. Ethereal light, deep bond theme."
          },
          {
            id: "sa_e5_s3_alt", // Unique scene key
            timestamp: "13:00",
            title: "Nhận ra cái tên Kohaku",
            description: "Khi bay giữa bầu trời sao, Chihiro nhớ lại Haku chính là thần sông Kohaku cứu cô hồi nhỏ, giúp vảy rồng vỡ ra hóa lại thành người.",
            prompt: "A breathtaking masterwork scene. A boy and a girl falling through a starry night sky, holding hands and smiling with tears, surrounded by glowing white scales drifting away. Magic, wind, sky."
          }
        ]
      },
      {
        title: "Tập 5: Trở về thế giới loài người (12 phút)",
        duration: "12:00",
        scenes: [
          {
            id: "sa_e5_s1",
            timestamp: "00:00",
            title: "Bài kiểm tra cuối cùng của Yubaba",
            description: "Yubaba yêu cầu Chihiro nhận diện cha mẹ mình trong đàn heo khổng lồ để giành lại sự tự do.",
            prompt: "A tense cinematic scene of a young girl standing in front of a giant witch in a crowded courtyard of spirits, looking at a line of identical pigs. Confident expression, warm lights."
          },
          {
            id: "sa_e5_s2",
            timestamp: "03:15",
            title: "Haku tiễn biệt tại thung lũng",
            description: "Haku nắm chặt tay Chihiro dặn dò cô đi thẳng về phía trước và tuyệt đối không được ngoảnh đầu nhìn lại.",
            prompt: "A close-up shot of a dark-haired boy holding the hand of a young girl in a grassy meadow near a red gateway. Looking into her eyes with a gentle but serious expression, bright sun rays."
          },
          {
            id: "sa_e5_s3",
            timestamp: "06:30",
            title: "Bước ra khỏi đường hầm rêu phong",
            description: "Chihiro đi ra khỏi đường hầm đá màu đỏ, ngạc nhiên thấy cha mẹ đã đứng đợi cạnh chiếc xe bám đầy lá khô.",
            prompt: "A wide cinematic shot of a young girl walking out of a dark stone tunnel into a bright green forest where her parents are standing next to a dusty car. Confused look, soft forest light."
          },
          {
            id: "sa_e5_s4",
            timestamp: "09:20",
            title: "Kẹp tóc lấp lánh kỷ niệm",
            description: "Chihiro bước vào xe, ngắm nhìn chiếc kẹp tóc làm bằng dây thắt bím óng ánh kỷ niệm của Zeniba tặng vẫn phát sáng trên tóc cô.",
            prompt: "A close-up shot of a young girl's head as she looks back at a mossy stone gate. A braided purple hair band sparkles subtly in her hair, reflecting sunlight, nostalgic mood."
          },
          {
            id: "sa_e5_s5",
            timestamp: "12:00",
            title: "Chiếc xe lăn bánh về thế giới thực",
            description: "Chiếc xe của gia đình chuyển bánh rời khỏi khu rừng rậm rạp, Chihiro hướng mắt về tương lai đầy tự tin.",
            prompt: "A wide cinematic tracking shot of an old Audi car driving away on a forest road. Looking from inside through the back window at the fading stone gateway, sunbeams, beautiful final credits vibe."
          }
        ]
      }
    ]
  },
  "doraemon": {
    name: "Doraemon (Mèo máy thần kỳ)",
    englishName: "Doraemon",
    description: "Những bảo bối thần kỳ của chú mèo máy Doraemon giúp đỡ Nobita hậu đậu vượt qua các rắc rối thường ngày.",
    episodes: [
      {
        title: "Tập 1: Chú mèo máy màu xanh và Cỗ máy thời gian (12 phút)",
        duration: "12:00",
        scenes: [
          {
            id: "dr_e1_s1",
            timestamp: "00:00",
            title: "Ngăn bàn học phát sáng",
            description: "Nobita hoảng hốt lùi lại khi ngăn bàn học của mình đột nhiên phát ra luồng ánh sáng xanh lam và rung chuyển dữ dội.",
            prompt: "A realistic cinematic shot of a messy Japanese bedroom in the 1970s. A wooden study desk drawer is open, emitting a bright blue glowing light. A boy with round glasses is falling backward in shock."
          },
          {
            id: "dr_e1_s2",
            timestamp: "03:15",
            title: "Doraemon chui ra từ ngăn kéo",
            description: "Chú mèo máy tròn trịa màu xanh lam Doraemon chui lên từ ngăn kéo bàn học, mỉm cười chào Nobita.",
            prompt: "A photorealistic live-action shot of a chubby, friendly blue metallic robot cat with a white face and a red nose, emerging from a wooden desk drawer. Big round eyes, shiny finish, cozy room."
          },
          {
            id: "dr_e1_s3",
            timestamp: "06:40",
            title: "Không gian Cỗ máy thời gian",
            description: "Doraemon và Nobita ngồi trên cỗ máy thời gian bay qua không gian đa chiều đầy những chiếc đồng hồ trôi nổi.",
            prompt: "A surreal cinematic scene of a boy in glasses and a blue robot cat sitting on a flat flying platform with a joystick, navigating through a swirling vortex of purple and pink clock faces. Time travel theme."
          },
          {
            id: "dr_e1_s4",
            timestamp: "09:30",
            title: "Bánh mì trí nhớ hữu dụng",
            description: "Nobita hí hửng áp chiếc bánh mì vuông kỳ lạ lên trang sách giáo khoa toán đầy công thức phức tạp.",
            prompt: "A close-up of a Japanese boy pressing a slice of white bread onto a textbook page covered in mathematical formulas. The text is printed backward on the bread, warm desktop light."
          },
          {
            id: "dr_e1_s5",
            timestamp: "12:00",
            title: "Chóng chóng tre bay trên mái nhà",
            description: "Doraemon và Nobita gắn chong chóng tre trên đầu, bay lượn tự do trên bầu trời chiều Tokyo ngập tràn ánh hoàng hôn.",
            prompt: "A wide cinematic shot of a blue robot cat and a boy in a yellow shirt flying over residential rooftops of a Japanese suburb. Small yellow propellers spinning on their heads, beautiful orange sunset sky."
          }
        ]
      },
      {
        title: "Tập 2: Cánh Cửa Thần Kỳ & Các bảo bối chốn học đường (13 phút)",
        duration: "13:00",
        scenes: [
          {
            id: "dr_e2_s1",
            timestamp: "00:00",
            title: "Cánh Cửa Thần Kỳ giữa phòng",
            description: "Một cánh cửa gỗ màu hồng đứng độc lập giữa căn phòng tatami, khi mở ra lộ ra bãi biển đầy nắng.",
            prompt: "A cinematic shot of a single pink wooden door frame standing vertically in the middle of a traditional Japanese room. The door is open, showing a bright tropical beach with blue water inside the frame."
          },
          {
            id: "dr_e2_s2",
            timestamp: "03:40",
            title: "Kính hiển vi thu nhỏ cơ thể",
            description: "Doraemon chiếu đèn pin thu nhỏ vào Nobita, biến cậu trở nên nhỏ bé như hạt cát trên thảm cỏ.",
            prompt: "A fantasy scene of a blue robot cat holding a futuristic flashlight emitting a bright green beam of light. A tiny boy is standing next to giant blades of green grass looking like bamboo, macro shot."
          },
          {
            id: "dr_e2_s3",
            timestamp: "06:50",
            title: "Sân chơi bãi đất trống quen thuộc",
            description: "Nhóm bạn Nobita, Shizuka, Chaien và Xeko tụ tập bàn kế hoạch thám hiểm bên ba ống cống bê tông lớn.",
            prompt: "A realistic live-action capture of four Japanese kids standing around three stacked concrete pipes in a grassy empty lot. Warm afternoon sun, nostalgic retro neighborhood style."
          },
          {
            id: "dr_e2_s4",
            timestamp: "10:15",
            title: "Chaien hát ca kinh hoàng",
            description: "Chaien đứng trên ống cống cầm micro hát điên cuồng, tạo ra những sóng âm méo mó làm bạn bè bịt tai đau đớn.",
            prompt: "A humorous action shot of a large, tough-looking boy singing passionately into a microphone on a concrete pipe, soundwave ripples visual effect. Other children cover their ears in agony."
          },
          {
            id: "dr_e2_s5",
            timestamp: "13:00",
            title: "Ngắm sao trời cùng Shizuka",
            description: "Nobita và Shizuka bay bằng chong chóng tre lên đỉnh tháp truyền hình Tokyo ngắm nhìn thành phố lấp lánh ban đêm.",
            prompt: "A beautiful romantic cinematic shot of a boy and a girl with pigtails sitting on a high metal girder overlooking the sparkling Tokyo city skyline at night. Propellers on their heads, starry sky."
          }
        ]
      }
    ]
  }
};
