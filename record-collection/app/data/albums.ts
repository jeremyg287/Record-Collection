import { SimpleAlbum } from "../components/album-collection"
import { Dispatch, SetStateAction, useState } from "react";
import albumData from "../album-data.json"

export class AlbumManager {
    page : number 
    setPage: Dispatch<SetStateAction<number>>
    sourceList: SimpleAlbum[]
    setSourceList : Dispatch<SetStateAction<SimpleAlbum[]>>
    pageSize : number = 20
    constructor(albums : SimpleAlbum[], setAlbums : Dispatch<SetStateAction<SimpleAlbum[]>>, page : number, setPage: Dispatch<SetStateAction<number>>){
        this.page = page
        this.setPage = setPage
        this.sourceList = albums
        this.setSourceList = setAlbums
        this.goToNextPage = this.goToNextPage.bind(this)
        this.goToPreviousPage = this.goToPreviousPage.bind(this)
    }
    getPage() : SimpleAlbum[]{
        const startIndex : number = this.page * this.pageSize
        const endIndex : number = startIndex + this.pageSize
        return this.sourceList.slice(startIndex, endIndex)
    }
    getNumberOfPages() : number {
        return Math.ceil(this.sourceList.length/this.pageSize)
    }
    get isLastPage() : boolean {
        return this.page + 1 >= this.getNumberOfPages()
    }
    goToNextPage(){
        //fix this
        this.setPage(this.page + 1)
    }
    get isFirstPage() : boolean {
        return this.page == 0
    }
    goToPreviousPage(){
        //fix this
        this.setPage(this.page - 1)
    }
    get displayPage() : number {
        return this.page + 1
    }
}
export function useDefaultManager() : AlbumManager{
    const [albums, setAlbums] = useState (albumData as SimpleAlbum[])
    const [page, setPage] = useState(0)
    return new AlbumManager(albums, setAlbums, page, setPage)
}

