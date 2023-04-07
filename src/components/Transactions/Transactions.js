import { useDispatch, useSelector } from "react-redux";
import Transaction from "./Transaction";
import { useEffect } from "react";
import { fetchtransaction } from "../../features/Transactions/transactionslice";

export default function Transactions() {
    const {transactions,isLoading,isError,error}=useSelector(state=>state.transactions)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchtransaction())
    },[])
    let content=null;
    if(isLoading) content=<div>Loading......</div>
    if(!isLoading && isError) content=<div>{error}</div>
    if(!isLoading && !isError && transactions?.length === 0) content=<div>Your transactinos not found</div>
    if(!isLoading && !isError && transactions?.length > 0){
        content=transactions.map(trans=><Transaction key={trans.id} trans={trans}></Transaction>)
    }
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
