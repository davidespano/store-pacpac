import React, { useState } from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Content from './Content'
import SlideButton from './SlideButton'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import '../index.css'

const Slider = ({ children, activeSlide}) => {
    const [currentSlide, setCurrentSlide] = useState(activeSlide);
    const { width, elementRef } = useSizeElement();
    const {
        handlePrev,
        handleNext,
        slideProps,
        containerRef,
        hasNext,
        hasPrev
    } = useSliding(width, React.Children.count(children));
    const handleSelect = game => {
        setCurrentSlide(game);
    };
    const handleClose = () => {
        setCurrentSlide(null);
    };

    let imgCounter = 0;

    const increment = () => {
        imgCounter++;
        console.log(imgCounter);
    };


    const contextValue = {
        onSelectSlide: handleSelect,
        onCloseSlide: handleClose,
        elementRef,
        currentSlide,
    };

    return (
        <SliderContext.Provider value={contextValue}>
            <SliderWrapper>
                    <div
                        className={cx('slider', { 'slider--open': currentSlide != null })}
                    >
                        <div ref={containerRef} className="slider__container" {...slideProps}>{children}</div>
                    </div>
                    {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
                    {hasNext && <SlideButton onClick={handleNext} type="next" />}
            </SliderWrapper>

            {currentSlide && <Content game={currentSlide} onClose={handleClose} increment={increment} imgCounter={imgCounter}/>}
        </SliderContext.Provider>
    );
};

export default Slider;
