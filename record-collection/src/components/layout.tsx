import {Outlet, Link} from "react-router-dom"
import { AlbumManager } from "../data/albums"
export function Layout (props: LayoutParams){

    return <div className="primary-layout">
        <Header/>
        <div className="side-bar-and-content">
            <div className="side-bar">
                {
                    props.sideBarButtons
                }
            </div>
            <div className="content">
                <Outlet context={{myAlbums:props.myAlbums}}/>
            </div>
        </div>
    </div>
}
export type LayoutParams = {
    sideBarButtons: JSX.Element[],
    myAlbums: AlbumManager
}
export function Header(props: any) {
    return (
    <div className="header ">

           <h1>Jeremy&apos;s Record Collection</h1>
            <div className="hz-buttons">
                <button type="button">
                    Artists
                </button>
                <button type="button">
                    Albums
                </button>
            </div>
        </div>
    )
}