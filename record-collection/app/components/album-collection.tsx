export function AlbumCollection(props : any){
    const {albums} = props
    return (
        <ul className="album-list">
            {
                albums.map((album:AlbumData)=>{
                    return <Album
                        name={album.name} 
                        rating={album.rating}
                        artist={album.artist}
                        image={album.image}
                    />
                })
            }
        </ul>
    )
}
export type AlbumData = {
    name: string,
    rating: "One Star" | "Two Stars" | "Three Stars" | "Four Stars" | "Five Stars",
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
            <img src={image} width="500" height="500" />
        </li>
    )
}