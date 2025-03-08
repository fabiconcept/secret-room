import "@/app/styles/button.css"
import React from 'react'

export default function Button({ text }: { text: string }) {
    return (
        <button data-text={text} className="glitch-button w-full cursor-pointer active:scale-[0.98] active:rotate-1 origin-bottom-left">{text}</button>
    )
}
