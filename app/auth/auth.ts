import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, deleteUser, signOut as logOut } from "firebase/auth";
import axios from "axios";
import { toast } from "sonner";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const url = process.env.NEXT_PUBLIC_API_URL;

//! ユーザー情報を取得する
export const getUserInfo = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/user`, config);
        return res.data.user;
    } catch {
        toast.error("ログインに失敗しました");
        throw new Error();
    }
};

//! ユーザを追加する
export const addUser = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${url}/user`, {}, config);
    } catch {
        toast.error("ユーザーの追加に失敗しました");
        throw new Error();
    }
};

export const signUp = async () => {
    console.log("signing up");
    signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        try {
            const res = token && (await addUser(token));
            window.location.href = "/";
        } catch {
            await deleteUser(auth.currentUser!);
            toast.error("Failed to Sign Up");
        }
    });
};

export const signIn = async () => {
    console.log("signing in");
    signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        try {
            const res = token && (await getUserInfo(token));
            window.location.href = "/";
        } catch {
            toast.error("Failed to Login");
        }
    });
};

export const signOut = async () => {
    logOut(auth).then(() => {
        window.location.href = "/auth";
    });
};
