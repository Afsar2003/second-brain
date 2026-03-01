"use client";
import { useState } from "react";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  summary?: string;
  sourceUrl?: string;
}

export default function AddItemModal({
  onAdd,
}: {
  onAdd: (item: KnowledgeItem) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("note");
  const [tags, setTags] = useState("");

  async function handleSave() {
    if (!title.trim()) {
      alert("Please enter a title!");
      return;
    }
    if (!content.trim()) {
      alert("Please enter content!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          type,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      const item = await res.json();
      onAdd(item);
      setTitle("");
      setContent("");
      setType("note");
      setTags("");
      setOpen(false);
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving! Check console.");
    }
    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: "#7c3aed",
          color: "white",
          padding: "8px 16px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        + Capture Idea
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            zIndex: 999999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#1c1c1e",
              borderRadius: "16px",
              padding: "32px",
              width: "90%",
              maxWidth: "480px",
              border: "1px solid #3a3a3c",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <h2 style={{ color: "white", margin: 0, fontSize: "20px" }}>
                Add to Brain
              </h2>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{ color: "#aaa", fontSize: "13px", marginBottom: "6px" }}
              >
                Title *
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title..."
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#2c2c2e",
                  border: "1px solid #48484a",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{ color: "#aaa", fontSize: "13px", marginBottom: "6px" }}
              >
                Content *
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#2c2c2e",
                  border: "1px solid #48484a",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  resize: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{ color: "#aaa", fontSize: "13px", marginBottom: "6px" }}
              >
                Type
              </div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#2c2c2e",
                  border: "1px solid #48484a",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              >
                <option value="note">Note</option>
                <option value="link">Link</option>
                <option value="insight">Insight</option>
              </select>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div
                style={{ color: "#aaa", fontSize: "13px", marginBottom: "6px" }}
              >
                Tags (comma separated)
              </div>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ai, productivity, ideas"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#2c2c2e",
                  border: "1px solid #48484a",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Saving..." : "Save to Brain"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
