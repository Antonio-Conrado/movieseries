import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import configHeaders from "../config/configHeader";
import axiosClient from "../config/axiosClient";

import Card from "./Card";
import Player from "./Player";
import Nav from "./Nav";
import Casting from "./Casting";
const Information = () => {
    const [information, setInformation] = useState({});
    const [categories, setCategories] = useState([]);
    const [playIsActive, setPlayIsActive] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const getInformation = async () => {
            const { data } = await axiosClient(`movie/${id}?language=es-US`, configHeaders);
            setInformation(data);
            setCategories(data.genres || []);
        };
        getInformation();
    }, [id]);
    //destructing of information
    const {vote_average, overview, release_date } = information;

    return (
        <>
            <div className="flex relative h-information ">
                {/* main image */}
                <div className="min-w-full">
                    {information.backdrop_path ?
                        <img src={`https://image.tmdb.org/t/p/w1280/${information.backdrop_path}`} className="h-96 w-full" alt="image" />
                        : information.poster_path ?
                            <img src={`https://image.tmdb.org/t/p/w780/${information.poster_path}`} className="h-96 w-full" alt="image" />
                            :
                            <img src="/assets/img/header.avif" className="h-96 w-full" alt="image" />
                    }
                </div>
                {/* second image */}
                <div className="h-information__image">
                    {information.poster_path ?
                        <img src={`https://image.tmdb.org/t/p/w500/${information.poster_path}`} className="h-52 rounded-3xl w-full" alt="image" />
                        : information.backdrop_path ?
                            <img src={`https://image.tmdb.org/t/p/w780/${information.backdrop_path}`} className="h-52 rounded-3xl w-full" alt="image" />
                            :
                            <img src="/assets/img/header.avif" className="h-52 rounded-3xl  w-full" alt="image" />
                    }
                </div>
            </div>

            {/* information */}
            <div className="container mx-auto mt-32 font-serif">
                <div className="flex justify-center items-center gap-3">
                    <h3 className="font-bold text-center text-gray-200 text-2xl hover:text-gray-50 hover:cursor-pointer ">{information.title}</h3>
                    <div className="flex  items-center gap-2">
                        {vote_average !== undefined && <p className="text-white">{vote_average.toFixed(1)}</p>}
                        <img src="/assets/icons/star.png" alt="image" />
                    </div>
                </div>

                <ul className="flex justify-around mx-1 my-2 ">
                    {categories.map(categorie => (
                        <li key={categorie.id} className="text-gray-300 p-1 border-l-4 border-red-500">{categorie.name}</li>
                    ))}
                </ul>
                <div className="my-2 px-5 py-2">
                    <p className="text-gray-300 font-bold text-justify">Descripción: <span className="font-normal">{overview}</span></p>
                </div>

                <div className="flex justify-around gap-2">
                    <div>
                        <button 
                            className="bg-red-500 px-2 py-2 rounded-lg text-white hover:bg-red-600 hover:cursor-pointer"
                            onClick={()=> setPlayIsActive(true)}
                        >Ver Trailer</button>
                    </div>

                    <button className="bg-green-500 px-2 py-2 rounded-lg text-white hover:bg-green-600 hover:cursor-pointer">Ver Película</button>
                </div>
                <Nav />
            </div>

            <div className="container mx-auto mt-12">
            <Casting 
                urlAPI={`movie/${id}/credits`}
                title="Casting"
            />
            </div>

            <div className="container mx-auto ">
                <Card
                    title='Recomendation'
                    urlAPI={`movie/${id}/similar?language=es-US`}
                />
            </div>

            <div className="relative">
            <Player isOpen={playIsActive} onClose={() => setPlayIsActive(false)} id={id} />
            </div>
            
            
        </>
    );
}
export default Information;