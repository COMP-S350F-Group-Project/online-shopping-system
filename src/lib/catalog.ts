import { localizedText } from "@/lib/i18n";
import type {
  CartItem,
  Category,
  CustomerOrder,
  Locale,
  Product,
  Promotion,
} from "@/types";

const lt = localizedText;

const sharedShipping = {
  dispatch: lt(
    "Usually dispatches within 24 hours from Hong Kong.",
    "一般由香港倉於 24 小時內安排出貨。",
  ),
  delivery: lt(
    "Complimentary shipping over HK$1,200. Express delivery available at checkout.",
    "滿 HK$1,200 享免運配送，亦可於結帳時升級快遞服務。",
  ),
  returns: lt(
    "Return within 30 days in original condition with a prepaid label.",
    "商品保持原始狀態可於 30 天內退回，並附預付退件標籤。",
  ),
};

export const categories: Category[] = [
  {
    slug: "audio",
    name: lt("Audio", "音訊"),
    description: lt(
      "Wireless listening designed for long days, quiet focus, and refined mobility.",
      "為長時間配戴、安靜專注與流動生活而調校的無線聆聽體驗。",
    ),
    eyebrow: lt("Acoustic clarity", "聲音表現"),
    heroTitle: lt(
      "Audio shaped for long listening days.",
      "為長時間聆聽而設計的聲音體驗。",
    ),
    heroCopy: lt(
      "From immersive headphones to compact speakers, every piece balances comfort, fidelity, and portability.",
      "從沉浸式耳機到便攜音箱，每件作品都在舒適、音質與攜帶性之間取得平衡。",
    ),
  },
  {
    slug: "workspace",
    name: lt("Workspace", "工作桌面"),
    description: lt(
      "Quiet tools that create order, flow, and visual calm across the workday.",
      "以安靜而有效率的工具，整理整天的桌面秩序與工作節奏。",
    ),
    eyebrow: lt("Focus, refined", "專注工作"),
    heroTitle: lt(
      "Technology that helps the room feel more composed.",
      "讓工作空間更從容有序的科技器物。",
    ),
    heroCopy: lt(
      "Materials, light, and ergonomics come together in products built for focused environments.",
      "材質、光線與人體工學融合成一套適合深度工作的當代桌面系統。",
    ),
  },
  {
    slug: "smart-living",
    name: lt("Smart living", "智慧生活"),
    description: lt(
      "Home technology with low visual noise and practical everyday intelligence.",
      "低視覺干擾、卻能真正提升日常效率的智慧居家產品。",
    ),
    eyebrow: lt("Quiet intelligence", "低調智能"),
    heroTitle: lt(
      "A calmer home starts with better objects.",
      "更平靜的家，始於更周到的器物。",
    ),
    heroCopy: lt(
      "Displays, diffusers, and climate tools designed to blend into the rhythm of modern homes.",
      "以現代居住節奏為基礎，打造能自然融入日常的智慧顯示、香氛與環境控制產品。",
    ),
  },
  {
    slug: "personal-carry",
    name: lt("Personal carry", "隨行收納"),
    description: lt(
      "Bags and small leather goods engineered for transit, gifting, and daily movement.",
      "為通勤、旅行與送禮而設計的包款與皮件。",
    ),
    eyebrow: lt("Made for movement", "移動生活"),
    heroTitle: lt(
      "Carry pieces that travel with quiet confidence.",
      "低調、穩定、耐看的隨行收納系統。",
    ),
    heroCopy: lt(
      "Velora’s carry line prioritises weight balance, pocket logic, and premium materials that age well.",
      "Velora 的收納系列著重負重平衡、分層邏輯與經得起時間的高質感材質。",
    ),
  },
  {
    slug: "travel-power",
    name: lt("Travel power", "旅途供電"),
    description: lt(
      "Power and docking essentials that keep devices ready without visual clutter.",
      "為旅途中與桌面上提供高效率供電，卻不造成視覺雜訊的關鍵配件。",
    ),
    eyebrow: lt("Power, reduced", "簡化供電"),
    heroTitle: lt(
      "High-output charging in a smaller footprint.",
      "更小體積，仍保有高效輸出。",
    ),
    heroCopy: lt(
      "Smart port layouts, compact GaN architecture, and premium finishing for mobile professionals.",
      "以聰明的接口布局、GaN 架構與精緻外觀，服務真正需要機動性的專業工作者。",
    ),
  },
];

export const promotions: Promotion[] = [
  {
    code: "FIRSTLIGHT",
    title: lt("Welcome privilege", "新客禮遇"),
    description: lt(
      "10% off your first order over HK$2,200.",
      "首筆訂單滿 HK$2,200 即享 9 折優惠。",
    ),
    minimumSpend: 2200,
    discountType: "percentage",
    discountValue: 10,
    badge: lt("10% off", "9 折"),
  },
  {
    code: "STUDIOSET",
    title: lt("Workspace edit", "桌面成套優惠"),
    description: lt(
      "Save HK$300 when purchasing any two workspace or smart-living products together.",
      "任選兩件工作桌面或智慧生活商品，可享 HK$300 優惠。",
    ),
    minimumSpend: 1800,
    discountType: "fixed",
    discountValue: 300,
    badge: lt("HK$300 off", "現折 HK$300"),
  },
  {
    code: "TRAVELREADY",
    title: lt("Travel service upgrade", "旅行升級禮遇"),
    description: lt(
      "Complimentary express delivery and a Velora cable wrap on orders over HK$2,800.",
      "滿 HK$2,800 可享免費快遞及 Velora 線材束帶一件。",
    ),
    minimumSpend: 2800,
    discountType: "fixed",
    discountValue: 160,
    badge: lt("Express included", "含快遞升級"),
  },
];

