"use client"

import React, { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from "@/lib/i18n/language-context"

type DonateModalProps = {
  trigger?: React.ReactNode
}

export function DonateModal({ trigger }: DonateModalProps) {
  const { t } = useLanguage()

  // State Management
  const [form, setForm] = useState({
    phone: "",
    amount: "",
    donationType: "one-time",
    donationPurpose: "general-fund",
    isSubmitting: false,
    isSubmitted: false,
    open: false,
  })

  // Handle Form Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle Donation Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setForm((prev) => ({ ...prev, isSubmitting: true }))
    setTimeout(() => {
      setForm((prev) => ({ ...prev, isSubmitting: false, isSubmitted: true }))
    }, 1500)
  }

  // Reset Form
  const resetForm = () => {
    setForm({
      phone: "",
      amount: "",
      donationType: "one-time",
      donationPurpose: "general-fund",
      isSubmitting: false,
      isSubmitted: false,
      open: false,
    })
  }

  // Close Modal & Reset Form
  const handleClose = () => {
    setForm((prev) => ({ ...prev, open: false }))
    setTimeout(resetForm, 300)
  }

  return (
    <Dialog open={form.open} onOpenChange={(open) => setForm((prev) => ({ ...prev, open }))}>
      <DialogTrigger asChild>
        {trigger || <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white">{t("donate")}</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-lg shadow-lg">
        {form.isSubmitted ? (
          // Thank You Message
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-[#D4AF37]" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[#002F6C] mb-2">{t("thankYou")}</DialogTitle>
            <DialogDescription className="text-gray-600 mb-6">{t("donationConfirmation")}</DialogDescription>

            <div className="p-3 bg-[#F5F5F5] rounded-md mb-4 text-[#002F6C]">
              <p className="font-medium">{t("donationSummary")}</p>
              <p className="text-gray-700">
                {form.donationType === "one-time" ? t("oneTime") : t("monthly")}: ${form.amount}
              </p>
              <p className="text-gray-700">{t("phone")}: {form.phone}</p>
              <p className="text-gray-700">{t("donationPurpose")}: {t(form.donationPurpose)}</p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" className="border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C] hover:text-white" onClick={handleClose}>
                {t("close")}
              </Button>
              <Button className="bg-[#D4AF37] hover:bg-[#C09C2C] text-white" onClick={resetForm}>
                {t("makeAnotherDonation")}
              </Button>
            </div>
          </div>
        ) : (
          // Donation Form
          <div className="p-6">
            <DialogTitle className="text-2xl font-bold text-[#002F6C] mb-4 text-center">{t("supportParish")}</DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Phone Number Input */}
              <div>
                <Label htmlFor="phone" className="text-lg font-bold text-[#002F6C]">{t("phoneNumber")}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("enterPhone")}
                  value={form.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {/* Amount Input */}
              <div>
                <Label htmlFor="amount" className="text-lg font-bold text-[#002F6C]">{t("amount")}</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder={t("enterAmount")}
                  value={form.amount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {/* Donation Purpose Dropdown */}
              <div>
                <Label className="text-lg font-bold text-[#002F6C]">{t("donationPurpose")}</Label>
                <Select value={form.donationPurpose} onValueChange={(value) => setForm((prev) => ({ ...prev, donationPurpose: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectPurpose")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general-fund">{t("generalFund")}</SelectItem>
                    <SelectItem value="building-maintenance">{t("buildingMaintenance")}</SelectItem>
                    <SelectItem value="community-outreach">{t("communityOutreach")}</SelectItem>
                    <SelectItem value="religious-education">{t("religiousEducation")}</SelectItem>
                    <SelectItem value="youth-ministry">{t("youthMinistry")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Donation Type Selection */}
              <div>
                <Label className="text-lg font-bold text-[#002F6C]">{t("donationType")}</Label>
                <RadioGroup
                  name="donationType"
                  value={form.donationType}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, donationType: value }))}
                  className="flex gap-4 mt-2"
                >
                  <RadioGroupItem value="one-time" id="one-time" />
                  <Label htmlFor="one-time">{t("oneTime")}</Label>
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">{t("monthly")}</Label>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#C09C2C] text-white" disabled={form.isSubmitting}>
                {form.isSubmitting ? t("processing") : t("donateNow")}
              </Button>

            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
