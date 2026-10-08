export type DealTone = "domestic" | "international" | "urgent" | "premium" | "flexible" | "family";
export type DealFaq = { question: string; answer: string };
export type DealCategory = {
  id: string;
  path: string;
  alias?: string;
  title: string;
  eyebrow: string;
  summary: string;
  introduction: string;
  overview: string;
  audience: string;
  tone: DealTone;
  defaultTripType?: "oneway" | "roundtrip";
  defaultCabin?: string;
  considerations: { title: string; text: string }[];
  faq: DealFaq[];
  routeIds: string[];
  relatedIds: string[];
  seoTitle: string;
  seoDescription: string;
};

const domesticRoutes = ["los-angeles-to-new-york", "chicago-to-miami", "dallas-to-las-vegas", "atlanta-to-los-angeles", "san-francisco-to-seattle", "new-york-to-orlando", "houston-to-denver", "boston-to-washington"];
const internationalRoutes = ["new-york-to-london", "los-angeles-to-dubai", "chicago-to-paris", "san-francisco-to-tokyo", "miami-to-toronto", "dallas-to-frankfurt", "seattle-to-singapore", "boston-to-sydney"];

export const dealCategories: DealCategory[] = [
  {
    id: "cheap-domestic-flights", path: "/domestic-flight-deals", alias: "/deals/cheap-domestic-flights",
    title: "Domestic Flight Deals & Route Planning", eyebrow: "Closer to home", tone: "domestic",
    summary: "Explore U.S. city pairs for weekends away, family visits and work trips, with practical guidance for the whole journey.",
    introduction: "A domestic trip starts with more than a city name. Your choice of airport, arrival time and baggage can change how easy the journey feels. Use this guide to explore U.S. routes and build a search around your dates, rather than relying on an unverified promotional fare.",
    overview: "Domestic planning covers journeys between U.S. cities, including short breaks, regional connections and cross-country visits. Compare total travel time as well as the eventual ticket cost: an inconvenient airport transfer can undo the benefit of a seemingly attractive itinerary.",
    audience: "A useful starting point for city breaks, family visits and work travel within the United States.",
    considerations: [
      { title: "Dates that work for the trip", text: "Compare nearby days if your plans allow, while keeping hotel and event dates in view." },
      { title: "The right arrival airport", text: "Check the journey from the airport to your accommodation, including late-arrival transport." },
      { title: "Connections and bags", text: "Allow realistic transfer time and review baggage terms for the exact fare before paying." },
    ],
    faq: [
      { question: "Does this page show current domestic fare offers?", answer: "No. These are informational route and planning guides. The search results are a demo, with no live domestic fare or availability feed." },
      { question: "How can I start a U.S. flight search?", answer: "Choose a route guide or enter two airports in the widget. Add your dates, travellers and cabin, then open the demo search experience." },
      { question: "Should I choose a nearby airport for a domestic trip?", answer: "Compare the complete journey, including ground transport and your destination address. An alternative airport is useful only if it suits those plans." },
      { question: "Can I plan a domestic one-way journey?", answer: "Yes. Select One Way in the widget. A return date is required only when Round Trip is selected." },
      { question: "Where can I check baggage and change conditions?", answer: "Review the exact airline and fare conditions with your booking provider before purchase. This directory does not establish an allowance or a refund entitlement." },
    ], routeIds: domesticRoutes, relatedIds: ["one-way-flights", "round-trip-flights", "family-flight-deals", "last-minute-flights"],
    seoTitle: "Domestic Flight Routes & Travel Options", seoDescription: "Explore U.S. flight routes with EasyFareBooking. Plan airports, dates, baggage and connections for domestic travel without unverified fare claims.",
  },
  {
    id: "cheap-international-flights", path: "/international-flight-deals", alias: "/deals/cheap-international-flights",
    title: "International Flight Deals & Travel Planning", eyebrow: "Beyond borders", tone: "international",
    summary: "Explore overseas journeys with a closer look at airport choices, arrival dates and the time you need between flights.",
    introduction: "International travel asks you to think across time zones and borders. A convenient departure can still lead to a difficult first day if the arrival date, transfer or connection does not suit your plans. Start with a route, then build an itinerary around your destination and the practical details of getting there.",
    overview: "This collection brings together cross-border city pairs already featured on EasyFareBooking. It helps you organize an overseas search, with no claim that a particular airline, direct flight or promotional fare is available for your dates.",
    audience: "For overseas holidays, visits, extended stays and business journeys where the full itinerary needs careful planning.",
    considerations: [
      { title: "Calendar dates and time zones", text: "Read the local departure and arrival dates carefully before arranging hotels or onward transport." },
      { title: "Airport and connection choices", text: "Compare the total itinerary, including airport changes and time between separately arranged journeys." },
      { title: "Documents and fare conditions", text: "Check current official entry and transit requirements for your circumstances, and review the provider's fare terms before purchase." },
    ], faq: [
      { question: "Are international flights on this page live offers?", answer: "No. Route pages are planning resources, and the flight results remain a clearly labeled demo. They do not confirm airline service or availability." },
      { question: "Why does the arrival date matter on an overseas trip?", answer: "Time zones and overnight journeys can put arrival on a different calendar day. Use the actual itinerary from your provider when arranging accommodation." },
      { question: "Can I compare more than one destination airport?", answer: "Yes. The autocomplete lets you change the selected airport. The destination guides also explain major airport options where relevant." },
      { question: "Does an international connection need separate planning?", answer: "Yes. Check the itinerary, transfer arrangements and current transit requirements with the relevant provider and official authorities. This guide cannot determine eligibility." },
      { question: "Can EasyFareBooking help with an overseas itinerary?", answer: "Use the contact page to ask about your route and dates. The demo search itself does not issue tickets or reserve seats." },
    ], routeIds: internationalRoutes, relatedIds: ["business-class-flights", "round-trip-flights", "holiday-flight-deals", "one-way-flights"],
    seoTitle: "International Flight Routes & Planning", seoDescription: "Plan international travel with EasyFareBooking route guides. Explore airport choices, arrival dates, connections and practical overseas flight considerations.",
  },
  {
    id: "last-minute-flights", path: "/last-minute-flight-deals", alias: "/deals/last-minute-flights",
    title: "Last-Minute Flight Search & Travel Options", eyebrow: "Plans at short notice", tone: "urgent",
    summary: "Bring the essentials into focus when a work trip, family visit or spontaneous break comes together quickly.",
    introduction: "When departure is close, the most useful comparison is often the one you can act on: a realistic arrival time, a manageable airport journey and conditions you understand. A short-notice trip does not automatically mean a bargain or an expensive ticket. Organize the fixed parts first and keep the rest flexible where possible.",
    overview: "Last-minute planning is for journeys that need to happen soon. It focuses on timing, readiness and the practical trade-offs between itineraries, rather than countdowns or claims about remaining seats.",
    audience: "For urgent family visits, unexpected meetings and flexible short breaks, with no promise that a particular departure is available.",
    considerations: [
      { title: "Start with your deadline", text: "Work backward from when you need to arrive and include airport and ground-travel time." },
      { title: "Keep options realistic", text: "Consider nearby airports only when you can reach them comfortably at short notice." },
      { title: "Read before committing", text: "Check baggage, changes and cancellations before purchase, even when time is limited." },
    ], faq: [
      { question: "Does last-minute mean a discounted fare?", answer: "No. It describes how close the trip is to departure, not a verified promotion. This page has no live pricing feed." },
      { question: "Is there a countdown or seat availability on this page?", answer: "No. The guide does not show inventory, remaining seats or time-limited claims. Those details must come from a real provider." },
      { question: "What should I settle first for an urgent trip?", answer: "Identify the required arrival time, your travel-ready documents and the journey to each airport before comparing real itineraries." },
      { question: "Can I prepare a one-way short-notice search?", answer: "Yes. Choose One Way and enter a departure date. You can also select Round Trip when you know the return date." },
      { question: "Will the demo reserve a last-minute flight?", answer: "No. It demonstrates a search flow only. Contact EasyFareBooking for assistance with a real journey." },
    ], routeIds: ["new-york-to-los-angeles", "chicago-to-miami", "dallas-to-las-vegas", "los-angeles-to-london", "san-francisco-to-dubai", "boston-to-toronto", "seattle-to-tokyo", "houston-to-singapore"], relatedIds: ["cheap-domestic-flights", "one-way-flights", "cheap-international-flights", "business-class-flights"],
    seoTitle: "Last-Minute Flight Search & Travel Options", seoDescription: "Explore short-notice flight planning with EasyFareBooking. Review routes, arrival deadlines, airport transfers and fare considerations without live-discount claims.",
  },
  {
    id: "business-class-flights", path: "/business-class-flight-deals", alias: "/deals/business-class-flights",
    title: "Business Class Flight Options", eyebrow: "A thoughtful cabin choice", tone: "premium", defaultCabin: "Business",
    summary: "Plan a premium-cabin journey around the exact aircraft, connection and fare conditions that matter to you.",
    introduction: "A business-class label is only the beginning of a comparison. Cabin layouts and included services can differ between journeys, so start with your purpose: arriving ready for a meeting, having room on a longer trip or reducing awkward connections. Verify the product on the actual itinerary before making a decision.",
    overview: "Business-class planning looks beyond a cabin name to the route, transfer and terms attached to a ticket. The search can start in Business when no saved cabin choice exists, but this guide does not promise a specific seat, lounge or onboard service.",
    audience: "For travelers who want to examine premium-cabin options for work or leisure, with attention to the actual product rather than blanket benefits.",
    considerations: [
      { title: "Check each flight segment", text: "A connecting itinerary can use different cabins or aircraft. Confirm the cabin on every segment." },
      { title: "Know what is included", text: "Verify seats, baggage and any airport services directly against the exact itinerary and fare." },
      { title: "Value the full journey", text: "Compare connection time and arrival practicality alongside the cabin choice." },
    ], faq: [
      { question: "Does this page guarantee a lie-flat seat?", answer: "No. A cabin label alone does not establish the seat layout. Verify the aircraft and product with your provider before purchase." },
      { question: "Will Business be selected in the search widget?", answer: "It is the initial cabin on this guide if you have not already saved a cabin choice in this browser session. Your existing selection is preserved." },
      { question: "Are lounge access and extra baggage included?", answer: "Not necessarily. Inclusions depend on the actual ticket and operating provider. This guide does not promise them." },
      { question: "Can connecting flights have mixed cabins?", answer: "An itinerary can list different cabin arrangements on its segments. Review the complete itinerary rather than assuming a single label applies throughout." },
      { question: "Are these verified business-class promotions?", answer: "No. The cards are planning links. No live premium fare, discount or seat availability is displayed here." },
    ], routeIds: internationalRoutes.slice(0, 6), relatedIds: ["first-class-flights", "cheap-international-flights", "round-trip-flights", "last-minute-flights"],
    seoTitle: "Business Class Flight Search & Planning", seoDescription: "Explore business-class planning with EasyFareBooking. Review cabins, connecting segments, baggage and fare terms without unsupported premium-service claims.",
  },
  {
    id: "first-class-flights", path: "/first-class-flight-deals", alias: "/deals/first-class-flights",
    title: "First Class Flight Planning", eyebrow: "Look beyond the label", tone: "premium", defaultCabin: "First Class",
    summary: "Explore first-class searches with careful attention to the itinerary and the product actually offered.",
    introduction: "First class can mean different things on different journeys. Rather than assuming a uniform experience, identify the details you value and confirm them against the specific flight. This guide keeps the focus on cabin verification, sensible connections and the conditions attached to a real ticket.",
    overview: "This collection supports first-class planning for the routes already featured on the website. It does not assert that first class operates on any listed route or date, and it does not promise suites, meals, lounges or other amenities.",
    audience: "For travelers considering a first-class search who want to verify the product and terms before choosing a real itinerary.",
    considerations: [
      { title: "Verify the named product", text: "Check whether the actual itinerary offers the cabin you intend to book." },
      { title: "Review the connection", text: "A premium long-haul segment does not establish the cabin of a shorter connecting flight." },
      { title: "Understand flexibility", text: "A higher cabin category does not by itself guarantee refundability or free changes." },
    ], faq: [
      { question: "Is first class available on every route listed here?", answer: "This page does not establish availability. The city pairs are planning examples; a real provider must confirm cabin service for the itinerary." },
      { question: "Does First Class automatically mean a private suite?", answer: "No. Cabin branding and layouts vary. Check the actual aircraft and product rather than relying on the label." },
      { question: "Can I change the default cabin?", answer: "Yes. Use Travellers & Cabin in the widget. A saved cabin choice is preserved when moving between search pages." },
      { question: "Are first-class tickets automatically refundable?", answer: "Do not assume this from the cabin name. Review the exact fare and booking-provider conditions before paying." },
      { question: "Can the demo book a first-class journey?", answer: "No. It can prepare a search and display illustrative results only. Use the contact page for real itinerary assistance." },
    ], routeIds: ["new-york-to-london", "los-angeles-to-dubai", "san-francisco-to-tokyo", "chicago-to-miami", "boston-to-paris", "seattle-to-singapore"], relatedIds: ["business-class-flights", "cheap-international-flights", "round-trip-flights", "holiday-flight-deals"],
    seoTitle: "First Class Flight Options & Cabin Planning", seoDescription: "Plan a first-class search with EasyFareBooking. Explore route guides and learn what to verify about cabin products, connections and fare conditions.",
  },
  {
    id: "round-trip-flights", path: "/deals/round-trip-flights", title: "Round-Trip Flight Planning", eyebrow: "Outward and homeward", tone: "flexible", defaultTripType: "roundtrip",
    summary: "Give both halves of your journey equal attention, from the first arrival to the final trip home.",
    introduction: "A well-planned round trip balances the outbound journey with the return. An early return departure can shorten your last day, while a late arrival home can affect the next morning. Compare the whole visit, not only the outward flight, and keep accommodation dates aligned with the real itinerary.",
    overview: "Round-trip planning brings departure and return dates into one search. It helps when you know how long you will stay, but the eventual provider determines how the flights are ticketed and what conditions apply to changes.",
    audience: "For planned holidays, meetings and visits with a known return date.",
    considerations: [{ title: "Protect the last day", text: "Include hotel checkout and airport-transfer time when choosing the return." }, { title: "Keep dates aligned", text: "A return date must be on or after the departure date in this search." }, { title: "Compare the full price", text: "Review the real provider's complete itinerary price and terms, not isolated segment figures." }],
    faq: [{ question: "Which dates does a round-trip search require?", answer: "Enter both departure and return dates. The return date cannot be before the departure date." }, { question: "Does a round trip guarantee a lower price than two one-way tickets?", answer: "No. This page makes no pricing guarantee and has no live fare feed. Compare complete real itineraries and their terms." }, { question: "Can I change only the return flight?", answer: "The options depend on the eventual ticket and provider. Check those conditions before purchase; the demo does not manage bookings." }, { question: "What should I consider for the last day of a trip?", answer: "Allow for checkout, the airport journey and the departure process when setting your return plans." }, { question: "Does this widget keep my previous search choices?", answer: "Dates, travellers and cabin are retained within the current browser session when storage is available. The round-trip default applies to the trip type on this guide." }],
    routeIds: ["los-angeles-to-new-york", "new-york-to-london", "chicago-to-paris", "boston-to-sydney"], relatedIds: ["one-way-flights", "holiday-flight-deals", "cheap-domestic-flights", "cheap-international-flights"],
    seoTitle: "Round-Trip Flight Search & Planning", seoDescription: "Plan both halves of your journey with EasyFareBooking. Review departure and return dates, airport transfers and real-provider fare conditions.",
  },
  {
    id: "one-way-flights", path: "/deals/one-way-flights", title: "One-Way Flight Search & Planning", eyebrow: "Room for an open itinerary", tone: "flexible", defaultTripType: "oneway",
    summary: "Prepare a single journey without a return date, while keeping the rest of your travel plans in view.",
    introduction: "A one-way search suits a trip whose next stage is still taking shape. It can be useful for a separately arranged return or an extended stay, but it does not remove the need to think about onward plans. Start with the journey you know and review the requirements relevant to your circumstances separately.",
    overview: "One-way planning covers a single departure and destination. The search does not send an unused return date to the results page, and you can switch to Round Trip whenever you decide to include the journey home.",
    audience: "For separately arranged return journeys, open itineraries and travelers planning one leg at a time.",
    considerations: [{ title: "Plan the next stage", text: "Keep onward accommodation and transport separate from the single flight search." }, { title: "Read each ticket's terms", text: "Separately booked journeys may have separate conditions; verify them with the actual providers." }, { title: "Leave flexibility deliberately", text: "An open return plan should be a considered choice, not an accidental omission." }],
    faq: [{ question: "Do I need a return date for this guide?", answer: "No. One Way is the default trip type, and the search URL omits the return parameter." }, { question: "Can I switch to a round trip later?", answer: "Yes. Choose Round Trip and supply a return date on or after the departure date." }, { question: "Is a one-way fare always cheaper?", answer: "No price relationship is guaranteed. This directory does not connect to live fares; compare actual provider quotes and terms." }, { question: "Does a one-way search settle entry or onward-travel requirements?", answer: "No. Check current official requirements for your nationality, destination and circumstances. The widget is not an eligibility check." }, { question: "Will moving to another guide clear my dates?", answer: "The widget retains dates, travellers and cabin within this browser session when storage is available. Selecting a route changes the airport context." }],
    routeIds: ["new-york-to-los-angeles", "san-francisco-to-seattle", "miami-to-toronto", "los-angeles-to-london"], relatedIds: ["round-trip-flights", "last-minute-flights", "cheap-domestic-flights", "cheap-international-flights"],
    seoTitle: "One-Way Flight Search & Travel Options", seoDescription: "Prepare a one-way journey with EasyFareBooking. Explore routes, onward planning and fare considerations with no unnecessary return date.",
  },
  {
    id: "family-flight-deals", path: "/deals/family-flight-deals", title: "Family Flight Planning", eyebrow: "Plan around your whole group", tone: "family",
    summary: "Think through the airport journey, bags and pace of travel before choosing an itinerary for a family visit or holiday.",
    introduction: "Family travel becomes easier when the itinerary matches the group's pace. A manageable transfer, time for meals and a less rushed arrival day can matter more than a small difference in departure time. Use route guides to organize your search, then verify seating, baggage and passenger details with the actual booking provider.",
    overview: "This guide covers practical family planning, without advertising family discounts or promising seats together. The existing widget counts travellers aged 12 and above; it is not a complete infant or child booking form.",
    audience: "For families organizing a visit or holiday, especially when airport transfers and day-one plans need to work for several people.",
    considerations: [{ title: "A comfortable travel pace", text: "Allow for meal breaks and a realistic airport-transfer buffer instead of a packed arrival day." }, { title: "Passenger ages and seating", text: "Confirm child or infant arrangements and seating policies with your provider; the demo cannot establish them." }, { title: "Bags and local transport", text: "Review baggage and any equipment needs alongside the transport from the airport." }],
    faq: [{ question: "Does this guide offer a verified family discount?", answer: "No. It is an informational guide and does not display a family promotional fare." }, { question: "Can I enter children and infants in this widget?", answer: "The current traveller control is labeled Age 12+ and supports up to nine travellers. Contact EasyFareBooking for assistance with a family including younger passengers; do not use the demo as a complete booking form." }, { question: "Are seats together guaranteed?", answer: "No. Confirm the relevant seating policy and arrangements with the actual provider before purchase." }, { question: "How should I choose an airport transfer for a family?", answer: "Match the transfer to your luggage, group needs and arrival time, and leave enough room for slower airport progress." }, { question: "Can the search reserve a family itinerary?", answer: "No. It opens demonstration results only. Use the contact page to discuss a real family journey." }],
    routeIds: ["new-york-to-orlando", "chicago-to-miami", "los-angeles-to-new-york", "boston-to-toronto"], relatedIds: ["round-trip-flights", "holiday-flight-deals", "cheap-domestic-flights", "cheap-international-flights"],
    seoTitle: "Family Flight Routes & Travel Planning", seoDescription: "Plan a family journey with EasyFareBooking. Explore routes, airport transfers, passenger considerations and baggage planning without invented family discounts.",
  },
  {
    id: "holiday-flight-deals", path: "/deals/holiday-flight-deals", title: "Holiday Flight Routes & Planning", eyebrow: "Make space for the break", tone: "family",
    summary: "Align flight dates with accommodation, local seasons and the experiences you want from your time away.",
    introduction: "A holiday itinerary works best when the flight supports the stay. Consider how much of the first and last day you can actually use, and compare nearby dates only when the rest of the trip can move with them. Destination guides help you weigh local seasons and activities without promising a particular fare.",
    overview: "Holiday planning connects the journey with the visit: accommodation nights, airport access and the pace of sightseeing. These are planning collections, not active seasonal promotions or limited-time offers.",
    audience: "For leisure trips and seasonal breaks where flights and local plans need to fit together.",
    considerations: [{ title: "Dates beyond the airfare", text: "Look at accommodation, attraction reservations and airport-transfer plans before moving travel dates." }, { title: "Seasonal expectations", text: "Use destination guidance as context, then check conditions closer to departure." }, { title: "Room for changes", text: "Review the terms of each real booking before committing to a fixed holiday plan." }],
    faq: [{ question: "Are these limited-time holiday promotions?", answer: "No. The page presents travel-planning resources, not verified discounts, countdowns or active promotional inventory." }, { question: "Where can I find seasonal destination guidance?", answer: "Follow the destination links on each route guide for local seasons, airport information and things to do." }, { question: "Should I move my flights to a different day?", answer: "Only compare that option alongside accommodation, events and transport. This guide does not guarantee that a different day is cheaper." }, { question: "Can I prepare both one-way and round-trip holiday searches?", answer: "Yes. Choose the trip type in the widget and provide a return date only for Round Trip." }, { question: "Will the search confirm a holiday booking?", answer: "No. Current results are a demo. Real availability, quotes and confirmation require a booking-provider integration or direct assistance." }],
    routeIds: ["new-york-to-orlando", "dallas-to-las-vegas", "chicago-to-paris", "san-francisco-to-tokyo"], relatedIds: ["family-flight-deals", "round-trip-flights", "cheap-international-flights", "cheap-domestic-flights"],
    seoTitle: "Holiday Flight Routes & Seasonal Planning", seoDescription: "Explore holiday flight planning with EasyFareBooking. Connect route options with accommodation dates, destination seasons and practical travel considerations.",
  },
];