export const products: Product[] = [
  {
    slug: "arc-one-headphones",
    category: "audio",
    collection: "quiet-motion",
    tags: ["noise cancelling", "wireless", "travel", "premium audio"],
    name: lt("Arc One Headphones", "Arc One 頭戴式耳機"),
    shortDescription: lt(
      "Reference-grade wireless headphones with adaptive quiet modes and all-day comfort.",
      "結合自適應靜音模式與長時間舒適配戴的旗艦級無線耳機。",
    ),
    description: lt(
      "Arc One pairs low-distortion drivers with pressure-balanced comfort, spatial tuning, and a travel-ready fold that slips easily into the weekender.",
      "Arc One 結合低失真單元、均壓佩戴結構與空間調音，並以可折疊設計回應日常通勤與旅行需要。",
    ),
    price: 3290,
    compareAtPrice: 3790,
    rating: 4.9,
    reviewCount: 128,
    stockState: "low",
    stockCount: 7,
    highlights: [
      lt("40-hour battery", "40 小時續航"),
      lt("Spatial listening", "空間聲場"),
      lt("USB-C lossless audio", "USB-C 無損傳輸"),
    ],
    variants: [
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "obsidian", label: lt("Obsidian", "曜石黑"), value: "obsidian", hex: "#1d1a18" },
          { id: "mist", label: lt("Mist", "霧灰"), value: "mist", hex: "#b6b2ad" },
          { id: "sand", label: lt("Sand", "沙霧色"), value: "sand", hex: "#d8ccb8" },
        ],
      },
      {
        id: "bundle",
        name: lt("Bundle", "組合"),
        display: "button",
        options: [
          { id: "standard", label: lt("Standard", "標準版"), value: "standard" },
          {
            id: "travel-set",
            label: lt("Travel set", "旅行套裝"),
            value: "travel-set",
            surcharge: 480,
          },
        ],
      },
    ],
    defaultVariantSelection: {
      finish: "obsidian",
      bundle: "standard",
    },
    visuals: [
      {
        id: "hero",
        label: lt("Hero angle", "主視角"),
        kind: "headphones",
        palette: {
          base: "#231f1b",
          glow: "#7e6757",
          accent: "#d3b17b",
          surface: "#f4eee7",
        },
        caption: lt("Balanced comfort with precision materials.", "以精準材質重塑佩戴舒適。"),
      },
      {
        id: "detail",
        label: lt("Acoustic detail", "聲學細節"),
        kind: "headphones",
        palette: {
          base: "#d4c8b6",
          glow: "#f3e1b8",
          accent: "#7f5f4f",
          surface: "#faf6f1",
        },
        caption: lt("Dual-chamber acoustic architecture.", "雙腔體聲學結構。"),
      },
      {
        id: "travel",
        label: lt("Travel fold", "收納狀態"),
        kind: "headphones",
        palette: {
          base: "#4b4d55",
          glow: "#91a1ad",
          accent: "#e6d0af",
          surface: "#f7f4ef",
        },
        caption: lt("Folds neatly for compact packing.", "可俐落收納，方便隨行。"),
      },
    ],
    features: [
      {
        title: lt("Comfort that disappears", "幾乎感受不到存在的舒適"),
        description: lt(
          "A suspended knit headband distributes pressure evenly so longer listening sessions feel lighter.",
          "懸浮式針織頭帶平均分散壓力，讓長時間佩戴依然輕鬆。",
        ),
      },
      {
        title: lt("Adaptive quiet control", "自適應靜音控制"),
        description: lt(
          "Intelligent noise management shifts between focus, awareness, and transit modes with a single press.",
          "系統可在專注、感知與通勤模式間自動切換，應對不同環境。",
        ),
      },
      {
        title: lt("Wired fidelity when needed", "需要時切換至高保真有線模式"),
        description: lt(
          "USB-C lossless playback keeps latency low for editing, flights, and focused desk sessions.",
          "USB-C 無損播放可降低延遲，適合剪輯、飛行途中或桌面深度工作情境。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Performance", "效能"),
        items: [
          { label: lt("Battery life", "續航"), value: lt("Up to 40 hours", "最長 40 小時") },
          { label: lt("Drivers", "單元"), value: lt("42 mm dual-cavity dynamic", "42 mm 雙腔體動圈") },
          { label: lt("Charging", "充電"), value: lt("USB-C fast charge, 5 hours in 10 minutes", "USB-C 快充，10 分鐘可用 5 小時") },
        ],
      },
      {
        title: lt("Build", "材質與結構"),
        items: [
          { label: lt("Frame", "結構"), value: lt("Anodised aluminium and memory foam", "陽極鋁合金與記憶泡棉") },
          { label: lt("Weight", "重量"), value: lt("268 g", "268 克") },
          { label: lt("Connection", "連線"), value: lt("Bluetooth 5.4, USB-C audio", "Bluetooth 5.4、USB-C 音訊") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Can Arc One pair with two devices at once?", "Arc One 可以同時連接兩部裝置嗎？"),
        answer: lt(
          "Yes. Multipoint pairing lets you keep a phone and a laptop connected simultaneously.",
          "可以。多點連線可同時連接手機與電腦，切換更流暢。",
        ),
      },
      {
        question: lt("Are ear cushions replaceable?", "耳墊可以更換嗎？"),
        answer: lt(
          "Yes. Replacement cushions and headband sleeves are available through client care.",
          "可以。耳墊與頭帶保護套均可透過客戶服務加購更換。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "arc-1",
        author: "Natalie K.",
        location: lt("Singapore", "新加坡"),
        rating: 5,
        title: lt("Quiet without pressure", "安靜卻不壓耳"),
        body: lt(
          "The tuning is refined and the fit stays comfortable even on red-eye flights. It feels like a product designed by people who actually travel.",
          "聲音乾淨、配戴穩定，即使紅眼航班戴很久也不會不舒服。很明顯是理解旅行需求的人做出的產品。",
        ),
        date: "2026-02-11",
      },
      {
        id: "arc-2",
        author: "Gavin L.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("My default work headset", "已成為我的日常工作耳機"),
        body: lt(
          "Calls are clear, wired audio is stable, and the materials look premium without becoming flashy.",
          "通話清晰、有線模式穩定，整體質感高級但不張揚。",
        ),
        date: "2026-03-07",
      },
    ],
    relatedSlugs: ["flux-pocket-earbuds", "halo-mini-speaker", "studio-dock-140"],
    boughtTogetherSlugs: ["studio-dock-140", "meridian-weekender"],
  },
  {
    slug: "halo-mini-speaker",
    category: "audio",
    collection: "spring-edit",
    tags: ["speaker", "portable", "wireless", "outdoor"],
    name: lt("Halo Mini Speaker", "Halo Mini 便攜音箱"),
    shortDescription: lt(
      "Portable room-filling sound with a sculpted shell and intuitive touch controls.",
      "以雕塑感機身帶來飽滿聲場，並配備直覺式觸控操作的便攜音箱。",
    ),
    description: lt(
      "Halo Mini delivers a warm, balanced profile with enough projection for dinner tables, hotel rooms, and small gatherings.",
      "Halo Mini 擁有溫潤而平衡的調音，無論晚餐聚會、酒店房間或小型聚會都能撐起完整聲場。",
    ),
    price: 1690,
    compareAtPrice: 1890,
    rating: 4.8,
    reviewCount: 94,
    stockState: "in-stock",
    stockCount: 36,
    highlights: [
      lt("15-hour playtime", "15 小時播放"),
      lt("Stereo pairing", "支援立體聲配對"),
      lt("IP54 splash resistance", "IP54 防潑水"),
    ],
    variants: [
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "graphite", label: lt("Graphite", "石墨灰"), value: "graphite", hex: "#3c4048" },
          { id: "mist", label: lt("Mist", "薄霧白"), value: "mist", hex: "#d8d9d5" },
          { id: "clay", label: lt("Clay", "陶土色"), value: "clay", hex: "#b9816f" },
        ],
      },
      {
        id: "bundle",
        name: lt("Configuration", "選購方案"),
        display: "button",
        options: [
          { id: "single", label: lt("Single speaker", "單顆音箱"), value: "single" },
          { id: "stereo", label: lt("Stereo pair", "立體聲雙件組"), value: "stereo", surcharge: 1490 },
        ],
      },
    ],
    defaultVariantSelection: { finish: "graphite", bundle: "single" },
    visuals: [
      {
        id: "hero",
        label: lt("Front", "正面"),
        kind: "speaker",
        palette: {
          base: "#444146",
          glow: "#8d6d58",
          accent: "#f0d6b8",
          surface: "#f8f3ee",
        },
        caption: lt("Warm sound in a compact volume.", "在小巧機身中保有溫潤聲場。"),
      },
      {
        id: "top",
        label: lt("Top controls", "頂部控制"),
        kind: "speaker",
        palette: {
          base: "#c6b4a1",
          glow: "#f2dcc3",
          accent: "#675447",
          surface: "#fff9f3",
        },
        caption: lt("Touch controls with tactile feedback.", "具觸感回饋的觸控操作。"),
      },
    ],
    features: [
      {
        title: lt("Balanced tuning", "平衡且耐聽的調音"),
        description: lt(
          "Engineered to stay full at lower listening levels, making it ideal for desks and shared spaces.",
          "即使在較低音量下仍保有完整層次，適合桌面與共享空間使用。",
        ),
      },
      {
        title: lt("Flexible positioning", "擺放方式更自由"),
        description: lt(
          "A woven carry strap and rubberised base make Halo Mini stable across indoor and outdoor surfaces.",
          "編織提帶與防滑底座讓 Halo Mini 在室內外都能穩定擺放。",
        ),
      },
      {
        title: lt("Stereo expansion", "可延伸為立體聲組合"),
        description: lt(
          "Pair two speakers wirelessly for a wider stage and stronger bass response.",
          "可無線配對兩顆音箱，獲得更開闊的聲音舞台與更完整的低頻。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Audio", "聲音"),
        items: [
          { label: lt("Output", "輸出"), value: lt("30 W", "30 W") },
          { label: lt("Battery", "續航"), value: lt("Up to 15 hours", "最長 15 小時") },
          { label: lt("Wireless", "連線"), value: lt("Bluetooth 5.4", "Bluetooth 5.4") },
        ],
      },
      {
        title: lt("Build", "結構"),
        items: [
          { label: lt("Protection", "防護"), value: lt("IP54", "IP54") },
          { label: lt("Weight", "重量"), value: lt("640 g", "640 克") },
          { label: lt("Materials", "材質"), value: lt("Aluminium grille and silicone base", "鋁製網罩與矽膠底座") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Can Halo Mini be used while charging?", "Halo Mini 充電時可以播放嗎？"),
        answer: lt(
          "Yes. Playback and charging can happen at the same time through the USB-C port.",
          "可以。產品支援邊充邊播。",
        ),
      },
      {
        question: lt("Does the strap detach?", "提帶可以拆下嗎？"),
        answer: lt(
          "The woven strap is fixed for durability, but replacement service is available if needed.",
          "提帶為固定式設計以提升耐用度，如有需要仍可安排更換服務。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "halo-1",
        author: "Cheryl T.",
        location: lt("Taipei", "台北"),
        rating: 5,
        title: lt("Small footprint, bigger sound", "體積小，聲音卻很有份量"),
        body: lt(
          "It looks elegant on a shelf and has more bass control than most speakers this size.",
          "放在書架上很好看，低頻控制比同尺寸產品成熟得多。",
        ),
        date: "2026-01-23",
      },
      {
        id: "halo-2",
        author: "Marcus P.",
        location: lt("Melbourne", "墨爾本"),
        rating: 4,
        title: lt("Great for travel weekends", "很適合週末短途旅行"),
        body: lt(
          "I bought the stereo set and now keep one at home and one in my weekender.",
          "我買了雙件組，現在一顆放家裡，一顆固定放在旅行袋裡。",
        ),
        date: "2026-02-17",
      },
    ],
    relatedSlugs: ["arc-one-headphones", "flux-pocket-earbuds", "orbit-gan-charger"],
    boughtTogetherSlugs: ["meridian-weekender", "orbit-gan-charger"],
  },
  {
    slug: "flux-pocket-earbuds",
    category: "audio",
    collection: "quiet-motion",
    tags: ["earbuds", "anc", "compact", "calls"],
    name: lt("Flux Pocket Earbuds", "Flux Pocket 真無線耳機"),
    shortDescription: lt(
      "Compact everyday earbuds with clear calls, adaptive noise control, and a discreet charging case.",
      "小巧俐落的日常耳機，兼具清晰通話、自適應降噪與低調充電盒設計。",
    ),
    description: lt(
      "Flux Pocket is tuned for daily transitions, with stable multipoint pairing, balanced vocals, and a case slim enough for jacket pockets.",
      "Flux Pocket 以頻繁切換的日常節奏為核心，兼顧穩定多點連線、自然人聲與便於收納的輕薄盒身。",
    ),
    price: 1480,
    compareAtPrice: 1680,
    rating: 4.7,
    reviewCount: 161,
    stockState: "in-stock",
    stockCount: 58,
    highlights: [
      lt("32-hour total battery", "合共 32 小時續航"),
      lt("Adaptive ANC", "自適應降噪"),
      lt("Six-mic call clarity", "六麥克風通話"),
    ],
    variants: [
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "obsidian", label: lt("Obsidian", "曜石黑"), value: "obsidian", hex: "#1b1c20" },
          { id: "pearl", label: lt("Pearl", "珍珠白"), value: "pearl", hex: "#efede7" },
        ],
      },
      {
        id: "bundle",
        name: lt("Configuration", "選購方案"),
        display: "button",
        options: [
          { id: "standard", label: lt("Earbuds only", "耳機組"), value: "standard" },
          { id: "pad", label: lt("With charging pad", "含無線充電板"), value: "pad", surcharge: 260 },
        ],
      },
    ],
    defaultVariantSelection: { finish: "obsidian", bundle: "standard" },
    visuals: [
      {
        id: "hero",
        label: lt("Case", "充電盒"),
        kind: "earbuds",
        palette: {
          base: "#23262b",
          glow: "#7e8791",
          accent: "#f4d7b2",
          surface: "#f6f2ed",
        },
        caption: lt("Slim case built for everyday carry.", "為日常攜帶而設計的薄型盒身。"),
      },
      {
        id: "open",
        label: lt("Open view", "開盒狀態"),
        kind: "earbuds",
        palette: {
          base: "#ebe4d7",
          glow: "#fde8c4",
          accent: "#7b5b46",
          surface: "#fffbf6",
        },
        caption: lt("Adaptive audio in a discreet silhouette.", "在低調輪廓中實現智慧聆聽。"),
      },
    ],
    features: [
      {
        title: lt("Commute-ready call quality", "通勤中依然清楚通話"),
        description: lt(
          "Six microphones and voice isolation keep speech natural in transit-heavy environments.",
          "六組麥克風與人聲隔離演算法可在通勤情境中維持清晰通話。",
        ),
      },
      {
        title: lt("Adaptive fit set", "自適應配戴組合"),
        description: lt(
          "Multiple tip sizes and a pressure-relief nozzle improve comfort for extended wear.",
          "附多尺寸耳塞與減壓導流結構，長時間使用也更舒適。",
        ),
      },
      {
        title: lt("Quick transitions", "快速切換裝置"),
        description: lt(
          "Switch between laptop meetings and phone listening with dependable multipoint pairing.",
          "透過穩定的多點連線，在筆電會議與手機音樂之間快速切換。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Battery and audio", "續航與音訊"),
        items: [
          { label: lt("Earbuds", "耳機續航"), value: lt("8 hours", "8 小時") },
          { label: lt("With case", "含充電盒"), value: lt("32 hours total", "合共 32 小時") },
          { label: lt("Drivers", "單元"), value: lt("11 mm dynamic", "11 mm 動圈") },
        ],
      },
      {
        title: lt("Convenience", "使用體驗"),
        items: [
          { label: lt("Charging", "充電"), value: lt("USB-C and Qi wireless", "USB-C 與 Qi 無線充電") },
          { label: lt("Protection", "防護"), value: lt("IPX4", "IPX4") },
          { label: lt("Pairing", "配對"), value: lt("Multipoint Bluetooth 5.4", "多點 Bluetooth 5.4") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Can one earbud be used on its own?", "可以單耳使用嗎？"),
        answer: lt(
          "Yes. Either earbud can be used independently for calls or voice listening.",
          "可以。左右耳都可獨立使用。",
        ),
      },
      {
        question: lt("Are replacement tips included?", "是否附有替換耳塞？"),
        answer: lt(
          "Yes. Four silicone sizes and one foam set are included in the box.",
          "有。盒內附四種矽膠尺寸與一組記憶泡棉耳塞。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "flux-1",
        author: "Yvonne C.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("The case is genuinely pocketable", "充電盒真的很適合放口袋"),
        body: lt(
          "Most earbuds claim to be compact, but this set finally feels good in tailored trousers.",
          "很多耳機都說自己小巧，但這款是真的適合放在西裝褲口袋裡。",
        ),
        date: "2026-03-04",
      },
      {
        id: "flux-2",
        author: "Daniel R.",
        location: lt("Seoul", "首爾"),
        rating: 4,
        title: lt("Balanced tuning", "音色很均衡"),
        body: lt(
          "Clear enough for podcasts, warm enough for music, and the ANC is more useful than aggressive.",
          "聽 podcast 很清晰，聽音樂也保有溫度，降噪效果不是暴力型，但非常實用。",
        ),
        date: "2026-02-02",
      },
    ],
    relatedSlugs: ["arc-one-headphones", "halo-mini-speaker", "orbit-gan-charger"],
    boughtTogetherSlugs: ["orbit-gan-charger", "forma-sling"],
  },
  {
    slug: "studio-dock-140",
    category: "travel-power",
    collection: "studio-living",
    tags: ["dock", "charging", "gan", "workspace"],
    name: lt("Studio Dock 140", "Studio Dock 140 多功能充電底座"),
    shortDescription: lt(
      "A sculpted GaN dock with laptop charging, device stand support, and cable order built in.",
      "以雕塑感外型整合筆電供電、裝置支架與理線功能的 GaN 充電底座。",
    ),
    description: lt(
      "Studio Dock 140 consolidates power, posture, and cable control into one compact object built for focused desks and hotel work setups.",
      "Studio Dock 140 將高輸出供電、抬高視角與理線需求整合於同一件作品，適合工作桌面與旅途辦公。",
    ),
    price: 980,
    compareAtPrice: 1180,
    rating: 4.8,
    reviewCount: 73,
    stockState: "in-stock",
    stockCount: 44,
    highlights: [
      lt("140 W GaN output", "140 W GaN 輸出"),
      lt("Magnetic phone rest", "磁吸手機支架"),
      lt("Travel cable organisation", "整合式理線設計"),
    ],
    variants: [
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "graphite", label: lt("Graphite", "石墨灰"), value: "graphite", hex: "#40464f" },
          { id: "sand", label: lt("Sand", "砂岩色"), value: "sand", hex: "#d0c1b0" },
        ],
      },
      {
        id: "adapter",
        name: lt("Adapter kit", "轉接套件"),
        display: "button",
        options: [
          { id: "hk", label: lt("Hong Kong", "香港插腳"), value: "hk" },
          { id: "intl", label: lt("International kit", "國際旅行套件"), value: "intl", surcharge: 180 },
        ],
      },
    ],
    defaultVariantSelection: { finish: "graphite", adapter: "hk" },
    visuals: [
      {
        id: "hero",
        label: lt("Dock profile", "產品輪廓"),
        kind: "dock",
        palette: {
          base: "#454d55",
          glow: "#9da9b4",
          accent: "#f1d4a8",
          surface: "#f7f2eb",
        },
        caption: lt("Power, support, and order in one surface.", "將供電、支撐與秩序收納於同一底座。"),
      },
      {
        id: "desk",
        label: lt("Desk scene", "桌面情境"),
        kind: "dock",
        palette: {
          base: "#dac8b8",
          glow: "#ffe7c9",
          accent: "#6a5444",
          surface: "#fffaf4",
        },
        caption: lt("Designed for tighter workspaces.", "為有限桌面空間而設計。"),
      },
    ],
    features: [
      {
        title: lt("One-object desk reset", "一件作品整理整個桌面"),
        description: lt(
          "Raises a phone or tablet, powers a laptop, and guides cables into a cleaner visual line.",
          "可抬高手機或平板視角、替筆電供電，並讓線材回到更整潔的視覺節奏。",
        ),
      },
      {
        title: lt("Travel capable", "可直接帶上旅程"),
        description: lt(
          "GaN architecture keeps weight down while still handling laptops, tablets, and phones efficiently.",
          "GaN 架構兼顧輕量與高輸出，可同時滿足筆電、平板與手機需求。",
        ),
      },
      {
        title: lt("Premium feel under daily use", "適合長期日用的細節質感"),
        description: lt(
          "A weighted base, soft-touch cable channel, and chamfered edge keep the object visually calm and stable.",
          "加重底座、柔感理線槽與倒角邊緣，使產品在視覺與使用上都更穩定。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Ports and power", "接口與功率"),
        items: [
          { label: lt("Output", "輸出"), value: lt("2 x USB-C, 1 x USB-A, up to 140 W", "2 個 USB-C、1 個 USB-A，最高 140 W") },
          { label: lt("Stand angle", "支架角度"), value: lt("20 degrees", "20 度") },
          { label: lt("Cable", "線長"), value: lt("1.6 m braided power cable", "1.6 米編織電源線") },
        ],
      },
      {
        title: lt("Materials", "材質"),
        items: [
          { label: lt("Body", "機身"), value: lt("Anodised aluminium shell", "陽極鋁合金外殼") },
          { label: lt("Base", "底座"), value: lt("Silicone and steel core", "矽膠底面與鋼芯結構") },
          { label: lt("Weight", "重量"), value: lt("420 g", "420 克") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Will Studio Dock 140 fast-charge a 16-inch laptop?", "Studio Dock 140 可以快充 16 吋筆電嗎？"),
        answer: lt(
          "Yes. It supports up to 140 W USB-C Power Delivery for compatible laptops.",
          "可以。相容機型可透過 USB-C Power Delivery 享最高 140 W 充電。",
        ),
      },
      {
        question: lt("Is the magnetic rest MagSafe compatible?", "磁吸支架支援 MagSafe 嗎？"),
        answer: lt(
          "The rest supports magnetic alignment for compatible phones and includes a low-profile adapter ring.",
          "支架支援相容手機的磁吸定位，並附有低調轉接環可供其他機型使用。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "dock-1",
        author: "Iris M.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("Desk finally looks intentional", "桌面終於看起來有設計感"),
        body: lt(
          "It replaced three chargers and a stand, which immediately made my desk feel calmer.",
          "一件就取代三個充電器和支架，桌面立刻變得乾淨很多。",
        ),
        date: "2026-02-14",
      },
      {
        id: "dock-2",
        author: "Simon W.",
        location: lt("Osaka", "大阪"),
        rating: 4,
        title: lt("Great hotel setup companion", "很適合旅館工作桌"),
        body: lt(
          "The international kit was worth it. Compact enough for luggage and strong enough for my full travel setup.",
          "國際套件很值得，體積對行李友善，但輸出足夠帶動整套旅途工作設備。",
        ),
        date: "2026-01-29",
      },
    ],
    relatedSlugs: ["orbit-gan-charger", "loom-wireless-keyboard", "lumen-desk-light"],
    boughtTogetherSlugs: ["loom-wireless-keyboard", "lumen-desk-light"],
  },
  {
    slug: "frame-s-display",
    category: "smart-living",
    collection: "studio-living",
    tags: ["smart display", "home", "calendar", "photo frame"],
    name: lt("Frame S Display", "Frame S 智慧顯示器"),
    shortDescription: lt(
      "A soft-edged smart display for home scheduling, ambient information, and family sharing.",
      "以柔和輪廓呈現的智慧顯示器，適合管理家中行程、資訊與共享相簿。",
    ),
    description: lt(
      "Frame S brings household routines into focus with calm visuals, excellent viewing angles, and elegant standby modes that look at home on shelves or counters.",
      "Frame S 以安靜的畫面語言協調家庭作息，具備優秀可視角度與待機展示模式，自然融入層架或邊桌。",
    ),
    price: 2390,
    compareAtPrice: 2690,
    rating: 4.8,
    reviewCount: 66,
    stockState: "in-stock",
    stockCount: 29,
    highlights: [
      lt("8-inch or 11-inch display", "8 吋或 11 吋螢幕"),
      lt("Ambient standby modes", "情境待機畫面"),
      lt("Shared household routines", "共享家庭日程"),
    ],
    variants: [
      {
        id: "size",
        name: lt("Size", "尺寸"),
        display: "button",
        options: [
          { id: "8", label: lt("8-inch", "8 吋"), value: "8" },
          { id: "11", label: lt("11-inch", "11 吋"), value: "11", surcharge: 600 },
        ],
      },
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "fog", label: lt("Fog", "霧白"), value: "fog", hex: "#ebe8e0" },
          { id: "graphite", label: lt("Graphite", "石墨"), value: "graphite", hex: "#50525b" },
        ],
      },
    ],
    defaultVariantSelection: { size: "8", finish: "fog" },
    visuals: [
      {
        id: "hero",
        label: lt("Display front", "正面"),
        kind: "display",
        palette: {
          base: "#ece6db",
          glow: "#fceccc",
          accent: "#736050",
          surface: "#fffaf2",
        },
        caption: lt("Looks at home even when idle.", "即使待機，也像家中的一件安靜擺設。"),
      },
      {
        id: "counter",
        label: lt("Shelf scene", "家居情境"),
        kind: "display",
        palette: {
          base: "#58606a",
          glow: "#9ea7b0",
          accent: "#f3d2a4",
          surface: "#f7f2ea",
        },
        caption: lt("Schedules, weather, and shared notes in one place.", "把行程、天氣與共享訊息集中在同一視窗。"),
      },
    ],
    features: [
      {
        title: lt("Household rhythm, simplified", "讓一家人的節奏更清楚"),
        description: lt(
          "Shared reminders, weather, travel times, and visual routines reduce friction in busy households.",
          "透過共享提醒、天氣資訊、出行時間與視覺化排程，降低家庭日常協調成本。",
        ),
      },
      {
        title: lt("Ambient by design", "待機時也有美感"),
        description: lt(
          "A subdued interface and artful standby screens let it function like a digital object, not an intrusive screen.",
          "介面克制、待機畫面細緻，使它更像一件數位擺設，而非突兀的螢幕。",
        ),
      },
      {
        title: lt("Thoughtful sound and voice", "更順手的語音與聲音回應"),
        description: lt(
          "Integrated far-field microphones and tuned speakers make quick requests reliable without dominating the room.",
          "內建遠場麥克風與調校喇叭，讓語音操作自然順手，卻不打擾空間氛圍。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Display", "顯示"),
        items: [
          { label: lt("Resolution", "解析度"), value: lt("2K laminated panel", "2K 全貼合面板") },
          { label: lt("Brightness", "亮度"), value: lt("Adaptive ambient brightness", "自動環境光調節") },
          { label: lt("Audio", "音效"), value: lt("Dual front speakers", "雙前置喇叭") },
        ],
      },
      {
        title: lt("Connectivity", "連線"),
        items: [
          { label: lt("Wireless", "無線"), value: lt("Wi-Fi 6E, Bluetooth 5.4", "Wi-Fi 6E、Bluetooth 5.4") },
          { label: lt("Privacy", "私隱"), value: lt("Mic mute switch and camera cover", "實體麥克風靜音鍵與鏡頭遮罩") },
          { label: lt("Mount", "擺放"), value: lt("Shelf stand included", "附層架立座") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Can Frame S be wall-mounted?", "Frame S 可以掛牆嗎？"),
        answer: lt(
          "Yes. An optional low-profile wall mount is available through client care.",
          "可以。另可選購低調壁掛配件。",
        ),
      },
      {
        question: lt("Does it support shared family calendars?", "支援家庭共享行事曆嗎？"),
        answer: lt(
          "Yes. Multiple accounts can be layered into a single household view.",
          "支援。可將多個帳戶整合為單一家居視圖。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "frame-1",
        author: "Olivia H.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("Finally a home hub that looks good", "終於有好看的家用中樞"),
        body: lt(
          "It keeps family logistics visible without making the living room feel like an office.",
          "它把家庭日程整理得很清楚，但不會讓客廳看起來像辦公室。",
        ),
        date: "2026-03-12",
      },
      {
        id: "frame-2",
        author: "Haruto N.",
        location: lt("Tokyo", "東京"),
        rating: 4,
        title: lt("Standby mode is beautiful", "待機畫面很漂亮"),
        body: lt(
          "We keep it in the kitchen and it feels more like a frame than a tablet.",
          "我們把它放在廚房，看起來更像畫框而不是一台平板。",
        ),
        date: "2026-02-09",
      },
    ],
    relatedSlugs: ["sense-climate-hub", "hearth-diffuser-pro", "lumen-desk-light"],
    boughtTogetherSlugs: ["sense-climate-hub", "hearth-diffuser-pro"],
  },
  {
    slug: "loom-wireless-keyboard",
    category: "workspace",
    collection: "studio-living",
    tags: ["keyboard", "workspace", "typing", "multi-device"],
    name: lt("Loom Wireless Keyboard", "Loom 無線鍵盤"),
    shortDescription: lt(
      "A tactile, low-noise keyboard engineered for focused work and multi-device setups.",
      "為深度工作與多裝置切換而設計的低噪聲、具手感的無線鍵盤。",
    ),
    description: lt(
      "Loom uses a damped switch system and a rigid aluminium plate to create a precise typing feel without overwhelming a shared room.",
      "Loom 以阻尼鍵軸與剛性鋁板結構帶來俐落手感，同時把聲響控制在共享空間能接受的範圍內。",
    ),
    price: 1280,
    compareAtPrice: 1480,
    rating: 4.9,
    reviewCount: 117,
    stockState: "in-stock",
    stockCount: 51,
    highlights: [
      lt("Damped tactile switches", "阻尼觸感軸"),
      lt("Triple-device pairing", "三裝置配對"),
      lt("Machined aluminium top", "精製鋁合金上蓋"),
    ],
    variants: [
      {
        id: "layout",
        name: lt("Layout", "鍵盤配置"),
        display: "button",
        options: [
          { id: "compact", label: lt("Compact", "精簡版"), value: "compact" },
          { id: "full", label: lt("Full size", "全尺寸"), value: "full", surcharge: 200 },
        ],
      },
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "stone", label: lt("Stone", "石灰"), value: "stone", hex: "#dcd6cd" },
          { id: "graphite", label: lt("Graphite", "石墨"), value: "graphite", hex: "#474d56" },
        ],
      },
    ],
    defaultVariantSelection: { layout: "compact", finish: "stone" },
    visuals: [
      {
        id: "hero",
        label: lt("Keyboard top", "鍵盤俯視"),
        kind: "keyboard",
        palette: {
          base: "#ddd3c6",
          glow: "#ffebcb",
          accent: "#5e4d42",
          surface: "#fdf8f1",
        },
        caption: lt("Quiet tactility with premium detailing.", "把安靜手感與細節質感結合。"),
      },
      {
        id: "desk",
        label: lt("Desk setup", "桌面情境"),
        kind: "keyboard",
        palette: {
          base: "#515660",
          glow: "#919aa7",
          accent: "#f2d5af",
          surface: "#f7f2eb",
        },
        caption: lt("Built for focused work environments.", "為專注工作的桌面環境而生。"),
      },
    ],
    features: [
      {
        title: lt("Low-noise confidence", "安靜卻俐落的輸入感"),
        description: lt(
          "The damped switch profile keeps the sound gentle while preserving crisp feedback.",
          "阻尼鍵軸降低噪聲，同時保有清楚而穩定的回饋感。",
        ),
      },
      {
        title: lt("Switch between devices instantly", "快速切換多裝置"),
        description: lt(
          "Move between laptop, tablet, and phone with dedicated profile keys and stable memory.",
          "透過專屬切換鍵，可在筆電、平板與手機間迅速切換。",
        ),
      },
      {
        title: lt("Built to age well", "為長久使用而打造"),
        description: lt(
          "PBT caps, machined aluminium, and a subtle incline create a premium tool that holds up under daily use.",
          "PBT 鍵帽、精製鋁件與細緻角度設計，讓它成為真正耐用的日常工具。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Typing", "打字體驗"),
        items: [
          { label: lt("Switch type", "鍵軸"), value: lt("Damped tactile", "阻尼觸感軸") },
          { label: lt("Battery", "續航"), value: lt("Up to 90 days", "最長 90 天") },
          { label: lt("Backlight", "背光"), value: lt("Adaptive warm white", "自適應暖白背光") },
        ],
      },
      {
        title: lt("Connectivity", "連線"),
        items: [
          { label: lt("Wireless", "無線"), value: lt("Bluetooth 5.4", "Bluetooth 5.4") },
          { label: lt("Wired", "有線"), value: lt("USB-C", "USB-C") },
          { label: lt("Compatibility", "相容"), value: lt("macOS, Windows, iPadOS", "macOS、Windows、iPadOS") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Does Loom support both Mac and Windows legends?", "Loom 同時支援 Mac 與 Windows 鍵位嗎？"),
        answer: lt(
          "Yes. The box includes alternate modifier caps for both layouts.",
          "支援。包裝內附兩種系統對應的功能鍵帽。",
        ),
      },
      {
        question: lt("Can the battery be used while charging?", "充電時能繼續使用嗎？"),
        answer: lt(
          "Yes. USB-C wired mode works while the battery tops up.",
          "可以。接上 USB-C 後可邊充邊用。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "loom-1",
        author: "Rachel C.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("Refined and quiet", "安靜而且很有質感"),
        body: lt(
          "It has enough feel to stay satisfying, but it doesn’t dominate an open office.",
          "手感很到位，但不會在開放式辦公室製造太多聲響。",
        ),
        date: "2026-03-06",
      },
      {
        id: "loom-2",
        author: "Ben K.",
        location: lt("Bangkok", "曼谷"),
        rating: 5,
        title: lt("Switching between devices is seamless", "切換裝置真的很順"),
        body: lt(
          "Perfect for the way I work between a laptop, tablet, and phone each day.",
          "很適合我每天在筆電、平板與手機之間切換的工作方式。",
        ),
        date: "2026-02-19",
      },
    ],
    relatedSlugs: ["studio-dock-140", "lumen-desk-light", "arc-one-headphones"],
    boughtTogetherSlugs: ["studio-dock-140", "lumen-desk-light"],
  },
  {
    slug: "lumen-desk-light",
    category: "workspace",
    collection: "studio-living",
    tags: ["lighting", "desk lamp", "ambient", "workspace"],
    name: lt("Lumen Desk Light", "Lumen 桌面燈"),
    shortDescription: lt(
      "A glare-free task light with ambient side glow and scene presets for focused hours.",
      "兼具無眩光工作照明與側向氛圍光的桌燈，可快速切換不同工作情境。",
    ),
    description: lt(
      "Lumen brings visual softness to focused desks with high colour accuracy, a slim profile, and motion-free brightness changes that feel architectural rather than technical.",
      "Lumen 以高顯色、纖薄輪廓與順暢光感調節，讓工作桌面在功能之外也保有空間美感。",
    ),
    price: 1180,
    compareAtPrice: 1380,
    rating: 4.8,
    reviewCount: 89,
    stockState: "in-stock",
    stockCount: 33,
    highlights: [
      lt("Glare-free task beam", "無眩光照明"),
      lt("Circadian presets", "日夜節奏模式"),
      lt("Desk or clamp base", "桌面座或夾具座"),
    ],
    variants: [
      {
        id: "base",
        name: lt("Base", "底座"),
        display: "button",
        options: [
          { id: "desk", label: lt("Desk base", "桌面底座"), value: "desk" },
          { id: "clamp", label: lt("Clamp mount", "夾具底座"), value: "clamp", surcharge: 120 },
        ],
      },
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "bone", label: lt("Bone", "骨白"), value: "bone", hex: "#efe8de" },
          { id: "bronze", label: lt("Bronze", "暖銅"), value: "bronze", hex: "#8f664d" },
        ],
      },
    ],
    defaultVariantSelection: { base: "desk", finish: "bone" },
    visuals: [
      {
        id: "hero",
        label: lt("Lamp front", "正面"),
        kind: "lamp",
        palette: {
          base: "#efdfc8",
          glow: "#ffe8bc",
          accent: "#705540",
          surface: "#fffaf2",
        },
        caption: lt("Architectural light with low visual noise.", "低視覺干擾的建築感照明。"),
      },
      {
        id: "ambient",
        label: lt("Ambient glow", "氛圍光"),
        kind: "lamp",
        palette: {
          base: "#6b5647",
          glow: "#f6d8a8",
          accent: "#fff2e0",
          surface: "#f7f2eb",
        },
        caption: lt("Scene presets tuned for reading and evening work.", "為閱讀與夜間工作調校的情境模式。"),
      },
    ],
    features: [
      {
        title: lt("Light where it matters", "把光留在需要的位置"),
        description: lt(
          "The optical diffuser directs task light onto the desk while keeping the rest of the room comfortable.",
          "特殊導光設計把工作光集中在桌面，同時避免整個空間過度刺眼。",
        ),
      },
      {
        title: lt("Mood without spectacle", "保有氛圍而不誇張"),
        description: lt(
          "A subtle side glow adds depth after dark without turning the light into visual clutter.",
          "側向柔光讓夜晚桌面更有層次，卻不會成為多餘的視覺焦點。",
        ),
      },
      {
        title: lt("Preset around your day", "依照作息切換光感"),
        description: lt(
          "Warm reading, crisp focus, and late-night wind-down modes are available from the dial.",
          "旋鈕可快速切換閱讀、專注與晚間放鬆等不同光線模式。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Lighting", "照明"),
        items: [
          { label: lt("Brightness", "亮度"), value: lt("Up to 1,000 lux at desk height", "桌面高度最高 1,000 lux") },
          { label: lt("Colour temperature", "色溫"), value: lt("2,700 K to 5,000 K", "2,700 K 至 5,000 K") },
          { label: lt("CRI", "顯色指數"), value: lt("95+", "95+") },
        ],
      },
      {
        title: lt("Build", "結構"),
        items: [
          { label: lt("Arm reach", "燈臂長度"), value: lt("58 cm", "58 公分") },
          { label: lt("Control", "控制"), value: lt("Capacitive dial", "電容式旋鈕") },
          { label: lt("Materials", "材質"), value: lt("Aluminium and opal diffuser", "鋁材與乳白擴散罩") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Does Lumen remember my last setting?", "Lumen 會記住上次設定嗎？"),
        answer: lt(
          "Yes. It resumes the last used brightness and scene mode automatically.",
          "會。產品會自動保留上次使用的亮度與模式。",
        ),
      },
      {
        question: lt("Can the clamp mount fit thicker desks?", "夾具底座能支援較厚桌板嗎？"),
        answer: lt(
          "The clamp base supports surfaces up to 5.5 cm thick.",
          "夾具版本可支援最高 5.5 公分厚的桌板。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "lumen-1",
        author: "Audrey S.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("Exactly the right light", "光線剛剛好"),
        body: lt(
          "No glare on screens, excellent warmth in the evenings, and the dial feels premium.",
          "看螢幕完全不刺眼，晚上又有很柔和的光感，旋鈕手感也很好。",
        ),
        date: "2026-02-05",
      },
      {
        id: "lumen-2",
        author: "Jun L.",
        location: lt("Shanghai", "上海"),
        rating: 4,
        title: lt("Beautiful on the desk", "放在桌上很漂亮"),
        body: lt(
          "It makes the whole setup feel more intentional, not just brighter.",
          "它不是單純變亮，而是讓整個桌面看起來更有整體感。",
        ),
        date: "2026-03-10",
      },
    ],
    relatedSlugs: ["loom-wireless-keyboard", "studio-dock-140", "frame-s-display"],
    boughtTogetherSlugs: ["loom-wireless-keyboard", "studio-dock-140"],
  },
  {
    slug: "hearth-diffuser-pro",
    category: "smart-living",
    collection: "spring-edit",
    tags: ["diffuser", "home", "scent", "ambient"],
    name: lt("Hearth Diffuser Pro", "Hearth Pro 智慧香氛機"),
    shortDescription: lt(
      "Cold-air diffusion with whisper-quiet operation and schedule-based scent scenes.",
      "採用冷霧擴香技術，運作安靜，並可設定不同時段香氛情境。",
    ),
    description: lt(
      "Hearth Diffuser Pro brings hotel-grade scent control into the home, pairing elegant materials with low-maintenance cartridges and intelligent timing.",
      "Hearth Diffuser Pro 將精品酒店等級的香氛體驗帶回家中，以優雅材質、低維護設計與智慧排程呈現日常儀式感。",
    ),
    price: 960,
    compareAtPrice: 1080,
    rating: 4.7,
    reviewCount: 52,
    stockState: "in-stock",
    stockCount: 41,
    highlights: [
      lt("Cold-air diffusion", "冷霧擴香"),
      lt("Near-silent operation", "近乎無聲"),
      lt("Scene scheduling", "可排程情境"),
    ],
    variants: [
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "stone", label: lt("Stone", "礦石灰"), value: "stone", hex: "#bfc0b9" },
          { id: "forest", label: lt("Forest", "森林綠"), value: "forest", hex: "#56614e" },
        ],
      },
      {
        id: "bundle",
        name: lt("Bundle", "組合"),
        display: "button",
        options: [
          { id: "core", label: lt("Core diffuser", "主機"), value: "core" },
          { id: "trio", label: lt("Starter trio", "入門三支香氛"), value: "trio", surcharge: 280 },
        ],
      },
    ],
    defaultVariantSelection: { finish: "stone", bundle: "core" },
    visuals: [
      {
        id: "hero",
        label: lt("Diffuser body", "產品輪廓"),
        kind: "diffuser",
        palette: {
          base: "#b9b9b0",
          glow: "#f4e4c5",
          accent: "#5b5247",
          surface: "#fdf8f1",
        },
        caption: lt("Scent as atmosphere, not intrusion.", "讓香氛成為空間氛圍，而非主角。"),
      },
      {
        id: "evening",
        label: lt("Evening scene", "夜晚情境"),
        kind: "diffuser",
        palette: {
          base: "#535c4f",
          glow: "#d7bf8d",
          accent: "#f9ead2",
          surface: "#f8f3ea",
        },
        caption: lt("Quiet diffusion for bedrooms and shared spaces.", "適合臥室與共享空間的安靜擴香。"),
      },
    ],
    features: [
      {
        title: lt("Clean, dry diffusion", "乾淨而細緻的擴香方式"),
        description: lt(
          "Cold-air technology disperses scent without adding humidity or residue to surfaces.",
          "冷霧擴香不增加濕度，也不易在表面殘留水痕。",
        ),
      },
      {
        title: lt("Scene-based scenting", "按時段設定香氛節奏"),
        description: lt(
          "Programme separate weekday, evening, and arrival scenes to match routines and room size.",
          "可依平日、夜晚或回家時段設定不同香氛節奏，貼合空間與生活習慣。",
        ),
      },
      {
        title: lt("Minimal maintenance", "保養方式簡單"),
        description: lt(
          "Snap-in fragrance cartridges reduce spills and make refills quick and discreet.",
          "卡匣式香氛補充設計可減少傾倒與沾染，也讓更換過程更俐落。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Usage", "使用"),
        items: [
          { label: lt("Coverage", "適用範圍"), value: lt("Up to 45 m²", "最高 45 平方米") },
          { label: lt("Noise", "噪音"), value: lt("Below 25 dB", "低於 25 dB") },
          { label: lt("Control", "控制"), value: lt("Touch controls and app scheduling", "觸控操作與 App 排程") },
        ],
      },
      {
        title: lt("Build", "結構"),
        items: [
          { label: lt("Cartridge", "香氛卡匣"), value: lt("Magnetic 30 ml cartridge", "磁吸式 30 ml 卡匣") },
          { label: lt("Power", "供電"), value: lt("USB-C or wall power", "USB-C 或插電使用") },
          { label: lt("Body", "機身"), value: lt("Ceramic shell", "陶瓷外殼") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Can I use my own oils?", "可以使用自備精油嗎？"),
        answer: lt(
          "For best performance, use Velora cartridges calibrated for the diffusion system.",
          "為維持最佳效果，建議使用為系統調校的 Velora 香氛卡匣。",
        ),
      },
      {
        question: lt("How often do cartridges need replacing?", "香氛卡匣多久需要更換？"),
        answer: lt(
          "One cartridge lasts about 30 days with a moderate daily schedule.",
          "以中等使用頻率計算，一支卡匣約可使用 30 天。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "hearth-1",
        author: "Jade P.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("Hotel-level atmosphere", "有精品酒店的氛圍"),
        body: lt(
          "The scent feels clean and layered, not overpowering. Guests always ask what it is.",
          "香味很乾淨、有層次，不會太濃。朋友來家裡都會問這是什麼。",
        ),
        date: "2026-01-18",
      },
      {
        id: "hearth-2",
        author: "Mayumi K.",
        location: lt("Tokyo", "東京"),
        rating: 4,
        title: lt("Quiet enough for the bedroom", "放在臥室也夠安靜"),
        body: lt(
          "It runs softly enough overnight and the cartridges are easier than expected.",
          "晚上使用幾乎沒聲音，卡匣更換也比想像中方便。",
        ),
        date: "2026-02-27",
      },
    ],
    relatedSlugs: ["frame-s-display", "sense-climate-hub", "lumen-desk-light"],
    boughtTogetherSlugs: ["frame-s-display", "sense-climate-hub"],
  },
  {
    slug: "sense-climate-hub",
    category: "smart-living",
    collection: "studio-living",
    tags: ["climate", "smart home", "sensor", "air quality"],
    name: lt("Sense Climate Hub", "Sense 環境感測中心"),
    shortDescription: lt(
      "A refined hub for air quality, temperature, humidity, and presence-based home automation.",
      "兼顧空氣品質、溫濕度與在家情境自動化的高質感環境感測中樞。",
    ),
    description: lt(
      "Sense Climate Hub translates invisible home conditions into useful actions, helping modern households keep rooms comfortable and energy use efficient.",
      "Sense Climate Hub 將看不見的室內條件轉化成實際可用的調節建議與自動化，讓居家環境更舒適、更節能。",
    ),
    price: 1690,
    compareAtPrice: 1890,
    rating: 4.8,
    reviewCount: 41,
    stockState: "preorder",
    stockCount: 0,
    highlights: [
      lt("Air quality and humidity", "空氣品質與濕度監測"),
      lt("Occupancy sensing", "在家偵測"),
      lt("Automation routines", "自動化場景"),
    ],
    variants: [
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "pearl", label: lt("Pearl", "珍珠白"), value: "pearl", hex: "#f1eee8" },
          { id: "slate", label: lt("Slate", "板岩灰"), value: "slate", hex: "#60656a" },
        ],
      },
      {
        id: "bundle",
        name: lt("Bundle", "組合"),
        display: "button",
        options: [
          { id: "starter", label: lt("Starter hub", "基本組"), value: "starter" },
          { id: "sensors", label: lt("Hub + 2 room sensors", "主機 + 2 顆房間感測器"), value: "sensors", surcharge: 420 },
        ],
      },
    ],
    defaultVariantSelection: { finish: "pearl", bundle: "starter" },
    visuals: [
      {
        id: "hero",
        label: lt("Hub front", "主機外觀"),
        kind: "hub",
        palette: {
          base: "#f0ece4",
          glow: "#ffebc9",
          accent: "#6b5f54",
          surface: "#fffaf2",
        },
        caption: lt("Environmental insight with quiet presence.", "以低調形式持續感知室內環境。"),
      },
      {
        id: "data",
        label: lt("Sensor scene", "感測情境"),
        kind: "hub",
        palette: {
          base: "#666d72",
          glow: "#9eabb2",
          accent: "#f2d3a9",
          surface: "#f7f2eb",
        },
        caption: lt("Designed to disappear into the room.", "讓科技自然退到空間後方。"),
      },
    ],
    features: [
      {
        title: lt("A clearer reading of the room", "把房間狀態讀得更清楚"),
        description: lt(
          "Tracks air quality, humidity, temperature, and occupancy patterns to keep spaces consistent.",
          "持續追蹤空氣品質、溫濕度與在家狀態，協助空間維持穩定舒適。",
        ),
      },
      {
        title: lt("Automation that feels useful", "真正有感的自動化"),
        description: lt(
          "Trigger purifiers, lighting, or HVAC routines only when conditions call for them.",
          "依照實際環境條件觸發空氣清淨、照明或冷暖氣場景，避免過度干預。",
        ),
      },
      {
        title: lt("Designed for visible spaces", "適合擺在看得見的位置"),
        description: lt(
          "A woven fabric base and matte enclosure let the object sit comfortably on shelves and consoles.",
          "編織布底與霧面外殼使它更適合陳列於層架與邊櫃，不顯突兀。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Sensing", "感測"),
        items: [
          { label: lt("Metrics", "項目"), value: lt("PM2.5, VOC, CO₂ proxy, humidity, temperature", "PM2.5、VOC、CO₂ 估算值、濕度、溫度") },
          { label: lt("Connectivity", "連線"), value: lt("Wi-Fi 6, Thread", "Wi-Fi 6、Thread") },
          { label: lt("Automation", "自動化"), value: lt("Matter compatible", "支援 Matter") },
        ],
      },
      {
        title: lt("Timeline", "供貨"),
        items: [
          { label: lt("Availability", "出貨"), value: lt("Pre-order, ships mid April", "預購中，四月中旬出貨") },
          { label: lt("Warranty", "保養"), value: lt("2 years", "2 年") },
          { label: lt("Power", "供電"), value: lt("USB-C wall power", "USB-C 插電使用") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Why is Sense currently pre-order only?", "為何目前僅接受預購？"),
        answer: lt(
          "Demand for the room sensor bundle is ahead of the first allocation. Pre-orders secure priority dispatch.",
          "房間感測器套組需求高於首批配額，預購可優先安排出貨。",
        ),
      },
      {
        question: lt("Does it work without the optional room sensors?", "沒有加購房間感測器也能使用嗎？"),
        answer: lt(
          "Yes. The main hub works independently and can be expanded later.",
          "可以。主機本身即可獨立運作，之後也能再擴充。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "sense-1",
        author: "Victor A.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("Useful data, not noisy data", "資訊有用，不會過度打擾"),
        body: lt(
          "It surfaces what actually matters and the automations have helped us sleep better.",
          "它提供的是有用的資訊，不是噪音，而且自動化場景真的讓睡眠品質更穩定。",
        ),
        date: "2026-03-01",
      },
      {
        id: "sense-2",
        author: "Annie F.",
        location: lt("Sydney", "悉尼"),
        rating: 4,
        title: lt("Elegant and practical", "兼顧美感與實用"),
        body: lt(
          "I’m usually skeptical of home sensors, but this one earns its place visually and functionally.",
          "我本來對居家感測器沒什麼興趣，但這款在功能和外觀上都值得留下來。",
        ),
        date: "2026-03-15",
      },
    ],
    relatedSlugs: ["frame-s-display", "hearth-diffuser-pro", "lumen-desk-light"],
    boughtTogetherSlugs: ["frame-s-display", "hearth-diffuser-pro"],
  },
  {
    slug: "meridian-weekender",
    category: "personal-carry",
    collection: "quiet-motion",
    tags: ["bag", "travel", "weekender", "carry"],
    name: lt("Meridian Weekender", "Meridian 旅行袋"),
    shortDescription: lt(
      "A structured travel bag with balanced carry geometry and premium weather-resistant materials.",
      "以平衡受力與高質感防潑材質打造的結構型旅行袋。",
    ),
    description: lt(
      "Meridian is built for short-haul travel, overnight stays, and polished carry-on use, with a stable base and an interior system that respects how people actually pack.",
      "Meridian 為短途差旅、過夜旅行與精緻登機需求而設計，具備穩定底盤與更貼近日常收納習慣的內部分隔。",
    ),
    price: 2280,
    compareAtPrice: 2480,
    rating: 4.9,
    reviewCount: 84,
    stockState: "in-stock",
    stockCount: 22,
    highlights: [
      lt("36 L or 42 L capacity", "36 L 或 42 L 容量"),
      lt("Trolley sleeve", "行李箱套帶"),
      lt("Structured waterproof base", "防潑水結構底盤"),
    ],
    variants: [
      {
        id: "size",
        name: lt("Size", "尺寸"),
        display: "button",
        options: [
          { id: "36", label: lt("36 L", "36 L"), value: "36" },
          { id: "42", label: lt("42 L", "42 L"), value: "42", surcharge: 260 },
        ],
      },
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "onyx", label: lt("Onyx", "墨黑"), value: "onyx", hex: "#1f2327" },
          { id: "taupe", label: lt("Taupe", "灰褐"), value: "taupe", hex: "#9f8e7f" },
          { id: "olive", label: lt("Olive", "橄欖"), value: "olive", hex: "#5b5f53" },
        ],
      },
    ],
    defaultVariantSelection: { size: "36", finish: "onyx" },
    visuals: [
      {
        id: "hero",
        label: lt("Bag front", "正面"),
        kind: "weekender",
        palette: {
          base: "#202428",
          glow: "#7f6f63",
          accent: "#e4c7a1",
          surface: "#f8f3ec",
        },
        caption: lt("Structured carry with premium restraint.", "在克制的設計中保有完整機能。"),
      },
      {
        id: "travel",
        label: lt("Travel scene", "旅行情境"),
        kind: "weekender",
        palette: {
          base: "#a19082",
          glow: "#efd0ae",
          accent: "#4e4741",
          surface: "#fff9f2",
        },
        caption: lt("Built for polished short-haul travel.", "適合精緻短途旅行的主力包款。"),
      },
    ],
    features: [
      {
        title: lt("Balanced carry geometry", "受力更平均的提背結構"),
        description: lt(
          "Handles and strap anchors are positioned to keep the bag stable when fully packed.",
          "手提把與背帶受力點經過重新配置，裝滿時依然維持穩定。",
        ),
      },
      {
        title: lt("Packing system with logic", "更有邏輯的收納分層"),
        description: lt(
          "Quick-access top pockets, a dedicated shoe section, and a padded tech sleeve make packing feel less wasteful.",
          "上蓋快取袋、獨立鞋袋與保護性科技收納層，讓收納流程更有效率。",
        ),
      },
      {
        title: lt("Looks composed in transit", "旅途中依然體面俐落"),
        description: lt(
          "A restrained silhouette and elevated hardware allow the bag to move from airport lounge to hotel check-in seamlessly.",
          "克制輪廓與細緻金屬件，讓它從機場休息室到酒店入住都保持一致質感。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Capacity", "容量"),
        items: [
          { label: lt("Main volume", "主容量"), value: lt("36 L / 42 L", "36 L / 42 L") },
          { label: lt("Laptop compartment", "筆電層"), value: lt("Up to 16-inch", "最高 16 吋") },
          { label: lt("Exterior", "外層"), value: lt("Weatherproof coated textile", "防潑塗層織物") },
        ],
      },
      {
        title: lt("Carry", "攜帶"),
        items: [
          { label: lt("Strap", "背帶"), value: lt("Padded detachable strap", "可拆式減壓背帶") },
          { label: lt("Base", "底盤"), value: lt("Structured waterproof base", "防潑結構底盤") },
          { label: lt("Weight", "重量"), value: lt("1.35 kg", "1.35 公斤") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Does Meridian fit in overhead compartments?", "Meridian 可以上機置於頭頂行李櫃嗎？"),
        answer: lt(
          "Yes. Both sizes are designed for standard overhead cabin storage when not overpacked.",
          "可以。兩種尺寸在正常裝載下皆適合一般機艙行李櫃。",
        ),
      },
      {
        question: lt("Can the tech sleeve be removed?", "科技收納層可以拆下嗎？"),
        answer: lt(
          "The sleeve is integrated for structure, but it opens wide for faster access at security.",
          "收納層為固定式設計以維持包體結構，但開口夠大，過安檢時也更方便。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "meridian-1",
        author: "Claire N.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("The best short-trip bag I own", "我用過最好的短途旅行袋"),
        body: lt(
          "It holds shape beautifully and never feels sloppy, even when I pack in a hurry.",
          "即使匆忙收拾，它也能維持非常俐落的輪廓，不會顯得鬆垮。",
        ),
        date: "2026-03-16",
      },
      {
        id: "meridian-2",
        author: "Jason T.",
        location: lt("Singapore", "新加坡"),
        rating: 5,
        title: lt("Thoughtful interior layout", "內部分隔非常合理"),
        body: lt(
          "The shoe section and laptop sleeve are exactly where I expect them to be.",
          "鞋袋和筆電層的位置非常直覺，用起來很順手。",
        ),
        date: "2026-02-03",
      },
    ],
    relatedSlugs: ["forma-sling", "orbit-gan-charger", "arc-one-headphones"],
    boughtTogetherSlugs: ["arc-one-headphones", "orbit-gan-charger"],
  },
  {
    slug: "forma-sling",
    category: "personal-carry",
    collection: "spring-edit",
    tags: ["sling", "travel", "passport", "daily carry"],
    name: lt("Forma Sling", "Forma 斜背包"),
    shortDescription: lt(
      "A compact sling with modular pocketing, hidden passport storage, and a clean architectural line.",
      "結合模組化分層、隱藏護照夾層與俐落輪廓的小型斜背包。",
    ),
    description: lt(
      "Forma Sling is built for daily essentials, urban movement, and travel documents, with a silhouette that stays elegant even when packed out.",
      "Forma Sling 適合收納日常小物、移動中的隨身用品與旅行證件，即使裝滿也維持俐落線條。",
    ),
    price: 980,
    compareAtPrice: 1180,
    rating: 4.8,
    reviewCount: 108,
    stockState: "in-stock",
    stockCount: 39,
    highlights: [
      lt("Hidden passport sleeve", "隱藏護照夾層"),
      lt("Magnetic buckle", "磁吸快扣"),
      lt("Modular front organisation", "模組化前袋收納"),
    ],
    variants: [
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "carbon", label: lt("Carbon", "碳黑"), value: "carbon", hex: "#272a2e" },
          { id: "sand", label: lt("Sand", "砂米"), value: "sand", hex: "#d8cebf" },
          { id: "forest", label: lt("Forest", "深林"), value: "forest", hex: "#4f5a50" },
        ],
      },
      {
        id: "strap",
        name: lt("Strap", "肩帶"),
        display: "button",
        options: [
          { id: "standard", label: lt("Standard strap", "標準肩帶"), value: "standard" },
          { id: "woven", label: lt("Woven expedition strap", "編織加寬肩帶"), value: "woven", surcharge: 120 },
        ],
      },
    ],
    defaultVariantSelection: { finish: "carbon", strap: "standard" },
    visuals: [
      {
        id: "hero",
        label: lt("Front profile", "正面輪廓"),
        kind: "sling",
        palette: {
          base: "#292c31",
          glow: "#7f827c",
          accent: "#ebd0ab",
          surface: "#f7f2eb",
        },
        caption: lt("Compact shape, highly considered access.", "小巧體積中保有高度思考過的收納方式。"),
      },
      {
        id: "detail",
        label: lt("Pocket system", "收納細節"),
        kind: "sling",
        palette: {
          base: "#d9cfbf",
          glow: "#ffe6c0",
          accent: "#5d5148",
          surface: "#fffbf5",
        },
        caption: lt("Everything within immediate reach.", "讓重要物件始終在順手的位置。"),
      },
    ],
    features: [
      {
        title: lt("Quick-access travel essentials", "常用旅途物件一手即取"),
        description: lt(
          "A hidden rear sleeve keeps passports secure while the front system organises cables, keys, and cards.",
          "後側隱藏夾層可安全收納護照，前方分層則適合整理線材、鑰匙與卡片。",
        ),
      },
      {
        title: lt("Comfort that scales with the day", "肩背舒適度更貼近日常"),
        description: lt(
          "A breathable back panel and adjustable strap keep the sling stable whether worn crossbody or at the waist.",
          "透氣背板與可調肩帶設計，使斜背或腰掛都能維持穩定與舒適。",
        ),
      },
      {
        title: lt("Premium but understated", "有質感，卻不刻意張揚"),
        description: lt(
          "Subtle hardware and a disciplined silhouette keep Forma elegant across casual and business travel settings.",
          "細緻五金與節制輪廓，讓 Forma 能自然適應休閒與商務出行情境。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Storage", "收納"),
        items: [
          { label: lt("Volume", "容量"), value: lt("4.5 L", "4.5 L") },
          { label: lt("Tablet fit", "平板"), value: lt("Up to 8-inch tablet", "最高 8 吋平板") },
          { label: lt("Pockets", "夾層"), value: lt("6 internal and external pockets", "共 6 個內外夾層") },
        ],
      },
      {
        title: lt("Materials", "材質"),
        items: [
          { label: lt("Exterior", "外層"), value: lt("Water-resistant textile", "防潑織物") },
          { label: lt("Lining", "內裡"), value: lt("Soft-touch recycled lining", "柔感再生內裡") },
          { label: lt("Hardware", "五金"), value: lt("Magnetic aluminium buckle", "鋁製磁吸快扣") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Will a compact camera fit inside?", "可放入小型相機嗎？"),
        answer: lt(
          "Yes. The main compartment is sized for compact mirrorless kits and travel essentials.",
          "可以。主夾層可收納小型無反相機與日常隨身用品。",
        ),
      },
      {
        question: lt("Is the back panel breathable?", "背面材質透氣嗎？"),
        answer: lt(
          "Yes. A ventilated mesh panel keeps comfort high during long walks or humid commutes.",
          "是的，背面採用透氣網布，適合長時間步行與潮濕環境。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "forma-1",
        author: "Sophie M.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("Daily carry solved", "日常隨身需求一次解決"),
        body: lt(
          "It’s compact but intelligently arranged. I never lose track of my passport or keys.",
          "體積不大，但收納邏輯非常清楚，護照和鑰匙都很容易找到。",
        ),
        date: "2026-03-08",
      },
      {
        id: "forma-2",
        author: "Leo P.",
        location: lt("Kuala Lumpur", "吉隆坡"),
        rating: 4,
        title: lt("Great on flights", "搭機時很好用"),
        body: lt(
          "Easy access at security and the woven strap upgrade is worth it for longer wear.",
          "安檢時很方便，若常背很久，編織肩帶升級很值得。",
        ),
        date: "2026-02-12",
      },
    ],
    relatedSlugs: ["meridian-weekender", "keyline-folio-wallet", "flux-pocket-earbuds"],
    boughtTogetherSlugs: ["keyline-folio-wallet", "flux-pocket-earbuds"],
  },
  {
    slug: "keyline-folio-wallet",
    category: "personal-carry",
    collection: "spring-edit",
    tags: ["wallet", "leather", "travel", "small goods"],
    name: lt("Keyline Folio Wallet", "Keyline 皮革短夾"),
    shortDescription: lt(
      "A slim folio wallet with RFID shielding, cash organisation, and optional tracker sleeve.",
      "兼具 RFID 防護、現金整理與可選追蹤配件的纖薄皮革短夾。",
    ),
    description: lt(
      "Keyline is designed for people who want a refined wallet without unnecessary bulk, pairing full-grain leather with practical daily organisation.",
      "Keyline 為追求輕薄卻不願妥協質感的人而生，以全粒面皮革與實用布局回應真正的日常需求。",
    ),
    price: 620,
    compareAtPrice: 760,
    rating: 4.7,
    reviewCount: 71,
    stockState: "in-stock",
    stockCount: 64,
    highlights: [
      lt("RFID shielding", "RFID 防護"),
      lt("Folio cash sleeve", "折疊鈔票夾層"),
      lt("Optional tracker sleeve", "可選追蹤器套件"),
    ],
    variants: [
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "espresso", label: lt("Espresso", "深咖啡"), value: "espresso", hex: "#5a3f33" },
          { id: "slate", label: lt("Slate", "灰藍"), value: "slate", hex: "#60666e" },
          { id: "oat", label: lt("Oat", "燕麥"), value: "oat", hex: "#d8cfbf" },
        ],
      },
      {
        id: "insert",
        name: lt("Insert", "配件"),
        display: "button",
        options: [
          { id: "standard", label: lt("Standard", "標準版"), value: "standard" },
          { id: "tracker", label: lt("Tracker sleeve", "追蹤器夾層"), value: "tracker", surcharge: 90 },
        ],
      },
    ],
    defaultVariantSelection: { finish: "espresso", insert: "standard" },
    visuals: [
      {
        id: "hero",
        label: lt("Wallet fold", "短夾外觀"),
        kind: "wallet",
        palette: {
          base: "#6a4a3b",
          glow: "#e4c69c",
          accent: "#f9ead4",
          surface: "#fbf6ef",
        },
        caption: lt("Slim daily carry in full-grain leather.", "以全粒面皮革呈現的輕薄日用短夾。"),
      },
      {
        id: "interior",
        label: lt("Interior", "內部收納"),
        kind: "wallet",
        palette: {
          base: "#d8ccbb",
          glow: "#fee6bf",
          accent: "#5d4a3f",
          surface: "#fffaf4",
        },
        caption: lt("Small, precise, and beautifully finished.", "尺寸精巧，細節完整，做工講究。"),
      },
    ],
    features: [
      {
        title: lt("Slim without compromise", "纖薄卻不犧牲實用"),
        description: lt(
          "Holds bills flat, cards securely, and coins in a discreet zipped sleeve.",
          "可平整放置紙幣、穩定收納卡片，並附低調拉鍊零錢層。",
        ),
      },
      {
        title: lt("Ages with character", "越用越有味道"),
        description: lt(
          "Full-grain leather develops a soft patina over time while maintaining structure.",
          "全粒面皮革會隨時間養出自然光澤，同時保有良好結構。",
        ),
      },
      {
        title: lt("Travel-conscious details", "照顧旅行情境的細節"),
        description: lt(
          "RFID protection and the optional tracker sleeve add peace of mind during transit.",
          "RFID 防護與可選追蹤夾層，在旅行途中更讓人安心。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Storage", "收納"),
        items: [
          { label: lt("Cards", "卡位"), value: lt("8 card slots", "8 個卡位") },
          { label: lt("Cash", "鈔票"), value: lt("Full-length folio sleeve", "全長鈔票夾層") },
          { label: lt("Coins", "零錢"), value: lt("Internal zip pocket", "內置拉鍊零錢袋") },
        ],
      },
      {
        title: lt("Materials", "材質"),
        items: [
          { label: lt("Leather", "皮革"), value: lt("Italian full-grain leather", "義大利全粒面皮革") },
          { label: lt("Lining", "內裡"), value: lt("Microfibre lining", "超細纖維內裡") },
          { label: lt("Protection", "防護"), value: lt("RFID shielded card section", "卡層具 RFID 防護") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Can Keyline fit international passports?", "Keyline 可以放護照嗎？"),
        answer: lt(
          "No. It is sized as a compact everyday wallet rather than a travel folio.",
          "不能。Keyline 是日常尺寸的短夾，不是護照夾規格。",
        ),
      },
      {
        question: lt("How should I care for the leather?", "皮革應如何保養？"),
        answer: lt(
          "Use a dry cloth weekly and a neutral leather conditioner every few months.",
          "平日以乾布擦拭，並每數月使用中性皮革保養油即可。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "keyline-1",
        author: "Winnie L.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("Exactly the right size", "大小剛剛好"),
        body: lt(
          "It’s slim enough for a blazer pocket but still carries cash and cards without frustration.",
          "放在西裝外套口袋剛剛好，同時又能完整收納鈔票和卡片。",
        ),
        date: "2026-02-16",
      },
      {
        id: "keyline-2",
        author: "Nico V.",
        location: lt("Manila", "馬尼拉"),
        rating: 4,
        title: lt("Elegant everyday wallet", "很適合每天用的優雅短夾"),
        body: lt(
          "The leather feels premium and the zipper pocket is unexpectedly useful.",
          "皮革質感很好，而且拉鍊零錢袋比想像中實用。",
        ),
        date: "2026-03-03",
      },
    ],
    relatedSlugs: ["forma-sling", "meridian-weekender", "orbit-gan-charger"],
    boughtTogetherSlugs: ["forma-sling", "orbit-gan-charger"],
  },
  {
    slug: "orbit-gan-charger",
    category: "travel-power",
    collection: "quiet-motion",
    tags: ["charger", "gan", "travel", "usb-c"],
    name: lt("Orbit GaN Charger", "Orbit GaN 旅充"),
    shortDescription: lt(
      "A compact 140 W charger with three ports, a fold-flat profile, and premium thermal management.",
      "兼具 140 W 輸出、三孔配置與摺疊式外型的高效 GaN 充電器。",
    ),
    description: lt(
      "Orbit is made for lighter packing and faster charging, giving laptops, tablets, and phones a smaller, better-looking power companion.",
      "Orbit 讓旅途充電更輕量俐落，以更小體積支援筆電、平板與手機等高需求裝置。",
    ),
    price: 880,
    compareAtPrice: 990,
    rating: 4.8,
    reviewCount: 139,
    stockState: "in-stock",
    stockCount: 67,
    highlights: [
      lt("140 W maximum output", "最高 140 W 輸出"),
      lt("2 x USB-C, 1 x USB-A", "2 個 USB-C、1 個 USB-A"),
      lt("International plug kit", "可選國際插頭套件"),
    ],
    variants: [
      {
        id: "finish",
        name: lt("Finish", "配色"),
        display: "swatch",
        options: [
          { id: "graphite", label: lt("Graphite", "石墨灰"), value: "graphite", hex: "#4c5058" },
          { id: "champagne", label: lt("Champagne", "香檳金"), value: "champagne", hex: "#d7c3a4" },
        ],
      },
      {
        id: "adapter",
        name: lt("Adapter kit", "轉接套件"),
        display: "button",
        options: [
          { id: "hk", label: lt("Hong Kong", "香港插腳"), value: "hk" },
          { id: "intl", label: lt("International kit", "國際插頭套件"), value: "intl", surcharge: 150 },
        ],
      },
    ],
    defaultVariantSelection: { finish: "graphite", adapter: "hk" },
    visuals: [
      {
        id: "hero",
        label: lt("Charger hero", "主視角"),
        kind: "charger",
        palette: {
          base: "#50555d",
          glow: "#9aa3ac",
          accent: "#f3d5ac",
          surface: "#f8f3ec",
        },
        caption: lt("High-output power in a refined format.", "在精巧機身中實現高輸出充電。"),
      },
      {
        id: "flat",
        label: lt("Fold-flat", "摺疊狀態"),
        kind: "charger",
        palette: {
          base: "#d8c6ad",
          glow: "#fee7c6",
          accent: "#675548",
          surface: "#fffaf3",
        },
        caption: lt("Built for lighter packing.", "為更輕盈的收納方式而設計。"),
      },
    ],
    features: [
      {
        title: lt("Fewer chargers, more output", "少帶一顆，卻更能充"),
        description: lt(
          "High-output GaN lets Orbit replace multiple bricks across laptop and phone setups.",
          "高效 GaN 架構讓 Orbit 足以取代筆電與手機的多顆充電器。",
        ),
      },
      {
        title: lt("Thermals that stay composed", "高輸出下依然穩定"),
        description: lt(
          "The shell and internal layout are tuned for efficient thermal flow and quieter charging performance.",
          "機身外殼與內部布局都針對散熱效率重新設計，長時間輸出也更穩定。",
        ),
      },
      {
        title: lt("Made to travel well", "真正為旅途而生"),
        description: lt(
          "Fold-flat prongs, a compact profile, and the optional international kit make it easy to keep in the same pouch every trip.",
          "可摺疊插腳、精簡體積與國際套件，讓它成為每次出差都能固定攜帶的旅充。",
        ),
      },
    ],
    specifications: [
      {
        title: lt("Power", "供電"),
        items: [
          { label: lt("Maximum output", "最高輸出"), value: lt("140 W USB-C PD", "140 W USB-C PD") },
          { label: lt("Ports", "接口"), value: lt("2 x USB-C, 1 x USB-A", "2 個 USB-C、1 個 USB-A") },
          { label: lt("Weight", "重量"), value: lt("295 g", "295 克") },
        ],
      },
      {
        title: lt("Travel", "旅行"),
        items: [
          { label: lt("Prongs", "插腳"), value: lt("Fold-flat", "可摺疊") },
          { label: lt("Cable", "附線"), value: lt("2 m braided USB-C cable", "2 米編織 USB-C 線") },
          { label: lt("Kit", "套件"), value: lt("Optional international adapters", "可選國際插頭套件") },
        ],
      },
    ],
    faq: [
      {
        question: lt("Can Orbit charge a laptop and phone together?", "Orbit 可以同時幫筆電和手機充電嗎？"),
        answer: lt(
          "Yes. Power is dynamically distributed across all three ports depending on what is connected.",
          "可以。系統會依照接入裝置自動分配三個接口的輸出功率。",
        ),
      },
      {
        question: lt("Does it include a cable?", "是否附有充電線？"),
        answer: lt(
          "Yes. A 2 m braided USB-C cable is included in every box.",
          "有。每盒均附 2 米編織 USB-C 線。",
        ),
      },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "orbit-1",
        author: "Teresa Y.",
        location: lt("Hong Kong", "香港"),
        rating: 5,
        title: lt("Travel essential", "旅行必備"),
        body: lt(
          "It replaced my laptop charger and phone brick without getting unbearably hot.",
          "它取代了我原本的筆電和手機充電器，而且溫度控制得很好。",
        ),
        date: "2026-03-11",
      },
      {
        id: "orbit-2",
        author: "Alden R.",
        location: lt("Singapore", "新加坡"),
        rating: 4,
        title: lt("Looks better than any charger should", "比一般旅充好看太多"),
        body: lt(
          "Rare to find something this practical that also feels premium.",
          "很少有這麼實用的東西，同時又保有這麼好的質感。",
        ),
        date: "2026-01-30",
      },
    ],
    relatedSlugs: ["studio-dock-140", "meridian-weekender", "flux-pocket-earbuds"],
    boughtTogetherSlugs: ["meridian-weekender", "arc-one-headphones"],
  },
];

