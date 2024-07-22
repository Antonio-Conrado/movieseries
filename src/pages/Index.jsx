
import Card from "../components/Card";
import MainCard from "../components/MainCard";

//links
import { moviePopular,seriesPopular,topRated } from "../Links/Links";

const Index = () => {
    return ( 
        <>
            <MainCard 
                urlAPI= {moviePopular}
            />
            <section className="container mx-auto my-10">
                <Card 
                    urlAPI= {topRated}
                    title='Películas más valoradas'
                />
                <Card 
                    urlAPI= {seriesPopular}
                    title='Series Populares'
                />
            </section>
            
        </>
    );
}

export default Index;