export type RouteDeal = {
  slug: string; path: string; fromCity: string; toCity: string; fromCode: string; toCode: string;
  kind: "domestic" | "international"; introduction: string; planningNotes: string[];
  title: string; summary: string; faq: DealFaq[]; seoTitle: string; seoDescription: string;
};
type RouteInput = { slug: string; fromCity: string; toCity: string; fromCode: string; toCode: string; kind: RouteDeal["kind"]; introduction: string; planningNotes: string[] };

const routeEntries: RouteInput[] = [
  { slug: "los-angeles-to-new-york", fromCity: "Los Angeles", toCity: "New York", fromCode: "LAX", toCode: "JFK", kind: "domestic", introduction: "A Los Angeles departure and a New York arrival bring two very different city journeys into one itinerary. Leave room for reaching LAX from your Southern California base, then plan the onward journey from JFK to the borough where you will stay. Avoid treating a late arrival as a full sightseeing day.", planningNotes: ["Compare JFK with other New York-area airports if your accommodation makes them practical.", "Choose any fixed theatre or meeting plans with the full cross-country journey in mind."] },
  { slug: "chicago-to-miami", fromCity: "Chicago", toCity: "Miami", fromCode: "ORD", toCode: "MIA", kind: "domestic", introduction: "A Chicago-to-Miami visit pairs a Midwest departure with South Florida's distinct mainland and beach districts. Use ORD and MIA as the initial airport pair, then consider how your arrival time works with the journey to Miami Beach or your mainland accommodation. A relaxed first afternoon leaves more flexibility.", planningNotes: ["Check whether your Miami plans center on the mainland or the beach before arranging transport.", "Use the Miami guide for heat-aware and weather-flexible sightseeing plans."] },
  { slug: "dallas-to-las-vegas", fromCity: "Dallas", toCity: "Las Vegas", fromCode: "DFW", toCode: "LAS", kind: "domestic", introduction: "For a Dallas-to-Las Vegas trip, start with the plans that cannot move: a performance, meeting or event. Work backward from those commitments, adding the journey to DFW and the transfer from LAS. The search defaults to these airports without implying a particular flight, price or cabin is available.", planningNotes: ["Allow a practical buffer before any prepaid Las Vegas show.", "Plan daytime outdoor activity around the desert conditions for your travel period."] },
  { slug: "atlanta-to-los-angeles", fromCity: "Atlanta", toCity: "Los Angeles", fromCode: "ATL", toCode: "LAX", kind: "domestic", introduction: "An Atlanta-to-Los Angeles itinerary needs room for the airport journey at both ends. Start with ATL and LAX, then choose a Southern California base that matches your visit. A downtown cultural trip and a coastal stay have different onward journeys, so the address matters when comparing arrival times.", planningNotes: ["Keep a distant Los Angeles attraction off a tightly scheduled arrival day.", "Include luggage and ground transport when assessing the whole travel plan."] },
  { slug: "san-francisco-to-seattle", fromCity: "San Francisco", toCity: "Seattle", fromCode: "SFO", toCode: "SEA", kind: "domestic", introduction: "A Bay Area-to-Seattle visit can work as a city break or the start of a wider Pacific Northwest journey. Use SFO and SEA as your starting airport choices, then keep any ferry trip or regional transfer separate from landing-day plans. Pack for city walks rather than assuming identical conditions along the coast.", planningNotes: ["Leave room for Seattle's hills and the journey to your accommodation.", "Check regional transport separately if continuing beyond the city."] },
  { slug: "new-york-to-orlando", fromCity: "New York", toCity: "Orlando", fromCode: "JFK", toCode: "MCO", kind: "domestic", introduction: "A New York-to-Orlando journey often begins a visit with fixed park or family plans. Align the flight dates with those reservations, but leave the arrival day less crowded. This guide begins at JFK and MCO; you can change the New York airport if another choice works better for your starting address.", planningNotes: ["Confirm the MCO-to-hotel journey before scheduling an evening activity.", "The widget is not a complete infant or child booking form; seek assistance for younger passengers."] },
  { slug: "houston-to-denver", fromCity: "Houston", toCity: "Denver", fromCode: "IAH", toCode: "DEN", kind: "domestic", introduction: "For a Houston-to-Denver visit, distinguish a city stay from a onward mountain journey before choosing arrival times. Start with IAH and DEN, then give the onward road or rail trip its own place in the schedule. Flights alone do not establish the timing or conditions of the rest of the journey.", planningNotes: ["Arrange transport beyond DEN around your actual accommodation location.", "If continuing to a mountain destination, check regional conditions and transport independently."] },
  { slug: "boston-to-washington", fromCity: "Boston", toCity: "Washington", fromCode: "BOS", toCode: "DCA", kind: "domestic", introduction: "A Boston-to-Washington trip may revolve around a meeting, a museum visit or time with family. This search starts with BOS and DCA, making the airport pair explicit instead of treating the Washington region as one interchangeable arrival point. Let the address of your main activity guide the onward transport plan.", planningNotes: ["Check the exact Washington-area airport on a real itinerary before arranging pickup.", "Leave time for the BOS journey and arrival transfer before a fixed appointment."] },
  { slug: "new-york-to-london", fromCity: "New York", toCity: "London", fromCode: "JFK", toCode: "LHR", kind: "international", introduction: "A New York-to-London itinerary should be read by calendar date, not just departure time. Begin with JFK and LHR, then make the first London day gentle enough for a long journey. Compare airport-to-hotel transport before adding a fixed West End performance or an early museum reservation.", planningNotes: ["Review the local arrival date on the real provider's itinerary.", "Consider London airport alternatives together with hotel access, not in isolation."] },
  { slug: "los-angeles-to-dubai", fromCity: "Los Angeles", toCity: "Dubai", fromCode: "LAX", toCode: "DXB", kind: "international", introduction: "Los Angeles-to-Dubai planning spans a long journey and a substantial change of daily rhythm. Start with LAX and DXB, but judge actual options by the complete itinerary, including any connection. Choose a Dubai district before planning the onward transfer and leave your first day with room for rest.", planningNotes: ["Verify all local dates before arranging Dubai accommodation.", "Match outdoor plans to seasonal conditions rather than a rigid first-day schedule."] },
  { slug: "chicago-to-paris", fromCity: "Chicago", toCity: "Paris", fromCode: "ORD", toCode: "CDG", kind: "international", introduction: "For Chicago-to-Paris travel, a museum reservation is best planned after you understand the actual arrival. This guide starts with ORD and CDG, allowing you to explore an itinerary before fixing the first afternoon. Your hotel district and airport transfer are useful guides when comparing options for a shorter Paris stay.", planningNotes: ["Keep timed Paris attractions separate from uncertain arrival-day timing.", "Compare CDG with other airport choices only alongside your onward journey."] },
  { slug: "san-francisco-to-tokyo", fromCity: "San Francisco", toCity: "Tokyo", fromCode: "SFO", toCode: "HND", kind: "international", introduction: "A San Francisco-to-Tokyo search begins here with SFO and Haneda. A real itinerary may have a different calendar arrival date, and Tokyo's neighborhood-based travel needs room for the onward airport journey. Choose your hotel district early, then compare the complete trip rather than assuming every Tokyo airport gives the same arrival experience.", planningNotes: ["Consider HND and NRT in the context of your Tokyo hotel and arrival time.", "Keep the first Tokyo day lighter than later neighborhood outings."] },
  { slug: "miami-to-toronto", fromCity: "Miami", toCity: "Toronto", fromCode: "MIA", toCode: "YYZ", kind: "international", introduction: "Miami-to-Toronto travel connects a South Florida departure with a lakeside city whose seasons can call for a different packing plan. Use MIA and YYZ as the initial airport pair, then arrange the onward journey to your Toronto district. The route guide supports planning without establishing border eligibility or flight availability.", planningNotes: ["Review the Toronto forecast before packing for waterfront activities.", "Check current official requirements relevant to your own cross-border journey."] },
  { slug: "dallas-to-frankfurt", fromCity: "Dallas", toCity: "Frankfurt", fromCode: "DFW", toCode: "FRA", kind: "international", introduction: "A Dallas-to-Frankfurt trip can end in the city or continue elsewhere in Germany. This search starts with DFW and FRA. Keep a separately arranged onward train out of a tight arrival window, and read the real itinerary's local dates before fixing accommodation or a meeting in the Rhine-Main region.", planningNotes: ["Allow realistic space before any separately booked rail journey from Frankfurt.", "Verify cabins on each segment if the actual option involves a connection."] },
  { slug: "seattle-to-singapore", fromCity: "Seattle", toCity: "Singapore", fromCode: "SEA", toCode: "SIN", kind: "international", introduction: "Seattle-to-Singapore planning calls for a complete view of the trip rather than a single departure time. Start with SEA and SIN, compare any connecting segments together and give the arrival day room for rest. Singapore's tropical conditions also make a lighter outdoor plan useful after a long journey.", planningNotes: ["Check arrival-day transport from Changi for your actual landing time.", "Balance garden plans with indoor breaks and a rain-ready alternative."] },
  { slug: "boston-to-sydney", fromCity: "Boston", toCity: "Sydney", fromCode: "BOS", toCode: "SYD", kind: "international", introduction: "Boston-to-Sydney travel needs careful calendar planning. Begin with BOS and SYD, then read every segment of a real itinerary before arranging the first accommodation night. Sydney's Southern Hemisphere seasons and the length of the overall journey make a gentle arrival day more useful than a tightly packed sightseeing checklist.", planningNotes: ["Verify the actual arrival date before booking accommodation.", "Allow rest before a coastal walk, and remember that Sydney's seasons differ from Boston's."] },
  { slug: "boston-to-paris", fromCity: "Boston", toCity: "Paris", fromCode: "BOS", toCode: "CDG", kind: "international", introduction: "A Boston-to-Paris trip may be a focused cultural break or part of a longer European itinerary. Start with BOS and CDG, then arrange the first day around your actual arrival and hotel access. Keep museum entries and onward transport flexible until the real journey is confirmed.", planningNotes: ["Group Paris activities by neighborhood rather than filling arrival day with distant stops.", "Check the conditions on any separately arranged onward journey."] },
  { slug: "new-york-to-los-angeles", fromCity: "New York", toCity: "Los Angeles", fromCode: "JFK", toCode: "LAX", kind: "domestic", introduction: "New York-to-Los Angeles planning starts with the part of Southern California you want to experience. JFK and LAX are preselected here, but the journey after landing differs for a beach stay, a downtown visit or a studio-focused outing. Let those local plans inform the arrival time you compare.", planningNotes: ["Choose accommodation near your main Los Angeles activities.", "Allow a flexible road-transfer buffer after landing at LAX."] },
  { slug: "los-angeles-to-london", fromCity: "Los Angeles", toCity: "London", fromCode: "LAX", toCode: "LHR", kind: "international", introduction: "A Los Angeles-to-London journey links a large departure region with a city whose airport transfers deserve separate attention. This search begins at LAX and LHR. Read the actual arrival date, leave the first London afternoon flexible and choose your hotel with its onward connection in mind.", planningNotes: ["Allow time to settle in before a fixed London performance.", "Check every segment's cabin and connection on the real itinerary."] },
  { slug: "san-francisco-to-dubai", fromCity: "San Francisco", toCity: "Dubai", fromCode: "SFO", toCode: "DXB", kind: "international", introduction: "For a San Francisco-to-Dubai itinerary, begin with the dates and the Dubai district where you will stay. SFO and DXB provide the airport starting point, while any real flight option needs to be checked as a complete journey. Give the transfer, time-zone adjustment and first day's activities adequate room.", planningNotes: ["Confirm DXB terminal details against the actual itinerary before arranging pickup.", "Plan a lighter first day before longer outdoor Dubai outings."] },
  { slug: "boston-to-toronto", fromCity: "Boston", toCity: "Toronto", fromCode: "BOS", toCode: "YYZ", kind: "international", introduction: "A Boston-to-Toronto visit still calls for cross-border planning even when the cities fit a shorter break. This guide starts with BOS and YYZ, then leaves room for your Toronto neighborhood and airport transfer. Coordinate fixed meetings or event times with the complete journey rather than departure alone.", planningNotes: ["Check the actual YYZ-to-accommodation journey for your arrival time.", "Keep seasonal conditions in view when planning waterfront walks or connections."] },
  { slug: "seattle-to-tokyo", fromCity: "Seattle", toCity: "Tokyo", fromCode: "SEA", toCode: "HND", kind: "international", introduction: "Seattle-to-Tokyo planning is easier when the airport journey and first neighborhood are considered together. This search begins with SEA and HND. Compare any alternative Tokyo airport with your hotel district and read the actual arrival date before committing to day-one reservations.", planningNotes: ["Leave time to rest before an ambitious Tokyo neighborhood itinerary.", "Check onward transport if the real arrival is late in the day."] },
  { slug: "houston-to-singapore", fromCity: "Houston", toCity: "Singapore", fromCode: "IAH", toCode: "SIN", kind: "international", introduction: "Houston-to-Singapore travel requires a full-itinerary comparison, with connecting time and calendar dates read together. Start from IAH and SIN, then give the final airport transfer and arrival-day recovery space in your plans. A route listing alone does not establish a direct service or a particular cabin product.", planningNotes: ["Check all connecting segments and any transfer requirements with the actual provider.", "Keep the first Singapore day flexible for rest and tropical weather."] },
];

