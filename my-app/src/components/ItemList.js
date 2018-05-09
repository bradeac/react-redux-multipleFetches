import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { itemsFetchData } from '../actions/items';

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData('https://api.coinmarketcap.com/v2/ticker/');
    }

    render() {
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        if (!this.props.items.data) {
            return <p>Loading…</p>;
        } 

        if (this.props.items.data)
            console.log('dada', Object.entries(this.props.items.data))

        return (
            <div style={setMargin}>
                {
                    Object.entries(this.props.items.data).map((item) => {
                        console.log(actualItem)
                        const actualItem = item[1]
                        return <div key={actualItem.id}>
                                <ListGroup style={setDistanceBetweenItems}>
                                    <ListGroupItem header={actualItem.name}>
                                        Price: {actualItem.quotes.USD.price}
                                        <span className="pull-xs-right">Rank: {actualItem.rank}</span>
                                    </ListGroupItem>
                                </ListGroup>
                        </div>
                    })
                }
            </div>
        );
    }
}

var setMargin = {
    padding: "0px 200px 20px 200px"
};

var setDistanceBetweenItems = {
    marginBottom: "5px"
};

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasError: state.itemsHaveError,
        isLoading: state.itemsAreLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
