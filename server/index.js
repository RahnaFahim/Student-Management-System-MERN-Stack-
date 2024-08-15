const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const teacherRoutes = require('./routes/TeacherRoutes');
const studentRoutes = require('./routes/StudentRoutes');
const studentProfileRoutes = require('./routes/StudentProfileRoutes');
const teacherOperationsRoutes = require('./routes/TeacherOperations');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://mongo:mongodb@cluster0.cbm2z.mongodb.net/student-system", { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/uploads', express.static('uploads'));

//routes
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.use('/api', studentProfileRoutes);
app.use('/teacher-operations', teacherOperationsRoutes);

// Start server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
