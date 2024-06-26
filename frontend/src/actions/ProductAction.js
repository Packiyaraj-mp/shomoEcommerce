import axios from 'axios';
import { adminProductsFail, adminProductsSuccess,adminProductsRequest, productsFail, productsRequest, productsSuccess } from '../slices/productsSlice';

import { UpdateProductFail, UpdateProductRequest, UpdateProductSuccess, createReviewFail, createReviewRequest, createReviewSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, reviewsFail, reviewsRequest, reviewsSuccess } from '../slices/productSlice';
import { updatePasswordFail } from '../slices/authSlice';

export const getProducts=(currentPage,price,keyword,category,ratings)=> async (dispatch)=>{
    
    try{
        dispatch(productsRequest());
        let link=`/api/v1/products?page=${currentPage}`
    if(keyword){
        link +=`&keyword=${keyword}`;
        
    }
    if(price){
        link +=`&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }
    if(category){
        link +=`&category=${category}`;
    }
    if(ratings){
        link +=`&ratings=${ratings}`;
    }
    const {data} = await axios.get(link);
        dispatch(productsSuccess(data));

    }catch(err){
    //    handle error
       dispatch(productsFail(err.response.data.message))
    }
    
};



export const getProduct= id=>async (dispatch)=>{
    
    try{
        dispatch(productRequest());
  
    const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data));

    }catch(err){
    //    handle error
       dispatch(productFail(err.response.data.message))
    }
    
};
export const createReview= reviewData=>async (dispatch)=>{
    
    try{
        dispatch(createReviewRequest());
     const  config={
        headers:{
            'Content-type':'application/json'
         }};


    const {data} = await axios.put(`/api/v1/review/`,reviewData,config);
        dispatch(createReviewSuccess(data));

    }catch(err){
    //    handle error
       dispatch(createReviewFail(err.response.data.message))
    }
    
};

export const getAdminProducts= async (dispatch)=>{
    
    try{
        dispatch(adminProductsRequest());
       const {data}=await axios.get('/api/v1/admin/products');
       dispatch(adminProductsSuccess(data))
    

    }catch(err){
    //    handle error
       dispatch(adminProductsFail(err))
    }
    
};
export const createNewProduct=productData=> async (dispatch)=>{
    
    try{
        dispatch(newProductRequest());
       const {data}=await axios.post('/api/v1/admin/product/new',productData);
       dispatch(newProductSuccess(data));
    

    }catch(err){
    //    handle error
       dispatch(newProductFail(err.response.data.message));
    }
    
};
export const deleteProduct=id=> async (dispatch)=>{
    
    try{
        dispatch(deleteProductRequest());
       await axios.delete(`/api/v1/admin/product/${id}`);
       dispatch(deleteProductSuccess());
    

    }catch(err){
    //    handle error
       dispatch(deleteProductFail(err.response.data.message));
    }
    
};
export const updateProduct=(id,productData)=> async (dispatch)=>{
    
    try{
        dispatch(UpdateProductRequest());
       const {data}=await axios.put(`/api/v1/admin/product/${id}`,productData);
       dispatch(UpdateProductSuccess(data));
    

    }catch(err){
    //    handle error
       dispatch(UpdateProductFail(err.response.data.message));
    }
    
};


export const getReviews=(id=> async (dispatch)=>{
    
    try{
        dispatch(reviewsRequest());
        const {data} = await axios.get(`/api/v1/admin/reviews`,{params:{id}});
        console.log(data)
        dispatch(reviewsSuccess(data));
      
    }catch(err){
        dispatch(reviewsFail(err.response.data.message));

    }
       
});
export const deleteReview=((productId,id)=> async (dispatch)=>{
    
    try{
        dispatch(deleteReviewRequest());
        await axios.delete('/api/v1/admin/review',{params:{productId,id}});
        dispatch(deleteReviewSuccess());
      
    }catch(err){
        dispatch(deleteReviewFail(err.response.data.message));

    }
   

      
});




