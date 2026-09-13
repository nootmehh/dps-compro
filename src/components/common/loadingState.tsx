"use client";

import LordIcon from "./lordIcon";

export interface LoadingStateProps {
  text?: string;
  subtext?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingState({
  text = "Loading, Mohon Tunggu...",
  subtext,
  fullScreen = true,
  className = "",
}: LoadingStateProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 min-h-screen w-full bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center select-none"
    : "w-full min-h-[360px] py-16 px-6 flex flex-col items-center justify-center text-center select-none";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={text}
      className={`${containerClasses} ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-2 max-w-sm animate-fade-in">
        {/* LordIcon 120px Person Digging Looping with Exact 3-Color Set */}
        <div className="shrink-0 flex items-center justify-center drop-shadow-xs">
          <LordIcon
            src="/lord-icons/lineal/wired-flat-666-person-digging-hover-pinch.json"
            size={100}
            trigger="loop"
            primaryColor="#0a9863"
            secondaryColor="#b26836"
            tertiaryColor="#3a3347"
          />
        </div>

        {/* Loading Message */}
        <div className="flex flex-col items-center gap-1.5">
          <h4 className="text-dark/80 text-base sm:text-lg font-semibold font-sans tracking-wide">
            {text}
          </h4>
          {subtext && (
            <p className="text-dark/60 text-xs sm:text-sm font-normal font-sans">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
