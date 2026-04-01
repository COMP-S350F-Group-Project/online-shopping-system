import { localizedText } from "@/lib/i18n";
import type {
  AdminMetric,
  AdminQueueItem,
  Collection,
  Locale,
  LocalizedText,
  StoryBlock,
  SupportArticle,
  SupportChannel,
} from "@/types";

export const brand = {
  name: "Velora",
  tagline: localizedText(
    "Designed for calm, connected living.",
    "為從容而連結的生活而設計。",
  ),
  description: localizedText(
    "Velora creates precision-crafted technology, personal carry, and home objects for people who value clarity in the way they live.",
    "Velora 以精緻工藝重新詮釋科技、隨行收納與居家物件，為講究秩序與質感的生活而生。",
  ),
  strategy: {
    concept: localizedText(
      "A premium direct-to-consumer lifestyle technology house blending audio, carry, and smart-living essentials into one coherent retail experience.",
      "一個高端直營的生活科技品牌，將音訊、隨行配件與智慧生活產品整合為一致且成熟的零售體驗。",
    ),
    audience: localizedText(
      "Design-conscious professionals, frequent travellers, and modern households seeking fewer, better products with strong service expectations.",
      "重視設計的專業人士、經常出行者，以及希望以更少但更好的產品打造日常的現代家庭。",
    ),
    pointOfView: localizedText(
      "Clarity over clutter, materials over gimmicks, and service that feels as considered as the product itself.",
      "以秩序取代堆砌，以材質與工藝取代噱頭，並讓服務品質與產品本身同樣周到。",
    ),
  },
};

export const collections: Collection[] = [
  {
    slug: "spring-edit",
    name: localizedText("Spring Edit", "春季選品"),
    description: localizedText(
      "Refined essentials tuned for commuting, travel, and the pace of city life.",
      "為通勤、差旅與城市節奏而挑選的當代必需品。",
    ),
  },
  {
    slug: "quiet-motion",
    name: localizedText("Quiet Motion", "靜謐行旅"),
    description: localizedText(
      "Audio and carry pieces built for long transit days and lighter movement.",
      "為長途移動與輕盈出行而設計的音訊與收納系列。",
    ),
  },
  {
    slug: "studio-living",
    name: localizedText("Studio Living", "居家工作場景"),
    description: localizedText(
      "Desk and smart-living objects that bring rhythm to focused spaces.",
      "以節奏感梳理工作桌面與居家空間的精選器物。",
    ),
  },
];

export const primaryNavigation = [
  { key: "home", href: "" },
  { key: "shop", href: "/shop" },
  { key: "offers", href: "/offers" },
  { key: "about", href: "/about" },
  { key: "help", href: "/help" },
] as const;

export const secondaryNavigation = [
  { key: "wishlist", href: "/wishlist" },
  { key: "account", href: "/account" },
  { key: "cart", href: "/cart" },
] as const;

export const footerColumns = [
  {
    title: localizedText("Shop", "選購"),
    links: [
      { label: localizedText("All products", "全部商品"), href: "/shop" },
      { label: localizedText("Offers", "優惠活動"), href: "/offers" },
      { label: localizedText("Wishlist", "收藏清單"), href: "/wishlist" },
    ],
  },
  {
    title: localizedText("Service", "服務"),
    links: [
      { label: localizedText("Order tracking", "訂單追蹤"), href: "/account/tracking" },
      { label: localizedText("Help centre", "支援中心"), href: "/help" },
      { label: localizedText("Contact", "聯絡我們"), href: "/contact" },
    ],
  },
  {
    title: localizedText("Company", "品牌"),
    links: [
      { label: localizedText("About Velora", "關於 Velora"), href: "/about" },
      { label: localizedText("Account", "會員中心"), href: "/account" },
      { label: localizedText("Operations", "營運後台"), href: "/admin" },
    ],
  },
] as const;

export const brandStory: StoryBlock[] = [
  {
    title: localizedText("Crafted restraint", "克制而精準的設計"),
    body: localizedText(
      "Every product is reduced to the features people keep using: comfort, clarity, intelligent utility, and material honesty.",
      "每件作品都回到真正會被使用的核心價值: 舒適、清晰、實用，以及對材質的坦率表達。",
    ),
  },
  {
    title: localizedText("Made for movement", "為移動中的生活而設計"),
    body: localizedText(
      "Velora was shaped around commuting, hybrid work, and the demands of compact urban homes.",
      "Velora 的產品系統從通勤、混合辦公與都會居住情境出發，回應真實生活節奏。",
    ),
  },
  {
    title: localizedText("Service with memory", "記得你的服務體驗"),
    body: localizedText(
      "Fast fulfillment, concierge-level support, and thoughtful aftercare are treated as part of the product promise.",
      "快速出貨、細緻支援與完善售後，被視為產品承諾的一部分，而非額外附加。",
    ),
  },
];

