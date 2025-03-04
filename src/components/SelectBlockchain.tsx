import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SelectBlockchain() {
    const router = useRouter()
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md bg-[#1c1c1c] border-none shadow-xl overflow-hidden">
                <div className="px-4 pb-4 border-b border-[#2c2c2c] flex justify-between items-center">
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </div>

                <CardContent className="flex flex-col items-center gap-3">

                    <h1 className="text-3xl font-bold text-white mb-2">Select Blockchain</h1>
                    <p className="text-gray-400 mb-2 text-center">
                        Select to create your wallet
                    </p>

                    <Button
                        onClick={() => router.push('/solana')}
                        variant="outline"
                        className="w-full py-8 bg-[#222222] hover:bg-[#2a2a2a] border-[#333333] flex items-center justify-center gap-3"
                    >
                        <div className="flex-shrink-0"></div>
                        <div>
                            <h3 className="text-white text-lg font-semibold">Solana</h3>
                        </div>
                    </Button>
                    <Button
                        onClick={() => router.push('/ethereum')}
                        variant="outline"
                        className="w-full py-8 bg-[#222222] hover:bg-[#2a2a2a] border-[#333333] flex items-center justify-center gap-3"
                    >
                        <div className="flex-shrink-0"></div>
                        <div>
                            <h3 className="text-white text-lg font-semibold">Ethereum</h3>
                        </div>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
