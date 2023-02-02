import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import { addOrderValidation, getOrderValidation } from '../middlewares/order.middleware';
import OrderModel from '../models/order.model';
import UserModel from '../models/user.model';

const router = Router({
  caseSensitive: true,
});

router.post('/add-order', [...addOrderValidation], async (req: Request, res: Response) => {
  const expressValidatorErrors = validationResult(req);

  if (!expressValidatorErrors.isEmpty()) {
    return res.status(400).json({
      error: expressValidatorErrors.array(),
    });
  }

  try {
    const userDoc = await UserModel.findOne({
      phone: req.payload.phone,
      uuid: req.payload.uuid,
    });

    if (!userDoc) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const newOrder = new OrderModel({
      phone: req.payload.phone,
      total: req.body.total,
      uuid: req.payload.uuid,
    });

    await newOrder.save();

    return res.status(200).json({
      message: 'Order added successfully',
    });
  } catch (error) {
    if (error) {
      console.error(error);
      return res.status(400).json({
        error,
      });
    }
  }
});

router.get('/get-order', [...getOrderValidation], async (req: Request, res: Response) => {
  const expressValidatorErrors = validationResult(req);

  if (!expressValidatorErrors.isEmpty()) {
    return res.status(400).json({
      error: expressValidatorErrors.array(),
    });
  }

  try {
    const orderDocs = await OrderModel.find({ uuid: req.query.user_id });

    if (orderDocs.length === 0) {
      return res.status(400).json({
        message: 'No order found',
      });
    }

    return res.status(200).json({
      data: orderDocs,
    });
  } catch (error) {
    if (error) {
      console.error(error);
      return res.status(400).json({
        error,
      });
    }
  }
});

export default router;
