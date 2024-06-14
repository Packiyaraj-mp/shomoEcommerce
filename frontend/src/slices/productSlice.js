import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:'product',
    initialState:{
        loading:false,
        isReviewSubmitted:false,
        product:{},
        isProductCreated:false,
        isProductDeleted:false,
        isProductUpdated:false,
        isReviewDeleted:false,
        reviews:[]
    },
    reducers:{
        productRequest(state,action){
             return{
                ...state,
                loading:true
             }
        },
        productSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload.product
            }
        },
        productFail(state,action){
               return{
                ...state,
                loading:false,
                error:action.payload
               }
        },

        createReviewRequest(state,action){
            return{
               ...state,
               loading:true
            }
       },
       createReviewSuccess(state,action){
           return{
               ...state,
               loading:false,
               isReviewSubmitted:true
           }
       },
       createReviewFail(state,action){
              return{
                ...state,
               loading:false,
               error:action.payload
              }
       },
       clearReviewSubmited(state,action){
            return{
                ...state,
                isReviewSubmitted:false
            }

       },

       newProductRequest(state,action){
        return{
           ...state,
           loading:true
        }
    },
      newProductSuccess(state,action){
       return{
           ...state,
           loading:false,
           product:action.payload.product,
           isProductCreated:true
       }
   },
      newProductFail(state,action){
          return{
           ...state,
           loading:false,
           error:action.payload,
           isProductCreated:false
          }
   },
   clearProductCreated(state,action){
             return{
                 ...state,
                 isProductCreated:false
             }
   },

deleteProductRequest(state,action){
    return{
       ...state,
       loading:true
    }
},
  deleteProductSuccess(state,action){
   return{
       ...state,
       loading:false,
       isProductDeleted:true
   }
},
  deleteProductFail(state,action){
      return{
       ...state,
       loading:false,
       error:action.payload,
      
      }
},
clearProductDeleted(state,action){
         return{
             ...state,
             isProductDeleted:false
         }
},

UpdateProductRequest(state,action){
    return{
       ...state,
       loading:true
    }
},

UpdateProductSuccess(state,action){
   return{
       ...state,
       loading:false,
       product:action.payload.product,
       isProductUpdated:true
   }
},
  UpdateProductFail(state,action){
      return{
       ...state,
       loading:false,
       error:action.payload,
       isProductCreated:false
      }
},
clearProductUpdated(state,action){
    return{
        ...state,
        isProductDeleted:false
    }
},
reviewsRequest(state,action){
    return{
       ...state,
       loading:true
    }
},
reviewsSuccess(state,action){
   return{
       ...state,
       loading:false,
       reviews:action.payload.reviews,
       
   }
},
reviewsFail(state,action){
      return{
       ...state,
       loading:false,
       error:action.payload
      }
},
deleteReviewRequest(state,action){
    return{
       ...state,
       loading:true
    }
},
  deleteReviewSuccess(state,action){
   return{
       ...state,
       loading:false,
      isReviewDeleted:true
   }
},
  deleteReviewFail(state,action){
      return{
       ...state,
       loading:false,
       error:action.payload
      
      }
},
clearReviewDeleted(state,action){
    return{
        ...state,
        isReviewDeleted:false
    }
},


    clearError(state,action){
        return{
            ...state,
            error:null

        }
          

       },
       clearProduct(state,action){
         return{
            ...state,
            product:{}
         }
       }


    }
});

const {actions,reducer}=productSlice;

export const {productRequest,
              productSuccess,
              productFail,
              createReviewFail,
              createReviewSuccess,
              createReviewRequest,
              clearError,
              clearReviewSubmited,
              clearProduct,
              newProductFail,
              newProductRequest,
              newProductSuccess,
              clearProductCreated,
              deleteProductFail,
              deleteProductSuccess,
              deleteProductRequest,
              clearProductDeleted,
              UpdateProductFail,
              UpdateProductSuccess,
              UpdateProductRequest,
              clearProductUpdated,
              reviewsFail,
              reviewsSuccess,
              reviewsRequest,
              clearReviewDeleted,
              deleteReviewFail,
              deleteReviewRequest,
              deleteReviewSuccess,
              
            }=actions;
export default reducer;