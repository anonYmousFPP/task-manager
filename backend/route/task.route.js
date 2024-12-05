import express from 'express';
const router = express.Router();
import Task from '../schema/task.schema.js';

router.get('/read', async (req, res) => {
    try {
        const response = await Task.find();
        if(!response){
            return res.status(404).send("Book is not found");
        }

        res.status(200).json({response});
    } catch (e) {
        console.log(`Error is found ${e}`);
        res.status(404).send("Error is found");
    }
})

router.post('/create', async (req, res) => {
    try {
        // todo for post
        const data = req.body;
        const response = new Task(data);
        const taskSave = await response.save();
        console.log(taskSave);
        res.status(200).json(taskSave);
    }
    catch (e) {
        console.log(`Error is found ${e}`);
        res.status(404).send(e);
    }
})

router.put('/update', async (req, res) => {
    try{
        const data = req.body;
        const id = req.query.id;
        const response = await Task.findByIdAndUpdate(id, data, { new: true });
        console.log(response);
        if(!response){
            return res.status(404).send("Task is missing");
        }
        res.status(200).json({response});
    }catch(e){
        console.log(`Error is found ${e}`);
        res.status(404).send("Error is found");
    }
})

router.delete('/delete', async (req, res) => {
    try{
        const id = req.query.id;
        const response = await Task.findByIdAndDelete(id);
        console.log(response);
        if(!response){
            return res.status(404).send("Task is not found");
        }
        res.status(200).send("Task is Deleted");
    }catch(e){
        console.log(`Error is found ${e}`);
        res.status(404).send("Error is found");
    }
})

export default router;