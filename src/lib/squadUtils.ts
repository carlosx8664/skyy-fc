import { client } from './sanityClient';

// Fetch players for a specific season (excluding archived)
export const getSquadBySeason = async (season: string) => {
  return await client.fetch(
    `*[_type == "player" && season == $season && !isArchived] | order(number asc) {
      _id, 
      name, 
      number, 
      position, 
      role, 
      foot,
      isCaptain, 
      debut, 
      home, 
      tags, 
      bio, 
      category, 
      image, 
      stats
    }`,
    { season }
  );
};

// Fetch archived players for a specific season
export const getArchivedSquadBySeason = async (season: string) => {
  return await client.fetch(
    `*[_type == "player" && season == $season && isArchived == true] | order(number asc) {
      _id, 
      name, 
      number, 
      position, 
      role, 
      foot,
      isCaptain, 
      debut, 
      home, 
      tags, 
      bio, 
      category, 
      image, 
      stats
    }`,
    { season }
  );
};

// Get all available seasons
export const getAvailableSeasons = async () => {
  const seasons = await client.fetch(
    `array::unique(*[_type == "player"].season)`
  );
  return seasons.sort();
};

// Archive a whole season
export const archiveSeason = async (season: string) => {
  return await client
    .patch({
      query: `*[_type == "player" && season == $season]`,
      params: { season }
    })
    .set({ isArchived: true })
    .commit();
};

// Restore a whole season
export const restoreSeason = async (season: string) => {
  return await client
    .patch({
      query: `*[_type == "player" && season == $season]`,
      params: { season }
    })
    .set({ isArchived: false })
    .commit();
};

// Get counts for each season
export const getSeasonStats = async () => {
  const stats = await client.fetch(`
    {
      "seasons": array::unique(*[_type == "player"].season),
      "counts": *[_type == "player"] {
        season,
        isArchived
      }
    }
  `);
  
  // Process counts
  const seasonCounts: Record<string, { total: number; archived: number; active: number }> = {};
  
  stats.seasons.forEach((season: string) => {
    const seasonPlayers = stats.counts.filter((p: any) => p.season === season);
    const archived = seasonPlayers.filter((p: any) => p.isArchived).length;
    seasonCounts[season] = {
      total: seasonPlayers.length,
      archived,
      active: seasonPlayers.length - archived
    };
  });
  
  return seasonCounts;
};