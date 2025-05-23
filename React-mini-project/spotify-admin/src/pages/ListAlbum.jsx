import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'

const ListAlbum = () => {

       const [data, setData] = useState([])
       
       const fetchAlbums = async () => {
        try {
          
          const response = await axios(`${url}/api/album/list`)

          console.log(response.data)

          if(response.data.success){
            setData(response.data.albums)
          }
          

        } catch (error) {
          toast.error("Error Occured")
        }
       }

       const removeAlbum = async (id) => {
        try {
          debugger
          const response = await axios.delete(`${url}/api/album/remove/${id}`)
          
          if (response.data.success) {
            toast.success(response.data.message)
            await fetchAlbums()
          }

        } catch (error) {
          toast.error('Error Occured')
        }
       }

       useEffect(()=>{
        fetchAlbums()
       },[])

  return (
    <div>
      <p>All Albums</p><br />
      <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
      <b>Name</b>
      <b>Image</b>
      <b>Description</b>
      <b>Album Color</b>
      <b>Action</b>
      </div>
      {data.map((item,index)=>{
        return (
          <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 border border-gray-300 text-sm mr-5'>
          <img src={item.image} className='w-12' alt="" />
          <p>{item.name}</p>
          <p>{item.desc}</p>
          <input type="color" value={item.bgColor} />
          <p onClick={()=>removeAlbum(item._id)} className='cursor-pointer'>X</p>
          </div>
        )
      })}
    </div>
  )
}

export default ListAlbum