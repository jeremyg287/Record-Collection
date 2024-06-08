import { SimpleAlbum } from "../components/album-collection"
import { Dispatch, SetStateAction, useState } from "react";
import albumData from "../album-data.json"

export class AlbumManager {
    sourceList: SimpleAlbum[]
    setSourceList : Dispatch<SetStateAction<SimpleAlbum[]>>
    constructor(){
        const [albums, setAlbums] = useState (albumData as SimpleAlbum[])
        this.sourceList = albums
        this.setSourceList = setAlbums
    }
    getPage(pageNumber : number, pageSize : number = 20) : SimpleAlbum[]{
        const startIndex : number = pageNumber * pageSize
        const endIndex : number = startIndex + pageSize
        return this.sourceList.slice(startIndex, endIndex)
    }
}

