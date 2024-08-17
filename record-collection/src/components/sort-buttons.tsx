import { useState } from "react"
import { AlbumData, SimpleAlbum } from "./album-collection"

type HasRating = {
    rating : number
}
type SortProps <T> = {
    setData : (newData : T[]) => void, 
    data: T[]
}
export function SortByRating (props : SortProps<SimpleAlbum>) : JSX.Element {
    const [sortDirection, setSortDirection] = useState(true)
    const sort = () => {
        console.log("sort by rating", sortDirection)

        const sortedData = props.data.toSorted ((a, b) : number => {
            if (sortDirection){
                return (a.rating??0) - (b.rating??0)
            } else {
                return (b.rating??0) - (a.rating??0)
            }
        })
        console.log(sortedData)
        setSortDirection(!sortDirection)
        props.setData(sortedData)
    }
    return <input type="button" onClick={sort} value="Sort by rating"/> 
}
export function SortByName (props : SortProps<SimpleAlbum>) : JSX.Element {
    const [sortDirection, setSortDirection] = useState(true)
    const sort = () => {
        console.log("sort by name", sortDirection)
        const sortedData = props.data.toSorted ((a, b) : number => {
            if (sortDirection){
                return a.name.localeCompare(b.name)
            } else {
                return b.name.localeCompare(a.name)
            }
        })
        setSortDirection(!sortDirection)
        props.setData(sortedData)
    }
    return <input type="button" onClick={sort} value="Sort by name"/>
}