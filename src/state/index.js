import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:"light",
    user: null,
    token:null,
    posts: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setLogin: (state, action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state)=>{
            state.user = null;
            state.token = null;
        },
        setProducts: (state, action)=>{
            if(state.company){
                state.company.products = action.payload.products;
            } else {
                console.error("products company non-existent :(")
            }
        },
        setCompanies:(state, action) => {
            state.companies = action.payload.companies;
        },
        setCompany: (state, action) => {
         const updateCompanies = state.companies.map((company)=>{
            if(company.id === action.payload.id) return action.payload.company;
            return company;
         });   

         state.companies = updateCompanies;

        }
    }
});

export const {setLogin, setLogout, setProducts, setCompanies, setCompany } = authSlice.actions;
export default authSlice.reducer;