import player from './player'
import liveStream from './liveStream'
import team from './team'
import news from './news'
import stories from './stories'
import leagueTable from './leagueTable'
import gallery from './gallery'
import highlight from './highlight'
import fixture from './fixture'
import result from './result'

export const schemaTypes = [
  player,
  team,
  liveStream,

  // Previous matches / videos (used under Watch)
  news,

  // Actual news articles
  stories,
  fixture,
  result,
  leagueTable,
  gallery,
  highlight,
]
