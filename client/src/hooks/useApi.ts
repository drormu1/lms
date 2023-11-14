import React, { useContext } from "react";
import axios from "axios";
//import SearchContext,{loadingContext} from '../state/context';
import config from "../config";

export default function useApi() {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    timeout: 350000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      appToken: localStorage.getItem("appToken"),
      roleIds: localStorage.getItem("roleIds"),
    },
  });

  // Add a request interceptor
  client.interceptors.request.use(
    function (config) {
      if (config.url === "/search" || config.url === "/init") {
        let d = new Date().getMilliseconds();
        //console.log('request SET_LOADING - on',d);
        // loadingDispatch({ type: "SET_LOADING", payload: { loading: true, d } });
      }
      return config;
    },
    function (error) {
      if (error.config.url === "/search" || error.config.url === "/init") {
        //  loadingDispatch({ type: "SET_LOADING", payload: { loading: false } });
        // dispatch({
        //   type: "SET_ERROR",
        //   payload: { errorMessage: error.response },
        // });
      }
      //console.log('set loading - request  off');
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  client.interceptors.response.use(
    function (response) {
      // if(response.config.url === '/search' || response.config.url === '/init')
      // {
      //   loadingDispatch({type:'SET_LOADING', payload:{loading:false}});
      // }
      let d = new Date().getMilliseconds();
      // console.log('response SET_LOADING off ',d);
      //  loadingDispatch({ type: "SET_LOADING", payload: { loading: false, d } });

      //console.log('set loading off');
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      return response;
    },
    function (error) {
      // if(error.config.url === '/search' || error.config.url === '/init')
      // {

      //   loadingDispatch({type:'SET_LOADING', payload:{loading:false}});
      //   dispatch({type:'SET_ERROR', payload:{errorMessage:error.response}});
      // }
      // loadingDispatch({ type: "SET_LOADING", payload: { loading: false } });
      // dispatch({
      //   type: "SET_ERROR",
      //   payload: { errorMessage: error.response },
      // });

      // dispatch({type:'SET_SERVER_ERROR', payload:error.response});
      return Promise.reject(error);
    }
  );

  const init = (): Promise<string> => {
    return client
      .get("/init")
      .then((response) => {
        //console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };

  // const fetchSearchNonActives = async (term) => {
  //   return searchNonActives(term).then(res => {
  //     return res;
  //       });
  //     };

  return { init };
}
