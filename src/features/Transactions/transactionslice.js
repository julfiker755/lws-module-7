import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addtransactions, deletetransactions, editransactions, gettransactions } from "./transactionsapi"

const initialState={
    transactions:[],
    isLoading:false,
    isError:false,
    error:"",
    editing:{},
}
//get transactions
export const fetchtransaction=createAsyncThunk('transactions/fetchtransactions',async()=>{
    const transactions=await gettransactions()
    return transactions
})
//createtransactions
export const createtranstion=createAsyncThunk('transaction/createtranstion',async(data)=>{
    const transaction=await addtransactions(data)
    return transaction
})
// changetransaction
export const changetransaction=createAsyncThunk('transaction/changetransaction',async({id,data})=>{
    const singlechange=await editransactions(id,data)
    return singlechange
})
// removettransaction
export const removetransaction=createAsyncThunk('transactions/removetransactin',async(id)=>{
    const transactions=await deletetransactions(id)
    return transactions

})
const transactionslice =createSlice({
    name:'transactions',
    initialState,
    reducers:{
      Editactive:(state,action)=>{
      state.editing=action.payload
      },
      Editblank:(state)=>{
        state.editing={}
      }
    },
    extraReducers:(builder=>{
        builder
        .addCase(fetchtransaction.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(fetchtransaction.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.transactions=action.payload
        })
        .addCase(fetchtransaction.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.transactions=[];
            state.error=action.error?.message
        })
        .addCase(createtranstion.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(createtranstion.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.transactions.push(action.payload)
        })
        .addCase(createtranstion.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.transactions=[];
            state.error=action.error?.message
        })
        .addCase(changetransaction.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(changetransaction.fulfilled,(state,action)=>{
            state.isLoading=false;
            const indextoupdate=state.transactions.findIndex(t=>t.id === action.payload.id)
            state.transactions[indextoupdate]=action.payload
        })
        .addCase(changetransaction.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.transactions=[];
            state.error=action.error?.message
        })
        .addCase(removetransaction.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(removetransaction.fulfilled,(state,action)=>{
           
            state.isLoading=false;
            state.transactions=state.transactions.filter(t=>t.id !== action.meta.arg)
        })
        .addCase(removetransaction.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.transactions=[];
            state.error=action.error?.message
        })
    })
})
export const {Editactive,Editblank}=transactionslice.actions
export default transactionslice.reducer;