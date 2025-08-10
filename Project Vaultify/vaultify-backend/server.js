const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const documentRoutes = require('./routes/document.routes');
const folderRoutes = require('./routes/folder.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const tagRoutes = require('./routes/tag.routes');
const userRoutes = require('./routes/user.routes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.send('Vaultify Backend Running ✅'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Vaultify API running on http://localhost:${PORT}`);
    console.log('JWT_SECRET: ', process.env.JWT_SECRET);
});