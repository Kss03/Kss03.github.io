import { Component } from "react";
import Service from "../Service";
import { Button } from "react-bootstrap";

class LangBtn extends Component {

  state = {
    activeEn: false,
    activePl: false
  }

  componentDidMount() {
    this.onActive();
  }

  service = new Service ();

  onUpLang = async (item) => {
    await this.props.onLang(item);
    this.onActive();
  }

  onActive = () => {
    this.props.lang === "eng" ? this.setState({activeEn: true, activePl: false}) :
    this.setState({activePl: true, activeEn: false});
  }

    render() {
      const {activeEn, activePl} = this.state;

        return (
          <div className='col col-lg-auto position-absolute lang-btn'>
            <Button variant="outline-secondary" onClick={() => this.onUpLang('eng')} className='btn rounded-0 border-0' active={activeEn}>en</Button>
            <Button variant="outline-secondary" onClick={() => this.onUpLang('pl')} className='btn rounded-0 border-0' active={activePl}>pl</Button>
          </div>
        )
    }
}

export default LangBtn;