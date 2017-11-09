import request from '../api/Request';

export const ADD_MATCH = 'ADD_MATCH';
const _addMatch = (matchName, redTeams, blueTeams) => {
    return {
        type: ADD_MATCH,
        payload: {
            matchName: matchName,
            redTeams: redTeams,
            blueTeams: blueTeams,
            scores: {
                red: {
                    auto: 0,
                    teleop: 0,
                    others: 0,
                    fouls: 0,
                    techFouls: 0
                },
                blue: {
                    auto: 0,
                    teleop: 0,
                    others: 0,
                    fouls: 0,
                    techFouls: 0
                }
            },
            state: 'PRE_START'
        }
    }
};

export const addMatch = (matchName, redTeams, blueTeams) => {
    return (dispatch, getState) => {
        request(_addMatch(matchName, redTeams, blueTeams))
        .then((resp) => {
            dispatch(tournamentInfoUpdated(resp));
        });
    }
}

export const DELETE_MATCH = 'DELETE_MATCH';
export const deleteMatch = (matchName) => {
    return {
        type: DELETE_MATCH,
        payload: {
            matchName: matchName
        }
    }
};

export const SET_ACTIVE_MATCH = 'SET_ACTIVE_MATCH';
const _setActiveMatch = (matchName) => {
    return {
        type: SET_ACTIVE_MATCH,
        payload: {
            matchName: matchName
        }
    }
}
export const setActiveMatch = (matchName) => {
    return (dispatch, getState) => {
        request(_setActiveMatch(matchName))
        .then((resp) => {
            dispatch(tournamentInfoUpdated(resp));
        });
    }
};

export const TOURNAMENT_INFO_UPDATED = 'TOURNAMENT_INFO_UPDATED';
export const tournamentInfoUpdated = (tournamentInfo) => {
    return {
        type: TOURNAMENT_INFO_UPDATED,
        payload: {
            tournamentInfo: tournamentInfo
        }
    }
};