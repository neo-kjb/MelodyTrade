import { Request, Response } from 'express';
import { DiskService } from './diskService';
import { UserService } from '../user/userService';

export const createDisk = async (req: Request, res: Response) => {
  try {
    req.body.userId = req.reqUserId;
    const disk = await DiskService.createDisk(req.body);
    res.status(201).send({ message: 'Disk Created Successfully', disk });
  } catch (error) {
    console.error('Error creating disk:', error);
    return res.status(500).send({ message: error.message });
  }
};

export const getDisksByUser = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = await UserService.findOneByUsername(username);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const disks = await DiskService.getDisksByUsername(username);
    return res
      .status(200)
      .send(
        disks.length
          ? { count: disks.length, data: disks }
          : { message: 'No disks found' }
      );
  } catch (error) {
    console.error('Error getting disks by user:', error);
    return res.status(500).send({ message: error.message });
  }
};

export const getDisks = async (req: Request, res: Response) => {
  try {
    const disks = await DiskService.getAllDisks();
    return res
      .status(200)
      .send(
        disks.length
          ? { count: disks.length, data: disks }
          : { message: 'No disks found' }
      );
  } catch (error) {
    console.error('Error getting disks:', error);
    return res.status(500).send({ message: error.message });
  }
};

export const getDiskDetails = async (req: Request, res: Response) => {
  try {
    const diskId = parseInt(req.params.id, 10);
    if (isNaN(diskId) || diskId <= 0) {
      return res.status(400).send({ message: 'Invalid disk ID' });
    }
    const disk = await DiskService.getDiskById(diskId);

    if (!disk) {
      return res.status(404).send({ message: 'No disk found' });
    }
    return res.status(200).send(disk);
  } catch (error) {
    console.error('Error getting disk:', error);
    return res.status(500).send({ message: error.message });
  }
};

export const editDisk = async (req: Request, res: Response) => {
  try {
    const diskId = parseInt(req.params.id, 10);
    if (isNaN(diskId) || diskId <= 0) {
      return res.status(400).send({ message: 'Invalid disk ID' });
    }
    const disk = await DiskService.getDiskById(diskId);
    if (!disk) {
      return res.status(404).send({ message: 'No disk found' });
    }
    if (disk.userId !== req.reqUserId) {
      return res.status(401).send({ message: 'Not Authenticated' });
    }
    req.body.userId = req.reqUserId;
    const updatedDisk = await DiskService.updateDisk(diskId, req.body);
    return res
      .status(200)
      .send({ message: 'Disk updated successfully', updatedDisk });
  } catch (error) {
    console.log('Error editing disk', error);
    return res.status(500).send({ message: error.message });
  }
};

export const deleteDisk = async (req: Request, res: Response) => {
  try {
    const diskId = parseInt(req.params.id, 10);
    if (isNaN(diskId) || diskId <= 0) {
      return res.status(400).send({ message: 'Invalid disk ID' });
    }
    const disk = await DiskService.getDiskById(diskId);

    if (!disk) {
      return res.status(404).send({ message: 'No disk found' });
    }

    if (disk.userId !== req.reqUserId) {
      return res.status(401).send({ message: 'Not Authenticated' });
    }

    await DiskService.deleteDisk(diskId);
    return res.status(200).send({ message: 'Disk deleted successfully' });
  } catch (error) {
    console.log('Error deleting disk', error);
    return res.status(500).send({ message: error.message });
  }
};
