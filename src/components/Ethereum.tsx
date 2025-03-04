"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Eye, EyeOff, Plus, Trash, Trash2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useKey } from "./key-provider";
import { toast } from "sonner";

export default function Ethereum() {
  const { mnemonic, keypairs, createKeyPairs, clearKeypairs, deleteKeypair } = useKey()
  const [showPrivateKey, setShowPrivateKey] = useState<Record<number, boolean>>({});

  const ethKeypairs = keypairs.filter(keypair => keypair.type !== '501')

  const togglePrivateKey = (id: number) => {
    setShowPrivateKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast('Copied to clipboard!')
    } catch (error) {
      console.error(error)
      toast('Failed to copy to clipboard!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[#1c1c1c] border-none shadow-xl overflow-hidden rounded-xl py-0">
        <CardContent className="flex flex-col p-6 pt-8">

          <div className="mb-6 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4">Ethereum Wallet</h2>
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                className="flex-1 bg-[#222222] text-white border-[#333333] hover:bg-[#333333]"
                onClick={clearKeypairs}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Wallet
              </Button>
              <Button
                className="flex-1 bg-[#a78bfa] hover:bg-[#9061f9] text-white"
                onClick={() => createKeyPairs('60')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Wallet
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[65vh]">
            <Accordion type="single" collapsible className="mb-6 bg-[#222222] rounded-lg overflow-hidden">
              <AccordionItem value="key-phrases" className="border-b-0">
                <AccordionTrigger className="px-4 py-3 text-white hover:bg-[#333333] hover:no-underline">
                  Key Phrases
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {mnemonic.split(' ').map((phrase, index) => (
                      <div key={index} className="bg-[#333333] border border-[#444444] rounded-md p-2 flex items-center">
                        <span className="text-gray-500 mr-2 text-xs">{index + 1}.</span>
                        <span className="text-white text-sm">{phrase}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-4">
              {
                ethKeypairs.map((keypair, i) => (
                  keypair.type === '60' &&
                  <Card key={i} className="bg-[#222222] border-[#333333] overflow-hidden py-2">
                    <CardContent className="p-4">
                      <div className="w-full flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white mb-3">Wallet {i + 1}</h3>
                        <Button
                          onClick={() => deleteKeypair(keypair.public)}
                          variant='destructive'> <Trash /> </Button>
                      </div>
                      <div
                        onClick={() => handleCopy(keypair.public)}
                        className="mb-3 cursor-pointer">
                        <p className="text-gray-400 text-sm mb-1">Public Key</p>
                        <div className="bg-[#333333] p-2 rounded-md text-white text-sm break-all">
                          {keypair.public}
                        </div>
                      </div>
                      <div>
                        <div
                          className="flex justify-between items-center mb-1">
                          <p className="text-gray-400 text-sm">Private Key</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-[#444444]"
                            onClick={() => togglePrivateKey(i)}
                          >
                            {showPrivateKey[i] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <div
                          onClick={() => { if (showPrivateKey[i]) handleCopy(keypair.private) }}
                          className={`bg-[#333333] p-2 rounded-md text-white text-sm break-all ${showPrivateKey[i] && "cursor-pointer"}`}>
                          {showPrivateKey[i] ? keypair.private : "••••••••••••••••••••••••••••••••••••••••••"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {
                ethKeypairs.length === 0 && (
                  <div className="bg-[#222222] border border-[#333333] rounded-lg p-6 text-center">
                    <p className="text-gray-400">No wallets found. Click &apos;Add Wallet&apos; to create one.</p>
                  </div>)
              }

            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
