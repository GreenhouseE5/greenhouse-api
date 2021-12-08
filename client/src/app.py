from constants import Constants
from arduino import readSensorValue
from datetime import datetime
import socketio
import json


def sendData(sio):
    while True:
        data = readSensorValue()
        now = datetime.now()
        sio.emit('sensor-data', { 'greenhouse': Constants.GREENHOUSE_ID, 'temperature': data.get('temperature'), 'humidity': data.get('humidity'), 'date': now.strftime("%Y-%m-%d"), 'time': now.strftime("%H:%M:%S") }, namespace='/greenhouses')


if __name__ == '__main__':
    sio = socketio.Client()
    sio.connect(Constants.SOCKET_SERVER_URL, namespaces=['/greenhouses'])
    sendData(sio)