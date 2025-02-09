# CloudPrint AI

https://poised-octane-449005-q1.web.app/

## Client
- Vite, React, Excalidraw

Development

```shell
cd ./client
npm i
npm run dev
```

## API Server

Development

```shell
cd ./api
cp credentials.example.json .credentials.json
# Update credentials.json with your api key
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```