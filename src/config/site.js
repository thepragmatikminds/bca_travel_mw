import { pexels, PHOTO_SIZES } from "@/lib/photos";

// Single source of truth for everything the business may want to change.
// Contact details are taken from the BCA Travel poster.

export const SITE = {
  name: "BCA Travel",
  tagline: "Where travel feels as easy as ABC",
  description:
    "Air tickets, travel insurance, hotel booking, tour packages, airport transfers and visa processing — arranged by one team in Malawi.",
  email: "Info@travelbca.com",
  phones: [
    { display: "+265 893 788 503", tel: "+265893788503" },
    { display: "+265 991 103 310", tel: "+265991103310" },
  ],
  // The poster shows a WhatsApp icon beside these numbers. Set to false to hide the WhatsApp links.
  whatsappEnabled: true,
  instagram: { handle: "bca_travel_mw", url: "https://www.instagram.com/bca_travel_mw" },
  // Pilot phase: shows the banner and notices. Set enabled:false when you go fully live.
  pilot: {
    enabled: true,
    banner: "Bookings are requests confirmed by email. Online payment is not available yet.",
  },
};

export const whatsappUrl = (tel) => `https://wa.me/${tel.replace(/\D/g, "")}`;

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

// Field types: text | email | tel | date | time | number | select | textarea
// showIf: { field: value }     -> only shown (and required) when that field has that value
// after:  "otherDateField"     -> must not be before that date (strict:true => must be later)
export const SERVICES = [
  {
    id: "air-ticket",
    image: pexels(1815396, ...PHOTO_SIZES.service),
    shortTitle: "Flights",
    quick: { placeField: "to", placeLabel: "Where to?", placePlaceholder: "e.g. Johannesburg", dateField: "departDate", dateLabel: "Departure date" },
    title: "Air tickets",
    icon: "plane",
    short: "Domestic, regional and international flights, booked for you.",
    description:
      "Tell us where and when you want to fly. We search the options and reply by email with availability and the price.",
    includes: ["One-way and return flights", "Economy and business cabins", "Families, groups and multi-city trips on request"],
    needs: ["Where you are flying from and to", "Travel dates", "Number of travellers"],
    fields: [
      { name: "tripType", label: "Trip type", type: "select", options: ["Return", "One-way"], default: "Return", required: true },
      { name: "from", label: "Flying from", type: "text", default: "Lilongwe", required: true },
      { name: "to", label: "Flying to", type: "text", placeholder: "e.g. Johannesburg", required: true },
      { name: "departDate", label: "Departure date", type: "date", required: true },
      { name: "returnDate", label: "Return date", type: "date", required: true, showIf: { tripType: "Return" }, after: "departDate" },
      { name: "adults", label: "Adults (12+)", type: "select", options: range(1, 9), default: "1", required: true },
      { name: "children", label: "Children (2–11)", type: "select", options: range(0, 8), default: "0" },
      { name: "infants", label: "Infants (under 2)", type: "select", options: range(0, 4), default: "0" },
      { name: "cabin", label: "Cabin", type: "select", options: ["Economy", "Business"], default: "Economy" },
      { name: "airline", label: "Preferred airline (optional)", type: "text", placeholder: "Any airline" },
    ],
  },
  {
    id: "travel-insurance",
    image: pexels(1476356, ...PHOTO_SIZES.service),
    shortTitle: "Insurance",
    quick: { placeField: "destination", placeLabel: "Travelling to", placePlaceholder: "e.g. Dubai", dateField: "startDate", dateLabel: "Cover starts" },
    title: "Travel insurance",
    icon: "shield",
    short: "Cover arranged before you travel, so you can go with peace of mind.",
    description:
      "Share your trip details and we will come back with the cover options available and what each one includes.",
    includes: ["Single-trip cover", "Individuals, couples, families and groups", "Cover that can support visa applications"],
    needs: ["Destination and travel dates", "Number and ages of travellers"],
    fields: [
      { name: "destination", label: "Travelling to", type: "text", placeholder: "e.g. Dubai", required: true },
      { name: "startDate", label: "Cover starts", type: "date", required: true },
      { name: "endDate", label: "Cover ends", type: "date", required: true, after: "startDate" },
      { name: "travellers", label: "Number of travellers", type: "select", options: range(1, 10), default: "1", required: true },
      { name: "ages", label: "Traveller ages", type: "text", placeholder: "e.g. 34, 31, 6", required: true },
      { name: "purpose", label: "Purpose of trip", type: "select", options: ["Leisure", "Business", "Study", "Other"], default: "Leisure" },
      { name: "forVisa", label: "Needed for a visa application?", type: "select", options: ["No", "Yes", "Not sure"], default: "No" },
    ],
  },
  {
    id: "hotel-booking",
    image: pexels(36134151, ...PHOTO_SIZES.service),
    shortTitle: "Hotels",
    quick: { placeField: "destination", placeLabel: "City or area", placePlaceholder: "e.g. Mangochi", dateField: "checkIn", dateLabel: "Check-in" },
    title: "Hotel booking",
    icon: "bed",
    short: "Hotels, lodges and guesthouses for every budget.",
    description:
      "Give us the destination, your dates and what you like. We will suggest suitable places and reserve the one you choose.",
    includes: ["Business and leisure stays", "Lodges and guesthouses", "Rooms for families and groups"],
    needs: ["City or area", "Check-in and check-out dates", "Rooms, guests and budget"],
    fields: [
      { name: "destination", label: "City or area", type: "text", placeholder: "e.g. Mangochi, Nairobi, Dubai", required: true },
      { name: "checkIn", label: "Check-in", type: "date", required: true },
      { name: "checkOut", label: "Check-out", type: "date", required: true, after: "checkIn", strict: true },
      { name: "rooms", label: "Rooms", type: "select", options: range(1, 8), default: "1", required: true },
      { name: "guests", label: "Guests in total", type: "select", options: range(1, 16), default: "2", required: true },
      { name: "stars", label: "Type of stay", type: "select", options: ["No preference", "3-star", "4-star", "5-star", "Lodge or guesthouse"], default: "No preference" },
      { name: "budget", label: "Budget per night (optional)", type: "text", placeholder: "e.g. MWK 150,000 or USD 80" },
    ],
  },
  {
    id: "tour-packages",
    image: pexels(33498304, ...PHOTO_SIZES.service),
    shortTitle: "Tours",
    quick: { placeField: "destination", placeLabel: "Where or what?", placePlaceholder: "e.g. Zanzibar, safari", dateField: "startDate", dateLabel: "Start date" },
    title: "Tour packages",
    icon: "compass",
    short: "Trips put together for you — safaris, beaches, cities and more.",
    description:
      "Describe the kind of trip you have in mind. We will propose a package and adjust it with you until it fits.",
    includes: ["Safari, lake and beach holidays", "City breaks and cultural trips", "Honeymoons, family and group travel"],
    needs: ["Where or what kind of trip", "Approximate dates and trip length", "Number of travellers and budget"],
    fields: [
      { name: "destination", label: "Where or what experience?", type: "text", placeholder: "e.g. Lake Malawi, Zanzibar, safari", required: true },
      { name: "style", label: "Trip style", type: "select", options: ["Not sure yet", "Safari and wildlife", "Beach and lake", "City break", "Culture and heritage", "Honeymoon or couples", "Family trip", "Group or corporate trip"], default: "Not sure yet" },
      { name: "startDate", label: "Approximate start date", type: "date", required: true },
      { name: "length", label: "Trip length", type: "text", placeholder: "e.g. 5 nights" },
      { name: "travellers", label: "Number of travellers", type: "number", min: 1, max: 100, default: "2", required: true },
      { name: "flights", label: "Include flights?", type: "select", options: ["Not sure", "Yes, include flights", "No, land arrangements only"], default: "Not sure" },
      { name: "budget", label: "Budget (optional)", type: "text", placeholder: "e.g. MWK 2,000,000 or USD 1,500" },
    ],
  },
  {
    id: "airport-transfers",
    image: pexels(1815385, ...PHOTO_SIZES.service),
    shortTitle: "Transfers",
    quick: { placeField: "airport", placeLabel: "Airport", placePlaceholder: "e.g. Kamuzu International", dateField: "date", dateLabel: "Date" },
    title: "Airport transfers",
    icon: "car",
    short: "A ride waiting for you when you land — or to get you to your flight.",
    description:
      "Tell us the airport, the address and the time. We will arrange the pick-up or drop-off and confirm it by email.",
    includes: ["Arrival pick-ups", "Departure drop-offs", "Return transfers"],
    needs: ["Airport and address", "Date, time and flight number", "Passengers and luggage"],
    fields: [
      { name: "transferType", label: "Transfer type", type: "select", options: ["Airport pick-up (arrival)", "Airport drop-off (departure)", "Both ways"], default: "Airport pick-up (arrival)", required: true },
      { name: "airport", label: "Airport", type: "text", placeholder: "e.g. Kamuzu International, Lilongwe", required: true },
      { name: "address", label: "Address or hotel", type: "text", placeholder: "Where we pick you up or drop you off", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time (if known)", type: "time" },
      { name: "flightNumber", label: "Flight number (optional)", type: "text", placeholder: "e.g. KQ 123" },
      { name: "returnDate", label: "Return date", type: "date", required: true, showIf: { transferType: "Both ways" }, after: "date" },
      { name: "passengers", label: "Passengers", type: "number", min: 1, max: 60, default: "1", required: true },
      { name: "luggage", label: "Luggage (optional)", type: "text", placeholder: "e.g. 3 large suitcases" },
    ],
  },
  {
    id: "visa-processing",
    image: pexels(30754172, ...PHOTO_SIZES.service),
    shortTitle: "Visas",
    quick: { placeField: "country", placeLabel: "Visa for (country)", placePlaceholder: "e.g. United Arab Emirates", dateField: "travelDate", dateLabel: "Travel date" },
    title: "Visa processing",
    icon: "visa",
    short: "Help with visa applications, from requirements to submission.",
    description:
      "Tell us your nationality and where you are going. We will explain what is needed and handle the application with you.",
    includes: ["Tourist, business, transit and study visas", "Document checklist for your destination", "Guidance until submission"],
    needs: ["Nationality and destination country", "Visa type and planned travel date", "Passport expiry date"],
    fields: [
      { name: "nationality", label: "Your nationality", type: "text", placeholder: "e.g. Malawian", required: true },
      { name: "country", label: "Visa for (country)", type: "text", placeholder: "e.g. United Arab Emirates", required: true },
      { name: "visaType", label: "Visa type", type: "select", options: ["Tourist", "Business", "Transit", "Study", "Work", "Other"], default: "Tourist", required: true },
      { name: "travelDate", label: "Planned travel date", type: "date", required: true },
      { name: "passportExpiry", label: "Passport expiry date", type: "date", required: true },
      { name: "applicants", label: "Number of applicants", type: "number", min: 1, max: 50, default: "1", required: true },
    ],
    privacyNote:
      "Please do not type passport numbers here. We will tell you how to share documents safely when we reply.",
  },
];

// Destination cards. `kind` + `colors` only draw the fallback illustration if the photo cannot load.
// image: any URL or /images/... path. Photographers are credited in the README.
const dest = (id) => pexels(id, ...PHOTO_SIZES.destination);
export const DESTINATIONS = [
  { city: "Johannesburg", code: "JNB", country: "South Africa", kind: "skyline", colors: ["#0a3d3a", "#f7df3a"], image: dest(33622126) },
  { city: "Nairobi", code: "NBO", country: "Kenya", kind: "skyline", colors: ["#073d22", "#8fdc4a"], image: dest(29069329) },
  { city: "Dubai", code: "DXB", country: "United Arab Emirates", kind: "spire", colors: ["#0c6f86", "#fbea6a"], image: dest(19180974) },
  { city: "Cape Town", code: "CPT", country: "South Africa", kind: "mountain", colors: ["#0b6b36", "#f2d40f"], image: dest(14081797) },
  { city: "Durban", code: "DUR", country: "South Africa", kind: "beach", colors: ["#1aa6b7", "#fbea6a"], image: dest(4606404) },
  { city: "Mombasa", code: "MBA", country: "Kenya", kind: "beach", colors: ["#0c6f86", "#b6e84a"], image: dest(37489740) },
  { city: "Abu Dhabi", code: "AUH", country: "United Arab Emirates", kind: "skyline", colors: ["#0a5530", "#6fd498"], image: dest(28448972) },
  { city: "London", code: "LHR", country: "United Kingdom", kind: "clock", colors: ["#243a30", "#6fd498"], image: dest(30029654) },
];

export const HERO_IMAGE = pexels(18813721, ...PHOTO_SIZES.hero); // aircraft wing above the clouds

// Starting points for flight requests (no prices — every quote comes by email).
export const ROUTES = [
  { from: "Lilongwe", fromCode: "LLW", to: "Johannesburg", toCode: "JNB" },
  { from: "Lilongwe", fromCode: "LLW", to: "Nairobi", toCode: "NBO" },
  { from: "Lilongwe", fromCode: "LLW", to: "Dubai", toCode: "DXB" },
  { from: "Blantyre", fromCode: "BLZ", to: "Johannesburg", toCode: "JNB" },
  { from: "Lilongwe", fromCode: "LLW", to: "Addis Ababa", toCode: "ADD" },
  { from: "Lilongwe", fromCode: "LLW", to: "Lusaka", toCode: "LUN" },
];

export const WHY = [
  { icon: "compass", title: "One team, six services", text: "Flights, hotels, transfers, tours, insurance and visas, handled together." },
  { icon: "mail", title: "Booking by email", text: "Send a short request and we reply with availability and the price. No account needed." },
  { icon: "shield", title: "Pay after we confirm", text: "There is no online payment. We confirm the details first, then tell you how to pay." },
];

export const TRUST = ["No account needed", "Payment arranged by email", "Pilot phase — your feedback helps"];

export const STEPS = [
  { title: "Choose a service", text: "Flights, insurance, hotels, tours, transfers or visas — pick what you need." },
  { title: "Send your request by email", text: "Fill in the short form. We prepare the email for you to send to our team." },
  { title: "We confirm and arrange payment", text: "We reply with availability, the price and how to pay. A booking is only final once we confirm it by email." },
];

export const FAQS = [
  {
    q: "How do I book?",
    a: "Choose a service, fill in the form and send the prepared email to us. We then reply with availability and the price.",
  },
  {
    q: "How do I pay?",
    a: "Payment is arranged by email. After you send your request, our team replies to confirm the details and explain how to pay. There is no online payment during the pilot.",
  },
  {
    q: "Is my booking confirmed when I submit the form?",
    a: "No. The form prepares an email. Your booking is a request until BCA Travel confirms it in a reply to you.",
  },
  {
    q: "What if the email button does not open my email app?",
    a: "Use “Open in Gmail”, or copy the request and paste it into any email to Info@travelbca.com. You can also call us.",
  },
  {
    q: "How long until I get a reply?",
    a: "Reply times can vary while we are in the pilot phase. If your trip is urgent, please call us as well.",
  },
  {
    q: "What does “pilot phase” mean?",
    a: "The site is in an early test period with real customers. Some features, such as online payment and customer accounts, are not live yet. Your feedback is welcome.",
  },
];
