import { Fragment, useEffect, useState } from "react"
import MetaData from "./MetaData"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./loader";
import Product from "../product/Product";
import { toast } from "react-toastify";
import { getProducts } from "../../actions/ProductAction";
import Pagination from 'react-js-pagination';
import { useNavigate } from "react-router-dom";



export default function Home(){
 
  const navigate= useNavigate();
  const dispatch=useDispatch()
 const {products,loading,error,productsCount,resPerPage} =useSelector((state)=>state.productsState);
 const {isAuthenticated} =useSelector((state)=>state.authState);

 const [currentPage,setCurrentPage] =useState(1);


 const setCurrentPageNo=(pageNo) =>{
         setCurrentPage(pageNo);
               
 }
 
  useEffect(()=>{
   
    if(!isAuthenticated){
      return navigate('/login')
    }
    if(error){

     return toast.error(error,{
        position:toast.POSITION.BOTTOM_CENTER
       })
     }

 dispatch(getProducts(currentPage,null,null,null,null));
      
  },[error,dispatch,currentPage,isAuthenticated]);

 
 
       return(
      
        <Fragment>
         {loading? <Loader/>:
            <Fragment>
            {/* assign title function*/}
           <MetaData title={'buy best products'}/>

    <h1 id="products_heading">Latest Products</h1>
     <section id="products" className="container mt-5">
        <div className="row">
          {products && products.map(product=>(
               <Product col={3} key={product._id} product={product}/>
          ))}
        
        </div>
      </section>
      {productsCount > 0 && productsCount > resPerPage ? <div className="d-flex justify-content-center mt-5">
        <Pagination
             activePage={currentPage}
             onChange={setCurrentPageNo}
             totalItemsCount={productsCount}
             itemsCountPerPage={resPerPage}
             nextPageText={'Next'}
             firstPageText={'First'}
             lastPageText={'Last'}
             itemClass={'page-item'}
             linkClass={"page-link"}
        />

      </div>:null}
      </Fragment>
         }
        </Fragment>
       
       )
}