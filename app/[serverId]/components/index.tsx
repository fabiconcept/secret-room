import MainSection from "./MainSection";
import SideBar from "./SideBar";

export default function ChatSection() {
    return (
        <div className="h-full w-full flex bg-black/50 backdrop-blur-[4px] overflow-hidden relative z-[300]">
            <SideBar />
            <MainSection />
        </div>
    )
}   