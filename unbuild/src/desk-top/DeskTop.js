import { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import LangBtn from "../lang-btn/LangBtn";
import Loading from "../loading/Loading";
import Error from "../error/Error";

import avatar from '../static/ava.png';
import Service from "../Service";

class DeskTop extends Component {

  state = {
    item: {},
    loading: true,
    error: false,
  }
  
  service = new Service();

  componentDidMount() {
    this.onGetItem(this.props.lang);
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.onGetItem(this.props.lang);
    }
  }

  onGetItem = async () => {
    this.onLoading();
    await this.service.getResource()
      .then(this.onLoaded)
      .catch(this.onError)
  }

  onLoading = () => {
    this.setState({loading: true})
  }

  onLoaded = (res) => {
    this.props.lang === 'eng' ? this.setState({item: res.eng}) : this.setState({item: res.pl})
    this.setState({loading: false})
  }

  onError = () => {
    this.setState({error: true})
  }

  render() {
    const {onLang, lang} = this.props;
    const {item, loading, error} = this.state;

    const spinner = (loading && !error) ? <Loading /> : null;
    const errorMessage = (error) ? <Error /> : null;
    const view = !(loading || error) ? <View item={item} /> : null;

    return (

      <Container className='position-relative px-0 desktop'>
        <LangBtn onLang={onLang} lang={lang}/>
        {spinner}
        {errorMessage}
        {view}
      </Container>
    )
  }
}

function View({item}) {

  const {main, links, data} = item;

  return (
    <>
      <Row className='first-row'>
        <Col lg={4} className='left-col'>
          <div className='main-inf'>
            <h1>
              {main.name}
            </h1>
            <h3 className="text-uppercase">
              <span className='h3-i me-3 text-center'><i className="bi bi-person-workspace text-bg-warning text-light px-1"></i></span>
              <span>{main.prof}</span>
            </h3>
            <h3>
              <span className='h3-i me-3 text-center'><i className="bi bi-geo-alt-fill"></i></span>
              <span>{main.location}</span>
            </h3>
          </div>
        </Col>
        <Col lg={8} className='right-col'>
        <div className="main-inf row">
            <div className='avatar overflow-hidden col-auto col-lg-auto me-lg-5'>
              <img src={avatar} className=' img-fluid rounded-circle' alt="avatar__img" width={'180px'} height={'180px'}/>
            </div>
            <ul className='list-unstyled col col-lg align-items-start justify-content-center d-flex flex-column'>

              {links.map((item, i) => {
                return (
                  <li className='mt-3' key={i}>
                    <i className={`me-4 ${item.img}`}></i>
                    <a href={item.link} rel="noreferrer" target="_blank">{item.title}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={4} className='left-col pt-lg-4'>
          
          <div className="add-inf">
            <AddInf inf={data.skills} />
            <AddInf inf={data.languages} />
          </div>
        </Col>
        <Col lg={8} className='right-col pt-lg-4'>
          <div className="add-inf">
            <AddInf inf={data.experience} />
            <AddInf inf={data.education} />
            <AddInf inf={data.courses} />
          </div>
        </Col>
      </Row>
    </>
  )
}

function AddInf({inf}) {

  const {title, items} = inf;

  return(
    <div className='inf-block'>
      <h2 className={title.class}>
        {title.item}
      </h2>
      <div className='inf-sub-block'>
        {items.map((item, i) => {
          return item.map((ite, num) => {
            if (ite.ifLink) {
              return (
                <p className={ite.class} key={`${i}${num}`}>
                  <a href={ite.link} target='_blank' rel='noreferrer'>
                    {ite.item[0]}
                  </a>
                  <span>{ite.item[1]}</span>
                </p>

              )
            } else {
              return (
                <p className={ite.class} key={`${i}${num}`}>
                  {ite.item.map((it, key) => {
                    return (
                      <span key={key}>{it}</span>
                    )
                  })}
                </p>
              )
            }
          })
        })}
      </div>
    </div>
  )
}

export default DeskTop;