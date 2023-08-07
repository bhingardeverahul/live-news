import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
 import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
  static propsTypes={
country:"in",
pageSize:5,
category:'general'
  }
  static defaultProps={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  }
 capitalization(string){
return string.charAt(0).toUpperCase() + string.slice(1)
  }
    constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading:true,
      page: 1,
      totalResults:0
    };
    document.title=`${this.capitalization (this.props.category)}-Newsmonkey`;
  }
  async UpdateNews(){
    this.props.setProgress(10)
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9993b102674e4fe09eb88f0e430eaeb8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url); 
    this.props.setProgress(30)
    let parseData = await data.json();
    this.props.setProgress(70)
    console.log(parseData);
    this.setState({ articles: parseData.articles, totalResults:parseData.totalResults,loading: false});
    this.props.setProgress(100)
  }
  async componentDidMount() {
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9993b102674e4fe09eb88f0e430eaeb8&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url); 
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({ articles: parseData.articles, totalResults:parseData.totalResults,loading: false});
  
    this.UpdateNews()
  }
  handleNext = async () => {
    // console.log("Next");
    // if(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    // }
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9993b102674e4fe09eb88f0e430eaeb8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({ page: this.state.page + 1 ,
    //     articles: parseData.articles,
    //     loading: false });
    this.setState({page:this.state.page +1})
    this.UpdateNews()
  };

  handlePrev = async () => {
    // console.log("Previous");
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9993b102674e4fe09eb88f0e430eaeb8&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({ page: this.state.page - 1 ,
    //     articles: parseData.articles,   loading: false });
    this.setState({page:this.state.page-1})
    this.UpdateNews()
  };
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})

    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9993b102674e4fe09eb88f0e430eaeb8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url); 
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles:this.state.articles.concat(parseData.articles),
       totalResults:parseData.totalReslts});
  };
  render() {
    console.log("render");
    return (
     <>
        <h1 className="text-center" style={{margin:"35px 0px"}}>NewsMonkey-Top {this.capitalization (this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
  dataLength={this.state.articles.length} 
  next={this.fetchMoreData}
  hasMore={this.state.articles.length!==this.state.totalResults}
  loader={<Spinner/>}>
    
    <div className="container my-3">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitems title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 40) : ""}imgurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            );
          })}
        </div>
        </div>
          </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="botton"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            {" "}
            &larr;Previous
          </button>
          <button
            type="botton"
            disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)}
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div> */}
   </>
    );
  }
}

export default News;
