import { writeFileSync } from "fs";
import { loadAlbumQueries, loadAlbumQueryResults } from "./albumQueryMgr";
import { isEqual } from "lodash";

export function findMissingAlbums (){
    const requiredQueries = loadAlbumQueries()
    let results = loadAlbumQueryResults().filter((queryResult)=>{
        return queryResult.results.length == 0
    }).map((queryResult)=>{
        return queryResult.sourceQuery
    }).filter((missingQuery)=>{
        return requiredQueries.some((requiredQuery)=>{
            return isEqual(missingQuery, requiredQuery)
        })
    })
    const resultString = JSON.stringify(results, null, 2)
    writeFileSync("album-missing.json", resultString)
}

