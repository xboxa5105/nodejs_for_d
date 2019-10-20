import client from '../config/redis'
import logger from '../config/winston'

class IndexService {
    async get_all_keys() {
        let keys = await new Promise((resolved, rejected) => {
            client.keys('*', async function (err, keys) {
                if (err) {
                    logger.error(`IndexService GetAllKeys error: ${err}`);
                    rejected(err)
                } else if (keys) {
                    resolved(keys)
                }
            });
        })
        return keys
    }
}

export default IndexService