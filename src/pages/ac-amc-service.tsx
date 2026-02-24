import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import windowImg from "../images/Screenshot 2026-02-12 224233.png";
import splitImg from "../images/AC-Repair-Slide1.jpg";
import vrvImg from "../images/Screenshot 2026-02-12 224521.png";

export const AcAmcService = () => {
  // ================= STATE MANAGEMENT =================
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Open popup and set the plan the user clicked
  const openPopup = (plan: string) => {
    setSelectedPlan(plan);
    setIsPopupOpen(true);
  };

  // ================= TELEGRAM LOGIC =================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const TELEGRAM_BOT_TOKEN = "8341967588:AAHeP4p68tSdpwpLLCC4TIrODgRNPGXePnI";
    const TELEGRAM_CHAT_ID = "8530119215";

    if (!selectedPlan) {
      alert("Please select an AMC plan");
      setIsSubmitting(false);
      return;
    }

    const message =
      "🚨 New AMC Request 🚨\n\n" +
      `Plan: ${selectedPlan}\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}\n` +
      `Time: ${new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Telegram API Error:", errorText);
        throw new Error("Telegram API failed");
      }

      alert("Request sent successfully! We'll contact you soon.");
      setIsPopupOpen(false);
      setFormData({ name: "", phone: "", address: "" });
    } catch (error) {
      console.error("Error sending to Telegram:", error);
      alert("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-16 max-w-7xl font-sans antialiased">
      {/* ================= HEADING ================= */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">
          Annual Maintenance Contract (AMC)
        </h1>
        <p className="text-lg text-gray-600">
          Trusted AMC Service for Top AC Brands in Gurugram
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Smart Eager Aircon is committed to providing the most affordable
          services.
        </p>
      </div>

      {/* ================= PRICING SECTION ================= */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="border-2 border-blue-200 p-6 rounded-xl shadow-lg bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-5 text-blue-600">
            Window AC AMC
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  Basic (1 Year)
                </span>
                <span className="text-2xl font-bold text-blue-600">₹2,498</span>
              </div>
              <button
                onClick={() =>
                  openPopup("Window AC AMC Basic (1 Year) - ₹2,498")
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Book Now
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  Advanced (1 Year)
                </span>
                <span className="text-2xl font-bold text-gray-900">₹3,298</span>
              </div>
              <button
                onClick={() =>
                  openPopup("Window AC AMC Advanced (1 Year) - ₹3,298")
                }
                className="w-full bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Book Now
              </button>
            </div>
          </div>
        </div>

        <div className="border-2 border-blue-200 p-6 rounded-xl shadow-lg bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-5 text-blue-600">
            Split AC AMC
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  Basic (1 Year)
                </span>
                <span className="text-2xl font-bold text-blue-600">₹2,999</span>
              </div>
              <button
                onClick={() =>
                  openPopup("Split AC AMC Basic (1 Year) - ₹2,999")
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Book Now
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  Advanced (1 Year)
                </span>
                <span className="text-2xl font-bold text-gray-900">₹3,999</span>
              </div>
              <button
                onClick={() =>
                  openPopup("Split AC AMC Advanced (1 Year) - ₹3,999")
                }
                className="w-full bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FEATURE TABLE ================= */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">AMC Feature Comparison</h2>

        <div className="overflow-auto">
          <table className="w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="border border-blue-500 p-3 text-left">
                  Name Of The Feature
                </th>
                <th className="border border-blue-500 p-3 text-center">
                  Comprehensive AMC
                </th>
                <th className="border border-blue-500 p-3 text-center">
                  Non-Comprehensive AMC
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {[
                {
                  feature: "Scheduled Maintenance",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Labour Charges",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Emergency Repairs",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Gas Refilling",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Fixed AMC Annual Price",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Surprise Costs",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "2 maintenance services using power jet",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Up to 2 free gas charging, if required",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Unlimited breakdown support for any issue with AC",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Free transportation for repairs, if required",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Service charge coverage for a year",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature: "Only for ACs less than years",
                  comp: "5 Years old",
                  nonComp: "10 Years old",
                },
                {
                  feature:
                    "Free replacement of faulty parts (compressor, capacitor, PCB, fan motor, etc.)",
                  comp: "Yes",
                  nonComp: "No",
                },
                {
                  feature: "Drain pipe cleaning to prevent blockages or leaks",
                  comp: "Yes",
                  nonComp: "Yes",
                },
                {
                  feature:
                    "Installation & uninstallation and Physical Damage not covered",
                  comp: "No",
                  nonComp: "No",
                },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border border-gray-300 p-3 text-gray-700">
                    {row.feature}
                  </td>

                  <td className="border border-gray-300 p-3 text-center">
                    {row.comp === "Yes" ? (
                      <span className="text-green-600 font-semibold">
                        ✓ Yes
                      </span>
                    ) : row.comp === "No" ? (
                      <span className="text-red-600 font-semibold">✕ No</span>
                    ) : (
                      <span className="font-semibold">{row.comp}</span>
                    )}
                  </td>

                  <td className="border border-gray-300 p-3 text-center">
                    {row.nonComp === "Yes" ? (
                      <span className="text-green-600 font-semibold">
                        ✓ Yes
                      </span>
                    ) : row.nonComp === "No" ? (
                      <span className="text-red-600 font-semibold">✕ No</span>
                    ) : (
                      <span className="font-semibold">{row.nonComp}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SERVICE CARDS WITH IMAGES ================= */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Wide Range of AMC Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Window */}
          <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow flex flex-col h-full bg-white">
            <img
              src={windowImg}
              alt="Window AMC"
              className="w-full h-52 object-cover"
            />
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  Window AC AMC
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  High efficiency residential and commercial AC maintenance
                  services.
                </p>
              </div>
              <button
                onClick={() => openPopup("Window AC AMC Service")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-auto"
              >
                <Send className="w-4 h-4" /> Book Now
              </button>
            </div>
          </div>

          {/* Split */}
          <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow flex flex-col h-full bg-white">
            <img
              src={splitImg}
              alt="Split AMC"
              className="w-full h-52 object-cover"
            />
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  Split AC AMC
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete dry and jet wash services for long life and fresh
                  cooling.
                </p>
              </div>
              <button
                onClick={() => openPopup("Split AC AMC Service")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-auto"
              >
                <Send className="w-4 h-4" /> Book Now
              </button>
            </div>
          </div>

          {/* VRV */}
          <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow flex flex-col h-full bg-white">
            <img
              src={vrvImg}
              alt="VRV AMC"
              className="w-full h-52 object-cover"
            />
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  VRV / VRF AC AMC
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Professional diagnosis and repair of VRV / VRF systems.
                </p>
              </div>
              <button
                onClick={() => openPopup("VRV / VRF AMC Service")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-auto"
              >
                <Send className="w-4 h-4" /> Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= VRF / VRV SERVICE ================= */}
      {/* <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl mb-10 border border-red-200">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          VRF / VRV Service
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="mb-3 font-semibold text-gray-800">
              Installation Services:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Site inspections to design ideal layout</li>
              <li>Efficient installation of outdoor and indoor units</li>
              <li>Proper refrigerant piping and electrical connections</li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-semibold text-gray-800">Repair Services:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Diagnosing and fixing refrigerant flow issues</li>
              <li>Resolving electrical malfunctions</li>
              <li>Replacing damaged components</li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-semibold text-gray-800">Gas Refilling:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Accurate refrigerant level checks</li>
              <li>Refill gas as per system specifications</li>
              <li>Ensure no leaks in refrigerant piping</li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-semibold text-gray-800">
              Maintenance Services:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Cleaning filters, ducts, and coils</li>
              <li>Inspecting electrical and mechanical components</li>
              <li>Regular system performance checks</li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* ================= TERMS & CONDITIONS ================= */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          AMC Terms and Conditions
        </h2>

        <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Contract Validity:</strong> Valid for 1 year from Purchase
            Order date.
          </li>
          <li>
            <strong>Quotation Validity:</strong> Valid for 30 days; auto-cancels
            if not accepted.
          </li>
          <li>
            <strong>Summer Maintenance:</strong> Additional service may be
            provided during summer months.
          </li>
          <li>
            <strong>Payment Terms:</strong> 100% advance payment within 30 days
            of invoice.
          </li>
          <li>
            <strong>Service Hours:</strong> Service available till 9:00 PM as
            per urgency.
          </li>
          <li>
            <strong>Repair and Replacement:</strong> Attempt repair first;
            replace if needed.
          </li>
          <li>
            <strong>Fault Removal:</strong> All faults removed during servicing.
          </li>
          <li>
            <strong>Breakdown Response:</strong> Within 24 working hours.
          </li>
          <li>
            <strong>Damaged Parts:</strong> Replaced parts become Smart Eager
            property.
          </li>
          <li>
            <strong>Transportation Damage:</strong> Not covered under contract.
          </li>
          <li>
            <strong>Contract Transfer:</strong> Non-transferable upon resale.
          </li>
          <li>
            <strong>Cancellation:</strong> No refund before contract completion.
          </li>
          <li>
            <strong>Emergency Response:</strong> Prioritized but no liability
            for losses.
          </li>
          <li>
            <strong>Exclusions:</strong> Improper use, unauthorized alterations
            not covered.
          </li>
        </ol>
      </div>

      {/* ================= POPUP FORM ================= */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Complete Your Request
            </DialogTitle>
          </DialogHeader>

          <div className="bg-blue-50 text-blue-800 text-sm font-medium p-3 rounded-lg border border-blue-100 mb-2">
            Selected: {selectedPlan}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="rounded-lg border-gray-300 focus:ring-blue-600"
            />
            <Input
              placeholder="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="rounded-lg border-gray-300 focus:ring-blue-600"
            />
            <Input
              placeholder="Full Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
              className="rounded-lg border-gray-300 focus:ring-blue-600"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-6 shadow-md transition-all mt-4"
            >
              {isSubmitting ? "Sending..." : "Confirm & Send Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
