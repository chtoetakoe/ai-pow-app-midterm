import { useState } from "react";
import { analyzeCode } from "./services/apiService";
import { AnalysisResponse, Language } from "./types";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("python");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");

    try {
      const response = await analyzeCode({ code, language });
      setResult(response);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: 16 }}>
        🚀 Code Mentor AI
      </h1>

      <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 14,
          }}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="typescript">TypeScript</option>
        </select>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            padding: "8px 16px",
            fontSize: 14,
            borderRadius: 6,
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Analyzing..." : "Analyze Code"}
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        rows={10}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 6,
          fontFamily: "monospace",
          fontSize: 14,
          border: "1px solid #ccc",
          marginBottom: 24,
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ backgroundColor: "#f9f9f9", padding: 16, borderRadius: 8 }}>
          <h2>🧠 Explanation</h2>
          <p>{result.explanation}</p>

          <h2>💡 Improvements</h2>
          <ul>
            {result.improvements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2>📄 Documentation</h2>
          <pre
            style={{
              backgroundColor: "#1e1e1e",
              color: "#eee",
              padding: 12,
              borderRadius: 6,
              overflowX: "auto",
            }}
          >
            {result.documentation}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
