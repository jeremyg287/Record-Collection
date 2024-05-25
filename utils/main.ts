import { processQueries, saveAlbumQueryResults } from "./albumQueryMgr";
import { createPageData } from "./createPageData";
import { findMatchingAlbums } from "./findAlbum";
import { get_token } from "./request-token";
import * as ax from "axios"
async function main(){
    let token = await get_token() 
    await processQueries(token)
    createPageData()
    // const testAlbums = await findMatchingAlbums(token, "King Of The Beach", "Wavves")
    // console.log(testAlbums)
}
main()