export const supportChannels: SupportChannel[] = [
  {
    id: "concierge",
    title: localizedText("Client concierge", "專屬顧問"),
    description: localizedText(
      "Product guidance, gifting advice, and setup help with seven-day coverage.",
      "提供選購建議、送禮諮詢與設定支援，七天皆可聯絡。",
    ),
    value: "care@velora.house",
  },
  {
    id: "call",
    title: localizedText("Priority line", "優先專線"),
    description: localizedText(
      "For urgent order updates, delivery changes, or replacement requests.",
      "適用於急件追蹤、配送變更與更換安排。",
    ),
    value: "+852 3568 2180",
  },
  {
    id: "studio",
    title: localizedText("Central studio", "中環工作室"),
    description: localizedText(
      "Private pickup and product consultations by appointment.",
      "可預約到店取貨與產品體驗諮詢。",
    ),
    value: "20/F, Alexandra House, Central",
  },
];

export const supportArticles: SupportArticle[] = [
  {
    id: "delivery",
    category: "shipping",
    title: localizedText("Shipping timelines and delivery options", "配送時效與送貨方式"),
    excerpt: localizedText(
      "Understand complimentary shipping, express upgrades, and same-day studio pickup.",
      "了解免運門檻、快遞升級與當日到店取貨安排。",
    ),
    body: localizedText(
      "Orders placed before 3pm HKT usually ship the same day. Hong Kong orders arrive in one to two business days, while major Asia-Pacific cities typically arrive in two to four business days.",
      "香港時間下午 3 點前完成的訂單一般可於當日出貨。香港地區約 1 至 2 個工作天送達，亞太主要城市約 2 至 4 個工作天到貨。",
    ),
  },
  {
    id: "returns",
    category: "returns",
    title: localizedText("Returns, exchanges, and condition policy", "退換貨與商品狀態說明"),
    excerpt: localizedText(
      "What can be returned, what stays final sale, and how exchanges are prioritised.",
      "說明可退商品範圍、不可退情況，以及換貨處理方式。",
    ),
    body: localizedText(
      "Unused products in original condition may be returned within 30 days. Personalised items and opened hygiene products are final sale. Exchange requests are processed after collection scans complete.",
      "商品於未使用且保持原始狀態下，可於 30 天內提出退貨申請。客製化商品與已拆封的衛生類商品恕不退換。換貨申請將於物流收件掃描完成後處理。",
    ),
  },
  {
    id: "care",
    category: "care",
    title: localizedText("Material care for leather, aluminium, and knit", "皮革、鋁材與針織材質保養"),
    excerpt: localizedText(
      "Simple maintenance routines that keep daily-use products looking composed.",
      "以簡單方式維持日用物件的整潔質感與耐用度。",
    ),
    body: localizedText(
      "Use a dry microfiber cloth on anodised finishes, condition full-grain leather every few months, and wash knit accessories with cool water before air drying flat.",
      "陽極鋁材建議以乾燥超細纖維布擦拭；全粒面皮革可每數月使用皮革保養油；針織配件則以冷水手洗後平放陰乾。",
    ),
  },
];

export const adminMetrics: AdminMetric[] = [
  {
    label: localizedText("Revenue this week", "本週營收"),
    value: "HK$482,600",
    delta: localizedText("+14.8% vs last week", "較上週成長 14.8%"),
  },
  {
    label: localizedText("Orders awaiting dispatch", "待出貨訂單"),
    value: "42",
    delta: localizedText("Median SLA 3.2 hours", "中位處理時長 3.2 小時"),
  },
  {
    label: localizedText("Sell-through on Spring Edit", "春季選品售罄率"),
    value: "68%",
    delta: localizedText("Arc One leads conversion", "Arc One 為本週轉換主力"),
  },
  {
    label: localizedText("Client satisfaction", "客戶滿意度"),
    value: "4.9 / 5",
    delta: localizedText("Based on 612 recent responses", "來自最近 612 份回饋"),
  },
];

export const adminQueue: AdminQueueItem[] = [
  {
    id: "queue-1",
    title: localizedText("Low stock watch: Arc One Sand", "低庫存提醒: Arc One 沙霧色"),
    detail: localizedText(
      "Seven units remain across Hong Kong inventory. Replenishment ETA is Friday morning.",
      "香港庫存僅餘 7 件，補貨預計於週五上午入庫。",
    ),
    status: localizedText("Reorder approved", "已核准補貨"),
  },
  {
    id: "queue-2",
    title: localizedText("VIP concierge follow-up", "高價值會員待回覆"),
    detail: localizedText(
      "Three gifting consultations require confirmation before 6pm for same-day prep.",
      "有 3 筆送禮諮詢需於下午 6 點前確認，以安排當日備貨。",
    ),
    status: localizedText("Pending response", "待回覆"),
  },
  {
    id: "queue-3",
    title: localizedText("Courier performance alert", "物流服務表現提醒"),
    detail: localizedText(
      "One lane into Kowloon East slipped below the next-day target this afternoon.",
      "今日下午九龍東區配送線路未達次日到貨目標。",
    ),
    status: localizedText("Monitoring", "持續監控中"),
  },
];

export function buildLocaleHref(locale: Locale, href: string) {
  return href ? `/${locale}${href}` : `/${locale}`;
}

export function localisedLabel(label: LocalizedText, locale: Locale) {
  return label[locale];
}
