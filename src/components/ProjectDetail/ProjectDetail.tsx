"use client";

import { ProjectDetail, ProjectImage } from "@/data/projects";
import Background from "../ui/Background";
import StackedImageGallery from "./StackedImageGallery";

interface ProjectDetailProps {
  project: ProjectDetail;
}

export default function ProjectDetailComponent({ project }: ProjectDetailProps) {
  // Use only the images array - no legacy fallback
  const images: ProjectImage[] = project.images || [];

  return (
    <Background theme="blog">
      <div className="relative w-full min-h-screen overflow-x-hidden">
        {/* Main Content Container */}
        <div className="relative z-10 pt-[143px] pb-16">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
              {/* Left Section - Text Content */}
              <div className="w-full lg:w-[564px] lg:pl-[67px] lg:pr-8 flex-shrink-0">
                {/* Project Number and Title */}
                <div className="mb-[72px]">
                  <h1 className="font-montserrat font-medium leading-normal text-[32px] text-white whitespace-pre-wrap break-words">
                    {String(project.id).padStart(2, "0")} / {project.title}
                  </h1>
                </div>

                {/* Content Sections */}
                <div className="flex flex-col gap-[40px]">
                  {/* Project Overview */}
                  {project.projectOverview && (
                    <div className="flex flex-col gap-[16px]">
                      <div className="flex flex-col gap-[20px] leading-normal text-white whitespace-pre-wrap">
                        <h2 className="capitalize font-montserrat font-semibold text-[24px] break-words">
                          Project Overview
                        </h2>
                        <p className="font-montserrat font-normal text-[20px] break-words">
                          {project.projectOverview}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Problem Statement */}
                  {project.problemStatement && (
                    <div className="flex flex-col gap-[16px]">
                      <div className="flex flex-col gap-[20px] leading-normal text-white whitespace-pre-wrap">
                        <h2 className="capitalize font-montserrat font-semibold text-[24px] break-words">
                          Problem Statement
                        </h2>
                        <p className="font-montserrat font-normal text-[20px] break-words">
                          {project.problemStatement}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* My Role */}
                  {project.myRole && project.myRole.length > 0 && (
                    <div className="flex flex-col gap-[16px]">
                      <div className="flex flex-col gap-[20px]">
                        <h2 className="capitalize font-montserrat font-semibold leading-normal text-[24px] text-white whitespace-pre-wrap break-words">
                          My Role
                        </h2>
                        <div className="flex flex-wrap gap-[4px]">
                          {project.myRole.map((role, index) => (
                            <div
                              key={index}
                              className="bg-[#d3e6fb] box-border flex gap-[4px] items-center justify-center px-4 py-3 rounded-[6px]"
                            >
                              <p className="font-montserrat font-normal leading-[18px] text-[#031028] text-[20px] tracking-[-0.2px] whitespace-nowrap">
                                {role}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section - Stacked Image Gallery */}
              <div className="w-full lg:flex-1 lg:pl-8 flex-shrink-0">
                <StackedImageGallery images={images} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}
