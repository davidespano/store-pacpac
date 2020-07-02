import React, {useEffect, useState} from "react";
import SearchPage from "./SearchPage";
import axios from "axios";
import settings from "../settings";


const NavigationBar = (props) => {
    const [type,setType] = useState([]);

    useEffect(() =>{
        const getType = async () => {
            const result = await axios.get(`${settings.api}generes`);
            setType(result.data);
        }
        getType();
    }, []);




    return(
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                    <a className="navbar-brand" href="#">PacPac Collection</a>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href={"/Home"}>Home</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href={settings.pacpac}>PacPac</a>
                            </li>



                        </ul>

                        <select id="inputStateNav" className="form-control" name="genere"
                                required >
                            <option name="genere"  > Seleziona
                                categoria
                            </option>
                            {type.map(tipo => (
                                <option key={tipo.id} >{tipo.tipologia}</option>
                            ))}
                        </select>
                        <SearchPage />
                        <h4>{getCookie('usernameToken')}</h4>
                    </div>
                </nav>

    );
}

function getCookie(c_name){
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}


export default NavigationBar;