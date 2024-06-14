import { Fragment, useEffect,useRef,useState} from "react";
import { createReview, getProduct } from "../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layout/loader";
import {Carousel,Button} from 'react-bootstrap';
import MetaData from "../layout/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { Modal} from 'react-bootstrap';
import { clearReviewSubmited ,clearError, clearProduct} from "../../slices/productSlice";
import { toast } from "react-toastify";
import ProductReviewList from "./ProductReview";


export default function ProductDetail(){
   const {product={},loading,isReviewSubmitted,error} =useSelector((state)=>state.productState);
   const {user}=useSelector((state)=>state.authState);
    const dispatch=useDispatch();
    const {id} =useParams();
    const [quantity,setquantity]=useState(1);
    const count=useRef(null);


    const increaseQty=()=>{
        if(count.current.value>=product.stock || product.stock ===0)return;
         setquantity(quantity +1)
            
    };
    
    const reviewHandler=()=>{
            const formdata= new FormData();
            formdata.append('rating',rating);
            formdata.append('comment',comment);
            formdata.append('productId',id);
            dispatch(createReview(formdata));

    }

    const deIncreaseQty=()=>{
          if(count.current.value<=1)return;
              setquantity(quantity -1)
          
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating,setrating]=useState(1);
    const [comment,setComment]=useState("");
    
   
    useEffect(()=>{
        if(isReviewSubmitted){
              handleClose();
              toast('Review submitted successfully',{
                type:'success',
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen:()=>dispatch(clearReviewSubmited())
             })
             
        }
        if(error){
            toast(error,{
                position:toast.POSITION.BOTTOM_CENTER,
                type:'error',
                onOpen:()=>{dispatch(clearError())}
            })
      
           return;
       }
          if(!product._id || isReviewSubmitted){
            dispatch( getProduct(id))
          }

          return()=>{
              dispatch(clearProduct())
          }
       
  
    },[dispatch,id,isReviewSubmitted,error]);

    return(
        <Fragment>{loading?<Loader/>:  <Fragment>
            <MetaData title={product.name}/>
        <div className="container container-fluid">
           <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <Carousel pause='hover'>
                            {product.images && product.images.map(image=>
                                 <Carousel.Item key={image._id}>
                                    <img className="w-100 d-block"  src={`/${image.image}`} alt={image.name} height="500" width="500"/>
                                       
                                 </Carousel.Item>
                            )}
                            
                        </Carousel>
                </div>
   
               <div className="col-12 col-lg-5 mt-5">
               <h3>{product.name}</h3>
               <p id="product_id">Product # {product._id}</p>
   
               <hr/>
   
               <div className="rating-outer">
                   <div className="rating-inner"  style={{width:`${product.ratings/ 5 *100}%`}}></div>
               </div>
               <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
   
               <hr/>
   
               <p id="product_price">${product.price}</p>
               <div className="stockCounter d-inline">
                   <span className="btn btn-danger minus" onClick={deIncreaseQty}>-</span>
   
                   <input type="number" className="form-control count d-inline" ref={count} value={quantity}  readOnly />
   
                   <span className="btn btn-primary plus" onClick={increaseQty} >+</span>
               </div>
                <button type="button" id="cart_btn"
                 disabled={product.stock===0?true:false}
                 className="btn btn-primary d-inline ml-4"
                 onClick={()=>{
                    dispatch(addCartItem(product._id,quantity));
                    toast('Cart Item added success',{
                        type:'success',
                        position:toast.POSITION.BOTTOM_CENTER,
                      
                     })

                    }}>Add to Cart</button>
   
               <hr/>
   
               <p>Status: <span className={product.stock >0 ? 'greenColor':'redColor'} id="stock_status">{product.stock >0 ? 'In Stock':'Out of Stock'}</span></p>
   
               <hr/>
   
               <h4 className="mt-2">Description:</h4>
               <p>{product.description}</p>
               <hr/>
               <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                {user ?  <button id="review_btn"  onClick={handleShow} type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                           Submit Your Review
               </button>
               :<div className="alert alert-danger mt-5">Login to Post Review</div>}
             
               <div className="row mt-2 mb-5">
                   <div className="rating w-50">
   
                    
                       <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Submit Review</Modal.Title>
                        </Modal.Header>

                          <Modal.Body>  
                            <ul className="stars" >
                                {
                                    [1,2,3,4,5].map(star=>(
                                        <li 
                                     
                                        value={star}
                                        onClick={()=>setrating(star)}
                                        className={`star ${star<=rating?'orange':''}`}
                                        onMouseOver={(e)=>e.target.classList.add('yellow')}
                                        onMouseOut={(e)=>e.target.classList.remove('yellow')}
                                        ><i className="fa fa-star"></i></li>
                                    )

                                    )
                                }
                                          
                           </ul>
   
                    <textarea onChange={(e)=>setComment(e.target.value)} name="review" id="review" className="form-control mt-3"> </textarea></Modal.Body>
                          <button disabled={loading} onClick={reviewHandler} aria-label="Close" className="btn my-3 float-right review-btn px-4 text-white">Submit</button>
                          
                          </Modal>
                  </div>
          </div>
   </div>
</div>
</div> 
      {product.reviews && product.reviews.length >0?
           <ProductReviewList reviews={product.reviews}/>: null
      } 
                </Fragment>}
           
       </Fragment>
       
           
    )
}