import IndexService from '../service/index_service'
import client from '../config/redis';
import { promisify } from 'util';
import logger from '../config/winston'
const get_async = promisify(client.get).bind(client);

class IndexController {
  async get_ip(req, res) {
    try {
      const indexService = new IndexService()
      let keys = await indexService.get_all_keys()
      const ip_json = {}
      await Promise.all(keys.map(async (item) => {
        let ip_value = await get_async(item)
        if (!ip_value) {
          throw new Error("ips didn't exist")
        }
        if (ip_value > 60) {
          ip_value = "error"
        }
        ip_json[item] = ip_value
      }))
      res.render('index', { ip: ip_json });
      // res.json({ code: "success" })
    } catch (e) {
      logger.error(`IndexController error : ${e}`)
      res.render('error', { error: { message: "something is wrong" } });
    }
  }
}

export default IndexController;
