import React from 'react';
import cx from 'classnames';
import MarkSearch from './MarkSearch'
import FilterHomeContext from './contextSearch'
import ShowDetailsButton from '../SliderComponent/ShowDetailsButton'
import '../index.css'
import settings from "../settings";



const ItemSearch = ({ game }) => (
    <FilterHomeContext.Consumer>
        {({ onSelectSlide, currentSlide}) => {
            const isActive = currentSlide && currentSlide.id === game.id;

            return (
                <div
                    className={cx('singleElement', {
                        'singleElement--open': isActive,
                    })}
                >
                    <img src={`${settings.api}${game.anteprima[0].url}`} alt="" />
                    <h5 className="card-title">{game.nome}</h5>

                    <ShowDetailsButton onClick={() => onSelectSlide(game)} />
                    {isActive && <MarkSearch />}
                </div>
            );
        }}
    </FilterHomeContext.Consumer>
);

export default ItemSearch;


