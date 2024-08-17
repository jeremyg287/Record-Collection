"use client"
import { AlbumCollection, AlbumData, SimpleAlbum, } from "./components/album-collection";
import { Layout } from "./components/layout";
import { useState } from "react";
import { SortByName, SortByRating } from "./components/sort-buttons";
import { AlbumManager, useDefaultManager } from "./data/albums";
import { PageControl } from "./components/pageControls";
import { createBrowserRouter, RouterProvider, useOutletContext } from "react-router-dom";
import { Outlet, useLoaderData } from "react-router-dom";

export function AlbumsPage(){
  const {myAlbums} = useOutletContext<{myAlbums:AlbumManager}>()
  const albumCollection = <AlbumCollection albums={myAlbums.getPage()} nextPage={myAlbums.streamNextPage} hasMore={!myAlbums.isLastPage}/>

  return albumCollection
}

export function App() {
  const myAlbums : AlbumManager =  useDefaultManager() as AlbumManager
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
    ]
  },
]);

export default function Routing(){
  return (<main>
    <RouterProvider router={router}/>
  </main> );
}
