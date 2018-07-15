import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setNotif, clearNotif, purchase, setBalance} from 'store/actions';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import collect from 'collect.js';
import { getImage, apiEndpoint, getPriceRate, purchase as buy, slugify } from 'helpers';
import ReactStars from 'react-stars';

class Detail extends Component {
  constructor(props) {
    super(props);

    const slug = this.props.match.params.id;
    const movie_id = slug.split('-')[0];

    this.state = {
      id: movie_id,
      videos: [],
      credits: {
        crew: [],
        cast: []
      },
      similar: {
        page: 1,
        results: []
      },
      recommended: {
        page: 1,
        results: []
      },
      movie: {
        title: '',
        backdrop_path: '',
        genres: [],
        production_countries: [],
      }
    }
  }

  componentWillMount() {
    this.getMovie();
    this.getVideos();
    this.getCredits();
    this.getSimilar();
    this.getRecommendations();
  }

  getMovie() {
    const vm = this;
    const movie_id = this.state.id;
    let endpoint = apiEndpoint(`movie/${movie_id}`);

    axios.get(endpoint).then(({ data }) => {
      vm.setState({ movie: data });
    }).catch(({ response }) => {
      console.log(response)
    })
  }

  getVideos() {
    const vm = this;
    const movie_id = this.state.id;
    const endpoint = apiEndpoint(`movie/${movie_id}/videos`);

    axios.get(endpoint).then(({ data }) => {
      vm.setState({ videos: data.results });
    }).catch(({ response }) => {
      console.log(response)
    })
  }

  getCredits() {
    const vm = this;
    const movie_id = this.state.id;
    const endpoint = apiEndpoint(`movie/${movie_id}/credits`);

    axios.get(endpoint).then(({ data }) => {
      vm.setState({ credits: data });
    }).catch(({ response }) => {
      console.log(response)
    })
  }

  getSimilar() {
    const vm = this;
    const movie_id = this.state.id;
    const endpoint = apiEndpoint(`movie/${movie_id}/similar`);

    axios.get(endpoint).then(({ data }) => {
      vm.setState({ similar: data });
    }).catch(({ response }) => {
      console.log(response)
    })
  }

  getRecommendations() {
    const vm = this;
    const movie_id = this.state.id;
    const endpoint = apiEndpoint(`movie/${movie_id}/recommendations`);

    axios.get(endpoint).then(({ data }) => {
      vm.setState({ recommended: data });
    }).catch(({ response }) => {
      console.log(response)
    })
  }

  purchase(movie_id) {
    buy(this, movie_id);
  }

  render() {
    const movie = this.state.movie;
    const purchased_movies = this.props.movies.purchased;
    const is_purchased = purchased_movies.indexOf(movie.id) != -1
      ? true : false;
    const genres = movie.genres;
    const countries = movie.production_countries;
    const credits = this.state.credits;
    const videos = this.state.videos;
    const similar = collect(this.state.similar.results).chunk(6).toArray();
    const recommended = collect(this.state.recommended.results).chunk(6).toArray();

    return (
      <div>
        <section className="hero is-info is-medium is-bold">
          <div className="hero-body" style={{backgroundImage: `url(${getImage(movie.backdrop_path)})`}}></div>
        </section>

        <div className="container">
          <section className="articles">
            <div className="column is-8 is-offset-2">
              <div className="card article">
                <div className="card-content">
                  <div className="columns is-mobile">
                    <div className="column is-one-quarter">
                      <figure className="image">
                        <img src={getImage(movie.poster_path)}/>
                      </figure>
                    </div>
                    <div className="column">
                      <h3 className="title is-3">{movie.title}</h3>
                      <p className="subtitle"><small>{movie.tagline}</small></p>

                      <div className="columns is-mobile">
                        <div className="column">
                          <p className="subtitle is-6 has-text-grey"><small>{movie.release_date}</small></p>
                        </div>
                        <div className="column">
                          {
                            countries.map((country, key) => (
                              <p key={key} className="subtitle is-6 has-text-grey">
                                <small>
                                    {country.name}
                                </small>
                              </p>
                            ))
                          }
                        </div>
                        <div className="column">
                          <span className="tag is-dark">
                            {movie.runtime}min
                          </span>
                        </div>
                      </div>
                      <hr/>

                      <div className="columns is-mobile">
                        <div className="column is-one-quarter">
                          <span className="tag is-warning is-large">{movie.vote_average}</span>
                        </div>
                        <div className="column">
                          <ReactStars
                            count={10}
                            value={movie.vote_average}
                            edit={false}
                            size={30}
                            color2={'#ffdd57'} />
                        </div>
                      </div>

                      <hr style={{marginTop: 10, marginBottom: 10}} />
                      {
                        genres.map((genre, key) => (
                          <span key={key}><span className="tag">{genre.name}</span>&nbsp;</span>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
              {
                is_purchased
                  ? (
                    <button className="button is-success is-fullwidth" style={{borderRadius: 0}} disabled>
                      <i className="fa fa-check"></i>&nbsp;Purchased
                    </button>
                  ) : (
                    <button className="button is-info is-fullwidth" style={{borderRadius: 0}} onClick={() => this.purchase(movie.id)}>
                      Purchase Rp. {getPriceRate(movie.vote_average)}
                    </button>
                  )
              }

              <div className="card article">
                <div className="card-content">
                  <div className="content article-body">
                    <h4 className="title is-4">Videos</h4>
                    <hr/>
                  </div>
                </div>

                {
                  videos.map((video, key) => (
                    <div className="columns" key={key}>
                      <div className="column">
                        <iframe width="100%" height="450" src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className="card article">
                <div className="card-content">
                  <div className="content article-body">
                    <h4 className="title is-4">Synopsis</h4>
                    <hr/>
                    <p>
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card article">
                <div className="card-content">
                  <div className="content article-body">
                    <h4 className="title is-4">Casts</h4>
                    <hr/>
                    {
                      credits.cast.map((cs, key) => (
                        <article className="media" key={key}>
                          <figure className="media-left">
                            <p className="image is-48x48">
                              <img src={getImage(cs.profile_path)}/>
                            </p>
                          </figure>
                          <div className="media-content" style={{margin: 0}}>
                            <div className="content">
                              <p>
                                <strong style={{color: '#363636'}}>{cs.name}</strong>
                                <br/>
                                {cs.character}
                              </p>
                            </div>
                          </div>
                        </article>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="container">
          <div className="box">
            <h5 className="title is-5">Similar Movies</h5>
            <hr/>
            {
              similar.map((sim_arr, sim_key) => (
                <div className="columns is-centered" key={sim_key}>
                  {
                    sim_arr.map((sim_movie, key) => (
                      <div className="column is-2" key={key}>
                        <Link to={`/${sim_movie.id}-${slugify(sim_movie.title)}`}>
                          <img src={getImage(sim_movie.poster_path)} />
                        </Link>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>

        <br/>
        <br/>

        <div className="container">
          <div className="box">
            <h5 className="title is-5">Recommended Movies</h5>
            <hr/>
            {
              recommended.map((rec_arr, rec_key) => (
                <div className="columns is-centered" key={rec_key}>
                  {
                    rec_arr.map((rec_movie, key) => (
                      <div className="column is-2" key={key}>
                        <Link to={`/${rec_movie.id}-${slugify(rec_movie.title)}`}>
                          <img src={getImage(rec_movie.poster_path)} />
                        </Link>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>

        <br/>
      </div>
    )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail))