import { compare, genSalt, hash } from 'bcryptjs';
import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import { addUserValidation, loginUserValidation } from '../middlewares/auth.middleware';
import UserModel from '../models/user.model';
import { generateUID, sendPayload } from '../utils/auth.helper';
import { IPayload } from '../utils/constants';

const router = Router({
  caseSensitive: true,
});

router.post('/add-user', [...addUserValidation], async (req: Request, res: Response) => {
  const expressValidatorErrors = validationResult(req);

  if (!expressValidatorErrors.isEmpty()) {
    return res.status(400).json({
      error: expressValidatorErrors.array(),
    });
  }

  try {
    const newUser = new UserModel(req.body);

    const salt = await genSalt(10);

    const hashPassword = await hash(newUser.password, salt);

    newUser.password = hashPassword;

    newUser.uuid = generateUID(newUser.name, new Date().toISOString().replace(' ', ''));

    const userDoc = await newUser.save();

    const payload: IPayload = {
      name: userDoc.name,
      uuid: userDoc.uuid,
      phone: userDoc.phone,
    };

    const token = sendPayload(payload);
    return res.status(200).json({
      data: {
        token,
      },
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

router.post('/login-user', [...loginUserValidation], async (req: Request, res: Response) => {
  const expressValidatorErrors = validationResult(req);

  if (!expressValidatorErrors.isEmpty()) {
    return res.status(400).json({
      error: expressValidatorErrors.array(),
    });
  }

  const inputPhone = req.body.phone;

  try {
    const userDoc = await UserModel.findOne({ phone: inputPhone });

    if (!userDoc) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const passwordIsSame = await compare(req.body.password, userDoc.password);

    if (!passwordIsSame)
      return res.status(400).json({
        message: 'Invalid credentials',
      });

    const payload: IPayload = {
      name: userDoc.name,
      uuid: userDoc.uuid,
      phone: userDoc.phone,
    };

    const token = sendPayload(payload);
    return res.status(200).json({
      data: {
        token,
      },
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
