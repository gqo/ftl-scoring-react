import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';

import {setActiveMatch} from '../actions/matchActions';

class MatchAdminList extends Component {
    onActivateEvent(matchName, e) {
        console.log('handleActivateMatch');
        this.props.handleActivateMatch(matchName);
    }

    render() {
        var matchList = this.props.matchList || [];
        var matchListElements;

        var canActivate = !this.props.activeMatch;

        if (matchList.length === 0) {
            matchListElements = (<tr><td colSpan="7" style={{textAlign: "center"}}>No Matches Listed</td></tr>);
        }
        else {
            matchListElements = matchList.map((matchInfo) => {
                var activeClassName = (matchInfo.matchName === this.props.activeMatch) ? "active-match" : null;
                var btnDisabled = !canActivate && matchInfo.state !== 'PRE_START';
                var deleteBtnDisabled = matchInfo.state !== 'PRE_START';
                return (
                    <tr key={matchInfo.matchName} className={activeClassName}>
                        <td>{matchInfo.matchName}</td>
                        <td>{matchInfo.state}</td>
                        <td className="red-team">{matchInfo.redTeams[0] || 'EMPTY'}</td>
                        <td className="red-team">{matchInfo.redTeams[1] || 'EMPTY'}</td>
                        <td className="blue-team">{matchInfo.blueTeams[0] || 'EMPTY'}</td>
                        <td className="blue-team">{matchInfo.blueTeams[1] || 'EMPTY'}</td>
                        <td>
                            <ButtonToolbar>
                                <Button disabled={btnDisabled} bsStyle="danger" bsSize="xsmall">Delete</Button>
                                <Button disabled={btnDisabled} bsStyle="success" bsSize="xsmall" onClick={(e) => this.onActivateEvent(matchInfo.matchName)}>Activate</Button>
                            </ButtonToolbar>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Match</th>
                        <th>State</th>
                        <th colSpan={2} className='red-team'>Red Teams</th>
                        <th colSpan={2} className='blue-team'>Blue Teams</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {matchListElements}
                </tbody>
            </Table>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        activeMatch: state.matchInfo.activeMatch,
        matchList: state.matchInfo.matchList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleActivateMatch: (matchName) => {
            console.log('dispatching');
            dispatch(setActiveMatch(matchName));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchAdminList);