module.exports = {
    experimental: {
        async rewrites() {
            return [
                {
                    source: '/api/login',
                    destination: `http://localhost:8000/login`,
                },
                {
                    source: '/api/logout',
                    destination: `http://localhost:8000/logout`,
                },
                {
                    source: '/api/:route*',
                    destination: `http://localhost:8000/api/:route*`,
                }
            ]
        }
    }
}