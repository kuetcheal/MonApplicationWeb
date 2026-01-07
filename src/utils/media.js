const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export const buildVideoUrl = (filePath) => {
  if (!filePath) return "";
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }
  return `${API_BASE}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
};
