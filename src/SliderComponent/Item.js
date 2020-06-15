import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import '../index.css'

const Item = ({ game }) => (
    <SliderContext.Consumer>
        {({ onSelectSlide, currentSlide, elementRef }) => {
            const isActive = currentSlide && currentSlide.id === game.id;

            return (
                <div
                    ref={elementRef}
                    className={cx('item', {
                        'item--open': isActive,
                    })}
                >
                    <img src={`http://localhost:1337${game.anteprima[0].url}`} alt="" />
                    <h5 className="card-title">{game.nome}</h5>

                    <ShowDetailsButton onClick={() => onSelectSlide(game)} />
                    {isActive && <Mark />}
                </div>
            );
        }}
    </SliderContext.Consumer>
);

export default Item;
