import {CLIENT_ID, CLIENT_SECRET} from './secrets'
import * as axios from 'axios'
import * as url from 'url'

export async function get_token() : Promise<string> {
  const a = new axios.Axios({ headers: {} })
  const body = new url.URLSearchParams({ 
    grant_type: 'client_credentials'
  });
  const result = await a.post(
    'https://accounts.spotify.com/api/token'
    , body.toString()
    , {
      headers: {
        Authorization: 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      }
    }
  )
  console.log(result.status)
  console.log(result.statusText)
  const rawData = result.data
  console.log(typeof(rawData), rawData)
  const data = JSON.parse(rawData)
  console.log(typeof(data), data.access_token)
  return data.access_token
}