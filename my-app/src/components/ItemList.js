import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { itemsFetchData } from '../actions/items';

class ItemList extends Component {
    componentDidMount() {
        //this.props.fetchData('https://api.coinmarketcap.com/v2/ticker/');

        const urls = ['https://api.coinmarketcap.com/v1/ticker/bitcoin/', 'https://api.coinmarketcap.com/v1/ticker/wanchain/']

        this.props.fetchData(urls);
    }

    render() {
        console.log(this.props.items)
        // for(const item of this.props.items) {
        //     console.log('item', item)
        // }

        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        if (this.props.items.length === 0) {
            return <p>Loading...</p>
        }
        else {
        
        return (
            <div style={setMargin}>
            {this.props.items[0].name}
                {/* {this.props.items.map((item) => {
                    return <div key={item.id}>
                            <ListGroup style={setDistanceBetweenItems}>
                                <ListGroupItem header={item.name}>
                                    Price: {item.price_usd}
                                    <span className="pull-xs-right">Rank: {item.rank}</span>
                                </ListGroupItem>
                            </ListGroup>
                    </div>
                })} */}
            </div>
        );
        }
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
