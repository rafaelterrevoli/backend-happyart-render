
const validatorHandler = (schema, property) => {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            return res.status(400).json({ error: message });
        }
        next();
    };
}

module.exports = validatorHandler;