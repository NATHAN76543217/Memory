printjson({test: "COUCOU\n\nCOUCOU"})
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
console.log("DONE");
