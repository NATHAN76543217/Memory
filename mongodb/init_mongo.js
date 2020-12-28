printjson({createUser: "create nlceaill user"})
db.createUser(
    {
    user : "nlecaill",
    pwd : "nlecaill",
    roles : [
        {
            role: "readWrite",
            db : "memory_db"
        }]
    }
)