"use client"
import Image from "next/image";
import { AlbumCollection, AlbumData, SimpleAlbum, } from "./components/album-collection";
import { Layout } from "./components/layout";
import { useState } from "react";
import { SortByName, SortByRating } from "./components/sort-buttons";
import albumData from "./album-data.json"

const myAlbums = albumData as SimpleAlbum[]

export default function App() {
  const [albums, setAlbums] = useState (myAlbums)
  const albumCollection = <AlbumCollection albums={albums}/>
  const albumButtons: JSX.Element[]=[
    <SortByRating key={0} data={albums} setData={setAlbums}/>, 
    <SortByName key={1} data={albums} setData={setAlbums}/>
  ]
  return (<main>
    <Layout content={albumCollection} sideBarButtons={albumButtons}/>
  </main> );
}