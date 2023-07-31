# Ai-Development-Build-a-Chatbot-To-Help-You-Cheat-at-reading-anything-Super-Simple-

https://www.youtube.com/watch?v=8aD20j-A9rQ

https://raw.githubusercontent.com/RodrigoMvs123/Ai-Development-Build-a-Chatbot-To-Help-You-Cheat-at-reading-anything-Super-Simple-/master/README.md

https://singlestore.com 

React APP
Prompt
C: \Users\Matheus>cd Desktop
C: \Users\Matheus\Desktop>cd Rodrigo
C: \Users\Matheus\Desktop\Rodrigo>cd Visual Studio Code
C: \Users\Matheus\Desktop\Rodrigo\Visual Studio Code>cd Ania Kubow
C: \Users\Matheus\Desktop\Rodrigo\Visual Studio Code\Ania Kubow>cd Ai Development! Build a Chatbot To Help You Cheat at Reading anything! (Super Simple!)>
C: \Users\Matheus\Desktop\Rodrigo\Visual Studio Code\Ania Kubow\Ai Development! Build a Chatbot To Help You Cheat at Reading anything! (Super Simple!)>npx create-singlestoredb-app pdf-ai-reader acc7dba7bd83f30fa1df55efac007292f5ea39bdf4393dc28145731f47cfc69d

Single Store UI
ORG: RODRIGO MV SOARE´S ORGANIZATION
API Keys
Create API Key
API Key Name
codewithania
Expiration
Never Expires 
Create API Key
API Key
acc7dba7bd83f30fa1df55efac007292f5ea39bdf4393dc28145731f47cfc69d
API Keys
Name                      Creation date            Expiration date
codewithania           26th Jul 2023            never expires
SingleStore
>CLOUD
pdf-ai-reader-workspace-group-1
Create Database
Choose a new database name
reader_data
Create Database
Workspaces                                                 Databases
pdf-ai-reader-workspace-group-1                 reader_data
SigleStore
>CLOUD
pdf-ai-reader-workspace-group-1
Database
reader_data
SingleStore
DEVELOP
Notebooks             Preview    + 
langchain_pdf
Create
langchain_pdf
pdf-ai-reader-workspace-group-1        reader_data
Connection                                           Database
pdf-ai-reader-workspace-group-1         reader_data
Notebook
Edit    View    Run    Kernel
Code                    Markdown
## Install Libraries
Install Libraries
Code
!pip install langchain - -quiet
!pip install openai - -quiet
!pip install pdf2image - -quiet
!pip install tiktoken - -quiet
!pip install unstructured - -quiet
Code                     Markdown
## Load the PDF from on online location
Load the PDF from on online location
Code
from langchain.document_loaders import OnlinePDFLoader

