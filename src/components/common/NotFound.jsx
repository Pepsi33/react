
import React from 'react';
import errorImg from '../../style/img/404.png';
import'../../style/notFound.less';


class NotFound extends React.Component {
    state = {
        animated: ''
    };
    enter = () => {
        this.setState({animated: 'hinge'})
    };
    render() {
        return (
            <div className="center" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
                <img src={errorImg} alt="404" className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} />
            </div>
        )
    }
}

export default NotFound;