import {Link} from "react-router-dom"
export default function Home(){
    return(
        <>
        <h1>HOME</h1>
        <Link to="/products">Products</Link>
        </>
    )
}