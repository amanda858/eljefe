import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { AppHeader } from "@/components/app-header";
import "./globals.css";

const headline = Archivo({
    subsets: ["latin"],
    variable: "--font-headline",
    weight: ["500", "600", "700"],
});

const body = IBM_Plex_Sans({
    subsets: ["latin"],
    variable: "--font-body",
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "El Jefe | Real-Time Betting Intelligence",
    description:
        "Real-time odds aggregation, consensus lines, edge scoring, sharp movement detection, and transparent probability models across every major sportsbook.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${headline.variable} ${body.variable}`}>
                <AppHeader />
                {children}
            </body>
        </html>
    );
}