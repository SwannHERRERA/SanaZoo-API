import express from "express";
import { employeeMiddleware, adminMiddleware } from "../../middlewares";
import { Planning_Controller } from "../../controllers/planning/planning.controller";
import * as yup from "yup";
import { IPlaning_Result } from "../../models";

const employeePlanningRouter = express.Router();

employeePlanningRouter.get(
  "/calendar",
  employeeMiddleware,
  async function (req, res) {
    const start_time = new Date(req.body.start_time);
    const number_of_days = Number.parseInt(req.body.number_of_day);

    if (number_of_days <= 0) {
      res.status(500).end();
      return;
    }
    const controller = await Planning_Controller.getInstance();
    const result = await controller.getCalendar(start_time, number_of_days);
    if (result === null) {
      res.status(500).end();
      return;
    }
    const calendar = [];

    let date = result[0].start_time.toDateString();
    const presence = [];
    for await (const instance of result) {
      if (instance.start_time.toDateString() !== date) {
        await calendar.push({
          date: date,
          presence: JSON.parse(JSON.stringify(presence)),
        });
        date = instance.start_time.toDateString();
        presence.length = 0;
      }
      await presence.push(instance);
    }
    await calendar.push({
      date: date,
      presence: JSON.parse(JSON.stringify(presence)),
    });
    console.log(calendar);

    res.status(200).json(calendar).end();
  }
);

employeePlanningRouter.get(
  "/openDate",
  employeeMiddleware,
  async function (req, res) {
    const start_time = new Date(req.body.start_time);
    const number_of_days = Number.parseInt(req.body.number_of_day);

    if (number_of_days <= 0) {
      res.status(500).end();
      return;
    }
    const controller = await Planning_Controller.getInstance();
    const result: IPlaning_Result[] = await controller.getPlanning(
      start_time,
      number_of_days
    );
    console.log(result);
    const calendar = [];

    let date = result[0].start_time;
    const presence = [];

    for (const instance of result) {
      if (instance.start_time !== date) {
        if (
          presence.indexOf(2) !== -1 &&
          presence.indexOf(3) !== -1 &&
          presence.indexOf(4) !== -1 &&
          presence.indexOf(5) !== -1
        ) {
          calendar.push(date);
        }
        presence.length = 0;
        date = instance.start_time;
      }
      presence.push(instance.user_role_id);
    }
    if (
      presence.indexOf(2) !== -1 &&
      presence.indexOf(3) !== -1 &&
      presence.indexOf(4) !== -1 &&
      presence.indexOf(5) !== -1
    ) {
      calendar.push(date);
    }

    res.status(200).json(calendar).end();
  }
);

employeePlanningRouter.get(
  "/user/:id",
  employeeMiddleware,
  async function (req, res) {
    const id = Number.parseInt(req.params.id);
    const controller = await Planning_Controller.getInstance();
    const result = await controller.getAllFromEmployee(id);

    if (result === null) {
      res.status(404).end();
      return;
    }
    res.status(200).json(result).end();
  }
);

employeePlanningRouter.get(
  "/:id",
  employeeMiddleware,
  async function (req, res) {
    const id = Number.parseInt(req.params.id);
    const controller = await Planning_Controller.getInstance();
    const result = await controller.getOne(id);

    if (result === null) {
      res.status(404).end();
      return;
    }
    res.status(200).json(result).end();
  }
);

employeePlanningRouter.get("/", employeeMiddleware, async function (req, res) {
  const offset = req.body.offset;
  const limit = req.body.limit;
  const controller = await Planning_Controller.getInstance();
  const result = await controller.getAll({ offset, limit });

  res.status(200).json(result).end();
});

employeePlanningRouter.delete("/", adminMiddleware, async function (req, res) {
  const id = Number.parseInt(req.params.id);
  const controller = await Planning_Controller.getInstance();
  const result = await controller.remove(id);

  if (result === 0) {
    res.status(404).end();
    return;
  }
  res.status(200).end();
});

employeePlanningRouter.post("/", employeeMiddleware, async function (req, res) {
  const props = {
    day_of_week: req.body.day_of_week,
    start_time: new Date(req.body.start_time),
    end_time: new Date(req.body.end_time),
    userId: req.body.userId,
  };
  schemaValidate
    .validate({
      ...props,
    })
    .then(async function () {
      const controller = await Planning_Controller.getInstance();
      const result = await controller.add({
        ...props,
      });
      if (result === null) {
        res.status(500).end();
        return;
      }
      res.status(200).json(result).end();
    })
    .catch((Err) => {
      res.status(400).json(Err.message).end();
    });
});

employeePlanningRouter.put(
  "/:id",
  employeeMiddleware,
  async function (req, res) {
    const id = Number.parseInt(req.params.id);
    const controller = await Planning_Controller.getInstance();
    const previous = await controller.getOne(id);
    if (previous === null) {
      res.status(404).end();
      return;
    }
    const props = {
      day_of_week: req.body.day_of_week || previous.day_of_week,
      start_time: req.body.start_time || previous.start_time,
      end_time: req.body.end_time || previous.end_time,
      userId: req.body.userId || previous.userId,
    };
    schemaValidate
      .validate({
        ...props,
      })
      .then(async function () {
        const result = await controller.update(id, {
          ...props,
        });
        if (result === null) {
          res.status(404).end();
          return;
        }
        res.status(200).json(result).end();
      })
      .catch((Err) => {
        res.status(400).json(Err.message).end();
      });
  }
);

const schemaValidate = yup.object().shape({
  start_time: yup.date().min(new Date(Date.now())).required(),
  end_time: yup
    .date()
    .when("start_time", (start_time: Date) => yup.date().min(start_time))
    .required(),
  day_of_week: yup
    .string()
    .oneOf([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
    .required(),
  userId: yup.number().min(0).required(),
});

export { employeePlanningRouter };
