import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import configHeaders from "../config/configHeader";
import axiosClient from "../config/axiosClient";

const Card = ({ urlAPI, title }) => {
    const [information, setInformation] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const getInformation = async () => {
            const { data } = await axiosClient(`${urlAPI}`, configHeaders);
            setInformation(data.results);
            console.log(data)
        };
        getInformation();
    }, [urlAPI]);

    // Function to scroll images
    const ChangeImage = (direction) => {// direction = 'previous' or 'next'
        if (scrollRef.current) {
            // scrollLeft: the number of pixels that the content of the container is scrolled from the left
            // clientWidth: the visible width of the container
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'next' ? scrollLeft + clientWidth : scrollLeft - clientWidth;
            // Scroll the container to the new position with a smooth transition
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const voteFormat = useMemo(() => vote =>  vote.toString(),[information]);
    return (
        <>
            <h3 className="font-bold font-serif text-center text-cyan-500 my-6">{title}</h3>
            <div className="relative">
                <div className="overflow-x-auto overflow-scroll flex min-h-72" ref={scrollRef}>
                    <div className="flex gap-3 items-center mx-10">
                        {information.map(info => (
                            <div key={info.id} className="flex-shrink-0 rounded-2xl">
                                <div className="w-40 h-52 relative">
                                    <Link
                                        to={`/information/${info.id}`}
                                        className="font-bold text-sm font-serif hover:cursor-pointer hover:text-gray-50"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`}
                                            className="w-full h-52 object-center rounded-tl-2xl rounded-tr-2xl"
                                            alt="image"
                                        />
                                    </Link>
                                    {/* value */}
                                    <div className="flex items-center justify-around absolute w-6 h-5 top-3 right-2">
                                        <p className="text-white opacity-90">{voteFormat(info.vote_average).slice(-0,1)}</p>
                                        <img src="./assets/icons/star.png" alt="" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center text-center w-40 h-20 text-gray-300 bg-slate-800 rounded-b-2xl">
                                    <Link
                                        to={`/information/${info.id}`}
                                        className="font-bold text-sm font-serif hover:cursor-pointer hover:text-gray-50"
                                    >
                                        {info.title ? info.title : info.name}
                                    </Link>
                                    <p>{info.release_date ? info.release_date.slice(0, -6) : info.first_air_date.slice(0, -6)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* previous - next */}
                <div className="absolute inset-y-0 left-4 flex items-center">
                    <img
                        src='./assets/icons/previous.png'
                        className="h-8 bg-gray-900 rounded-full p-2 opacity-70 hover:opacity-90 hover:cursor-pointer"
                        alt="previous"
                        onClick={() => ChangeImage('prev')}
                    />
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center">
                    <img
                        src='./assets/icons/next.png'
                        className="h-8 bg-gray-900 rounded-full p-2 opacity-70 hover:opacity-90 hover:cursor-pointer"
                        alt="next"
                        onClick={() => ChangeImage('next')}
                    />
                </div>
            </div>
        </>
    );
};
Card.propTypes = {
    urlAPI: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default Card;
