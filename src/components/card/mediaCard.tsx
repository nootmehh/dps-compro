"use client";

import { useState } from "react";
import LordIcon from "../common/lordIcon";

export interface MediaCardProps {
  imageUrl: string;
  fileName: string;
  fileSize?: string;
  onDelete?: () => void;
  onClick?: () => void;
  layout?: "grid" | "list";
  className?: string;
}

export default function MediaCard({
  imageUrl,
  fileName,
  fileSize,
  onDelete,
  onClick,
  layout = "grid",
  className = "",
}: MediaCardProps) {
  const [imageError, setImageError] = useState(false);

  if (layout === "list") {
    return (
      <div
        onClick={onClick}
        className={`w-full p-3 bg-white rounded-2xl border border-gray-200 flex items-center justify-between gap-4 transition-all hover:border-g1 hover:shadow-sm cursor-pointer select-none ${className}`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="size-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 flex items-center justify-center">
            {imageError ? (
              <LordIcon name="Search" size={20} primaryColor="#64748b" />
            ) : (
              <img
                src={imageUrl}
                alt={fileName}
                onError={() => setImageError(true)}
                className="size-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-medium text-dark truncate font-sans" title={fileName}>
              {fileName}
            </span>
            {fileSize && (
              <span className="text-xs text-dark/50 font-sans">{fileSize}</span>
            )}
          </div>
        </div>

        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-dark/40 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            aria-label="Delete media"
          >
            <LordIcon name="Trash" size={16} primaryColor="currentColor" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group w-full max-w-60 p-3 bg-white rounded-2xl border border-gray-200 flex flex-col gap-2.5 transition-all hover:border-g1 hover:shadow-md cursor-pointer select-none ${className}`}
    >
      <div className="w-full h-32 rounded-xl overflow-hidden bg-stone-100 relative flex items-center justify-center">
        {imageError ? (
          <LordIcon name="Search" size={28} primaryColor="#64748b" />
        ) : (
          <img
            src={imageUrl}
            alt={fileName}
            onError={() => setImageError(true)}
            className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-2 min-w-0">
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs sm:text-sm font-medium text-dark truncate font-sans" title={fileName}>
            {fileName}
          </span>
          {fileSize && (
            <span className="text-xs text-dark/50 font-sans">{fileSize}</span>
          )}
        </div>
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-dark/40 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors cursor-pointer shrink-0"
            aria-label="Delete media"
          >
            <LordIcon name="Trash" size={16} primaryColor="currentColor" />
          </button>
        )}
      </div>
    </div>
  );
}
