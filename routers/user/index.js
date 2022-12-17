const userRouter = require("express").Router()
const userController = require("./user.controller")

/**
 * @swagger
 * paths:
 *  /api/user/users:                                                #경로
 *    get:                                                          #method
 *      summary: "유저 데이터 전체조회 :)"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "id": 1, "name": "유저1" },
 *                            { "id": 2, "name": "유저2" },
 *                            { "id": 3, "name": "유저3" },
 *                          ]
 */
userRouter.get("/users", userController.getUsers)

/**
 * @swagger
 * /api/user/user?user_id={user_id}:
 *  get:
 *    summary: "특정 유저조회 Query 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "유저1" }]
 */
userRouter.get("/user", userController.findOneUser1)

/**
 * @swagger
 * /api/user/{user_id}:
 *  get:
 *    summary: "특정 유저조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "유저1" }]
 */
userRouter.get("/:user_id", userController.findOneUser2)

/**
 * @swagger
 *
 * /api/user/add:
 *  post:
 *    summary: "유저 등록"
 *    description: "POST 방식으로 유저를 등록한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: "유저 고유아이디"
 *              name:
 *                type: string
 *                description: "유저 이름"
 */
userRouter.post("/add", userController.createUser)

/**
 * @swagger
 * /api/user/update:
 *   put:
 *    summary: "유저 수정"
 *    description: "PUT 방식을 통해 유저 수정(전체 데이터를 수정할 때 사용함)"
 *    tags: [Users]
 *    requestBody:
 *      description: 유저 수정
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: int
 *                description: "유저 고유아이디"
 *              name:
 *                type: string
 *                description: "유저 이름"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.(유저 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" },
 *                    ]
 */
userRouter.put("/update", userController.setUsers)

/**
 * @swagger
 * /api/user/update/{user_id}:
 *   patch:
 *    summary: "유저 수정"
 *    description: "Patch 방식을 통해 특정 유저 수정(단일 데이터를 수정할 때 사용함)"
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 수정
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "유저 이름"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" },
 *                    ]
 */
userRouter.patch("/update/:user_id", userController.setUser)

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *    summary: "특정 유저 삭제"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" },
 *                    ]
 */
userRouter.delete("/delete", userController.delUser)

module.exports = userRouter


