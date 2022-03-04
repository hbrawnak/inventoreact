import React from "react";
import PropTypes from "prop-types"

class EditFishForm extends React.Component {
    static propTypes = {
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        index: PropTypes.string,
        fish: PropTypes.shape({
            name: PropTypes.string,
            status: PropTypes.string,
            desc: PropTypes.string,
            image: PropTypes.string,
            price: PropTypes.number,
        })
    }


    handleChange = (event) => {
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        }

        this.props.updateFish(this.props.index, updatedFish);
    }

    delete = () => {
        this.props.deleteFish(this.props.index)
    }

    render() {
        return (
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name}/>
                <input type="text" name="price" onChange={this.handleChange}
                       value={this.props.fish.price}/>
                <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available">Fresh Fish!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" placeholder="Desc" onChange={this.handleChange} value={this.props.fish.desc}/>
                <input name="image" type="text" onChange={this.handleChange} value={this.props.fish.image}/>
                <button onClick={this.delete}>remove fish</button>
            </div>
        );
    }
}

export default EditFishForm;