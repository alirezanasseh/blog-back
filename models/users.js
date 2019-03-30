module.exports = {
    entity: "users",
    fields: {
        _id: {},
        name: {
            max_length: 100
        },
        family: {
            required: true,
            max_length: 100
        },
        code: {
            required: true,
        },
        mobile: {
            required: true,
            length: 10,
            exceptions: ['admin']
        },
        password: {
            required: true,
            min_length: 3,
            max_length: 100
        },
        roles: {}
    }
};