import { useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export default function ImageUploadZone({ image, onUpload, onRemove }) {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => onUpload(e.target.result);
    reader.readAsDataURL(file);
  };

  if (image) {
    return (
      <div
        className="relative flex items-center gap-4 rounded-xl p-3"
        style={{ border: "1px solid var(--border-default)", background: "var(--bg-input)" }}
      >
        <img src={image} alt="Preview" className="h-16 w-16 rounded-xl object-cover" />
        <div className="flex-1 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Image uploaded</div>
        <button
          type="button"
          onClick={onRemove}
          className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-danger-50 hover:text-danger-600"
          style={{ color: "var(--text-muted)" }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-6 transition-all duration-200 hover:scale-[1.01]"
      style={{
        borderColor: "var(--border-default)",
        background: "var(--bg-input)",
        color: "var(--text-muted)",
      }}
    >
      <ImageIcon className="h-8 w-8 opacity-40" />
      <div className="text-xs font-semibold">Click or drag to upload an image</div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
    </button>
  );
}
