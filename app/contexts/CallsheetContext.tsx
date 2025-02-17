"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface TalentEntry {
  role: string
  name: string
  phone: string
  email: string
  address: string // Add this line
  callTime: string
  callOut: string
  notes: string
}

interface CallsheetData {
  title: string
  overview: string
  location: string
  locationDetails: string
  date: string
  callTime: string
  wrapTime: string
  indoorOutdoor: string
  talents: TalentEntry[]
}

interface CallsheetContextType {
  callsheetData: CallsheetData
  updateCallsheetData: (data: Partial<CallsheetData>) => void
  addTalent: (talent: TalentEntry) => void
  updateTalent: (index: number, talent: Partial<TalentEntry>) => void
  removeTalent: (index: number) => void
}

const CallsheetContext = createContext<CallsheetContextType | undefined>(undefined)

export const useCallsheet = () => {
  const context = useContext(CallsheetContext)
  if (!context) {
    throw new Error("useCallsheet must be used within a CallsheetProvider")
  }
  return context
}

export const CallsheetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [callsheetData, setCallsheetData] = useState<CallsheetData>({
    title: "",
    overview: "",
    location: "",
    locationDetails: "",
    date: "",
    callTime: "",
    wrapTime: "",
    indoorOutdoor: "",
    talents: [],
  })

  const updateCallsheetData = (data: Partial<CallsheetData>) => {
    setCallsheetData((prev) => ({ ...prev, ...data }))
  }

  const addTalent = (talent: TalentEntry) => {
    setCallsheetData((prev) => ({
      ...prev,
      talents: [...prev.talents, talent],
    }))
  }

  const updateTalent = (index: number, talent: Partial<TalentEntry>) => {
    setCallsheetData((prev) => ({
      ...prev,
      talents: prev.talents.map((t, i) => (i === index ? { ...t, ...talent } : t)),
    }))
  }

  const removeTalent = (index: number) => {
    setCallsheetData((prev) => ({
      ...prev,
      talents: prev.talents.filter((_, i) => i !== index),
    }))
  }

  return (
    <CallsheetContext.Provider value={{ callsheetData, updateCallsheetData, addTalent, updateTalent, removeTalent }}>
      {children}
    </CallsheetContext.Provider>
  )
}

