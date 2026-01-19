"use client";

import React from "react";
import Background from "@/components/ui/Background";
import { FiDownload, FiExternalLink } from "react-icons/fi";

const CVPage = () => {
  const pdfUrl = "/krish khanna.pdf";

  return (
    <Background>
      <div className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
              My Resume
            </h1>
            <a
              href={pdfUrl}
              download="Krish_Khanna_Resume.pdf"
              className="flex items-center gap-2 bg-[#f0b429] hover:bg-[#f0b429]/90 text-black font-medium py-2 px-4 rounded-md transition-colors"
            >
              <FiDownload className="text-lg" />
              Download
            </a>
          </div>

          {/* Simple, functional PDF viewer */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-[#333333] px-4 py-3 border-b border-[#444444] flex justify-between items-center">
              <h2 className="text-white font-medium">Resume Preview</h2>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/80 hover:text-white text-sm"
              >
                <span>Open in new tab</span>
                <FiExternalLink />
              </a>
            </div>

            {/* Mobile notice */}
            <div className="block sm:hidden bg-[#444444] px-4 py-2 text-white/80 text-sm text-center">
              For best viewing experience, download or open in new tab
            </div>

            <div className="bg-[#525659] p-2 sm:p-4 md:p-8">
              <div className="bg-white shadow-lg mx-auto max-w-[800px]">
                {/* Responsive iframe container with aspect ratio */}
                <div
                  className="relative w-full"
                  style={{ paddingTop: "141.4%" /* A4 aspect ratio */ }}
                >
                  <iframe
                    src={pdfUrl}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    title="Resume PDF"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-friendly alternative */}
          <div className="mt-8 text-center block sm:hidden">
            <p className="text-white/80 mb-4">
              Having trouble viewing the resume? Try one of these options:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={pdfUrl}
                download="Krish_Khanna_Resume.pdf"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                <FiDownload />
                Download PDF
              </a>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                <FiExternalLink />
                Open in Browser
              </a>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default CVPage;
