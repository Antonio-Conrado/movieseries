import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import axiosClient from '../config/axiosClient';
import configHeader from '../config/configHeader';

import Nav from "./Nav";

const MainCard = ({ urlAPI }) => {
    const [information, setInformation] = useState([]);
    //number of image
    const [firstImage, setFirstImage] = useState(0);
    const [indexImage, setIndexImage] = useState(1);
    //image download
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const getInformation = async () => {
            const url = `${urlAPI}`;
            const { data } = await axiosClient(url, configHeader);
            setInformation(data.results);
        };
        getInformation();
    }, []);

    
    //transition of image
    useEffect(() => {
        if (!imagesLoaded) return;

        const interval = setInterval(() => {
            setFirstImage(prevIndex => {
                let nextIndex = prevIndex + indexImage;

                if (nextIndex >= information.length) {
                    // If we reach the end, we change the indexImage to -1 to go back
                    setIndexImage(-1);
                    nextIndex = information.length - 1;
                } else if (nextIndex < 0) {
                    // If we reach the beginning, we change the indexImage to 1 to move forward
                    setIndexImage(1);
                    nextIndex = 0;
                }
                return nextIndex;
            });
        }, 8000);

        return () => clearInterval(interval);
    }, [information.length, indexImage, imagesLoaded]);

    // Function to change image index based on indexImage
    const ChangeImage = (indexImage) => {
        setFirstImage(prevIndex => {
            let newIndex = (prevIndex + indexImage + information.length) % information.length;
            return newIndex;
        });
    }
    const handleImageLoad = () => {
        if (information.every(info => info.backdrop_path)) {
            setImagesLoaded(true);
        }
    };
    


    return (
        <div className="overflow-x-auto flex overflow-scroll">
            <div
                className="flex transition-transform duration-[1000ms] ease-in-out"
                style={{ transform: `translateX(-${firstImage * 100}%)` }}
            >
                {information.map(info => (
                    <div
                        className="relative min-w-full h-main__card flex justify-center "
                        key={info.id}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w1280/${info.backdrop_path}`}
                            className="opacity-80 w-full"
                            alt="image"
                            onLoad={handleImageLoad}
                        />
                        <Nav />

                        <div className="absolute bottom-0  text-white text-center p-4">
                            <Link
                                to={`/informacion/${info.id}`}
                                className="font-bold text-md font-serif hover:cursor-pointer "
                            >
                                {info.title}
                            </Link>
                            <p>{info.release_date ? info.release_date.slice(0, -6) : info.first_air_date.slice(0, -6)}</p>
                        </div>

                        {/*  previous- next */}
                        {imagesLoaded && (
                        <div className="hidden lg:flex items-center">
                            <img
                                src='./assets/icons/previous.png'
                                className="h-10 absolute left-2 bg-gray-900 rounded-full p-2 opacity-50 hover:opacity-80 hover:cursor-pointer"
                                alt="image"
                                onClick={() => ChangeImage(-1)}
                            />
                            <img
                                src='./assets/icons/next.png'
                                className="h-10 absolute right-2 bg-gray-900 rounded-full p-2 opacity-50 hover:opacity-80 hover:cursor-pointer"
                                alt="image"
                                onClick={() => ChangeImage(1)}
                            />
                        </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}

MainCard.propTypes = {
    urlAPI: PropTypes.string.isRequired
}

export default MainCard;

