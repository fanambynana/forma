import { ContactSchema } from "./contactType";
import fs from "fs";
import { resolve } from "path";
import { NextApiRequest, NextApiResponse } from 'next';

const dataPath = resolve("pages", "api", "data");
const dataFile = dataPath + "/contacts.json"
function verifyDirAndFile(): void {
    if (!fs.existsSync(resolve(dataPath))) {
        fs.mkdirSync(dataPath);
        fs.writeFileSync(dataFile, "[]");
    }
    
}

function readData(): ContactSchema[] {
    verifyDirAndFile();
    const data: ContactSchema[] = JSON.parse(fs.readFileSync(dataFile).toString());
    return data;
}

function writeData(data: ContactSchema[]): void {
    verifyDirAndFile();
    fs.writeFileSync(dataFile, JSON.stringify([...readData(),  data], null, "\t"));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Renvoyer le formulaire ici.' });
  } else if (req.method === 'POST') {
    const formData = req.body;
    writeData(JSON.parse(formData));
    res.status(200).json({ message: 'Données du formulaire enregistrées.' });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée.' });
  }
}