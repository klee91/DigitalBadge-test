import axios from 'axios';
const BADGE_SELECTED = 'BADGE_SELECTED';
const FETCH_USER = 'FETCH_USER';

export function selectBadge(badge) {
    return {
        type: BADGE_SELECTED,
        payload: badge
    }
}

export function fetchUser(user) {
    const request = axios.get();
    return {
        type: FETCH_USER,
        payload: request
    }
}