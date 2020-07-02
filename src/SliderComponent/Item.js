import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import '../index.css'
import settings from "../settings";


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
                    <img src={`${settings.api}${game.anteprima[0].url}`} alt="" />
                    <h5 className="card-title">{game.nome}</h5>

                    <ShowDetailsButton onClick={() => onSelectSlide(game)} />
                    {isActive && <Mark />}
                </div>
            );
        }}
    </SliderContext.Consumer>
);

export default Item;
