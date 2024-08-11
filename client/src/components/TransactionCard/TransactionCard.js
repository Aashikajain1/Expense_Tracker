import toast, {Toaster} from "react-hot-toast";
import axios from "axios";

function TransactionCard({ _id, title, amount, category, type, createdAt, loadTransactions }) {

  const deleteTransaction = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${_id}`)

    toast.success(response.data.message)

    loadTransactions()
  }

  return (
    <div className="border border-light-2 mx-5 my-5 p-5 rounded " style={{position:"relative",boxShadow:"0 0 5px blue"}}>
      <h1 className="m-0 fs-1">
        {title}
      </h1>

      <span className="fs-5">
        {new Date(createdAt).toLocaleString()}
      </span>

      <span className="fs-5 bg-primary text-light rounded p-2"style={{position:"absolute",right:"10px",bottom:"45px",cursor:"pointer"}}>
        {category}
      </span>

      <span className="fs-5" style={{
        color: type === "credit" ? "green": "red",position:"absolute",right:"10px",top:"10px"
      }}>
        {type === "credit" ? "+": "-"}
        {amount}
      </span>

      <button style={{cursor:"pointer",marginLeft:"30px",padding:"2px 9px"}}className="bg-dark text-light fs-5  border-0 rounded-pill " onClick={deleteTransaction}>
        Delete
      </button>
      <Toaster />
    </div>
  )
}

export default TransactionCard
