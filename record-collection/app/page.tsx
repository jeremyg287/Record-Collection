import Image from "next/image";
import { AlbumCollection, AlbumData } from "./components/album-collection";

const myAlbums : AlbumData[] = [
  {
    name:"King Of The Beach", 
    rating:"Five Stars",
    artist: "Wavves",
    image:"https://vinylcoverart.com/media/album-covers/635/wavves-king-of-the-beach-large.jpg",
  },
  {
    name:"Dookie", 
    rating:"Five Stars",
    artist:"Green Day",
    image:"https://i.ebayimg.com/images/g/Za8AAOSwnEBkukX8/s-l1600.jpg",
  },
  {
    name: "Melted",
    rating: "Five Stars",
    artist: "Ty Segall",
    image: "https://m.media-amazon.com/images/I/81+LnwyO1rL._SL1400_.jpg",
  },
  {
    name: "Crazy For You",
    rating: "Three Stars",
    artist: "Best Coast",
    image: "",
  },
  {
    name: "Good Bad Not Evil",
    rating: "Five Stars",
    artist: "Black Lips",
    image: "",
  },
  {
    name: "The Chronic",
    rating: "Five Stars",
    artist: "Dr. Dre",
    image: "",
  },
  {
    name: "Wasted On The Dream",
    rating: "Two Stars",
    artist: "Jeff The Brotherhood",
    image: "",
  },
  {
    name: "Castlemania",
    rating: "Four Stars",
    artist: "Thee Oh Sees",
    image: "",
  },
]

export default function App() {
  return (<main>
    
    <AlbumCollection albums={myAlbums}/>
  </main> );
}
