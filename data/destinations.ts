export type DestinationAirport = { code: string; name: string; description: string; source: string };
export type Destination = {
  slug: string;
  city: string;
  country: string;
  airportCodes: string[];
  airportNames: string[];
  heroTitle: string;
  heroDescription: string;
  introduction: string;
  flightTips: string[];
  bestTimeToVisit: string;
  travelSeasons: { name: string; description: string }[];
  popularRoutes: { city: string; code: string }[];
  airports: DestinationAirport[];
  thingsToDo: { title: string; description: string }[];
  travelTips: string[];
  faq: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
};

type DestinationInput = {
  slug: string; city: string; country: string; summary: string; introduction: string;
  airports: DestinationAirport[]; bestTime: string; seasons: [string, string, string, string];
  routes: [string, string][]; highlights: [string, string][]; tips: string[]; flightTips: string[];
};
const airport = (code: string, name: string, description: string, source: string): DestinationAirport => ({ code, name, description, source });

// Editorial content lives here. Add one object to extend the directory, routes,
// metadata, related cards and sitemap; no new page component is needed.
const entries: DestinationInput[] = [
  {
    slug: "new-york", city: "New York", country: "United States",
    summary: "From Broadway evenings to quiet museum mornings, plan a New York visit around the neighborhoods you want to explore.",
    introduction: "New York rewards a little planning: a Brooklyn waterfront walk, an Upper West Side museum and a downtown dinner can fill very different days. Choose your arrival airport alongside your hotel location, rather than treating every New York airport as interchangeable. Leave room in your itinerary for the boroughs beyond Manhattan.",
    airports: [airport("JFK", "John F. Kennedy International Airport", "An airport option in Queens; compare the onward journey to your hotel before selecting a flight.", "https://www.panynj.gov/airports/en/index.html"), airport("LGA", "LaGuardia Airport", "Also in Queens. Check ground transportation for your exact destination in the city.", "https://www.panynj.gov/airports/en/index.html"), airport("EWR", "Newark Liberty International Airport", "Located in New Jersey and serving the New York metropolitan area; useful to consider for stays on either side of the Hudson.", "https://www.panynj.gov/airports/en/index.html")],
    bestTime: "Spring and autumn suit long neighborhood walks. Summer brings outdoor events and heat; winter offers indoor culture and holiday atmosphere, with colder conditions.",
    seasons: ["Spring: park walks and changeable temperatures; bring a light layer.", "Summer: longer sightseeing days, with humidity and busy holiday weekends.", "Autumn: comfortable walking weather can make borough hopping appealing.", "Winter: focus on museums and theatre, allowing flexibility for wintry weather."],
    routes: [["Los Angeles", "LAX"], ["Miami", "MIA"], ["Chicago", "ORD"], ["San Francisco", "SFO"]],
    highlights: [["Central Park", "Trade busy avenues for winding paths, lakeside views and an unhurried picnic."], ["Broadway", "Build an evening around a performance and check the theatre location before choosing dinner."], ["Brooklyn Bridge", "Walk the span for skyline perspectives, then explore the waterfront on the Brooklyn side."], ["Museum Mile", "Choose a collection that interests you rather than trying to fit every museum into one day."]],
    tips: ["Group sights by neighborhood to reduce cross-city journeys.", "Compare hotel access from JFK, LGA and EWR before booking.", "Reserve theatre tickets for the date you can comfortably reach Manhattan.", "Keep a warmer layer for waterfront walks outside midsummer."],
    flightTips: ["Compare all three major area airports alongside transfer costs.", "Allow enough arrival-day time before a fixed Broadway reservation.", "Try nearby dates around school breaks and major holiday periods."],
  },
  {
    slug: "los-angeles", city: "Los Angeles", country: "United States",
    summary: "Pair Southern California beaches with film history, hillside views and neighborhoods that each deserve their own day.",
    introduction: "Los Angeles spreads its experiences across a large region. A beach morning in Santa Monica, gallery visits downtown and a studio-focused day are easier to enjoy when your accommodation matches your priorities. Think about the journey from LAX and between neighborhoods when comparing flight arrival times.",
    airports: [airport("LAX", "Los Angeles International Airport", "A major gateway to the Los Angeles area. Plan ground transportation to your chosen neighborhood before arrival.", "https://www.lawa.org/lawa-governance/about-lawa")],
    bestTime: "Spring and autumn can suit a mix of city walks and coastal outings. Summer is lively at the beaches, while winter can bring rain and cooler evenings.",
    seasons: ["Spring: combine gardens and outdoor sightseeing with a flexible coastal day.", "Summer: beach areas are busy; leave more time for road travel.", "Autumn: plan neighborhood exploring and carry a layer after sunset.", "Winter: add museums or studio visits as alternatives to rainy outdoor plans."],
    routes: [["New York", "JFK"], ["Chicago", "ORD"], ["San Francisco", "SFO"], ["Seattle", "SEA"]],
    highlights: [["Griffith Park", "Make time for hillside scenery and views across the city."], ["Santa Monica", "Combine a promenade walk with a relaxed beach afternoon."], ["The Getty Center", "Balance art collections with architecture and garden spaces."], ["Downtown Los Angeles", "Explore distinct cultural venues and historic streets without rushing between districts."]],
    tips: ["Stay near the activities you care about most.", "Build road-traffic flexibility into each day.", "Check studio-tour requirements before setting your flight dates.", "Pack a light layer even when the daytime forecast is warm."],
    flightTips: ["Choose an arrival time that leaves room for the LAX transfer.", "Compare the full trip cost including local transport.", "Avoid packing a distant timed attraction into your arrival afternoon."],
  },
  {
    slug: "san-francisco", city: "San Francisco", country: "United States",
    summary: "Discover a compact city of steep streets, waterfront walks and distinct neighborhoods at the edge of the Bay.",
    introduction: "San Francisco mixes urban exploring with waterside scenery: a day may move from a neighborhood café to the Embarcadero and a hilltop lookout. The city's slopes and shifting coastal weather matter as much as your sightseeing list. Choose flights to SFO with time to settle in before your first long walk.",
    airports: [airport("SFO", "San Francisco International Airport", "A gateway to San Francisco and the wider Bay Area. Review the airport's ground transportation information for your stay.", "https://www.flysfo.com/")],
    bestTime: "Autumn often suits outdoor city exploring. Spring offers another option for neighborhood walks; summer coastal fog can make layers useful even on a California holiday.",
    seasons: ["Spring: plan waterfront walks with a wind-resistant outer layer.", "Summer: expect cool coastal conditions to differ from inland temperatures.", "Autumn: combine neighborhood sightseeing with a flexible Bay outing.", "Winter: keep indoor museum plans ready for wet days."],
    routes: [["Los Angeles", "LAX"], ["New York", "JFK"], ["Chicago", "ORD"], ["Seattle", "SEA"]],
    highlights: [["Golden Gate Bridge", "Pick a viewpoint or walking route and allow for wind and fog."], ["Embarcadero", "Follow the waterfront for bay views and food stops."], ["Golden Gate Park", "Set aside time for gardens and cultural attractions rather than a quick drive-through."], ["Neighborhood walks", "Explore areas such as North Beach and the Mission on separate, unhurried outings."]],
    tips: ["Bring layers for changing Bay weather.", "Plan walking routes with hills in mind.", "Reserve any island excursion before your visit.", "Check transit options before deciding whether you need a car."],
    flightTips: ["Keep transfer time from SFO separate from sightseeing time.", "Compare dates around conventions and major holiday weekends.", "Review baggage needs if combining the city with a longer California trip."],
  },
  {
    slug: "orlando", city: "Orlando", country: "United States",
    summary: "Plan Central Florida days around theme parks, lakeside breaks and a pace that works for the whole family.",
    introduction: "Orlando trips often revolve around a handful of full park days, but the spaces between them matter. A restful arrival afternoon and a slower day exploring gardens or downtown can make a family itinerary easier. Match your MCO arrival to your accommodation transfer, and confirm park plans independently of your flight search.",
    airports: [airport("MCO", "Orlando International Airport", "An airport serving Orlando and Central Florida. Confirm the transfer arrangements for your resort or hotel.", "https://flymco.com/")],
    bestTime: "Cooler months can make outdoor park days more comfortable. School holidays draw families, and summer heat and showers call for more breaks and flexible plans.",
    seasons: ["Spring: check school-break dates when planning park visits.", "Summer: schedule shade, water breaks and alternatives for afternoon showers.", "Autumn: allow weather flexibility and check seasonal park event dates.", "Winter: pack a layer for early starts and cooler evening shows."],
    routes: [["New York", "JFK"], ["Chicago", "ORD"], ["Boston", "BOS"], ["Atlanta", "ATL"]],
    highlights: [["Theme park days", "Pick the experiences that fit your group and allow recovery time between busy days."], ["Lake Eola", "Add a downtown lakeside stroll to balance your attraction schedule."], ["Winter Park", "Explore leafy streets and a different side of the Orlando area."], ["Local gardens", "Choose a gentler outdoor outing when your group needs a break from queues."]],
    tips: ["Check park tickets and reservations separately from flights.", "Confirm hotel-to-park transport before choosing where to stay.", "Carry sun protection and a compact rain layer.", "Avoid a full park day immediately after a tiring flight."],
    flightTips: ["Compare flight dates against your park-ticket dates.", "Include checked-bag and family transfer costs in your budget.", "Allow a relaxed buffer between landing at MCO and evening plans."],
  },
  {
    slug: "london", city: "London", country: "United Kingdom",
    summary: "Build a London itinerary around museum collections, riverside walks and an evening in the West End.",
    introduction: "London's appeal lies in the mix: historic streets sit beside contemporary galleries, and a Thames walk can connect very different neighborhoods. Heathrow and Gatwick offer different starting points for your onward journey. Compare the airport transfer to your accommodation before committing to a flight, especially for a short visit.",
    airports: [airport("LHR", "London Heathrow Airport", "An airport west of central London; review rail, Tube, coach and road options for your hotel.", "https://www.heathrow.com/"), airport("LGW", "London Gatwick Airport", "An airport south of London. Check train or road connections alongside your arrival time.", "https://www.gatwickairport.com/")],
    bestTime: "Spring and early autumn suit long sightseeing walks. Summer offers more daylight, while winter encourages museum visits and theatre evenings with shorter outdoor days.",
    seasons: ["Spring: enjoy parks as the days lengthen, with rainwear close at hand.", "Summer: use the longer evenings for Thames walks and outdoor plans.", "Autumn: alternate neighborhood walks with indoor cultural stops.", "Winter: keep daylight in mind and plan museums or theatre after dark."],
    routes: [["New York", "JFK"], ["Los Angeles", "LAX"], ["Boston", "BOS"], ["Toronto", "YYZ"]],
    highlights: [["West End", "Choose a show and make an evening of the surrounding theatre district."], ["South Bank", "Follow the river between cultural venues and skyline viewpoints."], ["London's museums", "Select collections around your interests and confirm admission arrangements."], ["Historic Westminster", "Explore landmarks on foot while allowing time for security and ticketed visits."]],
    tips: ["Plan your airport-to-hotel journey before landing.", "Carry a small rain layer for walking days.", "Book a performance that leaves time after your arrival.", "Check opening hours before combining several museums."],
    flightTips: ["Compare LHR and LGW together with onward travel costs.", "Leave room for the time-zone adjustment on your first day.", "Try dates outside major school breaks when your plans allow."],
  },
  {
    slug: "paris", city: "Paris", country: "France",
    summary: "Make room for art, neighborhood cafés and long walks along the Seine in a thoughtfully paced Paris trip.",
    introduction: "Paris is easier to enjoy when you resist fitting every landmark into one afternoon. A museum visit, a walk through the Marais and a dinner on the Left Bank each deserve space. Compare flights to Charles de Gaulle and Orly with your accommodation and transfer plans, then build your days around a few carefully chosen experiences.",
    airports: [airport("CDG", "Paris Charles de Gaulle Airport", "An airport serving the Paris region. Check your terminal and onward transportation before arrival.", "https://www.parisaeroport.fr/en"), airport("ORY", "Paris Orly Airport", "Another airport serving Paris; compare the journey to your accommodation before choosing an itinerary.", "https://www.parisaeroport.fr/en")],
    bestTime: "Spring and autumn work well for neighborhood walks. Summer offers long evenings but busy visitor periods; winter is appealing for travelers focused on galleries and cafés.",
    seasons: ["Spring: combine gardens with museum visits and prepare for showers.", "Summer: plan popular landmarks ahead and leave time for evening walks.", "Autumn: take a slower approach to neighborhoods and seasonal dining.", "Winter: keep outdoor days shorter and warm up in galleries or cafés."],
    routes: [["New York", "JFK"], ["Los Angeles", "LAX"], ["London", "LHR"], ["Toronto", "YYZ"]],
    highlights: [["The Louvre", "Choose a manageable route through the collection and confirm ticket requirements."], ["Seine riverbanks", "Follow the water for changing views of bridges and monuments."], ["Montmartre", "Explore hillside streets with comfortable shoes and time for slower climbs."], ["The Marais", "Mix smaller cultural stops with neighborhood dining and browsing."]],
    tips: ["Reserve timed museum entries before fixing a busy daily itinerary.", "Check the airport and terminal on both halves of your trip.", "Group activities by arrondissement to reduce transit time.", "Leave room for meals rather than treating them as quick breaks."],
    flightTips: ["Compare CDG and ORY with the transfer to your hotel.", "Avoid a non-refundable timed attraction immediately after landing.", "Consider flexible departure days around public holidays."],
  },
  {
    slug: "tokyo", city: "Tokyo", country: "Japan",
    summary: "Move between temple streets, contemporary neighborhoods and local food stops using Tokyo's extensive rail network.",
    introduction: "Tokyo offers many cities within one: Asakusa's temple surroundings, Shibuya's busy streets and quieter residential corners create very different days. Haneda and Narita require different airport journeys, so your hotel district and arrival time are useful guides when selecting flights. Start with a few neighborhoods rather than a citywide checklist.",
    airports: [airport("HND", "Tokyo Haneda Airport", "An airport serving Tokyo. Review terminal-specific rail, bus and road information for your onward journey.", "https://tokyo-haneda.com/en/"), airport("NRT", "Narita International Airport", "An airport in the wider Tokyo region; account for the onward journey when comparing itineraries.", "https://www.narita-airport.jp/en/")],
    bestTime: "Spring and autumn suit neighborhood exploring, although blossom and holiday periods can be busy. Summer is humid; winter often lends itself to food, galleries and shorter outdoor walks.",
    seasons: ["Spring: blossom timing varies, so keep park plans flexible.", "Summer: plan breaks from humidity and carry water on walking days.", "Autumn: combine gardens and neighborhood outings with cooler evenings.", "Winter: balance outdoor sightseeing with warm indoor stops."],
    routes: [["Los Angeles", "LAX"], ["San Francisco", "SFO"], ["Seattle", "SEA"], ["Singapore", "SIN"]],
    highlights: [["Asakusa", "Explore temple surroundings and nearby streets at an unhurried pace."], ["Shibuya", "See a lively side of the city and use the district as a starting point for exploring."], ["Ueno", "Combine park time with a museum collection that interests you."], ["Neighborhood dining", "Leave time for small local restaurants instead of only landmark stops."]],
    tips: ["Choose accommodation near a station useful for your itinerary.", "Check the last onward connection if landing late.", "Pack light enough for station transfers.", "Avoid an ambitious first day after a long-haul flight."],
    flightTips: ["Compare HND and NRT together with hotel transfer time.", "Check busy holiday periods before selecting dates.", "Allow space for jet lag before timed activities."],
  },
  {
    slug: "hong-kong", city: "Hong Kong", country: "Hong Kong",
    summary: "Explore both sides of Victoria Harbour, from Kowloon's streets to hillside views on Hong Kong Island.",
    introduction: "Hong Kong combines dense city life with waterfront space and green hills. A ferry ride can connect a Kowloon outing with Hong Kong Island, while another day can focus on markets or a coastal walk. Plan the journey from HKG around your hotel district and keep weather flexibility for outdoor viewpoints.",
    airports: [airport("HKG", "Hong Kong International Airport", "The airport serving Hong Kong. Check current rail, bus and road options for your hotel district.", "https://www.hongkongairport.com/")],
    bestTime: "Autumn and parts of winter can be comfortable for outdoor sightseeing. Summer brings heat, humidity and potential storm disruption, making flexible plans useful.",
    seasons: ["Spring: prepare for humidity and changing visibility at viewpoints.", "Summer: mix outdoor plans with museums and weather-aware alternatives.", "Autumn: consider harbour walks and hills when conditions suit.", "Winter: bring a layer for cooler waterfront evenings."],
    routes: [["San Francisco", "SFO"], ["Los Angeles", "LAX"], ["London", "LHR"], ["Tokyo", "HND"]],
    highlights: [["Victoria Harbour", "Enjoy the skyline from waterfront paths on both sides of the harbour."], ["The Peak", "Choose a clear-weather day for hillside views and surrounding walks."], ["Kowloon neighborhoods", "Explore food stops and street life beyond a single shopping district."], ["Outlying islands", "Keep a flexible day for a ferry excursion and a slower pace."]],
    tips: ["Choose your hotel with harbour crossings in mind.", "Check weather advisories before outdoor or ferry outings.", "Allow extra time when navigating busy districts with luggage.", "Keep a lightweight rain layer for humid periods."],
    flightTips: ["Check late-arrival transportation from HKG.", "Allow flexibility during periods of severe weather.", "Compare flight times against the first day's planned activities."],
  },
  {
    slug: "boston", city: "Boston", country: "United States",
    summary: "Combine New England history, harbor scenery and university neighborhoods in a walkable city break.",
    introduction: "Boston makes a strong base for travelers who like exploring on foot. Historic downtown streets, the harbor and nearby Cambridge offer different perspectives without requiring a packed schedule. Flights into Logan can start a city break or a longer New England journey; choose arrival times with your onward plans in mind.",
    airports: [airport("BOS", "Boston Logan International Airport", "An airport serving Boston and New England. Review ground transportation for downtown, Cambridge or your onward destination.", "https://www.massport.com/logan-airport")],
    bestTime: "Late spring and autumn appeal to travelers planning walks through historic districts. Summer brings waterfront activity, while winter requires warmer layers and weather flexibility.",
    seasons: ["Spring: enjoy parks as temperatures rise, with rainwear available.", "Summer: make room for harbor outings and shaded breaks.", "Autumn: pair neighborhood walks with a wider New England itinerary.", "Winter: plan museums and warm indoor stops between shorter walks."],
    routes: [["New York", "JFK"], ["Los Angeles", "LAX"], ["Chicago", "ORD"], ["Orlando", "MCO"]],
    highlights: [["Freedom Trail", "Follow sections of the historic route at a pace that leaves time for individual sites."], ["Boston Harbor", "Explore the waterfront and check seasonal options for a boat outing."], ["Cambridge", "Make a separate outing of university surroundings and neighborhood cafés."], ["Public Garden", "Add a quieter green-space stop between downtown visits."]],
    tips: ["Wear shoes suited to uneven historic streets.", "Keep arrival-day plans close to your accommodation.", "Allow extra room in autumn if continuing around New England.", "Check seasonal hours for harbor excursions."],
    flightTips: ["Compare BOS arrival times with your onward New England transport.", "Look beyond graduation and major holiday dates if flexible.", "Leave buffer time for winter weather."],
  },
  {
    slug: "dubai", city: "Dubai", country: "United Arab Emirates", summary: "Balance modern waterfront districts with creek-side heritage and time out of the desert heat.",
    introduction: "Dubai's scale makes location important: the Creek, Downtown and the Marina create different bases for a visit. Split your days between heritage streets, contemporary architecture and relaxed waterside evenings rather than crossing the city repeatedly.",
    airports: [airport("DXB", "Dubai International Airport", "Check the terminal on your itinerary and arrange onward travel to your chosen Dubai district.", "https://dubaiairports.ae/")],
    bestTime: "The cooler part of the year suits outdoor walks. Summer calls for indoor alternatives and careful timing of activities in the heat.",
    seasons: ["Spring: move longer walks to cooler parts of the day.", "Summer: prioritize indoor visits and limit midday exposure.", "Autumn: adjust outdoor plans as temperatures become more comfortable.", "Winter: plan creek-side and waterfront outings."], routes: [["London", "LHR"], ["New York", "JFK"], ["Singapore", "SIN"]],
    highlights: [["Dubai Creek", "Explore older trading districts on either side of the water."], ["Downtown Dubai", "Set aside time for modern architecture and urban promenades."], ["Dubai Marina", "Choose an evening walk beside the waterfront."]],
    tips: ["Pick a hotel district that matches your itinerary.", "Carry water and plan shade breaks.", "Check venue dress guidance before visiting cultural sites."], flightTips: ["Confirm DXB terminal details before arranging pickup.", "Factor the hotel journey into late-night arrivals."]
  },
  {
    slug: "singapore", city: "Singapore", country: "Singapore", summary: "Connect garden spaces, hawker food and historic districts in a compact tropical city itinerary.",
    introduction: "Singapore offers an easy mix of green space and urban exploring. Build each day around a district and leave time for food stops, while balancing outdoor gardens with indoor breaks from tropical heat and rain.",
    airports: [airport("SIN", "Singapore Changi Airport", "Review your terminal and onward transport before continuing into Singapore.", "https://www.changiairport.com/")],
    bestTime: "Singapore is warm year-round. Instead of relying on a cool season, plan around showers, your preferred events and indoor alternatives.",
    seasons: ["January–March: allow flexibility for tropical showers.", "April–June: plan shaded breaks during outdoor days.", "July–September: combine gardens with indoor cultural visits.", "October–December: keep rain-friendly alternatives ready."], routes: [["Tokyo", "HND"], ["Hong Kong", "HKG"], ["London", "LHR"]],
    highlights: [["Gardens by the Bay", "Explore distinctive garden landscapes and confirm entry arrangements."], ["Chinatown", "Combine neighborhood history with food stops."], ["Botanic Gardens", "Reserve a slower morning for leafy paths."]],
    tips: ["Pack a compact umbrella.", "Group visits around convenient transport connections.", "Leave time for hawker meals between attractions."], flightTips: ["Leave time for rest after an overnight flight.", "Check terminal details if arranging an airport meeting."]
  },
  {
    slug: "toronto", city: "Toronto", country: "Canada", summary: "Explore lakeside paths, neighborhood food scenes and cultural stops in Canada's largest urban region.",
    introduction: "Toronto works well as a collection of neighborhood days. Combine waterfront time with markets and galleries, and keep any trip beyond the city separate from your arrival schedule. Pearson is a practical airport to consider when planning your onward journey.",
    airports: [airport("YYZ", "Toronto Pearson International Airport", "Review ground transportation between Pearson and your accommodation in the Toronto area.", "https://www.torontopearson.com/en")],
    bestTime: "Late spring through early autumn suits waterfront outings. Winter offers indoor culture but asks for warm clothing and a flexible travel schedule.",
    seasons: ["Spring: prepare for variable temperatures by the lake.", "Summer: use longer days for waterfront exploring.", "Autumn: mix neighborhood walks with indoor galleries.", "Winter: plan shorter walks and warm cultural stops."], routes: [["New York", "JFK"], ["London", "LHR"], ["Los Angeles", "LAX"]],
    highlights: [["Toronto waterfront", "Follow lakeside paths for a change of pace from downtown."], ["St. Lawrence Market", "Make a food-focused stop part of your city walk."], ["Distinct neighborhoods", "Explore a different district rather than staying around one landmark."]],
    tips: ["Check the forecast before lakefront outings.", "Choose lodging with useful transit connections.", "Keep any regional day trip off your arrival day."], flightTips: ["Include winter weather buffers in connecting plans.", "Check the transfer from YYZ to your exact district."]
  },
  {
    slug: "frankfurt", city: "Frankfurt", country: "Germany", summary: "Pair a modern skyline with riverside walks, museums and historic squares beside the Main.",
    introduction: "Frankfurt is more than a transfer point. A stay can connect the museum-lined riverbank, reconstructed historic streets and modern commercial districts. If using the city as a base for regional travel, make the airport and onward rail journey part of your planning.",
    airports: [airport("FRA", "Frankfurt Airport", "Check terminal and onward rail or road details for a city stay or a wider German itinerary.", "https://www.frankfurt-airport.com/en.html")],
    bestTime: "Spring and autumn lend themselves to river walks. Summer brings outdoor dining, while winter suits museums and seasonal city visits.",
    seasons: ["Spring: explore the Main riverbanks with layers.", "Summer: allow time for outdoor dining and parks.", "Autumn: combine museum days with neighborhood walks.", "Winter: balance short outdoor visits with indoor culture."], routes: [["New York", "JFK"], ["London", "LHR"], ["Toronto", "YYZ"]],
    highlights: [["Römerberg", "Explore the historic square and surrounding streets."], ["Museum riverbank", "Select one or two collections rather than rushing through many."], ["Main riverside", "See the contrast between the skyline and quieter waterside paths."]],
    tips: ["Confirm trade-fair dates when planning accommodation.", "Keep a city visit separate from a tight connection.", "Check onward train arrangements independently."], flightTips: ["Allow realistic airport time before a separately booked train.", "Review terminal information for FRA connections."]
  },
  {
    slug: "sydney", city: "Sydney", country: "Australia", summary: "Build a harbor-centered visit with coastal walks, ferry outings and relaxed neighborhood stops.",
    introduction: "Sydney combines a working harbor with easy opportunities to spend time outdoors. Rather than fitting every beach into one trip, pick a coastal area and balance it with city culture. A long-haul arrival deserves a gentle first day before ambitious walks.",
    airports: [airport("SYD", "Sydney Airport", "Confirm your arrival terminal and onward transport to your accommodation.", "https://www.sydneyairport.com.au/")],
    bestTime: "Spring and autumn in the Southern Hemisphere suit mixed city and coastal plans. Summer is lively by the water; winter can still work for culture and shorter outdoor outings.",
    seasons: ["December–February: summer beach days call for sun protection.", "March–May: autumn suits coastal walks with flexible layers.", "June–August: winter plans can mix museums and harbor views.", "September–November: spring brings more options for outdoor days."], routes: [["Los Angeles", "LAX"], ["Singapore", "SIN"], ["Tokyo", "HND"]],
    highlights: [["Sydney Harbour", "Use waterfront walks to see the city from several angles."], ["Opera House surroundings", "Explore the harbor setting and check performance options separately."], ["Coastal paths", "Choose a manageable section and take water and sun protection."]],
    tips: ["Remember that Australian seasons differ from the Northern Hemisphere.", "Plan a light first day after a long flight.", "Check ferry and coastal weather conditions before outings."], flightTips: ["Check the calendar arrival date on long-haul itineraries.", "Leave jet-lag recovery time before fixed activities."]
  },
  {
    slug: "miami", city: "Miami", country: "United States", summary: "Connect beach time with Cuban-influenced neighborhoods, contemporary art and a tropical waterfront setting.",
    introduction: "Miami and Miami Beach offer distinct bases for a visit. Choose between a beach-focused stay and easier access to mainland neighborhoods, then allow time for the journeys between them. Keep outdoor plans flexible during humid and storm-prone periods.",
    airports: [airport("MIA", "Miami International Airport", "Review ground transport to mainland Miami or Miami Beach for your exact arrival time.", "https://www.miami-airport.com/")],
    bestTime: "The cooler months often suit outdoor exploring. Summer brings heat and more need for weather-aware plans and indoor breaks.", seasons: ["Spring: combine neighborhood walks with beach time.", "Summer: build in shade and alternatives for storms.", "Autumn: check weather advisories before outdoor outings.", "Winter: plan waterfront days with a layer for evenings."], routes: [["New York", "JFK"], ["Chicago", "ORD"], ["Los Angeles", "LAX"]],
    highlights: [["Little Havana", "Explore food and street life with time to pause."], ["Wynwood", "Combine public art with gallery and café stops."], ["Miami Beach", "Make a separate outing of coastal walks and Art Deco streets."]],
    tips: ["Choose accommodation on the side of the bay that fits your plans.", "Pack sun protection and rainwear.", "Allow extra road-travel time between Miami and the beach."], flightTips: ["Compare flight times with beach-hotel transfer arrangements.", "Keep weather flexibility for summer travel."]
  },
  {
    slug: "las-vegas", city: "Las Vegas", country: "United States", summary: "Plan desert-city evenings around performances, dining and the neighborhoods beyond the Strip.",
    introduction: "Las Vegas visits can be as focused as a show weekend or as broad as a desert-region itinerary. The Strip's scale means walks may be longer than they look on a map. Choose your hotel and fixed evening plans before comparing arrival times.",
    airports: [airport("LAS", "Harry Reid International Airport", "An airport serving Las Vegas; check the correct terminal and designated ground transportation areas.", "https://www.harryreidairport.com/")],
    bestTime: "Spring and autumn generally lend themselves to outdoor walks. Summer heat calls for indoor daytime plans; winter evenings can be cool.", seasons: ["Spring: plan outdoor time with sun protection.", "Summer: reduce midday walking in desert heat.", "Autumn: combine city evenings with flexible outdoor outings.", "Winter: take a warm layer for evenings."], routes: [["Los Angeles", "LAX"], ["New York", "JFK"], ["Chicago", "ORD"]],
    highlights: [["Live performances", "Choose a show that suits your trip and confirm its schedule."], ["Downtown Las Vegas", "Explore a different district from the resort corridor."], ["Desert scenery", "Plan an outing with appropriate water, transport and weather checks."]],
    tips: ["Measure walking distances before a timed show.", "Check hotel fees independently of airfare.", "Carry water on outdoor days."], flightTips: ["Leave a buffer before prepaid evening performances.", "Check convention dates when choosing travel days."]
  },
  {
    slug: "chicago", city: "Chicago", country: "United States", summary: "Explore lakefront paths, architectural streetscapes and neighborhood dining around the city on Lake Michigan.",
    introduction: "Chicago offers a strong mix of urban architecture and open waterfront. Choose a hotel that makes your preferred neighborhoods easy to reach, and compare O'Hare with Midway using the full journey to your accommodation.",
    airports: [airport("ORD", "Chicago O'Hare International Airport", "An airport option for Chicago; check transit or road connections to your chosen neighborhood.", "https://www.flychicago.com/ohare/home/pages/default.aspx"), airport("MDW", "Chicago Midway International Airport", "A second Chicago airport option with a different location and onward journey.", "https://www.flychicago.com/midway/home/pages/default.aspx")],
    bestTime: "Late spring to early autumn suits lakefront activities. Winter is a different experience, with colder weather and more indoor cultural plans.", seasons: ["Spring: take layers for changing lakefront weather.", "Summer: mix outdoor waterfront days with museums.", "Autumn: explore neighborhoods before colder evenings.", "Winter: build weather buffers around flight and walking plans."], routes: [["New York", "JFK"], ["Los Angeles", "LAX"], ["Orlando", "MCO"]],
    highlights: [["Chicago River", "Explore architecture from riverside paths or a separately booked excursion."], ["Millennium Park", "Add public art and open space to a downtown walk."], ["Lakefront", "Choose a section of waterfront for an unhurried outing."]],
    tips: ["Compare ORD and MDW with your hotel location.", "Bring wind-resistant layers near the lake.", "Group activities by neighborhood."], flightTips: ["Confirm which Chicago airport appears on each flight.", "Allow weather flexibility for winter connections."]
  },
  {
    slug: "seattle", city: "Seattle", country: "United States", summary: "Mix market visits, waterfront views and neighborhood cafés in a Pacific Northwest city break.",
    introduction: "Seattle makes a good starting point for both urban exploring and a wider Pacific Northwest trip. Leave time for hills, water crossings and slower neighborhood visits instead of treating every stop as a quick downtown detour.",
    airports: [airport("SEA", "Seattle-Tacoma International Airport", "The airport serving the Seattle–Tacoma region; plan onward transport for your final destination.", "https://www.portseattle.org/sea")],
    bestTime: "Summer often suits outdoor exploring. The wetter part of the year rewards rain-ready clothing and a mix of indoor and outdoor plans.", seasons: ["Spring: alternate garden walks with rain-friendly stops.", "Summer: leave time for waterfront and longer outdoor days.", "Autumn: pack layers and flexible walking plans.", "Winter: prioritize cultural visits with weather-aware transfers."], routes: [["Los Angeles", "LAX"], ["San Francisco", "SFO"], ["Chicago", "ORD"]],
    highlights: [["Pike Place Market", "Browse food stalls and nearby streets without rushing."], ["Seattle waterfront", "Use waterside walks for views and a change of pace."], ["Neighborhood cafés", "Explore beyond downtown with a relaxed local stop."]],
    tips: ["Carry a rain layer rather than relying on the forecast alone.", "Account for hills on walking routes.", "Allow separate time for any ferry outing."], flightTips: ["Include the SEA-to-hotel journey in arrival plans.", "Avoid tight timing before onward regional transport."]
  },
  {
    slug: "dallas", city: "Dallas", country: "United States", summary: "Plan arts-district visits, regional dining and neighborhood outings across the Dallas area.",
    introduction: "Dallas activities are spread across a large metropolitan area. A hotel close to your main plans can be more useful than trying to cover every district daily. Keep the airport transfer and any journey toward Fort Worth in mind when setting your schedule.",
    airports: [airport("DFW", "Dallas Fort Worth International Airport", "An airport serving the wider Dallas–Fort Worth region; confirm your terminal and onward transportation.", "https://www.dfwairport.com/")],
    bestTime: "Spring and autumn can suit outdoor district exploring. Summer calls for heat-aware plans, while winter weather can vary.", seasons: ["Spring: plan gardens and district walks with weather alternatives.", "Summer: use indoor museums during hotter hours.", "Autumn: consider longer neighborhood outings.", "Winter: check conditions before regional road journeys."], routes: [["New York", "JFK"], ["Los Angeles", "LAX"], ["Chicago", "ORD"]],
    highlights: [["Dallas Arts District", "Build a cultural day around selected venues."], ["Bishop Arts District", "Explore independent food and shopping stops."], ["Local gardens", "Choose a green-space outing when conditions suit."]],
    tips: ["Plan transportation before spreading activities across the region.", "Carry water for warmer months.", "Keep Dallas and Fort Worth plans on separate, realistic days."], flightTips: ["Check DFW terminal details for airport pickup.", "Leave room for the journey across the metropolitan area."]
  },
  {
    slug: "atlanta", city: "Atlanta", country: "United States", summary: "Discover neighborhood food, green trails and cultural stops in Georgia's capital.",
    introduction: "Atlanta pairs major urban attractions with leafy neighborhoods and local dining. Pick a base that fits your plans and allow room for road travel. A city stay is best treated separately from a short airport connection.",
    airports: [airport("ATL", "Hartsfield-Jackson Atlanta International Airport", "An airport serving Atlanta; check terminal and ground transportation details for your itinerary.", "https://www.atl.com/")],
    bestTime: "Spring and autumn suit outdoor walks. Summer is warm and humid; cooler months work well for museums and neighborhood dining.", seasons: ["Spring: explore gardens with a rain-ready backup.", "Summer: plan shade breaks and indoor afternoon stops.", "Autumn: make time for trails and neighborhood walks.", "Winter: combine cultural venues with shorter outdoor outings."], routes: [["New York", "JFK"], ["Orlando", "MCO"], ["Los Angeles", "LAX"]],
    highlights: [["Atlanta BeltLine", "Choose a manageable section for walking and local stops."], ["Historic cultural sites", "Leave time to engage with the city's history."], ["Neighborhood dining", "Build an evening around a district rather than a cross-city journey."]],
    tips: ["Stay close to your main activities.", "Leave flexibility for road traffic.", "Keep a compact rain layer in warmer months."], flightTips: ["Check pickup arrangements for your ATL terminal.", "Do not schedule a city visit into a tight layover."]
  },
  {
    slug: "bangkok", city: "Bangkok", country: "Thailand", summary: "Combine riverside temples, neighborhood markets and Thai dining with time away from the heat.",
    introduction: "Bangkok's river districts and modern commercial areas offer very different days. Build a plan around a few neighborhoods, with breaks from heat and time for local food. Confirm the airport shown on your itinerary before arranging any onward transfer.",
    airports: [airport("BKK", "Suvarnabhumi Airport", "An airport serving Bangkok; review current arrival and onward transport information.", "https://suvarnabhumi.airportthai.co.th/")],
    bestTime: "The cooler part of the year can make outdoor exploring easier. Hot and wetter periods call for flexible schedules and indoor breaks.", seasons: ["January–March: plan temple and riverside visits with water breaks.", "April–June: minimize outdoor activity during the hottest hours.", "July–September: keep alternatives ready for rain.", "October–December: adjust plans as seasonal conditions change."], routes: [["Singapore", "SIN"], ["Tokyo", "HND"], ["Hong Kong", "HKG"]],
    highlights: [["Riverside temples", "Plan a respectful cultural visit and confirm entry guidance."], ["Chao Phraya waterfront", "See the city from waterside neighborhoods."], ["Local markets", "Allow time for browsing and food rather than a quick checklist stop."]],
    tips: ["Check temple clothing requirements.", "Allow generous time for road transfers.", "Carry water and a rain layer."], flightTips: ["Confirm your Bangkok arrival airport before pickup.", "Avoid fixed activities immediately after a long transfer."]
  },
  {
    slug: "amsterdam", city: "Amsterdam", country: "Netherlands", summary: "Explore canal-side neighborhoods, major art collections and quieter corners beyond the busiest streets.",
    introduction: "Amsterdam rewards a slow approach: choose a museum, walk a canal district and leave room for a neighborhood meal. Plan accommodation and timed tickets together, then compare arrival options with your journey from Schiphol.",
    airports: [airport("AMS", "Amsterdam Airport Schiphol", "An airport serving Amsterdam and the Netherlands; review onward rail and road options.", "https://www.schiphol.nl/en/")],
    bestTime: "Spring and early autumn suit canal walks. Summer brings long days and busy visitor periods; winter offers a quieter indoor cultural focus.", seasons: ["Spring: combine parks and canals with rain-ready clothing.", "Summer: plan timed museum visits ahead of busy days.", "Autumn: enjoy neighborhood walks with warmer layers.", "Winter: keep outdoor stretches short between cultural stops."], routes: [["London", "LHR"], ["New York", "JFK"], ["Toronto", "YYZ"]],
    highlights: [["Canal districts", "Explore on foot with time to notice architecture."], ["Museum quarter", "Choose collections around your interests."], ["Jordaan", "Mix quieter streets with cafés and independent shops."]],
    tips: ["Watch for bicycle lanes when walking.", "Book popular museum visits independently of airfare.", "Pack rainwear for canal-side walks."], flightTips: ["Leave room for the Schiphol-to-hotel journey.", "Check busy event periods before choosing dates."]
  },
  {
    slug: "west-palm-beach", city: "West Palm Beach", country: "United States", summary: "Balance South Florida waterfront walks with arts venues and relaxed neighborhood dining.",
    introduction: "West Palm Beach makes a useful base for visitors who want both city comforts and coastal outings. Distinguish mainland activities from trips to Palm Beach and surrounding beaches when choosing accommodation and daily transport.",
    airports: [airport("PBI", "Palm Beach area airport (PBI)", "Check the official airport site for current naming, terminal and transportation information before travel.", "https://www.pbia.org/")],
    bestTime: "Cooler months can suit waterfront walks. Summer brings heat and a need for weather-aware outdoor plans.", seasons: ["Spring: mix gardens with waterfront outings.", "Summer: plan shaded breaks and rain alternatives.", "Autumn: keep coastal plans flexible with the weather.", "Winter: enjoy outdoor days with a light evening layer."], routes: [["New York", "JFK"], ["Chicago", "ORD"], ["Boston", "BOS"]],
    highlights: [["Downtown waterfront", "Add a gentle waterside walk to your stay."], ["Norton Museum of Art", "Set aside a cultural stop between outdoor days."], ["Palm Beach outing", "Plan a separate visit to the island's streets and coast."]],
    tips: ["Check transport between mainland and island plans.", "Carry sun protection on waterfront days.", "Keep seasonal weather flexibility."], flightTips: ["Use PBI when comparing airport options for this region.", "Include the transfer to your exact coastal accommodation."]
  },
  {
    slug: "san-diego", city: "San Diego", country: "United States", summary: "Plan a Southern California break around coastal neighborhoods, parkland and waterfront history.",
    introduction: "San Diego offers more than a single beach day. Balance Balboa Park's cultural stops with a coastal district and a harbor walk, choosing accommodation that makes those outings practical without constant backtracking.",
    airports: [airport("SAN", "San Diego International Airport", "An airport serving San Diego; check terminal-specific pickup and transportation details.", "https://www.san.org/")],
    bestTime: "Spring and autumn lend themselves to mixed city and coastal visits. Summer is popular at beaches; winter works for cultural outings with weather flexibility.", seasons: ["Spring: pair park visits with coastal walks.", "Summer: allow more time around busy beach areas.", "Autumn: explore neighborhoods with a layer for evenings.", "Winter: keep museums ready for wetter days."], routes: [["New York", "JFK"], ["Seattle", "SEA"], ["Chicago", "ORD"]],
    highlights: [["Balboa Park", "Select museums and garden walks that fit a relaxed day."], ["La Jolla coastline", "Explore coastal views with care around changing conditions."], ["San Diego waterfront", "Combine harbor scenery with local history."]],
    tips: ["Choose one coastal district per outing.", "Bring layers for cooler ocean air.", "Check museum hours before setting your park day."], flightTips: ["Confirm SAN pickup arrangements before arrival.", "Compare dates with accommodation demand near beaches."]
  },
  {
    slug: "appleton", city: "Appleton", country: "United States", summary: "Explore Wisconsin's Fox Cities through riverside paths, arts stops and an unhurried downtown visit.",
    introduction: "Appleton is a different kind of city break, centered on the Fox River and a regional cultural scene. Use a stay to explore downtown and nearby Fox Cities communities rather than trying to turn it into a big-city checklist.",
    airports: [airport("ATW", "Appleton International Airport", "An airport serving Appleton and the Fox Cities; arrange onward transportation for your regional stay.", "https://atwairport.com/")],
    bestTime: "Warmer months suit riverside outings. Autumn offers another option for regional exploring, while winter requires a cold-weather plan.", seasons: ["Spring: expect variable conditions on riverside walks.", "Summer: make room for outdoor regional outings.", "Autumn: pack layers for cooler evenings.", "Winter: focus on cultural stops with road-weather flexibility."], routes: [["Chicago", "ORD"], ["Atlanta", "ATL"], ["Orlando", "MCO"]],
    highlights: [["Fox River paths", "Choose a manageable waterside section for a slower outing."], ["Downtown Appleton", "Explore local dining and shops without a packed schedule."], ["Arts venues", "Check the local performance calendar for your dates."]],
    tips: ["Arrange regional transport before arrival.", "Check show dates before planning a cultural weekend.", "Pack for Wisconsin's seasonal temperature changes."], flightTips: ["Compare complete itineraries to ATW, including connections.", "Leave room for winter weather on regional trips."]
  },
  {
    slug: "sarasota", city: "Sarasota", country: "United States", summary: "Blend Gulf Coast outings with gardens, art and a slower pace around Sarasota Bay.",
    introduction: "Sarasota suits travelers who want beach time without giving up cultural days. Choose accommodation with your preferred coast or downtown area in mind, and give the journey between beaches and mainland attractions its own space.",
    airports: [airport("SRQ", "Sarasota Bradenton International Airport", "An airport serving the Sarasota–Bradenton area; confirm onward transport to your coastal or mainland stay.", "https://flysrq.com/")],
    bestTime: "Cooler months often suit outdoor days. Summer brings heat and showers, so combine beach plans with flexible cultural alternatives.", seasons: ["Spring: mix garden visits with coast time.", "Summer: plan sun protection and indoor storm alternatives.", "Autumn: check weather before coastal outings.", "Winter: keep a light layer for bayfront evenings."], routes: [["New York", "JFK"], ["Chicago", "ORD"], ["Atlanta", "ATL"]],
    highlights: [["The Ringling", "Plan a cultural day around selected collections and grounds."], ["Bayfront walks", "Take a quieter break beside Sarasota Bay."], ["Gulf Coast beaches", "Choose an outing that fits your transport and weather plans."]],
    tips: ["Distinguish beach-island and downtown lodging locations.", "Check attraction admission arrangements.", "Keep coastal days flexible in stormy periods."], flightTips: ["Include SRQ ground transport when comparing costs.", "Avoid tight plans before a coastal transfer."]
  },
  {
    slug: "new-jersey", city: "New Jersey", country: "United States", summary: "Plan a regional trip around Hudson waterfront cities, cultural stops or the Jersey Shore.",
    introduction: "New Jersey is a state rather than a single city destination. Choose the part of the region you want to visit first: a Hudson-side stay, an inland outing and a shore break need different transportation plans. Newark is one airport option, but your final destination should guide the journey.",
    airports: [airport("EWR", "Newark Liberty International Airport", "Located in New Jersey; compare onward travel to the particular city or coastal area you plan to visit.", "https://www.panynj.gov/airports/en/index.html")],
    bestTime: "Spring and autumn suit regional exploring, while summer is popular for shore trips. Winter calls for flexible road and flight plans.", seasons: ["Spring: explore city neighborhoods and outdoor spaces.", "Summer: plan coastal accommodation and transport ahead.", "Autumn: allow time for regional walks and drives.", "Winter: check conditions before longer road journeys."], routes: [["Los Angeles", "LAX"], ["Chicago", "ORD"], ["Orlando", "MCO"]],
    highlights: [["Hudson waterfront", "Explore skyline views from New Jersey's side of the river."], ["Jersey Shore", "Pick a coastal town rather than trying to cover the whole shoreline."], ["Newark cultural venues", "Check local performance and museum options for your visit."]],
    tips: ["Choose a specific base before searching flights.", "Budget separately for travel beyond Newark.", "Allow extra road time on busy shore weekends."], flightTips: ["Use EWR as a starting point for regional planning.", "Compare flight times with your onward New Jersey journey."]
  },
  {
    slug: "portland", city: "Portland", country: "United States", summary: "Discover Oregon's riverfront neighborhoods, garden spaces and local food culture at an easygoing pace.",
    introduction: "This guide covers Portland, Oregon. Neighborhood food stops, book browsing and leafy outdoor spaces make a satisfying city itinerary, while any wider Oregon excursion deserves separate planning and weather flexibility.",
    airports: [airport("PDX", "Portland International Airport", "An airport serving Portland, Oregon; review current onward transportation information for your stay.", "https://www.flypdx.com/")],
    bestTime: "Summer often suits outdoor exploring. Spring and autumn call for layers, and winter rewards rain-ready clothing and indoor alternatives.", seasons: ["Spring: enjoy gardens with a rain layer.", "Summer: set aside time for outdoor neighborhood days.", "Autumn: combine park walks with indoor food and book stops.", "Winter: keep flexible plans for wet weather."], routes: [["Los Angeles", "LAX"], ["San Francisco", "SFO"], ["Chicago", "ORD"]],
    highlights: [["Washington Park", "Plan a green-space day around the areas that interest you."], ["Willamette riverfront", "Follow city paths for different neighborhood views."], ["Local food stops", "Build a leisurely day around independent places to eat."]],
    tips: ["Confirm you are searching Portland, Oregon, not Portland, Maine.", "Pack weather-ready walking shoes.", "Treat any regional excursion as a separate full outing."], flightTips: ["Select PDX for this Portland guide.", "Leave transfer time before beginning a wider Oregon trip."]
  },
];

