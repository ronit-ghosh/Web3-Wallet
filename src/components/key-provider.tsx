"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { ethers } from "ethers";

type keyContextType = {
    createMnemonic: () => void
    createKeyPairs: (deivationPath: '501' | '60') => void
    clearKeypairs: () => void
    deleteKeypair: (publicKey: string) => void
    mnemonic: string
    keypairs: KeyPairs[]
}

interface KeyPairs {
    type: '501' | '60'
    private: string
    public: string
}

const KeyContext = createContext<keyContextType | undefined>(undefined)

export function KeyProvider({ children }: { children: React.ReactNode }) {
    const [mnemonic, setMnemonic] = useState('')
    const [keypairs, setKeypairs] = useState<KeyPairs[] | []>([])

    function checkExistingMnemonic() {
        const existingMnemonic = localStorage.getItem('mnemonic')
        if (existingMnemonic) {
            setMnemonic(existingMnemonic)
            return
        }
    }

    function checkExistingKeypairs() {
        const existingKeypairs = localStorage.getItem('keypairs')
        if (existingKeypairs) {
            setKeypairs(JSON.parse(existingKeypairs))
        } else {
            createKeyPairs('501')
            createKeyPairs('60')
        }
    }

    useEffect(() => {
        checkExistingMnemonic()
        checkExistingKeypairs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem('keypairs', JSON.stringify(keypairs))
    }, [keypairs])

    function createKeyPairs(derivationPath: '501' | '60') {
        if (!mnemonic) createMnemonic()
        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/${derivationPath}'/${keypairs.length + 1}'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;

        let publicKey: string = '';
        let privateKey: string = '';

        if (derivationPath === '501') {
            const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed)
            publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58()
            privateKey = bs58.encode(secretKey)
        } else if (derivationPath === '60') {
            privateKey = Buffer.from(derivedSeed).toString('hex')
            publicKey = new ethers.Wallet(privateKey).address
        }

        const newKeypairs: KeyPairs = {
            type: derivationPath,
            private: privateKey,
            public: publicKey
        }

        setKeypairs(prev => [...prev, newKeypairs])
        localStorage.setItem('keypairs', JSON.stringify(keypairs))
    }

    function createMnemonic() {
        checkExistingMnemonic()
        const mnemonic = generateMnemonic(128);
        setMnemonic(mnemonic)
        localStorage.setItem('mnemonic', mnemonic)
    }

    function clearKeypairs() {
        setKeypairs([]);
    }

    function deleteKeypair(publicKey: string) {
        const updatedKeypairs = keypairs.filter(keypair => keypair.public !== publicKey)
        setKeypairs(updatedKeypairs)
        localStorage.setItem('keypairs', JSON.stringify(updatedKeypairs))
    }

    return (
        <KeyContext.Provider
            value={{
                createMnemonic,
                createKeyPairs,
                clearKeypairs,
                deleteKeypair,
                keypairs,
                mnemonic
            }}>
            {children}
        </KeyContext.Provider>
    )
}

export function useKey() {
    const context = useContext(KeyContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}