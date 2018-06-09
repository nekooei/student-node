import {Router} from "express";
import GatewayProvider from '../provider/gateway';
import ResponseGenerator from "../../../util/responseGenerator";
import authMiddleWare from '../../../middleware/authentication';


export default ({config, database}) => {
  let api = new Router();
  const gatewayProviderInstance = new GatewayProvider(database);

  api.get('/', authMiddleWare, async (req, res) => {
    try {
      const gateways = await gatewayProviderInstance.getAllGateways();
      res.json(ResponseGenerator(true, 'gateways', gateways.map(gateway => {
          return {
            ...gateway,
            apikey: undefined
          }
        })
      ));
    } catch (e) {
      res.json(ResponseGenerator(false, e.message, e))
    }

  });

  return api;

}