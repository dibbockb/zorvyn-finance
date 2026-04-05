import { Plus } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useShallow } from "zustand/react/shallow";

const MobileAddButton = ({ onClick }: { onClick: () => void }) => {
    const { role } = useStore(useShallow((state) => ({
        role: state.role,
    })));

    return (
        <button
            disabled={role === 'User'}
            onClick={onClick}
            className={`lg:hidden fixed bottom-30 right-10 z-999 flex items-center justify-center w-14 h-14 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] active:scale-90 transition-all duration-200 hover:scale-105 
             ${role === 'User' ? 'hidden' : ' text-white bg-primary'}
            `}
        >
            <Plus size={28} strokeWidth={2} />
        </button >
    );
};

export default MobileAddButton;