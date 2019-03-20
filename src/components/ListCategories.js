import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCategories, setCategoryFilter } from '../actions';

class ListCategories extends Component {
    
    componentDidMount() {
        this.props.fetchCategories();
    }

    makeActive = (category) => {
        const { history } = this.props;
        let allCategories = this.props.categories;
        category.isActive = category.isActive === false ? true : true; 
        allCategories = allCategories.map(c => {
            if(c != category){
                c.isActive = c.isAcive === true ? false : false;
            }
            return c;
        }) 
        this.props.setCategoryFilter(...allCategories);
        history.push(`/${category.path}`);
    }

    renderCategories = () => {
        return this.props.categories.map((category, index) => {
            return (
                    <li key={index} onClick={() => this.makeActive(category)}>
                        {category.name === "all"
                        ?   <i className="fa fa-list" aria-hidden="true"></i>   
                        :   <i className="fa fa-book" aria-hidden="true"></i> 
                        }
                            <span> {_.capitalize(category.name)}</span>
                   </li>
            )
        })
    }

    render() {
        return (
            <div>
                <h5>Categories...</h5>
                <ul>
                    {this.renderCategories()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: Object.values(state.categories)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchCategories, setCategoryFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);