import { ReactNode } from "react";

export default function Background({theme = "background", children }: { theme?: "blog" | "background", children: ReactNode }) {
  return (
    <div className={`relative min-h-screen ${theme === "background" ? "bg-[#020611]" : "bg-[#282213]"}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.50) 2px, transparent 2px)",
          backgroundSize: "40px 40px",
          opacity: 0.2,
        }}
      />

      {/* Dashed vertical line with gaps */}
      <div
        className="absolute left-[23px] top-0 bottom-0 w-[3px] border-l-[3px] border-dashed border-white"
        style={{
          background:
            "repeating-linear-gradient(to bottom, white, white 60px, transparent 20px, transparent 80px)",
          opacity: 0.8,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
