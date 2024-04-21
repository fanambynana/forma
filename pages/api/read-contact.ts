import fs from "fs";
import {resolve} from "path";
import {ContactSchema} from "./contactType";
import { NextApiRequest, NextApiResponse } from 'next';

const dataPath = resolve("pages", "api", "data");
const dataFile = dataPath + "/contacts.json";

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(JSON.stringify(readData()));
  } else {
    res.status(405).json({ message: 'Méthode non autorisée.' });
  }
}
