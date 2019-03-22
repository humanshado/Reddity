import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Nav from './components/Nav';
import ListCategories from './components/ListCategories';
import PostsList from './components/PostsList';
import CategoryPosts from './components/CategoryPosts';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';
import PostNew from './components/PostNew';
import PageNotFound from './components/PageNotFound';


class App extends Component {

  render() {
    console.log('props in App.js render ', this.props)
    return (
      <div className="App">
          <div className="row nav-wrapper">
            <Nav />
          </div>
        <div className="container">
          <div className="row">
              <div className="col-md-12">
                <div className="row banner">
                  <Link to="/posts/new" className="btn btn-primary">Add Post</Link>
                </div>
                <hr />
                <div className="col-md-2 categories-bar">
                  <Route component={ListCategories} />
                </div>
              <div className="col-md-9">
                    <Switch>
                      <Route exact path="/" component={PostsList}/>
                      <Route exact path="/posts/new" component={PostNew} />
                      <Route exact path="/posts/edit/:id" component={EditPost} />
                      <Route exact path="/:categories/:id" component={PostDetails} />
                      <Route exact path="/:categories" component={CategoryPosts} />
                      <Route component={PageNotFound} />
                    </Switch>
                </div>
              </div>
            </div>
        </div>
    </div>//App
    );
  }
}

export default App;
