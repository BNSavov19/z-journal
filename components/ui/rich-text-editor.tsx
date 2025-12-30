"use client";

import dynamic from "next/dynamic";
import { cn } from "../../lib/utils";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  className
}: RichTextEditorProps) => (
  <div className={cn("rounded-2xl border border-border bg-white", className)}>
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="min-h-[220px]"
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "blockquote"],
          ["clean"]
        ]
      }}
    />
  </div>
);
