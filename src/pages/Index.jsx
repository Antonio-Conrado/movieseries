
import MainCard from "../components/MainCard";

//links
import { moviePopular } from "../Links/Links";

const Index = () => {
    return ( 
        <>
            <MainCard 
                urlAPI= {moviePopular}
            />
        </>
    );
}

export default Index;