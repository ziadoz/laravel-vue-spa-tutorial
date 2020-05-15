export default (error) => {
    const {
        name: nameErrors,
        email: emailErrors,
        password: passwordErrors,
    } = error.response.data.errors;

    return {
        name: (nameErrors && nameErrors[0] ? nameErrors[0] : ""),
        email: (emailErrors && emailErrors[0] ? emailErrors[0] : ""),
        password: (passwordErrors && passwordErrors[0] ? passwordErrors[0] : ""),
    }
};
