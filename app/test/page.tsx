"use client";
import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer } from "@react-pdf-viewer/core";
export default function PDF() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin({});
    const pdfUrl = "https://arxiv.org/pdf/2209.00796";
    return (
        <div className="App">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                <div
                    style={{
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        height: "100%",
                    }}
                >
                    <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                </div>
            </Worker>
        </div>
    );
}
