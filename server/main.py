#!/usr/bin/env python3

import os
import requests
from requests.auth import HTTPBasicAuth

from flask import Flask, request

app = Flask(__name__)

URL = 'https://wazo.signalwire.com/api/chat/tokens'
PROJECT_ID = os.getenv('SIGNALWIRE_PROJECT_ID')
API_KEY = os.getenv('SIGNALWIRE_API_KEY')

@app.route('/')
def main():
    return render_template('index.html')


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
