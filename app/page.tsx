'use client'
import React, { useState, useEffect } from 'react'
import { Plus, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('active')

  useEffect(() => {
    const activeSection = document.getElementById('create-section')
    const archiveSection = document.getElementById('archive-section')

    if (activeTab === 'active') {
      activeSection?.classList.remove('hidden')
      archiveSection?.classList.add('hidden')
    } else {
      activeSection?.classList.add('hidden')
      archiveSection?.classList.remove('hidden')
    }
  }, [activeTab])

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
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">CALLSHEET®</h1>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-white" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#a7d1e4]">
              3
            </Badge>
          </Button>
        </div>

        {/* Welcome Message */}
        <h2 className="text-2xl md:text-3xl text-white mb-8">
          Manage your callsheets, Cade
        </h2>

        {/* Navigation Tabs */}
        <Tabs defaultValue="active" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-[#ffffff] text-[#000000]">
            <TabsTrigger 
              value="active"
              className="data-[state=active]:bg-[#000000] data-[state=active]:text-[#ffffff]"
            >
              Active
            </TabsTrigger>
            <TabsTrigger 
              value="archive"
              className="data-[state=active]:bg-[#000000] data-[state=active]:text-[#ffffff]"
            >
              Archive
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Create Section */}
        <div className="mb-8" id="create-section">
          <div className="relative">
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex space-x-4 p-4">
                <Card 
                  onClick={() => router.push('/create')}
                  className="border-0 hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0 w-72 overflow-hidden"
                  style={{
                    background: 'radial-gradient(circle, rgba(231,124,53,0.7) 0%, rgba(231,53,198,0.5) 50%, rgba(144,201,227,0.3) 100%)'
                  }}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                    <div className="text-center w-32 mb-4">
                      <h3 className="text-2xl font-semibold text-white leading-tight">Create a<br />Callsheet</h3>
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-full h-[40px] w-[40px]">
                      <Plus className="h-8 w-8 text-black" />
                    </div>
                  </CardContent>
                </Card>
                {/* Nike Trail Project Card */}
                <Card className="bg-black/40 border-0 flex-shrink-0 w-72 backdrop-blur-sm">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <span className="bg-black border border-white rounded-full px-3 py-1 text-xs font-medium text-white">
                        Nike Trail Call Sheet
                      </span>
                      <span className="bg-black border border-white rounded-full px-3 py-1 text-xs font-medium text-white whitespace-nowrap">
                        Nov 29th, 9am
                      </span>
                    </div>
                    <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/42d25a13621e03df8433f68ff6ddb460%201-VUYk7c2tbLphuO1VO4tcbQkbROzMXL.png"
                        alt="Project preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button variant="secondary" className="w-full bg-black border border-white text-white hover:bg-black/90 mt-auto">
                      View / Edit
                    </Button>
                  </CardContent>
                </Card>

                {/* Adidas Project Card */}
                <Card className="bg-black/40 border-0 flex-shrink-0 w-72 backdrop-blur-sm">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <span className="bg-black border border-white rounded-full px-3 py-1 text-xs font-medium text-white">
                        Adidas Outdoor Shoot
                      </span>
                      <span className="bg-black border border-white rounded-full px-3 py-1 text-xs font-medium text-white whitespace-nowrap">
                        Dec 5th, 10am
                      </span>
                    </div>
                    <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/42d25a13621e03df8433f68ff6ddb460%201-VUYk7c2tbLphuO1VO4tcbQkbROzMXL.png"
                        alt="Project preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button variant="secondary" className="w-full bg-black border border-white text-white hover:bg-black/90 mt-auto">
                      View / Edit
                    </Button>
                  </CardContent>
                </Card>

                {/* Puma Project Card */}
                <Card className="bg-black/40 border-0 flex-shrink-0 w-72 backdrop-blur-sm">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <span className="bg-black border border-white rounded-full px-3 py-1 text-xs font-medium text-white">
                        Puma Urban Collection
                      </span>
                      <span className="bg-black border border-white rounded-full px-3 py-1 text-xs font-medium text-white whitespace-nowrap">
                        Dec 12th, 2pm
                      </span>
                    </div>
                    <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/42d25a13621e03df8433f68ff6ddb460%201-VUYk7c2tbLphuO1VO4tcbQkbROzMXL.png"
                        alt="Project preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button variant="secondary" className="w-full bg-black border border-white text-white hover:bg-black/90 mt-auto">
                      View / Edit
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>

        {/* Archive Section */}
        <div className="mb-8 hidden" id="archive-section">
          <div className="relative">
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex space-x-4 p-4">
                {/* Pythia Project Card */}
                <Card className="bg-black/40 border-0 flex-shrink-0 w-72 backdrop-blur-sm">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <span className="bg-black border border-white rounded-full px-3 py-1 text-xs font-medium text-white">
                        Pythia Brand Shoot
                      </span>
                      <span className="bg-black border border-white rounded-full px-3 py-1 text-xs font-medium text-white whitespace-nowrap">
                        Oct 15th, 11am
                      </span>
                    </div>
                    <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/42d25a13621e03df8433f68ff6ddb460%201-VUYk7c2tbLphuO1VO4tcbQkbROzMXL.png"
                        alt="Project preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button variant="secondary" className="w-full bg-black border border-white text-white hover:bg-black/90 mt-auto">
                      View
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>

        {/* My Crew Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl text-white mb-4">My crew</h2>
          <div className="relative">
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex space-x-4 p-4">

                {/* Crew Member Card 1 */}
                <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/View%20recent%20photos-YK6bYRXVraCFa03xxEU4MMx15Y2eYp.jpeg"
                    alt="Crew member"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Crew Member Card 2 */}
                <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%203-mrdvJrnupnXr1mL2dhzDf1zij90OIk.png"
                    alt="Crew member"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-t border-white/10 p-4 md:hidden">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <Button variant="ghost" size="icon" className="text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Plus className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <div className="h-6 w-6 rounded-full bg-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

