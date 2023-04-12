import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createtransactions, deletetransactions, edittransactions, gettransactions } from "./Transactionsapi"

const initialState={
    transactions:[],
    isLoading:false,
    isError:false,
    error:"",
    editing:{}
}

// get data
export const fetchgetransactions=createAsyncThunk("transactions/fetchgettransactions",async()=>{
    const data=await gettransactions()
    return data;
})
// create transactions
export const createtransactons1=createAsyncThunk("transactions/createtransactions",async(data)=>{
    const transactions=await createtransactions(data)
    return transactions
})
// updatetransactions
export const updatetransactions=createAsyncThunk('transactions/updatetransactions',async({id,data})=>{
    const transactions=await edittransactions(id,data)
    return transactions
})
// delete transactions
export const deletetransactions1=createAsyncThunk('transactions/deletetransactions',async(id)=>{
    const transactions=await deletetransactions(id)
    return transactions
})

const Transactionslice =createSlice({
    name:'trans',
    initialState,
    reducers:{
      Actionedit:(state,action)=>{
        state.editing=action.payload
      },
      ActiveBank:(state)=>{
        state.editing={}
      }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchgetransactions.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(fetchgetransactions.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.transactions=action.payload
        })
        .addCase(fetchgetransactions.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.transactions=[];
            state.error=action.error?.message
        })
        .addCase(createtransactons1.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(createtransactons1.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.transactions.push(action.payload)
        })
        .addCase(createtransactons1.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.transactions=[];
            state.error=action.error?.message
        })
        .addCase(updatetransactions.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(updatetransactions.fulfilled,(state,action)=>{
            state.isLoading=false;
            const updateindex=state.transactions.findIndex(t=>t.id === action.payload.id)
            state.transactions[updateindex]=action.payload
        })
        .addCase(updatetransactions.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.transactions=[];
            state.error=action.error?.message
        })
        .addCase(deletetransactions1.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(deletetransactions1.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.transactions=state.transactions.filter(t=>t.id !== action.meta.arg)
        })
        .addCase(deletetransactions1.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.transactions=[];
            state.error=action.error?.message
        })
    }

})
export const {Actionedit,ActiveBank}=Transactionslice.actions
export default Transactionslice.reducer;