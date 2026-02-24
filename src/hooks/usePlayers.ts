import { useEffect, useState } from 'react'
import { client } from '../lib/sanityClient'

export function usePlayers() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(`*[_type == "player"] | order(number asc) {
        _id,
        name,
        number,
        position,
        nationality,
        age,
        "photo": photo.asset->url
      }`)
      .then((data) => {
        setPlayers(data)
        setLoading(false)
      })
  }, [])

  return { players, loading }
}
