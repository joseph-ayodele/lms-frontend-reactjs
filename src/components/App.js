"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './Header.js';
import {Home} from './Home.js';
import {Books} from './Books.js';
import {Authors} from './Authors.js';
import {Publishers} from './Publishers.js';
import BookStore from '../stores/BookStore';
import AuthorStore from '../stores/AuthorStore';
import PublisherStore from '../stores/PublisherStore';
import AuthorActions from '../actions/AuthorActions';
import BookActions from '../actions/BookActions';
import PublisherActions from '../actions/PublisherActions';

export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookList:[],
            authorList:[],
            publisherList:[]
        };
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<Books {...props} bookList={this.state.bookList} />)}/>
                    <Route path='/authors' render={(props) => (<Authors {...props} authorList={this.state.authorList} />)}/>
                    <Route path='/publishers' render={(props) => (<Publishers {...props} publisherList={this.state.publisherList} />)}/>
                </Switch>
            </div>
        );
    }

    componentDidMount(){
        BookStore.addChangeListener(this._onBookChange.bind(this), 'BookChange');
        BookStore.addChangeListener(this._onBookEdit.bind(this), 'BookEdit');
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this), 'AuthorChange');
        AuthorStore.addChangeListener(this._onAuthorDelete.bind(this), 'AuthorDelete');
        AuthorStore.addChangeListener(this._onAuthorUpdate.bind(this), 'AuthorUpdate');
        AuthorStore.addChangeListener(this._onAuthorAdd.bind(this), 'AuthorAdd');
        PublisherStore.addChangeListener(this._onPublisherChange.bind(this), 'PublisherChange');
        PublisherStore.addChangeListener(this._onPublisherEdit.bind(this), 'PublisherEdit');
    }

    componentWillUnmount(){
        BookStore.removeChangeListener(this._onBookChange.bind(this), 'BookChange');
        BookStore.removeChangeListener(this._onBookEdit.bind(this), 'BookEdit');
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this), 'AuthorChange');
        AuthorStore.removeChangeListener(this._onAuthorDelete.bind(this), 'AuthorDelete');
        AuthorStore.removeChangeListener(this._onAuthorUpdate.bind(this), 'AuthorUpdate');
        AuthorStore.removeChangeListener(this._onAuthorAdd.bind(this), 'AuthorAdd');
        PublisherStore.removeChangeListener(this._onPublisherChange.bind(this), 'PublisherChange');
        PublisherStore.removeChangeListener(this._onPublisherEdit.bind(this), 'PublisherEdit');
    }

    _onBookChange(){
        this.setState({bookList: BookStore.getAllBooks()});
    }

    _onBookEdit(){
        BookActions.readBooks();
    }

    _onAuthorChange(){
        this.setState({authorList: AuthorStore.getAllAuthors()});
    }

    _onAuthorDelete(){
        AuthorActions.readAuthors();
    }

    _onAuthorUpdate(){
        AuthorActions.readAuthors();
    }

    _onAuthorAdd() {
        AuthorActions.readAuthors();
    }

    _onPublisherChange(){
        this.setState({publisherList: PublisherStore.getAllPublishers()});
    }

    _onPublisherEdit(){
        PublisherActions.readPublishers();
    }
}