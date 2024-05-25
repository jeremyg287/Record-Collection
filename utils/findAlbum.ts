import { get_token } from "./request-token";
import * as ax from "axios"

export type ImageObject = {
    url: string,
    height?: number,
    width?: number
}
export type SimpleAlbum = {
    name: string,
    artists: string[],
    images: ImageObject[]
}
export async function findMatchingAlbums(
    token: string,
    albumName: string,
    albumArtist: string
) : Promise<SimpleAlbum[]> { 
    const axios = new ax.Axios({
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const response = await axios.get(
        "https://api.spotify.com/v1/search"
        ,{
            params: {
                q: albumName,
                "type": "album",
                limit: 50
            }
        }
    )
    const responseData = JSON.parse(response.data)
    const responseAlbums = responseData.albums.items
    const albumData : SimpleAlbum[] = responseAlbums.map((album)=>{
        return {
            name: album.name,
            artists: album.artists.map((artist)=>artist.name),
            images: album.images,
        }
    })
    return albumData.filter((SimpleAlbum)=>{
        return SimpleAlbum.name.toLowerCase()==albumName.toLowerCase()
        && SimpleAlbum.artists.some((artistName)=>{
            return artistName.toLowerCase()==albumArtist.toLowerCase()
        })
    })
}