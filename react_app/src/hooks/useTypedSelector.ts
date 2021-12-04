import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/Root";

const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;