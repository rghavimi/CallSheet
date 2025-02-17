'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCallsheet } from '../contexts/CallsheetContext'

export default function CreateCallsheet() {
  const router = useRouter()
  const { callsheetData, updateCallsheetData } = useCallsheet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateCallsheetData({ [e.target.id]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    updateCallsheetData({ indoorOutdoor: value })
  }

  if (!callsheetData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="text-[#ffffff]">Loading...</div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201-mzXNnSuRzg37P5bzlvwHcx6RJsPrOu.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <Link 
            href="/"
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
                onChange={handleInputChange}
                id="title"
                className="text-4xl font-bold text-[#ffffff] bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#90c9e3] rounded px-2 py-1 w-full"
                placeholder="My Callsheet"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#ffffff]">Overview</h2>
            
            <div className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="overview" className="text-[#ffffff]">Overview of the production...</Label>
                <Textarea 
                  id="overview"
                  value={callsheetData.overview}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#000000]/40 border border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60 min-h-[100px] focus:border-[#ffffff]/40"
                  placeholder="Enter production overview..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#ffffff]">Production Details</h2>
            
            <div className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="location" className="text-[#ffffff]">Where is the shoot?</Label>
                <Input 
                  id="location"
                  value={callsheetData.location}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#000000]/40 border border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60 focus:border-[#ffffff]/40"
                  placeholder="Enter location..."
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="locationDetails" className="text-[#ffffff]">Additional location details:</Label>
                <Textarea 
                  id="locationDetails"
                  value={callsheetData.locationDetails}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#000000]/40 border border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60 focus:border-[#ffffff]/40"
                  placeholder="Anything to note about location parking, access, etc"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="date" className="text-[#ffffff]">Set a date...</Label>
                <Input 
                  id="date"
                  type="date"
                  value={callsheetData.date}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#000000]/40 border border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60 focus:border-[#ffffff]/40"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="callTime" className="text-[#ffffff]">Call Time:</Label>
                <Input 
                  id="callTime"
                  type="time"
                  value={callsheetData.callTime}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#000000]/40 border border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60 focus:border-[#ffffff]/40"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="wrapTime" className="text-[#ffffff]">Wrap Time:</Label>
                <Input 
                  id="wrapTime"
                  type="time"
                  value={callsheetData.wrapTime}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#000000]/40 border border-[#ffffff]/20 text-[#ffffff] placeholder:text-[#ffffff]/60 focus:border-[#ffffff]/40"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="indoorOutdoor" className="text-[#ffffff]">Indoor or outdoor?</Label>
                <Select onValueChange={handleSelectChange} value={callsheetData.indoorOutdoor}>
                  <SelectTrigger className="mt-2 bg-[#000000]/40 border border-[#ffffff]/20 text-[#ffffff] focus:border-[#ffffff]/40">
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button 
              className="bg-[#335467] text-[#ffffff] hover:bg-[#335467]/90 w-[200px]"
              onClick={() => router.push('/create/talent')}
            >
              Next
            </Button>
            <span className="text-[#ffffff] text-sm">1 of 2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

