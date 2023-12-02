const express = require("express");
const { createUser, updateUser, deleteUser, getUser } = require("../controller/user.controller");
const router = express.Router();

/**
 * @swagger
 * /v1/user/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided information.
 *     requestBody:
 *       description: User details for creation
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - mobile
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name.
 *               lastName:
 *                 type: string
 *                 description: User's last name.
 *               mobile:
 *                 type: string
 *                 description: User's mobile number.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router
    .route("/user/create")
    .post(createUser)

/**
 * @swagger
 * /v1/user/update/{userId}:
 *   patch:
 *     summary: Update an existing user
 *     description: Update an existing user with the provided information.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User details for update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's updated first name.
 *               lastName:
 *                 type: string
 *                 description: User's updated last name.
 *               mobile:
 *                 type: string
 *                 description: User's updated mobile number.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's updated email address.
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router
    .route("/user/update/:userId")
    .patch(updateUser)

/**
 * @swagger
 * /v1/user/delete/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router
    .route("/user/delete/:userId")
    .delete(deleteUser)
 

/**
 * @swagger
 * /v1/user/get:
 *   get:
 *     summary: Retrieve Users detail
 *     description: Retrieve a list of users. Can be use to get a single user details using query params
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: false
 *         description: Object ID of the user to retrieve.
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: success
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6532c8f29b8068cf734cb130
 *                       firstName:
 *                         type: string
 *                         example: prateek
 *                       email:
 *                         type: string
 *                         example: prateek@gmail.com
 *                       mobile:
 *                         type: string
 *                         example: 9876543210
 *                       createdAt:
 *                         type: string
 *                         example: 2023-10-20T18:37:38.659Z
 *                       updatedAt:
 *                         type: string
 *                         example: 2023-10-20T18:37:38.659Z
 *                       __v:
 *                         type: integer
 *                         example: 0
 *       404: 
 *         description: User doesn't exist
 */
router
    .route("/user/get")
    .get(getUser)
    
module.exports = router;