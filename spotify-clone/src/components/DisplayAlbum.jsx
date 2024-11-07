import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import {  assets} from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = ({album}) => {

  
  const { id } = useParams();
 // const albumData = albumsData[id]; /-----used when viewing with only frontend
 const [albumData, setAlbumData] = useState("") //initialized after backend and db for storing the data from contextAPI
  const {playWithId, albumsData, songsData} = useContext(PlayerContext)

  useEffect(()=>{                     //This mounting has been done after db and backend to check id of db and id of params are same
    albumsData.map((item)=>{     
      if(item._id === id){
        setAlbumData(item)
      }
    })
  },[])

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1"></p>
          <img className="inline-block w-5" src={assets.spotify_logo} />
          <b>Spotify</b>• 1,323,154 likes • <b>50 songs, </b>
          about 2 hr 30 min
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} />
      </div>
      <hr />

      {/*The below filter is done after  db and backend process. This will check the  Album names are same.*/}
      {songsData.filter((item)=> item.album === album.name).map((item,index)=>
       
        <div key={index} onClick={()=>playWithId(item._id)} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
        <p className="text-white">
          <b className="mr-4 text-[#a7a7a7]">{index+1}</b>
          <img className="inline w-10 mr-5" src={item.image} alt="" />
          {item.name}
        </p>
        <p className="text-[15px]">{albumData.name}</p>
        <p className="text-[15px] hidden sm:block">5 days ago</p>
        <p className="text-[15px] text-center">{item.duration}</p>
        </div>
          
      )}
    </>
  ) : null;
};

export default DisplayAlbum;
