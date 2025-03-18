import Theater from "../models/TheaterModel.js";


export const addtheater = async (req, res) => {
    const { Name, City,Adress, row,col } = req.body;
    
    try {
        const newTheater = new Theater({
            Name,
            City,
            Adress,
            Capacity: { row: row, col: col }

        });

        await newTheater.save();
    } catch (e) {
        console.log(e);
    }
}


export const gettheaters = async (req, res) => {
    try {
        const theaters = await Theater.find();
        console.log(theaters);
        res.json(theaters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

