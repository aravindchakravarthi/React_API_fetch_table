import { configureStore } from "@reduxjs/toolkit";
import userReducer, {getUsers, updateUser, deleteUser} from '../features/datas/userSlice'

const store = configureStore({
    reducer:{
        user:userReducer
    }
})

export default store;
export { getUsers, updateUser, deleteUser };