export const routeDeals: RouteDeal[] = routeEntries.map((route) => ({
  ...route, path: `/deals/routes/${route.slug}`,
  title: `${route.fromCity} to ${route.toCity} Flight Planning`,
  summary: route.planningNotes[0],
  seoTitle: `${route.fromCity} to ${route.toCity} Flight Options`,
  seoDescription: `Plan ${route.fromCity} to ${route.toCity} travel with EasyFareBooking. Start with ${route.fromCode} and ${route.toCode}, review local planning tips and prepare your search.`,
  faq: [
    { question: `Which airports does this ${route.fromCity} to ${route.toCity} search use?`, answer: `The widget starts with ${route.fromCode} for ${route.fromCity} and ${route.toCode} for ${route.toCity}. Both selections can be changed using the existing airport autocomplete.` },
    { question: `Does this guide confirm a direct ${route.fromCity} to ${route.toCity} flight?`, answer: "No. It is an informational city-pair guide, not a service schedule. A real provider must confirm flights, connections, cabins and availability for your dates." },
    { question: `What should I consider on arrival in ${route.toCity}?`, answer: route.planningNotes.join(" ") },
    { question: `Can I prepare a one-way or round-trip search from ${route.fromCode} to ${route.toCode}?`, answer: `Yes. Choose the trip type in the widget. A one-way ${route.fromCode} to ${route.toCode} search needs no return date; a round trip requires a return date on or after departure.` },
    { question: `Are the fares for ${route.fromCity} to ${route.toCity} live?`, answer: `No live ${route.fromCode}–${route.toCode} quote is shown here. The results page contains labeled demo data and does not reserve a ticket. Contact EasyFareBooking for real itinerary assistance.` },
  ],
}));

