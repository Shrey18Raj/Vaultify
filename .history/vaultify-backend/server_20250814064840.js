const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');

dotenv.config();
const app = express();
const documentRoutes = require('./routes/document.routes');

app.use('/api/documents', documentRoutes);


app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => res.send('Vaultify Backend Running ✅'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Vaultify API running on http://localhost:${PORT}`);
});
