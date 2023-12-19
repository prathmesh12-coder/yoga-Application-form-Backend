const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

//mongodb+srv://prathmesh:<password>@cluster0.2zcanyt.mongodb.net/?retryWrites=true&w=majority
//mongodb://localhost/yogaDB
mongoose.connect('mongodb+srv://prathmesh:prathmesh@cluster0.2zcanyt.mongodb.net/Admissionform?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const participantSchema = new mongoose.Schema({
  name: String,
  age: Number,
  mobile: String, 
  email: String,  
  batch: String,
});



const Participant = mongoose.model('Participant', participantSchema);

app.post('/enroll', async (req, res) => {
  try {
    // Basic validation
    const { name, age, mobile, email, batch } = req.body;
    if (age < 18 || age > 65) {
      return res.status(400).json({ error: 'Age must be between 18 and 65' });
    }
     
    var batch_id=Math.floor((Math.random()*10)%4+1);

    // Store data in the database
    const participant = new Participant({ name, age, mobile, email, batch:batch_id });
    await participant.save();

    // Mock payment function (not implemented)
    // CompletePayment(participant);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/',(req,res)=>{
  res.send("hello");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
