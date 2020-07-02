import React, {Component} from 'react';
import IconCross from '../Icons/IconCross';
import "../index.css";
import SlideButton from "../SliderComponent/SlideButton";
import settings from "../settings";


class ContentSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: "",
            imageCounter: 0,
            isHidden: true,
            imageLenght: 0,
            loading: true
        }
    }

    toggleHidden(count) {
        this.setState({
            isHidden: !this.state.isHidden,
            imageCounter: count
        })
    }

    imageOpen(count){
        if(!this.state.isHidden){
            this.setState({
                imageCounter: count
            })
        }else{
            this.setState({
                isHidden: !this.state.isHidden,
                imageCounter: count
            })
        }


    }

    onClickForward(game){
        var image = document.getElementById('priaryImg')
        if(this.state.imageCounter +1 === this.state.imageLenght){
            this.setState({
                imageCounter: 0
            })
        }else {
            this.setState({
                imageCounter: this.state.imageCounter +1
            })
        }

        image.src = settings.api+ game.anteprima[this.state.imageCounter].url
    }

    onClickBack(game){
        var image = document.getElementById('priaryImg')
        if(this.state.imageCounter -1 ===  -1){
            this.setState({
                imageCounter: this.state.imageLenght -1
            })
        }else {
            this.setState({
                imageCounter: this.state.imageCounter -1
            })
        }

        image.src = ${settings.api}+ game.anteprima[this.state.imageCounter].url
    }



    render() {
        let {game, onClose, increment, imgCounter} = this.props;
        this.state.imageLenght = game.anteprima.length;
        let url = game.url;
        let tmpurl = url.split("/").reverse().join("/");
        let codiceGame = tmpurl.split("/",1).join("");

        return (
            <div className="Search_content__area">
                <div className="Search_content__area__container">
                    <div className="content__title">
                        <h4>{game.nome}</h4>
                    </div>

                    <div className="content__title">
                        <h5>Gioco di {game.sviluppatore.nome}</h5>
                        {console.log(game)}
                    </div>

                    <div className="content__description">
                        {game.descrizione}
                    </div>


                    <div className="gameLink">
                        <a href={`${settings.pacpac}?gameId=${game.codiceGioco}`}>{game.url}</a>
                    </div>


                </div>
                <div className="Search_content__background">
                    <img  onClick={() => this.toggleHidden(0)} src={`${settings.api}${game.anteprima[imgCounter].url}`}/>
                </div>


                <button className="content__close" onClick={onClose}>
                    <IconCross/>
                </button>

                {!this.state.isHidden &&
                <div className="SearchanteprimaContainer">
                    <SlideButton onClick={()=>this.onClickBack(game)} type="prev" />
                    <div className="anteprimaImg">
                        <img id="priaryImg" src={`${settings.api}${game.anteprima[this.state.imageCounter].url}`}/>
                    </div>
                    <SlideButton onClick={()=>this.onClickForward(game)} type="next" />
                    <button className="secondClose" onClick={() => this.toggleHidden()}><IconCross/></button>
                </div>
                }

                <div className="content__gallery">
                    {game.anteprima.map((foto, index) =>
                        <img  onClick={() => this.imageOpen(index)} src={`${settings.api}${foto.url}`}/>
                    )}
                </div>

            </div>
        )

    }
}




export default ContentSearch;
