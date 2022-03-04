import React from "react";
import PropTypes from "prop-types"
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const {params} = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);

        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        const fishes = {...this.state.fishes} // Copying the existing object
        fishes[`fish${Date.now()}`] = fish; // Adding new fish
        this.setState({fishes}); // Set new fishes object to state
    }

    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }

    deleteFish = key => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }

    loadSampleFished = () => {
        this.setState({fishes: sampleFishes})
    }

    addToOrder = (key) => {
        const order = {...this.state.order}
        order[key] = order[key] + 1 || 1;
        this.setState({order: order})
    }

    deleteOrder = key => {
        const order = {...this.state.order}
        delete order[key];
        this.setState({order: order})
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fish">
                        {
                            Object.keys(this.state.fishes).map(key =>
                                <Fish key={key} index={key} details={this.state.fishes[key]}
                                      addToOrder={this.addToOrder}/>
                            )
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} deleteOrder={this.deleteOrder}/>
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFished}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;