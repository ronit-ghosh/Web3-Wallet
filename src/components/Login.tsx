"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Lock, Rocket, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#1c1c1c] border-none shadow-xl overflow-hidden py-0">
                <div className="p-4 border-b border-[#2c2c2c]">
                    <Button variant="default" size="icon" className="cursor-pointer">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </div>

                <CardContent className="flex flex-col items-center p-6 pt-8">
                    <div className="relative mb-6">
                        <div className="w-16 h-16 bg-[#333333] rounded-xl flex items-center justify-center">
                            <div className="w-12 h-8 rounded-md overflow-hidden">
                                <div className="h-4 bg-[#4cd964] rounded-t-md"></div>
                                <div className="h-4 bg-[#a594ff] rounded-b-md"></div>
                            </div>
                        </div>
                        <Sparkles className="absolute text-[#f8e36f] h-6 w-6 -top-2 -right-2" />
                        <Sparkles className="absolute text-[#f8e36f] h-6 w-6 bottom-0 -right-4" />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-8">Add a Wallet</h1>

                    <div className="w-full space-y-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                <Rocket className="h-5 w-5 text-[#a594ff]" />
                            </div>
                            <div>
                                <h3 className="text-white text-lg font-semibold">Seamless setup</h3>
                                <p className="text-gray-400">
                                    Create a wallet using a Google or Apple account and start exploring web3 with ease
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                <Lock className="h-5 w-5 text-[#a594ff]" />
                            </div>
                            <div>
                                <h3 className="text-white text-lg font-semibold">Enhanced security</h3>
                                <p className="text-gray-400">
                                    Your wallet is stored securely and decentralized across multiple factors
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                <Heart className="h-5 w-5 text-[#ff6347]" />
                            </div>
                            <div>
                                <h3 className="text-white text-lg font-semibold">Easy recovery</h3>
                                <p className="text-gray-400">
                                    Recover access to your wallet with your Google or Apple account and a 4-digit PIN
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full py-6 text-base font-medium bg-[#a594ff] hover:bg-[#9380ff] text-black mb-4"
                    >
                        Continue with Email
                    </Button>

                    <Button
                        onClick={() => router.push('/solana')}
                        variant="ghost"
                        className="w-full text-[#a594ff] hover:bg-[#2c2c2c] hover:text-[#a594ff]"
                    >
                        Create a seed phrase wallet
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}