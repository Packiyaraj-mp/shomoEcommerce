import { Fragment} from "react";
import { useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import {decreaseCartItemQty, increaseCartItemQty, removeItemFromCart} from "../../slices/cartSlice";

export default function Cart(){
   const {items}=useSelector(state=>state.cartState);
   const {product} =useSelector((state)=>state.productState);
   const dispatch=useDispatch();
   const navigate=useNavigate();
   

   const increaseQty=(productId,stock,quantity)=>{
         if(quantity<stock && stock!==0){
               dispatch(increaseCartItemQty(productId))
         }
   };

   const decreaseQty=(productId,quantity)=>{
    if(quantity>1){
          dispatch(decreaseCartItemQty(productId))
    }
   };

   const checkoutHandler=()=>{
      navigate('/login?redirect=shipping')
   }

 
  

    return(
        <Fragment>
            {items.length===0 ?
            <h2 className="mt-5">Your Cart is Empty</h2>:
            <Fragment>
                  <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
                  <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
             
                {items.map(item=>(
                    <Fragment>
                          <div className="cart-item">
                     <div className="row">
                         <div className="col-4 col-lg-3">
                             <img src={item.image} alt={item.name} height="90" width="115"/>
                         </div>
 
                         <div className="col-5 col-lg-3">
                             <Link to={`/product/${item.product}`}>{item.name}</Link> 
                         </div>
 
 
                         <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                             <p id="card_item_price">${item.price}</p>
                         </div>
 
                         <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                             <div className="stockCounter d-inline">
                                 <span className="btn btn-danger minus" onClick={()=>decreaseQty(item.product,item.stock,item.quantity)} >-</span>
                                 <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
 
                                 <span className="btn btn-primary plus" onClick={()=>increaseQty(item.product,item.stock,item.quantity)}>+</span>
                             </div>
                         </div>
 
                         <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                             <i id="delete_cart_item" onClick={()=>dispatch(removeItemFromCart(item.product))} className="fa fa-trash btn btn-danger"></i>
                         </div>
 
                     </div>
                     </div>

                    </Fragment>
                   

                ))}
               
                
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc,item)=>(acc+item.quantity),0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${Number(items.reduce((acc,item)=>(acc+item.quantity *item.price),0)).toFixed(2)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
                </div>
            </div>
        </div>

            </Fragment>
            }
           
        
     
        </Fragment>
    )
}