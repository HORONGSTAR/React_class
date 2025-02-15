import PropTypes from 'prop-types'

function Quiz05(props) {
   const { major, start, grade } = props
   console.log(props)
   return (
      <div>
         <h2>{major}성적</h2>
         <h3>개강여부:{start.toString()}</h3>
         <ul>
            <li>{grade[0]}</li>
            <li>{grade[1]}</li>
            <li>{grade[2]}</li>
            <li>{grade[3]}</li>
            <li>{grade[4]}</li>
            <li>{grade[5]}</li>
         </ul>
      </div>
   )
}

Quiz05.propTypes = {
   major: PropTypes.string,
   start: PropTypes.bool,
   grade: PropTypes.array,
}

export default Quiz05
