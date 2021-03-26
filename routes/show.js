const express = require("express");
const router = express.Router();
const showService = require("./../services/ShowService");
const { isLogined } = require("./../middlewares/auth");
const { success, failed } = require("./../common");

/**
 * @swagger
 * /show/list:
 *  get:
 *    summary: show list
 *    description: 공연 리스트
 *    parameters:
 *      - in: query
 *        name: order
 *        required: false
 *        description: 정렬 방법 - C; 최근순, O; 열린순, A; 가나다순, 입력 안할시 최근순
 *        schema:
 *          type: string
 *      - in: query
 *        name: isDone
 *        required: false
 *        description: 폐막 포함 여부
 *        schema:
 *          type: boolean
 *    responses:
 *       200:
 *         description: A list of Shows.
 */
router.get("/list", isLogined, (req, res, next) => {
  const { order, isDone } = req.query;
  let useOrder = [[]];
  let query = {};
  switch (order) {
    case "O":
      useOrder = [["start_dt", "asc"]];
      break;
    case "A":
      useOrder = [["title", "asc"]];
      break;
    default:
      useOrder = [["create_dt", "asc"]];
      break;
  }
  if (!isDone) {
    query = {
      end_dt: { $gte: new Date() },
    };
  }

  showService
    .findAll(query, useOrder, 20, 0)
    .then((response) => {
      res.json(success(response, "success"));
    })
    .catch((err) => {
      res.json(failed(err, "error"));
    });
});

router.post("/create", isLogined, (req, res, next) => {
  res.json(success({}, "success!"));
});

module.exports = router;
