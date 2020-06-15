import React, {Component} from 'react';
import IconCross from '../Icons/IconCross';
import "../index.css";
import SlideButton from "./SlideButton";
import axios from "axios";



class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: "",
            imageCounter: 0,
            isHidden: true,
            imageLenght: 0,
            user: "",
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

        image.src = "http://localhost:1337"+ game.anteprima[this.state.imageCounter].url
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

        image.src = "http://localhost:1337"+ game.anteprima[this.state.imageCounter].url
    }

    async componentDidMount(){
        let {game} = this.props;

        let idUser = game.sviluppatore;

        axios.get('http://localhost:1337/sviluppatores/'+idUser)
            .then(res => {
                console.log(res.data.nome);
                this.setState({user: res.data.nome})
            })
            .catch(error =>{
                console.log(error);
            })
    }
    getNameUser(game){
        let idUser = game.sviluppatore;

        axios.get('http://localhost:1337/sviluppatores/'+idUser)
            .then(res => {
                this.setState({user: res.data.nome})
            })
            .catch(error =>{
                console.log(error);
            })
    }

    render() {
        let {game, onClose, increment, imgCounter} = this.props;
        this.state.imageLenght = game.anteprima.length;
        let url = game.url;
        let tmpurl = url.split("/").reverse().join("/");
        let codiceGame = tmpurl.split("/",1).join("");
        this.getNameUser(game)
        return (
            <div className="content__area">
                <div className="content__area__container">
                    <div className="content__title">
                        <h4>{game.nome}</h4>
                    </div>

                    <div className="content__title">
                        <h5>Gioco di {this.state.user}</h5>
                    </div>

                    <div className="content__description">
                        {game.descrizione}
                    </div>


                    <div className="gameLink">
                        <a href={`http://localhost:3006?gameId=${game.codiceGioco}`}>{game.url}</a>
                    </div>


                </div>
                <div className="content__background">
                        <img  onClick={() => this.toggleHidden(0)} src={`http://localhost:1337${game.anteprima[imgCounter].url}`}/>
                </div>


                <button className="content__close" onClick={onClose}>
                    <IconCross/>
                </button>

                {!this.state.isHidden &&
                    <div className="anteprimaContainer">
                        <SlideButton onClick={()=>this.onClickBack(game)} type="prev" />
                        <div className="anteprimaImg">
                            <img id="priaryImg" src={`http://localhost:1337${game.anteprima[this.state.imageCounter].url}`}/>
                        </div>
                        <SlideButton onClick={()=>this.onClickForward(game)} type="next" />
                        <button className="secondClose" onClick={() => this.toggleHidden()}><IconCross/></button>
                    </div>
                }

                <div className="content__gallery">
                    {game.anteprima.map((foto, index) =>
                        <img  onClick={() => this.imageOpen(index)} src={`http://localhost:1337${foto.url}`}/>
                    )}
                </div>

            </div>
        )

    }
}




export default Content;
