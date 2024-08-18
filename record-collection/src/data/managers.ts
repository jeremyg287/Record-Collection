import albumData from "../album-data.json"
import albumRating from "../album-rating.json"
import { useState } from "react"
import { SimpleAlbum } from "../components/album-collection"
import { AlbumManager } from "./albums"
import { ArtistManager } from "./artists"
import { SimpleArtist } from "../components/artist-collection"

export type Managers = {
    AlbumManager: AlbumManager,
    ArtistManager: ArtistManager,
}
export function useDefaultManagers() : Managers{
    const mergedData = mergeRating(albumData as SimpleAlbum[], albumRating as SimpleAlbum[])
    const [albums, setAlbums] = useState (mergedData)
    const [albumPage, setAlbumPage] = useState(0)
    const albumManager = new AlbumManager(albums, setAlbums, albumPage, setAlbumPage)
    const [artists, setArtists] = useState (extractArtists(mergedData))
    const [artistPage, setArtistPage] = useState(0)
    const artistManager = new ArtistManager(artists, setArtists, artistPage, setArtistPage)
    return {
        AlbumManager: albumManager,
        ArtistManager: artistManager,
    }
}
function extractArtists(albumData: SimpleAlbum[]): SimpleArtist[]{
    const artistLookup: {[name: string]: SimpleAlbum[]} = {}
    for(const album of albumData){
        let artistList = artistLookup[album.artists[0]]
        if (artistList === undefined){
            artistList = []
            artistLookup[album.artists[0]] = artistList
        }
        artistList.push(album)
    }
    const artistList : SimpleArtist[] = []
    for(const [artistName, albumList] of Object.entries(artistLookup)){
        let totalScore = 0
        let ratedAlbums = 0
        for(const album of albumList){
            if(album.rating !== undefined){
                totalScore += album.rating
                ratedAlbums++
            }
        }
        const rating = totalScore/ratedAlbums
        const simpleArtist : SimpleArtist = {
            name: artistName,
            albums: albumList,
            rating: rating
        }
        artistList.push(simpleArtist)
    }
    return artistList
}

function mergeRating(sourceData : SimpleAlbum[], ratingData : SimpleAlbum[]) : SimpleAlbum[]{
    const ratingLookup : {[albumKey: string] : number|undefined}= {}

    function getAlbumKey(album : SimpleAlbum) : string{
        return album.name
    }
    for(const rating of ratingData){
        ratingLookup[getAlbumKey(rating)] = rating.rating
    }
    function addRating(sourceAlbum : SimpleAlbum) : SimpleAlbum{
        const maybeRating = ratingLookup[getAlbumKey(sourceAlbum)]
        if(maybeRating == undefined){
            return sourceAlbum
        }
        return {
            ...sourceAlbum,
            rating: maybeRating
        }
    }
    return sourceData.map(addRating)
}