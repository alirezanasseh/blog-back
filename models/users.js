module.exports = {
    entity: "users",
    fields: {
        name: {
            max_length: 100
        },
        family: {
            required: true,
            max_length: 100
        },
        mobile: {
            required: true,
            length: 11
        },
        password: {
            required: true,
            min_length: 3,
            max_length: 100
        }
    }
};