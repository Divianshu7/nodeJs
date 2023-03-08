const AsyncHandler = require("express-async-handler");
import { Users } from "../model/users";
export const findAllUsers = AsyncHandler(async (req, res) => {
    const usersList = await Users.find();

    res.status(200).json({
        description: "Successsfully fetched users data!",
        data: usersList,
    });
});

export const createUsers = AsyncHandler(async (req, res) => {

    if (!req.body.username) {
        res.status(400).json({
            description: "Bad request username must be filled!"
        })
    }
    if (!req.body.password) {
        res.status(400).json({
            description: "Bad request password must be filled!"
        })
    }
    if (!req.body.email) {
        res.status(400).json({
            description: "Bad request email must be filled!"
        })
    }

    const users_map = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    const users = await Users.create(users_map)

    res.status(200).json({
        description: "Successfully saved user data!"
    })
})

export const findtUsersById = AsyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id)
    // console.log("user: ", user)
    res.status(200).json({
        description: `Successfully fetch by id: ${req.params.id} user data!`,
        data: user
    })
})

export const updateUsers = AsyncHandler(async (req, res) => {
    const user = await Users.updateMany(req.body, {
        where: { id: req.params.id }
    })

    res.status(200).json({
        description: `Successfully updated user data!`,
    })
})

export const removeUsers = AsyncHandler(async (req, res) => {
    const user = await Users.deleteMany({
        where: { id: req.params.id }
    })
    res.status(200).json({
        description: `Successfully deleted user data!`,
    })
})