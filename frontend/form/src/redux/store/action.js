import axios from "axios";
const jsonconfig = {
    headers:{"Content-type":"application/json"},
    withCredentials:true
}

// Admin login
export const handlelogin = (loginCred) => async (dispatch) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const {data}  = await axios.post(
        'http://localhost:3000/auth/adminlogin',
        loginCred,
        jsonconfig
      );
      setTimeout(()=>{
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        dispatch(loadUser());
      },500)
      return data;
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: "Login Failed" });
      return (
        console.log("error in login api"),
        error.response.data ||
        error.message ||
        "Login Failed Please Try Again After Sometime"
      );
    }
  };



  //Logout Redux setup
  export const handlelogout =()=>
     async (dispatch)=>{
    try{
      dispatch({type:"LOGOUT"})
      const logout = await axios.post('http://localhost:3000/auth/cookies', {}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      
    }catch(error){
      console.log("logout failed",error);
       
    }
  }

  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: "LOAD_REQ" });
      console.log("load req dispacth");
      const { data } = await axios.get('http://localhost:3000/auth/loadUser', jsonconfig);
      console.log(data.userData._id);
      dispatch({ type: "LOAD_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "LOAD_FAIL", payload: error });
      console.log("error: ", error);
      return error.response.data;
    }
  };

  export const handleUserData =()=>async (dispatch)=>{
      try{
      dispatch({type:"ALL_USER_LOADING"})
      const {data} = await axios.get('http://localhost:3000/users/dataset',jsonconfig)
      setTimeout(()=>{
        dispatch({type:"ALL_USER_SUCCESS",payload:data})
      },1000)
    }catch(error){
      dispatch({type:"ALL_USER_ERROR",payload:error})
      console.log("error: ",error);
      return error.response.data
    }
  }
  export const handleSendMessage = (credential) => async (dispatch) => {
    try{
      const {data} =await axios.post('http://localhost:3000/chat/sendmessage',
      credential,
      jsonconfig)
      return data
      
    }catch(error){
      console.log(error);
    }
  }