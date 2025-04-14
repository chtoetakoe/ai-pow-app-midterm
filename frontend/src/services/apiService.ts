import { AnalysisRequest, AnalysisResponse } from "../types";


export const analyzeCode = async (
  data: AnalysisRequest
): Promise<AnalysisResponse> => {
  const response = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze code");
  }

  return await response.json();
};
