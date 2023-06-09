import { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import LangBtn from "../lang-btn/LangBtn";
import Loading from "../loading/Loading";
import Error from "../error/Error";

import avatar from '../static/ava.png';
import Service from "../Service";

class Mobile extends Component {

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
    const view = !(loading || error) ? <View item={item} onLang={onLang} lang={lang} /> : null;

    return (

      <Container className='position-relative pt-3 mobile'>
        {spinner}
        {errorMessage}
        {view}
      </Container>
    )
  }
}

function View({item, onLang, lang}) {

  const {main, links, data} = item;

  return (
    <>
      <Row className='first-row'>
        <Col xs={12} className=''>
          <div className="main-inf row">
            <div className='avatar overflow-hidden col-4 col-lg-auto me-lg-5'>
              <img src={avatar} className=' img-fluid rounded-circle' alt="avatar__img" width={'180px'} height={'180px'}/>
            </div>
            <ul className='list-unstyled col col-lg align-items-start justify-content-center d-flex flex-column'>

              {links.map((item, i) => {
                return (
                  <li className='mt-1 d-flex flex-nowrap' key={i}>
                    <i className={`me-2 ${item.img}`}></i>
                    <a href={item.link} rel="noreferrer" target="_blank">{item.title}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </Col>
        <Col xs={12} className='position-relative mb-3'>

          <div className='main-inf'>
            <h1 className="d-flex justify-content-between flex-wrap">
              <span>
                {main.name}
              </span>
              <LangBtn onLang={onLang} lang={lang}/>
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
      </Row>
      <div className="add-inf pe-3">
        <AddInf inf={data.experience} />
        <AddInf inf={data.courses} />
        <AddInf inf={data.education} />
        <AddInf inf={data.skills} />
        <AddInf inf={data.languages} />
      </div>
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

export default Mobile;