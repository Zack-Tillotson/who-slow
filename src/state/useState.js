import {useSelector} from 'react-redux'

export const pathSelector = path => state => path.split('/').reduce((substate, pathPiece) => substate[pathPiece], state)
export default path => useSelector(pathSelector(path))