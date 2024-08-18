"use client"
import { AlbumCollection, AlbumData, SimpleAlbum, } from "./components/album-collection";
import { Layout } from "./components/layout";
import { useState } from "react";
import { SortByName, SortByRating } from "./components/sort-buttons";
import { AlbumManager } from "./data/albums";
import { PageControl } from "./components/pageControls";
import { createBrowserRouter, RouterProvider, useOutletContext } from "react-router-dom";
import { Outlet, useLoaderData } from "react-router-dom";
import { ArtistCollection } from "./components/artist-collection";
import { Managers, useDefaultManagers } from "./data/managers";

export function AlbumsPage(){
  const {myAlbums} = useOutletContext<{myAlbums:AlbumManager}>()
  const albumCollection = <AlbumCollection albums={myAlbums.getPage()} nextPage={myAlbums.streamNextPage} hasMore={!myAlbums.isLastPage}/>

  return albumCollection
}
export function ArtistsPage(){
  // const {myAlbums} = useOutletContext<{myAlbums:AlbumManager}>()
  const artistCollection = <ArtistCollection />

  return artistCollection
}

export function App() {
  const managers : Managers =  useDefaultManagers() as Managers
  const myAlbums = managers.AlbumManager
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
    <Layout sideBarButtons={albumButtons} myAlbums={myAlbums}/>
  </main> );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <AlbumsPage/>
      },
      {
        path: "albums/",
        element: <AlbumsPage/>
      },
      {
        path: "artists/",
        element: <ArtistsPage/>
      },
    ]
  },
]);

export default function Routing(){
  return (<main>
    <RouterProvider router={router}/>
  </main> );
}
