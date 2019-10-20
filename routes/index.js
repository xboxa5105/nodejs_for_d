import IndexController from '../controller/index_controller';
import check_ip from '../middleware/check_ip';
import express from 'express';
const router = express.Router();

/* GET index page. */
const indexController = new IndexController()
router.get('/', check_ip, indexController.get_ip);

export { router as indexRouter }