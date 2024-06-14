import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  clearUserDeleted,clearError} from "../../slices/UserSlice.js";
import { useDispatch ,useSelector} from "react-redux";
import { getUsers ,deleteUser} from "../../actions/userActions";
import Loader from '../layout/loader';
import {MDBDataTable} from 'mdbreact';
import { toast } from "react-toastify";
import Sidebar from "./SideBar";
import { Button } from "react-bootstrap";





export default function UserList(){
    const {users=[],loading=true,error,isUserDeleted}=useSelector(state=>state.userState);
   
   const dispatch=useDispatch();
     
     const setUsers=()=>{
           const data={
               columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'

                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'Email',
                    field:'email',
                    sort:'asc'
                },
                {
                    label:'Role',
                    field:'role',
                    sort:'asc'
                },
                {
                    label:'Action',
                    field:'actions',
                    sort:'asc'
                }
                 
        ],
               rows:[]
           };

    
           users.forEach(user=> {
                data.rows.push({
                     id:user._id,
                     name:user.name,
                     email:`${user.email}`,
                     role:user.role,
                     actions:(
                        <Fragment>
                            <Link to={`/admin/user/${user._id}`} className="btn btn-primary"><i className="fa fa-pencil"> </i></Link>
                          <Button onClick={(e)=>deleteHandler(e,user._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                            
                          </Button>
                        </Fragment>
                     )

                })
           });

           return data;

     };

     const deleteHandler=(e,id)=>{
   
         e.target.disabled=true;
         dispatch(deleteUser(id));
         return
    
     };
     
     useEffect(()=>{
        console.log('hello')
        if(error){
            toast(error,{
                position:toast.POSITION.BOTTOM_CENTER,
                type:'error',
                onOpen:()=>dispatch(clearError())
            })
            return
       }
       if(isUserDeleted){
        toast('User deleted successfully',{
          type:'success',
          position:toast.POSITION.BOTTOM_CENTER,
          onOpen:()=>dispatch(clearUserDeleted())
       })
      
       return;
      }
       dispatch(getUsers);
   
       
       },[dispatch,error,isUserDeleted]);

       return(
        <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
    
               <h1 class="my-4">User List</h1>
               <Fragment>
                    {loading ? <Loader/>:
                        <MDBDataTable
                          data={setUsers()}
                          bordered
                          striped
                          className='px-3'
                        />
                     }
               </Fragment>
                    
           </div>
    </div>
       )
   
}