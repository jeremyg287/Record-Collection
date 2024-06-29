"use client"
import Image from "next/image";
import { AlbumCollection, AlbumData, SimpleAlbum, } from "./components/album-collection";
import { Layout } from "./components/layout";
import { useState } from "react";
import { SortByName, SortByRating } from "./components/sort-buttons";
import { AlbumManager, useDefaultManager } from "./data/albums";
import { PageControl } from "./components/pageControls";

export default function App() {
  const myAlbums =  useDefaultManager()
  const albumCollection = <AlbumCollection albums={myAlbums.getPage()} nextPage={myAlbums.streamNextPage} hasMore={!myAlbums.isLastPage}/>
  const albumButtons: JSX.Element[]=[
    <SortByRating key={0} data={myAlbums.sourceList} setData={myAlbums.setSourceList}/>, 
    <SortByName key={1} data={myAlbums.sourceList} setData={myAlbums.setSourceList}/>,
    <PageControl 
      key={2} 
      currentPage={myAlbums.displayPage} 
      goToNextPage={myAlbums.goToNextPage}
      goToPreviousPage={myAlbums.goToPreviousPage}
      isFirstPage={myAlbums.isFirstPage}
      isLastPage={myAlbums.isLastPage}
    />,


  ]
  return (<main>
    <Layout content={albumCollection} sideBarButtons={albumButtons}/>
  </main> );
}