export const getDealCategory = (id: string) => dealCategories.find((category) => category.id === id);
export const getRouteDeal = (slug: string) => routeDeals.find((route) => route.slug === slug);
export const categoryRoutes = (category: DealCategory) => routeDeals.filter((route) => category.routeIds.includes(route.slug));
export const relatedCategories = (category: DealCategory) => dealCategories.filter((item) => category.relatedIds.includes(item.id));
export const categoryRedirects = dealCategories.filter((category) => category.alias).map((category) => ({ source: category.alias!, destination: category.path, permanent: true as const }));
export const destinationDealLinks = (city: string) => {
  const routes = routeDeals.filter((route) => route.toCity === city || route.fromCity === city).slice(0, 3);
  return routes;
};

export const dealsFaq: DealFaq[] = [
  { question: "Are these cards active promotions or live fare offers?", answer: "No. They are flight-planning categories and route guides. There is no live pricing or inventory feed, and no verified discount is advertised." },
  { question: "What happens when I select Search Flights?", answer: "The widget validates your airports and dates, then opens the existing flight results experience. Those results are explicitly labeled demos and cannot reserve flights." },
  { question: "How do the category guides differ?", answer: "Domestic and international guides focus on geography, one-way and round-trip guides on trip structure, premium guides on cabin verification, and family or holiday guides on practical planning." },
  { question: "Can I keep my search choices while exploring guides?", answer: "Yes. Dates, travellers and cabin are kept in this browser session when storage is available. Route guides set their airport pair; one-way and round-trip guides set the appropriate trip type." },
  { question: "Where can I get assistance with a real journey?", answer: "Contact EasyFareBooking with your route, dates and passenger needs. Real fares, conditions and availability must be confirmed through a booking provider." },
];

export const flightPlanningTips = [
  { title: "Flexible dates", text: "Compare nearby dates only when accommodation, events and onward travel can move too. No particular day guarantees a lower fare." },
  { title: "Alternative airports", text: "Compare the complete airport-to-destination journey, including transport costs and practical arrival times." },
  { title: "Connecting journeys", text: "Read the whole itinerary and leave realistic transfer time. Confirm the implications of separately booked segments." },
  { title: "Baggage needs", text: "Check the actual fare's baggage and equipment conditions before purchase instead of assuming an allowance from the cabin name." },
  { title: "Fare rules", text: "Review the provider's change and cancellation conditions. The demo results do not establish any ticket rights or included services." },
];
