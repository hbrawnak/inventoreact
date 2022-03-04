import React from "react";
import PropTypes from "prop-types"
import {getFunName} from "../helpers";

class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.object
    }

    storeInput = React.createRef();

    goToStore = event => {
        event.preventDefault();
        const storeName = this.storeInput.current.value;
        this.props.history.push(`/store/${storeName}`)
    }

    render() {
        return (
            <React.Fragment>
                <form action="" className='store-selector' onSubmit={this.goToStore}>
                    <h2>Please Enter A Store</h2>
                    <input type="text" ref={this.storeInput} required placeholder='store name'
                           defaultValue={getFunName()}/>
                    <button type='submit'>visit store</button>
                </form>
            </React.Fragment>
        );
    }
}

export default StorePicker;