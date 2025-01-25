function routes(app) {
    app.get('/', (req, res) => {
        res.send('Get request initiated');
    })
}

module.exports = routes;