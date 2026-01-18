"use client";

import { useEffect, useRef, useState } from "react";
import { getAdminSession } from "../../lib/admin-auth";
import { uploadImage } from "../../lib/storage";
import { cn, getImageUrl } from "../../lib/utils";
import { Button } from "./button";

type ImageDropzoneProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  storagePath?: string;
};

export const ImageDropzone = ({
  label,
  value,
  onChange,
  helperText,
  storagePath = "images"
}: ImageDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!previewUrl) {
      return;
    }
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = async (file?: File) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    if (!getAdminSession()) {
      setUploadError("Admin login required to upload images.");
      return;
    }
    setUploadError("");
    const nextPreview = URL.createObjectURL(file);
    setPreviewUrl(nextPreview);
    setIsUploading(true);
    try {
      const downloadUrl = await uploadImage(file, storagePath);
      onChange(downloadUrl);
      setPreviewUrl(null);
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const displayUrl = previewUrl ?? getImageUrl(value);

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
          void handleFile(file);
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <img
            src={displayUrl}
            alt={value ? "Selected image" : "Default image"}
            className="h-20 w-28 rounded-lg object-cover"
          />
          <div className="flex-1 text-sm text-slate-600">
            <p className="font-semibold text-foreground">
              Drag and drop an image here
            </p>
            <p className="text-xs text-slate-500">
              PNG or JPG. The image uploads to Firebase Storage.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
            {value && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={isUploading}
                onClick={() => {
                  setPreviewUrl(null);
                  onChange("");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        {helperText && (
          <p className="mt-2 text-xs text-slate-500">{helperText}</p>
        )}
        {uploadError && (
          <p className="mt-2 text-xs text-red-600">{uploadError}</p>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => void handleFile(event.target.files?.[0])}
      />
    </div>
  );
};
