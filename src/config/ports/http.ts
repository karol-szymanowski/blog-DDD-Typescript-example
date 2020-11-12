import { Router } from 'express';
import ConfigService from '../config.service';
import InMemoryConfigStorageRepository from '../adapters/inMemoryConfigStorage.repository';

const configRepository = new InMemoryConfigStorageRepository();
const configService = new ConfigService(configRepository);

const router = Router();

router.get('/:client', async (req, res, next) => {
  try {
    const { client } = req.params;
    const result = await configService.GetLatestVersionConfigs({ client });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get('/:client/:version', async (req, res, next) => {
  try {
    const { client, version } = req.params;
    const result = await configService.getConfigs({ client, version: Number(version) });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.patch('/:client/:version', async (req, res, next) => {
  try {
    const { client, version } = req.params;
    const result = await configService.updateConfig({ ...req.body, client, version: Number(version) });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.put('/:client/:version', async (req, res, next) => {
  try {
    const { client, version } = req.params;
    const result = await configService.updateConfig({ ...req.body, client, version: Number(version) });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.delete('/:client/:version', async (req, res, next) => {
  try {
    const { client, version } = req.params;
    const result = await configService.deleteConfig({ client, version: Number(version) });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await configService.createConfig(req.body);
    res.status(201).json({});
  } catch (e) {
    next(e);
  }
});

router.patch('/', async (req, res, next) => {
  try {
    await configService.updateConfig(req.body);
    res.status(200).json({});
  } catch (e) {
    next(e);
  }
});

export const configRouter = router;
