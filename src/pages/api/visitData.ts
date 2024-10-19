import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(
      'https://api.mockaroo.com/api/ab4da740?count=30&key=0f8b3b60',
      { signal: controller.signal }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request timeout:', error)
        res.status(408).json({ error: 'Request timed out' })
      } else {
        console.error('Error fetching data:', error)
        res.status(500).json({ error: error.message || 'Failed to fetch data' })
      }
    } else {
      console.error('Unexpected error:', error)
      res.status(500).json({ error: 'An unexpected error occurred' })
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
