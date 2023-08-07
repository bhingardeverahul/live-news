import React, { Component } from 'react'

export class Newsitems extends Component {
  render() {
    let {title,description,imgurl,newsUrl,author,date,source}=this.props
    return (
      <div>
    <div className="card" >
      <div style={{display:'flex',justifyContent:"flex-end" ,position:'absolute',right:'0'}}>

    <span className="badge rounded-pill bg-danger" >{source}</span> 
      </div>
  <img src={!imgurl?"https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F975306b9-1294-4638-af9c-90be8e9892ff.jpg?source=next-opengraph&fit=scale-down&width=900":imgurl} className="card-img-top" alt="..."/>
  <div className="card-body">
  <h5 className="card-title">{title} </h5>
    <p className="card-text"> {description}</p>
    <p className='card-text'> <small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
</div>
    ) 
  } 
}

export default Newsitems
