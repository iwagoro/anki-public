"use client";
import { userType } from "@/lib/types";
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export const AuthContext = createContext(
    {} as {
        user: userType;
        setUser: React.Dispatch<React.SetStateAction<userType>>;
    }
);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState({} as userType);
    const router = useRouter();
    const { data, isLoading, error } = useSWR(["user/", user.token], ([url, token]) => fetcher(url, token));
    const pathname = usePathname();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    const token = await getIdToken(user);
                    setUser({ token, email: user.email || "", id: user.uid, avatar: user.photoURL || "", total: 0, streak: 0, goal: 0 });
                } else {
                    setUser({} as userType);
                    router.push("/auth");
                }
            } catch {
                setUser({} as userType);
                router.push("/auth");
            }
        });
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>{user.token || pathname === "/auth" ? children : "loading...."}</AuthContext.Provider>;
}
