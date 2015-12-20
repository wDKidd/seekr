// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

// provides functionality for search input, ensuring
// it is not read-only
var SearchInput = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return (<input placeholder="Search.." type="text" value={value} onChange={this.handleChange}/>)
  }
});

var Gallery = React.createClass({
  getInitialState: function() {
    return {photos: this.props.photos}
  },
  render: function() {
    return (
      <section className="gallery">
        {this.props.photos.map(function(photo) {
          return (
            <a className="fancybox" href={photo} data-fancybox-group="gallery">
              <img key={photo.id} src={photo}/>
            </a>
          )
        })}
      </section>
    );
  }
});


// main component of the application
var FlickrSearch = React.createClass({
  getInitialState: function() {
    return {
        base: 'https://api.flickr.com/services/rest/?api_key=1af4a5a385a5000653f81f6eefd7853f&format=rest&format=json&nojsoncallback=1',
        page: 1,
        resultsPerPage: 12,
        photos: []
      }
  },
  search: function() {
    var searchQuery = this.refs.search.getDOMNode().value;
    $.get(this.state.base + '&method=flickr.photos.search&text=' + searchQuery + '&per_page=' + this.state.resultsPerPage + '&page=' + this.state.page, function(res) {
      if (res.stat === "ok") {
        this.setState({
          photos: res.photos.photo.map(this.getFlickrPhotoUrl)
        });
      } else {
        console.log(res);
        console.log(this.state.base);
      }
    }.bind(this));
  },
  handleSearch: function(e) {
    e.preventDefault();
    this.search();
  },
  getFlickrPhotoUrl: function(image) {
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;;
  },
  render: function() {
    return (
      <div>
      search input form
        <div className={'search-component one-third center'}>
          <form onSubmit={this.handleSearch}>
            <SearchInput ref="search"/>
            <button onClick={this.handleSearch} className={'primary'} type="button" name="button">Go!</button>
          </form>
        </div>

        {/*render gallery component*/}
        <Gallery photos={this.state.photos}/>

        {/*inform user of no images*/}
        {!this.state.photos.length &&
          <p>No photos to display</p>}

      </div>

    );
  }
});

ReactDOM.render(< FlickrSearch key={'1af4a5a385a5000653f81f6eefd7853f'}/>, document.getElementById('search'))
