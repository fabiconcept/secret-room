export default function ChatBox() {
    return (
        <div className="flex items-start p-5 bg-white/5 border-t border-gray-500/20">
            <textarea
                placeholder="Send a message..."
                className="flex-1 bg-white/5 border border-gray-500/20 rounded-3xl px-5 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 resize-none field-sizing-content max-h-32"
                rows={1}
            />
            <button className="ml-3 bg-green-500 border border-gray-500/20 rounded-full px-8 py-3 hover:opacity-100 opacity-80 active:scale-90 cursor-pointer hover:border-white/20">
                Send
            </button>
        </div>
    )
}