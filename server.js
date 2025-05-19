// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage for time slots
let timeSlots = [
    { time: '10:00 AM', booked: false, bookedBy: '' },
    { time: '11:00 AM', booked: false, bookedBy: '' },
    { time: '12:00 PM', booked: false, bookedBy: '' },
    { time: '1:00 PM', booked: false, bookedBy: '' },
    { time: '2:00 PM', booked: false, bookedBy: '' },
    { time: '3:00 PM', booked: false, bookedBy: '' },
    { time: '4:00 PM', booked: false, bookedBy: '' },
    { time: '5:00 PM', booked: false, bookedBy: '' }
];

// GET /slots - Return list of time slots with booking status
app.get('/slots', (req, res) => {
    res.json(timeSlots);
});

// POST /book - Book a slot
app.post('/book', (req, res) => {
    const { time, name } = req.body;
    const slot = timeSlots.find(slot => slot.time === time);
    
    if (!slot) {
        return res.status(404).json({ error: 'Time slot not found' });
    }
    
    if (slot.booked) {
        return res.status(400).json({ error: 'Slot already booked' });
    }
    
    slot.booked = true;
    slot.bookedBy = name;
    res.json({ message: 'Slot booked successfully', slot });
});

// POST /cancel - Cancel a booking
app.post('/cancel', (req, res) => {
    const { time } = req.body;
    const slot = timeSlots.find(slot => slot.time === time);
    
    if (!slot) {
        return res.status(404).json({ error: 'Time slot not found' });
    }
    
    if (!slot.booked) {
        return res.status(400).json({ error: 'Slot is not booked' });
    }
    
    slot.booked = false;
    slot.bookedBy = '';
    res.json({ message: 'Booking canceled successfully', slot });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});