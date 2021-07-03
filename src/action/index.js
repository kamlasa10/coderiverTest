import {FETCH_FAILURE, FETCH_REQUEST} from '../types';

export const fetchRequest = () => ({type: FETCH_REQUEST})
export const fetchFailure = () => ({type: FETCH_FAILURE})
