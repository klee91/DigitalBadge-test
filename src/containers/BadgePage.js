import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectBadge } from '../actions/index';
import { bindActionCreators} from 'redux'; 
import Badge from '../components/Items/Badge';

class BadgePage extends Component {
    render() {
        return(
            <div className="page" id="badgesPage">
                <h1 className="page-title">Badges</h1>
                <hr />
                <section>
                    <Badge />
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        badges: state.badges
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectBadge: selectBadge},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BadgePage);