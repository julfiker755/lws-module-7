import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActiveBank, createtransactons1, updatetransactions } from "../features/Transactions/Transactionslice";

export default function Form() {
    const [user,setuser]=useState({
        name:"",
        type:"",
        amount:"",
    })
    const dispatch=useDispatch()
    const [show,setshow]=useState(false)
    const {editing}=useSelector(state=>state.transaction)
    const resetfrom=()=>{
        setuser({
            name:"",
            type:"",
            amount:"",
        })
    }
    useEffect(()=>{
        const {id,type,name,amount}=editing || {}
        if(id){
            setshow(true)
            setuser({
                name:name,
                type:type,
                amount:amount,
            })
        }else{
            setshow(false)
            resetfrom()
        }
    },[editing])
    const handlechange=(event)=>{
        if(event.target.name === 'amount'){
            setuser((prevalue)=>({...prevalue,[event.target.name]:parseFloat(event.target.value)}))
        }else{
            setuser((prevalue)=>({...prevalue,[event.target.name]:event.target.value}))
        }
        
    }
    const handlefrom=(e)=>{
        e.preventDefault()
        dispatch(createtransactons1(user))
        // reset form
        resetfrom()
    }
    const Updatefrom=(e)=>{
       e.preventDefault()
       dispatch(updatetransactions({
        id:editing?.id,
        data:user,
       }))
       setshow(false)
       resetfrom()
    }
    // cancle from
    const cancelfrom=()=>{
        dispatch(ActiveBank())
    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>
             <form onSubmit={show ? Updatefrom:handlefrom}>
             <div className="form-group">
                <label for="transaction_name">Name</label>
                <input
                    type="text"
                    placeholder="My Salary"
                    name="name"
                    value={user.name}
                    onChange={handlechange}
                />
            </div>

            <div className="form-group radio">
                <label for="transaction_type">Type</label>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="income"
                        name="type"
                        checked={user.type === "income"}
                        onChange={handlechange}
                    />
                    <label for="transaction_type">Income</label>
                </div>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="expense"
                        placeholder="Expense"
                        name="type"
                        checked={user.type === "expense"}
                        onChange={handlechange}
                    />
                    <label for="transaction_type">Expense</label>
                </div>
            </div>

            <div className="form-group">
                <label for="transaction_amount">Amount</label>
                <input
                    type="number"
                    placeholder="300"
                    value={user.amount}
                    name="amount"
                    onChange={handlechange}
                />
            </div>

            <button className="btn">{show ? "Update Transactions":"Add Transactions"}</button><br/>
             </form>
             {/* cancel_edit */}
           {show && <button onClick={()=>cancelfrom()} className="btn btn-red">Cancel Edit</button>}
        </div>
    );
}
