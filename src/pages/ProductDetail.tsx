import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import { products } from "@/data/products";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ⚠️ NEW ICONS IMPORTED HERE
import {
  CalendarIcon,
  Send,
  Minus,
  Plus,
  Star,
  BadgeCheck,
  Tag,
  CreditCard,
  ShieldCheck,
  FileText,
  Truck,
  Package,
  Wrench,
  FileSignature,
} from "lucide-react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ProductDetail = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locationError, setLocationError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const selectedVariant = searchParams.get("variant");
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = products[id as keyof typeof products];

  const [selectedMonth, setSelectedMonth] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [pricePerMonth, setPricePerMonth] = useState(0);

  // Get security deposit based on variant
  const getSecurityDeposit = () => {
    if (!product || !selectedVariant) return "";
    if (typeof product.description.securityDeposit === "string") {
      return product.description.securityDeposit;
    }
    return (
      product.description.securityDeposit[
        selectedVariant as keyof typeof product.description.securityDeposit
      ] || ""
    );
  };

  // Calculate minimum price
  const getMinimumPrice = () => {
    if (!product) return 0;
    const variant = selectedVariant
      ? product.variants[selectedVariant]
      : Object.values(product.variants)[0];

    const prices = Object.entries(variant)
      .filter(([key]) => key !== "image" && key !== "Per")
      .map(([_, price]) => Number(price));

    return Math.min(...prices);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div>Product not found</div>;

  const variantImage = selectedVariant
    ? product.variants[selectedVariant]?.image
    : product.image;

  const similarProducts = Object.entries(products)
    .filter(([productId]) => productId !== id)
    .slice(0, 3);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    const price = selectedVariant
      ? product.variants[selectedVariant][month]
      : Object.values(product.variants)[0][month];
    setPricePerMonth(price);
    setTotalPrice(price * quantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);
    setQuantity(validQuantity);
    if (selectedMonth) {
      const price = selectedVariant
        ? product.variants[selectedVariant][selectedMonth]
        : Object.values(product.variants)[0][selectedMonth];
      setPricePerMonth(price);
      setTotalPrice(price * validQuantity);
    }
  };

  const getDurationOptions = () => {
    const variant = selectedVariant
      ? product.variants[selectedVariant]
      : Object.values(product.variants)[0];

    return Object.keys(variant)
      .filter((key) => key !== "image" && key !== "Per")
      .map((month) => ({
        value: month,
        label: isNaN(Number(month)) ? month : `${month} months`,
      }));
  };

  const isGeyser = id === "geyser";

  const handleImageHover = (isHovered: boolean) => {
    setIsImageZoomed(isHovered);
  };

  const getLocation = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setLocation(coords);
            resolve(coords);
          },
          (error) => {
            const errorMessage = `Unable to retrieve your location: ${error.message}`;
            setLocationError(errorMessage);
            reject(errorMessage);
          },
        );
      }
    });
  };

  // ==========================================
  // TELEGRAM SUBMISSION LOGIC
  // ==========================================
  const handleTelegramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedMonth ||
      !deliveryDate ||
      !formData.name ||
      !formData.phone ||
      !formData.address
    ) {
      toast({
        title: "Missing Details",
        description: "Please fill in all required fields before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const telegramBotToken = "8341967588:AAHeP4p68tSdpwpLLCC4TIrODgRNPGXePnI";
    const telegramChatId = "8530119215";

    let locationText = "Location not provided";
    try {
      const coords = await getLocation();
      locationText = `[View on Google Maps](https://www.google.com/maps?q=${coords.lat},${coords.lng})`;
    } catch (error) {
      locationText = `Failed to get location: ${error}`;
    }

    const message = `
🚨 *New Order Request* 🚨

*Product:* ${product.name}
*Selected Variant:* ${selectedVariant || "Default"}
*Duration:* ${selectedMonth} months
*Quantity:* ${quantity}
*Total Price:* ₹${totalPrice}
*Security Deposit:* ${getSecurityDeposit()}
*Delivery Date:* ${format(deliveryDate, "PPP")}

👤 *Customer Details:*
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Address:* ${formData.address}
*Location:* ${locationText}
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
            parse_mode: "Markdown",
          }),
        },
      );

      if (response.ok) {
        toast({
          title: "Order Sent Successfully!",
          description: "Our team will contact you shortly.",
        });
        setIsPopupOpen(false);
        setFormData({ name: "", phone: "", address: "" });
      } else {
        throw new Error("Failed to send message to Telegram");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "There was an error sending your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased">
      <main className="flex-grow container mx-auto px-4 py-8 mt-16 max-w-7xl">
        <Card className="overflow-hidden shadow-lg bg-white border border-gray-100 rounded-2xl">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left Column - Product Image */}
              <div className="relative overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-8 border border-gray-100">
                <div
                  className={cn(
                    "transition-transform duration-500 ease-out",
                    isImageZoomed ? "scale-110" : "scale-100",
                  )}
                  onMouseEnter={() => handleImageHover(true)}
                  onMouseLeave={() => handleImageHover(false)}
                >
                  <img
                    src={variantImage}
                    alt={product.name}
                    className="w-full max-h-[400px] object-contain mix-blend-multiply"
                  />
                </div>
              </div>

              {/* Right Column - Product Details and Form */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold mb-2 text-gray-900 tracking-tight">
                    {product.name}
                  </h1>
                  {selectedVariant && (
                    <p className="text-sm font-semibold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full mb-3">
                      Variant: {selectedVariant}
                    </p>
                  )}
                  {!selectedMonth && !isGeyser && (
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      Starting from ₹{getMinimumPrice()}
                      <span className="text-sm text-gray-500 font-medium ml-2">
                        / month
                      </span>
                    </p>
                  )}
                </div>

                {!isGeyser ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold text-gray-700">
                          Duration
                        </label>
                        <Select
                          value={selectedMonth}
                          onValueChange={handleMonthChange}
                        >
                          <SelectTrigger className="w-full bg-white h-12 border-gray-200 focus:ring-blue-600 rounded-lg shadow-sm">
                            <SelectValue placeholder="Select Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {getDurationOptions().map(({ value, label }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold text-gray-700">
                          Quantity
                        </label>
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-12 shadow-sm">
                          <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="w-12 h-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 border-r border-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="flex-1 h-full flex items-center justify-center font-bold text-gray-900 bg-white">
                            {quantity}
                          </div>
                          <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="w-12 h-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 border-l border-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Delivery Date
                      </label>

                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full h-12 justify-start text-left font-normal bg-white border-gray-200 shadow-sm rounded-lg ${
                              !deliveryDate ? "text-gray-400" : "text-gray-900"
                            }`}
                          >
                            <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />

                            {deliveryDate
                              ? format(deliveryDate, "PPP")
                              : "Select your preferred delivery date"}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={deliveryDate}
                            onSelect={(date) => {
                              setDeliveryDate(date);
                              setOpen(false);
                            }}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);

                              return date < today;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {pricePerMonth > 0 && (
                      <div className="bg-blue-50/50 p-5 rounded-xl space-y-3 border border-blue-100">
                        <div className="flex justify-between items-center">
                          <p className="text-gray-600 font-medium">
                            Total Price:
                          </p>
                          <p className="text-2xl font-extrabold text-[#0416c7]">
                            ₹{totalPrice}
                          </p>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-blue-100/50">
                          <p className="text-gray-600 font-medium">
                            Security Deposit:
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            {getSecurityDeposit()}{" "}
                            <span className="text-xs font-normal text-gray-500 ml-1">
                              (refundable)
                            </span>
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                      <Button
                        onClick={() => {
                          if (!selectedMonth || !deliveryDate) {
                            toast({
                              title: "Missing Selections",
                              description:
                                "Please select a duration and delivery date to continue.",
                              variant: "destructive",
                            });
                            return;
                          }
                          setIsPopupOpen(true);
                        }}
                        className="w-full h-14 text-lg font-bold bg-gray-900 hover:bg-black text-white rounded-xl shadow-md transition-all"
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      Maintenance Service
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      This product is available for maintenance service only.
                      Please contact us directly to schedule a maintenance
                      visit.
                    </p>
                    <Button
                      onClick={() => {
                        const message =
                          "Hi, I would like to request maintenance service for a geyser.";
                        window.open(
                          `https://wa.me/917050068050?text=${encodeURIComponent(message)}`,
                          "_blank",
                        );
                      }}
                      className="w-full h-14 text-lg font-bold bg-[#0416c7] hover:bg-blue-800 text-white rounded-xl shadow-md"
                    >
                      Request Maintenance
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* ================= UPGRADED ACCORDIONS SECTION ================= */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <Accordion
                type="multiple"
                defaultValue={[
                  "description",
                  "payment",
                  "documentation",
                  "delivery",
                  "maintenance",
                  "terms",
                ]}
                className="w-full space-y-4"
              >
                {/* Description of Smart Eager */}
                <AccordionItem value="description" className="border-b-0">
                  <AccordionTrigger className="text-lg font-bold text-gray-900 hover:text-[#0416c7] transition-colors pb-4 border-b border-gray-200">
                    Description of Smart Eager
                  </AccordionTrigger>
                  <AccordionContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                      <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
                        <div className="bg-yellow-50 text-yellow-500 p-3 rounded-xl mb-3">
                          <Star className="w-6 h-6 fill-current" />
                        </div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Star Rating
                        </h3>
                        <p className="text-sm font-bold text-gray-900">
                          {product.description.starRating}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
                        <div className="bg-green-50 text-green-600 p-3 rounded-xl mb-3">
                          <BadgeCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Condition
                        </h3>
                        <p className="text-sm font-bold text-gray-900">
                          {product.description.condition}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
                        <div className="bg-[#0416c7]/5 text-[#0416c7] p-3 rounded-xl mb-3">
                          <Tag className="w-6 h-6" />
                        </div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Brand
                        </h3>
                        <p className="text-sm font-bold text-gray-900">
                          {product.description.brand}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Payment Policy */}
                <AccordionItem value="payment" className="border-b-0">
                  <AccordionTrigger className="text-lg font-bold text-gray-900 hover:text-[#0416c7] transition-colors pb-4 border-b border-gray-200">
                    Payment Policy
                  </AccordionTrigger>
                  <AccordionContent className="pt-6">
                    <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 space-y-6">
                      <div className="flex gap-4">
                        <CreditCard className="w-6 h-6 text-[#0416c7] shrink-0" />
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Payment & Mode
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {product.description.payment}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed mt-2 font-medium">
                            Accepted: {product.description.paymentMode}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 pt-6 border-t border-gray-200">
                        <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Security Deposit
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {getSecurityDeposit()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Documentation Required */}
                <AccordionItem value="documentation" className="border-b-0">
                  <AccordionTrigger className="text-lg font-bold text-gray-900 hover:text-[#0416c7] transition-colors pb-4 border-b border-gray-200">
                    Documentation Required
                  </AccordionTrigger>
                  <AccordionContent className="pt-6">
                    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex gap-4">
                      <FileText className="w-6 h-6 text-[#0416c7] shrink-0" />
                      <ul className="space-y-3 text-sm text-gray-600 font-medium">
                        {product.description.documentation.map((doc, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Delivery & Pickup */}
                <AccordionItem value="delivery" className="border-b-0">
                  <AccordionTrigger className="text-lg font-bold text-gray-900 hover:text-[#0416c7] transition-colors pb-4 border-b border-gray-200">
                    Delivery & Pickup Policy
                  </AccordionTrigger>
                  <AccordionContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col gap-3">
                        <Truck className="w-6 h-6 text-blue-600" />
                        <h3 className="font-bold text-gray-900">Delivery</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {product.description.delivery}
                        </p>
                      </div>
                      <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 flex flex-col gap-3">
                        <Package className="w-6 h-6 text-orange-600" />
                        <h3 className="font-bold text-gray-900">Pick-Up</h3>
                        <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
                          {product.description.pickup.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-orange-400 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Maintenance Policy */}
                <AccordionItem value="maintenance" className="border-b-0">
                  <AccordionTrigger className="text-lg font-bold text-gray-900 hover:text-[#0416c7] transition-colors pb-4 border-b border-gray-200">
                    Maintenance Policy
                  </AccordionTrigger>
                  <AccordionContent className="pt-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex gap-4 items-start">
                      <Wrench className="w-6 h-6 text-gray-700 shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {product.description.maintenance}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* General Terms */}
                <AccordionItem value="terms" className="border-b-0">
                  <AccordionTrigger className="text-lg font-bold text-gray-900 hover:text-[#0416c7] transition-colors pb-4 border-b border-gray-200">
                    General Terms
                  </AccordionTrigger>
                  <AccordionContent className="pt-6">
                    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex gap-4">
                      <FileSignature className="w-6 h-6 text-gray-900 shrink-0" />
                      <ul className="space-y-3 text-sm text-gray-600">
                        {product.description.terms.map((term, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>

        {/* SIMILAR PRODUCTS */}
        {/* <div className="mt-16 mb-10">
          <h2 className="text-2xl font-extrabold mb-8 text-gray-900 tracking-tight">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map(([productId, similarProduct]) => (
              <Link key={productId} to={`/product/${productId}/variants`}>
                <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white border border-gray-100 rounded-2xl overflow-hidden group">
                  <CardContent className="p-5">
                    <div className="w-full h-48 bg-gray-50 rounded-xl mb-5 flex items-center justify-center p-4">
                      <img
                        src={similarProduct.image}
                        alt={similarProduct.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 text-center">
                      {similarProduct.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div> */}
      </main>

      {/* ================= CHECKOUT POPUP (MODAL) ================= */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Complete Order
            </DialogTitle>
          </DialogHeader>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 my-4">
            <p className="text-sm text-gray-600 font-medium">Checkout Total:</p>
            <p className="text-2xl font-bold text-[#0416c7]">₹{totalPrice}</p>
            <p className="text-xs text-gray-500 mt-1">
              For {quantity} unit(s) · {selectedMonth} months
            </p>
          </div>

          <form onSubmit={handleTelegramSubmit} className="space-y-4">
            <Input
              placeholder="Your Full Name"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-12 rounded-lg border-gray-300 focus:ring-[#0416c7]"
            />
            <Input
              placeholder="Phone Number"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="h-12 rounded-lg border-gray-300 focus:ring-[#0416c7]"
            />
            <Input
              placeholder="Complete Delivery Address"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="h-12 rounded-lg border-gray-300 focus:ring-[#0416c7]"
            />

            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-700 mb-1">
                📍 Location Access
              </p>
              <p>
                We'll request your location upon submission to ensure accurate
                and faster delivery service.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-bold bg-[#0416c7] hover:bg-blue-800 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                "Sending Request..."
              ) : (
                <>
                  <Send className="w-5 h-5" /> Confirm & Send Request
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
