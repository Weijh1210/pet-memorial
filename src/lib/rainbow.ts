import AsyncStorage from "@react-native-async-storage/async-storage";

export type PetMemory = {
  id: string;
  title: string;
  date: string;
  kind: string;
  note: string;
  image?: string;
};

export type JourneyEvent = {
  id: string;
  title: string;
  detail: string;
  time: string;
  done: boolean;
};

export type RainbowData = {
  memories: PetMemory[];
  journeyStarted: boolean;
  journey: JourneyEvent[];
  gardenNotes: string[];
};

const KEY = "rainbow:demo-v1";

export const initialMemories: PetMemory[] = [
  { id: "home", title: "第一次回家", date: "2014.07.16", kind: "重要时刻", note: "小小一团，躲进了沙发底下。那天起，家里多了轻轻的呼噜声。", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85" },
  { id: "birthday-1", title: "Mochi 的第一个生日", date: "2015.05.03", kind: "生日", note: "给你做了第一个小蛋糕，你只认真闻了三分钟。" },
  { id: "trip", title: "第一次一起旅行", date: "2017.08.12", kind: "旅行", note: "车窗外的风景很美，但你更喜欢那个纸箱。" },
  { id: "birthday-7", title: "七岁生日快乐", date: "2021.05.03", kind: "生日", note: "七年了，你还是全家最会撒娇的小朋友。" },
  { id: "summer", title: "我们最喜欢的夏天", date: "2025.07.18", kind: "日常", note: "窗边午睡、院子里的风，还有每一个慢慢的下午。" },
  { id: "walk", title: "一起散步的傍晚", date: "2026.09.28", kind: "日常", note: "夕阳落在你的毛上。想把那一刻，多留一会儿。" },
];

export const initialJourney: JourneyEvent[] = [
  { id: "confirm", title: "身份与信息确认", detail: "与你一起核对宠物信息与专属编号", time: "预约后", done: false },
  { id: "pickup", title: "温柔上门接送", detail: "工作人员到达前会提前联系你", time: "待安排", done: false },
  { id: "arrival", title: "抵达纪念中心", detail: "每一次交接都会留下清晰记录", time: "待更新", done: false },
  { id: "farewell", title: "专属告别时光", detail: "按照你选择的方式，留一点安静时间", time: "待安排", done: false },
  { id: "care", title: "单独火化与妥善安置", detail: "流程确认后，骨灰与纪念物交还给你", time: "待安排", done: false },
];

const seed: RainbowData = { memories: initialMemories, journeyStarted: false, journey: initialJourney, gardenNotes: ["谢谢你把温柔留在这里。"] };

export async function loadRainbowData(): Promise<RainbowData> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return seed;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return seed;
    const saved = parsed as Partial<RainbowData>;
    return {
      memories: Array.isArray(saved.memories) ? saved.memories : seed.memories,
      journeyStarted: saved.journeyStarted === true,
      journey: Array.isArray(saved.journey) ? saved.journey : seed.journey,
      gardenNotes: Array.isArray(saved.gardenNotes) ? saved.gardenNotes : seed.gardenNotes,
    };
  } catch {
    return seed;
  }
}

export async function saveRainbowData(data: RainbowData): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}