export const destinations: Destination[] = entries.map((entry) => ({
  slug: entry.slug, city: entry.city, country: entry.country,
  airportCodes: entry.airports.map((item) => item.code), airportNames: entry.airports.map((item) => item.name),
  heroTitle: `Cheap Flights to ${entry.city}`, heroDescription: entry.summary,
  introduction: entry.introduction, flightTips: entry.flightTips, bestTimeToVisit: entry.bestTime,
  travelSeasons: entry.seasons.map((text) => { const [name, ...description] = text.split(": "); return { name, description: description.join(": ") }; }),
  popularRoutes: entry.routes.map(([city, code]) => ({ city, code })), airports: entry.airports,
  thingsToDo: entry.highlights.map(([title, description]) => ({ title, description })), travelTips: entry.tips,
  faq: [
    { question: `Which airports should I consider for ${entry.city}?`, answer: entry.airports.map((item) => `${item.name} (${item.code}): ${item.description}`).join(" ") },
    { question: `When is a good time to visit ${entry.city}?`, answer: entry.bestTime },
    { question: `What should I plan before flying to ${entry.city}?`, answer: entry.tips.join(" ") },
    { question: `How do I search flights to ${entry.city} with EasyFareBooking?`, answer: `The search widget on this page starts with ${entry.airports[0].code} selected. Choose your departure airport, dates, travellers and cabin, then select Search Flights. The current results experience is a demo and does not check live fares or availability.` },
    { question: `Can I plan a one-way or round-trip visit to ${entry.city}?`, answer: `Yes. Use One Way for a single journey to ${entry.airports[0].code}, or Round Trip and provide a return date. You can change the destination airport before searching. Contact EasyFareBooking for assistance with a real itinerary; the demo cannot make reservations.` },
  ],
  seoTitle: `Cheap Flights to ${entry.city}`,
  seoDescription: `Plan flights to ${entry.city} with EasyFareBooking. Explore ${entry.airports.map((item) => item.code).join(", ")} airport options, travel seasons, local highlights and practical trip tips.`,
}));

export const destinationPath = (destination: Pick<Destination, "slug">) => `/cheap-flights-to-${destination.slug}`;
export const getDestination = (segment: string) => destinations.find((destination) => destinationPath(destination) === `/${segment}`);
export const getDestinationByCity = (city: string) => destinations.find((destination) => destination.city === city);
export const relatedDestinations = (destination: Destination) => [
  ...destinations.filter((item) => item.slug !== destination.slug && item.country === destination.country),
  ...destinations.filter((item) => item.slug !== destination.slug && item.country !== destination.country),
].slice(0, 4);
