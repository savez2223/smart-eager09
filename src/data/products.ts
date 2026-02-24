import Window from "../images/WAC1.jpg";
import WindowM from "../images/WAMain1M.png";
import Window2 from "../images/WAC1.5.jpg";
import Window3 from "../images/WAC2.png";
import ORH from "../images/ORH56.png";
import ORHM from "../images/ORHMain1M.png";
import ORH2 from "../images/ORH2.png";
import ORH3 from "../images/ORH3.png";
import Ref from "../images/REF1.jpg";
import RefM from "../images/REFMain1M.png";
import Ref2 from "../images/REF2.jpg";
import SAC from "../images/SAC1.jpg";
import SACM from "../images/SAmain1M.png";
import SAC2 from "../images/SAC1.5.jpg";
import SAC3 from "../images/SAC2.png";
import Geyser from "../images/GEY1.png";
import GeyserM from "../images/GEYMain1M.png.jpg";
import WM from "../images/WM1.jpg";
import WMM from "../images/WMmain1M.png";
import WM2 from "../images/WM2.jpg";

export const products = {
  "window-ac": {
    name: "Window AC On Rent",
    image: WindowM,
    variants: {
      "1.0 TON": {
        image: Window,
        "4": 6599,
        "6": 6899,
        "full season": 7500,
      },
      "1.5 TON": {
        image: Window2,
        "4": 7599,
        "6": 7799,
        "full season": 8400,
      },
      "2.0 TON": {
        image: Window3,
        "4": 7599,
        "6": 7999,
        "full season": 8799,
      },
    },

    description: {
      starRating: "3, 4 & 5 Star as per stock availability",
      condition:
        "Its used but looks like new condition, it will be in Excellent working condition",
      brand:
        "All Window ACs will be branded as per market. Brand and Color may vary as per stock availability",
      payment:
        "The Rent, Security deposit amount and other charges has to be paid in full at the time of installation/delivery of products",
      paymentMode:
        "Accepted as Online Google Pay, Phonepe, UPI, Net banking and Cash etc",
      securityDeposit:
        "Security deposit Rs. 1,999/-(refundable) will be extra and it will be returned back at the time of pickup",
      documentation: [
        "Aadhar card submission must for everyone",
        "Govt ID card, Bank statement, Company name, GST number, DL Selfie etc (Any two Id need)",
      ],
      delivery:
        "Customer or their representative must be present at the agreed date and time for getting Items checked in good condition",
      pickup: [
        "Customer must inform us minimum 3 Days prior to pick-up",
        "Pick-up date and time will be mutually decided",
        "Customer must be present during the handover/return",
      ],
      maintenance:
        "Repair and Maintenance of Window AC will be on Smart Eager with free of Cost during the entire season/rented time",
      terms: [
        "It is not allowed to shift the AC to another location",
        "Customer cannot transfer Smart Eager Items to another person",
        "Electric sub meter charge Rs. 1,000/-, if required",
        "Extra Copper piping charge Rs. 300/- per feet if needed extra as per guide",
        "Electric power Requirement: AC 240V, with pre installed power plug of 16 Amp is must near AC installation location",
        "Stabilizer rental will be extra Rs.1,000/-, If required",
        "All the Electricity part and electrical fitting as well as wooden/other work would be done at Customer's end only",
      ],
    },
  },
  "split-ac": {
    name: "Split AC On Rent",
    image: SACM,
    variants: {
      "1.0 TON": {
        image: SAC,
        "4": 9999,
        "6": 10999,
        "full season": 11499,
      },
      "1.5 TON": {
        image: SAC2,
        "4": 11499,
        "6": 11999,
        "full season": 12499,
      },
      "2.0 TON": {
        image: SAC3,
        "4": 12499,
        "6": 12999,
        "full season": 13499,
      },
    },

    description: {
      starRating: "3, 4 & 5 Star as per stock availability",
      condition:
        "Its used but looks like new condition, it will be in Excellent working condition with both indoor and outdoor units",
      brand:
        "All Split ACs will be branded as per market. Brand and Color may vary as per stock availability",
      payment:
        "The Rent, Security deposit amount and other charges has to be paid in full at the time of installation/delivery of products",
      paymentMode:
        "Accepted as Online Google Pay, Phonepe, UPI, Net banking and Cash etc",
      securityDeposit:
        "Security deposit Rs. 1,999/-(refundable) will be extra and it will be returned back at the time of pickup",
      documentation: [
        "Aadhar card submission must for everyone",
        "Govt ID card, Bank statement, Company name, GST number, DL Selfie etc (Any two Id need)",
      ],
      delivery:
        "Customer or their representative must be present at the agreed date and time for getting Items checked in good condition",
      pickup: [
        "Customer must inform us minimum 3 Days prior to pick-up",
        "Pick-up date and time will be mutually decided",
        "Customer must be present during the handover/return",
      ],
      maintenance:
        "Repair and Maintenance of Split AC will be on Smart Eager with free of Cost during the entire season/rented time",
      terms: [
        "It is not allowed to shift the AC to another location",
        "Customer cannot transfer Smart Eager Items to another person",
        "Electric sub meter charge Rs. 1,000/-, if required",
        "Copper piping up to 3 meters included, extra length charged at Rs. 300/- per feet",
        "Electric power Requirement: AC 240V, with pre installed power plug of 16 Amp is must near AC installation location",
        "Stabilizer rental will be extra Rs.1,000/-, If required",
        "All the Electricity part and electrical fitting as well as wooden/other work would be done at Customer's end only",
      ],
    },
  },

  "room-heater": {
    name: "Room Heater On Rent",
    image: ORHM,
    variants: {
      "9Fin": {
        image: ORH,
        "2": 1998,
        "Full Season (Till 31 March)": 2199,
      },
      "11Fin": {
        image: ORH2,
        "2": 2398,
        "Full Season (Till 31 March)": 2699,
      },
      "13Fin": {
        image: ORH3,
        "2": 2598,
        "Full Season (Till 31 March)": 2800,
      },
    },
    description: {
      starRating: "ISI marked quality heaters",
      condition:
        "Oil Room heater, also known as an Oil-filled radiator(OFR) & Tower Heater. Constructed as thin fins, available in 9FINs, 11FINs, 13FINs configurations.",
      brand:
        "All heaters will be branded as per market. Brand and Color may vary as per stock availability",
      features: [
        "Negligible sound production for peaceful sleep",
        "Retains heat for long after turning off due to heating oil",
        "Energy efficient, saving electricity with prolonged heat retention",
        "Effective heating for larger rooms",
        "Maintains ideal temperature throughout the room",
        "Best placed in a central spot for natural heat circulation",
        "More effective in rooms with doors than open spaces",
      ],
      payment: "One time advance payment applicable",
      paymentMode:
        "Accepted as Online Google Pay, Phonepe, UPI, Net banking and Cash etc",
      securityDeposit: {
        "9Fin": "Security deposit Rs. 1,999 /-(refundable) will be extra",
        "11Fin": "Security deposit Rs. 1,999/-(refundable) will be extra",
        "13Fin": "Security deposit Rs. 1,999/-(refundable) will be extra",
      },
      documentation: [
        "Aadhar card submission must for everyone",
        "Govt ID card, Bank statement, Company name, GST number, DL Selfie etc (Any two Id need)",
      ],
      delivery:
        "Customer must be present during delivery for product inspection and condition verification",
      pickup: [
        "Customer must inform us minimum 3 Days prior to pick-up",
        "Pick-up date and time will be mutually decided",
        "Customer must be present during the handover/return",
      ],
      maintenance:
        "Repair and Maintenance of heater will be on Smart Eager with free of Cost during the entire season/rented time",
      terms: [
        "It is not allowed to shift the heater to another location",
        "Customer cannot transfer Smart Eager Items to another person",
        "Any damages incurred due to accidents are not acceptable",
        "Heaters are only for rent, not for sale",
        "Electric power requirement: AC 230V, with pre-installed power plug of 16 Amp near heater location",
        "Proper earthing is required for safe operation",
        "All electrical connections must be properly secured",
      ],
    },
  },
  maintenance: {
    name: "Maintenance",
    image: ORH3,
    variants: {
      "1 Service": {
        image: ORH3,
        "1": 1999,
      },
    },
    description: {
      payment: "One time advance payment applicable",
      paymentMode:
        "Accepted as Online Google Pay, Phonepe, UPI, Net banking and Cash etc",
    },
  },
  "ac-amc-service": {
    name: "AC AMC Service",
    image: ORH3,
    variants: {
      "Standard AMC": {
        image: ORH3,
        "1": 1999,
      },
    },
    description: {
      payment: "One time advance payment applicable",
      paymentMode:
        "Accepted as Online Google Pay, Phonepe, UPI, Net banking and Cash etc",
    },
  },
  // geyser: {
  //   name: "Geyser Repair",
  //   image: GeyserM,
  //   variants: {
  //     "15L - 20L": {
  //       image: Geyser,
  //       "2": 2750,
  //       "3": 2970,
  //       "4": 3257,
  //       "5": 3301,
  //     },
  //   },
  //   description: {
  //     starRating: "5 Star rated energy efficient geysers",
  //     condition:
  //       "Its used but looks like new condition, it will be in Excellent working condition",
  //     brand:
  //       "All geysers will be branded as per market. Brand and Color may vary as per stock availability",
  //     payment:
  //       "The Rent and Security deposit amount has to be paid in full at the time of installation",
  //     paymentMode:
  //       "Accepted as Online Google Pay, Phonepe, UPI, Net banking and Cash etc",
  //     securityDeposit:
  //       "Security deposit Rs. 1,500/-(refundable) will be extra and it will be returned back at the time of pickup",
  //     documentation: [
  //       "Aadhar card submission must for everyone",
  //       "Govt ID card, Bank statement, Company name, GST number, DL Selfie etc (Any two Id need)",
  //     ],
  //     delivery:
  //       "Customer or their representative must be present at the agreed date and time for getting Items checked in good condition",
  //     pickup: [
  //       "Customer must inform us minimum 3 Days prior to pick-up",
  //       "Pick-up date and time will be mutually decided",
  //       "Customer must be present during the handover/return",
  //     ],
  //     maintenance:
  //       "Repair and Maintenance of geyser will be on Smart Eager with free of Cost during the entire season/rented time",
  //     terms: [
  //       "It is not allowed to shift the geyser to another location",
  //       "Customer cannot transfer Smart Eager Items to another person",
  //       "Proper water pressure is required for operation",
  //       "Earth leakage circuit breaker (ELCB) is recommended",
  //       "Installation includes basic fitting only",
  //       "Additional plumbing work will be charged extra",
  //     ],
  //   },
  // },
  // refrigerator: {
  //   name: "Refrigerator Repair",
  //   image: RefM,
  //   variants: {
  //     "150-220L": {
  //       image: Ref,
  //       "4": 4048,
  //       "5": 4840,
  //       "6": 5280,
  //       "7": 6160,
  //       "8": 7040,
  //       "9": 7920,
  //       "10": 8800,
  //       "11": 9680,
  //       "12": 10560,
  //     },
  //     "220-400L": {
  //       image: Ref2,
  //       "4": 4554,
  //       "5": 5445,
  //       "6": 5940,
  //       "7": 6930,
  //       "8": 7920,
  //       "9": 8910,
  //       "10": 9900,
  //       "11": 10890,
  //       "12": 11880,
  //     },
  //   },
  //   description: {
  //     starRating: "4 & 5 Star rated energy efficient refrigerators",
  //     condition:
  //       "Its used but looks like new condition, it will be in Excellent working condition",
  //     brand:
  //       "All refrigerators will be branded as per market. Brand and Color may vary as per stock availability",
  //     payment:
  //       "The Rent and Security deposit amount has to be paid in full at the time of delivery",
  //     paymentMode:
  //       "Accepted as Online Google Pay, Phonepe, UPI, Net banking and Cash etc",
  //     securityDeposit:
  //       "Security deposit Rs. 2,000/-(refundable) will be extra and it will be returned back at the time of pickup",
  //     documentation: [
  //       "Aadhar card submission must for everyone",
  //       "Govt ID card, Bank statement, Company name, GST number, DL Selfie etc (Any two Id need)",
  //     ],
  //     delivery:
  //       "Customer or their representative must be present at the agreed date and time for getting Items checked in good condition",
  //     pickup: [
  //       "Customer must inform us minimum 3 Days prior to pick-up",
  //       "Pick-up date and time will be mutually decided",
  //       "Customer must be present during the handover/return",
  //     ],
  //     maintenance:
  //       "Repair and Maintenance of refrigerator will be on Smart Eager with free of Cost during the entire season/rented time",
  //     terms: [
  //       "It is not allowed to shift the refrigerator to another location",
  //       "Customer cannot transfer Smart Eager Items to another person",
  //       "Stabilizer will be provided if required (Rs. 500/- extra per month)",
  //       "Keep refrigerator in well-ventilated area",
  //       "24-hour power backup recommended for better performance",
  //       "Level surface required for installation",
  //     ],
  //   },
  // },
  // "washing-machine": {
  //   name: "Washing Machine Repair",
  //   image: WMM,
  //   variants: {
  //     "semi-automatic": {
  //       image: WM,
  //       "4": 3542,
  //       "5": 4235,
  //       "6": 4620,
  //       "7": 5390,
  //       "8": 6160,
  //       "9": 6930,
  //       "10": 7700,
  //       "11": 8470,
  //       "12": 9240,
  //     },
  //     "fully-automatic": {
  //       image: WM2,
  //       "4": 3795,
  //       "5": 4538,
  //       "6": 4950,
  //       "7": 5775,
  //       "8": 6600,
  //       "9": 7425,
  //       "10": 8250,
  //       "11": 9075,
  //       "12": 9900,
  //     },
  //   },
  //   description: {
  //     starRating: "4 & 5 Star rated energy efficient washing machines",
  //     condition:
  //       "Its used but looks like new condition, it will be in Excellent working condition",
  //     brand:
  //       "All washing machines will be branded as per market. Brand and Color may vary as per stock availability",
  //     payment:
  //       "The Rent and Security deposit amount has to be paid in full at the time of delivery",
  //     paymentMode:
  //       "Accepted as Online Google Pay, Phonepe, UPI, Net banking and Cash etc",
  //     securityDeposit:
  //       "Security deposit Rs. 2,000/-(refundable) will be extra and it will be returned back at the time of pickup",
  //     documentation: [
  //       "Aadhar card submission must for everyone",
  //       "Govt ID card, Bank statement, Company name, GST number, DL Selfie etc (Any two Id need)",
  //     ],
  //     delivery:
  //       "Customer or their representative must be present at the agreed date and time for getting Items checked in good condition",
  //     pickup: [
  //       "Customer must inform us minimum 3 Days prior to pick-up",
  //       "Pick-up date and time will be mutually decided",
  //       "Customer must be present during the handover/return",
  //     ],
  //     maintenance:
  //       "Repair and Maintenance of washing machine will be on Smart Eager with free of Cost during the entire season/rented time",
  //     terms: [
  //       "It is not allowed to shift the washing machine to another location",
  //       "Customer cannot transfer Smart Eager Items to another person",
  //       "Proper water inlet and outlet required",
  //       "Level surface required for installation",
  //       "Basic installation included",
  //       "Additional plumbing work will be charged extra",
  //     ],
  //   },
  // },
};
