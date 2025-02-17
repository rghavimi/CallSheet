"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { useCallsheet } from "../../contexts/CallsheetContext"

type LabelType = "Talent" | "Crew" | null

export default function CreateCallsheetTalent() {
  const router = useRouter()
  const { callsheetData, updateCallsheetData, addTalent, updateTalent, removeTalent } = useCallsheet()
  const [labels, setLabels] = useState<LabelType[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setLabels((prevLabels) => {
      const newLabels = [...prevLabels]
      while (newLabels.length < callsheetData.talents.length) {
        newLabels.push("Talent")
      }
      return newLabels
    })
  }, [callsheetData.talents])

  const handleAddTalent = () => {
    addTalent({
      role: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      callTime: "",
      callOut: "",
      notes: "",
      label: "Talent",
    })
    setLabels((prevLabels) => [...prevLabels, "Talent"])
  }

  const handleUpdateTalent = (index: number, field: string, value: string) => {
    updateTalent(index, { [field]: value })
  }

  const handleRemoveTalent = (index: number) => {
    removeTalent(index)
    setLabels(labels.filter((_, i) => i !== index))
  }

  const toggleLabel = (index: number) => {
    const newLabels = labels.map((label, i) => (i === index ? (label === "Talent" ? "Crew" : "Talent") : label))
    setLabels(newLabels)
    updateTalent(index, { label: newLabels[index] })
  }

  const removeLabel = (index: number) => {
    const newLabels = labels.map((label, i) => (i === index ? null : label))
    setLabels(newLabels)
    updateTalent(index, { label: null })
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201-mzXNnSuRzg37P5bzlvwHcx6RJsPrOu.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/create"
            className="text-[#ffffff] hover:text-[#ffffff]/80 transition-colors inline-flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            back
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <div className="mb-4">
              <input
                type="text"
                value={callsheetData.title}
                onChange={(e) => updateCallsheetData({ title: e.target.value })}
                className="text-4xl font-bold text-[#ffffff] bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#90c9e3] rounded px-2 py-1 w-full"
                placeholder="My Callsheet"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#ffffff] mb-6">Talent & Crew Information</h2>

            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex space-x-4 p-4">
                {callsheetData.talents.map((talent, index) => (
                  <Card
                    key={index}
                    className="bg-[#000000]/60 border border-[#ffffff] text-[#ffffff] backdrop-blur-sm flex-shrink-0 w-72 overflow-hidden"
                  >
                    <CardContent className="p-4 pt-8 flex flex-col h-full relative">
                      <div className="flex justify-between items-start mb-4">
                        {labels[index] && (
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-[#ffffff]/20 text-[#ffffff] text-xs"
                              onClick={() => toggleLabel(index)}
                            >
                              {labels[index]}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-1 h-6 w-6 hover:bg-[#ffffff]/20 text-[#ffffff]"
                              onClick={() => removeLabel(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        {!labels[index] && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-[#ffffff]/20 text-[#ffffff] text-xs"
                            onClick={() => toggleLabel(index)}
                          >
                            Add Label
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 hover:bg-[#ffffff]/20 text-[#ffffff]"
                          onClick={() => handleRemoveTalent(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4 flex-grow">
                        <div>
                          <Label htmlFor={`role-${index}`} className="text-[#ffffff]">
                            Role
                          </Label>
                          <Input
                            id={`role-${index}`}
                            value={talent.role}
                            onChange={(e) => handleUpdateTalent(index, "role", e.target.value)}
                            className="mt-1 bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`name-${index}`} className="text-[#ffffff]">
                            Name
                          </Label>
                          <Input
                            id={`name-${index}`}
                            value={talent.name}
                            onChange={(e) => handleUpdateTalent(index, "name", e.target.value)}
                            className="mt-1 bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`phone-${index}`} className="text-[#ffffff]">
                            Phone Number
                          </Label>
                          <Input
                            id={`phone-${index}`}
                            type="tel"
                            value={talent.phone}
                            onChange={(e) => handleUpdateTalent(index, "phone", e.target.value)}
                            className="mt-1 bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`email-${index}`} className="text-[#ffffff]">
                            Email
                          </Label>
                          <Input
                            id={`email-${index}`}
                            type="email"
                            value={talent.email}
                            onChange={(e) => handleUpdateTalent(index, "email", e.target.value)}
                            className="mt-1 bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`address-${index}`} className="text-[#ffffff]">
                            Address
                          </Label>
                          <Input
                            id={`address-${index}`}
                            value={talent.address}
                            onChange={(e) => handleUpdateTalent(index, "address", e.target.value)}
                            className="mt-1 bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`callTime-${index}`} className="text-[#ffffff]">
                            Call Time
                          </Label>
                          <Input
                            id={`callTime-${index}`}
                            type="time"
                            value={talent.callTime}
                            onChange={(e) => handleUpdateTalent(index, "callTime", e.target.value)}
                            className="mt-1 bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`wrapTime-${index}`} className="text-[#ffffff]">
                            Wrap Time
                          </Label>
                          <Input
                            id={`wrapTime-${index}`}
                            type="time"
                            value={talent.callOut}
                            onChange={(e) => handleUpdateTalent(index, "callOut", e.target.value)}
                            className="mt-1 bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`notes-${index}`} className="text-[#ffffff]">
                            Additional Notes
                          </Label>
                          <Textarea
                            id={`notes-${index}`}
                            value={talent.notes}
                            onChange={(e) => handleUpdateTalent(index, "notes", e.target.value)}
                            className="mt-1 bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60"
                            rows={3}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card
                  onClick={handleAddTalent}
                  className="bg-[#000000]/60 border border-[#ffffff] backdrop-blur-sm flex-shrink-0 w-72 cursor-pointer hover:bg-[#000000]/80 transition-colors overflow-hidden"
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                    <h3 className="text-2xl font-semibold mb-4 text-[#ffffff]">Add Talent/Crew</h3>
                    <div className="rounded-full bg-[#ffffff] p-4">
                      <Plus className="h-6 w-6 text-[#000000]" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              className="bg-[#335467] text-[#ffffff] hover:bg-[#335467]/90 w-[200px]"
              onClick={() => router.push("/create/preview")}
            >
              Finish
            </Button>
            <span className="text-[#ffffff] text-sm">2 of 2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

