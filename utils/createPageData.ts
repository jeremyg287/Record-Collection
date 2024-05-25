import { writeFileSync } from "fs";
import { loadAlbumQueryResults } from "./albumQueryMgr";

export function createPageData (){
    let results = loadAlbumQueryResults().filter((queryResult)=>{
        return queryResult.results.length > 0
    }).map((queryResult)=>{
        return queryResult.results[0]
    })
    const resultString = JSON.stringify(results, null, 2)
    writeFileSync("../record-collection/app/album-data.json", resultString)
}