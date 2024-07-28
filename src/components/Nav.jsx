import { Link } from "react-router-dom";
const Nav = () => {
    return ( 
        <nav className=" absolute top-2 left-3 justify-normal">
            <Link
                to={'/'}
                className="text-white font-bold font-serif hover:cursor-pointer">Movie Series</Link>
        </nav>
    );
}
export default Nav