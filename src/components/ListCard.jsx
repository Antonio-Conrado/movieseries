import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import axiosClient from '../config/axiosClient';
import configHeaders from '../config/configHeader';

const ListCard = ({ urlAPI, title }) => {
    const [information, setInformation] = useState([]);

    useEffect(() => {
        const getInformation = async () => {
            const { data } = await axiosClient(`${urlAPI}`, configHeaders);
            setInformation(data.results.slice(0, 10));
        };
        getInformation();
    }, [urlAPI]);

    return (
        <div className="my-5 py-2">
            <h3 className="font-bold font-serif text-center text-cyan-500 py-5">{title}</h3>
            {information.map(info => (
                <div key={info.id} className="grid grid-cols-2 gap-3  text-gray-300 my-2 px-10 py-2">
                    <div className="flex justify-center">
                        {!info.backdrop_path ?
                        // actors
                            <Link
                                to={`perfil/${info.id}`}
                                className="hover:cursor-pointer"
                            >
                                <img src={`https://image.tmdb.org/t/p/w185/${info.profile_path}`}
                                    className="h-20 lg:h-40 w-fit rounded-full opacity-85 hover:opacity-100"
                                    alt="image"
                                />
                            </Link>
                            
                            :
                            // movies
                            <Link
                                to={`informacion/${info.id}`}
                                className="hover:cursor-pointer"
                            >
                                <img src={`https://image.tmdb.org/t/p/w500/${info.backdrop_path}`}
                                    className="h-fit w-40 rounded-2xl opacity-85 hover:opacity-100"
                                    alt="image"
                                />
                            </Link>
                            
                        }

                    </div>
                    <div className="flex items-center justify-around text-gray-300 text-center ">
                        <Link
                            to={info.title ? `informacion/${info.id}` : `perfil/${info.id}`}
                            className="hover:cursor-pointer  hover:text-gray-50">{info.title ? info.title : info.name}</Link>
                    </div>
                </div>
            ))}

        </div>
    );
}
ListCard.propTypes = {
    urlAPI: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}
export default ListCard;