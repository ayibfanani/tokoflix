import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import collect from 'collect.js';
import { getPriceRate, getParam, slugify, getImage, purchase as buy } from 'helpers';
import {setNotif, clearNotif, purchase, setBalance} from 'store/actions';
import { apiEndpoint } from '../helpers';

class Home extends Component {
  constructor(props) {
    super(props);

    let page = getParam('page');

    this.state = {
      now_playing: null,
      page: page === null ? 1 : page
    }
  }

  componentWillMount() {
    const vm = this;
    let page = this.state.page;

    vm.props.history.push(`/?page=${page}`)
    vm.fetchData(page);
  }

  fetchData(page = 1) {
    const vm = this;
    let endpoint = apiEndpoint('movie/now_playing');
    endpoint = endpoint.concat(`&page=${page}`);

    axios.get(endpoint)
      .then(({ data }) => {
        vm.setState({now_playing: data});
      })
      .catch(({ response }) => {
        console.log(response)
      });
  }

  purchase(movie_id) {
    buy(this, movie_id)
  }

  onChangePage = (page) => {
    const vm = this;
    page = parseInt(page)

    vm.setState({page}, () => {
      vm.props.history.push(`/?page=${page}`);
      vm.fetchData(page);
    });
  }

  onSubmitSearch(e) {
    e.preventDefault();
    const vm = this;
    const search = document.getElementsByName('search')[0].value;
    const endpoint = apiEndpoint(`search/movie`, {
      query: search
    });

    axios.get(endpoint)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(({ response }) => {
        console.log(response)
      });
  }

  render() {
    const vm = this;
    let now_playing = vm.state.now_playing;
    let page = parseInt(this.state.page);
    const purchased_movies = this.props.movies.purchased;

    if (now_playing !== null) {
      now_playing = collect(now_playing.results).chunk(5).toArray();
    }

    return (
      <div className="container">
        <div id="flow">
          <span className="flow-1"></span>
          <span className="flow-2"></span>
          <span className="flow-3"></span>
        </div>
        <div className="section">
          {/* <div className="box">
            <div className="field has-addons">
              <form onSubmit={(e) => this.onSubmitSearch(e)}>
                <div className="control is-expanded">
                  <input className="input has-text-centered" type="search" placeholder="» » » » » » find me « « « « « «" name="search" />
                </div>
                <div className="control">
                  <button className="button is-info">Search</button>
                </div>
              </form>
            </div>
          </div> */}

          {
            now_playing !== null
            ? (
              now_playing.map((movies, p_key) => (
                <div className="row columns" key={p_key}>
                  {
                    movies !== null
                    ? (
                      movies.map((movie, s_key) => (
                        <div className="column" key={s_key}>
                          <div className="card large" style={{poisition: 'relative'}}>
                            <div className="card-image">
                              <span className="tag is-black" style={{position: 'absolute', zIndex: 1, top: 0, borderRadius: 0}}>
                                <i className="fa fa-star has-text-warning"></i> {movie.vote_average}
                              </span>
                              <Link to={`/${movie.id}-${slugify(movie.title)}`}>
                                <figure className="image">
                                  <img src={getImage(movie.poster_path)} alt="" />
                                </figure>
                              </Link>
                            </div>
                            <div className="card-content">
                              <div className="media">
                                <div className="media-content">
                                  <p className="title is-5 no-padding" title={movie.title}>{movie.title.substring(0, 13)}...</p>
                                  <p>
                                    <span className="title is-6 has-text-grey">
                                      <small>{parseInt(movie.release_date)}</small>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="card-image">
                              {
                                purchased_movies.indexOf(movie.id) != -1
                                  ? (
                                    <button className="button is-success is-fullwidth" style={{borderRadius: 0}} disabled>
                                      <i className="fa fa-check"></i>&nbsp;Purchased
                                    </button>
                                  )
                                  : (
                                    <button className="button is-info is-fullwidth" style={{borderRadius: 0}} onClick={() => vm.purchase(movie.id)}>
                                      Rp. {getPriceRate(movie.vote_average)}
                                    </button>
                                  )
                              }
                            </div>
                          </div>
                        </div>
                      ))
                    ) : null
                  }
                </div>
              ))
            ) : null
          }
        </div>

        <nav className="pagination" role="navigation" aria-label="pagination">
          <a href="" onClick={(e) => {e.preventDefault();this.onChangePage(page - 1)}} className="pagination-previous">Previous</a>
          <a href="" onClick={(e) => {e.preventDefault();this.onChangePage(page + 1)}} className="pagination-next">Next</a>
        </nav>

        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    balance: state.balance
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({setNotif, clearNotif, purchase, setBalance}, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))