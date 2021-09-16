module.exports = (data) => ({
    ...data,
    values: () => Object.values(data),
    keys: () => Object.keys(data),
    key: (value) => Object.keys(data).find((key) => data[key] === value)
});
