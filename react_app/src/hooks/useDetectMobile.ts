import React from "react";
import { useDispatch } from "react-redux";
import { AppActionTypes } from "../redux/types/App";

const useDetectMobile = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (window.screen.width <= 768) dispatch({ type: AppActionTypes.SET_IS_MOBILE, payload: true });
    }, [dispatch]);
}

export default useDetectMobile;