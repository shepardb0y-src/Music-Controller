import React from 'react';

const csrftoken = getCookie('csrftoken');

const CSRFToken = () => {

    
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;