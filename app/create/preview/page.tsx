"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import jsPDF from "jspdf"
import { useCallsheet } from "../../contexts/CallsheetContext"
import { nanoid } from "nanoid"

const formatTime = (time: string): string => {
  if (!time) return ""
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minutes} ${ampm}`
}

export default function PreviewPage() {
  const router = useRouter()
  const { callsheetData } = useCallsheet()
  const pdfRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [uniqueId, setUniqueId] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    if (!callsheetData) {
      throw new Error("Callsheet data is not available")
    }
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 10

      // Load and add background image
      const addBackgroundImage = () => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.crossOrigin = "Anonymous" // This line is crucial for CORS policy
          img.onload = () => {
            const imgWidth = pageWidth
            const imgHeight = (img.height * imgWidth) / img.width
            pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight)
            resolve()
          }
          img.onerror = reject
          img.src =
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201-mzXNnSuRzg37P5bzlvwHcx6RJsPrOu.png"
        })
      }

      // Helper function to add a new page with background
      const addNewPage = async () => {
        pdf.addPage()
        await addBackgroundImage()
      }

      // Add background to the first page
      await addBackgroundImage()

      // Add semi-transparent black overlay
      pdf.setFillColor(0, 0, 0, 0.5)
      pdf.rect(0, 0, pageWidth, pageHeight, "F")

      // Add content
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.text("CALLSHEET®", margin, margin + 10)

      pdf.setFontSize(12)
      pdf.text(new Date().toLocaleDateString(), pageWidth - margin - 30, margin + 10)

      // Banner
      pdf.setFillColor(51, 84, 103)
      pdf.rect(margin, margin + 20, pageWidth - 2 * margin, 10, "F")
      pdf.setFontSize(10)
      pdf.setTextColor(255, 255, 255)
      pdf.text("CALLSHEET.WORLD CALLSHEET.WORLD CALLSHEET.WORLD CALLSHEET.WORLD", pageWidth / 2, margin + 26, {
        align: "center",
      })

      pdf.setFontSize(20)
      pdf.setTextColor(255, 255, 255)
      pdf.text(callsheetData.title || "Untitled Callsheet", margin, margin + 40)

      let yPosition = margin + 50

      // Production Details
      pdf.setFillColor(255, 255, 255, 0.1)
      pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 90, 3, 3, "F")

      pdf.setFontSize(16)
      pdf.setTextColor(255, 255, 255)
      pdf.text("PRODUCTION DETAILS", pageWidth / 2, yPosition + 10, { align: "center" })

      pdf.setFontSize(12)
      yPosition += 20
      pdf.text(`Overview: ${callsheetData.overview || "N/A"}`, margin + 5, yPosition)
      yPosition += 10
      pdf.text(`Location: ${callsheetData.location || "N/A"}`, margin + 5, yPosition)
      yPosition += 10
      pdf.text(`Additional Details: ${callsheetData.locationDetails || "N/A"}`, margin + 5, yPosition)
      yPosition += 10
      pdf.text(`Date: ${callsheetData.date || "N/A"}`, margin + 5, yPosition)
      yPosition += 10
      pdf.text(`Call Time: ${formatTime(callsheetData.callTime) || "N/A"}`, margin + 5, yPosition)
      yPosition += 10
      pdf.text(`Wrap Time: ${formatTime(callsheetData.wrapTime) || "N/A"}`, margin + 5, yPosition)
      yPosition += 10
      pdf.text(`Setting: ${callsheetData.indoorOutdoor || "N/A"}`, margin + 5, yPosition)

      yPosition += 30

      // Talent & Crew Information
      pdf.setFontSize(16)
      pdf.setTextColor(255, 255, 255)
      pdf.text("TALENT & CREW INFORMATION", pageWidth / 2, yPosition, { align: "center" })
      yPosition += 10

      for (let i = 0; i < callsheetData.talents.length; i++) {
        const talent = callsheetData.talents[i]
        if (yPosition > pageHeight - 100) {
          await addNewPage()
          yPosition = margin + 20
        }

        pdf.setFillColor(255, 255, 255, 0.1)
        pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 100, 3, 3, "F")

        pdf.setFontSize(14)
        pdf.setTextColor(255, 255, 255)
        pdf.text(getLabelAndNumber(talent.label, i), pageWidth / 2, yPosition + 10, { align: "center" })

        pdf.setFontSize(12)
        yPosition += 20
        const leftMargin = margin + 5
        const rightMargin = pageWidth / 2 + 5

        pdf.text(`Name: ${talent.name || "N/A"}`, leftMargin, yPosition)
        pdf.text(`Role: ${talent.role || "N/A"}`, rightMargin, yPosition)
        yPosition += 10
        pdf.text(`Address: ${talent.address || "N/A"}`, leftMargin, yPosition)
        pdf.text(`Phone: ${talent.phone || "N/A"}`, rightMargin, yPosition)
        yPosition += 10
        pdf.text(`Call Time: ${formatTime(talent.callTime) || "N/A"}`, leftMargin, yPosition)
        pdf.text(`Email: ${talent.email || "N/A"}`, rightMargin, yPosition)
        yPosition += 10
        pdf.text(`Wrap Time: ${formatTime(talent.callOut) || "N/A"}`, leftMargin, yPosition)
        yPosition += 20

        pdf.text("Notes:", leftMargin, yPosition)
        yPosition += 10
        const splitNotes = pdf.splitTextToSize(talent.notes || "N/A", pageWidth - 2 * margin - 10)
        pdf.text(splitNotes, leftMargin, yPosition)

        yPosition += 30
      }

      pdf.save("callsheet.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      let errorMessage = "There was an error generating the PDF. Please try again."
      if (error instanceof Error) {
        errorMessage += ` Error details: ${error.message}`
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const generateUniqueUrl = () => {
    if (!uniqueId) {
      const newId = nanoid(10)
      setUniqueId(newId)
      return `${window.location.origin}/view/${newId}`
    }
    return `${window.location.origin}/view/${uniqueId}`
  }

  const handleCopyLink = () => {
    const url = generateUniqueUrl()
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          title: "Link Copied!",
          description: "The unique URL has been copied to your clipboard.",
        })
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        toast({
          title: "Copy Failed",
          description: "There was an error copying the link. Please try again.",
          variant: "destructive",
        })
      })
  }

  // Function to get the correct label and number
  const getLabelAndNumber = (label: string | null, index: number) => {
    const labelCounts = {
      Talent: 0,
      Crew: 0,
    }

    for (let i = 0; i <= index; i++) {
      const currentLabel = callsheetData.talents[i].label
      if (currentLabel === "Talent" || currentLabel === "Crew") {
        labelCounts[currentLabel]++
      }
    }

    if (label === "Talent") {
      return `Talent ${labelCounts.Talent}`
    } else if (label === "Crew") {
      return `Crew ${labelCounts.Crew}`
    } else {
      return `Person ${index + 1}`
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] relative p-8">
      <div className="container mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <Button
            variant="ghost"
            className="text-[#ffffff] hover:text-[#ffffff]/80"
            onClick={() => router.push("/create/talent")}
          >
            Back to Edit
          </Button>
          <div className="flex space-x-4">
            <Button className="bg-[#335467] text-[#ffffff] hover:bg-[#335467]/90" onClick={handleCopyLink}>
              Copy Link
            </Button>
            <Button
              className="bg-[#335467] text-[#ffffff] hover:bg-[#335467]/90"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? "Generating PDF..." : "Download PDF"}
            </Button>
          </div>
        </div>

        <div ref={pdfRef} className="w-full aspect-[1/1.4142] relative rounded-xl overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201-mzXNnSuRzg37P5bzlvwHcx6RJsPrOu.png")',
              backgroundSize: "cover",
            }}
          ></div>
          <div className="absolute inset-0 bg-[#000000]/10 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 overflow-auto">
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#ffffff]/20">
                  <h1 className="text-3xl font-bold text-[#ffffff]">CALLSHEET®</h1>
                  <p className="text-[#a7d1e4]">{new Date().toLocaleDateString()}</p>
                </div>

                <div className="bg-gradient-to-r from-[#335467] to-[#a7d1e4] mb-6 rounded-full overflow-hidden">
                  <div className="px-4 py-2 text-[#ffffff] text-center text-xs tracking-wider whitespace-nowrap">
                    CALLSHEET.WORLD CALLSHEET.WORLD CALLSHEET.WORLD CALLSHEET.WORLD
                  </div>
                </div>

                <h2 className="text-4xl font-bold mb-6 text-[#ffffff]">{callsheetData.title}</h2>

                <Card className="bg-[#ffffff]/5 backdrop-blur-md border-0 rounded-xl mb-8">
                  <CardContent className="p-6">
                    <div className="bg-[#000000] border border-[#ffffff] rounded-full px-4 py-2 mb-4 text-center">
                      <div className="text-[#ffffff] font-semibold">PRODUCTION DETAILS</div>
                    </div>
                    <div className="space-y-2 text-[#ffffff]">
                      <p>
                        <span className="font-semibold">Overview:</span> {callsheetData.overview}
                      </p>
                      <p>
                        <span className="font-semibold">Location:</span> {callsheetData.location}
                      </p>
                      <p>
                        <span className="font-semibold">Additional Details:</span> {callsheetData.locationDetails}
                      </p>
                      <p>
                        <span className="font-semibold">Date:</span> {callsheetData.date}
                      </p>
                      <p>
                        <span className="font-semibold">Call Time:</span> {formatTime(callsheetData.callTime)}
                      </p>
                      <p>
                        <span className="font-semibold">Wrap Time:</span> {formatTime(callsheetData.wrapTime)}
                      </p>
                      <p>
                        <span className="font-semibold">Setting:</span> {callsheetData.indoorOutdoor}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#ffffff]/5 backdrop-blur-md border-0 rounded-xl">
                  <CardContent className="p-6">
                    <div className="bg-[#000000] border border-[#ffffff] rounded-full px-4 py-2 mb-4 text-center">
                      <div className="text-[#ffffff] font-semibold">TALENT & CREW INFORMATION</div>
                    </div>
                    {callsheetData.talents.map((talent, index) => (
                      <Card key={index} className="bg-[#ffffff]/5 backdrop-blur-sm border-0 rounded-xl mb-4 last:mb-0">
                        <CardContent className="p-4">
                          <div className="bg-[#000000] border border-[#ffffff] rounded-full px-3 py-1 mb-3 text-center">
                            <div className="text-[#ffffff] text-sm font-medium">
                              {getLabelAndNumber(talent.label, index)}
                            </div>
                          </div>
                          <div className="flex text-[#ffffff]">
                            <div className="w-1/2 pr-2 border-r border-[#ffffff]/20">
                              <p className="mb-2">
                                <span className="font-semibold">Name:</span> {talent.name}
                              </p>
                              <p className="mb-2">
                                <span className="font-semibold">Address:</span> {talent.address}
                              </p>
                              <p className="mb-2">
                                <span className="font-semibold">Call Time:</span> {formatTime(talent.callTime)}
                              </p>
                              <p className="mb-2">
                                <span className="font-semibold">Wrap Time:</span> {formatTime(talent.callOut)}
                              </p>
                            </div>
                            <div className="w-1/2 pl-2">
                              <p className="mb-2">
                                <span className="font-semibold">Role:</span> {talent.role}
                              </p>
                              <p className="mb-2">
                                <span className="font-semibold">Phone:</span> {talent.phone}
                              </p>
                              <p className="mb-2">
                                <span className="font-semibold">Email:</span> {talent.email}
                              </p>
                              <p className="mb-2">
                                <span className="font-semibold">Notes:</span>{" "}
                                <span className="whitespace-pre-wrap">{talent.notes}</span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

