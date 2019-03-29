module.exports = {
    entity: "permissions",
    fields: {
        _id: {},
        role: {
            required: true,
            max_length: 100
        },
        model: {
            required: true,
            max_length: 100
        },
        permissions: {}
    }
};