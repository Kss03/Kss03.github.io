

import { Component } from 'react';
import { ThemeProvider} from 'react-bootstrap';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './main.scss';

import Service from './Service';

import DeskTop from './desk-top/DeskTop';
import Mobile from './mobile/Mobile';



class App extends Component {

  state = {
    lang: 'eng',
    mobile: true
  }

  service = new Service();

  componentDidMount() {
    this.onLang('eng');
    this.onWidth();
  }

  onWidth = () => {
    window.screen.width < 991.98 ? this.setState({mobile: true}) : this.setState({mobile: false})
  }

  onLang = (chooseLang) => {
    this.setState({
      lang: chooseLang
    })
  }

  onGetItem = async (state) => {
    await this.service.getResource()
      .then((res) => {
        state === 'eng' ? this.setState({item: res.eng}) : this.setState({item: res.pl})
      })
      .catch('error')
  }



  render() {
    const adaptive = this.state.mobile ? <Mobile onLang={this.onLang} lang={this.state.lang}/> : <DeskTop onLang={this.onLang} lang={this.state.lang}/>
    
    return (
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
          {adaptive}
      </ThemeProvider>
    );
  }
}

export default App;