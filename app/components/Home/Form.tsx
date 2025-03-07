import React from 'react';

export default function CreateServerForm() {
    return (
        <div className="relative group">
            <div className="
        w-64
        aspect-[3/4]
        rounded-t-full
        bg-white
      "></div>
            <div className="
        absolute
        top-0
        left-0
        border-2
        backdrop-blur-md
        border-white/20
        w-64
        aspect-[3/4]
        rounded-t-full
        bg-red-600
        origin-left
        transition-transform
        duration-500
        transform
        group-hover:scale-x-100
        -scale-x-100
      "></div>
        </div>
    );
}