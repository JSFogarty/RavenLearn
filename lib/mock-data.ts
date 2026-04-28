export const watchlist = [
  { symbol: "AAPL", name: "Apple", price: "$189.32", change: "+1.8%", volume: "62.4M", trend: "Uptrend" },
  { symbol: "AMD", name: "Advanced Micro Devices", price: "$42.18", change: "+4.1%", volume: "88.1M", trend: "Breakout attempt" },
  { symbol: "PLTR", name: "Palantir", price: "$28.74", change: "+2.6%", volume: "51.7M", trend: "Pullback" },
  { symbol: "SOFI", name: "SoFi", price: "$9.63", change: "-0.7%", volume: "37.9M", trend: "Range" },
];

export const screenerResults = [
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: "$42.18",
    change: "+4.1%",
    volume: "88.1M",
    relativeVolume: "2.2x",
    trend: "Uptrend",
    pattern: "Possible breakout",
    score: 78,
    reason: "Above short averages with expanding volume near resistance.",
  },
  {
    symbol: "PLTR",
    name: "Palantir",
    price: "$28.74",
    change: "+2.6%",
    volume: "51.7M",
    relativeVolume: "1.8x",
    trend: "Pullback",
    pattern: "Higher low test",
    score: 71,
    reason: "Pullback is holding above the prior higher low zone.",
  },
  {
    symbol: "HOOD",
    name: "Robinhood",
    price: "$18.92",
    change: "+3.3%",
    volume: "24.5M",
    relativeVolume: "1.6x",
    trend: "Range",
    pattern: "Resistance test",
    score: 64,
    reason: "Price is pressing the top of a multi-day range.",
  },
  {
    symbol: "SOFI",
    name: "SoFi",
    price: "$9.63",
    change: "-0.7%",
    volume: "37.9M",
    relativeVolume: "1.4x",
    trend: "Sideways",
    pattern: "Support test",
    score: 56,
    reason: "Price is near support, but momentum is not confirmed.",
  },
];

export const recentReviews = [
  { symbol: "AMD", title: "Possible breakout needs confirmation", time: "Today", score: "78" },
  { symbol: "PLTR", title: "Pullback held above prior higher low", time: "Yesterday", score: "71" },
  { symbol: "SOFI", title: "Range support held, volume still quiet", time: "Mon", score: "56" },
];

export const coachSections = [
  {
    title: "Current Read",
    text: "Price is holding above rising short-term averages while testing an overhead level.",
  },
  {
    title: "Trend",
    text: "The recent sequence shows higher lows, which keeps the short-term trend constructive.",
  },
  {
    title: "Volume",
    text: "Volume expanded on the approach into resistance, but follow-through still needs confirmation.",
  },
  {
    title: "Key Levels",
    text: "Support sits near the prior higher low. Resistance is the current breakout line.",
  },
  {
    title: "Confirmation",
    text: "A clean close above resistance with sustained volume would strengthen the read.",
  },
  {
    title: "Invalidation",
    text: "A move back below the higher low zone would weaken the current structure.",
  },
];

export const setupScore = [
  { label: "Trend", value: 18, max: 20 },
  { label: "Volume", value: 16, max: 20 },
  { label: "Structure", value: 15, max: 20 },
  { label: "Location", value: 14, max: 20 },
  { label: "Confirmation", value: 15, max: 20 },
];
