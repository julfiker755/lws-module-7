import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changetransaction, createtranstion } from "../features/Transactions/transactionslice";

export default function Form() {
    const [name,setname]=useState("")
    const [type,settype]=useState("")
    const [amount,setamount]=useState("")
    const [editmode,seteditmode]=useState(false)
    const dispatch=useDispatch()
    const {isLoading,isError,error}=useSelector(state=>state.transactions)
    const {editing}=useSelector(state=>state.transactions)
    const reset=()=>{
        setname("");
        settype("");
        setamount("");
    }
    // edit mode
    useEffect(()=>{
      const {id,name,type,amount}=editing || {}
      if(id){
        seteditmode(true)
        setname(name);
        settype(type);
        setamount(amount);
      }else{
        seteditmode(false)
        reset()
      }
    },[editing])
    // handlefrom
    const handlefrom=(e)=>{
        e.preventDefault()
        dispatch(createtranstion({name,type,amount}))
        reset()
    }
    // handleupdate
    const handleupdate=(e)=>{
        e.preventDefault()
        const data={name,type,amount}
        dispatch(changetransaction({
            id:editing?.id,
            data:data
        }))
        seteditmode(false)
        reset()
    }
    const canceleditmode=()=>{
        reset()
        seteditmode(false)
    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>
             <form onSubmit={editmode ? handleupdate:handlefrom}>
             <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="My Salary"
                    required
                    onChange={(e)=>setname(e.target.value)}
                />
            </div>

            <div className="form-group radio">
                <label for="transaction_type">Type</label>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="income"
                        name="transaction_type"
                        checked={type === 'income'}
                        onChange={(e)=>settype(e.target.value)}
                    />
                    <label for="transaction_type">Income</label>
                </div>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="expense"
                        name="transaction_type"
                        placeholder="Expense"
                        checked={type === 'expense'}
                        onChange={(e)=>settype(e.target.value)}
                    />
                    <label for="transaction_type">Expense</label>
                </div>
            </div>

            <div className="form-group">
                <label for="transaction_amount">Amount</label>
                <input
                    type="number"
                    placeholder="300"
                    name="amount"
                    value={amount}
                    required
                    onChange={(e)=>setamount(parseFloat(e.target.value))}
                />
            </div>

            <button disabled={isLoading} className="btn">{editmode ? 'Update Transaction':'Add Transaction'}</button>
            {/* how to error message */}
            {!isLoading && isError && <div className="error text-[red]">{error}</div>}
             </form>
             {editmode && (<button onClick={()=>canceleditmode()} className="btn cancel_edit" type="button">Cancel Edit</button>)}
        </div>
    );
    
}
