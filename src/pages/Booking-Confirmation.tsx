import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ShieldCheck, Clock, Wrench } from "lucide-react";

import acInstallation from "../images/Screenshot 2026-02-12 224233.png";
import acServicing from "../images/Screenshot 2026-02-12 224512.png";
import acRepairing from "../images/Screenshot 2026-02-12 224521.png";
import acCopperPiping from "../images/copper.png";
import gasCharging from "../images/Gas.png";
import vrvVrf from "../images/vrv.png";
import Payment from "../images/Payment.png";

const TELEGRAM_BOT_TOKEN = "8341967588:AAHeP4p68tSdpwpLLCC4TIrODgRNPGXePnI";
const TELEGRAM_CHAT_ID = "8530119215";

type PriceTier = {
  label: string;
  price: number;
  originalPrice?: number;
};

type ServiceData = {
  id: number;
  name: string;
  image: string;
  priceTiers: PriceTier[];
  acTypes: string[];
  approximateTime: string;
  procedure: string[];
  inclusions: string[];
  exclusions: string[];
};

const SERVICE_DATA: Record<string, ServiceData> = {
  "1": {
    id: 1,
    name: "AC Installation",
    image: acInstallation,
    priceTiers: [
      { label: "Window AC", price: 499, originalPrice: 650 },
      { label: "Split AC", price: 699, originalPrice: 900 },
      { label: "Cassette AC", price: 998, originalPrice: 1200 },
      { label: "Tower AC", price: 799, originalPrice: 1000 },
    ],
    acTypes: ["Window AC", "Split AC", "Cassette AC", "Tower AC"],
    approximateTime: "4 Hours / Depend on site",
    procedure: [
      "Site inspection & bracket marking",
      "Wall drilling & bracket installation",
      "Indoor unit mounting & piping",
      "Outdoor unit placement & gas connection",
      "Electrical wiring & testing",
    ],
    inclusions: [
      "30-day warranty on labor",
      "Prices are for labor charges only",
      "Warranty on consumables as per manufacturer",
    ],
    exclusions: [
      "Material/pipe charges extra if required",
      "Dismantling of old unit not included",
    ],
  },
  "2": {
    id: 2,
    name: "AC Servicing",
    image: acServicing,
    priceTiers: [
      { label: "Window AC", price: 299, originalPrice: 399 },
      { label: "Split AC", price: 399, originalPrice: 499 },
      { label: "Cassette AC", price: 599, originalPrice: 799 },
      { label: "Tower AC", price: 499, originalPrice: 650 },
    ],
    acTypes: ["Window AC", "Split AC", "Cassette AC", "Tower AC"],
    approximateTime: "1–2 Hours",
    procedure: [
      "Filter cleaning & washing",
      "Coil cleaning with jet wash",
      "Drain pipe cleaning",
      "Blower & fan cleaning",
      "Performance check & cooling test",
    ],
    inclusions: [
      "30-day warranty on service",
      "Jet wash of indoor unit included",
      "Free performance check",
    ],
    exclusions: [
      "Gas refilling not included",
      "Parts replacement charged separately",
    ],
  },
  "3": {
    id: 3,
    name: "AC Repairing",
    image: acRepairing,
    priceTiers: [
      { label: "Window AC", price: 399, originalPrice: 550 },
      { label: "Split AC", price: 499, originalPrice: 700 },
      { label: "Cassette AC", price: 699, originalPrice: 900 },
      { label: "Tower AC", price: 599, originalPrice: 800 },
    ],
    acTypes: ["Window AC", "Split AC", "Cassette AC", "Tower AC"],
    approximateTime: "2–4 Hours / Depend on fault",
    procedure: [
      "Complete AC diagnostics & fault detection",
      "PCB / Thermostat inspection",
      "Compressor & motor check",
      "Wiring & connection testing",
      "Repair & post-repair cooling test",
    ],
    inclusions: [
      "90-day warranty on repaired parts",
      "Free diagnostics included",
      "Technician visit charges included",
    ],
    exclusions: [
      "Spare parts charged at actuals",
      "Compressor replacement quoted separately",
    ],
  },
  "4": {
    id: 4,
    name: "AC Copper Piping",
    image: acCopperPiping,
    priceTiers: [
      { label: "Up to 10 ft", price: 699, originalPrice: 900 },
      { label: "Up to 15 ft", price: 899, originalPrice: 1100 },
      { label: "Up to 20 ft", price: 1099, originalPrice: 1400 },
      { label: "Up to 30 ft", price: 1399, originalPrice: 1800 },
    ],
    acTypes: ["Up to 10 ft", "Up to 15 ft", "Up to 20 ft", "Up to 30 ft"],
    approximateTime: "2–3 Hours",
    procedure: [
      "Route planning & measurement",
      "ISI-mark copper pipe cutting & fitting",
      "Insulation wrapping",
      "Pressure testing for leaks",
      "Final connection & cooling check",
    ],
    inclusions: [
      "ISI-mark copper pipe used",
      "Insulation material included",
      "1-year warranty on piping work",
    ],
    exclusions: [
      "Concealed piping quoted separately",
      "Wall chasing charges extra if required",
    ],
  },
  "5": {
    id: 5,
    name: "Gas Charging",
    image: gasCharging,
    priceTiers: [
      { label: "Window AC (R22)", price: 799, originalPrice: 1000 },
      { label: "Split AC (R22)", price: 999, originalPrice: 1200 },
      { label: "Split AC (R32/410)", price: 1299, originalPrice: 1600 },
      { label: "Cassette AC", price: 1499, originalPrice: 1900 },
    ],
    acTypes: [
      "Window AC (R22)",
      "Split AC (R22)",
      "Split AC (R32/410)",
      "Cassette AC",
    ],
    approximateTime: "1–2 Hours",
    procedure: [
      "Refrigerant level inspection",
      "Leak detection with nitrogen pressure test",
      "Leak sealing if required",
      "High-quality gas refilling",
      "Cooling capacity & pressure final test",
    ],
    inclusions: [
      "Gas refill with high-quality refrigerant",
      "Leak detection included",
      "30-day warranty on gas refill",
    ],
    exclusions: [
      "Leak repair parts charged separately",
      "Copper pipe replacement extra",
    ],
  },
  "6": {
    id: 6,
    name: "VRV / VRF Maintenance",
    image: vrvVrf,
    priceTiers: [
      { label: "Up to 3 Indoor Units", price: 2499, originalPrice: 3200 },
      { label: "Up to 6 Indoor Units", price: 3999, originalPrice: 5000 },
      { label: "Up to 10 Indoor Units", price: 5999, originalPrice: 7500 },
      { label: "Custom (10+ Units)", price: 0, originalPrice: 0 },
    ],
    acTypes: [
      "Up to 3 Indoor Units",
      "Up to 6 Indoor Units",
      "Up to 10 Indoor Units",
      "Custom (10+ Units)",
    ],
    approximateTime: "4–8 Hours / Depend on site",
    procedure: [
      "Complete VRF / VRV installation, repair, and maintenance services.",
      "Site inspection and efficient system layout planning.",
      "Professional indoor and outdoor unit installation.",
      "Quick diagnosis and repair of refrigerant and electrical issues.",
      "Accurate gas checking, refilling, and leak testing.",
      "Regular cleaning and performance checks for long system life.",
    ],
    inclusions: [
      "All indoor units covered",
      "Free system performance report",
      "30-day warranty on service",
    ],
    exclusions: [
      "Gas charging charged separately",
      "PCB/parts replacement extra",
    ],
  },
};

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const serviceId = searchParams.get("serviceId") ?? "1";
  const data = SERVICE_DATA[serviceId] ?? SERVICE_DATA["1"];

  const [selectedType, setSelectedType] = useState<string>(data.acTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const currentTier =
    data.priceTiers.find((t) => t.label === selectedType) ?? data.priceTiers[0];
  const totalPrice = currentTier.price * quantity;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendToTelegram = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    const message =
      "🔧 New Booking Request\n\n" +
      `📋 Service: ${data.name}\n` +
      `🏷️ Type: ${selectedType}\n` +
      `🔢 Quantity: ${quantity}\n` +
      `💰 Total: ₹${totalPrice.toLocaleString()}\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📍 Address: ${formData.address}\n\n` +
      `⏰ Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
        },
      );
      if (!res.ok) throw new Error("failed");
      toast({
        title: "Booking Confirmed!",
        description: "We'll call you shortly.",
      });
      setIsPopupOpen(false);
      setFormData({ name: "", phone: "", address: "" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send. Call us at +91 7419011364",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-900 mt-10 md:mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* BREADCRUMB */}
        <p className="text-xs text-gray-400 mb-6">
          Home / Services /{" "}
          <span className="text-gray-700 font-medium">{data.name}</span>
        </p>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3] bg-gray-50">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {data.name}
            </h1>

            <div className="flex items-baseline gap-3">
              {currentTier.originalPrice && currentTier.originalPrice > 0 && (
                <span className="text-base line-through text-gray-400">
                  ₹{currentTier.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-black text-[#0416c7]">
                {currentTier.price === 0
                  ? "Get Quote"
                  : `₹${currentTier.price.toLocaleString()}`}
              </span>
              <span className="text-xs text-gray-400">
                per unit (labour only)
              </span>
            </div>

            <hr className="border-gray-100" />

            {/* AC Type */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 w-24 shrink-0">
                AC Type
              </span>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="flex-1 border-gray-200 rounded-xl h-10 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {data.acTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 w-24 shrink-0">
                Quantity
              </span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 text-lg font-bold text-gray-600 hover:bg-gray-100 transition"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 text-lg font-bold text-gray-600 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {currentTier.price > 0 && quantity > 1 && (
              <p className="text-sm text-gray-500">
                Total:{" "}
                <span className="font-bold text-gray-900">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </p>
            )}

            <button
              onClick={() => setIsPopupOpen(true)}
              className="w-full h-12 rounded-xl bg-[#0416c7] hover:bg-blue-900 text-white text-sm font-bold shadow-md transition mt-1"
            >
              Book Now
            </button>

            <div className="flex flex-col gap-1.5 mt-1">
              {[
                "Satisfaction Guaranteed",
                "No Hassle Refunds",
                "Secure Payments",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  {t}
                </div>
              ))}
            </div>

            <div className="border border-gray-100 rounded-xl p-3 mt-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Guaranteed Safe Checkout
              </p>
              <div className="flex gap-2 flex-wrap items-center">
                <img src={Payment} alt="All-Payment" />
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="border-t border-gray-100 pt-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-6">
            Description
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#0416c7]" />
                  <span className="text-sm font-bold text-gray-700">
                    Approximate Time
                  </span>
                </div>
                <p className="text-sm text-gray-500 pl-6">
                  {data.approximateTime}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-4 h-4 text-[#0416c7]" />
                  <span className="text-sm font-bold text-gray-700">
                    Procedure
                  </span>
                </div>
                <ol className="pl-6 flex flex-col gap-2">
                  {data.procedure.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#0416c7] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#0416c7]" />
                  <span className="text-sm font-bold text-gray-700">
                    Inclusions
                  </span>
                </div>
                <ul className="pl-2 flex flex-col gap-2">
                  {data.inclusions.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-700 block mb-3">
                  Exclusions
                </span>
                <ul className="pl-2 flex flex-col gap-2">
                  {data.exclusions.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-500"
                    >
                      <span className="w-4 h-4 rounded-full border-2 border-red-300 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 block" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Book — {data.name}
            </DialogTitle>
          </DialogHeader>

          <div className="bg-gray-50 rounded-xl p-3 text-sm flex flex-col gap-1 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Type</span>
              <span className="font-semibold text-gray-800">
                {selectedType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Quantity</span>
              <span className="font-semibold text-gray-800">{quantity}</span>
            </div>
            {currentTier.price > 0 && (
              <div className="flex justify-between border-t border-gray-200 pt-1 mt-1">
                <span className="text-gray-500 font-semibold">Total</span>
                <span className="font-black text-[#0416c7]">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <form onSubmit={sendToTelegram} className="flex flex-col gap-3 mt-1">
            <Input
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleInput}
              required
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleInput}
              required
            />
            <Input
              name="address"
              placeholder="Service Address *"
              value={formData.address}
              onChange={handleInput}
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0416c7] hover:bg-blue-800 text-white font-bold py-6 rounded-xl"
            >
              {isSubmitting ? "Sending..." : "Confirm Booking"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingConfirmation;
