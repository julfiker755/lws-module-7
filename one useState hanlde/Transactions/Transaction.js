import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { Actionedit, deletetransactions1 } from "../../features/Transactions/Transactionslice";

export default function Transaction({tran}) {
    const {id,name,type,amount}=tran
    const dispatch=useDispatch()
    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button className="link">
                    <img alt="Edit" className="icon" onClick={()=>dispatch(Actionedit(tran))} src={editImage} />
                </button>
                <button className="link">
                    <img alt="Delete" onClick={()=>dispatch(deletetransactions1(id))} className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
