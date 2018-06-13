const BADGE_SELECTED = 'BADGE_SELECTED';

export default function(state = null, action) {
    switch(action.type) {
        case BADGE_SELECTED:
        return action.payload;
    }
    return state;
}
