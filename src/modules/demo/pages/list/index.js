import React from 'react';
import{ connect } from 'react-redux';

@connect((state)=>({
    state
}))
class List extends React.Component {
    render(){
        console.log(this);
        
        return(
            <div>List component</div>
        )
    }
}
export default List;