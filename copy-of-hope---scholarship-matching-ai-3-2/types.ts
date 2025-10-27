export enum Page {
  Home,
  Onboarding,
  Loading,
  Results,
}

export enum Grade {
  HighSchool1 = "高校1年生",
  HighSchool2 = "高校2年生",
  HighSchool3 = "高校3年生",
  University1 = "大学1年生",
  University2 = "大学2年生",
  University3 = "大学3年生",
  University4 = "大学4年生",
  Other = "その他",
}

export enum Prefecture {
  Hokkaido = "北海道",
  Aomori = "青森県",
  Iwate = "岩手県",
  Miyagi = "宮城県",
  Akita = "秋田県",
  Yamagata = "山形県",
  Fukushima = "福島県",
  Ibaraki = "茨城県",
  Tochigi = "栃木県",
  Gunma = "群馬県",
  Saitama = "埼玉県",
  Chiba = "千葉県",
  Tokyo = "東京都",
  Kanagawa = "神奈川県",
  Niigata = "新潟県",
  Toyama = "富山県",
  Ishikawa = "石川県",
  Fukui = "福井県",
  Yamanashi = "山梨県",
  Nagano = "長野県",
  Gifu = "岐阜県",
  Shizuoka = "静岡県",
  Aichi = "愛知県",
  Mie = "三重県",
  Shiga = "滋賀県",
  Kyoto = "京都府",
  Osaka = "大阪府",
  Hyogo = "兵庫県",
  Nara = "奈良県",
  Wakayama = "和歌山県",
  Tottori = "鳥取県",
  Shimane = "島根県",
  Okayama = "岡山県",
  Hiroshima = "広島県",
  Yamaguchi = "山口県",
  Tokushima = "徳島県",
  Kagawa = "香川県",
  Ehime = "愛媛県",
  Kochi = "高知県",
  Fukuoka = "福岡県",
  Saga = "佐賀県",
  Nagasaki = "長崎県",
  Kumamoto = "熊本県",
  Oita = "大分県",
  Miyazaki = "宮崎県",
  Kagoshima = "鹿児島県",
  Okinawa = "沖縄県",
  Other = "その他",
}

export enum IncomeBand {
  Under2M = "200万円未満",
  From2MTo4M = "200万円-400万円",
  From4MTo6M = "400万円-600万円",
  From6MTo8M = "600万円-800万円",
  Over8M = "800万円以上",
}

export enum Major {
  Humanities = "人文科学",
  SocialSciences = "社会科学",
  NaturalSciences = "自然科学",
  Engineering = "工学",
  Medicine = "医学・歯学・薬学",
  Arts = "芸術",
  Other = "その他",
}

export enum Gender {
  Male = "男性",
  Female = "女性",
  Other = "その他",
}

export enum AcademicPerformance {
  Excellent = "優秀 (評定平均4.3以上)",
  Good = "良好 (評定平均3.5-4.2)",
  Average = "普通 (評定平均3.4以下)",
  NotProvided = "回答しない",
}

export interface Profile {
  grade: Grade;
  prefecture: Prefecture;
  incomeBand: IncomeBand;
  major: Major;
  gender: Gender;
  academicPerformance: AcademicPerformance;
  fromCare: boolean;
  lineOptIn: boolean;
}

export interface Scholarship {
  id: number;
  name: string;
  provider: string;
  type: "給付型" | "貸与型";
  amount_per_year: number;
  eligible_grades: Grade[];
  eligible_prefs: Prefecture[];
  eligible_majors: Major[];
  income_requirement: string;
  other_requirements: string;
  deadline: string; // YYYY-MM-DD
  url: string;
}

export interface MatchResult {
  rank: number;
  name: string;
  provider: string;
  why_match: string;
  deadline: string; // YYYY-MM-DD
  amount_per_year: number;
  required_docs: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  todo: string[];
}