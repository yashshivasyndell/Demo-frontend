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
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      dispatch(loadUser());
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