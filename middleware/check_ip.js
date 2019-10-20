import client from '../config/redis';
import logger from '../config/winston'
import { promisify } from 'util';
const get_async = promisify(client.get).bind(client);

async function check_ip(req, res, next) {
    try {
        let req_ip = await get_async(req.headers['x-real-ip'])
        if (req_ip != null) {
            req_ip++
        } else {
            req_ip = 1
        }
        client.set(req.headers['x-real-ip'], req_ip, 'EX', 60)
        next()
    } catch (e) {
        logger.error("CheckIP error : ", e)
        next(e)
    }
}

export default check_ip