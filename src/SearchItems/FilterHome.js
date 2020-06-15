import React, {useState} from "react";
import '../index.css'
import FilterHomeContext from './contextSearch'
import ContentSearch from "./ContentSearch";

const FilterHome = ({children, activeSlide}) => {
    const [currentSlide, setCurrentSlide] = useState(activeSlide);



    const handleSelect = game => {
        setCurrentSlide(game);
    };
    const handleClose = () => {
        setCurrentSlide(null);
    };

    const contextValue = {
        onSelectSlide: handleSelect,
        onCloseSlide: handleClose,
        currentSlide,
    };
    let imgCounter = 0;

    const increment = () => {
        imgCounter++;
        console.log(imgCounter);
    };

    return(
            <FilterHomeContext.Provider value={contextValue}>
                <div>
                    <div className="elements">
                        <div>{children}</div>
                    </div>
                    {currentSlide && <ContentSearch game={currentSlide} onClose={handleClose} increment={increment} imgCounter={imgCounter}/>}

                </div>
            </FilterHomeContext.Provider>


    );

};

export default FilterHome;


