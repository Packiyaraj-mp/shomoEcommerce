import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        loading:true,
        isAuthenticated:false
    },
    reducers:{
        loginRequest(state,action){
             return{
                ...state,
                loading:true,
               
             }
        },
        loginSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
              
            }
        },
        loginFail(state,action){
               return{
                ...state,
                loading:false,
                error:action.payload
               }
        },
        clearError(state,action){
            return({
                ...state,
                error:null
             }
          )
        
        },
        registerRequest(state,action){
            return{
               ...state,
               loading:true,
              
            }
       },
       registerSuccess(state,action){
           return{
               loading:false,
               isAuthenticated:true,
               user:action.payload.user
           }
       },
       registerFail(state,action){
              return{
               ...state,
               loading:false,
               error:action.payload
              }
       },



   loadUserRequest(state,action){
    
        return{
           ...state,
           isAuthenticated:false,
           loading:true,
          
        }
   },
   loadUserSuccess(state,action){
   
       return{
           loading:false,
           isAuthenticated:true,
           user:action.payload.user
       }
   },
   loadUserFail(state,action){
 
          return{
           ...state,
           loading:false,
          
          }
   },

logoutSuccess(state,action){
   
    return{
        loading:false,
        isAuthenticated:false,
        
    }
},
logoutFail(state,action){
       return{
        ...state,
        error:action.payload
       }
},

updateProfileRequest(state,action){
    return{
       ...state,
       loading:true,
       isUpdated:false
      
    }
},
UpdateProfileSuccess(state,action){
   return{
        ...state,
       loading:false,
       user:action.payload.user,
       isUpdated:true
   }
},
updateProfileFail(state,action){
      return{
       ...state,
       loading:false,
       error:action.payload
      }
},
clearUpdateProfile(state,action){
     return{
         ...state,
         isUpdated:false
     }
},
updatePasswordRequest(state,action){
    return{
       ...state,
       loading:true,
       isUpdated:false
      
    }
},
UpdatePasswordSuccess(state,action){
   return{
        ...state,
       loading:false,
       isUpdated:true
   }
},
updatePasswordFail(state,action){
      return{
       ...state,
       loading:false,
       error:action.payload
      }
},

forgetPasswordRequest(state,action){
    return{
       ...state,
       loading:true,
       message:null  
    }
},
forgetPasswordSuccess(state,action){
   return{
        ...state,
       loading:false,
       message:action.payload.message
   }
},
forgetPasswordFail(state,action){
      return{
       ...state,
       loading:false,
       error:action.payload
      }
},
resetPasswordRequest(state,action){
    return{
       ...state,
       loading:true,  
    }
},
resetPasswordSuccess(state,action){
   return{
        ...state,
       loading:false,
       isAuthenticated:true,
       user:action.payload.data.user
   }
},
resetPasswordFail(state,action){
      return{
       ...state,
       loading:false,
       error:action.payload
      }
},


    }
});

const {actions,reducer}=authSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutFail,
    logoutSuccess,
    updateProfileRequest,
    updateProfileFail,
    UpdateProfileSuccess,
    updatePasswordFail,
    updatePasswordRequest,
    UpdatePasswordSuccess,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    forgetPasswordRequest,
    forgetPasswordSuccess,
    forgetPasswordFail ,
    clearUpdateProfile }=actions;

export default reducer;