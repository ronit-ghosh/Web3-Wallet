import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { WalletMinimal } from "lucide-react";

export default function Landing({ next }: { next: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1c1c1c] border-none shadow-xl">
        <CardHeader className="flex flex-col items-center space-y-1 pb-2">
          <div className="flex items-center gap-2">
            <WalletMinimal className="h-10 w-10 text-white" />
            <span className="text-4xl font-bold text-white">Web3 Wallet</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CardDescription className="text-center text-gray-400 text-lg mb-10">
            To get started, create a new wallet.
          </CardDescription>
          <div className="flex flex-col w-full gap-3">
            <Button
            onClick={next}
              className="w-full py-6 text-base font-medium bg-[#a594ff] hover:bg-[#9380ff] text-black"
            >
              Create a new wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}