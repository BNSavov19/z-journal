"use client";

import { useEffect, useRef, useState } from "react";
import { cn, getImageUrl } from "../../lib/utils";
import { Button } from "./button";
import { Input } from "./input";

type ImageDropzoneProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
};

const isDataUrl = (value: string) => value.trim().startsWith("data:");

export const ImageDropzone = ({
  label,
  value,
  onChange,
  helperText
}: ImageDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const trimmed = value.trim();
    if (!trimmed) {
      setUrlDraft("");
      return;
    }
    if (isDataUrl(trimmed)) {
      setUrlDraft("");
      return;
    }
    setUrlDraft(trimmed);
  }, [value]);

  const handleFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <div
        className={cn(
          "rounded-xl border border-dashed px-4 py-4 transition",
          isDragging
            ? "border-accent bg-[rgba(43,27,125,0.08)]"
            : "border-border bg-white"
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          const [file] = Array.from(event.dataTransfer.files);
          handleFile(file);
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <img
            src={getImageUrl(value)}
            alt={value ? "Selected image" : "Default image"}
            className="h-20 w-28 rounded-lg object-cover"
          />
          <div className="flex-1 text-sm text-slate-600">
            <p className="font-semibold text-foreground">
              Drag and drop an image here
            </p>
            <p className="text-xs text-slate-500">
              PNG or JPG. The default image appears if you skip this.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload
            </Button>
            {value && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onChange("")}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Input
            placeholder="Or paste an image URL"
            value={urlDraft}
            onChange={(event) => {
              const next = event.target.value;
              setUrlDraft(next);
              onChange(next);
            }}
          />
        </div>
        {helperText && (
          <p className="mt-2 text-xs text-slate-500">{helperText}</p>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
    </div>
  );
};
