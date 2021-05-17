import PropTypes from 'prop-types';
import React from 'react';

const Error = ({mensaje}) => {
    return (  
        <p className='my-3 p-4 text-center alert alert-primary'>{mensaje}</p>
    );
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}

export default Error;