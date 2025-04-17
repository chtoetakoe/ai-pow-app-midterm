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
    <div className="app-container" style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}> Code Mentor </h1>
          <p style={styles.subtitle}>
            Understand code. Improve it. Document it. Instantly.
          </p>

          <div style={styles.controls}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              style={styles.select}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="typescript">TypeScript</option>
            </select>

            <button onClick={handleAnalyze} disabled={loading} style={styles.button}>
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          <textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.textarea}
          />

          {error && <p style={styles.error}>{error}</p>}

          {result && (
            <div style={styles.resultBox}>
              <h2 style={styles.resultTitle}>🧠 Explanation</h2>
              <p>{result.explanation}</p>

              <h2 style={styles.resultTitle}>💡 Improvements</h2>
              <ul>
                {result.improvements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 style={styles.resultTitle}>📄 Documentation</h2>
              <pre style={styles.code}>{result.documentation}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6fa",
    padding: "20px",
    boxSizing: "border-box",
  },
  wrapper: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
    padding: 30,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: 24,
    textAlign: "center",
  },
  controls: {
    display: "flex",
    gap: 12,
    marginBottom: 12,
    width: "100%",
  },
  select: {
    padding: "8px 12px",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1px solid #ccc",
    flex: 1,
  },
  button: {
    padding: "8px 20px",
    fontSize: "1rem",
    borderRadius: 8,
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    padding: 14,
    minHeight: 200,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "monospace",
    border: "1px solid #ccc",
    marginBottom: 24,
    resize: "vertical",
    boxSizing: "border-box",
  },
  resultBox: {
    backgroundColor: "#f9fafc",
    padding: 20,
    borderRadius: 12,
    border: "1px solid #eee",
    marginTop: 32,
    width: "100%",
    boxSizing: "border-box",
  },
  resultTitle: {
    marginTop: 20,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  code: {
    backgroundColor: "#1e1e1e",
    color: "#eee",
    padding: 16,
    fontSize: 13,
    fontFamily: "monospace",
    borderRadius: 8,
    whiteSpace: "pre-wrap",      
    wordBreak: "break-word",    
    overflowX: "auto",           
  },
  
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
} as const;

export default App;