export const featuredSlugs = [
  "arc-one-headphones",
  "frame-s-display",
  "meridian-weekender",
  "studio-dock-140",
];

export const heroSlugs = [
  "arc-one-headphones",
  "meridian-weekender",
  "frame-s-display",
];

export const recommendationSlugs = [
  "loom-wireless-keyboard",
  "lumen-desk-light",
  "forma-sling",
  "orbit-gan-charger",
];

export const initialCart: CartItem[] = [
  {
    productSlug: "arc-one-headphones",
    quantity: 1,
    selections: {
      finish: "obsidian",
      bundle: "standard",
    },
  },
  {
    productSlug: "studio-dock-140",
    quantity: 1,
    selections: {
      finish: "graphite",
      adapter: "hk",
    },
  },
];

export const initialWishlist = [
  "meridian-weekender",
  "frame-s-display",
  "forma-sling",
];

export const sampleOrders: CustomerOrder[] = [
  {
    id: "order-20481",
    number: "VLR-20481",
    placedAt: "2026-03-28T10:14:00+08:00",
    status: "in-transit",
    paymentMethod: "Visa ending 0488",
    trackingNumber: "SF8401592HK",
    shippingMethod: "express",
    shippingAddress: {
      name: "Evelyn Lau",
      line1: "Tower 3, 39 Conduit Road",
      line2: "Mid-Levels West",
      city: "Hong Kong",
      region: "Hong Kong Island",
      postcode: "000000",
      country: "Hong Kong SAR",
    },
    items: [
      {
        productSlug: "arc-one-headphones",
        quantity: 1,
        selections: { finish: "mist", bundle: "travel-set" },
      },
      {
        productSlug: "orbit-gan-charger",
        quantity: 1,
        selections: { finish: "graphite", adapter: "intl" },
      },
    ],
    subtotal: 3920,
    discount: 160,
    shipping: 0,
    tax: 86,
    total: 3846,
    timeline: [
      {
        label: lt("Order confirmed", "訂單已確認"),
        description: lt("Payment authorised and fulfillment queued.", "付款已確認，訂單已進入備貨流程。"),
        timestamp: "2026-03-28T10:14:00+08:00",
        complete: true,
      },
      {
        label: lt("Packed at studio", "工作室完成包裝"),
        description: lt("Your order was quality checked and packed.", "訂單已完成檢查與包裝。"),
        timestamp: "2026-03-28T16:30:00+08:00",
        complete: true,
      },
      {
        label: lt("In transit", "配送途中"),
        description: lt("Collected by courier and en route to destination.", "物流已取件，正運送至目的地。"),
        timestamp: "2026-03-29T08:40:00+08:00",
        complete: true,
      },
      {
        label: lt("Out for delivery", "派送中"),
        description: lt("Expected delivery by 8pm tomorrow.", "預計將於明日晚間 8 點前送達。"),
        timestamp: "2026-03-30T09:00:00+08:00",
        complete: false,
      },
    ],
  },
  {
    id: "order-20319",
    number: "VLR-20319",
    placedAt: "2026-02-17T19:32:00+08:00",
    status: "delivered",
    paymentMethod: "Mastercard ending 7712",
    trackingNumber: "EC9203158HK",
    shippingMethod: "complimentary",
    shippingAddress: {
      name: "Evelyn Lau",
      line1: "Tower 3, 39 Conduit Road",
      line2: "Mid-Levels West",
      city: "Hong Kong",
      region: "Hong Kong Island",
      postcode: "000000",
      country: "Hong Kong SAR",
    },
    items: [
      {
        productSlug: "lumen-desk-light",
        quantity: 1,
        selections: { base: "desk", finish: "bone" },
      },
      {
        productSlug: "loom-wireless-keyboard",
        quantity: 1,
        selections: { layout: "compact", finish: "stone" },
      },
    ],
    subtotal: 2460,
    discount: 300,
    shipping: 0,
    tax: 48,
    total: 2208,
    timeline: [
      {
        label: lt("Order confirmed", "訂單已確認"),
        description: lt("Payment authorised and fulfillment queued.", "付款已確認，訂單已進入備貨流程。"),
        timestamp: "2026-02-17T19:32:00+08:00",
        complete: true,
      },
      {
        label: lt("Packed at studio", "工作室完成包裝"),
        description: lt("Your order was quality checked and packed.", "訂單已完成檢查與包裝。"),
        timestamp: "2026-02-18T10:05:00+08:00",
        complete: true,
      },
      {
        label: lt("Delivered", "已送達"),
        description: lt("Delivered to concierge at 3:42pm.", "已於下午 3:42 送達禮賓處。"),
        timestamp: "2026-02-19T15:42:00+08:00",
        complete: true,
      },
    ],
  },
];

