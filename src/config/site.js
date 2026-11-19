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

export const DESTINATION_SUGGESTIONS = [
  "Johannesburg",
  "Nairobi",
  "Dubai",
  "Lusaka",
  "Dar es Salaam",
  "Zanzibar",
  "Addis Ababa",
  "London",
];

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
