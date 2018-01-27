
import React from 'react';
import BreadcrumbCustom from '../common/Breadcrumb';
import EchartsViews from './EchartsViews';


class Home extends React.Component {
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <EchartsViews/>
            </div>
        )
    }
}

export default Home;