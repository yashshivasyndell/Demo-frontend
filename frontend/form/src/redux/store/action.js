import axios from "axios";
const jsonconfig = {
    headers:{"Content-type":"application/json"},
    withCredentials:true
}

export const handlelogin = (loginCred) => async (dispatch) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const {data}  = await axios.post(
        'http://localhost:3000/auth/login',
        loginCred,
        jsonconfig
      );
      console.log(data);
      setTimeout(()=>{
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        dispatch(loadUser());
      },500)
      return data;
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: "Login Failed" });
      return (
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
      console.log('Logout response',logout);
      
    }catch(error){
      console.log("logout failed",error);
       
    }
  }
  export const loadUser = () => async (dispatch) => {
    try {
      console.log("object");
      dispatch({ type: "LOAD_REQ" });
      
      const { data } = await axios.get('http://localhost:3000/auth/loadUser', jsonconfig);
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

      console.log(data.data.map((e) => {
        return new Date(e.created).toLocaleDateString("en-US");
      }));
      
      dispatch({type:"ALL_USER_SUCCESS",payload:data})
    }catch(error){
      dispatch({type:"ALL_USER_ERROR",payload:error})
      console.log("error: ",error);
      return error.response.data
    }
 
  }