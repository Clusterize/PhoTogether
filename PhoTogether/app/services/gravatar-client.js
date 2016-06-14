var md5 = require('js-md5');

function gravatarUri(email) {
    if (email) {
        return 'https://www.gravatar.com/avatar/' + md5(email.trim().toLowerCase());
    }
    
    return 'http://qualiadesigns.com/wp-content/uploads/qdi-generic-testimonial-person.png';
}

exports.gravatarUri = gravatarUri;