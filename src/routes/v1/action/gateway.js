import {Router} from "express";
import authMiddleWare from '../../../middleware/authentication';
import GatewayProvider from '../provider/gateway';
import ResponseGenerator from "../../../util/responseGenerator";


export default ({config, database}) => {
  let api = new Router();
  const gatewayProviderInstance = new GatewayProvider(database);

    api.get('/', async (req, res) => {
      try{
        const gateways = await gatewayProviderInstance.getAllGateways();
        res.json(ResponseGenerator(true, 'gateways', gateways))
      }catch (e) {
        res.json(ResponseGenerator(false, e.message, e))
      }

  });

  return api;

}