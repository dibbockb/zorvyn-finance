import { useStore } from "../../store/useStore";

export const ToggleRole = () => {
    const { role, setRole } = useStore();

    return (
        <div className="flex items-center gap-3 p-2 rounded-xl  ">
            <div className="flex bg-background p-3 rounded-lg gap-2">
                {(['User', 'Admin'] as const).map((r) => (
                    <button
                        key={r}
                        onClick={() => setRole(r)}
                        className={`px-3 py-1 text-xs font-bold transition-all rounded-md ${role === r
                            ? 'bg-primary text-white shadow-md'
                            : 'text-neutral/50 hover:bg-primary hover:text-white'}`}>
                        {r}
                    </button>
                ))}
            </div>
        </div>
    );
};