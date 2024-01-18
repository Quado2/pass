import { body } from "express-validator";


export function getTicketValidations(){
  return [
    body('title')
    .not().isEmpty()
    .withMessage('Title is required'),
    body('price')
    .isFloat({gt: 0})
    .withMessage("Price should be greater than 0")
  ]
}