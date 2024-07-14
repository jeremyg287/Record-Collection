import { SimpleAlbum } from "../components/album-collection"
import { Dispatch, SetStateAction, useState } from "react";
import albumData from "../album-data.json"
import albumRating from "../album-rating.json"

export class AlbumManager {
    page : number 
    setPage: Dispatch<SetStateAction<number>>
    sourceList: SimpleAlbum[]
    setSourceList : Dispatch<SetStateAction<SimpleAlbum[]>>
    pageSize : number = 12
    rating : SimpleAlbum[]
    setRating : Dispatch<SetStateAction<SimpleAlbum[]>>
    constructor(
        albums : SimpleAlbum[], 
        setAlbums : Dispatch<SetStateAction<SimpleAlbum[]>>, 
        page : number, 
        setPage: Dispatch<SetStateAction<number>>,
        ratings : SimpleAlbum[],
        setRating : Dispatch<SetStateAction<SimpleAlbum[]>>,
    ){
        this.page = page
        this.setPage = setPage
        this.sourceList = albums
        this.setSourceList = setAlbums
        this.rating = ratings
        this.setRating = setRating
        this._addRating = this._addRating.bind(this)
        this.goToNextPage = this.goToNextPage.bind(this)
        this.goToPreviousPage = this.goToPreviousPage.bind(this)
        this.streamNextPage = this.streamNextPage.bind(this)
    }
    get hasMore() : boolean{
        return !this.isLastPage
    }
    _addRating(toFind : SimpleAlbum) : SimpleAlbum {
        const result = this.rating.find((candidate)=>{
            return candidate.name == toFind.name
        })
        return {
            ...toFind, rating : result?.rating || toFind.rating
        }
    }
    streamNextPage() : void{
        setTimeout(()=>{
            this.setPage(this.page + 1)
        },1000)
    }
    getPage() : SimpleAlbum[]{
        const startingPage = Math.max(this.page-1, 0)
        const startIndex : number = startingPage * this.pageSize
        const actualPageSize = this.page == 0 ? this.pageSize : 2 * this.pageSize
        const endIndex : number = startIndex + actualPageSize
        const finalList = this.sourceList.slice(startIndex, endIndex)
        return finalList.map(this._addRating)
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
    const [ratings, setRatings] = useState (albumRating as SimpleAlbum[])
    const [page, setPage] = useState(0)
    return new AlbumManager(albums, setAlbums, page, setPage, ratings, setRatings)
}

