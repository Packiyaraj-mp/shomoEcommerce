import { OrderDetailFail, OrderDetailRequest, OrderDetailSuccess, adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, userOrderFail, userOrderRequest, userOrderSuccess } from "../slices/orderSlice"
import axios from 'axios';

  export const createOrder=order=>async(dispatch)=>{
        try{
             dispatch(createOrderRequest);
           const {data} = await axios.post(`/api/v1/order/new`,order);
            dispatch(createOrderSuccess(data));

        }catch(err){
            dispatch(createOrderFail(err.response.data.message))
        }
  };

  export const userOrders= async(dispatch)=>{
      try{
        dispatch(userOrderRequest());
        const {data}=await axios.get('/api/v1/myOrders');
        dispatch(userOrderSuccess(data))
    
        
      }catch(error){
        dispatch(userOrderFail(error.response.data.message))
      }
  };

  export const OrderDetail= id=>async(dispatch)=>{
    try{
      dispatch(OrderDetailRequest());
      const {data}=await axios.get(`/api/v1/order/${id}`);
      dispatch(OrderDetailSuccess(data));
  
      
    }catch(error){
      dispatch(OrderDetailFail(error.response.data.message))
    }
};

export const adminOrders= async(dispatch)=>{
  try{
    dispatch(adminOrdersRequest());
    const {data}=await axios.get('/api/v1/admin/orders');
    dispatch(adminOrdersSuccess(data))

    
  }catch(error){
    dispatch(adminOrdersFail(error.response.data.message))
  }
};
export const deleteOrder=id=> async(dispatch)=>{
  try{
    dispatch(deleteOrderRequest());
    const {data}=await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch(deleteOrderSuccess(data));

    
  }catch(error){
    dispatch(deleteOrderFail(error.response.data.message))
  }
};

export const updateOrder=(id,orderData)=> async(dispatch)=>{
  try{
    dispatch(deleteOrderRequest());
    const {data}=await axios.put(`/api/v1/admin/order/${id}`,orderData);
    dispatch(deleteOrderSuccess(data));

    
  }catch(error){
    dispatch(deleteOrderFail(error.response.data.message))
  }
};

