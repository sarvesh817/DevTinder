const validator = require('validator');

// This is for api level validation or check  
const validationSignupData = (req) => {
    const { firstName, lastName, emailId } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email ID is not valid");
    }
}

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "about", "age", "skills"];
    const isEditAllowed = Object.keys(req.body).every(field =>
        allowedEditFields.includes(field)
    );
    return isEditAllowed;
}

module.exports = { validationSignupData, validateProfileEditData };
