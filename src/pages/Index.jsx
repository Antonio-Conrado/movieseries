
import Card from "../components/Card";
import ListCard from "../components/ListCard";
import MainCard from "../components/MainCard";

//links
import { 
    moviePopular,
    seriesPopular,
    topRated,
    personPopular,
    topPeliculas
} from "../Links/Links";

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
            
            <section className=" my-10 container mx-auto section-with-divider">
                <div className="relative z-10">
                    <ListCard
                        urlAPI={topPeliculas}
                        title="Top Películas "
                    />
                </div>
                <div className="relative z-10">
                    <ListCard
                        urlAPI={personPopular}
                        title="Top Actores"
                    />
                </div>
            </section>
        </>
    );
}

export default Index;