import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Menggunakan axios untuk mengambil data dari https://24pullrequests.com/users.json?page=2
    const response = await axios.get(
      'https://24pullrequests.com/users.json?page=2',
    )

    // Menyusun kembali dan mengirimkan data sebagai respons
    const data = response.data
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
