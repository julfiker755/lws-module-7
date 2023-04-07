import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { Editactive, removetransaction } from "../../features/Transactions/transactionslice";
import numberWithCommas from "../../utils/Numberwidthcomma";

export default function Transaction({trans}) {
    const {id,name,type,amount}=trans || {}
    const dispatch=useDispatch()
    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {numberWithCommas(amount)}</p>
                <button className="link">
                    <img alt="Edit" className="icon" onClick={()=>dispatch(Editactive(trans))} src={editImage} />
                </button>
                <button className="link">
                    <img alt="Delete" onClick={()=>dispatch(removetransaction(id))} className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