# if using on your s2 workspace remember to add a firewall exception for https://wolfpaulus.com
loader = OnlinePDFLoader(“https://wolfpaulus.com/wp-content/uploads/2017/05/field-guide-to-data-science.pdf”) 

data = loader.load()
Save 
Edit Firewall
Add FQDN
wolfpaulus.com
Save
Code                            Markdown
## Check to see how many documents and chars are in the book
Check to see how many documents and chars are in the book
Code
from langchain.text_splitter import RecursiveCharacterTextSplitter

print (f“You have {len(data)} document(s) in your data”)
print (f“There are {len(data[0].page_content)} characters in your document”)
You have 1 document(s) in your data
There are 199527 characters in your document
Code                                Markdown
## Now let´s split the data into chunks before we turn them into embeddings
Now let´s split the data into chunks before we turn them into embeddings
Code
# Split the data
text_splitter =RecursiveCharacterTextSplitter(chunk_size = 2000, chunk_overlap = 0)
texts = text_splitter.split_documents(data)

# Check how many documents we have now
print (f”You have {len(texts)} pages”)
You have 139 pages
Code                                 Markdown
## Let´s convert the chunks into embeddings and them store it in a SingleStore table
Let´s convert the chunks into embeddings and them store it in a SingleStore table
Code                               Markdown
## Let´s create the table first
Let´s create the table first
Code
%%sql

USE reader_data;
DROP TABLE IF EXISTS my_book;
CREATE TABLE IF NOT EXISTS my_book (
       id INT PRIMARY KEY,
       text TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
       embedding BLOB
);
Code
SingleStore
CLOUD
pdf-ai-reader-workspace-group-1 
Databases
reader_data
pdf-ai-reader-workspace-group-1 reader_data
Tables      Views    Procedures   Functions             Aggregates        Pipelines     
Name                                                  Storage                                  Row count  …
IIII my_book                                        Columnstore
SingleStore
DEVELOP
Notebooks
Name
langchain_pdf.ipynb
langchain_pdf
pdf-ai-reader-workspace-group-1         reader_data
Edit    View    Run    Kernel
Code
import openai

# Check to see if there is an environment variable with your API key,
# if not use what you put bellow

OPENAI_API_KEY = os.environ.get(
       ‘OPENAI_API_KEY’,
       ‘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’
) 
https://platform.openai.com/ 
Personal 
View API Keys
Create new secret key 
Name
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
Code
print(texts[0].__dict__)
Code
from sqlalchemy import *

db_connection = create_engine(connection_url)
Code
from langchain.embeddings import OpenAIEmbeddings

# Initializing the OpenAIEmbeddings
embedder =  OpenAIEmbeddings(open_ai_key = “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
”)
Code
## Now let´s add the embeddings to the my_book table. Truncate to make sure we don´t overwrite
Now let´s add the embeddings to the my_book table. Truncate to make sure we don´t overwrite
Code
# Clear the my_book table
db_connection.execute(“TRUNCATE TABLE my_book”)

# Iterate over the texts
for i, document in enumerate(texts):
       # Extract the text content from the Document
       text_content = document.page_content

       # Convert the text to embeddings
       embedding  = embedder.embed_documents([text_content])[0]

       # Insert the text and it´s embedding into the database
       start = “““
              INSERT INTO my_book (
                     id,
                     text,
                     embedding
              )
              VALUES (
                     %s,
                     %s,
                     JSON_ARRAY_PACK_F32(%s)
              )
       ”””

db.connection.execute(stmt, (int(i), str(text_content), str(embedding)))

SigleStore
>CLOUD
pdf-ai-reader-workspace-group-1
Database
reader_data
pdf-ai-reader-workspace-group-1 reader_data
Tables      Views    Procedures   Functions             Aggregates        Pipelines     
Name                                                  Storage                                  Row count  …
IIII my_book                                        Columnstore
SingleStore
pdf-ai-reader-workspace-group-1 reader_data IIII my_book
Columns (3)     Indexes 2       Sample Data i      SQL
Name                 Data Type  Computed  Nullable  Default   Memory Usage  Disk Usage CR
# id                     int(11)         No              No          - 
A text                  text             No              Yes
A embedding      blob            No              Yes
langchain_pdf
pdf-ai-reader-workspace-group-1         reader_data
Edit    View    Run    Kernel
Code
%%sql

USE reader_data
SELECT JSON_ARRAY_UNPACK_F32(embedding).text
FROM my_book
WHERE id = 5;

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
.env

.env
HOST="svc-977d6e0f-dcc8-41ac-b4e5-7f37983d8d1d-dml.aws-london-1.svc.singlestore.com"
PASSWORD="Nj5mSFZYcoASSKIPFmbhUL;h"
OPENAI="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"

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src 
client
routes.ts

routes.ts
import * as express from "express";
import {
    getDatabases,
    selectTable,
} from "./connection";
import * as fs from "fs";
import * as dotenv from "dotenv";
const bodyParser = require("body-parser");
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

const app = express();
const router = express.Router();

router.get("/api/hello", (req, res, next) => {
    res.json("SingleStore");
});

router.post("/setup", bodyParser.json(), async (req, res, next) => {
    const host = req.body.hostname;
    const password = req.body.password;

    try {
        fs.writeFileSync(".env", `HOST="${host}"\nPASSWORD="${password}"`);
    } catch (err) {
        console.error(err);
    }

    try {
        const data = fs.readFileSync(".env", "utf-8");
        console.log({ data });
    } catch (err) {
        console.error(err);
    }

    dotenv.config();
    res.json("/SETUP!");
});

router.get("/api/database", async (req, res) => {
    const sqlRes = await getDatabases();
    res.json(sqlRes);
});

router.post("/api/database", bodyParser.json(), async (req, res) => {
    console.log("POST /api/database, body:", req.body);

    const database = req.body.database;
    const sqlRes = await createDatabase({ database });
    res.json(sqlRes);
});

export default router;

Visual Studio Code
Terminal 
npm i openai

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
connection.ts

connection.ts
import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";

export async function connectSingleStore(
    config: Partial<mysql.ConnectionOptions> = {}
) {
    dotenv.config();

    const baseConfig: mysql.ConnectionOptions = {
        host: process.env.HOST,
        password: process.env.PASSWORD,
        user: "admin",
    };

    return await mysql.createConnection({
        ...baseConfig,
        ...config,
    });
}

export async function stopSingleStore(conn: mysql.Connection) {
    await conn.end();
}

export async function getDatabases({ conn }: { conn?: mysql.Connection } = {}) {
    try {
        let closeConn = false;
        if (!conn) {
            conn = await connectSingleStore();
            closeConn = true;
        }

        const [results] = await conn.query("SHOW DATABASES");
        console.log("get databases:", { results });

        if (closeConn) {
            await stopSingleStore(conn);
        }

        return results;
    } catch (error) {
        console.error({ error });
        return error;
    }
}

export async function selectTable({
    conn,
    database,
    table,
}: {
    conn?: mysql.Connection;
    database: string;
    table: string;
}) {
    try {
        let closeConn = false;
        if (!conn) {
            conn = await connectSingleStore({ database });
            closeConn = true;
        }

        const [rows, fields] = await conn.query(`SELECT * FROM ${table}`);
        console.log("select table:", table, { rows });

        if (closeConn) {
            await stopSingleStore(conn);
        }

        return rows;
    } catch (error) {
        console.error({ error });
        return error;
    }
}

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src
client
App.tsx

App.tsx
import * as React from "react";

const App () => {
 
    return (
        <div>App</div>
    )
}

export default App

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src
client
index.tsx

index.tsx
import * as React from 'react'
import { render } from 'react-dom'
import App from './App'
import './app.scss'

render(<React.StrictMode>
    <App />
    </React.StrictMode>, document.getElementById("root"))

Visual Studio Code
Terminal 
npm run dev

localhost:3000
Dev
Inspect

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src
client
App.tsx

App.tsx
import * as React from "react";

const App () => {
 
    return (
        <div className="chat-bot">
             <div className="header">
                  <div className="info-container">
                       <h3>Chat with</h3>
                       <h2>https://www.compart.com/en/unicode/U+25D3 BookBot</h2>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                      <path fill="#5000ca" fill-opacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,192C672,203,768,245,864,224C960,203,1056,117,1152,80C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                  </svg>
             </div>
             <div className="feed">
                 <div className="question bubble"></div>
                 <div className="response bubble"></div>
             </div>
             <textarea/>
             <button>https://www.compart.com/en/unicode/U+21E8</button>
        </div>
    )
}

export default App

https://www.compart.com/en/unicode/U+25D3 
https://getwaves.io/ 
https://www.compart.com/en/unicode/U+21E8 

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src
client
app.scss

app.scss
body {
    margin: 0;
    padding: 0;
    background-color: rgb(277, 277, 277);
    display: flex;
    justify-content: end;
    align-items: end;
    height: 100hv;
    font-family: Arial, sans-serif;
}

h2, h3 {
    margin: 5px;
}

.chat-bot {
    position: relative;
    height: 500px;
    width: 400px;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    border-radius: 20px 20px 0 0 ;
    margin: 20px 20px 0 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 10px 36px 0,
    rgba(0, 0, 0, 0.06) 0 0 0 1px
}

.info-container {
    height: 60px;
    background: linear-gradient(6, 51, 118), rgb(1, 31, 75);
    padding: 25px;
    color: rgb(244, 244, 244);
}

textarea {
    position: absolute;
    bottom: 0;
    left: 0;
    border: none;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid rgb(207, 207, 207);
    padding: 25px 70px 25px 25px;
}

textarea:focus {
    outline: none;
}

.header {
    position: relative;
    z-index: 1;
}

.feed {
    position: absolute;
    bottom: 82px;
    left: 0;
    width: 100%;
    height: 250px;
    overflow-y: scroll;
}

button {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: rgb(6, 51, 118);
    color: rgb(207, 207, 207);
    position: absolute;
    bottom: 21px;
    right: 21px;
}

.bubble {
    width: 250px;
    padding: 20px;
    margin: 10px 25px;
    border: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
    color: rgb(74, 74, 74);
}

.question {
    background-color: rgb(244, 248, 255);
}

.response {
    margin-left: 85px;
}

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src
client
App.tsx

App.tsx
import * as React from "react";

const App () => {
    const [ text, setText ] = React.useState<string>("")
 
    return (
        <div className="chat-bot">
             <div className="header">
                  <div className="info-container">
                       <h3>Chat with</h3>
                       <h2>https://www.compart.com/en/unicode/U+25D3 BookBot</h2>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                      <path fill="#5000ca" fill-opacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,192C672,203,768,245,864,224C960,203,1056,117,1152,80C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                  </svg>
             </div>
             <div className="feed">
                 <div className="question bubble"></div>
                 <div className="response bubble"></div>
             </div>
             <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
             />
             <button>https://www.compart.com/en/unicode/U+21E8</button>
        </div>
    )
}

export default App

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src 
client
routes.ts

routes.ts
import * as express from "express";
import {
    getDatabases,
    selectTable,
} from "./connection";
import * as fs from "fs";
import * as dotenv from "dotenv";
const bodyParser = require("body-parser");
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

const app = express();
const router = express.Router();

router.get("/api/hello", (req, res, next) => {
    res.json("SingleStore");
});

router.post("/setup", bodyParser.json(), async (req, res, next) => {
    const host = req.body.hostname;
    const password = req.body.password;

    try {
        fs.writeFileSync(".env", `HOST="${host}"\nPASSWORD="${password}"`);
    } catch (err) {
        console.error(err);
    }

    try {
        const data = fs.readFileSync(".env", "utf-8");
        console.log({ data });
    } catch (err) {
        console.error(err);
    }

    dotenv.config();
    res.json("/SETUP!");
});

router.get("/api/database", async (req, res) => {
    const sqlRes = await getDatabases();
    res.json(sqlRes);
});

router.post("/api/database", bodyParser.json(), async (req, res) => {
    console.log("POST /api/database, body:", req.body);

    const database = req.body.database;
    const sqlRes = await createDatabase({ database });
    res.json(sqlRes);
});

router.get("/api/database/:text",async (req, res) => {
       const text = req.params.text

})

Visual Studio Code
Terminal 
Server listening on port:3000
I am some text

export default router;

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src
client
App.tsx

App.tsx
import * as React from "react";

const App () => {
    const [ text, setText ] = React.useState<string>("")

    const.getResponse = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/database/${text}`)
            const data = await response.json()
            console.log('response', data)
        } catch (error) {
            console.error(error)
        }
        
    }
 
    return (
        <div className="chat-bot">
             <div className="header">
                  <div className="info-container">
                       <h3>Chat with</h3>
                       <h2>https://www.compart.com/en/unicode/U+25D3 BookBot</h2>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                      <path fill="#5000ca" fill-opacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,192C672,203,768,245,864,224C960,203,1056,117,1152,80C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                  </svg>
             </div>
             <div className="feed">
                 <div className="question bubble"></div>
                 <div className="response bubble"></div>
             </div>
             <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
             />
             <button onClick={getResponse}>https://www.compart.com/en/unicode/U+21E8</button>
        </div>
    )
}

export default App

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src 
client
routes.ts

routes.ts
import * as express from "express";
import {
    getDatabases,
    selectTable,
} from "./connection";
import * as fs from "fs";
import * as dotenv from "dotenv";
const bodyParser = require("body-parser");
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

const app = express();
const router = express.Router();

router.get("/api/hello", (req, res, next) => {
    res.json("SingleStore");
});

router.post("/setup", bodyParser.json(), async (req, res, next) => {
    const host = req.body.hostname;
    const password = req.body.password;

    try {
        fs.writeFileSync(".env", `HOST="${host}"\nPASSWORD="${password}"`);
    } catch (err) {
        console.error(err);
    }

    try {
        const data = fs.readFileSync(".env", "utf-8");
        console.log({ data });
    } catch (err) {
        console.error(err);
    }

    dotenv.config();
    res.json("/SETUP!");
});

router.get("/api/database", async (req, res) => {
    const sqlRes = await getDatabases();
    res.json(sqlRes);
});

router.post("/api/database", bodyParser.json(), async (req, res) => {
    console.log("POST /api/database, body:", req.body);

    const database = req.body.database;
    const sqlRes = await createDatabase({ database });
    res.json(sqlRes);
});

router.get("/api/database/:text",async (req, res) => {
    const text = req.params.text
const configuration = new Configuration({
  apiKey: process.env.OPENAIAPI,
});

    try {
        const openai = new OpenAIApi(configuration);
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: text,
        })
        const embedding = response.data.data[0].embedding
    } catch(error) {
        console.error(error)
    }

})

export default router;

https://platform.openai.com/docs/api-reference/embeddings 

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
connection.ts

connection.ts
import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";

export async function connectSingleStore(
    config: Partial<mysql.ConnectionOptions> = {}
) {
    dotenv.config();

    const baseConfig: mysql.ConnectionOptions = {
        host: process.env.HOST,
        password: process.env.PASSWORD,
        user: "admin",
    };

    return await mysql.createConnection({
        ...baseConfig,
        ...config,
    });
}

export async function stopSingleStore(conn: mysql.Connection) {
    await conn.end();
}

export async function getDatabases({ conn }: { conn?: mysql.Connection } = {}) {
    try {
        let closeConn = false;
        if (!conn) {
            conn = await connectSingleStore();
            closeConn = true;
        }

        const [results] = await conn.query("SHOW DATABASES");
        console.log("get databases:", { results });

        if (closeConn) {
            await stopSingleStore(conn);
        }

        return results;
    } catch (error) {
        console.error({ error });
        return error;
    }
}

export async function selectTable({
    conn,
    database,
    table,
}: {
    conn?: mysql.Connection;
    database: string;
    table: string;
}) {
    try {
        let closeConn = false;
        if (!conn) {
            conn = await connectSingleStore({ database });
            closeConn = true;
        }

        const [rows, fields] = await conn.query(`SELECT * FROM ${table}`);
        console.log("select table:", table, { rows });

        if (closeConn) {
            await stopSingleStore(conn);
        }

        return rows;
    } catch (error) {
        console.error({ error });
        return error;
    }
}

export async function readData({
    conn,
    database,
    embedding
}: {
    conn? : mysql.Connection;,
    database : string,
    embedding : any
}) {
    try {
        let closeConn = false;
        if (!conn) {
            conn = await connectSingleStore({ database });
            closeConn = true;
        }
       
        const [rows] = await conn.execute(
            `SELECT text, DOT_PRODUCT(embedding, JSON_ARRAY_PACK('[${embedding}]') AS similarity FROM my_book ORDER BY similarity DESC LIMIT 1`
        )

        if (closeConn) {
             await stopSingleStore(conn)
        }

        console.log('rows[0]', rows[0])
        return rows[0]
    } catch (error) {
        console.error({error})
        return error
    }
}

OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src 
client
routes.ts

routes.ts
import * as express from "express";
import {
    getDatabases,
    readData
} from "./connection";
import * as fs from "fs";
import * as dotenv from "dotenv";
const bodyParser = require("body-parser");
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

const app = express();
const router = express.Router();

const dataBase = "reader_data"
const table = "my_book"

router.get("/api/hello", (req, res, next) => {
    res.json("SingleStore");
});

router.post("/setup", bodyParser.json(), async (req, res, next) => {
    const host = req.body.hostname;
    const password = req.body.password;

    try {
        fs.writeFileSync(".env", `HOST="${host}"\nPASSWORD="${password}"`);
    } catch (err) {
        console.error(err);
    }

    try {
        const data = fs.readFileSync(".env", "utf-8");
        console.log({ data });
    } catch (err) {
        console.error(err);
    }

    dotenv.config();
    res.json("/SETUP!");
});

router.get("/api/database", async (req, res) => {
    const sqlRes = await getDatabases();
    res.json(sqlRes);
});

router.post("/api/database", bodyParser.json(), async (req, res) => {
    console.log("POST /api/database, body:", req.body);

    const database = req.body.database;
    const sqlRes = await createDatabase({ database });
    res.json(sqlRes);
});

router.get("/api/database/:text",async (req, res) => {
    const text = req.params.text
const configuration = new Configuration({
  apiKey: process.env.OPENAIAPI,
});

    try {
        const openai = new OpenAIApi(configuration);
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: text,
        })
        const embedding = response.data.data[0].embedding

        sqlRes = await readData({ database, embedding})

        const prompt = `The user asked ${text}.The most similar text from the book is: ${sqlRes.text}`
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a helpful assistant."}, 
                {role: "user", content: prompt}],
          })
          console.log(completion.data.choices[0].message)
          res.json(completion.data.choices[0].message)

    } catch(error) {
        console.error(error)
    }

})

export default router;

https://platform.openai.com/docs/api-reference/chat/create 
localhost:3000/api/database/data

Visual Studio Code
Explorer
OPEN EDITORS
Ai Development! Build a Chatbot To Help You Cheat at Reading Anything! (Super Simple!)
pdf-ai-reader
src
client
App.tsx

App.tsx
import * as React from "react";

interface Message {
    question: string;
    response: string;
}

const App () => {
    const [ text, setText ] = React.useState<string>("")
    const [ messages, setMessages ] = React.useState<Message[]>([])

    const.getResponse = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/database/${text}`)
            const data = await response.json()
            setMessages([...messages, {
                question: text,
                response: data.content
            }])
        } catch (error) {
            console.error(error)
        }
        
    }
 
    return (
        <div className="chat-bot">
             <div className="header">
                  <div className="info-container">
                       <h3>Chat with</h3>
                       <h2>https://www.compart.com/en/unicode/U+25D3 BookBot</h2>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                      <path fill="#5000ca" fill-opacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,192C672,203,768,245,864,224C960,203,1056,117,1152,80C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                  </svg>
             </div>
             <div className="feed">
                  {messages.map( (message, _index) => 
                     <div key={_index}>
                        <div className="question bubble">{message.question}</div>
                        <div className="response bubble">{message.response}</div>
                     </div>
                  )}
             </div>
             <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
             />
             <button onClick={getResponse}>https://www.compart.com/en/unicode/U+21E8</button>
        </div>
    )
}

export default App


