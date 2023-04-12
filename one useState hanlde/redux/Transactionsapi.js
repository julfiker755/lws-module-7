import axiosinstance from "../../util/axios"
// get data
export const gettransactions=async()=>{
    const res=await axiosinstance.get("/transactions")
    return res.data
}
// create transactions
export const createtransactions=async(data)=>{
    const res=await axiosinstance.post("/transactions",data)
    return res.data
}
// edit transactions
export const edittransactions=async(id,data)=>{
    const res=await axiosinstance.put(`/transactions/${id}`,data)
    return res.data
}
// delete transactions
export const deletetransactions=async(id)=>{
    const res=await axiosinstance.delete(`/transactions/${id}`)
    return res.data
}