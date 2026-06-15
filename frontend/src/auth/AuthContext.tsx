import {
    createContext,
    useContext,
    useState,
    ReactNode
} from "react";

type AuthContextType = {
    userId: string | null;
    isAuthenticated: boolean;
    login: (id: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);


export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [userId, setUserId] = useState<string | null>(() => {
        return localStorage.getItem("userId");
    });

    const login = (id: string) => {
        setUserId(id);
        localStorage.setItem("userId", id);
    };

    const logout = () => {
        setUserId(null);
        localStorage.removeItem("userId");
    };

    const isAuthenticated = userId !== null;

    return (
        <AuthContext.Provider value={{
            userId,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}