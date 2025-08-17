// src/components/common/ThemeToggle.tsx
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function ThemeToggle() {
    const [darkMode, setDarkMode] = useLocalStorage("rbilling:darkMode", false);

    return (
        <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-3 py-2 rounded-lg border"
        >
            {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
}