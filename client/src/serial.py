from constants import Constants
import serial
import time

def readSensorValue():
    arduino = serial.Serial(Constants.SERIAL_PORT, 9600)
    data = arduino.readline().decode('UTF-8')
    return { 'humidity': float(s[2:8]), 'temperature': float(s[2:8]) }

def readSensorValueMock():
    time.sleep(5)
    return { 'humidity': 45, 'temperature': 90 }