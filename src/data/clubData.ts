/**
 * SKYY FC Club Data
 * 
 * NOTE: These arrays can be replaced with Sanity API calls in the future.
 * Example: const SQUAD = await sanityClient.fetch('*[_type == "player"]');
 */

export const CLUB_INFO = {
  name: "SKYY FC",
  tagline: "The Pride of Daboase",
  location: "Daboase, Western Region, Ghana",
  colors: {
    primary: "#f5a623", // Gold/Amber
    secondary: "#000000",
  },
  socials: {
    facebook: "https://www.facebook.com/skyyfcdaboase/",
  }
};

export const LATEST_RESULT = {
  homeTeam: "SKYY FC",
  awayTeam: "Opponents FC",
  homeScore: 2,
  awayScore: 1,
  date: "February 20, 2026",
  competition: "Division One League",
};

export const NEXT_MATCH = {
  homeTeam: "FOXES FC",
  awayTeam: "SKYY FC",
  date: "Feb 28, 2026",
  time: "15:00",
  venue: "Daboase Park",
  competition: "Division One League",
  countdown: { days: "03", hrs: "20", mins: "09", secs: "40" }
};

export const FIXTURES = [
  { id: 1, homeTeam: "Star FC", awayTeam: "SKYY FC", date: "Feb 28, 2026", time: "15:00", venue: "Star Park", competition: "Division One League" },
  { id: 2, homeTeam: "SKYY FC", awayTeam: "Coastal United", date: "Mar 07, 2026", time: "15:00", venue: "Daboase Park", competition: "Division One League" },
  { id: 3, homeTeam: "Western Giants", awayTeam: "SKYY FC", date: "Mar 14, 2026", time: "15:30", venue: "Giants Arena", competition: "Division One League" },
  { id: 4, homeTeam: "SKYY FC", awayTeam: "Daboase Warriors", date: "Mar 21, 2026", time: "15:00", venue: "Daboase Park", competition: "FA Cup" },
  { id: 5, homeTeam: "Rising Stars", awayTeam: "SKYY FC", date: "Mar 28, 2026", time: "15:00", venue: "Stars Stadium", competition: "Division One League" },
];

export const RESULTS = [
  { id: 1, opponent: "Gold City FC", score: "1-0", result: "W", date: "Feb 13, 2026", competition: "Division One League" },
  { id: 2, opponent: "River Plate GH", score: "1-1", result: "D", date: "Feb 06, 2026", competition: "Division One League" },
  { id: 3, opponent: "Forest Rangers", score: "0-2", result: "L", date: "Jan 30, 2026", competition: "Division One League" },
  { id: 4, opponent: "Ocean Boys", score: "3-1", result: "W", date: "Jan 23, 2026", competition: "Division One League" },
  { id: 5, opponent: "Valley United", score: "2-0", result: "W", date: "Jan 16, 2026", competition: "Division One League" },
];

export const SQUAD = [
  { id: 1, name: "Emmanuel Mensah", number: 1, position: "Goalkeeper", initials: "EM" },
  { id: 2, name: "Kofi Owusu", number: 4, position: "Defender", initials: "KO" },
  { id: 3, name: "Samuel Addo", number: 5, position: "Defender", initials: "SA" },
  { id: 4, name: "Prince Boateng", number: 8, position: "Midfielder", initials: "PB" },
  { id: 5, name: "Isaac Quansah", number: 10, position: "Midfielder", initials: "IQ" },
  { id: 6, name: "Baba Musah", number: 7, position: "Forward", initials: "BM" },
  { id: 7, name: "John Antwi", number: 9, position: "Forward", initials: "JA" },
  { id: 8, name: "Daniel Koomson", number: 11, position: "Forward", initials: "DK" },
  { id: 9, name: "Kwame Asante", number: 12, position: "Defender", initials: "KA" },
  { id: 10, name: "Yaw Frimpong", number: 15, position: "Midfielder", initials: "YF" },
  { id: 11, name: "Seth Osei", number: 18, position: "Forward", initials: "SO" },
  { id: 12, name: "Richard Arthur", number: 20, position: "Goalkeeper", initials: "RA" },
  { id: 13, name: "Justice Blay", number: 6, position: "Midfielder", initials: "JB" },
  { id: 14, name: "Eric Donkor", number: 3, position: "Defender", initials: "ED" },
];

export const NEWS = [
  { 
    id: 1, 
    title: "Starting Lineup Announced", 
    excerpt: "The technical team has released the starting XI for today's crucial encounter. Fans are excited to see the new signings in action at Daboase Park.",
    content: "Full match preview and starting lineup details... SKYY FC is set to face FOXES FC in a highly anticipated match. The coach has opted for a 4-3-3 formation, bringing in two new signings to bolster the midfield. The atmosphere in Daboase is electric as fans gather to support the Pride of Daboase.",
    date: "February 22, 2026",
    color: "bg-blue-600"
  },
  { 
    id: 2, 
    title: "Koby's Unstoppable Career", 
    excerpt: "A deep dive into the journey of our star midfielder, Koby, from the streets of Daboase to becoming a key pillar in the SKYY FC engine room.",
    content: "Detailed biography and career highlights of Koby... Starting from the local youth teams, Koby's talent was evident early on. His vision and passing ability have made him a fan favorite. We explore his most memorable goals and his impact on the team's recent success.",
    date: "February 18, 2026",
    color: "bg-red-600"
  },
  { 
    id: 3, 
    title: "Meet Our Cheerleaders", 
    excerpt: "The SKYY FC cheerleading squad is ready to bring the energy! Meet the team that keeps the stadium atmosphere electric every match day.",
    content: "Behind the scenes with the SKYY FC cheerleaders... More than just a dance team, they are the heartbeat of the stadium. We talk to the captain about their training routine and their passion for the club.",
    date: "February 15, 2026",
    color: "bg-purple-600"
  },
];
