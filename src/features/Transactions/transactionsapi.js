import axiosinstance from "../../utils/axios"

export const gettransactions=async()=>{
    const res=await axiosinstance.get("/transactions")
    return res.data
}
export const addtransactions=async(data)=>{
    const res=await axiosinstance.post("/transactions",data)
    return res.data
}
export const editransactions=async(id,data)=>{
    const res=await axiosinstance.put(`/transactions/${id}`,data)
    return res.data
}
export const deletetransactions=async(id)=>{
    const res=await axiosinstance.delete(`/transactions/${id}`)
    return res.data
}