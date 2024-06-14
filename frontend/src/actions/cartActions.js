import { addcartItemRequest, addcartItemSuccess } from "../slices/cartSlice"
import axios from 'axios';
export const addCartItem=(id,quantity)=>async(dispatch)=>{
      try{
        dispatch(addcartItemRequest());
        const {data}=await axios.get(`/api/v1/product/${id}`);
        dispatch(addcartItemSuccess({
              product:data.product._id,
              name:data.product.name,
              price:data.product.price,
              image:data.product.images[0].image,
              stock:data.product.stock,
              quantity  
        }))

      }catch(err){
             console.log(err)
      }
}