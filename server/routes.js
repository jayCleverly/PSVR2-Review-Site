const UserModel = require("./models/Users");

module.exports = function(app) {

    // get all users
    app.get("/getUsers", (req, res) => {
        UserModel.find({})
        .then((out) => res.json(out))
        .catch((err) => res.json(err));
    });

    // create new user
    app.post("/createUser", async (req, res) => {
        const user = req.body;
        const newUser = new UserModel(user);

        await newUser.save();
        res.json(user);
    });
}