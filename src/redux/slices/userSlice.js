import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userData",
    initialState:{
        products:[],
        cart:[],
        login: false
    },
    reducers:{
        setProducts:(state, action) => {
            state.products = [...action.payload.data];
        },

        setCart:(state, action) => {
            let id = action.payload.id;
            let temp = [];
            let found = false;
            for (let obj of state.cart) {
              if(obj.id == id) {
                obj.count = obj.count + 1;
                temp.push(obj);
                found = true;
              }else{
                temp.push(obj);
              }
            }
            if (!found){
              let obj = {
                id: id,
                count: 1
              }
              temp.push(obj);
            }
            state.cart = [...temp];
        },

        descreaseCartCount: (state, action) => {
          let id = action.payload.id;
          let temp = [];
         
          for (let obj of state.cart) {
            if(obj.id == id) {
              if(obj.count > 1){
                obj.count = obj.count - 1;
                temp.push(obj);
              }else{
                temp.push(obj);
              }

            }else{
              temp.push(obj);
            }
          }
          state.cart = [...temp];
        },

        removeCartProduct: (state, action) => {
          let id = action.payload.id;
          let temp = []
          for (let obj of state.cart) {
            if (obj.id != id) {
              temp.push(obj);
            }
          }
          state.cart = [...temp];
        },

        removeAllCartProduct: (state, action) => {
          state.cart = [];
        },

        setLogin: (state, action) => {
          state.login = action.payload.data;
        }

    }
})

export const {setProducts, setCart, descreaseCartCount, removeCartProduct, removeAllCartProduct, setLogin} = userSlice.actions;
export default userSlice.reducer;