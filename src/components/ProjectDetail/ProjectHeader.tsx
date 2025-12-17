import React from "react";

export const ProjectHeader = ({ id, title }: { id: number; title: string }) => {
  return (
    <div>
      <p className="font-montserrat font-medium leading-normal relative shrink-0 text-[32px] text-white w-full whitespace-pre-wrap">
        {String(id).padStart(2, "0")} / {title}
      </p>
    </div>
  );
};
