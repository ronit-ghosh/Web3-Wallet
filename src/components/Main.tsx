"use client"

import Landing from '@/components/Landing';
import SelectBlockchain from '@/components/SelectBlockchain';
import { useEffect, useState } from 'react'
import Mnemonic from './Mneomic';

export default function Main() {
  const [currentStep, setCurrentStep] = useState(0);
  const [existingMnemonic, setExistingMnemonic] = useState<string | null>(null)

  useEffect(() => {
    const existingMnemonic = localStorage.getItem('mnemonic')
    setExistingMnemonic(existingMnemonic)
  }, [])

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, components.length - 1));
  };

  const components = [
    { id: "landing", component: <Landing next={nextStep} /> },
    { id: "mnemonic", component: <Mnemonic next={nextStep} /> },
    { id: "selectBlockchain", component: <SelectBlockchain /> },
  ];

  if (existingMnemonic) return <SelectBlockchain />
  return <div key={components[currentStep].id}>{components[currentStep].component}</div>;
}
