import {useSelector} from 'react-redux'

export default path => useSelector(state => path.split('/').reduce((substate, pathPiece) => substate[pathPiece], state))