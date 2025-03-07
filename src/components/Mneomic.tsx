"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useKey } from "./key-provider";
import { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { toast } from "sonner";

export default function Mnemonic({ next }: { next: () => void }) {
    const { mnemonic, createMnemonic } = useKey()

    useEffect(() => {
        createMnemonic()
    }, [])

    function handleCopy() {
        navigator.clipboard.writeText(mnemonic)
        toast('Copied to clipboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#1c1c1c] border-none shadow-xl overflow-hidden rounded-xl py-0">
                <CardContent className="flex flex-col p-6 pt-8">
                    <h1 className="text-3xl font-bold text-white mb-2 text-center">Secret Recovery Phrase</h1>
                    <p className="text-[#f0c742] mb-6 text-center">
                        This phrase is the ONLY way to recover your wallet. Do NOT share it with anyone!
                    </p>

                    <div
                        onClick={handleCopy}
                        className="relative cursor-pointer grid grid-cols-3 gap-3 mb-6 blur hover:blur-none transition-transform">
                        {mnemonic.split(' ').map((word, i) => (
                            <div key={i} className="bg-[#222222] border border-[#333333] rounded-md p-3 flex items-center">
                                <span className="text-gray-500 mr-2">{i + 1}.</span>
                                <span className="text-white">{word}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mb-1 mx-auto flex items-center gap-1">
                        Hover to copy key phrases
                        <ArrowUp
                            size={16}
                            className="animate-bounce" />
                    </p>

                    <Button
                        onClick={next}
                        className="w-full py-6 bg-[#333333] hover:bg-[#444444] text-white rounded-md"
                    >
                        Continue
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
