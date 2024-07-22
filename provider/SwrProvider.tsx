"use client";
import React from "react";
import { SWRConfig } from "swr";

interface SWRProviderProps {
    children: React.ReactNode;
}

export const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>;
