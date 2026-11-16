/**
 * 北大美食探索指南 (NTPU Food Guide) - 餐廳資料庫
 * 本資料集包含國立臺北大學三峽校區及周邊（三峽區、樹林北大特區）之 20 筆真實店家基本資料。
 * 資料規範：
 * 1. isDemo: false 代表店名與地址具公開資料來源，不代表已核實當日即時營業狀態。
 * 2. priceRange 未查證者標註為「價格請見店家公告」，不虛構價格。
 * 3. description 採客觀餐點類型介紹，不虛構評價、招牌餐點或用餐體驗。
 * 4. googleMapsUrl 以「店名 + 完整地址」組合，經 encodeURIComponent 標準安全編碼。
 */

const restaurantsData = [
  {
    id: "store-001",
    name: "超有肉涮涮屋北大店",
    category: "火鍋",
    priceRange: "價格請見店家公告",
    description: "提供個人涮涮鍋物料理，主打各式肉品與海鮮鍋底搭配新鮮蔬菜盤。",
    address: "新北市三峽區學勤路178號1樓",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("超有肉涮涮屋北大店 新北市三峽區學勤路178號1樓"),
    tags: ["火鍋", "涮涮鍋", "學勤路", "三峽"],
    isDemo: false
  },
  {
    id: "store-002",
    name: "滾吧 Qunba 鍋物北大店",
    category: "火鍋",
    priceRange: "價格請見店家公告",
    description: "提供各式特色湯底鍋物料理，包含麻辣鍋、泡菜鍋等多元口味與肉品蔬菜拼盤。",
    address: "新北市樹林區學勤路318號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("滾吧 Qunba 鍋物北大店 新北市樹林區學勤路318號"),
    tags: ["火鍋", "特色鍋物", "學勤路", "樹林"],
    isDemo: false
  },
  {
    id: "store-003",
    name: "私嚐の吃飯北大店",
    category: "日式料理",
    priceRange: "價格請見店家公告",
    description: "日式定食料理餐廳，提供日式咖哩飯、丼飯、炸物與定食配菜。",
    address: "新北市樹林區學勤路322號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("私嚐の吃飯北大店 新北市樹林區學勤路322號"),
    tags: ["日式料理", "咖哩", "定食", "學勤路", "樹林"],
    isDemo: false
  },
  {
    id: "store-004",
    name: "初芯初蒔中式料理",
    category: "中式料理",
    priceRange: "價格請見店家公告",
    description: "中式合菜料理餐廳，供應江浙風味熱炒、經典中式燉品與精緻桌菜點心。",
    address: "新北市三峽區大學路196號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("初芯初蒔中式料理 新北市三峽區大學路196號"),
    tags: ["中式料理", "合菜", "聚餐", "大學路", "三峽"],
    isDemo: false
  },
  {
    id: "store-005",
    name: "The BBQ House 三峽北大店",
    category: "排餐",
    priceRange: "價格請見店家公告",
    description: "美式牛排與炙烤排餐餐廳，提供現切牛排、豬肋排與炭烤肉類搭配各式配菜。",
    address: "新北市三峽區大學路86-2號2樓",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("The BBQ House 三峽北大店 新北市三峽區大學路86-2號2樓"),
    tags: ["排餐", "牛排", "炭烤", "大學路", "三峽"],
    isDemo: false
  },
  {
    id: "store-006",
    name: "享聚餐酒館 Savor Bistro",
    category: "義式料理",
    priceRange: "價格請見店家公告",
    description: "義式料理與餐酒館，提供義大利麵、燉飯、披薩、開胃輕食與佐餐飲品。",
    address: "新北市三峽區國際一街5號2樓",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("享聚餐酒館 Savor Bistro 新北市三峽區國際一街5號2樓"),
    tags: ["義式料理", "義大利麵", "燉飯", "餐酒館", "國際一街", "三峽"],
    isDemo: false
  },
  {
    id: "store-007",
    name: "鍋媽精緻小火鍋北大店",
    category: "火鍋",
    priceRange: "價格請見店家公告",
    description: "平價個人百元鍋物餐廳，提供多款經典火鍋湯頭搭配肉片與火鍋配料。",
    address: "新北市三峽區國際一街7號1樓",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("鍋媽精緻小火鍋北大店 新北市三峽區國際一街7號1樓"),
    tags: ["火鍋", "平價小火鍋", "個人鍋", "國際一街", "三峽"],
    isDemo: false
  },
  {
    id: "store-008",
    name: "官小二酸菜魚北大店",
    category: "中式料理",
    priceRange: "價格請見店家公告",
    description: "川味中式特色料理餐廳，主打酸菜魚、水煮魚等湯品與道地川味料理。",
    address: "新北市三峽區大德路206號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("官小二酸菜魚北大店 新北市三峽區大德路206號"),
    tags: ["中式料理", "酸菜魚", "川菜", "大德路", "三峽"],
    isDemo: false
  },
  {
    id: "store-009",
    name: "北海道炙燒拉麵北大店",
    category: "麵食",
    priceRange: "價格請見店家公告",
    description: "日式麵食拉麵專門店，供應豚骨、味噌、醬油等風味湯頭拉麵與炙燒叉燒肉。",
    address: "新北市三峽區大德路181號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("北海道炙燒拉麵北大店 新北市三峽區大德路181號"),
    tags: ["麵食", "拉麵", "日式拉麵", "大德路", "三峽"],
    isDemo: false
  },
  {
    id: "store-010",
    name: "蒙虎白湯小火鍋北大店",
    category: "火鍋",
    priceRange: "價格請見店家公告",
    description: "個人平價小火鍋餐廳，主打香濃白湯底與各式風味鍋物，附有自助白飯與飲品。",
    address: "新北市三峽區國際二街21-3號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("蒙虎白湯小火鍋北大店 新北市三峽區國際二街21-3號"),
    tags: ["火鍋", "個人鍋", "白湯", "國際二街", "三峽"],
    isDemo: false
  },
  {
    id: "store-011",
    name: "益柔廚房",
    category: "蔬食",
    priceRange: "價格請見店家公告",
    description: "純素與蛋奶素蔬食料理餐廳，提供天然食材製作的蔬食定食、麵食與養生餐點。",
    address: "新北市三峽區學府路36號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("益柔廚房 新北市三峽區學府路36號"),
    tags: ["蔬食", "素食友善", "健康養生", "學府路", "三峽"],
    isDemo: false
  },
  {
    id: "store-012",
    name: "湯馥招牌石頭鍋北大店",
    category: "火鍋",
    priceRange: "價格請見店家公告",
    description: "傳統石頭火鍋餐廳，以洋蔥與肉片爆香拌炒後注入高湯，搭配豐富海陸拼盤。",
    address: "新北市樹林區大有路6號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("湯馥招牌石頭鍋北大店 新北市樹林區大有路6號"),
    tags: ["火鍋", "石頭火鍋", "大有路", "樹林"],
    isDemo: false
  },
  {
    id: "store-013",
    name: "很秋鍋物北大店",
    category: "火鍋",
    priceRange: "價格請見店家公告",
    description: "精緻個人鍋物專賣店，提供多種特色湯底、原塊肉品與新鮮海鮮火鍋拼盤。",
    address: "新北市樹林區大成路162號1樓",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("很秋鍋物北大店 新北市樹林區大成路162號1樓"),
    tags: ["火鍋", "精緻鍋物", "大成路", "樹林"],
    isDemo: false
  },
  {
    id: "store-014",
    name: "大魔大滿足鍋物三峽店",
    category: "火鍋",
    priceRange: "價格請見店家公告",
    description: "大份量頂級肉品火鍋專賣店，供應日本和牛、安格斯牛、多款海鮮組合與多樣鍋底。",
    address: "新北市樹林區學成路770號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("大魔大滿足鍋物三峽店 新北市樹林區學成路770號"),
    tags: ["火鍋", "頂級肉品", "和牛", "海鮮", "學成路", "樹林"],
    isDemo: false
  },
  {
    id: "store-015",
    name: "西堤牛排三峽學成店",
    category: "排餐",
    priceRange: "價格請見店家公告",
    description: "連鎖排餐料理餐廳，提供多道式精緻排餐套餐，包含牛排、主廚沙拉、前菜、甜點及飲品。",
    address: "新北市三峽區學成路398號3樓",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("西堤牛排三峽學成店 新北市三峽區學成路398號3樓"),
    tags: ["排餐", "西式套餐", "牛排", "聚餐", "學成路", "三峽"],
    isDemo: false
  },
  {
    id: "store-016",
    name: "聚日式鍋物三峽學成店",
    category: "火鍋",
    priceRange: "價格請見店家公告",
    description: "日式連鎖鍋物餐廳，主打札幌起司牛奶鍋等特色湯頭，附有鮮蔬與主食自助吧。",
    address: "新北市三峽區學成路398號3樓",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("聚日式鍋物三峽學成店 新北市三峽區學成路398號3樓"),
    tags: ["火鍋", "日式鍋物", "自助吧", "學成路", "三峽"],
    isDemo: false
  },
  {
    id: "store-017",
    name: "茶自點北大旗艦店",
    category: "中式料理",
    priceRange: "價格請見店家公告",
    description: "複合式中式茶餐廳，供應各式中式家常熱炒定食、養生燉湯、茶飲與炸物茶點。",
    address: "新北市樹林區學成路758號1樓",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("茶自點北大旗艦店 新北市樹林區學成路758號1樓"),
    tags: ["中式料理", "茶餐廳", "家常定食", "茶飲", "學成路", "樹林"],
    isDemo: false
  },
  {
    id: "store-018",
    name: "NU PASTA 樹林北大店",
    category: "義式料理",
    priceRange: "價格請見店家公告",
    description: "平價義式連鎖料理餐廳，提供義大利麵、焗烤燉飯、千層披薩、炸物輕食與各式特調飲品。",
    address: "新北市樹林區佳園路三段168號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("NU PASTA 樹林北大店 新北市樹林區佳園路三段168號"),
    tags: ["義式料理", "義大利麵", "焗烤", "披薩", "佳園路", "樹林"],
    isDemo: false
  },
  {
    id: "store-019",
    name: "泰鍋古藝北大店",
    category: "火鍋",
    priceRange: "價格請見店家公告",
    description: "泰式風味特色火鍋餐廳，提供泰式冬蔭功酸辣湯、椰奶雞肉鍋等多種南洋風味湯底。",
    address: "新北市三峽區國學街88號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("泰鍋古藝北大店 新北市三峽區國學街88號"),
    tags: ["火鍋", "泰式鍋物", "南洋風味", "國學街", "三峽"],
    isDemo: false
  },
  {
    id: "store-020",
    name: "堤諾義大利比薩三峽北大門市",
    category: "義式料理",
    priceRange: "價格請見店家公告",
    description: "義式拿坡里與羅馬比薩專門店，供應多款手作現烤比薩、烤麵、烤飯與義式特色小點。",
    address: "新北市樹林區大義路258號",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("堤諾義大利比薩三峽北大門市 新北市樹林區大義路258號"),
    tags: ["義式料理", "手工比薩", "烤麵", "大義路", "樹林"],
    isDemo: false
  }
];

// 將資料掛載至全域 window 物件以供 script.js 取用
if (typeof window !== "undefined") {
  window.restaurants = restaurantsData;
}
