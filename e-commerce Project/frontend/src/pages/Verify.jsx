import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'


const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
 
            if (!token) {
                return null
            }

            const response = await axios.post(`${backendUrl}/api/order/verifyStripe`,{success,orderId},{headers:{token}})
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            }else{
                console.log('navigate to cart')
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
verifyPayment()
    },[token])

  return (
    <div>
    
    </div>
  )
}

export default Verify