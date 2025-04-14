export type Language = "python" | "javascript" | "java" | "cpp" | "typescript";

export interface AnalysisRequest {
  code: string;
  language: Language;
}

export interface AnalysisResponse {
  explanation: string;
  improvements: string[];
  documentation: string;
}
