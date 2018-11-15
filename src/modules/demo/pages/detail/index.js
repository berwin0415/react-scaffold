import React from 'react';
import{ connect } from 'react-redux';

@connect((state)=>({
    state
}))
class Detail extends React.Component {
    render(){
        return(
            <div>detail component</div>
        )
    }
}
export default Detail;