"use client"
import Image from "next/image";
import { AlbumCollection, AlbumData, SimpleAlbum, } from "./components/album-collection";
import { Layout } from "./components/layout";
import { useState } from "react";
import { SortByName, SortByRating } from "./components/sort-buttons";
import { AlbumManager } from "./data/albums";


export default function App() {
  const myAlbums =  new AlbumManager()
  const albumCollection = <AlbumCollection albums={myAlbums.getPage(0)}/>
  const albumButtons: JSX.Element[]=[
    <SortByRating key={0} data={myAlbums.sourceList} setData={myAlbums.setSourceList}/>, 
    <SortByName key={1} data={myAlbums.sourceList} setData={myAlbums.setSourceList}/>
  ]
  return (<main>
    <Layout content={albumCollection} sideBarButtons={albumButtons}/>
  </main> );
}