import InfiniteScroll from 'react-infinite-scroll-component'

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
    albums: SimpleAlbum[],
    nextPage: ()=>void,
    hasMore: boolean,

}
export function AlbumCollection(props : AlbumCollectionProps){
    const {albums} = props
    return (
        <ul className="album-list" id="album-list">
            <InfiniteScroll
                dataLength={props.albums.length}
                next={props.nextPage}
                style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={props.hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="album-list"
                onScroll={()=>{console.log("Scroll detected")}}
                // scrollThreshold={"800px"}
            >
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
            </InfiniteScroll>
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