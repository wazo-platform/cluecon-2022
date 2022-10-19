#!/usr/bin/env python3

import os
import requests
from flask import request
from requests.auth import HTTPBasicAuth
from tinydb import TinyDB, Query

from flask import Flask, request, render_template


app = Flask(__name__)
db = TinyDB('db.json')

URL = 'https://wazo.signalwire.com/api/chat/tokens'
PROJECT_ID = os.getenv('SIGNALWIRE_PROJECT_ID')
API_KEY = os.getenv('SIGNALWIRE_API_KEY')

@app.route('/')
def main():
    return render_template('index.html')


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


@app.route('/api/chat/channels', methods=['GET'])
def channels():
    rooms = db.all()
    return rooms[0].get("rooms")


@app.route('/api/chat/channels', methods=['POST'])
def add_channels():
    room = request.json.get('room')
    rooms = db.all()
    for r in rooms:
      if room in r.get("rooms"):
        return ['Already exist']

    if rooms:
        rooms[0]["rooms"].append(room);
    else:
        rooms.append({"rooms": [room]})
    if rooms[0].doc_id == 1:
        db.update(rooms[0])
    else:
        db.insert(rooms[0])
    return rooms


@app.route('/api/chat/tokens', methods=['POST'])
def chan_token():
    response = requests.post(
        URL,
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        json=request.json,
        auth=HTTPBasicAuth(PROJECT_ID, API_KEY),
    )

    return response.text, response.status_code
