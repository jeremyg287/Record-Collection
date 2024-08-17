import InfiniteScroll from 'react-infinite-scroll-component'

import React from "react"


export type ImageObject = {
    url: string,
    height?: number,
    width?: number
}
export type SimpleAlbum = {
    name: string,
    artists: string[],
    images: ImageObject[],
    rating?: number
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
                style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, flexWrap: 'wrap', justifyContent: 'space-around' }} //To put endMessage and loader to the top.
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
    rating?: number,
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
                <Rating rating={rating}></Rating>
            </div>
            <img alt={`album cover for ${name}`} src={image} width="500" height="500" />
        </li>
    )
}
function Rating(prop : {rating : number | undefined}){
    const fillStar = <i className="fa-solid fa-star"></i>
    const emptyStar = <i className="fa-regular fa-star"></i>
    if(prop.rating===undefined){
        return null
    }
    return (
        <div className="album-rating">
            {prop.rating >= 1 ? fillStar : emptyStar}
            {prop.rating >= 2 ? fillStar : emptyStar}
            {prop.rating >= 3 ? fillStar : emptyStar}
            {prop.rating >= 4 ? fillStar : emptyStar}
            {prop.rating >= 5 ? fillStar : emptyStar}
        </div>
    )
}