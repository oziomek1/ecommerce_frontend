import React, {Component} from 'react';
class Categories extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
    }
    componentDidMount() {
        var url = "http://localhost:9000/categories"
        fetch(url, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                return results.json();
            }).then(data => {
            let category = data.map((cat) => {
                return (
                    <div key={cat.categoryID}>
                        <div className="title">{cat.categoryName}</div>
                    </div>
                )
            })
            this.setState({category: category})
        })
    }
    render() {
        return (
            <div className="category">
                {this.state.category}
            </div>
        )
    }
}
export default Categories;