# The incredible chat app 2022

Coder game - using SignalWire API

This INCREDIBLE application allows users to chat with each other from there web browser WOW

```docker
docker pull wazoplatform/cluecon-2022
docker run --rm -p 8000:5000 -e SIGNALWIRE_PROJECT_NAME=<project-name> -e SIGNALWIRE_PROJECT_ID=<project-id> -e SIGNALWIRE_API_KEY=<api-token> wazoplatform/cluecon-2022
```

Where:

- `SIGNALWIRE_PROJECT_NAME`: Name of the SignalWire project. Can be found in the URL (ex: `undefined.signalwire.com` would be `undefined`)
- `SIGNALWIRE_PROJECT_ID`: ID of the SignalWire project
- `SIGNALWIRE_API_KEY`: API Key

Then open your browser at 'http://localhost:8000'

Still in progress

- [x] Loby
- [x] Participant name display
- [ ] Message deletion
- [ ] Video mode button

