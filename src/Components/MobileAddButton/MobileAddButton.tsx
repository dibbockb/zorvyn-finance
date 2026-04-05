import { Plus } from "lucide-react";

const MobileAddButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="lg:hidden fixed bottom-30 right-10 z-999 flex items-center justify-center w-14 h-14 bg-primary text-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] active:scale-90 transition-all duration-200 hover:scale-105"
        >
            <Plus size={28} strokeWidth={3} />
        </button>
    );
};

export default MobileAddButton;