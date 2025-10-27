import { GoogleGenAI, Type } from "@google/genai";
import { Profile, Scholarship, MatchResult } from "../types";

export const findMatchingScholarships = async (
  profile: Profile,
  scholarships: Scholarship[]
): Promise<MatchResult[]> => {
  const apiKey = localStorage.getItem('gemini-api-key');
  if (!apiKey) {
    throw new Error("API key not found. Please set your API key.");
  }
  const ai = new GoogleGenAI({ apiKey });

  const model = "gemini-2.5-flash";

  const prompt = `
    # 指示
    あなたは「HOPE」という、日本の学生向けの奨学金マッチング専門AIアシスタントです。
    提供された学生のプロフィールと奨学金リストを分析し、その学生に最も適した奨学金を5件選んでください。
    結果は必ず指定されたJSON形式で、日本語で出力してください。JSONオブジェクト以外のテキストは一切含めないでください。

    # 学生プロフィール
    ${JSON.stringify(profile, null, 2)}

    # 奨学金リスト
    ${JSON.stringify(scholarships, null, 2)}

    # 出力要件
    - 奨学金リストの中から、学生プロフィールに最もマッチするものを5件選び、ランキング形式で返してください。
    - 特に、学生が社会的養護（児童養護施設など）の出身者である場合（'fromCare: true'）、それを最優先で考慮し、該当する奨学金を積極的に推薦してください。
    - 学生の成績（'academicPerformance'）を考慮し、「学業優秀」などの条件がある奨学金とマッチさせてください。
    - 'why_match'には、なぜその奨学金がマッチするのか、具体的な理由を簡潔に記述してください。
    - 'difficulty'は、選考の難易度を「Easy」「Medium」「Hard」の3段階で評価してください。
    - 'todo'には、申請に必要なタスクを具体的かつ実行可能なリストとして3〜5個提案してください。
    - 'amount_per_year'は必ず数値型にしてください。
    - 'deadline'は'YYYY-MM-DD'形式にしてください。
    - 'url'は元の奨学金情報のURLをそのまま含めてください。
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            top5: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  rank: { type: Type.INTEGER },
                  name: { type: Type.STRING },
                  provider: { type: Type.STRING },
                  why_match: { type: Type.STRING },
                  deadline: { type: Type.STRING },
                  amount_per_year: { type: Type.NUMBER },
                  required_docs: { type: Type.ARRAY, items: { type: Type.STRING } },
                  difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
                  url: { type: Type.STRING },
                  todo: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["rank", "name", "provider", "why_match", "deadline", "amount_per_year", "difficulty", "url", "todo"],
              },
            },
          },
          required: ["top5"],
        },
      },
    });

    const jsonText = response.text;
    const result = JSON.parse(jsonText);
    
    if (result && result.top5) {
      return result.top5 as MatchResult[];
    } else {
      console.error("Invalid JSON structure received:", result);
      throw new Error("AIからの応答形式が正しくありません。");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Add a check for API key errors
    if (error instanceof Error && /API key/i.test(error.message)) {
      throw new Error("APIキーが正しくないか、無効です。設定を確認してください。");
    }
    throw new Error("奨学金のマッチング中にエラーが発生しました。");
  }
};
