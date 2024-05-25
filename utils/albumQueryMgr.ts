import { fstat, readFileSync, writeFileSync } from "fs";
import { SimpleAlbum, findMatchingAlbums } from "./findAlbum";
import { isEqual } from "lodash";

export type RawAlbumQuery = [string, string]
export interface AlbumQuery{
    albumName: string,
    artistName: string,
}
export interface AlbumQueryResult{
    sourceQuery: AlbumQuery,
    results: SimpleAlbum[],
}
export function saveAlbumQueryResults(results : AlbumQueryResult[]){
    const resultString = JSON.stringify(results, null, 2)
    writeFileSync("album-output.json", resultString)
}
export function loadAlbumQueryResults() : AlbumQueryResult[] {
    const result = readFileSync("album-output.json").toString()
    return JSON.parse(result)
}
export function loadAlbumQueries() : AlbumQuery[] {
    const resultString = readFileSync("spotify-input.json").toString()
    const result : RawAlbumQuery[] = JSON.parse(resultString)
    return result.map((rawAlbumQuery) : AlbumQuery => {
        return {
            albumName: rawAlbumQuery[0],
            artistName: rawAlbumQuery[1]
        }
    })
}
export function findAllMissingQueries (inputQueries : AlbumQuery[], outputQueries : AlbumQueryResult[]) : AlbumQuery[] {
    const missingQueries : AlbumQuery[] = []
    for(const inputQuery of inputQueries){
        const isInOutput = outputQueries.some((outputQuery) => {
            return isEqual(inputQuery, outputQuery.sourceQuery)
        })
        if(!isInOutput){
            missingQueries.push(inputQuery)
        }
    }
    return missingQueries
}
export async function processQuery (token: string, inputQuery: AlbumQuery) : Promise <AlbumQueryResult> {
    const results = await findMatchingAlbums(token, inputQuery.albumName, inputQuery.artistName)
    return {
        sourceQuery: inputQuery,
        results: results
    }
}
export async function processQueries (token : string){
    const outputs = loadAlbumQueryResults()
    const allInputQueries = loadAlbumQueries()
    const toBeProcessed = findAllMissingQueries(allInputQueries, outputs)
    for(const query of toBeProcessed){
        try {
            console.log("processing query", query)
            const queryResult = await processQuery(token, query)
            outputs.push(queryResult)
        } catch (e) {
            console.error("Something went wrong while processing", e)
        }
    }
    saveAlbumQueryResults(outputs)
}