import React from 'react';
import{ connect } from 'react-redux';

@connect((state)=>({
    state
}),dispatch => ({
    dispatch
}))
class Detail extends React.Component {
    componentDidMount(){
        // this.props.dispatch({
        //     type:'ADD_TODO',
        //     text: 123
        // })
    }
    render(){
        console.log(this);
        
        return(
            <div>detail component</div>
        )
    }
}
export default Detail;