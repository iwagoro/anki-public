"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Button } from "@/components/shadcn/button";
import { signUp, signIn } from "./auth";
export default function AuthPage() {
    const [state, setState] = useState<"signin" | "signup">("signin");
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 ">
            <Card className="w-full max-w-lg">
                <CardHeader className="w-full flex justify-center gap-5">
                    <CardTitle className="text-center">{state === "signup" ? "Sign Up" : "Sign in"}</CardTitle>
                    <CardDescription className="text-center">Welcome to the app! Please {state === "signup" ? "Sign Up" : "Sign in"} to continue</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Button variant="outline" onClick={() => (state === "signup" ? signUp() : signIn())}>
                        <FcGoogle size={24} className="mr-2" /> Continue with Google
                    </Button>
                </CardContent>
                <CardFooter className="w-full">
                    <CardDescription className="flex w-full  justify-center">
                        {state === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <button
                            className="text-primary underline"
                            onClick={() => {
                                setState(state === "signup" ? "signin" : "signup");
                            }}
                        >
                            {state === "signup" ? "Sign In" : "Sign Up"}
                        </button>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}
