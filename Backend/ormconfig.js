module.exports = [
    {
        "name": "default",
        "type": "postgres",
        "host": process.env.HOST,
        "port": 5432,
        "username": "postgres",
        "password": "root",
        "database": "bolsa-de-trabajo",
        "synchronize": true,
        "logging": false,
        "entities": [
            "dist/app/models/**/*.js"
        ]
    },
    {
        "name": "appsocios",
        "type": "postgres",
        "host": "db.cpyxafjlyybbgggzhnfd.supabase.co",
        "port": 5432,
        "username": "postgres",
        "password": "MaxiSebaMartin",
        "database": "postgres",
        "synchronize": false,
        "logging": false
    }
]