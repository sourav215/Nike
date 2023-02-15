import axios from "axios";
import * as types from "./actiontype";


export const signupUser = (params, toast,navigate) => (dispatch) => {
  
  dispatch({ type: types.SIGNUP_LOADING });
console.log("params", params);
  return axios
    .post("/users/signup", params)
    .then((r) =>{
      dispatch({ type: types.SIGNUP_SUCCESS, payload: r.data.message })
      toast({
        title: `Signup Successful`,
        status: "success",
        isClosable: true,
      });
      navigate('/login')
    }
      
    )
    .catch((err) => {
      dispatch({ type: types.LOGIN_FAILURE });
      toast({
        title: `Error! Signup failed.`,
        status: "error",
        isClosable: true,
      });
  });
};

export const loginUser = (temp, toast, navigate) => (dispatch) => {
  dispatch({ type: types.LOGIN_LOADING });

 axios({
    method: "POST",
    url: "/users/login",
    data: temp,
  })
    .then((r) => {
      console.log("token from action",r);
   dispatch({ type: types.LOGIN_SUCCESS, payload: r.data.token });
   
     localStorage.setItem("token",r.data.token)
     toast({
      title: `Login Successful `,
      status: "success",
      isClosable: true,
    });
    navigate(-1);
    })
    .catch((e) => {
      dispatch({ type: types.LOGIN_FAILURE })
      toast({
        title: `Error! Login failed. Please recheck the phone number and password and try again.`,
        status: "error",
        isClosable: true,
      });
  });
  
};

export const logout =()=> (dispatch) =>{
  localStorage.removeItem("token");
  dispatch({type:types.LOGOUT_SUCCESS,payload:""})
}