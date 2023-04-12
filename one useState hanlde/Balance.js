import { useSelector } from "react-redux";

export default function Balance() {
    const {transactions}=useSelector(state=>state.transaction)
    const totalbalance=(transactions)=>{
        let balance=0
        transactions.forEach(trans=>{
            const {type,amount}=trans
            if(type === 'income'){
                balance += amount
            }else{
                balance -= amount
            }
        })
        return balance
    }
    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3><span>৳</span><span> {transactions?.length > 0 ? totalbalance(transactions) :0}</span></h3>
        </div>
    );
}
