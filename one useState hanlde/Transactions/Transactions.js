import { useDispatch, useSelector } from "react-redux";
import Transaction from "./Transaction";
import { useEffect } from "react";
import { fetchgetransactions } from "../../features/Transactions/Transactionslice";


export default function Transactions() {
    const dispatch=useDispatch()
    const {transactions,isLoading,isError,error}=useSelector(state=>state.transaction)
    useEffect(()=>{
        dispatch(fetchgetransactions())
    },[dispatch])
   let content=null
   if(isLoading) content=<h1>Loading.....</h1>
   if(!isLoading && isError) content=<div>{error}</div>
   if(!isLoading && !isError && transactions?.length === 0) content=<div>Your not Transactions</div>
   if(!isLoading && !isError && transactions?.length > 0) content=transactions.map(tran=><Transaction tran={tran} key={tran.id}></Transaction>)
    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                   {content}
                </ul>
            </div>
        </>
    );
}
