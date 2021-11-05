from constants import Constants
from serial import readSensorValueMock
from datetime import datetime
import socketio
import json


def sendData(sio):
    while True:
        data = readSensorValueMock()
        now = datetime.now()
        sio.emit('sensor-data', { 'greenhouse': Constants.GREENHOUSE_ID, 'temperature': data.get('temperature'), 'humidity': data.get('humidity'), 'date': now.strftime("%d/%m/%Y"), 'time': now.strftime("%H:%M:%S") }, namespace='/greenhouses')


if __name__ == '__main__':
    # sio
    sio = socketio.Client()
    sio.connect(Constants.SOCKET_SERVER_URL, namespaces=['/greenhouses'])
    sendData(sio)
