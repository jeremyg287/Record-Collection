import React from "react"

import Image from "next/image"

export type ImageObject = {
    url: string,
    height?: number,
    width?: number
}
export type SimpleAlbum = {
    name: string,
    artists: string[],
    images: ImageObject[],
    rating?: 1|2|3|4|5
}
export type AlbumCollectionProps = {
    albums: SimpleAlbum[]
}
export function AlbumCollection(props : AlbumCollectionProps){
    const {albums} = props
    return (
        <ul className="album-list">
            {
                albums.map((album:SimpleAlbum)=>{
                    return <Album key={album.name}
                        name={album.name} 
                        rating={album.rating}
                        artist={album.artists[0]}
                        image={album.images[0].url}
                    />
                })
            }
        </ul>
    )
}
export type AlbumData = {
    name: string,
    rating?: 1 | 2 | 3 | 4 | 5,
    artist: string,
    image: string,
    asdf?: string,
}
function Album(props : AlbumData) {
    const { name, rating, artist, image } = props
    return (
        <li className="album" data-rating="5">
            <div className="album-metadata">
                <p className="album-name"> {name}</p>
                <p className="album-artist"> {artist} </p>
                <p className="album-rating rating-5"> {rating} </p>
            </div>
            <Image alt={`album cover for ${name}`} src={image} width="500" height="500" />
        </li>
    )
}