export const accountProfile = {
  name: "Evelyn Lau",
  email: "evelyn@private-mail.com",
  tier: lt("Circle Black", "Circle Black"),
  memberSince: "2024-08-16T10:00:00+08:00",
  nextReward: lt("HK$340 away from complimentary same-day studio pickup.", "距離享有免費當日工作室取貨尚差 HK$340。"),
  defaultAddress: lt("Mid-Levels West, Hong Kong", "香港半山西"),
  defaultPayment: lt("Visa ending 0488", "Visa 尾號 0488"),
  servicePreference: lt(
    "Weekday evening delivery with private pickup as backup.",
    "偏好平日晚間送達，必要時改為到店取貨。",
  ),
  conciergeNote: lt(
    "Preparing a workspace refresh for a quieter home office setup.",
    "正規劃一套更安靜、更完整的居家工作配置。",
  ),
};

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.category === categorySlug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getPromotionByCode(code: string) {
  return promotions.find((promotion) => promotion.code === code.toUpperCase());
}

export function getOrderById(id: string) {
  return sampleOrders.find((order) => order.id === id);
}

export function getVariantOption(
  product: Product,
  groupId: string,
  optionId: string,
) {
  return product.variants
    .find((group) => group.id === groupId)
    ?.options.find((option) => option.id === optionId);
}

export function getProductPriceForSelection(
  product: Product,
  selections: Record<string, string>,
) {
  return product.variants.reduce((total, group) => {
    const option = group.options.find(
      (candidate) => candidate.id === selections[group.id],
    );

    return total + (option?.surcharge ?? 0);
  }, product.price);
}

export function getSelectionSummary(
  product: Product,
  selections: Record<string, string>,
  locale: Locale,
) {
  return product.variants
    .map((group) => {
      const option = group.options.find(
        (candidate) => candidate.id === selections[group.id],
      );

      if (!option) {
        return null;
      }

      return option.label[locale];
    })
    .filter(Boolean)
    .join(" · ");
}
