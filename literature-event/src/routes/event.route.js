const express = require("express");
const { createEvent, getTopContent } = require("../controller/event.controller");
const router = express.Router();


/**
 * @swagger
 * /v1/event/{contentId}:
 *   post:
 *     summary: Create or Update Content Interaction
 *     description: Create or update the interaction data for a specific content item.
 *     parameters:
 *       - in: path
 *         name: contentId
 *         description: The unique identifier of the content item to create or update interactions.
 *         required: true
 *         type: string
  *     requestBody:
 *       description: User details for creation
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - like
 *               - read
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User's ID.
 *               like:
 *                 type: number
 *                 description: If liked pass 1, if unlike pass -1, default 0
 *               read:
 *                 type: number
 *                 description: If done reading pass 1, default 0  
 *     responses:
 *       200:
 *         description: Interaction data for the content item has been created or updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: HTTP status code for the response (e.g., 200 for success).
 *                 message:
 *                   type: string
 *                   description: A message describing the outcome of the request.
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the interaction record.
 *                     contentId:
 *                       type: string
 *                       description: Unique identifier for the content.
 *                     userId:
 *                       type: string
 *                       description: Unique identifier of the user.
 *                     like:
 *                       type: integer
 *                       description: Number of likes for the content (can be negative for dislikes).
 *                     read:
 *                       type: integer
 *                       description: Number of times the content has been read.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time of interaction creation or update.
 *                 example:
 *                   code: 200
 *                   message: success
 *                   result:
 *                     _id: "6534e309b18d421bfc7ba912"
 *                     contentId: "6534b9133a6d3e24c083f5ed"
 *                     userId: "6532c8f29b8068cf734cb130"
 *                     like: 3
 *                     read: 1
 *                     updatedAt: "2023-10-25T09:40:33.364Z"
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *       500:
 *         description: Internal server error.
 */
router
    .route("/event/:contentId")
    .post(createEvent)


/**
 * @swagger
 * /v1/getTopContent:
 *   get:
 *     summary: Get Top Content
 *     description: Retrieve top content with interaction statistics.
 *     parameters:
 *       - in: query
 *         name: skip
 *         description: The number of items to skip (pagination).
 *         required: false
 *         type: integer
 *       - in: query
 *         name: limit
 *         description: The maximum number of items to return.
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: A list of top content items with interaction data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: HTTP status code for the response (e.g., 200 for success).
 *                 message:
 *                   type: string
 *                   description: A message describing the outcome of the request.
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the interaction record.
 *                       contentId:
 *                         type: string
 *                         description: Unique identifier for the content.
 *                       __v:
 *                         type: integer
 *                         description: Version information.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time of interaction creation.
 *                       likes:
 *                         type: integer
 *                         description: Number of likes for the content.
 *                       read:
 *                         type: integer
 *                         description: Number of times the content has been read.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time of interaction update.
 *                       interaction:
 *                         type: integer
 *                         description: Total interactions for the content.
 *               example:
 *                 code: 200
 *                 message: success
 *                 result:
 *                   - _id: "6534e375b18d421bfc7cc8b3"
 *                     contentId: "653420de5f75cdb08b41971b"
 *                     __v: 0
 *                     createdAt: "2023-10-22T08:55:17.148Z"
 *                     likes: 1
 *                     read: 1
 *                     updatedAt: "2023-10-22T08:55:17.148Z"
 *                     interaction: 2
 *                   - _id: "6534e309b18d421bfc7ba912"
 *                     contentId: "6534b9133a6d3e24c083f5ed"
 *                     __v: 0
 *                     createdAt: "2023-10-22T08:53:29.355Z"
 *                     likes: 1
 *                     read: 0
 *                     updatedAt: "2023-10-22T08:53:29.355Z"
 *                     interaction: 1
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *       500:
 *         description: Internal server error.
 */
router
    .route("/getTopContent")
    .get(getTopContent)
    
module.exports = router;