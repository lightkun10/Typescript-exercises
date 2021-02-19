"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
const PORT = 3001;
const router = express_1.default.Router();
router.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
/** Routers */
app.use('/api', router);
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patientRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
