from constants import Constants
from serial import Serial
import time

def readSensorValue():
    arduino = Serial(port=Constants.SERIAL_PORT, baudrate=9600)
    data = arduino.readline().decode('UTF-8')
    return { 'temperature': data[9:13], 'humidity': data[2:7] }
