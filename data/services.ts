export type ServiceKind = "hotels" | "cruise" | "car-rental";
export type ServiceCard = { title: string; description: string };
export type TravelService = {
  id: ServiceKind;
  label: string;
  path: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  formTitle: string;
  formDescription: string;
  collectionsTitle: string;
  collections: ServiceCard[];
  benefitsTitle: string;
  benefits: ServiceCard[];
  tipsTitle: string;
  tips: string[];
  faq: { question: string; answer: string }[];
};

export const cruiseRegions = ["Caribbean", "Mediterranean", "Alaska", "Bahamas", "Other / undecided"];
export const vehicleTypes = ["Economy", "Sedan", "SUV", "Luxury", "Minivan", "No preference"];

export const services: Record<ServiceKind, TravelService> = {
  hotels: {
    id: "hotels", label: "Hotels", path: "/hotels",
    title: "Find Your Perfect Stay, Wherever You Go",
    description: "From relaxing weekend escapes to exciting city adventures, explore accommodation options that complement your travel plans.",
    seoTitle: "Hotels & Accommodation Planning",
    seoDescription: "Plan a comfortable stay with EasyFareBooking. Explore accommodation styles, destination ideas and practical hotel considerations, then prepare a stay inquiry.",
    formTitle: "A stay shaped around your plans",
    formDescription: "Tell us where and when you would like to stay. Continue to Contact to review your inquiry; this form does not check availability or reserve a room.",
    collectionsTitle: "Find the Style That Fits Your Stay",
    collections: [
      { title: "Luxury Hotels", description: "Consider the setting, room layout and the services that matter to you. Verify specific inclusions with the property before choosing a stay." },
      { title: "Budget-Friendly Stays", description: "Balance your accommodation budget with location, transport and the full cost of the stay, rather than an isolated nightly figure." },
      { title: "Family Resorts", description: "Plan around your group's ages, room needs and daily rhythm. Confirm bed arrangements and any family facilities directly with the provider." },
      { title: "Business Hotels", description: "Choose a practical base for the places you need to reach, then check work-space needs, transport and arrival arrangements." },
    ],
    benefitsTitle: "Why Plan Your Stay With Us",
    benefits: [
      { title: "Begin with your priorities", description: "Organize your destination, dates and room needs before discussing accommodation. A clearer brief makes the next conversation more useful." },
      { title: "Look at the whole visit", description: "Consider airport transfers, local activities and your accommodation together, using our destination guides for context." },
      { title: "A straightforward inquiry", description: "Review your request on Contact before opening an email draft. You stay in control of the details you choose to send." },
    ],
    tipsTitle: "Small Details, More Comfortable Days",
    tips: ["Match the neighborhood to your main activities, not only a landmark name.", "Verify check-in, check-out and late-arrival arrangements with the property.", "Confirm the room's bed arrangement and occupancy for your group.", "Read the actual provider's cancellation conditions and complete quote before paying."],
    faq: [
      { question: "Does this page search live hotel availability?", answer: "No. It is an accommodation-planning and inquiry page. We do not display live room availability or hotel rates." },
      { question: "What happens when I continue with my stay inquiry?", answer: "Your destination, dates and guest/room preferences are carried privately to Contact within this browser session. Review them there and choose whether to open an email draft. Nothing is sent automatically." },
      { question: "Can I request more than one room?", answer: "Yes. Enter your total guests and rooms in the form. The provider must confirm the final occupancy and room arrangements; the form does not allocate rooms." },
      { question: "Are the hotel types actual available properties?", answer: "No. Luxury, budget-friendly, family and business stays are planning categories. Specific properties and included services need to be confirmed separately." },
      { question: "Will an inquiry confirm a reservation?", answer: "No. A stay is not reserved by completing this form or preparing an email. A real provider must confirm the property, price and terms before any booking." },
    ],
  },
  cruise: {
    id: "cruise", label: "Cruise", path: "/cruise",
    title: "Discover the World, One Voyage at a Time",
    description: "Explore unforgettable journeys across breathtaking coastlines, tropical islands, and remarkable destinations.",
    seoTitle: "Cruise Vacations & Travel Planning",
    seoDescription: "Explore cruise planning ideas with EasyFareBooking, from Caribbean and Mediterranean regions to Alaska and the Bahamas. Prepare an inquiry for your travel preferences.",
    formTitle: "Tell us about your next voyage",
    formDescription: "Choose a region, an approximate date and your group size. Add contact details for your request draft. No voyage, cabin or rate is confirmed by this form.",
    collectionsTitle: "Where Would You Like to Sail?",
    collections: [
      { title: "Caribbean Cruises", description: "Think about the islands and coastal experiences you would like to explore. Compare an actual operator's port sequence and time ashore before choosing a voyage." },
      { title: "Mediterranean Cruises", description: "Plan a mix of coastal scenery, cultural visits and relaxed onboard time. Your preferred ports should guide the conversation about a real itinerary." },
      { title: "Alaska Cruises", description: "Focus your inquiry on northern landscapes and the experiences you hope to include. Confirm operating dates, excursions and weather-ready packing with the provider." },
      { title: "Bahamas Cruises", description: "Consider a more focused island visit, with departure-port access and shore plans considered alongside time on board. No sailing duration or availability is implied here." },
    ],
    benefitsTitle: "A Voyage That Suits Your Travel Style",
    benefits: [
      { title: "Family Cruises", description: "Build the request around ages, cabin arrangements and a comfortable pace. Confirm any age-specific activities or facilities with the operator." },
      { title: "Luxury Cruises", description: "Identify the space, dining preferences and service details you value, then verify the actual ship and fare inclusions rather than assuming them." },
      { title: "Romantic Getaways", description: "Consider quieter onboard time and the places you want to explore together. Ask about cabin arrangements and the real itinerary before deciding." },
    ],
    tipsTitle: "First-Time Cruiser Tips",
    tips: ["Plan the journey to your departure port with enough time for the actual boarding arrangements.", "Read the itinerary carefully, including port stops and any sea days.", "Check what the specific fare includes, and budget separately for items it does not.", "Confirm document requirements with current official sources for your circumstances and itinerary.", "Review the provider's cancellation terms and excursion arrangements before purchase."],
    faq: [
      { question: "Are these cruise cards available sailings?", answer: "No. They describe regions to discuss in a planning inquiry. This page has no live cruise inventory, sailing schedule or price feed." },
      { question: "Do I need an exact travel date?", answer: "The form asks for an approximate preferred departure date. Explain any flexibility in your Contact message before sending a request." },
      { question: "Can I inquire about a family cruise?", answer: "Yes. Enter the total number of travellers and mention the group's ages or cabin needs when reviewing your message. Specific arrangements must be confirmed by the operator." },
      { question: "Is EasyFareBooking advertising a cruise-line partnership?", answer: "No. This guide does not claim a cruise-line partnership, exclusive offer or included onboard benefit." },
      { question: "Has my cruise been booked after I fill in the form?", answer: "No. The form prepares an inquiry for review on Contact. Even opening an email draft does not send it or confirm a reservation; you decide whether to send it in your email app." },
    ],
  },
  "car-rental": {
    id: "car-rental", label: "Car Rental", path: "/car-rental",
    title: "Your Journey. Your Car. Your Freedom.",
    description: "Explore flexible car rental options for city adventures, business trips, and memorable road journeys.",
    seoTitle: "Car Rental & Road Trip Planning",
    seoDescription: "Plan a car rental inquiry with EasyFareBooking. Explore vehicle categories, pickup details, dates and practical road-trip considerations without live-inventory claims.",
    formTitle: "Plan the drive, starting with pickup",
    formDescription: "Tell us your pickup location, rental dates and preferred vehicle category. Continue to Contact to review an inquiry; no vehicle or rental rate is reserved.",
    collectionsTitle: "Which Vehicle Category Fits Your Plans?",
    collections: [
      { title: "Economy", description: "A category to consider for a lighter luggage load and city-focused plans. Verify actual dimensions, passenger space and rental conditions." },
      { title: "Sedan", description: "Consider the balance of passenger comfort and luggage for work travel or a longer drive. The exact model is determined by the provider." },
      { title: "SUV", description: "Discuss your space needs and planned roads, rather than assuming a category label establishes particular equipment or capabilities." },
      { title: "Luxury", description: "Describe the comfort and features you value. No brand, model or upgrade is guaranteed by selecting this preference." },
      { title: "Minivan", description: "Organize a group journey around seating, luggage and any child-seat needs. Confirm the actual vehicle and equipment separately." },
    ],
    benefitsTitle: "Make the Rental Fit the Journey",
    benefits: [
      { title: "Pickup with a plan", description: "Know whether you need an airport, city or other pickup point, and confirm its operating arrangements with the provider." },
      { title: "Space for your group", description: "Match the request to passengers and bags. A category preference is a starting point, not an allocation of a specific car." },
      { title: "Understand the full quote", description: "Review the provider's inclusions, fuel arrangements, mileage and any additional conditions before committing." },
    ],
    tipsTitle: "Car Rental Planning Tips",
    tips: ["Verify pickup and return locations, opening hours and the actual rental time period.", "Check driver, licence and payment requirements with the provider for the location.", "Review fuel, mileage, deposit and protection terms in the complete quote.", "Mention additional-driver or child-seat needs before the provider confirms arrangements.", "Check parking and road plans alongside accommodation, without assuming a vehicle category permits every road."],
    faq: [
      { question: "Does this page display live rental cars or rates?", answer: "No. Vehicle categories are planning preferences, not live inventory. No rental rate is shown or guaranteed." },
      { question: "What does the vehicle selector reserve?", answer: "Nothing. It records your category preference for an inquiry. The provider must confirm the actual car, equipment, price and conditions." },
      { question: "Can I request airport pickup?", answer: "Yes. Enter the airport and any relevant pickup details in the location field. Confirm the exact pickup arrangements with the rental provider." },
      { question: "Why does this form only ask for dates?", answer: "It begins a planning conversation. Add pickup and return times, driver needs and any different return location in the Contact message before sending." },
      { question: "Will continuing to Contact book a rental?", answer: "No. The form carries your inquiry to Contact for review. No message is sent automatically and no vehicle is confirmed." },
    ],
  },
};

export const serviceKinds: ServiceKind[] = ["hotels", "cruise", "car-rental"];
export const isServiceKind = (value: unknown): value is ServiceKind => typeof value === "string" && serviceKinds.includes(value as ServiceKind);
