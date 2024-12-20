import {libraryFactory} from './library'
import firebase from '../firebase'

export const library = () => libraryFactory(firebase())