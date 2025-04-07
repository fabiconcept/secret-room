import FromSender from "./FromSender";
import FromMe from "./FromMe";

export default function ChatSection() {
    return (
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto w-full p-3">
            <FromSender />
            <FromMe />
            <FromMe />
            <FromMe />
            <FromSender />
            <FromMe />
            <FromMe />
            <FromMe />
            <FromSender />
        </div>
    )
}
