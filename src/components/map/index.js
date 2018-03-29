import { h, render, Component } from 'preact'
import style from './style';

export default class map extends Component{
  //simple component which will render just a map
  //gets called from the location page
  render() {
    return(
        <iframe
        class={style.iframe}
          src={this.props.url} allowfullscreen>
        </iframe>
      );
    }
}
