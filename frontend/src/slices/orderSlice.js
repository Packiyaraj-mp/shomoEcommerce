import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const orderSlice=createSlice({
      name:'order',
      initialState:{
           orderDetail:{},
           userOrders:[],
           loading:false,
           adminOrders:[],
           isOrderDeleted:false,
           isOrderUpdated:false
      },
      reducers:{
          createOrderRequest(state,action){
            return{
                  ...state,
                  loading:true
            }
          },
          createOrderSuccess(state,action){
            return{
                  ...state,
                  loading:false,
                  orderDetail:action.payload.order

            }
          },
          createOrderFail(state,action){
              return{
                  ...state,
                  loading:false,
                  error:action.payload
              }
          },
           userOrderRequest(state,action){
            return{
                  ...state,
                  loading:true
            }
          },
          userOrderSuccess(state,action){
            return{
                  ...state,
                  loading:false,
                  userOrders:action.payload.orders

            }
          },
          userOrderFail(state,action){
              return{
                  ...state,
                  loading:false,
                  error:action.payload
              }
          },
          OrderDetailRequest(state,action){
            return{
                  ...state,
                  loading:true
            }
          },
          OrderDetailSuccess(state,action){
            return{
                  ...state,
                  loading:false,
                  orderDetail:action.payload.order

            }
          },
          adminOrdersRequest(state,action){
            return{
                  ...state,
                  loading:true
            }
          },
          adminOrdersSuccess(state,action){
            return{
                  ...state,
                  loading:false,
                  adminOrders:action.payload.orders

            }
          },
          adminOrdersFail(state,action){
              return{
                  ...state,
                  loading:false,
                  error:action.payload
              }
          },
          deleteOrderRequest(state,action){
            return{
                ...state,
                loading:true,
                
            }
        },
        deleteOrderSuccess(state,action){
          return{
              ...state,
              loading:false,
              isOrderDeleted:true
              
          }
      },
      deleteOrderFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
            
        }
    },
    updateOrderRequest(state,action){
      return{
          ...state,
          loading:true,
          
      }
  },
  updateOrderSuccess(state,action){
    return{
        ...state,
        loading:false,
        isOrderUpdated:true
        
    }
},
updateOrderFail(state,action){
  return{
      ...state,
      loading:false,
      error:action.payload
      
  }
},
clearOrderDeleted(state,action){
   return{
     ...state,
     isOrderDeleted:false
   }
},
clearOrderUpdated(state,action){
    return{
       ...state,
       isOrderUpdated:false
    }
},
 
  clearOrderError(state,action){
         return{
            ...state,
             error:null
             }
          }
           
      }
});
const {actions,reducer}=orderSlice;
export const {createOrderFail,
              createOrderSuccess,
              createOrderRequest,
              clearOrderError,
              userOrderFail,
              userOrderRequest,
              userOrderSuccess,
              OrderDetailFail,
              OrderDetailSuccess,
              OrderDetailRequest,
              adminOrdersFail,
              adminOrdersSuccess,
              adminOrdersRequest,
              deleteOrderSuccess,
              deleteOrderRequest,
              deleteOrderFail,
              updateOrderFail,
              updateOrderRequest,
              updateOrderSuccess,
              clearOrderDeleted,
              clearOrderUpdated}=actions;
export default reducer;