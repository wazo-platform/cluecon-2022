#!/usr/bin/env python3

import os
import requests
import memcache
from flask import request
from requests.auth import HTTPBasicAuth

from flask import Flask, request, render_template


app = Flask(__name__)
mc = memcache.Client(['127.0.0.1:11211'], debug=0)

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
    rooms = mc.get("rooms")
    return rooms


@app.route('/api/chat/channels', methods=['POST'])
def add_channels():
    room = request.json.get('room')
    rooms = mc.get("rooms")
    if room in rooms:
        return ['Already exist']
    if rooms:
        rooms.append(room);
    else:
        rooms = [room]
    mc.set("rooms", rooms)
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
